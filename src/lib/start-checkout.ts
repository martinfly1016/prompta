import { redirectAfterBeginCheckout, trackPurchaseClick, type PaywallTool } from '@/lib/track'
import type { PointPack } from '@/lib/credit-costs'

export function redirectToSignIn(returnPath: string) {
  const callback = returnPath.startsWith('/') ? returnPath : `/${returnPath}`
  window.location.assign(`/auth/signin?callbackUrl=${encodeURIComponent(callback)}`)
}

export function signInThenCheckout(returnPath: string, packId?: string) {
  const url = new URL(returnPath, window.location.origin)
  url.searchParams.set('checkout', '1')
  if (packId) url.searchParams.set('pack', packId)
  redirectToSignIn(url.pathname + url.search)
}

// Signed-in purchase. Fires the legacy click event, then begin_checkout
// only after Stripe returns a URL, and waits for the beacon before leaving.
export async function startCreditCheckout(opts: {
  endpoint: string
  tool: PaywallTool
  pack: PointPack
}): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  trackPurchaseClick(opts.tool, true)
  const endpoint = new URL(opts.endpoint, window.location.origin)
  endpoint.searchParams.set('pack', opts.pack.id)
  const r = await fetch(endpoint.pathname + endpoint.search, { method: 'POST' })
  if (r.status === 401) {
    return { ok: false, status: 401, error: 'auth_required' }
  }
  if (!r.ok) {
    const body = await r.json().catch(() => ({}))
    return { ok: false, status: r.status, error: body?.error ?? 'config' }
  }
  const data = await r.json().catch(() => ({}))
  if (!data?.url) {
    return { ok: false, status: 502, error: 'no_checkout_url' }
  }
  redirectAfterBeginCheckout(data.url, opts.tool, opts.pack)
  return { ok: true }
}
