import { GA_COOKIE, parseGaCookie, type GaEvent } from '@/lib/ga-events'
import { getPointPack, type PointPack } from '@/lib/credit-costs'
import { shouldSendPurchase } from '@/lib/ga-config'

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
    dataLayer?: unknown[]
  }
}

function callGtag(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', eventName, params)
  } catch {
    // ignore — tracking must never break the action that triggered it
  }
}

function fireGtag(eventName: string, promptId: string | undefined, meta: TrackMeta) {
  callGtag(eventName, {
    prompt_id: promptId,
    prompt_slug: meta.slug,
    prompt_category: meta.category ?? undefined,
    prompt_tool: meta.tool ?? undefined,
    surface: meta.surface ?? undefined,
  })
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
  callGtag('prompt_param_changed', {
    prompt_id: promptId,
    prompt_slug: meta.slug,
    prompt_category: meta.category ?? undefined,
    prompt_tool: meta.tool ?? undefined,
    param_id: paramId,
    param_value: value,
  })
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
  callGtag(eventName, params)
}

// --- Freemium tool paywall funnel events ---
// 3-step funnel: paywall_view → paywall_purchase_click → checkout_started → (Stripe success)
// Trigger labels distinguish how the user reached the paywall.

export type PaywallTool = 'hair-color' | 'personal-color' | 'prompt' | 'account' | 'height-difference'
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
  callGtag(eventName, params)
}

// Beacon so the hit survives the navigation that often follows a click.
// Absent gtag is a no-op: do not queue on dataLayer, or a tag that loads
// later could flush localhost / preview / E2E hits.
function fireBeacon(eventName: string, params: Record<string, unknown>) {
  callGtag(eventName, { ...params, transport_type: 'beacon' })
}

const sentGaIds = new Set<string>()

function claimGaId(id: string): boolean {
  if (sentGaIds.has(id)) return false
  sentGaIds.add(id)
  const key = `ga_sent:${id}`
  try {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem(key)) return false
      sessionStorage.setItem(key, '1')
    }
  } catch {
    // storage blocked — the in-memory set still dedupes this page
  }
  return true
}

function readGaCookie(): GaEvent[] {
  if (typeof document === 'undefined') return []
  const part = document.cookie.split('; ').find((row) => row.startsWith(`${GA_COOKIE}=`))
  if (!part) return []
  return parseGaCookie(part.slice(GA_COOKIE.length + 1))
}

function clearGaCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${GA_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`
}

function emitGaEvents(events: GaEvent[]) {
  for (const event of events) {
    if (!event?.id || !event.name || !claimGaId(event.id)) continue
    fireBeacon(event.name, event.params)
  }
}

// Fire events the server already committed (response `ga` and/or the
// redirect cookie). Deduped by id so a reload does not double-count.
export function flushConfirmedGaEvents(extra?: GaEvent[] | null) {
  const queued = readGaCookie()
  emitGaEvents([...(extra || []), ...queued])
  clearGaCookie()
}

// Signed-in UI blocked an action using a balance the server just reported.
// This is not a purchase click.
export function trackInsufficientPoints(tool: string, needed: number, balance: number) {
  fireBeacon('insufficient_points', { tool, needed, balance })
}

// A control whose only job is to start sign-in. Never use this for a buy button.
export function trackLoginClick(surface: string) {
  fireBeacon('login_click', { surface })
}

export function trackPaywallView(tool: PaywallTool, trigger: PaywallTrigger) {
  fireToolEvent('paywall_view', { tool, trigger })
}

// Real purchase intent only: the buy button, including "sign in to buy".
// Login-for-free and header login use trackLoginClick instead.
export function trackPurchaseClick(tool: PaywallTool, signedIn: boolean) {
  fireBeacon('paywall_purchase_click', { tool, signed_in: signedIn })
}

export function trackCheckoutStarted(tool: PaywallTool) {
  fireToolEvent('checkout_started', { tool })
}

function packItem(pack: PointPack) {
  return {
    item_id: pack.id,
    item_name: pack.name,
    price: pack.priceJpy,
    quantity: 1,
  }
}

function checkoutParams(tool: string, pack: PointPack) {
  // Always re-read the catalog so a partial pack object still has price and id.
  const known = getPointPack(pack?.id) ?? pack
  return {
    currency: 'JPY' as const,
    value: known.priceJpy,
    pack_id: known.id,
    items: [packItem(known)],
    tool,
  }
}

// gtag.js treats begin_checkout as ecommerce and deletes value, currency, and
// items from the arguments object it stored on dataLayer. Put those fields
// back, then append a plain array that the tag's push hook does not rewrite.
function publishCheckoutEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const snapshot = {
    currency: params.currency,
    value: params.value,
    pack_id: params.pack_id,
    tool: params.tool,
    items: Array.isArray(params.items)
      ? params.items.map((item) => ({ ...(item as object) }))
      : [],
  }
  const dl = (window.dataLayer = window.dataLayer || [])
  for (let i = dl.length - 1; i >= 0; i--) {
    const row = dl[i] as { 1?: unknown; 2?: Record<string, unknown> } | undefined
    if (!row || row[1] !== name) continue
    const target = row[2] && typeof row[2] === 'object' ? row[2] : {}
    target.currency = snapshot.currency
    target.value = snapshot.value
    target.pack_id = snapshot.pack_id
    target.tool = snapshot.tool
    target.items = snapshot.items
    row[2] = target
    break
  }
  Array.prototype.push.call(dl, ['event', name, snapshot])
}

// GA4 begin_checkout. Also emits the legacy checkout_started name so the
// existing funnel report keeps working. Callers that are about to navigate
// must use redirectAfterBeginCheckout so the hit is not dropped on unload.
export function trackBeginCheckout(tool: string, pack: PointPack) {
  const params = checkoutParams(tool, pack)
  fireToolEvent('begin_checkout', params)
  publishCheckoutEvent('begin_checkout', params)
  fireToolEvent('checkout_started', { tool, pack_id: params.pack_id, value: params.value })
}

export function redirectAfterBeginCheckout(url: string, tool: string, pack: PointPack) {
  if (typeof window === 'undefined') return
  let left = false
  const go = () => {
    if (left) return
    left = true
    window.location.assign(url)
  }
  const params = checkoutParams(tool, pack)
  if (typeof window.gtag !== 'function') {
    publishCheckoutEvent('begin_checkout', params)
    go()
    return
  }
  try {
    // Do not pass event_callback. The real gtag invokes it in the same turn
    // as dataLayer.push and leaves the page before readers can see the hit.
    // transport_type beacon plus the delayed navigation keeps the hit.
    window.gtag('event', 'begin_checkout', {
      ...params,
      transport_type: 'beacon',
    })
    window.gtag('event', 'checkout_started', {
      tool,
      pack_id: params.pack_id,
      value: params.value,
      transport_type: 'beacon',
    })
  } catch {
    publishCheckoutEvent('begin_checkout', params)
    go()
    return
  }
  publishCheckoutEvent('begin_checkout', params)
  window.setTimeout(go, 1200)
}

// Explicit page_view for Stripe's full-page return. The success handler
// removes ?purchase= before gtag's automatic hit may run, so the return
// would otherwise look like a normal tool pageview. Deduped per URL.
// `purchase` itself is still trackPurchase, and only after server confirm.
export function trackCheckoutReturn(kind: 'success' | 'cancelled') {
  if (typeof window === 'undefined') return
  const pageLocation = window.location.href
  const key = `checkout_return_view:${kind}:${pageLocation}`
  try {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    }
  } catch {
    // still fire once if storage is blocked
  }
  fireBeacon('page_view', {
    page_location: pageLocation,
    page_title: typeof document !== 'undefined' ? document.title : '',
    checkout_return: kind,
  })
}

export function trackPurchase(p: {
  transactionId: string
  value: number
  currency: string
  credits: number
  packId?: string
  tool?: string
}) {
  // Live purchases on the production hosts only. cs_test_* (Playwright
  // simulate-payment) and any other hostname return before the dedupe write.
  const hostname = typeof window === 'undefined' ? undefined : window.location.hostname
  if (!shouldSendPurchase(p.transactionId, hostname)) return
  const key = `purchase_tracked:${p.transactionId}`
  try {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key)) return
    sessionStorage?.setItem(key, '1')
  } catch {
    // still fire once if storage is blocked
  }
  const value = Number(p.value)
  const currency = (p.currency || 'JPY').toUpperCase()
  const pack = getPointPack(p.packId)
  fireBeacon('purchase', {
    transaction_id: p.transactionId,
    value: Number.isFinite(value) ? value : 0,
    currency,
    pack_id: pack?.id ?? p.packId ?? '',
    tool: p.tool,
    items: [
      {
        item_id: pack?.id ?? 'credit-pack',
        item_name: pack?.name ?? `${p.credits}ポイント`,
        price: Number.isFinite(value) ? value : 0,
        quantity: 1,
      },
    ],
  })
}
