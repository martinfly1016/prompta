/**
 * E2E: paid feature flow — hair-color diagnosis tool.
 *
 * Mirrors the API-level run-paid-flow.ts checks but driven through a
 * real browser so we also assert the QuotaGate / paywall UI surfaces.
 *
 * Setup per test:
 *   1. seed-credits to a known balance
 *   2. test-login as e2e-test+ui@prompta.jp
 *
 * Note: tests use the tool's homepage QuotaGate hooks (status chip,
 * paywall modal) rather than running an actual /analyze call — that
 * would burn a real Gemini API quota per test. The API-layer runner
 * in src/scripts/e2e/run-paid-flow.ts already covers the /analyze
 * call, this suite focuses on UI state transitions.
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

test.describe('paid flow @hair-color', () => {
  test('un-logged-in user sees login-required CTA in QuotaGate', async ({ page }) => {
    await page.context().clearCookies()
    await page.goto('/tools/hair-color-diagnosis')
    // The QuotaGate renders one of: login-required / free-X / exhausted / paid-N
    await expect(page.locator('text=/ログイン.*獲得|無料/')).toBeVisible({ timeout: 15_000 })
  })

  test('logged in with 3 credits → status chip shows 残り 3', async ({ page, request }) => {
    await seedCredits(request, 3)
    await testLogin(page)
    await page.goto('/tools/hair-color-diagnosis')
    await expect(page.locator('text=/クレジット残り\\s*3|保有クレジット.*3/')).toBeVisible({ timeout: 15_000 })
  })

  test('exhausted (balance=0) → paywall modal copy visible', async ({ page, request }) => {
    await seedCredits(request, 0)
    await testLogin(page)
    await page.goto('/tools/hair-color-diagnosis')
    await expect(page.locator('text=/クレジットを使い切|10 回パックを購入/').first()).toBeVisible({ timeout: 15_000 })
    // Verify all-tool-shared copy is present (Phase 0 model)
    await expect(page.locator('text=/全ツール共通|共通でご利用/').first()).toBeVisible()
  })

  test('after simulated payment → balance refilled, chip shows 10', async ({ page, request }) => {
    await seedCredits(request, 0)
    await testLogin(page)
    // Simulate Stripe webhook completing
    const pay = await request.post('/api/test/simulate-payment', {
      data: { email: EMAIL, credits: 10, amountJpy: 300 },
      headers: { 'Content-Type': 'application/json' },
    })
    expect(pay.ok()).toBeTruthy()
    const body = await pay.json()
    expect(body.balance).toBeGreaterThanOrEqual(10)
    await page.goto('/tools/hair-color-diagnosis')
    await expect(page.locator('text=/保有クレジット.*10|クレジット残り\\s*10/').first()).toBeVisible({ timeout: 15_000 })
  })

  test('shared credit pool — personal-color and hair-color show same balance', async ({ page, request }) => {
    await seedCredits(request, 5)
    await testLogin(page)
    await page.goto('/tools/hair-color-diagnosis')
    await expect(page.locator('text=/5/').first()).toBeVisible({ timeout: 15_000 })
    await page.goto('/tools/personal-color-analysis')
    await expect(page.locator('text=/5/').first()).toBeVisible({ timeout: 15_000 })
  })
})

test.describe('account page @account', () => {
  test('after payment → /account shows purchase in history', async ({ page, request }) => {
    await seedCredits(request, 0)
    await testLogin(page)
    await request.post('/api/test/simulate-payment', {
      data: { email: EMAIL, credits: 10, amountJpy: 300 },
      headers: { 'Content-Type': 'application/json' },
    })
    await page.goto('/account')
    await expect(page.locator('text=/300|10/').first()).toBeVisible({ timeout: 15_000 })
  })
})
