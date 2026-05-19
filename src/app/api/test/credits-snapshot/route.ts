import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emailHash } from '@/lib/paid-credits'

/**
 * Test-only PaidCredits snapshot for E2E suite.
 *
 * Returns the full PaidCredits row for a given email so tests can verify
 * not just `balance` but also `totalEarned`, `totalUsed`, `lastPurchase`,
 * `welcomeBonus` — covering the full refund-vs-purchase semantics.
 *
 * HARD-GATED: only responds when ENABLE_TEST_AUTH=true.
 */
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const eh = emailHash(email)
  const row = await prisma.paidCredits.findUnique({ where: { emailHash: eh } })
  if (!row) {
    return NextResponse.json({ exists: false })
  }

  return NextResponse.json({
    exists: true,
    balance: row.balance,
    totalEarned: row.totalEarned,
    totalUsed: row.totalUsed,
    welcomeBonus: row.welcomeBonus,
    lastPurchase: row.lastPurchase?.toISOString() ?? null,
  })
}
