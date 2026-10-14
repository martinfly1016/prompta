import { NextRequest, NextResponse } from 'next/server'
import { stripe, stripeEnabled, STRIPE_WEBHOOK_SECRET, CREDITS_PER_PACK } from '@/lib/stripe'
import { fulfillPaidCheckout } from '@/lib/checkout-fulfill'
import type Stripe from 'stripe'

// Stripe webhook — handles checkout.session.completed → grants credits.
// Idempotent: same sessionId processed twice will not double-grant.
export async function POST(req: NextRequest) {
  if (!stripeEnabled || !stripe || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)
  } catch (e: unknown) {
    console.error('[stripe webhook] signature verify failed:', e instanceof Error ? e.message : e)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const sessionId = session.id
    const email = session.customer_details?.email || session.customer_email || null
    const credits = Number(session.metadata?.credits ?? CREDITS_PER_PACK) || CREDITS_PER_PACK
    const amountJpy = session.amount_total ?? 0

    if (!email) {
      console.error('[stripe webhook] no email on session', sessionId)
      return NextResponse.json({ received: true, error: 'no email' })
    }

    // payment_status guard — only grant when the money actually moved.
    if (session.payment_status !== 'paid') {
      console.warn(
        `[stripe webhook] ${sessionId}: payment_status=${session.payment_status}, skip grant`,
      )
      return NextResponse.json({
        received: true,
        skipped: 'payment_not_paid',
        payment_status: session.payment_status ?? null,
      })
    }

    const result = await fulfillPaidCheckout({
      sessionId,
      email,
      credits,
      amountJpy,
      paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      eventType: event.type,
    })
    console.log(
      `[stripe webhook] ${result.alreadyProcessed ? 'already granted' : 'granted'} ${credits} credits to ${email}`,
    )
  }

  return NextResponse.json({ received: true })
}
