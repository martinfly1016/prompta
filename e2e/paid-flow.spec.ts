/**
 * E2E: paid feature flow — hair-color QuotaGate through Checkout.
 *
 * Uses test-only login / seed / simulate-payment. Does not call Stripe
 * and does not complete a payment. begin_checkout is asserted from the
 * dataLayer; purchase is asserted only after /api/checkout/confirm
 * accepts a simulated paid session.
 */
import { test, expect, type Page, type APIRequestContext } from '@playwright/test'

const EMAIL = 'e2e-test+ui@prompta.jp'

async function seedCredits(req: APIRequestContext, balance: number) {
  const res = await req.post('/api/test/seed-credits', {
    data: { email: EMAIL, balance },
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.status() === 404) {
    throw new Error('ENABLE_TEST_AUTH not set on dev server')
  }
  expect(res.ok()).toBeTruthy()
}

async function testLogin(page: Page) {
  const res = await page.request.post('/api/test/login', {
    data: { email: EMAIL },
    headers: { 'Content-Type': 'application/json' },
  })
  expect(res.ok()).toBeTruthy()
}

async function installGtag(page: Page, sink?: string[]) {
  // Record names inside dataLayer.push. GA's real gtag calls event_callback
  // and navigates in the same turn, so a later page.evaluate misses the hit.
  await page.exposeBinding('recordGaEvent', async (_source, name: string) => {
    sink?.push(name)
  })
  await page.addInitScript(() => {
    const w = window as Window & {
      dataLayer: unknown[]
      gtag: (...args: unknown[]) => void
      recordGaEvent?: (name: string) => void
    }
    const dl: unknown[] = []
    const push = (...items: unknown[]) => {
      for (const item of items) {
        const row = item as { 1?: unknown; event?: unknown }
        const name =
          typeof row?.[1] === 'string' ? row[1] : typeof row?.event === 'string' ? row.event : ''
        if (name && name !== 'js' && name !== 'config') {
          try {
            w.recordGaEvent?.(name)
          } catch {
            // binding is best-effort
          }
        }
      }
      return Array.prototype.push.apply(dl, items)
    }
    dl.push = push as unknown[]['push']
    w.dataLayer = dl
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      dl.push(arguments as unknown as never)
    }
  })
}

async function eventNames(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const dl = (window as Window & { dataLayer?: unknown[] }).dataLayer || []
    return dl
      .map((entry) => {
        const row = entry as { 1?: string }
        return typeof row?.[1] === 'string' ? row[1] : ''
      })
      .filter(Boolean)
  })
}

test.describe('paid flow @hair-color', () => {
  test('un-logged-in user sees login-required CTA in QuotaGate', async ({ page }) => {
    await page.context().clearCookies()
    await page.goto('/tools/hair-color-diagnosis')
    const status = page.getByTestId('quota-status')
    await expect(status).toBeVisible({ timeout: 15_000 })
    await expect(status).toHaveAttribute('data-state', 'login')
    await expect(status).toContainText(/ログインで \d+ ポイント獲得/)
  })

  test('logged in with credits shows the balance chip', async ({ page, request }) => {
    await seedCredits(request, 15)
    await testLogin(page)
    await page.goto('/tools/hair-color-diagnosis')
    const status = page.getByTestId('quota-status')
    await expect(status).toBeVisible({ timeout: 15_000 })
    await expect(status).toHaveAttribute('data-state', 'ready')
    await expect(status).toHaveAttribute('data-balance', '15')
  })

  test('exhausted balance opens the paywall and buy reaches begin_checkout', async ({ page, request }) => {
    await seedCredits(request, 0)
    await testLogin(page)
    const gaEvents: string[] = []
    await installGtag(page, gaEvents)
    await page.route('https://checkout.stripe.com/**', (route) =>
      route.fulfill({ status: 200, contentType: 'text/html', body: 'stripe-checkout-stub' }),
    )
    await page.goto('/tools/hair-color-diagnosis')
    await page.getByTestId('quota-exhausted').click()
    const modal = page.getByTestId('paywall-modal')
    await expect(modal).toBeVisible()
    await expect(modal).toContainText('150 ポイント')
    await page.getByTestId('paywall-buy').click()
    await expect.poll(() => gaEvents.slice()).toContain('begin_checkout')
    expect(gaEvents).not.toContain('purchase')
    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 15_000 })
  })

  test('purchase fires only after the server confirms the session', async ({ page, request }) => {
    await seedCredits(request, 0)
    await testLogin(page)
    await installGtag(page)

    await page.goto('/tools/hair-color-diagnosis?purchase=success&session_id=cs_test_not_paid')
    await expect(page.getByTestId('purchase-banner')).toBeVisible({ timeout: 15_000 })
    await expect(page.getByTestId('purchase-banner')).not.toContainText('ポイントが追加されました')
    expect(await eventNames(page)).not.toContain('purchase')

    const pay = await request.post('/api/test/simulate-payment', {
      data: { email: EMAIL, credits: 150, amountJpy: 300 },
      headers: { 'Content-Type': 'application/json' },
    })
    expect(pay.ok()).toBeTruthy()
    const body = await pay.json()
    expect(body.sessionId).toMatch(/^cs_test_/)

    await page.goto(
      `/tools/hair-color-diagnosis?purchase=success&session_id=${encodeURIComponent(body.sessionId)}`,
    )
    await expect(page.getByTestId('purchase-banner')).toContainText('ポイントが追加されました', {
      timeout: 15_000,
    })
    await expect.poll(async () => eventNames(page)).toContain('purchase')
    const purchaseParams = await page.evaluate(() => {
      const dl = (window as Window & { dataLayer?: Array<{ 1?: string; 2?: { value?: number; currency?: string } }> }).dataLayer || []
      const hit = [...dl].reverse().find((entry) => entry && entry[1] === 'purchase')
      return hit?.[2] || null
    })
    expect(purchaseParams?.currency).toBe('JPY')
    expect(purchaseParams?.value).toBe(300)
    const status = page.getByTestId('quota-status')
    await expect(status).toHaveAttribute('data-balance', '150')
  })

  test('shared credit pool — personal-color and hair-color show same balance', async ({ page, request }) => {
    await seedCredits(request, 5)
    await testLogin(page)
    await page.goto('/tools/hair-color-diagnosis')
    await expect(page.getByTestId('quota-status')).toHaveAttribute('data-balance', '5', { timeout: 15_000 })
    await page.goto('/tools/personal-color-analysis')
    await expect(page.getByTestId('quota-status')).toHaveAttribute('data-balance', '5', { timeout: 15_000 })
  })
})

test('login click stays separate from purchase click', async ({ page }) => {
  await page.context().clearCookies()
  const gaEvents: string[] = []
  await installGtag(page, gaEvents)
  await page.goto('/tools/hair-color-diagnosis')
  await page.getByTestId('quota-status').click()
  await expect.poll(() => gaEvents.slice()).toContain('login_click')
  expect(gaEvents).not.toContain('paywall_purchase_click')
})

test('zero-balance pick reports insufficient_points, buy still reports purchase intent', async ({ page, request }) => {
  await seedCredits(request, 0)
  await testLogin(page)
  const gaEvents: string[] = []
  await installGtag(page, gaEvents)
  await page.route('https://checkout.stripe.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: 'stripe-checkout-stub' }),
  )
  await page.goto('/tools/hair-color-diagnosis')
  await page.getByTestId('tool-pick').click()
  await expect(page.getByTestId('paywall-modal')).toBeVisible()
  await expect.poll(() => gaEvents.slice()).toContain('insufficient_points')
  expect(gaEvents).not.toContain('paywall_purchase_click')
  await page.getByTestId('paywall-buy').click()
  await expect.poll(() => gaEvents.slice()).toContain('paywall_purchase_click')
})

test('server-confirmed events survive the redirect cookie', async ({ page }) => {
  const gaEvents: string[] = []
  await installGtag(page, gaEvents)
  const payload = encodeURIComponent(JSON.stringify([
    { id: 'e2e-signup', name: 'sign_up', params: { method: 'google' } },
    { id: 'e2e-welcome', name: 'welcome_bonus_granted', params: { amount: 15, is_topup: false } },
    { id: 'e2e-spent', name: 'points_spent', params: { tool: 'hair-color', amount: 5, balance_after: 10 } },
  ]))
  await page.context().addCookies([{
    name: 'prompta_ga',
    value: payload,
    url: 'http://localhost:3000/',
  }])
  await page.goto('/tools/hair-color-diagnosis')
  await expect.poll(() => gaEvents.slice()).toEqual(
    expect.arrayContaining(['sign_up', 'welcome_bonus_granted', 'points_spent']),
  )
  const params = await page.evaluate(() => {
    const dl = (window as Window & { dataLayer?: Array<{ 1?: string; 2?: Record<string, unknown> }> }).dataLayer || []
    const out: Record<string, Record<string, unknown>> = {}
    for (const entry of dl) {
      if (entry && typeof entry[1] === 'string' && entry[2]) out[entry[1]] = entry[2]
    }
    return out
  })
  expect(params.sign_up?.method).toBe('google')
  expect(params.welcome_bonus_granted?.amount).toBe(15)
  expect(params.welcome_bonus_granted?.is_topup).toBe(false)
  expect(params.points_spent?.amount).toBe(5)
  expect(params.points_spent?.balance_after).toBe(10)
  expect(params.points_spent?.tool).toBe('hair-color')
})

test.describe('account page @account', () => {
  test('after payment → /account shows purchase in history', async ({ page, request }) => {
    await seedCredits(request, 0)
    await testLogin(page)
    await request.post('/api/test/simulate-payment', {
      data: { email: EMAIL, credits: 150, amountJpy: 300 },
      headers: { 'Content-Type': 'application/json' },
    })
    await page.goto('/account')
    await expect(page.getByRole('heading', { name: '購入履歴' })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText('¥300').first()).toBeVisible()
    await expect(page.getByText('+150').first()).toBeVisible()
  })
})
