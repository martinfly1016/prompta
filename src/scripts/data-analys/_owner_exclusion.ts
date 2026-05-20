// Shared exclusion list for owner / E2E test email hashes. Use in any
// data-analys script that aggregates ToolUsage so personal testing by the
// site owner doesn't contaminate "real external user" metrics.
import { createHash } from 'node:crypto'

export const OWNER_TEST_EMAILS = [
  // E2E test accounts (Playwright + GitHub Actions CI)
  'e2e-test+t1@prompta.jp',
  'e2e-test+t2@prompta.jp',
  'e2e-test+t3@prompta.jp',
  // PromptExecutor E2E suite (5/19 ship, src/scripts/e2e/run-prompt-execute.ts)
  'e2e-test+pe1@prompta.jp',
  'e2e-test+pe2@prompta.jp',
  'e2e-test+probe@prompta.jp',
  'probe@example.com', // generic probe used by smoke tests pre-5/19
  // Legacy admin seed from 2025-10-25 initial setup
  'admin@example.com',
  // Site owner personal accounts (manual smoke testing)
  'martinfly1016@gmail.com',
  'yuchao@byte-ad.com',
  'prompta.jp@gmail.com',
]

export const OWNER_TEST_EMAIL_HASHES = OWNER_TEST_EMAILS.map((e) =>
  createHash('sha256').update(e.toLowerCase().trim()).digest('hex'),
)
