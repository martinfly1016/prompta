// Shared GA4 event payloads. Safe to import from client and server.
// Server routes enqueue these after the action is confirmed; the browser
// drains them with a beacon so a redirect cannot drop the hit.

export const GA_COOKIE = 'prompta_ga'

export interface GaEvent {
  id: string
  name: string
  params: Record<string, string | number | boolean>
}

export function makeGaEvent(
  name: string,
  params: Record<string, string | number | boolean>,
): GaEvent {
  return {
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    name,
    params,
  }
}

export function pointsSpentEvent(tool: string, amount: number, balanceAfter: number): GaEvent {
  return makeGaEvent('points_spent', {
    tool,
    amount,
    balance_after: balanceAfter,
  })
}

export function insufficientPointsEvent(tool: string, needed: number, balance: number): GaEvent {
  return makeGaEvent('insufficient_points', { tool, needed, balance })
}

export function signUpEvent(method: string): GaEvent {
  return makeGaEvent('sign_up', { method })
}

export function welcomeBonusEvent(amount: number, isTopup: boolean): GaEvent {
  return makeGaEvent('welcome_bonus_granted', {
    amount,
    is_topup: isTopup,
  })
}

export function parseGaCookie(raw: string | undefined | null): GaEvent[] {
  if (!raw) return []
  try {
    const text = raw.startsWith('%') || raw.startsWith('%5B') ? decodeURIComponent(raw) : raw
    const parsed = JSON.parse(text)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (e): e is GaEvent =>
          !!e &&
          typeof e.id === 'string' &&
          typeof e.name === 'string' &&
          e.params != null &&
          typeof e.params === 'object',
      )
      .slice(-8)
  } catch {
    return []
  }
}

export function serializeGaCookie(events: GaEvent[]): string {
  return encodeURIComponent(JSON.stringify(events.slice(-8)))
}
