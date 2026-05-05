// Anonymous-tier daily quota for interactive tools (e.g. personal-color-analysis).
// Defends against trivial cookie-clearing reset by also tracking ip+ua hash.
// Counts only "free" usages here; "paid" credits will live in a separate model
// when Stripe lands.

import { createHash, randomUUID } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export const ANON_COOKIE = 'prompta_anon'
export const FREE_DAILY_LIMIT = 3
export const FREE_IP_DAILY_LIMIT = 5 // shared-IP tolerance

function startOfTodayUTC(): Date {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  return d
}

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
  const since = startOfTodayUTC()
  const [freeUsed, ipUsed] = await Promise.all([
    prisma.toolUsage.count({
      where: { anonId, tool, type: 'free', createdAt: { gte: since } },
    }),
    prisma.toolUsage.count({
      where: { ipHash, tool, type: 'free', createdAt: { gte: since } },
    }),
  ])

  let blockReason: QuotaState['blockReason'] = 'none'
  let canUse = true
  if (freeUsed >= FREE_DAILY_LIMIT) {
    blockReason = 'free_exhausted'
    canUse = false
  } else if (ipUsed >= FREE_IP_DAILY_LIMIT) {
    blockReason = 'ip_exhausted'
    canUse = false
  }

  return {
    remainingFree: Math.max(FREE_DAILY_LIMIT - freeUsed, 0),
    freeUsedToday: freeUsed,
    ipUsedToday: ipUsed,
    paidCredits: 0,
    canUse,
    blockReason,
    anonId,
  }
}

export async function consumeFreeQuota(
  anonId: string,
  ipHash: string,
  tool: string,
): Promise<QuotaState> {
  const state = await getQuotaState(anonId, ipHash, tool)
  if (!state.canUse) return state
  await prisma.toolUsage.create({
    data: { anonId, ipHash, tool, type: 'free' },
  })
  return getQuotaState(anonId, ipHash, tool)
}
