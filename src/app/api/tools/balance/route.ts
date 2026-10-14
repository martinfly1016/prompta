import { NextResponse } from 'next/server'
import { ensureShortWelcomeTopUp, getCreditsState, getOwnerEmailHash } from '@/lib/paid-credits'
import { welcomeBonusEvent } from '@/lib/ga-events'
import { enqueueGaEvents } from '@/lib/ga-queue'
import { stripeCheckoutReady } from '@/lib/stripe'

/**
 * GET /api/tools/balance — universal credit balance lookup.
 * Tool-agnostic; used by PromptExecutor and future shared widgets.
 */
export async function GET() {
  const topup = await ensureShortWelcomeTopUp()
  const ga = topup?.granted ? [welcomeBonusEvent(topup.amount, true)] : []
  await enqueueGaEvents(ga)
  const eh = await getOwnerEmailHash()
  const { balance, expiresAt } = await getCreditsState(eh)
  return NextResponse.json({
    balance,
    expiresAt: expiresAt?.toISOString() ?? null,
    canUse: !!eh && balance > 0,
    signedIn: !!eh,
    stripeEnabled: stripeCheckoutReady(),
    ga,
  })
}
