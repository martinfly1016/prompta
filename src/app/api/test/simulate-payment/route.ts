import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { grantCredits, emailHash } from '@/lib/paid-credits'

// Test-only payment simulation. Replicates exactly what the Stripe
// webhook handler does on checkout.session.completed:
//   1. grantCredits(email, count) → upsert PaidCredits.balance += count
//   2. Insert a StripePayment row (marked source='test') for audit
// Skips real Stripe API + signature verification + actual money flow.
//
// Use this in T2 (simulated payment) E2E tests:
//   client.click("Stripe 購入ボタン") — usually redirects to Stripe
//   ↓ test framework intercepts redirect and calls this endpoint instead
//   ↓ DB state now matches "paid successfully"
//   client.navigate("/account") — verify credit refilled, history shows
//
// HARD-GATED: only responds when ENABLE_TEST_AUTH=true. The 'e2e-test'
// email pattern guard prevents accidentally crediting real users even
// if env leaks.
export async function POST(req: NextRequest) {
  if (process.env.ENABLE_TEST_AUTH !== 'true') {
    return new NextResponse(null, { status: 404 })
  }

  let body: any = null
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const email = String(body?.email ?? '').trim().toLowerCase()
  const credits = Number(body?.credits ?? 10)
  const amountJpy = Number(body?.amountJpy ?? 300)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }
  if (!email.includes('e2e-test')) {
    return NextResponse.json(
      { error: 'safety_check_failed', message: "email must contain 'e2e-test' to avoid touching real users" },
      { status: 400 },
    )
  }
  if (!Number.isFinite(credits) || credits < 1 || credits > 100) {
    return NextResponse.json({ error: 'invalid_credits', allowed: '1..100' }, { status: 400 })
  }

  const eh = emailHash(email)
  const result = await grantCredits(email, credits)
  await prisma.stripePayment.create({
    data: {
      emailHash: eh,
      email,
      sessionId: `cs_test_simulated_${Date.now()}`,
      amountJpy,
      creditsGranted: credits,
      status: 'paid',
      rawEventType: 'test.simulated',
    },
  })

  return NextResponse.json({
    ok: true,
    email,
    creditsGranted: credits,
    balance: result.balance,
    source: 'test-simulated',
  })
}
