// Credit-based tool quota system (Phase 0 pivot 2026-05-11).
//
// Previously: anonymous users had 3 free runs per (anonId, tool), then had
// to pay. Now: ALL runs require login. New sign-ins get WELCOME_POINTS
// (one-time), then must purchase more. Credits are site-wide.
// The ToolUsage.type column still defaults to "free" in the schema; writers
// pass type: 'paid'. There is no free-quota path.
import { createHash, randomUUID } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const ANON_COOKIE = 'prompta_anon'

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
