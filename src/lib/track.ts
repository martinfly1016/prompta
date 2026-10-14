// Client-side tracking helpers: fire GA4 event + increment DB counter.
// Both calls are fire-and-forget; failures are silently swallowed so they never
// block the user-facing action (copy / open).

type TrackMeta = {
  slug?: string
  category?: string | null
  tool?: string | null
  // Where the user triggered the action ('detail', 'tag-card', 'category-card', etc.)
  surface?: string
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
      surface: meta.surface ?? undefined,
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

export function trackParamChange(
  promptId: string | undefined,
  paramId: string,
  value: string,
  meta: TrackMeta,
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', 'prompt_param_changed', {
      prompt_id: promptId,
      prompt_slug: meta.slug,
      prompt_category: meta.category ?? undefined,
      prompt_tool: meta.tool ?? undefined,
      param_id: paramId,
      param_value: value,
    })
  } catch {
    // ignore
  }
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

export function trackToolEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', eventName, params)
  } catch {
    // ignore
  }
}

// --- Freemium tool paywall funnel events ---
// 3-step funnel: paywall_view → paywall_purchase_click → checkout_started → (Stripe success)
// Trigger labels distinguish how the user reached the paywall.

export type PaywallTool = 'hair-color' | 'personal-color' | 'prompt' | 'account'
export type PaywallTrigger =
  | 'badge'             // exhausted-state badge click (preventive)
  | 'candidate_card'    // disabled candidate "ポイント不足" →购入
  | 'upsell_banner'     // soft upsell banner above candidates
  | 'login_required'    // unauthenticated user clicked an action that needs credits
  | 'exhausted_pick'    // signed-in user with 0 credits tried to upload a new photo
  | 'exhausted_analyze' // backend 429 from /analyze endpoint
  | 'exhausted_simulate'// no credits when picking a candidate
  | 'exhausted_429'     // backend 429 from /simulate endpoint

function fireToolEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try { window.gtag('event', eventName, params) } catch {}
}

export function trackPaywallView(tool: PaywallTool, trigger: PaywallTrigger) {
  fireToolEvent('paywall_view', { tool, trigger })
}

export function trackPurchaseClick(tool: PaywallTool, signedIn: boolean) {
  fireToolEvent('paywall_purchase_click', { tool, signed_in: signedIn })
}

export function trackCheckoutStarted(tool: PaywallTool) {
  fireToolEvent('checkout_started', { tool })
}

const PACK_ITEM = {
  item_id: 'credit-pack-150',
  item_name: '150 credit pack',
  price: 300,
  quantity: 1,
}

// GA4 begin_checkout. Also emits the legacy checkout_started name so the
// existing funnel report keeps working. Callers that are about to navigate
// must use redirectAfterBeginCheckout so the hit is not dropped on unload.
export function trackBeginCheckout(tool: string) {
  const params = {
    currency: 'JPY',
    value: 300,
    items: [PACK_ITEM],
    tool,
  }
  fireToolEvent('begin_checkout', params)
  fireToolEvent('checkout_started', { tool })
}

export function redirectAfterBeginCheckout(url: string, tool: string) {
  if (typeof window === 'undefined') return
  let left = false
  const go = () => {
    if (left) return
    left = true
    window.location.assign(url)
  }
  if (typeof window.gtag !== 'function') {
    go()
    return
  }
  try {
    window.gtag('event', 'begin_checkout', {
      currency: 'JPY',
      value: 300,
      items: [PACK_ITEM],
      tool,
      transport_type: 'beacon',
      event_callback: go,
      event_timeout: 1000,
    })
    window.gtag('event', 'checkout_started', {
      tool,
      transport_type: 'beacon',
    })
  } catch {
    go()
    return
  }
  window.setTimeout(go, 1200)
}

export function trackPurchase(p: {
  transactionId: string
  value: number
  currency: string
  credits: number
  tool?: string
}) {
  if (!p.transactionId) return
  const key = `purchase_tracked:${p.transactionId}`
  try {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key)) return
    sessionStorage?.setItem(key, '1')
  } catch {
    // still fire once if storage is blocked
  }
  fireToolEvent('purchase', {
    transaction_id: p.transactionId,
    value: p.value,
    currency: p.currency,
    tool: p.tool,
    items: [
      {
        item_id: 'credit-pack-150',
        item_name: `${p.credits} credit pack`,
        price: p.value,
        quantity: 1,
      },
    ],
  })
}
