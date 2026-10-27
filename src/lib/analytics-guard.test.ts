import assert from 'node:assert/strict'
import vm from 'node:vm'
import { afterEach, describe, it } from 'node:test'
import { getPointPack } from './credit-costs'
import {
  BLOCKED_ANALYTICS_URL,
  GA_MEASUREMENT_ID,
  googleAnalyticsBootstrapScript,
  isBlockedAnalyticsUrl,
  isProductionAnalyticsHost,
  isProductionVercelEnv,
  shouldSendPurchase,
} from './ga-config'
import { redirectAfterBeginCheckout, trackBeginCheckout, trackPaywallView, trackPurchase } from './track'

const ORIGINAL = {
  window: (globalThis as { window?: unknown }).window,
  sessionStorage: (globalThis as { sessionStorage?: unknown }).sessionStorage,
}

afterEach(() => {
  const g = globalThis as unknown as Record<string, unknown>
  if (ORIGINAL.window === undefined) delete g.window
  else g.window = ORIGINAL.window
  if (ORIGINAL.sessionStorage === undefined) delete g.sessionStorage
  else g.sessionStorage = ORIGINAL.sessionStorage
})

describe('vercel env gate', () => {
  it('injects only when the resolved env is production', () => {
    assert.equal(isProductionVercelEnv('production', undefined), true)
    assert.equal(isProductionVercelEnv(undefined, 'production'), true)
    assert.equal(isProductionVercelEnv('production', 'preview'), true)
    assert.equal(isProductionVercelEnv('', 'production'), true)
    assert.equal(isProductionVercelEnv('preview', 'production'), false)
    assert.equal(isProductionVercelEnv('preview', undefined), false)
    assert.equal(isProductionVercelEnv(undefined, 'development'), false)
    assert.equal(isProductionVercelEnv(undefined, undefined), false)
  })
})

describe('production analytics host', () => {
  it('accepts only the public domains', () => {
    assert.equal(isProductionAnalyticsHost('www.prompta.jp'), true)
    assert.equal(isProductionAnalyticsHost('prompta.jp'), true)
    assert.equal(isProductionAnalyticsHost('WWW.PROMPTA.JP'), true)
    assert.equal(isProductionAnalyticsHost('www.prompta.jp.'), true)
    assert.equal(isProductionAnalyticsHost('localhost'), false)
    assert.equal(isProductionAnalyticsHost('prompta.vercel.app'), false)
    assert.equal(isProductionAnalyticsHost('www.prompta.jp.evil.com'), false)
    assert.equal(isProductionAnalyticsHost(''), false)
    assert.equal(isProductionAnalyticsHost(null), false)
  })
})

describe('purchase send guard', () => {
  it('drops test sessions and non-production hosts', () => {
    assert.equal(shouldSendPurchase('cs_live_123', 'www.prompta.jp'), true)
    assert.equal(shouldSendPurchase('cs_live_123', 'prompta.jp'), true)
    assert.equal(shouldSendPurchase('cs_test_simulated_1', 'www.prompta.jp'), false)
    assert.equal(shouldSendPurchase('cs_test_e2e_1', 'prompta.jp'), false)
    assert.equal(shouldSendPurchase('cs_live_123', 'localhost'), false)
    assert.equal(shouldSendPurchase('cs_live_123', 'preview.vercel.app'), false)
    assert.equal(shouldSendPurchase('', 'www.prompta.jp'), false)
    assert.equal(shouldSendPurchase('cs_live_123', null), false)
  })
})

describe('analytics URL block', () => {
  const blocked = [
    'https://www.googletagmanager.com/gtag/js?id=G-76RGV3H6S2',
    'https://www.google-analytics.com/g/collect?v=2',
    'https://region1.google-analytics.com/g/collect',
    'https://ssl.google-analytics.com/r/collect',
    'http://googletagmanager.com/gtag/js',
    'https://www.googletagmanager.com:443/gtag/js',
    'https://www.google-analytics.com',
    'https://WWW.GOOGLETAGMANAGER.COM/gtag/js',
  ]
  const allowed = [
    'https://localhost:3000/',
    'https://www.prompta.jp/',
    'https://checkout.stripe.com/c/pay/cs_test_x',
    'https://evilgoogletagmanager.com/gtag/js',
    'https://googletagmanager.com.evil.example/gtag/js',
    'https://www.google-analytics.com.evil.example/',
    'https://not-google-analytics.com/collect',
  ]

  it('matches Google tag and collect hosts only', () => {
    for (const url of blocked) assert.equal(isBlockedAnalyticsUrl(url), true, url)
    for (const url of allowed) assert.equal(isBlockedAnalyticsUrl(url), false, url)
    assert.equal(BLOCKED_ANALYTICS_URL.test(blocked[0]), true)
  })
})

describe('gtag bootstrap', () => {
  function run(hostname: string) {
    const appended: Array<{ async: boolean; src: string }> = []
    const windowObj: {
      dataLayer?: ArrayLike<unknown>[]
      gtag?: (...args: unknown[]) => void
    } = {}
    const context = vm.createContext({
      location: { hostname },
      window: windowObj,
      document: {
        createElement() {
          return { async: false, src: '' }
        },
        head: {
          appendChild(el: { async: boolean; src: string }) {
            appended.push(el)
          },
        },
      },
      Date,
    })
    vm.runInContext(googleAnalyticsBootstrapScript(), context)
    return { window: windowObj, appended }
  }

  it('does not define gtag or request the library off the production hosts', () => {
    for (const host of ['localhost', '127.0.0.1', 'prompta-git-preview.vercel.app', 'www.prompta.jp.evil.com']) {
      const result = run(host)
      assert.equal(result.window.gtag, undefined, host)
      assert.equal(result.window.dataLayer, undefined, host)
      assert.equal(result.appended.length, 0, host)
    }
  })

  it('configs GA and loads gtag.js on www.prompta.jp and prompta.jp', () => {
    for (const host of ['www.prompta.jp', 'prompta.jp', 'WWW.PROMPTA.JP', 'www.prompta.jp.']) {
      const result = run(host)
      assert.equal(typeof result.window.gtag, 'function', host)
      assert.equal(result.appended.length, 1, host)
      assert.equal(result.appended[0].async, true, host)
      assert.equal(
        result.appended[0].src,
        `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
        host,
      )
      const layer = result.window.dataLayer || []
      assert.equal(layer.length, 2, host)
      // dataLayer is created inside the vm, so compare command fields directly.
      assert.equal(String((layer[0] as ArrayLike<unknown>)[0]), 'js', host)
      assert.equal(String((layer[1] as ArrayLike<unknown>)[0]), 'config', host)
      assert.equal(String((layer[1] as ArrayLike<unknown>)[1]), GA_MEASUREMENT_ID, host)
    }
  })
})

describe('track helpers when gtag is absent', () => {
  it('drops events instead of queueing a dataLayer', () => {
    const win: { location: { hostname: string }; dataLayer?: unknown[] } = {
      location: { hostname: 'localhost' },
    }
    ;(globalThis as unknown as { window: typeof win }).window = win
    const pack = getPointPack('pack-70')
    assert.ok(pack)
    trackPaywallView('hair-color', 'badge')
    trackBeginCheckout('hair-color', pack)
    trackPurchase({
      transactionId: 'cs_live_absent',
      value: 300,
      currency: 'JPY',
      credits: 20,
    })
    assert.equal('dataLayer' in win, false)
    assert.equal('gtag' in win, false)
  })

  it('still redirects to Checkout when gtag is absent', () => {
    let assigned = ''
    const win = {
      location: {
        hostname: 'localhost',
        assign(url: string) {
          assigned = url
        },
      },
    }
    ;(globalThis as unknown as { window: typeof win }).window = win
    const pack = getPointPack('pack-70')
    assert.ok(pack)
    redirectAfterBeginCheckout('https://checkout.stripe.com/c/pay/cs_test_x', 'hair-color', pack)
    assert.equal(assigned, 'https://checkout.stripe.com/c/pay/cs_test_x')
    assert.equal('dataLayer' in win, false)
  })
})

describe('trackPurchase', () => {
  function install(hostname: string) {
    const hits: Array<{ name: string; params: Record<string, unknown> }> = []
    const store = new Map<string, string>()
    const win = {
      location: { hostname },
      gtag(_command: string, name: string, params: Record<string, unknown>) {
        hits.push({ name, params })
      },
    }
    const g = globalThis as unknown as {
      window: typeof win
      sessionStorage: {
        getItem(key: string): string | null
        setItem(key: string, value: string): void
      }
    }
    g.window = win
    g.sessionStorage = {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => {
        store.set(key, value)
      },
    }
    return { hits, store }
  }

  it('records one live purchase on the production host and dedupes', () => {
    const { hits, store } = install('www.prompta.jp')
    const purchase = {
      transactionId: 'cs_live_abc',
      value: 300,
      currency: 'jpy',
      credits: 150,
      packId: 'pack-20',
      tool: 'hair-color',
    }
    trackPurchase(purchase)
    trackPurchase(purchase)
    assert.equal(hits.length, 1)
    assert.equal(hits[0].name, 'purchase')
    assert.equal(hits[0].params.transaction_id, 'cs_live_abc')
    assert.equal(hits[0].params.value, 300)
    assert.equal(hits[0].params.currency, 'JPY')
    assert.equal(hits[0].params.transport_type, 'beacon')
    assert.equal(store.get('purchase_tracked:cs_live_abc'), '1')
  })

  it('returns before the dedupe write for cs_test_ and localhost', () => {
    const testHost = install('www.prompta.jp')
    trackPurchase({
      transactionId: 'cs_test_simulated_99',
      value: 300,
      currency: 'JPY',
      credits: 150,
    })
    assert.equal(testHost.hits.length, 0)
    assert.equal(testHost.store.size, 0)

    const local = install('localhost')
    trackPurchase({
      transactionId: 'cs_live_local',
      value: 300,
      currency: 'JPY',
      credits: 150,
    })
    assert.equal(local.hits.length, 0)
    assert.equal(local.store.size, 0)
  })

  it('still emits non-purchase events to a stub gtag on localhost', () => {
    const { hits } = install('localhost')
    const pack = getPointPack('pack-70')
    assert.ok(pack)
    trackPaywallView('hair-color', 'badge')
    trackBeginCheckout('hair-color', pack)
    assert.ok(hits.some((hit) => hit.name === 'paywall_view'))
    assert.ok(hits.some((hit) => hit.name === 'begin_checkout'))
  })
})
