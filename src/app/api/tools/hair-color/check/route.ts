import { NextRequest, NextResponse } from 'next/server'
import { ensureAnonId } from '@/lib/tool-quota'
import { getPaidBalance, getOwnerEmailHash } from '@/lib/paid-credits'
import { stripeEnabled } from '@/lib/stripe'

// Phase 0 (2026-05-11) — credit-only model. No more anonymous free quota.
export async function GET(_req: NextRequest) {
  const anonId = await ensureAnonId()
  const eh = await getOwnerEmailHash()
  const balance = await getPaidBalance(eh)
  const canUse = !!eh && balance > 0
  const blockReason: 'none' | 'login_required' | 'credits_exhausted' = !eh
    ? 'login_required'
    : balance > 0
      ? 'none'
      : 'credits_exhausted'
  return NextResponse.json({
    anonId,
    paidCredits: balance,
    canUse,
    blockReason,
    stripeEnabled,
    remainingFree: 0,
    freeUsedToday: 0,
    ipUsedToday: 0,
  })
}
