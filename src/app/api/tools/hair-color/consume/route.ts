import { NextRequest, NextResponse } from 'next/server'
import {
  consumeFreeQuota,
  ensureAnonId,
  extractClientIp,
  hashIp,
} from '@/lib/tool-quota'
import {
  getPaidBalance,
  getOwnerEmailHash,
  spendOneCredit,
} from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { stripeEnabled } from '@/lib/stripe'

const TOOL = 'hair-color'

export async function POST(req: NextRequest) {
  const anonId = await ensureAnonId()
  const ip = extractClientIp(req)
  const ua = req.headers.get('user-agent') || ''
  const ipHash = hashIp(ip, ua)

  const reservation = await consumeFreeQuota(anonId, ipHash, TOOL)
  if (reservation.ok) {
    const paidCredits = await getPaidBalance(await getOwnerEmailHash())
    return NextResponse.json({
      ...reservation.state,
      paidCredits,
      source: 'free',
      stripeEnabled,
    })
  }

  const state = reservation.state
  const eh = await getOwnerEmailHash()
  if (eh) {
    const result = await spendOneCredit(eh)
    if (result.ok) {
      await prisma.toolUsage.create({
        data: { anonId, ipHash, tool: TOOL, type: 'paid', emailHash: eh },
      })
      return NextResponse.json({
        ...state,
        paidCredits: result.balance,
        canUse: true,
        blockReason: 'none' as const,
        source: 'paid',
        stripeEnabled,
      })
    }
  }

  const paidCredits = await getPaidBalance(eh)
  return NextResponse.json(
    { ...state, paidCredits, source: 'blocked', stripeEnabled },
    { status: 429 },
  )
}
