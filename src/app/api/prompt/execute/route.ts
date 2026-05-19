/**
 * POST /api/prompt/execute
 *
 * Universal prompt execution endpoint. Routes to the requested provider
 * (Gemini Flash Image / OpenAI GPT Image / Gemini Flash text) based on
 * mode + providerId in the request body.
 *
 * Auth: requires NextAuth session (Phase 0 — login enforced).
 * Quota: spends N credits via spendCredits (race-safe via updateMany).
 * Refund: if provider call fails, credit is refunded automatically.
 * Image storage: image outputs go to Vercel Blob with 24h TTL (not permanent).
 *
 * Request body:
 *   {
 *     promptSlug: string,             // for analytics + cache key
 *     providerId: ProviderId,         // gemini-image / openai-image / gemini-text
 *     content: string,                // the final prompt (after param substitution)
 *     negativePrompt?: string,
 *     sourceImage?: { base64, mimeType }, // image-edit mode only
 *     aspectRatio?: '1:1' | '4:3' | ...,
 *   }
 *
 * Response:
 *   200 { mode: 'text' | 'image', text?: string, imageUrl?: string, balance: number }
 *   401 { error: 'login_required' }
 *   402 { error: 'credits_exhausted', balance: 0 }
 *   429 { error: 'rate_limited' }     // anti-spam (5 req / 5s per anon)
 *   500 { error: '<provider error>' }
 */

import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { ensureAnonId, extractClientIp, hashIp } from '@/lib/tool-quota'
import {
  getOwnerEmailHash,
  spendCredits,
  refundCredits,
} from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { stripeEnabled } from '@/lib/stripe'
import { getProvider } from '@/lib/image-providers/registry'
import type { ProviderId } from '@/lib/image-providers/types'

export const runtime = 'nodejs'
export const maxDuration = 60

const TOOL = 'prompt-execute'

// In-memory cache for identical (slug + content + providerId) within 60s.
// Race condition acceptable here (cache miss → extra API call, no harm).
type CacheEntry = { at: number; result: any; balance: number }
const CACHE = new Map<string, CacheEntry>()
const CACHE_TTL_MS = 60_000

function cacheGet(key: string): CacheEntry | null {
  const e = CACHE.get(key)
  if (!e) return null
  if (Date.now() - e.at > CACHE_TTL_MS) {
    CACHE.delete(key)
    return null
  }
  return e
}

function cacheSet(key: string, result: any, balance: number) {
  CACHE.set(key, { at: Date.now(), result, balance })
  // Coarse eviction: keep map small
  if (CACHE.size > 500) {
    const oldest = [...CACHE.entries()].sort((a, b) => a[1].at - b[1].at)[0]
    if (oldest) CACHE.delete(oldest[0])
  }
}

// Per-anon rate limit (anti-spam): 5 reqs / 5 seconds
const RATE: Map<string, number[]> = new Map()
function rateLimitOk(anonId: string): boolean {
  const now = Date.now()
  const window = 5_000
  const limit = 5
  const arr = (RATE.get(anonId) ?? []).filter((t) => now - t < window)
  if (arr.length >= limit) return false
  arr.push(now)
  RATE.set(anonId, arr)
  return true
}

interface ExecuteBody {
  promptSlug: string
  providerId: ProviderId
  content: string
  negativePrompt?: string
  sourceImage?: { base64: string; mimeType: string }
  aspectRatio?: '1:1' | '4:3' | '3:4' | '16:9' | '9:16'
}

export async function POST(req: NextRequest) {
  const anonId = await ensureAnonId()
  const ip = extractClientIp(req)
  const ua = req.headers.get('user-agent') || ''
  const ipHash = hashIp(ip, ua)

  // 1. Rate limit
  if (!rateLimitOk(anonId)) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429 },
    )
  }

  // 2. Auth check
  const eh = await getOwnerEmailHash()
  if (!eh) {
    return NextResponse.json(
      { error: 'login_required', balance: 0, stripeEnabled },
      { status: 401 },
    )
  }

  // 3. Parse + validate body
  let body: ExecuteBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }
  if (
    !body.promptSlug ||
    !body.providerId ||
    !body.content ||
    body.content.length < 5
  ) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }
  if (body.content.length > 10_000) {
    return NextResponse.json({ error: 'content_too_long' }, { status: 400 })
  }

  const provider = getProvider(body.providerId)
  if (!provider) {
    return NextResponse.json({ error: 'unknown_provider' }, { status: 400 })
  }

  // 4. Cache check (only for image-gen mode, since text always cheap)
  const cacheKey = `${body.promptSlug}::${body.providerId}::${body.content}::${body.aspectRatio ?? '1:1'}`
  const cached = cacheGet(cacheKey)
  if (cached && !body.sourceImage) {
    return NextResponse.json({
      ...cached.result,
      balance: cached.balance,
      cached: true,
    })
  }

  // 5. Spend credits (race-safe via updateMany WHERE balance >= n)
  const cost = provider.credits
  const spend = await spendCredits(eh, cost)
  if (!spend.ok) {
    return NextResponse.json(
      { error: 'credits_exhausted', balance: 0, stripeEnabled },
      { status: 402 },
    )
  }

  // 6. Provider call (refund on failure)
  let result: { mode: 'text' | 'image'; text?: string; imageUrl?: string }
  try {
    // Test-only failure injection: lets the E2E suite verify the refund
    // path end-to-end without depending on flaky safety-filter triggers.
    // Hard-gated by ENABLE_TEST_AUTH — never fires in prod.
    if (
      process.env.ENABLE_TEST_AUTH === 'true' &&
      body.content.includes('__E2E_FORCE_PROVIDER_ERROR__')
    ) {
      throw new Error('E2E_FORCE_PROVIDER_ERROR')
    }
    const out = await provider.call({
      prompt: body.content,
      negativePrompt: body.negativePrompt,
      sourceImage: body.sourceImage,
      aspectRatio: body.aspectRatio,
    })
    if (out.text) {
      result = { mode: 'text', text: out.text }
    } else if (out.image) {
      // Upload to Vercel Blob (24h policy enforced via blob TTL header — for now
      // we store permanently but rely on Blob lifecycle rule + cleanup script).
      const token = process.env.BLOB_READ_WRITE_TOKEN
      if (!token) throw new Error('Missing BLOB_READ_WRITE_TOKEN')
      const buf = Buffer.from(out.image.base64, 'base64')
      const ext = out.image.mimeType.includes('jpeg') ? 'jpg' : 'png'
      const key = `prompt-execute/${body.promptSlug}/${Date.now()}.${ext}`
      const blob = await put(key, buf, {
        access: 'public',
        contentType: out.image.mimeType,
        token,
        addRandomSuffix: true,
      })
      result = { mode: 'image', imageUrl: blob.url }
    } else {
      throw new Error('Provider returned empty result')
    }
  } catch (e: any) {
    // Refund: restores balance + decrements totalUsed (the spend never
    // delivered). Doesn't bump totalEarned (no purchase) or lastPurchase.
    await refundCredits(eh, cost).catch((err) => {
      console.error('[prompt-execute] refund failed:', err.message)
    })
    return NextResponse.json(
      { error: 'provider_error', message: e.message?.slice(0, 200) || 'unknown' },
      { status: 500 },
    )
  }

  // 7. Log usage (for daily-report + /account history)
  await prisma.toolUsage
    .create({
      data: {
        anonId,
        ipHash,
        tool: TOOL,
        type: 'paid',
        emailHash: eh,
        creditsConsumed: cost,
      },
    })
    .catch((e) => console.error('[prompt-execute] toolUsage log failed:', e.message))

  // 8. Cache (image only)
  if (result.mode === 'image' && !body.sourceImage) {
    cacheSet(cacheKey, result, spend.balance)
  }

  return NextResponse.json({ ...result, balance: spend.balance })
}

