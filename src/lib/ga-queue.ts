import { cookies } from 'next/headers'
import { GA_COOKIE, parseGaCookie, serializeGaCookie, type GaEvent } from '@/lib/ga-events'

function cookieSecure(): boolean {
  return (process.env.NEXTAUTH_URL || '').startsWith('https://')
}

// Append confirmed events to a short-lived cookie. The next page (or the
// same page, after it reads the response) fires them and clears the cookie.
// Login and welcome grants happen inside the OAuth redirect, where the
// browser never sees a JSON body — the cookie is what keeps those hits.
export async function enqueueGaEvents(events: GaEvent[]): Promise<GaEvent[]> {
  if (!events.length) return []
  try {
    const store = await cookies()
    const existing = parseGaCookie(store.get(GA_COOKIE)?.value)
    const ids = new Set(existing.map((e) => e.id))
    const merged = [...existing]
    for (const event of events) {
      if (!ids.has(event.id)) merged.push(event)
    }
    store.set(GA_COOKIE, serializeGaCookie(merged.slice(-8)), {
      httpOnly: false,
      sameSite: 'lax',
      secure: cookieSecure(),
      path: '/',
      maxAge: 60 * 30,
    })
  } catch (e) {
    console.error('[ga] enqueue failed:', e instanceof Error ? e.message : e)
  }
  return events
}
