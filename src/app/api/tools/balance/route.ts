import { NextResponse } from 'next/server'
import { ensureShortWelcomeTopUp, getCreditsState, getOwnerEmailHash } from '@/lib/paid-credits'
import { stripeCheckoutReady } from '@/lib/stripe'

/**
 * GET /api/tools/balance — universal credit balance lookup.
 * Tool-agnostic; used by PromptExecutor and future shared widgets.
 */
export async function GET() {
  await ensureShortWelcomeTopUp()
  const eh = await getOwnerEmailHash()
  const { balance, expiresAt } = await getCreditsState(eh)
  return NextResponse.json({
    balance,
    expiresAt: expiresAt?.toISOString() ?? null,
    canUse: !!eh && balance > 0,
    signedIn: !!eh,
    stripeEnabled: stripeCheckoutReady(),
  })
}
