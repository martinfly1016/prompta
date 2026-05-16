// Shared exclusion list for owner / E2E test email hashes. Use in any
// data-analys script that aggregates ToolUsage so personal testing by the
// site owner doesn't contaminate "real external user" metrics.
import { createHash } from 'node:crypto'

export const OWNER_TEST_EMAILS = [
  // E2E test accounts (Playwright + GitHub Actions CI)
  'e2e-test+t1@prompta.jp',
  'e2e-test+t2@prompta.jp',
  'e2e-test+t3@prompta.jp',
  // Site owner personal accounts (manual smoke testing)
  'martinfly1016@gmail.com',
  'yuchao@byte-ad.com',
]

export const OWNER_TEST_EMAIL_HASHES = OWNER_TEST_EMAILS.map((e) =>
  createHash('sha256').update(e.toLowerCase().trim()).digest('hex'),
)
