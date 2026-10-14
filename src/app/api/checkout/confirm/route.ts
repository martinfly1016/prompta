import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getPaidBalance } from '@/lib/paid-credits'
import { fulfillPaidCheckout } from '@/lib/checkout-fulfill'
import {
  stripe,
  stripeEnabled,
  isCheckoutTestStub,
  CREDITS_PER_PACK,
} from '@/lib/stripe'

// Read-only confirmation for the success redirect. Grants credits only
// after Stripe says the session is paid (same idempotent lock as the
// webhook). The browser fires GA4 `purchase` only when this returns
// confirmed: true — the `?purchase=success` query param alone is not proof.
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id') || ''
  if (!sessionId.startsWith('cs_')) {
    return NextResponse.json({ confirmed: false, reason: 'invalid_session' }, { status: 400 })
  }

  const auth = await getServerSession(authOptions).catch(() => null)
  const sessionEmail = auth?.user?.email?.trim().toLowerCase()
  if (!sessionEmail) {
    return NextResponse.json({ confirmed: false, reason: 'auth_required' }, { status: 401 })
  }

  if (process.env.ENABLE_TEST_AUTH === 'true') {
    const row = await prisma.stripePayment.findUnique({ where: { sessionId } })
    if (
      row?.status === 'paid' &&
      row.rawEventType === 'test.simulated' &&
      row.email.trim().toLowerCase() === sessionEmail
    ) {
      const balance = await getPaidBalance(row.emailHash)
      return NextResponse.json({
        confirmed: true,
        transactionId: row.sessionId,
        value: row.amountJpy,
        currency: 'JPY',
        credits: row.creditsGranted,
        balance,
        alreadyProcessed: true,
      })
    }
    if (isCheckoutTestStub()) {
      return NextResponse.json({ confirmed: false, reason: 'not_paid' })
    }
  }

  if (!stripeEnabled || !stripe) {
    return NextResponse.json({ confirmed: false, reason: 'stripe_unconfigured' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return NextResponse.json({
        confirmed: false,
        reason: 'not_paid',
        payment_status: session.payment_status,
      })
    }
    const payer = (session.customer_details?.email || session.customer_email || '')
      .trim()
      .toLowerCase()
    if (!payer || payer !== sessionEmail) {
      return NextResponse.json({ confirmed: false, reason: 'email_mismatch' })
    }
    const credits = Number(session.metadata?.credits ?? CREDITS_PER_PACK) || CREDITS_PER_PACK
    const result = await fulfillPaidCheckout({
      sessionId: session.id,
      email: payer,
      credits,
      amountJpy: session.amount_total ?? 0,
      paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      eventType: 'checkout.session.confirmed',
    })
    return NextResponse.json({
      confirmed: true,
      transactionId: session.id,
      value: session.amount_total ?? 0,
      currency: (session.currency || 'jpy').toUpperCase(),
      credits: result.credits,
      balance: result.balance,
      alreadyProcessed: result.alreadyProcessed,
    })
  } catch (e: unknown) {
    console.error('[checkout confirm] error:', e instanceof Error ? e.message : e)
    return NextResponse.json({ confirmed: false, reason: 'retrieve_failed' }, { status: 502 })
  }
}
