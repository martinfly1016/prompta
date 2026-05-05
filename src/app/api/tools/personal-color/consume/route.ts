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
import { stripeEnabled } from '@/lib/stripe'

const TOOL = 'personal-color'

// POST = consume one use. Tries free quota first; if exhausted but the
// browser has a paid credits cookie, spends one paid credit instead.
export async function POST(req: NextRequest) {
  const anonId = await ensureAnonId()
  const ip = extractClientIp(req)
  const ua = req.headers.get('user-agent') || ''
  const ipHash = hashIp(ip, ua)

  // 1. Check free state first (do not consume yet)
  let state = await getQuotaState(anonId, ipHash, TOOL)

  // 2. If free still available, consume free
  if (state.canUse) {
    state = await consumeFreeQuota(anonId, ipHash, TOOL)
    const paidCredits = await getPaidBalance(await readCreditsCookie())
    return NextResponse.json({ ...state, paidCredits, source: 'free', stripeEnabled })
  }

  // 3. Free exhausted — try paid credits
  const eh = await readCreditsCookie()
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

  // 4. No paid credits either → block
  const paidCredits = await getPaidBalance(eh)
  return NextResponse.json(
    { ...state, paidCredits, source: 'blocked', stripeEnabled },
    { status: 429 },
  )
}
