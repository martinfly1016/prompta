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
  readCreditsCookie,
  spendOneCredit,
} from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { analyzePersonalColor } from '@/lib/personal-color-ai'
import { stripeEnabled } from '@/lib/stripe'

const TOOL = 'personal-color'
const MAX_BYTES = 8 * 1024 * 1024 // 8MB before base64
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export const maxDuration = 60 // Vercel hobby cap; analysis takes 15-23s

// POST multipart/form-data with field "image".
// Workflow:
//  1. Validate image
//  2. Reserve a usage slot (free first, then paid). Returns 429 if both empty.
//  3. Call Gemini analyze.
//  4. On Gemini failure → refund the reserved slot + return 500.
//  5. On success → return result + updated quota state.
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

  // 2. Reserve quota
  const anonId = await ensureAnonId()
  const ip = extractClientIp(req)
  const ua = req.headers.get('user-agent') || ''
  const ipHash = hashIp(ip, ua)

  let consumedType: 'free' | 'paid' | null = null
  let consumedRecordId: string | null = null
  let emailHashUsed: string | null = null

  const stateBefore = await getQuotaState(anonId, ipHash, TOOL)

  if (stateBefore.canUse) {
    // Consume free
    await consumeFreeQuota(anonId, ipHash, TOOL)
    const created = await prisma.toolUsage.findFirst({
      where: { anonId, tool: TOOL, type: 'free' },
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    })
    consumedType = 'free'
    consumedRecordId = created?.id ?? null
  } else {
    // Try paid credits
    const eh = await readCreditsCookie()
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
    const eh = await readCreditsCookie()
    const paidCredits = await getPaidBalance(eh)
    return NextResponse.json(
      {
        error: 'quota_exhausted',
        ...stateBefore,
        paidCredits,
        stripeEnabled,
      },
      { status: 429 },
    )
  }

  // 3. Run Gemini
  try {
    const buf = Buffer.from(await file.arrayBuffer())
    const result = await analyzePersonalColor(buf, file.type)

    // 5. Success — return result + fresh state
    const eh = await readCreditsCookie()
    const paidCredits = await getPaidBalance(eh)
    const after = await getQuotaState(anonId, ipHash, TOOL)
    return NextResponse.json({
      ok: true,
      result,
      source: consumedType,
      quota: { ...after, paidCredits, stripeEnabled },
    })
  } catch (e: any) {
    // 4. Refund on failure
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
