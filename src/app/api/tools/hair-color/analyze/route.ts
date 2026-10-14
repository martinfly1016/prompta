import { NextRequest, NextResponse } from 'next/server'
import { ensureAnonId, extractClientIp, hashIp } from '@/lib/tool-quota'
import {
  getPaidBalance,
  getOwnerEmailHash,
  spendCredits,
} from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { diagnoseHairColor, simulateHairColor } from '@/lib/hair-color-ai'
import { stripeEnabled } from '@/lib/stripe'
import { POINTS_PER_RUN } from '@/lib/credit-costs'
import { insufficientPointsEvent, pointsSpentEvent, toolResultEvent } from '@/lib/ga-events'
import { enqueueGaEvents } from '@/lib/ga-queue'
import { validateImageBuffer } from '@/lib/image-validation'
import { completeGeneration, reconcileStaleGenerations, refundPendingGeneration, startGeneration } from '@/lib/generation-output'

const TOOL = 'hair-color'
const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])

// Phase 0 (2026-05-11) — credit-only. Login required + 1 credit per analyze.
// Diagnosis (Vision) + auto-simulation of the top "safe" candidate counts
// as a single billable unit. Additional simulations cost extra via /simulate.
export const maxDuration = 60

export async function POST(req: NextRequest) {
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
  const genId = await startGeneration({ emailHash: eh, tool: TOOL, creditsUsed: cost })

  try {
    const diagnosis = await diagnoseHairColor(buf, file.type)
    const safePick =
      diagnosis.candidates.find((c) => c.category === 'safe') ?? diagnosis.candidates[0]

    let previewSimulation: {
      hex: string
      nameJa: string
      nameEn: string
      imageBase64: string
      mimeType: string
    } | null = null

    if (safePick) {
      try {
        const sim = await simulateHairColor(
          buf,
          file.type,
          safePick.hex,
          safePick.nameJa,
          safePick.nameEn,
        )
        previewSimulation = {
          hex: safePick.hex,
          nameJa: safePick.nameJa,
          nameEn: safePick.nameEn,
          imageBase64: sim.imageBase64,
          mimeType: sim.mimeType,
        }
      } catch (simErr: any) {
        console.error('[hair-color/analyze] simulation failed:', simErr?.message)
      }
    }

    const paidCredits = await getPaidBalance(eh)
    const imageBuf = previewSimulation?.imageBase64
      ? Buffer.from(previewSimulation.imageBase64, 'base64')
      : null
    await completeGeneration(genId, {
      outputJson: JSON.stringify({
        diagnosis,
        preview: previewSimulation ? {
          hex: previewSimulation.hex,
          nameJa: previewSimulation.nameJa,
          nameEn: previewSimulation.nameEn,
        } : null,
      }),
      image: imageBuf && previewSimulation
        ? { buffer: imageBuf, mimeType: previewSimulation.mimeType }
        : undefined,
    }).catch(e => console.error('[hair-color/analyze] save failed:', (e as Error).message))
    const ga = [
      pointsSpentEvent(TOOL, cost, paidCredits),
      toolResultEvent(TOOL, 'success', cost),
    ]
    await enqueueGaEvents(ga)
    return NextResponse.json({
      ok: true,
      result: { diagnosis, previewSimulation },
      source: 'paid',
      quota: { paidCredits, canUse: paidCredits > 0, stripeEnabled },
      ga,
    })
  } catch (e: any) {
    await prisma.toolUsage.delete({ where: { id: usage.id } }).catch(() => {})
    await refundPendingGeneration(genId, eh, e?.message ?? 'analysis_failed').catch((err) => {
      console.error('[hair-color/analyze] refund failed:', (err as Error).message)
    })
    const paidCredits = await getPaidBalance(eh)
    const ga = [toolResultEvent(TOOL, 'failure', cost)]
    await enqueueGaEvents(ga)
    console.error('[hair-color/analyze] failed:', e?.message)
    return NextResponse.json(
      { error: 'analysis_failed', message: e?.message ?? 'unknown', refunded: true, paidCredits, ga },
      { status: 500 },
    )
  }
}
