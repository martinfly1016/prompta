import { NextRequest, NextResponse } from 'next/server'
import {
  ensureAnonId,
  extractClientIp,
  getQuotaState,
  hashIp,
} from '@/lib/tool-quota'
import { getPaidBalance, readCreditsCookie } from '@/lib/paid-credits'
import { stripeEnabled } from '@/lib/stripe'

const TOOL = 'personal-color'

export async function GET(req: NextRequest) {
  const anonId = await ensureAnonId()
  const ip = extractClientIp(req)
  const ua = req.headers.get('user-agent') || ''
  const ipHash = hashIp(ip, ua)
  const state = await getQuotaState(anonId, ipHash, TOOL)
  const eh = await readCreditsCookie()
  const paidCredits = await getPaidBalance(eh)
  return NextResponse.json({
    ...state,
    paidCredits,
    canUse: state.canUse || paidCredits > 0,
    blockReason: state.canUse || paidCredits > 0 ? 'none' : state.blockReason,
    stripeEnabled,
  })
}
