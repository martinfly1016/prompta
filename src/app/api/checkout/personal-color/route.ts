import { NextResponse } from 'next/server'
import {
  stripe,
  stripeEnabled,
  STRIPE_PRICE_ID,
  CREDITS_PER_PACK,
} from '@/lib/stripe'
import { SITE_CONFIG } from '@/lib/constants'

// Creates a Stripe Checkout session for the 10-pack credit purchase.
// Returns the hosted Checkout URL — frontend redirects to it.
export async function POST() {
  if (!stripeEnabled || !stripe || !STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: 'Stripe is not configured', configured: false },
      { status: 503 },
    )
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      payment_method_types: ['card'],
      currency: 'jpy',
      locale: 'ja',
      customer_creation: 'always',
      success_url: `${SITE_CONFIG.url}/tools/personal-color-analysis?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_CONFIG.url}/tools/personal-color-analysis?purchase=cancelled`,
      metadata: {
        product: 'personal-color-pack',
        credits: String(CREDITS_PER_PACK),
      },
    })
    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    console.error('[checkout] error:', e?.message)
    return NextResponse.json(
      { error: e?.message ?? 'Failed to create session' },
      { status: 500 },
    )
  }
}
