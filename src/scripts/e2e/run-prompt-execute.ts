/**
 * E2E test runner for /api/prompt/execute + <PromptExecutor>.
 *
 * Covers the full plan in docs/e2e-prompt-execute-plan.md:
 *  - Group A: Auth (works against any BASE_URL, no ENABLE_TEST_AUTH needed)
 *  - Groups B–F: full flow (requires ENABLE_TEST_AUTH=true on the target)
 *
 * Usage:
 *   # Smoke only (Group A)
 *   npx tsx src/scripts/e2e/run-prompt-execute.ts https://www.prompta.jp --smoke
 *
 *   # Full E2E (target must have ENABLE_TEST_AUTH=true)
 *   npx tsx src/scripts/e2e/run-prompt-execute.ts http://localhost:3000 --full
 *
 * Output: colored pass/fail per case + final summary. Exit 0 on all-pass, 1 on any-fail.
 */

const BASE = process.argv[2]?.replace(/\/+$/, '')
const MODE = process.argv[3] || '--smoke'

if (!BASE) {
  console.error('Usage: npx tsx src/scripts/e2e/run-prompt-execute.ts <BASE_URL> [--smoke|--full]')
  process.exit(2)
}

const TEST_EMAIL_IMG = 'e2e-test+pe1@prompta.jp'
const TEST_EMAIL_TEXT = 'e2e-test+pe2@prompta.jp'
const TEST_SLUG_IMG = 'mandala-floral-coloring-page-adults'
// Use a text-prompt slug — fall back to image slug if text not seeded
const TEST_SLUG_TEXT_FALLBACK = TEST_SLUG_IMG

const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const DIM = '\x1b[2m'
const RESET = '\x1b[0m'

type CaseResult = { id: string; name: string; ok: boolean; detail: string }
const results: CaseResult[] = []

function record(id: string, name: string, ok: boolean, detail: string) {
  results.push({ id, name, ok, detail })
  const tag = ok ? `${GREEN}✓ PASS${RESET}` : `${RED}✗ FAIL${RESET}`
  console.log(`${tag} [${id}] ${name} ${DIM}— ${detail}${RESET}`)
}

async function http(
  method: 'GET' | 'POST',
  path: string,
  opts: { json?: any; cookies?: string } = {},
): Promise<{ status: number; body: any; cookies: string }> {
  const headers: Record<string, string> = {}
  if (opts.json) headers['Content-Type'] = 'application/json'
  if (opts.cookies) headers['Cookie'] = opts.cookies
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: opts.json ? JSON.stringify(opts.json) : undefined,
    redirect: 'manual',
  })
  let body: any = null
  const ct = res.headers.get('content-type') ?? ''
  if (ct.includes('application/json')) {
    try { body = await res.json() } catch { body = null }
  } else {
    body = await res.text()
  }
  // Parse Set-Cookie headers (NextAuth session cookie)
  const setCookies = res.headers.getSetCookie?.() ?? []
  const cookies = setCookies.map((c: string) => c.split(';')[0]).join('; ')
  return { status: res.status, body, cookies }
}

async function loginAs(email: string): Promise<string> {
  const r = await http('POST', '/api/test/login', { json: { email } })
  if (r.status !== 200 || !r.cookies) {
    throw new Error(`loginAs(${email}) failed: ${r.status} ${JSON.stringify(r.body).slice(0, 200)}`)
  }
  return r.cookies
}

async function seedCredits(email: string, balance: number): Promise<void> {
  const r = await http('POST', '/api/test/seed-credits', { json: { email, balance } })
  if (r.status !== 200) {
    throw new Error(`seedCredits(${email}, ${balance}) failed: ${r.status} ${JSON.stringify(r.body)}`)
  }
}

async function getBalance(cookies: string): Promise<number> {
  const r = await http('GET', '/api/tools/balance', { cookies })
  return r.body?.balance ?? -1
}

// ============================================================
// Group A — auth + smoke (no ENABLE_TEST_AUTH needed)
// ============================================================
async function groupA() {
  console.log(`\n${YELLOW}━━━ Group A: Auth + Smoke (no test-auth) ━━━${RESET}`)

  // A1 — POST /api/prompt/execute without cookie → 401
  {
    const r = await http('POST', '/api/prompt/execute', {
      json: {
        promptSlug: 'x',
        providerId: 'gemini-image',
        content: 'test prompt content here',
      },
    })
    record(
      'A1',
      'POST /execute unauthenticated → 401',
      r.status === 401 && r.body?.error === 'login_required',
      `status=${r.status} error=${r.body?.error}`,
    )
  }

  // A2 — GET /api/tools/balance unauthenticated
  {
    const r = await http('GET', '/api/tools/balance')
    record(
      'A2',
      'GET /balance unauthenticated → 200 signedIn:false',
      r.status === 200 && r.body?.signedIn === false && r.body?.balance === 0,
      `status=${r.status} body=${JSON.stringify(r.body)}`,
    )
  }

  // A3 — detail page renders PromptExecutor
  {
    const r = await http('GET', `/prompt/${TEST_SLUG_IMG}`)
    const html = String(r.body ?? '')
    const ok = r.status === 200 && html.includes('ここで試す')
    record(
      'A3',
      'detail page renders 「ここで試す」 section',
      ok,
      `status=${r.status} containsExecutor=${html.includes('ここで試す')}`,
    )
  }
}

// ============================================================
// Group B — credit deduction (ENABLE_TEST_AUTH=true required)
// ============================================================
async function groupB() {
  console.log(`\n${YELLOW}━━━ Group B: Credit deduction ━━━${RESET}`)

  // B1 — text 1 credit
  await seedCredits(TEST_EMAIL_TEXT, 10)
  const textCookies = await loginAs(TEST_EMAIL_TEXT)
  {
    const r = await http('POST', '/api/prompt/execute', {
      cookies: textCookies,
      json: {
        promptSlug: TEST_SLUG_TEXT_FALLBACK,
        providerId: 'gemini-text',
        content: 'Say "hello" in Japanese in one short sentence.',
      },
    })
    const balanceAfter = await getBalance(textCookies)
    record(
      'B1',
      'text execute spends 1 credit',
      r.status === 200 && balanceAfter === 9 && typeof r.body?.text === 'string',
      `status=${r.status} balanceAfter=${balanceAfter} text=${String(r.body?.text ?? '').slice(0, 30)}...`,
    )
  }

  // B2 — Gemini image 5 credit
  await seedCredits(TEST_EMAIL_IMG, 10)
  const imgCookies = await loginAs(TEST_EMAIL_IMG)
  {
    const r = await http('POST', '/api/prompt/execute', {
      cookies: imgCookies,
      json: {
        promptSlug: TEST_SLUG_IMG,
        providerId: 'gemini-image',
        content: 'black and white coloring page of a simple flower, clean line art, pure white background, thick outline, no shading, suitable for testing',
      },
    })
    const balanceAfter = await getBalance(imgCookies)
    record(
      'B2',
      'Gemini image execute spends 5 credit',
      r.status === 200 && balanceAfter === 5 && r.body?.imageUrl?.startsWith('https://'),
      `status=${r.status} balanceAfter=${balanceAfter} imageUrl=${r.body?.imageUrl?.slice(0, 60)}...`,
    )
  }

  // B3 — OpenAI image 5 credit
  await seedCredits(TEST_EMAIL_IMG, 10)
  const imgCookies2 = await loginAs(TEST_EMAIL_IMG)
  {
    const r = await http('POST', '/api/prompt/execute', {
      cookies: imgCookies2,
      json: {
        promptSlug: TEST_SLUG_IMG,
        providerId: 'openai-image',
        content: 'black and white coloring page of a simple star, clean line art, pure white background, thick outline, no shading',
      },
    })
    const balanceAfter = await getBalance(imgCookies2)
    record(
      'B3',
      'OpenAI image execute spends 5 credit',
      r.status === 200 && balanceAfter === 5 && r.body?.imageUrl?.startsWith('https://'),
      `status=${r.status} balanceAfter=${balanceAfter} imageUrl=${r.body?.imageUrl?.slice(0, 60)}...`,
    )
  }

  // B4 — image but insufficient credits (have 3, need 5) → 402
  await seedCredits(TEST_EMAIL_IMG, 3)
  const imgCookies3 = await loginAs(TEST_EMAIL_IMG)
  {
    const r = await http('POST', '/api/prompt/execute', {
      cookies: imgCookies3,
      json: {
        promptSlug: TEST_SLUG_IMG,
        providerId: 'gemini-image',
        content: 'black and white coloring page of a tree, clean line art',
      },
    })
    const balanceAfter = await getBalance(imgCookies3)
    record(
      'B4',
      'image with 3 credit (need 5) → 402 + balance unchanged',
      r.status === 402 && balanceAfter === 3,
      `status=${r.status} balanceAfter=${balanceAfter}`,
    )
  }

  // B5 — text with 0 credit → 402
  await seedCredits(TEST_EMAIL_TEXT, 0)
  const txCookies = await loginAs(TEST_EMAIL_TEXT)
  {
    const r = await http('POST', '/api/prompt/execute', {
      cookies: txCookies,
      json: {
        promptSlug: TEST_SLUG_TEXT_FALLBACK,
        providerId: 'gemini-text',
        content: 'Say hello',
      },
    })
    record(
      'B5',
      'text with 0 credit → 402',
      r.status === 402,
      `status=${r.status}`,
    )
  }
}

// ============================================================
// Group C — error + refund
// ============================================================
async function groupC() {
  console.log(`\n${YELLOW}━━━ Group C: Error + refund ━━━${RESET}`)

  await seedCredits(TEST_EMAIL_IMG, 10)
  const cookies = await loginAs(TEST_EMAIL_IMG)

  // C1 — bad providerId → 400
  {
    const r = await http('POST', '/api/prompt/execute', {
      cookies,
      json: {
        promptSlug: TEST_SLUG_IMG,
        providerId: 'invalid-provider' as any,
        content: 'test prompt long enough',
      },
    })
    const balance = await getBalance(cookies)
    record(
      'C1',
      'bad providerId → 400 + no charge',
      r.status === 400 && balance === 10,
      `status=${r.status} balance=${balance}`,
    )
  }

  // C2 — empty content → 400
  {
    const r = await http('POST', '/api/prompt/execute', {
      cookies,
      json: {
        promptSlug: TEST_SLUG_IMG,
        providerId: 'gemini-image',
        content: '',
      },
    })
    const balance = await getBalance(cookies)
    record(
      'C2',
      'empty content → 400 + no charge',
      r.status === 400 && balance === 10,
      `status=${r.status} balance=${balance}`,
    )
  }

  // C3 — provider error → 500 + refund (balance + totalEarned + totalUsed
  // all restored). Uses E2E force-error marker (ENABLE_TEST_AUTH-gated).
  await seedCredits(TEST_EMAIL_IMG, 20)
  const c3cookies = await loginAs(TEST_EMAIL_IMG)
  {
    // Snapshot BEFORE the failed call
    const before = await http('POST', '/api/test/credits-snapshot', {
      json: { email: TEST_EMAIL_IMG },
    })
    const beforeBal = before.body?.balance
    const beforeEarn = before.body?.totalEarned
    const beforeUsed = before.body?.totalUsed

    const r = await http('POST', '/api/prompt/execute', {
      cookies: c3cookies,
      json: {
        promptSlug: TEST_SLUG_IMG,
        providerId: 'gemini-image',
        content: 'black and white coloring page __E2E_FORCE_PROVIDER_ERROR__ test',
      },
    })

    // Snapshot AFTER — should match BEFORE exactly (no net change)
    const after = await http('POST', '/api/test/credits-snapshot', {
      json: { email: TEST_EMAIL_IMG },
    })
    const balOk = after.body?.balance === beforeBal
    const earnOk = after.body?.totalEarned === beforeEarn
    const usedOk = after.body?.totalUsed === beforeUsed
    record(
      'C3',
      'provider error → 500 + balance/totalEarned/totalUsed unchanged',
      r.status === 500 && r.body?.error === 'provider_error' && balOk && earnOk && usedOk,
      `status=${r.status} bal ${beforeBal}→${after.body?.balance} earn ${beforeEarn}→${after.body?.totalEarned} used ${beforeUsed}→${after.body?.totalUsed}`,
    )
  }
}

// ============================================================
// Group D — cache + rate limit
// ============================================================
async function groupD() {
  console.log(`\n${YELLOW}━━━ Group D: Cache + rate limit ━━━${RESET}`)

  // D1 — 60s cache hit
  await seedCredits(TEST_EMAIL_IMG, 20)
  const cookies = await loginAs(TEST_EMAIL_IMG)
  const cachePromptContent = `black and white coloring page of a unique cache-test pattern ${Date.now()}, clean line art, pure white background`
  {
    const r1 = await http('POST', '/api/prompt/execute', {
      cookies,
      json: { promptSlug: TEST_SLUG_IMG, providerId: 'gemini-image', content: cachePromptContent },
    })
    const balanceAfter1 = await getBalance(cookies)

    // Immediately fire same request — should be cached
    const r2 = await http('POST', '/api/prompt/execute', {
      cookies,
      json: { promptSlug: TEST_SLUG_IMG, providerId: 'gemini-image', content: cachePromptContent },
    })
    const balanceAfter2 = await getBalance(cookies)

    const cached = r2.body?.cached === true
    record(
      'D1',
      'same request within 60s → cache hit, no extra charge',
      r1.status === 200 && r2.status === 200 && cached && balanceAfter1 === 15 && balanceAfter2 === 15,
      `r1=${r1.status} r2=${r2.status} cached=${cached} balance ${balanceAfter1}→${balanceAfter2}`,
    )
  }

  // D2 — rate limit keyed by anonId (cookie `prompta_anon`).
  // ensureAnonId sets the cookie with secure:true which prevents browsers /
  // node-fetch from receiving it on http:// (localhost). We inject the cookie
  // manually so all 6 requests share the same anonId bucket.
  await seedCredits(TEST_EMAIL_TEXT, 50)
  const sessionCookies = await loginAs(TEST_EMAIL_TEXT)
  const fixedAnonId = `${Date.now()}-rate-test-${Math.random().toString(36).slice(2, 10)}`
  const rateCookies = `${sessionCookies}; prompta_anon=${fixedAnonId}`
  {
    const promises = Array.from({ length: 6 }).map((_, i) =>
      http('POST', '/api/prompt/execute', {
        cookies: rateCookies,
        json: {
          promptSlug: TEST_SLUG_TEXT_FALLBACK,
          providerId: 'gemini-text',
          content: `rate test ${i} — say hello in one word`,
        },
      }),
    )
    const responses = await Promise.all(promises)
    const status429Count = responses.filter((r) => r.status === 429).length
    record(
      'D2',
      'rate limit: 6 parallel reqs (shared anon) → at least 1 returns 429',
      status429Count >= 1,
      `responses=[${responses.map((r) => r.status).join(',')}] 429count=${status429Count}`,
    )
  }
}

// ============================================================
// Main
// ============================================================
;(async () => {
  console.log(`${DIM}BASE=${BASE} MODE=${MODE}${RESET}`)

  await groupA()

  if (MODE === '--full') {
    // Verify ENABLE_TEST_AUTH is on
    const probe = await http('POST', '/api/test/login', { json: { email: 'probe@example.com' } })
    if (probe.status === 404) {
      console.error(
        `\n${RED}ERROR: /api/test/login returns 404 on ${BASE} — ENABLE_TEST_AUTH is not enabled. Group B-F skipped.${RESET}`,
      )
      process.exit(1)
    }
    try {
      await groupB()
      await groupC()
      await groupD()
    } catch (e: any) {
      console.error(`${RED}Aborted: ${e.message}${RESET}`)
    } finally {
      // Clean up: zero out test balances
      try { await seedCredits(TEST_EMAIL_IMG, 0) } catch {}
      try { await seedCredits(TEST_EMAIL_TEXT, 0) } catch {}
    }
  }

  // Summary
  const total = results.length
  const passed = results.filter((r) => r.ok).length
  const failed = total - passed
  console.log(`\n${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`)
  console.log(`Total: ${total}  ${GREEN}Pass: ${passed}${RESET}  ${failed > 0 ? RED : DIM}Fail: ${failed}${RESET}`)
  if (failed > 0) {
    console.log(`\n${RED}FAILED CASES:${RESET}`)
    for (const r of results.filter((x) => !x.ok)) {
      console.log(`  ${RED}✗ [${r.id}] ${r.name}${RESET}  ${DIM}${r.detail}${RESET}`)
    }
    process.exit(1)
  }
  console.log(`\n${GREEN}✓ All ${total} cases passed${RESET}`)
})().catch((e) => {
  console.error(`${RED}FATAL: ${e.message}${RESET}`)
  process.exit(2)
})
