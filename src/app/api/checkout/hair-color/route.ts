import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import {
  stripe,
  stripeEnabled,
  STRIPE_PRICE_ID,
  CREDITS_PER_PACK,
} from '@/lib/stripe'
import { SITE_CONFIG } from '@/lib/constants'
import { authOptions } from '@/lib/auth'

// Mirrors /api/checkout/personal-color but redirects back to the
// hair-color tool. Credits are pooled (same Price + same PaidCredits row),
// so a buyer can immediately use the credits on either tool.
export async function POST(req: NextRequest) {
  if (!stripeEnabled || !stripe || !STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: 'Stripe is not configured', configured: false },
      { status: 503 },
    )
  }

  const session = await getServerSession(authOptions).catch(() => null)
  const sessionEmail = session?.user?.email

  // Sign-in required to purchase. See personal-color route for rationale.
  if (!sessionEmail) {
    return NextResponse.json(
      { error: 'auth_required', signInUrl: '/auth/signin' },
      { status: 401 },
    )
  }

  const locale = req.nextUrl.searchParams.get('locale') === 'en' ? 'en' : 'ja'
  const returnPath =
    locale === 'en'
      ? '/en/tools/hair-color-diagnosis'
      : '/tools/hair-color-diagnosis'

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      payment_method_types: ['card'],
      currency: 'jpy',
      locale,
      customer_email: sessionEmail,
      success_url: `${SITE_CONFIG.url}${returnPath}?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_CONFIG.url}${returnPath}?purchase=cancelled`,
      payment_intent_data: { receipt_email: sessionEmail },
      metadata: {
        product: 'hair-color-pack',
        credits: String(CREDITS_PER_PACK),
        sessionEmail,
      },
    })
    return NextResponse.json({ url: checkout.url })
  } catch (e: any) {
    console.error('[checkout/hair-color] error:', e?.message)
    return NextResponse.json(
      { error: e?.message ?? 'Failed to create session' },
      { status: 500 },
    )
  }
}
