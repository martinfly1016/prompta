// Paid credits — server-side balance keyed by emailHash. Visibility on a
// browser is gated by NextAuth session (the user must sign in with the
// purchase email). The signed-cookie path below is retained for backward
// compatibility with already-issued cookies but is no longer the primary
// auth source — getOwnerEmailHash() prefers session over cookie.

import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const CREDITS_COOKIE = 'prompta_credits'
const COOKIE_SECRET = process.env.NEXTAUTH_SECRET || 'dev-fallback-do-not-use'

export function emailHash(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
}

function signEmailHash(eh: string): string {
  return createHmac('sha256', COOKIE_SECRET).update(eh).digest('hex').slice(0, 32)
}

function packCookie(eh: string): string {
  return `${eh}.${signEmailHash(eh)}`
}

function unpackCookie(value: string): string | null {
  const [eh, sig] = value.split('.')
  if (!eh || !sig) return null
  const expected = signEmailHash(eh)
  try {
    if (
      sig.length === expected.length &&
      timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    ) {
      return eh
    }
  } catch {
    return null
  }
  return null
}

export async function setCreditsCookie(eh: string) {
  const store = await cookies()
  store.set(CREDITS_COOKIE, packCookie(eh), {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })
}

export async function readCreditsCookie(): Promise<string | null> {
  const store = await cookies()
  const v = store.get(CREDITS_COOKIE)?.value
  return v ? unpackCookie(v) : null
}

// Single source of truth for "who owns the credits this request can see".
// Prefers NextAuth session.user.email (the post-2026-05-06 model). Falls
// back to the legacy signed cookie so users who bought before this change
// still see their balance until their cookie expires (1 year max).
export async function getOwnerEmailHash(): Promise<string | null> {
  const session = await getServerSession(authOptions).catch(() => null)
  const sessionEmail = session?.user?.email
  if (sessionEmail) return emailHash(sessionEmail)
  return readCreditsCookie()
}

// Credits expire 12 months after the most recent grant (purchase or
// welcome bonus). Spend does NOT extend expiration; refund does NOT
// either (the spend itself didn't shorten it).
export const EXPIRATION_MONTHS = 12

export function computeNewExpiresAt(): Date {
  const d = new Date()
  d.setMonth(d.getMonth() + EXPIRATION_MONTHS)
  return d
}

/**
 * Sweep an expired wallet to balance=0. Lazy — only runs when called.
 * Returns the post-sweep row (balance/expiresAt). If the wallet doesn't
 * exist or has nothing to sweep, returns the row unchanged.
 *
 * Called by getPaidBalance() and spendCredits() so users never get
 * silently charged against expired credits, and reads stay consistent
 * with what the deduct path will actually allow.
 */
async function sweepIfExpired(eh: string): Promise<{ balance: number; expiresAt: Date | null }> {
  const row = await prisma.paidCredits.findUnique({
    where: { emailHash: eh },
    select: { balance: true, expiresAt: true },
  })
  if (!row) return { balance: 0, expiresAt: null }
  if (!row.expiresAt || row.balance <= 0) return row
  if (row.expiresAt.getTime() > Date.now()) return row
  // Expired with positive balance — zero it out atomically.
  await prisma.paidCredits.updateMany({
    where: {
      emailHash: eh,
      expiresAt: { lt: new Date() },
      balance: { gt: 0 },
    },
    data: { balance: 0 },
  })
  return { balance: 0, expiresAt: row.expiresAt }
}

export async function getPaidBalance(eh: string | null): Promise<number> {
  if (!eh) return 0
  const { balance } = await sweepIfExpired(eh)
  return balance
}

/**
 * Returns both balance and the wallet's expiration date — used by the
 * /api/tools/balance endpoint and any UI that needs to display
 * "ポイント有効期限".
 */
export async function getCreditsState(
  eh: string | null,
): Promise<{ balance: number; expiresAt: Date | null }> {
  if (!eh) return { balance: 0, expiresAt: null }
  return sweepIfExpired(eh)
}

export async function spendOneCredit(
  eh: string,
): Promise<{ ok: boolean; balance: number }> {
  return spendCredits(eh, 1)
}

/**
 * Refund N credits after a failed provider call. Distinct from grantCredits
 * (which records a purchase): refund restores balance + DECREMENTS totalUsed
 * (because the spend never actually happened) and does NOT touch totalEarned
 * or lastPurchase (no money came in).
 *
 * Use this in API routes that call spendCredits and then fail before
 * delivering the paid output (e.g. provider 5xx, safety filter, timeout).
 */
export async function refundCredits(eh: string, n: number): Promise<void> {
  if (n <= 0) throw new Error(`refundCredits: n must be > 0, got ${n}`)
  await prisma.paidCredits.update({
    where: { emailHash: eh },
    data: {
      balance: { increment: n },
      totalUsed: { decrement: n },
    },
  })
}

/**
 * Spend N credits atomically. Race-safe: only succeeds if balance >= n.
 * Used by:
 *   - hair-color simulate (5 credit, image gen)
 *   - hair-color analyze / personal-color analyze (1 credit, vision-to-text)
 *   - prompt-execute (1 credit text / 5 credit image / 10 credit hd)
 * Refund via `grantCredits(email, n)` if downstream API call fails.
 */
export async function spendCredits(
  eh: string,
  n: number,
): Promise<{ ok: boolean; balance: number }> {
  if (n <= 0) throw new Error(`spendCredits: n must be > 0, got ${n}`)
  // Pre-flight: sweep expired wallets before the conditional decrement so
  // we don't spend against credits the user no longer technically owns.
  await sweepIfExpired(eh)
  const now = new Date()
  // Atomically decrement only if balance >= n AND (no expiration OR not expired).
  const result = await prisma.paidCredits.updateMany({
    where: {
      emailHash: eh,
      balance: { gte: n },
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
    data: { balance: { decrement: n }, totalUsed: { increment: n } },
  })
  if (result.count === 0) return { ok: false, balance: 0 }
  const after = await prisma.paidCredits.findUnique({
    where: { emailHash: eh },
    select: { balance: true },
  })
  return { ok: true, balance: after?.balance ?? 0 }
}

export async function grantCredits(
  email: string,
  count: number,
): Promise<{ balance: number; expiresAt: Date }> {
  const eh = emailHash(email)
  const newExpiresAt = computeNewExpiresAt()
  const row = await prisma.paidCredits.upsert({
    where: { emailHash: eh },
    create: {
      emailHash: eh,
      email,
      balance: count,
      totalEarned: count,
      lastPurchase: new Date(),
      expiresAt: newExpiresAt,
    },
    update: {
      balance: { increment: count },
      totalEarned: { increment: count },
      lastPurchase: new Date(),
      // Extend on every grant — purchase or welcome bonus. Each grant
      // pushes expiration to a fresh now + 12 months window.
      expiresAt: newExpiresAt,
    },
    select: { balance: true, expiresAt: true },
  })
  return { balance: row.balance, expiresAt: row.expiresAt! }
}

// Welcome bonus on first login. Idempotent — uses welcomeBonusAt timestamp
// to gate repeat grants. Granted via NextAuth events.signIn hook.
//
// Anti-abuse note: emailHash uses email.toLowerCase().trim() — does NOT
// normalize Gmail aliases (user.name+x@gmail.com vs username@gmail.com).
// Acceptable trade-off for now given:
//   (a) Gemini API cost per gift = ~$0.12 for 3 credits
//   (b) Google OAuth (the dominant sign-in path) issues per-account
//       verified emails, harder to fake than email magic link
//   (c) Currently <20 registered users — abuse impact is low
// If abuse detected: add email canonicalization here + IP rate limit.
// Pricing baseline (2026-05-19): 15 welcome credits = 3 images OR 15 text runs
// OR mixed. Matches the previous "3 free image trials" UX under the new
// 5-credit-per-image pricing. Cost per new login = ~3 × $0.04 = $0.12 max.
export const WELCOME_BONUS_CREDITS = 15

export async function grantWelcomeBonusIfEligible(
  email: string,
): Promise<{ granted: boolean; balance: number; expiresAt: Date | null }> {
  const eh = emailHash(email)
  const existing = await prisma.paidCredits.findUnique({
    where: { emailHash: eh },
    select: { welcomeBonusAt: true, balance: true, expiresAt: true },
  })
  if (existing?.welcomeBonusAt) {
    return { granted: false, balance: existing.balance, expiresAt: existing.expiresAt }
  }
  const newExpiresAt = computeNewExpiresAt()
  const row = await prisma.paidCredits.upsert({
    where: { emailHash: eh },
    create: {
      emailHash: eh,
      email,
      balance: WELCOME_BONUS_CREDITS,
      totalEarned: WELCOME_BONUS_CREDITS,
      welcomeBonus: WELCOME_BONUS_CREDITS,
      welcomeBonusAt: new Date(),
      expiresAt: newExpiresAt,
    },
    update: {
      balance: { increment: WELCOME_BONUS_CREDITS },
      totalEarned: { increment: WELCOME_BONUS_CREDITS },
      welcomeBonus: WELCOME_BONUS_CREDITS,
      welcomeBonusAt: new Date(),
      expiresAt: newExpiresAt,
    },
    select: { balance: true, expiresAt: true },
  })
  return { granted: true, balance: row.balance, expiresAt: row.expiresAt }
}
