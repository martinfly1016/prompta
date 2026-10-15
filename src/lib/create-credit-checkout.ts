import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { stripe, stripeCheckoutReady, isCheckoutTestStub } from '@/lib/stripe'
import { creditPackPriceData, getPointPack } from '@/lib/credit-costs'
import { SITE_CONFIG } from '@/lib/constants'
import { authOptions } from '@/lib/auth'

const RETURN_RE = /^\/(prompt|prompts|account|tools|guides|tag|en)(\/.*)?$/

export async function createCreditPackCheckout(
  req: NextRequest,
  opts: { defaultReturnJa: string; defaultReturnEn: string; product: string },
) {
  if (!stripeCheckoutReady()) {
    return NextResponse.json(
      { error: 'Stripe is not configured', configured: false },
      { status: 503 },
    )
  }

  const session = await getServerSession(authOptions).catch(() => null)
  const sessionEmail = session?.user?.email
  if (!sessionEmail) {
    return NextResponse.json(
      { error: 'auth_required', signInUrl: '/auth/signin' },
      { status: 401 },
    )
  }

  const pack = getPointPack(req.nextUrl.searchParams.get('pack'))
  if (!pack) {
    return NextResponse.json({ error: 'unknown_pack' }, { status: 400 })
  }

  const locale = req.nextUrl.searchParams.get('locale') === 'en' ? 'en' : 'ja'
  const rawReturn = req.nextUrl.searchParams.get('returnTo') ?? ''
  const returnPath = RETURN_RE.test(rawReturn)
    ? rawReturn
    : locale === 'en'
      ? opts.defaultReturnEn
      : opts.defaultReturnJa

  // Test stub never calls Stripe and never moves money. The URL only exists
  // so the browser can fire begin_checkout and assert the redirect target.
  if (isCheckoutTestStub()) {
    const sessionId = `cs_test_e2e_${Date.now()}`
    return NextResponse.json({
      url: `https://checkout.stripe.com/c/pay/${sessionId}`,
      sessionId,
      testMode: true,
      packId: pack.id,
      value: pack.priceJpy,
      credits: pack.points,
    })
  }

  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured', configured: false },
      { status: 503 },
    )
  }

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Inline product data so Checkout shows the pack we advertise.
      // A dashboard Price named 「10回パック」 is intentionally not used.
      // The statement descriptor / account display name ("bytead") is a
      // Stripe account setting and cannot be overridden here.
      line_items: [{ price_data: creditPackPriceData(pack), quantity: 1 }],
      payment_method_types: ['card'],
      locale,
      customer_email: sessionEmail,
      success_url: `${SITE_CONFIG.url}${returnPath}?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_CONFIG.url}${returnPath}?purchase=cancelled`,
      payment_intent_data: { receipt_email: sessionEmail },
      metadata: {
        product: opts.product,
        packId: pack.id,
        credits: String(pack.points),
        sessionEmail,
      },
    })
    if (!checkout.url) {
      return NextResponse.json({ error: 'no_checkout_url' }, { status: 502 })
    }
    return NextResponse.json({ url: checkout.url, sessionId: checkout.id })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to create session'
    console.error('[checkout] error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
