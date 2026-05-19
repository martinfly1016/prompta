import { NextResponse } from 'next/server'
import { getPaidBalance, getOwnerEmailHash } from '@/lib/paid-credits'
import { stripeEnabled } from '@/lib/stripe'

/**
 * GET /api/tools/balance — universal credit balance lookup.
 * Tool-agnostic; used by PromptExecutor and future shared widgets.
 */
export async function GET() {
  const eh = await getOwnerEmailHash()
  const balance = await getPaidBalance(eh)
  return NextResponse.json({
    balance,
    canUse: !!eh && balance > 0,
    signedIn: !!eh,
    stripeEnabled,
  })
}
