import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Test-only DB reset endpoint. Truncates the tables that the freemium
// flow writes to (ToolUsage / PaidCredits / StripePayment) plus
// NextAuth tables (User / Session / Account / VerificationToken) so
// test cases can start from a known clean state.
//
// HARD-GATED: only responds when ENABLE_TEST_AUTH=true. Never enable
// in production — would wipe paying customers' credits.
//
// DOES NOT touch content tables (Prompt, Tag, Category, etc.) so the
// staging DB keeps useful seed data.
export async function POST() {
  if (process.env.ENABLE_TEST_AUTH !== 'true') {
    return new NextResponse(null, { status: 404 })
  }

  // Order matters: child tables first, then parents. Use raw SQL with
  // CASCADE to keep it simple regardless of FK depth.
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "ToolUsage", "PaidCredits", "StripePayment", "Session", "Account", "VerificationToken", "User" RESTART IDENTITY CASCADE',
  )

  return NextResponse.json({ ok: true, truncated: 7 })
}
