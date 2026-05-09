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

// Atomically reserve one free quota slot. Strategy: optimistic INSERT, then
// rank our own row among committed rows (ordered by createdAt, id). If our
// rank exceeds the per-anon or per-ip cap, delete our own row and report
// the failure. Two-phase delete-after-rank avoids the read-modify-write
// race that lets concurrent INSERTs all see count<LIMIT and bypass the cap.
//
// We deliberately INSERT outside any transaction so the row is visible to
// other concurrent rank queries the moment our INSERT statement returns.
// Wrapping the INSERT and the rank count in a single transaction would put
// us under READ COMMITTED isolation where peer transactions' uncommitted
// rows are invisible — re-creating the original race.
export async function consumeFreeQuota(
  anonId: string,
  ipHash: string,
  tool: string,
): Promise<ReserveResult> {
  const created = await prisma.toolUsage.create({
    data: { anonId, ipHash, tool, type: 'free' },
    select: { id: true, createdAt: true },
  })

  const rankWhere = (filter: Record<string, unknown>) => ({
    ...filter,
    tool,
    type: 'free' as const,
    OR: [
      { createdAt: { lt: created.createdAt } },
      { createdAt: created.createdAt, id: { lte: created.id } },
    ],
  })

  const [anonRank, ipRank, freeUsedAfter, ipUsedAfter] = await Promise.all([
    prisma.toolUsage.count({ where: rankWhere({ anonId }) }),
    prisma.toolUsage.count({ where: rankWhere({ ipHash }) }),
    prisma.toolUsage.count({ where: { anonId, tool, type: 'free' } }),
    prisma.toolUsage.count({ where: { ipHash, tool, type: 'free' } }),
  ])

  const buildState = (extra: Partial<QuotaState> = {}): QuotaState => {
    const free = extra.freeUsedToday ?? freeUsedAfter
    const ip = extra.ipUsedToday ?? ipUsedAfter
    return {
      remainingFree: Math.max(FREE_LIMIT - free, 0),
      freeUsedToday: free,
      ipUsedToday: ip,
      paidCredits: 0,
      canUse: free < FREE_LIMIT && ip < FREE_IP_LIMIT,
      blockReason:
        free >= FREE_LIMIT
          ? 'free_exhausted'
          : ip >= FREE_IP_LIMIT
            ? 'ip_exhausted'
            : 'none',
      anonId,
      ...extra,
    }
  }

  if (anonRank > FREE_LIMIT) {
    await prisma.toolUsage
      .delete({ where: { id: created.id } })
      .catch(() => {})
    return {
      ok: false,
      reason: 'free_exhausted',
      state: buildState({
        freeUsedToday: Math.max(freeUsedAfter - 1, 0),
        ipUsedToday: Math.max(ipUsedAfter - 1, 0),
      }),
    }
  }
  if (ipRank > FREE_IP_LIMIT) {
    await prisma.toolUsage
      .delete({ where: { id: created.id } })
      .catch(() => {})
    return {
      ok: false,
      reason: 'ip_exhausted',
      state: buildState({
        freeUsedToday: Math.max(freeUsedAfter - 1, 0),
        ipUsedToday: Math.max(ipUsedAfter - 1, 0),
      }),
    }
  }

  return { ok: true, id: created.id, state: buildState() }
}
