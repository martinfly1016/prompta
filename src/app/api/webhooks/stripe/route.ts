import { NextRequest, NextResponse } from 'next/server'
import { stripe, stripeEnabled, STRIPE_WEBHOOK_SECRET, CREDITS_PER_PACK } from '@/lib/stripe'
import { grantCredits, emailHash } from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
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
  } catch (e: any) {
    console.error('[stripe webhook] signature verify failed:', e?.message)
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

    // Idempotency: skip if we already processed this session
    const existing = await prisma.stripePayment.findUnique({ where: { sessionId } })
    if (existing && existing.status === 'paid') {
      return NextResponse.json({ received: true, idempotent: true })
    }

    const eh = emailHash(email)
    await prisma.stripePayment.upsert({
      where: { sessionId },
      create: {
        sessionId,
        paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        emailHash: eh,
        email,
        amountJpy,
        creditsGranted: credits,
        status: 'paid',
        rawEventType: event.type,
      },
      update: {
        status: 'paid',
        rawEventType: event.type,
        paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      },
    })

    await grantCredits(email, credits)
    console.log(`[stripe webhook] granted ${credits} credits to ${email}`)
  }

  return NextResponse.json({ received: true })
}
