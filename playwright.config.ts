import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.E2E_PORT || 3000)
const BASE_URL = process.env.E2E_BASE_URL || `http://localhost:${PORT}`

// Playwright config for paid-feature E2E tests. Reuses the existing
// test-only API endpoints (/api/test/login, /seed-credits,
// /simulate-payment) so each spec can deterministically set up its
// own DB state without going through real NextAuth or Stripe.
//
// To run locally:
//   ENABLE_TEST_AUTH=true npm run dev      # terminal A
//   npm run e2e                            # terminal B
//
// In CI: the workflow boots dev with ENABLE_TEST_AUTH=true, waits for
// http://localhost:3000 to respond, then runs playwright test.
export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false, // tests share the DB; run sequentially to avoid races
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
