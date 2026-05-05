import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import {
  stripe,
  stripeEnabled,
  STRIPE_PRICE_ID,
  CREDITS_PER_PACK,
} from '@/lib/stripe'
import { SITE_CONFIG } from '@/lib/constants'
import { authOptions } from '@/lib/auth'

// Creates a Stripe Checkout session for the 10-pack credit purchase.
// Returns the hosted Checkout URL — frontend redirects to it.
//
// When the user is signed in, we lock the customer email to their session
// email. Without this, Stripe Link can auto-fill a different email from a
// saved wallet (observed in production: a user paid while logged in as
// gmail.com but Link used a previously-saved byte-ad.com email, so credits
// landed on the wrong account).
export async function POST() {
  if (!stripeEnabled || !stripe || !STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: 'Stripe is not configured', configured: false },
      { status: 503 },
    )
  }

  const session = await getServerSession(authOptions).catch(() => null)
  const sessionEmail = session?.user?.email

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      payment_method_types: ['card'],
      currency: 'jpy',
      locale: 'ja',
      // When signed in: pin the email so Link/saved-wallet cannot override it.
      // When anonymous: let Stripe collect (and create) the email at checkout.
      ...(sessionEmail
        ? { customer_email: sessionEmail }
        : { customer_creation: 'always' as const }),
      success_url: `${SITE_CONFIG.url}/tools/personal-color-analysis?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_CONFIG.url}/tools/personal-color-analysis?purchase=cancelled`,
      metadata: {
        product: 'personal-color-pack',
        credits: String(CREDITS_PER_PACK),
        sessionEmail: sessionEmail ?? '',
      },
    })
    return NextResponse.json({ url: checkout.url })
  } catch (e: any) {
    console.error('[checkout] error:', e?.message)
    return NextResponse.json(
      { error: e?.message ?? 'Failed to create session' },
      { status: 500 },
    )
  }
}
