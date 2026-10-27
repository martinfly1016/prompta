// GA4 is only allowed on the public production site. Local dev, Playwright,
// and Vercel previews must not inject the tag or emit hits.

export const GA_MEASUREMENT_ID = 'G-76RGV3H6S2'

export const PRODUCTION_ANALYTICS_HOSTS = ['www.prompta.jp', 'prompta.jp'] as const

// Full URL. Used by Playwright to abort analytics requests.
export const BLOCKED_ANALYTICS_URL =
  /^https?:\/\/(?:[\w-]+\.)*(?:googletagmanager\.com|google-analytics\.com)(?::\d+)?(?:[/?#]|$)/i

export function isProductionVercelEnv(
  vercelEnv: string | undefined,
  publicVercelEnv: string | undefined,
): boolean {
  const env = vercelEnv || publicVercelEnv
  return env === 'production'
}

export function isProductionAnalyticsHost(hostname: string | null | undefined): boolean {
  if (!hostname) return false
  const host = hostname.toLowerCase().replace(/\.$/, '')
  return (PRODUCTION_ANALYTICS_HOSTS as readonly string[]).includes(host)
}

// Live Checkout sessions on the production domain only. Stripe test-mode
// ids (cs_test_*) are what Playwright's simulate-payment endpoint creates.
export function shouldSendPurchase(
  transactionId: string,
  hostname: string | null | undefined,
): boolean {
  if (typeof transactionId !== 'string' || transactionId.length === 0) return false
  if (transactionId.startsWith('cs_test_')) return false
  return isProductionAnalyticsHost(hostname)
}

export function isBlockedAnalyticsUrl(url: string): boolean {
  return BLOCKED_ANALYTICS_URL.test(url)
}

// Inline bootstrap. The library request and gtag('config') run only after
// the hostname check, so a production bundle opened on any other host
// (localhost, *.vercel.app) still sends nothing.
export function googleAnalyticsBootstrapScript(): string {
  const id = JSON.stringify(GA_MEASUREMENT_ID)
  const hostCheck = PRODUCTION_ANALYTICS_HOSTS.map((host) => `host === ${JSON.stringify(host)}`).join(' || ')
  return `
(function () {
  var host = String(location.hostname || '').replace(/\\.$/, '').toLowerCase();
  if (!(${hostCheck})) return;
  var id = ${id};
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(s);
})();
`.trim()
}
