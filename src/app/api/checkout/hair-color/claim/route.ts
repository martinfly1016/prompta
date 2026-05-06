import { NextRequest, NextResponse } from 'next/server'
import { stripe, stripeEnabled } from '@/lib/stripe'
import { emailHash, setCreditsCookie } from '@/lib/paid-credits'

export async function POST(req: NextRequest) {
  if (!stripeEnabled || !stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }
  const { sessionId } = await req.json().catch(() => ({}))
  if (!sessionId || typeof sessionId !== 'string') {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed', status: session.payment_status },
        { status: 402 },
      )
    }
    const email = session.customer_details?.email || session.customer_email
    if (!email) {
      return NextResponse.json({ error: 'No email on session' }, { status: 400 })
    }
    const eh = emailHash(email)
    await setCreditsCookie(eh)
    return NextResponse.json({ ok: true, email })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed' }, { status: 500 })
  }
}
