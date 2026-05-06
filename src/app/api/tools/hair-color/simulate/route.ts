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
import { simulateHairColor } from '@/lib/hair-color-ai'
import { stripeEnabled } from '@/lib/stripe'
import { validateImageBuffer } from '@/lib/image-validation'

const TOOL = 'hair-color'
const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const HEX_RE = /^#[0-9A-F]{6}$/i

// Re-simulation endpoint: client re-sends the original image plus the
// chosen candidate's hex / name. Costs 1 quota slot per call.
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

  let consumedType: 'free' | 'paid' | null = null
  let consumedRecordId: string | null = null
  let emailHashUsed: string | null = null

  const stateBefore = await getQuotaState(anonId, ipHash, TOOL)

  if (stateBefore.canUse) {
    await consumeFreeQuota(anonId, ipHash, TOOL)
    const created = await prisma.toolUsage.findFirst({
      where: { anonId, tool: TOOL, type: 'free' },
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    })
    consumedType = 'free'
    consumedRecordId = created?.id ?? null
  } else {
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
      { error: 'quota_exhausted', ...stateBefore, paidCredits, stripeEnabled },
      { status: 429 },
    )
  }

  try {
    const sim = await simulateHairColor(buf, file.type, hex, nameJa, nameEn)
    const eh = await getOwnerEmailHash()
    const paidCredits = await getPaidBalance(eh)
    const after = await getQuotaState(anonId, ipHash, TOOL)
    return NextResponse.json({
      ok: true,
      simulation: {
        hex,
        nameJa,
        nameEn,
        imageBase64: sim.imageBase64,
        mimeType: sim.mimeType,
      },
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
    console.error('[hair-color/simulate] failed:', e?.message)
    return NextResponse.json(
      { error: 'simulation_failed', message: e?.message ?? 'unknown', refunded: true },
      { status: 500 },
    )
  }
}
