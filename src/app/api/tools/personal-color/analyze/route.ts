import { NextRequest, NextResponse } from 'next/server'
import { ensureAnonId, extractClientIp, hashIp } from '@/lib/tool-quota'
import {
  getPaidBalance,
  getOwnerEmailHash,
  spendCredits,
} from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { analyzePersonalColor } from '@/lib/personal-color-ai'
import { stripeEnabled } from '@/lib/stripe'
import { POINTS_PER_RUN } from '@/lib/credit-costs'
import { insufficientPointsEvent, pointsSpentEvent, toolResultEvent } from '@/lib/ga-events'
import { enqueueGaEvents } from '@/lib/ga-queue'
import { validateImageBuffer } from '@/lib/image-validation'
import { completeGeneration, reconcileStaleGenerations, refundPendingGeneration, startGeneration } from '@/lib/generation-output'

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

  await reconcileStaleGenerations(eh)
  const cost = POINTS_PER_RUN
  const spend = await spendCredits(eh, cost)
  if (!spend.ok) {
    const paidCredits = await getPaidBalance(eh)
    const ga = [insufficientPointsEvent(TOOL, cost, paidCredits)]
    await enqueueGaEvents(ga)
    return NextResponse.json(
      { error: 'credits_exhausted', blockReason: 'credits_exhausted', paidCredits, needed: cost, stripeEnabled, ga },
      { status: 429 },
    )
  }

  const usage = await prisma.toolUsage.create({
    data: { anonId, ipHash, tool: TOOL, type: 'paid', emailHash: eh, creditsConsumed: cost },
    select: { id: true },
  })
  const genId = await startGeneration({ emailHash: eh, tool: TOOL, creditsUsed: cost })

  try {
    const result = await analyzePersonalColor(buf, file.type)
    await completeGeneration(genId, { outputJson: JSON.stringify(result) })
    const paidCredits = await getPaidBalance(eh)
    const ga = [
      pointsSpentEvent(TOOL, cost, paidCredits),
      toolResultEvent(TOOL, 'success', cost),
    ]
    await enqueueGaEvents(ga)
    return NextResponse.json({
      ok: true,
      result,
      source: 'paid',
      quota: { paidCredits, canUse: paidCredits > 0, stripeEnabled },
      ga,
    })
  } catch (e: any) {
    await prisma.toolUsage.delete({ where: { id: usage.id } }).catch(() => {})
    await refundPendingGeneration(genId, eh, e?.message ?? 'analysis_failed').catch((err) => {
      console.error('[personal-color/analyze] refund failed:', (err as Error).message)
    })
    const paidCredits = await getPaidBalance(eh)
    const ga = [toolResultEvent(TOOL, 'failure', cost)]
    await enqueueGaEvents(ga)
    console.error('[personal-color/analyze] failed:', e?.message)
    return NextResponse.json(
      {
        error: 'analysis_failed',
        message: e?.message ?? 'unknown',
        refunded: true,
        paidCredits,
        ga,
      },
      { status: 500 },
    )
  }
}
