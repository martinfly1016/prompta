import { NextRequest, NextResponse } from 'next/server'
import { ensureAnonId, extractClientIp, hashIp } from '@/lib/tool-quota'
import {
  getPaidBalance,
  getOwnerEmailHash,
  spendOneCredit,
} from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { analyzePersonalColor } from '@/lib/personal-color-ai'
import { stripeEnabled } from '@/lib/stripe'
import { validateImageBuffer } from '@/lib/image-validation'
import { saveGenerationOutput } from '@/lib/generation-output'

const TOOL = 'personal-color'
const MAX_BYTES = 8 * 1024 * 1024 // 8MB before base64
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export const maxDuration = 60 // Vercel hobby cap; analysis takes 15-23s

// POST multipart/form-data with field "image".
// Phase 0 (2026-05-11) workflow — credit-only:
//  1. Validate image
//  2. Require login (401 if not). Spend 1 credit (429 if balance=0).
//  3. Call Gemini analyze. Refund on failure.
//  4. Return result + new balance.
export async function POST(req: NextRequest) {
  // 1. Parse multipart
  let file: File | null = null
  try {
    const form = await req.formData()
    const f = form.get('image')
    if (f instanceof File) file = f
  } catch {
    return NextResponse.json({ error: 'invalid_form' }, { status: 400 })
  }
  if (!file) return NextResponse.json({ error: 'no_image' }, { status: 400 })
  if (file.size > MAX_BYTES)
    return NextResponse.json(
      { error: 'image_too_large', maxBytes: MAX_BYTES },
      { status: 413 },
    )
  if (!ALLOWED_MIMES.has(file.type))
    return NextResponse.json(
      { error: 'unsupported_type', allowed: Array.from(ALLOWED_MIMES) },
      { status: 415 },
    )

  // 1b. Deep validation BEFORE quota — magic bytes + actual decode + dim
  // bounds. An invalid upload must never cost the user a credit.
  const buf = Buffer.from(await file.arrayBuffer())
  const validation = await validateImageBuffer(buf, file.type)
  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.code, message: validation.messageJa },
      { status: 422 },
    )
  }

  // 2. Require login + spend credit
  const anonId = await ensureAnonId()
  const ip = extractClientIp(req)
  const ua = req.headers.get('user-agent') || ''
  const ipHash = hashIp(ip, ua)

  const eh = await getOwnerEmailHash()
  if (!eh) {
    return NextResponse.json(
      { error: 'login_required', blockReason: 'login_required', paidCredits: 0, stripeEnabled },
      { status: 401 },
    )
  }

  const spend = await spendOneCredit(eh)
  if (!spend.ok) {
    return NextResponse.json(
      { error: 'credits_exhausted', blockReason: 'credits_exhausted', paidCredits: 0, stripeEnabled },
      { status: 429 },
    )
  }

  // Log paid usage (for analytics / history)
  const usage = await prisma.toolUsage.create({
    data: { anonId, ipHash, tool: TOOL, type: 'paid', emailHash: eh },
    select: { id: true },
  })

  // 3. Run Gemini (buf already read during validation step 1b)
  try {
    const result = await analyzePersonalColor(buf, file.type)
    const paidCredits = await getPaidBalance(eh)
    // Phase 2: persist analysis JSON (no image — personal-color is text result).
    await saveGenerationOutput({
      emailHash: eh,
      tool: TOOL,
      outputJson: JSON.stringify(result),
    }).catch(e => console.error('[personal-color/analyze] save failed:', (e as Error).message))
    return NextResponse.json({
      ok: true,
      result,
      source: 'paid',
      quota: { paidCredits, canUse: paidCredits > 0, stripeEnabled },
    })
  } catch (e: any) {
    // 4. Refund on failure
    await prisma.toolUsage.delete({ where: { id: usage.id } }).catch(() => {})
    await prisma.paidCredits
      .update({
        where: { emailHash: eh },
        data: { balance: { increment: 1 }, totalUsed: { decrement: 1 } },
      })
      .catch(() => {})
    console.error('[personal-color/analyze] failed:', e?.message)
    return NextResponse.json(
      {
        error: 'analysis_failed',
        message: e?.message ?? 'unknown',
        refunded: true,
      },
      { status: 500 },
    )
  }
}
