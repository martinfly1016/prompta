import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emailHash } from '@/lib/paid-credits'

// Test-only credit seeding for E2E suites. Sets the test user's
// PaidCredits balance to a specified value without going through
// Stripe. Use to prepare a user with N credits for a test case.
//
// HARD-GATED: only responds when ENABLE_TEST_AUTH=true.
//
// Usage:
//   curl -X POST http://localhost:3000/api/test/seed-credits \
//     -H 'Content-Type: application/json' \
//     -d '{"email":"e2e-test+t1@prompta.jp","balance":3}'
//
// `balance` is the absolute value (not increment) so each test run
// can start from a known state. Combine with /api/test/reset to fully
// reset, or call this alone to overwrite without touching other users.
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
  const balance = Number(body?.balance)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }
  if (!Number.isFinite(balance) || balance < 0 || balance > 1000) {
    return NextResponse.json({ error: 'invalid_balance', allowed: '0..1000' }, { status: 400 })
  }
  if (!email.includes('e2e-test')) {
    return NextResponse.json(
      { error: 'safety_check_failed', message: "email must contain 'e2e-test' to avoid touching real users" },
      { status: 400 },
    )
  }

  const eh = emailHash(email)
  const row = await prisma.paidCredits.upsert({
    where: { emailHash: eh },
    create: {
      emailHash: eh,
      email,
      balance,
      totalEarned: balance,
      welcomeBonus: 0,
      welcomeBonusAt: balance > 0 ? new Date() : null,
    },
    update: { balance },
    select: { emailHash: true, balance: true, totalEarned: true },
  })

  return NextResponse.json({ ok: true, email, balance: row.balance, totalEarned: row.totalEarned })
}
