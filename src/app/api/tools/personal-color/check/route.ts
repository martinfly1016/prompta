import { NextRequest, NextResponse } from 'next/server'
import { ensureAnonId } from '@/lib/tool-quota'
import { ensureShortWelcomeTopUp, getPaidBalance, getOwnerEmailHash } from '@/lib/paid-credits'
import { welcomeBonusEvent } from '@/lib/ga-events'
import { enqueueGaEvents } from '@/lib/ga-queue'
import { stripeCheckoutReady } from '@/lib/stripe'
import { CREDIT_COSTS } from '@/lib/credit-costs'
import { resolveWelcomeBonusCredits } from '@/lib/welcome-credits'

// Phase 0 (2026-05-11) — credit-only model. No more anonymous free quota.
export async function GET(_req: NextRequest) {
  const anonId = await ensureAnonId()
  const topup = await ensureShortWelcomeTopUp()
  const ga = topup?.granted ? [welcomeBonusEvent(topup.amount, true)] : []
  await enqueueGaEvents(ga)
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
    stripeEnabled: stripeCheckoutReady(),
    welcomeCredits: resolveWelcomeBonusCredits(),
    imageCreditCost: CREDIT_COSTS.image,
    textCreditCost: CREDIT_COSTS.text,
    // Legacy fields for client backward-compat:
    remainingFree: 0,
    freeUsedToday: 0,
    ipUsedToday: 0,
    ga,
  })
}
