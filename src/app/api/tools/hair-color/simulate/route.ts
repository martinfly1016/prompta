import { NextRequest, NextResponse } from 'next/server'
import { ensureAnonId, extractClientIp, hashIp } from '@/lib/tool-quota'
import {
  getPaidBalance,
  getOwnerEmailHash,
  spendCredits,
} from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { simulateHairColor } from '@/lib/hair-color-ai'
import { stripeEnabled } from '@/lib/stripe'
import { POINTS_PER_RUN } from '@/lib/credit-costs'
import { insufficientPointsEvent, pointsSpentEvent, toolResultEvent } from '@/lib/ga-events'
import { enqueueGaEvents } from '@/lib/ga-queue'
import { validateImageBuffer } from '@/lib/image-validation'
import { completeGeneration, reconcileStaleGenerations, refundPendingGeneration, startGeneration } from '@/lib/generation-output'

const TOOL = 'hair-color'
const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const HEX_RE = /^#[0-9A-F]{6}$/i

// Phase 0 (2026-05-11) — credit-only. Login required + 1 credit per simulate.
export const maxDuration = 60

export async function POST(req: NextRequest) {
  let file: File | null = null
  let hex = ''
  let nameJa = ''
  let nameEn = ''
  try {
    const form = await req.formData()
    const f = form.get('image')
    if (f instanceof File) file = f
    hex = String(form.get('hex') ?? '').trim()
    nameJa = String(form.get('nameJa') ?? '').trim().slice(0, 30)
    nameEn = String(form.get('nameEn') ?? '').trim().slice(0, 40)
  } catch {
    return NextResponse.json({ error: 'invalid_form' }, { status: 400 })
  }

  if (!file) return NextResponse.json({ error: 'no_image' }, { status: 400 })
  if (file.size > MAX_BYTES)
    return NextResponse.json({ error: 'image_too_large' }, { status: 413 })
  if (!ALLOWED_MIMES.has(file.type))
    return NextResponse.json({ error: 'unsupported_type' }, { status: 415 })

  if (!HEX_RE.test(hex.toUpperCase())) {
    return NextResponse.json({ error: 'invalid_hex' }, { status: 400 })
  }
  if (!nameJa) nameJa = 'カスタムカラー'
  if (!nameEn) nameEn = 'Custom Color'
  hex = hex.toUpperCase()

  const buf = Buffer.from(await file.arrayBuffer())
  const validation = await validateImageBuffer(buf, file.type)
  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.code, message: validation.messageJa },
      { status: 422 },
    )
  }

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
  const genId = await startGeneration({
    emailHash: eh,
    tool: TOOL,
    creditsUsed: cost,
    inputParams: JSON.stringify({ hex, nameJa, nameEn }),
  })

  try {
    const sim = await simulateHairColor(buf, file.type, hex, nameJa, nameEn)
    const paidCredits = await getPaidBalance(eh)
    await completeGeneration(genId, {
      outputJson: JSON.stringify({ hex, nameJa, nameEn }),
      image: { buffer: Buffer.from(sim.imageBase64, 'base64'), mimeType: sim.mimeType },
    }).catch(e => console.error('[hair-color/simulate] save failed:', (e as Error).message))
    const ga = [
      pointsSpentEvent(TOOL, cost, paidCredits),
      toolResultEvent(TOOL, 'success', cost),
    ]
    await enqueueGaEvents(ga)
    return NextResponse.json({
      ok: true,
      simulation: {
        hex,
        nameJa,
        nameEn,
        imageBase64: sim.imageBase64,
        mimeType: sim.mimeType,
      },
      source: 'paid',
      quota: { paidCredits, canUse: paidCredits > 0, stripeEnabled },
      ga,
    })
  } catch (e: any) {
    await prisma.toolUsage.delete({ where: { id: usage.id } }).catch(() => {})
    await refundPendingGeneration(genId, eh, e?.message ?? 'simulation_failed').catch((err) => {
      console.error('[hair-color/simulate] refund failed:', (err as Error).message)
    })
    const paidCredits = await getPaidBalance(eh)
    const ga = [toolResultEvent(TOOL, 'failure', cost)]
    await enqueueGaEvents(ga)
    console.error('[hair-color/simulate] failed:', e?.message)
    return NextResponse.json(
      { error: 'simulation_failed', message: e?.message ?? 'unknown', refunded: true, paidCredits, ga },
      { status: 500 },
    )
  }
}
