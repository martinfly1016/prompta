// Anonymous-tier free trial quota for interactive tools (e.g.
// personal-color-analysis, hair-color-diagnosis). Limit is LIFETIME per
// (anonId, tool) — once exhausted, the user must buy a paid pack to keep
// going. Defends against trivial cookie-clearing reset by also tracking
// ip+ua hash with a slightly higher cap.

import { createHash, randomUUID } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export const ANON_COOKIE = 'prompta_anon'
export const FREE_LIMIT = 3
export const FREE_IP_LIMIT = 5 // shared-IP tolerance (households, offices)

// Backward-compat aliases — older imports may still reference the daily
// names. Same semantics now (lifetime, not daily).
export const FREE_DAILY_LIMIT = FREE_LIMIT
export const FREE_IP_DAILY_LIMIT = FREE_IP_LIMIT

export function hashIp(ip: string, ua: string): string {
  return createHash('sha256').update(`${ip}|${ua}`).digest('hex').slice(0, 32)
}

export function extractClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') || '0.0.0.0'
}

export interface QuotaState {
  remainingFree: number
  freeUsedToday: number
  ipUsedToday: number
  paidCredits: number // always 0 in Phase 1; reserved for Phase 2
  canUse: boolean
  blockReason: 'none' | 'free_exhausted' | 'ip_exhausted'
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

export async function getQuotaState(
  anonId: string,
  ipHash: string,
  tool: string,
): Promise<QuotaState> {
  // Lifetime count per (anonId, tool) and (ipHash, tool) — no date floor.
  const [freeUsed, ipUsed] = await Promise.all([
    prisma.toolUsage.count({
      where: { anonId, tool, type: 'free' },
    }),
    prisma.toolUsage.count({
      where: { ipHash, tool, type: 'free' },
    }),
  ])

  let blockReason: QuotaState['blockReason'] = 'none'
  let canUse = true
  if (freeUsed >= FREE_LIMIT) {
    blockReason = 'free_exhausted'
    canUse = false
  } else if (ipUsed >= FREE_IP_LIMIT) {
    blockReason = 'ip_exhausted'
    canUse = false
  }

  return {
    remainingFree: Math.max(FREE_LIMIT - freeUsed, 0),
    freeUsedToday: freeUsed,
    ipUsedToday: ipUsed,
    paidCredits: 0,
    canUse,
    blockReason,
    anonId,
  }
}

// Compute a 64-bit signed int from a string for use as a Postgres advisory
// lock key. Takes the first 8 bytes of SHA-256 and reinterprets as int8.
function lockKey(parts: string): bigint {
  const h = createHash('sha256').update(parts).digest()
  return h.readBigInt64BE(0)
}

export interface ReserveSuccess {
  ok: true
  id: string
  state: QuotaState
}
export interface ReserveFailure {
  ok: false
  reason: 'free_exhausted' | 'ip_exhausted'
  state: QuotaState
}
export type ReserveResult = ReserveSuccess | ReserveFailure

// Atomically reserve one free quota slot for (anonId, tool). Concurrent
// requests for the same anonId are serialized via a Postgres transaction-
// scoped advisory lock, eliminating the read-modify-write race that
// previously let burst-clicks bypass FREE_LIMIT. The IP cap is checked in
// the same transaction; cross-anonId/same-IP races are still possible but
// require multiple anonIds, are bounded, and don't grant unlimited free
// usage.
export async function consumeFreeQuota(
  anonId: string,
  ipHash: string,
  tool: string,
): Promise<ReserveResult> {
  const key = lockKey(`tool-quota:${tool}:${anonId}`)

  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(${key})`

    const [freeUsed, ipUsed] = await Promise.all([
      tx.toolUsage.count({ where: { anonId, tool, type: 'free' } }),
      tx.toolUsage.count({ where: { ipHash, tool, type: 'free' } }),
    ])

    const buildState = (extra: Partial<QuotaState> = {}): QuotaState => ({
      remainingFree: Math.max(FREE_LIMIT - freeUsed, 0),
      freeUsedToday: freeUsed,
      ipUsedToday: ipUsed,
      paidCredits: 0,
      canUse: freeUsed < FREE_LIMIT && ipUsed < FREE_IP_LIMIT,
      blockReason:
        freeUsed >= FREE_LIMIT
          ? 'free_exhausted'
          : ipUsed >= FREE_IP_LIMIT
            ? 'ip_exhausted'
            : 'none',
      anonId,
      ...extra,
    })

    if (freeUsed >= FREE_LIMIT) {
      return { ok: false, reason: 'free_exhausted', state: buildState() }
    }
    if (ipUsed >= FREE_IP_LIMIT) {
      return { ok: false, reason: 'ip_exhausted', state: buildState() }
    }

    const row = await tx.toolUsage.create({
      data: { anonId, ipHash, tool, type: 'free' },
      select: { id: true },
    })

    // After the insert, the new free count is freeUsed + 1.
    return {
      ok: true,
      id: row.id,
      state: buildState({
        remainingFree: Math.max(FREE_LIMIT - (freeUsed + 1), 0),
        freeUsedToday: freeUsed + 1,
        ipUsedToday: ipUsed + 1,
        canUse: freeUsed + 1 < FREE_LIMIT && ipUsed + 1 < FREE_IP_LIMIT,
        blockReason:
          freeUsed + 1 >= FREE_LIMIT
            ? 'free_exhausted'
            : ipUsed + 1 >= FREE_IP_LIMIT
              ? 'ip_exhausted'
              : 'none',
      }),
    }
  })
}
