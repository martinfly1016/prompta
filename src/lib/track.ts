// Client-side tracking helpers: fire GA4 event + increment DB counter.
// Both calls are fire-and-forget; failures are silently swallowed so they never
// block the user-facing action (copy / open).

type TrackMeta = {
  slug?: string
  category?: string | null
  tool?: string | null
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
  }
}

function fireGtag(eventName: string, promptId: string | undefined, meta: TrackMeta) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', eventName, {
      prompt_id: promptId,
      prompt_slug: meta.slug,
      prompt_category: meta.category ?? undefined,
      prompt_tool: meta.tool ?? undefined,
    })
  } catch {
    // ignore
  }
}

function fireDbIncrement(path: 'view' | 'copy', promptId: string | undefined) {
  if (!promptId || typeof window === 'undefined') return
  const url = `/api/prompts/${promptId}/${path}`
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(url)
      return
    }
  } catch {
    // fall through
  }
  fetch(url, { method: 'POST', keepalive: true }).catch(() => {})
}

export function trackPromptView(promptId: string | undefined, meta: TrackMeta) {
  if (!promptId) return
  // Debounce: skip if we already counted this prompt this session
  const key = `viewed:${promptId}`
  try {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key)) return
    sessionStorage?.setItem(key, '1')
  } catch {
    // sessionStorage unavailable (private mode) — still fire once
  }
  fireGtag('view_prompt', promptId, meta)
  fireDbIncrement('view', promptId)
}

export function trackPromptCopy(promptId: string | undefined, meta: TrackMeta) {
  fireGtag('copy_prompt', promptId, meta)
  fireDbIncrement('copy', promptId)
}

export function trackPromptTry(
  promptId: string | undefined,
  target: 'chatgpt' | 'gemini' | 'dall-e' | 'claude',
  meta: TrackMeta,
) {
  fireGtag('try_in_external', promptId, { ...meta, tool: target })
  // Treat "try in external" as a stronger copy signal too — counts toward copyCount
  fireDbIncrement('copy', promptId)
}
