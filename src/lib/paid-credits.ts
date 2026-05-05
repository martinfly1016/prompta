// Paid credits — server-side balance keyed by emailHash, with a signed
// cookie that proves "this browser belongs to this email's credit account".
// Cookie is sha256(emailHash + secret) HMAC; if user clears cookies they
// can recover via a future "メールでクレジット復元" flow (Phase 2.5).

import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
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

export async function getPaidBalance(eh: string | null): Promise<number> {
  if (!eh) return 0
  const row = await prisma.paidCredits.findUnique({
    where: { emailHash: eh },
    select: { balance: true },
  })
  return row?.balance ?? 0
}

export async function spendOneCredit(
  eh: string,
): Promise<{ ok: boolean; balance: number }> {
  // Race-safe: only update if balance > 0
  const result = await prisma.paidCredits.updateMany({
    where: { emailHash: eh, balance: { gt: 0 } },
    data: { balance: { decrement: 1 }, totalUsed: { increment: 1 } },
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
): Promise<{ balance: number }> {
  const eh = emailHash(email)
  const row = await prisma.paidCredits.upsert({
    where: { emailHash: eh },
    create: {
      emailHash: eh,
      email,
      balance: count,
      totalEarned: count,
      lastPurchase: new Date(),
    },
    update: {
      balance: { increment: count },
      totalEarned: { increment: count },
      lastPurchase: new Date(),
    },
    select: { balance: true },
  })
  return { balance: row.balance }
}
