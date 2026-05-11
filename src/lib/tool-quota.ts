// Credit-based tool quota system (Phase 0 pivot 2026-05-11).
//
// Previously: anonymous users had 3 free runs per (anonId, tool), then had
// to pay. Now: ALL runs require login. Logged-in users get 3 welcome
// credits (one-time), then must purchase more. Credits are site-wide
// shared (not per-tool).
//
// Backward-compat exports: FREE_LIMIT / FREE_IP_LIMIT / consumeFreeQuota
// retained as deprecated stubs to ease migration of any forgotten callers
// — they always reject with reason='login_required'.
import { createHash, randomUUID } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export const ANON_COOKIE = 'prompta_anon'

// Deprecated constants retained for type compatibility (Phase 0).
// All real quota logic now lives in credit balance checks.
export const FREE_LIMIT = 0
export const FREE_IP_LIMIT = 0
export const FREE_DAILY_LIMIT = 0
export const FREE_IP_DAILY_LIMIT = 0

export function hashIp(ip: string, ua: string): string {
  return createHash('sha256').update(`${ip}|${ua}`).digest('hex').slice(0, 32)
}

export function extractClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') || '0.0.0.0'
}

// QuotaState still returned for client compatibility, but `remainingFree`
// always 0 and `paidCredits` is the actual UserCredits.balance. `canUse`
// is true iff paidCredits > 0 (and user is logged in, checked elsewhere).
export interface QuotaState {
  remainingFree: number
  freeUsedToday: number
  ipUsedToday: number
  paidCredits: number
  canUse: boolean
  blockReason: 'none' | 'login_required' | 'credits_exhausted'
  anonId: string
}

export async function ensureAnonId(): Promise<string> {
  const store = await cookies()
  const existing = store.get(ANON_COOKIE)?.value
  if (existing && /^[a-z0-9-]{8,}$/i.test(existing)) return existing
  const id = randomUUID()
  store.set(ANON_COOKIE, id, {
    httpOnly: false,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })
  return id
}

// New unified state: requires the caller to pass the resolved emailHash
// (from getOwnerEmailHash). If null → user is not logged in.
export async function getQuotaState(
  anonId: string,
  _ipHash: string,
  _tool: string,
  emailHash?: string | null,
): Promise<QuotaState> {
  const balance = emailHash
    ? (await prisma.paidCredits.findUnique({
        where: { emailHash },
        select: { balance: true },
      }))?.balance ?? 0
    : 0
  return {
    remainingFree: 0,
    freeUsedToday: 0,
    ipUsedToday: 0,
    paidCredits: balance,
    canUse: !!emailHash && balance > 0,
    blockReason: !emailHash ? 'login_required' : balance > 0 ? 'none' : 'credits_exhausted',
    anonId,
  }
}

// Deprecated — kept so any not-yet-migrated import compiles. Always fails.
export async function consumeFreeQuota(
  anonId: string,
  _ipHash: string,
  _tool: string,
): Promise<{
  ok: false
  reason: 'login_required'
  state: QuotaState
}> {
  return {
    ok: false,
    reason: 'login_required',
    state: {
      remainingFree: 0,
      freeUsedToday: 0,
      ipUsedToday: 0,
      paidCredits: 0,
      canUse: false,
      blockReason: 'login_required',
      anonId,
    },
  }
}
