import { NextRequest, NextResponse } from 'next/server'
import { ensureAnonId, extractClientIp, hashIp } from '@/lib/tool-quota'
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

  const spend = await spendOneCredit(eh)
  if (!spend.ok) {
    return NextResponse.json(
      { error: 'credits_exhausted', blockReason: 'credits_exhausted', paidCredits: 0, stripeEnabled },
      { status: 429 },
    )
  }

  const usage = await prisma.toolUsage.create({
    data: { anonId, ipHash, tool: TOOL, type: 'paid', emailHash: eh },
    select: { id: true },
  })

  try {
    const sim = await simulateHairColor(buf, file.type, hex, nameJa, nameEn)
    const paidCredits = await getPaidBalance(eh)
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
    })
  } catch (e: any) {
    await prisma.toolUsage.delete({ where: { id: usage.id } }).catch(() => {})
    await prisma.paidCredits
      .update({
        where: { emailHash: eh },
        data: { balance: { increment: 1 }, totalUsed: { decrement: 1 } },
      })
      .catch(() => {})
    console.error('[hair-color/simulate] failed:', e?.message)
    return NextResponse.json(
      { error: 'simulation_failed', message: e?.message ?? 'unknown', refunded: true },
      { status: 500 },
    )
  }
}
