import { NextRequest, NextResponse } from 'next/server'
import { ensureAnonId, extractClientIp, hashIp } from '@/lib/tool-quota'
import { getOwnerEmailHash, spendOneCredit } from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { stripeEnabled } from '@/lib/stripe'

const TOOL = 'personal-color'

// Phase 0 (2026-05-11) — credit-only. Login required + 1 credit per consume.
export async function POST(req: NextRequest) {
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

  const result = await spendOneCredit(eh)
  if (!result.ok) {
    return NextResponse.json(
      { error: 'credits_exhausted', blockReason: 'credits_exhausted', paidCredits: 0, stripeEnabled },
      { status: 429 },
    )
  }

  await prisma.toolUsage.create({
    data: { anonId, ipHash, tool: TOOL, type: 'paid', emailHash: eh },
  })
  return NextResponse.json({
    paidCredits: result.balance,
    canUse: result.balance > 0,
    blockReason: 'none' as const,
    source: 'paid',
    stripeEnabled,
  })
}
