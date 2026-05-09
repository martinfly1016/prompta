import { NextRequest, NextResponse } from 'next/server'
import {
  consumeFreeQuota,
  ensureAnonId,
  extractClientIp,
  getQuotaState,
  hashIp,
} from '@/lib/tool-quota'
import {
  getPaidBalance,
  getOwnerEmailHash,
  spendOneCredit,
} from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { diagnoseHairColor, simulateHairColor } from '@/lib/hair-color-ai'
import { stripeEnabled } from '@/lib/stripe'
import { validateImageBuffer } from '@/lib/image-validation'

const TOOL = 'hair-color'
const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])

// Diagnosis (Vision) + auto-simulation of the top "safe" candidate.
// Both calls are wrapped in a single quota slot — user pays 1 credit and
// receives 5 hair color suggestions plus a Before/After preview of the
// first safe candidate. Additional simulations cost extra credits via the
// /simulate endpoint.
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

  let consumedType: 'free' | 'paid' | null = null
  let consumedRecordId: string | null = null
  let emailHashUsed: string | null = null
  let lastState = await getQuotaState(anonId, ipHash, TOOL)

  const reservation = await consumeFreeQuota(anonId, ipHash, TOOL)
  if (reservation.ok) {
    consumedType = 'free'
    consumedRecordId = reservation.id
    lastState = reservation.state
  } else {
    lastState = reservation.state
    const eh = await getOwnerEmailHash()
    if (eh) {
      const r = await spendOneCredit(eh)
      if (r.ok) {
        const rec = await prisma.toolUsage.create({
          data: { anonId, ipHash, tool: TOOL, type: 'paid', emailHash: eh },
          select: { id: true },
        })
        consumedType = 'paid'
        consumedRecordId = rec.id
        emailHashUsed = eh
      }
    }
  }

  if (!consumedType) {
    const eh = await getOwnerEmailHash()
    const paidCredits = await getPaidBalance(eh)
    return NextResponse.json(
      {
        error: 'quota_exhausted',
        ...lastState,
        paidCredits,
        stripeEnabled,
      },
      { status: 429 },
    )
  }

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
        // Image edit failure is non-fatal — diagnosis still has value.
        // Log and continue without preview.
        console.error('[hair-color/analyze] simulation failed:', simErr?.message)
      }
    }

    const eh = await getOwnerEmailHash()
    const paidCredits = await getPaidBalance(eh)
    const after = await getQuotaState(anonId, ipHash, TOOL)
    return NextResponse.json({
      ok: true,
      result: { diagnosis, previewSimulation },
      source: consumedType,
      quota: { ...after, paidCredits, stripeEnabled },
    })
  } catch (e: any) {
    if (consumedRecordId) {
      await prisma.toolUsage
        .delete({ where: { id: consumedRecordId } })
        .catch(() => {})
    }
    if (consumedType === 'paid' && emailHashUsed) {
      await prisma.paidCredits
        .update({
          where: { emailHash: emailHashUsed },
          data: { balance: { increment: 1 }, totalUsed: { decrement: 1 } },
        })
        .catch(() => {})
    }
    console.error('[hair-color/analyze] failed:', e?.message)
    return NextResponse.json(
      { error: 'analysis_failed', message: e?.message ?? 'unknown', refunded: true },
      { status: 500 },
    )
  }
}
