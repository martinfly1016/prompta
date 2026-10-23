import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ensureAnonId, extractClientIp, hashIp } from '@/lib/tool-quota'
import { getPaidBalance, getOwnerEmailHash, spendCredits } from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { stripeEnabled } from '@/lib/stripe'
import { POINTS_PER_RUN } from '@/lib/credit-costs'
import { insufficientPointsEvent, pointsSpentEvent, toolResultEvent } from '@/lib/ga-events'
import { enqueueGaEvents } from '@/lib/ga-queue'
import { validateImageBuffer } from '@/lib/image-validation'
import { completeGeneration, reconcileStaleGenerations, refundPendingGeneration, startGeneration } from '@/lib/generation-output'
import { getProvider } from '@/lib/image-providers/registry'
import {
  buildGenerationPrompt,
  type SimulatorSettings,
} from '@/lib/height-difference/simulator'

const TOOL = 'height-difference'
const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])

const settingsSchema = z.object({
  characterA: z.object({
    label: z.string().trim().max(24).transform((value) => value || '人物A'),
    heightCm: z.number().int().min(120).max(210),
    bodyType: z.enum(['slim', 'average', 'athletic', 'broad']),
    note: z.string().trim().max(160),
  }),
  characterB: z.object({
    label: z.string().trim().max(24).transform((value) => value || '人物B'),
    heightCm: z.number().int().min(120).max(210),
    bodyType: z.enum(['slim', 'average', 'athletic', 'broad']),
    note: z.string().trim().max(160),
  }),
  pose: z.enum(['side-by-side', 'holding-hands', 'look-up', 'hug', 'kabedon', 'almost-kiss', 'back-to-back']),
  framing: z.enum(['full', 'three-quarter', 'waist']),
  style: z.enum(['anime', 'photo', 'manga']),
  scene: z.enum(['studio', 'school', 'cafe', 'night']),
  relationship: z.enum(['oshi', 'hetero', 'bl', 'yuri', 'siblings']),
})

export const runtime = 'nodejs'
export const maxDuration = 60

function mimeForFormat(format: 'jpeg' | 'png' | 'webp'): string {
  if (format === 'jpeg') return 'image/jpeg'
  if (format === 'png') return 'image/png'
  return 'image/webp'
}

async function readPhoto(entry: FormDataEntryValue | null): Promise<
  | { ok: true; image: { base64: string; mimeType: string } | null }
  | { ok: false; status: number; body: Record<string, unknown> }
> {
  if (entry == null || entry === '') return { ok: true, image: null }
  if (!(entry instanceof File) || entry.size === 0) return { ok: true, image: null }
  if (entry.size > MAX_BYTES) {
    return { ok: false, status: 413, body: { error: 'image_too_large' } }
  }
  if (!ALLOWED_MIMES.has(entry.type)) {
    return { ok: false, status: 415, body: { error: 'unsupported_type' } }
  }
  const buf = Buffer.from(await entry.arrayBuffer())
  const validation = await validateImageBuffer(buf, entry.type)
  if (!validation.ok) {
    return {
      ok: false,
      status: 422,
      body: { error: validation.code, message: validation.messageJa },
    }
  }
  return {
    ok: true,
    image: { base64: buf.toString('base64'), mimeType: mimeForFormat(validation.format) },
  }
}

export async function POST(req: NextRequest) {
  let imageA: { base64: string; mimeType: string } | null = null
  let imageB: { base64: string; mimeType: string } | null = null
  let settings: SimulatorSettings
  try {
    const form = await req.formData()
    const photoA = await readPhoto(form.get('imageA'))
    if (!photoA.ok) return NextResponse.json(photoA.body, { status: photoA.status })
    const photoB = await readPhoto(form.get('imageB'))
    if (!photoB.ok) return NextResponse.json(photoB.body, { status: photoB.status })
    imageA = photoA.image
    imageB = photoB.image
    const parsed = settingsSchema.safeParse(JSON.parse(String(form.get('settings') ?? '')))
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid_settings' }, { status: 400 })
    }
    settings = parsed.data
  } catch {
    return NextResponse.json({ error: 'invalid_form' }, { status: 400 })
  }

  if (!imageA && !imageB) {
    return NextResponse.json({ error: 'no_image' }, { status: 400 })
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
      { status: 402 },
    )
  }

  const usage = await prisma.toolUsage.create({
    data: { anonId, ipHash, tool: TOOL, type: 'paid', emailHash: eh, creditsConsumed: cost },
    select: { id: true },
  })

  const prompt = buildGenerationPrompt(settings, {
    hasPhotoA: !!imageA,
    hasPhotoB: !!imageB,
  })
  const referenceImages = [imageA, imageB].filter((image): image is { base64: string; mimeType: string } => !!image)

  const genId = await startGeneration({
    emailHash: eh,
    tool: TOOL,
    creditsUsed: cost,
    inputParams: JSON.stringify({
      heightA: settings.characterA.heightCm,
      heightB: settings.characterB.heightCm,
      bodyA: settings.characterA.bodyType,
      bodyB: settings.characterB.bodyType,
      pose: settings.pose,
      framing: settings.framing,
      style: settings.style,
      scene: settings.scene,
      relationship: settings.relationship,
      hasPhotoA: !!imageA,
      hasPhotoB: !!imageB,
    }),
  })

  try {
    const provider = getProvider('gemini-image')
    if (!provider) throw new Error('provider_missing')
    const out = await provider.call({ prompt, referenceImages })
    if (!out.image?.base64) throw new Error('Provider returned empty result')

    const paidCredits = await getPaidBalance(eh)
    // Photos and the result stay in this response. Do not upload them to public Blob.
    await completeGeneration(genId, {
      outputJson: JSON.stringify({
        heightA: settings.characterA.heightCm,
        heightB: settings.characterB.heightCm,
        pose: settings.pose,
        framing: settings.framing,
        hasPhotoA: !!imageA,
        hasPhotoB: !!imageB,
        storedImage: false,
      }),
    }).catch((error) => console.error('[height-difference] save failed:', (error as Error).message))

    const ga = [
      pointsSpentEvent(TOOL, cost, paidCredits),
      toolResultEvent(TOOL, 'success', cost),
    ]
    await enqueueGaEvents(ga)
    return NextResponse.json({
      ok: true,
      imageBase64: out.image.base64,
      mimeType: out.image.mimeType,
      promptUsed: prompt,
      balance: paidCredits,
      source: 'paid',
      quota: { paidCredits, canUse: paidCredits > 0, stripeEnabled },
      ga,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'generation_failed'
    await prisma.toolUsage.delete({ where: { id: usage.id } }).catch(() => {})
    await refundPendingGeneration(genId, eh, message).catch((refundError) => {
      console.error('[height-difference] refund failed:', (refundError as Error).message)
    })
    const paidCredits = await getPaidBalance(eh)
    const ga = [toolResultEvent(TOOL, 'failure', cost)]
    await enqueueGaEvents(ga)
    console.error('[height-difference] failed:', message.slice(0, 300))
    return NextResponse.json(
      { error: 'generation_failed', message: message.slice(0, 200), refunded: true, paidCredits, ga },
      { status: 500 },
    )
  }
}
