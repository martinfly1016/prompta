/**
 * E2E test runner for the paid feature flow.
 *
 * Three tiers (selectable via --tier=1|2|3):
 *   T1 API smoke    — login + use until exhausted + verify 429 paywall (no payment)
 *   T2 simulated    — T1 + simulate-payment endpoint + use after refill
 *   T3 live Stripe  — manual checkout in browser, this script only verifies DB after
 *
 * Usage:
 *   ENABLE_TEST_AUTH=true npm run dev      # in another terminal
 *   npx tsx src/scripts/e2e/run-paid-flow.ts --tier=2
 *
 * Test account: e2e-test+t{tier}@prompta.jp (one per tier, isolated)
 *
 * Safety: all writes go through emails containing 'e2e-test', and the
 * server-side test endpoints reject anything else with a 400. Analytics
 * scripts should exclude 'e2e-test+%' from queries (see _periods.ts
 * email filter — todo).
 */
// @ts-nocheck
import fs from 'node:fs/promises'
import path from 'node:path'

const BASE = process.env.E2E_BASE_URL || 'http://localhost:3000'
const TIER = parseInt(process.argv.find(a => a.startsWith('--tier='))?.split('=')[1] ?? '1', 10)
const EMAIL = `e2e-test+t${TIER}@prompta.jp`
const SAMPLE_IMAGE = path.resolve(process.cwd(), 'src/scripts/style-test-live/sample-source-faces/y-young-woman-clean.jpg')

type Step = { name: string; ok: boolean; ms: number; detail?: any }
const steps: Step[] = []

async function step<T>(name: string, fn: () => Promise<T>): Promise<T | null> {
  const t0 = Date.now()
  try {
    const result = await fn()
    const ms = Date.now() - t0
    steps.push({ name, ok: true, ms, detail: typeof result === 'object' ? result : { result } })
    console.log(`  ✓ ${name}  (${ms}ms)`)
    return result
  } catch (e: any) {
    const ms = Date.now() - t0
    steps.push({ name, ok: false, ms, detail: { error: e?.message ?? String(e) } })
    console.log(`  ✗ ${name}  (${ms}ms)  ${e?.message ?? e}`)
    return null
  }
}

// Cookie jar (manual since native fetch doesn't keep cookies across calls)
let cookieJar: string[] = []
function captureCookies(res: Response) {
  const setCookie = res.headers.get('set-cookie')
  if (setCookie) {
    // Naive parse: just grab "name=value" of each cookie
    const cookies = setCookie.split(/,\s*(?=[^=]+=)/).map(c => c.split(';')[0].trim())
    cookieJar = [...cookieJar.filter(c => !cookies.some(nc => nc.startsWith(c.split('=')[0] + '='))), ...cookies]
  }
}
function cookieHeader() {
  return cookieJar.join('; ')
}

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const headers: Record<string, string> = { ...(init.headers as any) }
  if (cookieJar.length) headers['Cookie'] = cookieHeader()
  const res = await fetch(`${BASE}${path}`, { ...init, headers })
  captureCookies(res)
  return res
}

async function main() {
  console.log(`\n=== E2E Paid Flow — Tier ${TIER} ===`)
  console.log(`Account: ${EMAIL}\nBase: ${BASE}\n`)

  // ---------- Setup ----------
  await step('seed: reset PaidCredits (set balance=0)', async () => {
    const res = await api('/api/test/seed-credits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, balance: 0 }),
    })
    if (res.status === 404) throw new Error('ENABLE_TEST_AUTH not set (test endpoints disabled)')
    if (!res.ok) throw new Error(`seed-credits ${res.status}: ${await res.text()}`)
    return await res.json()
  })

  await step('seed: programmatic login (test-only NextAuth bypass)', async () => {
    const res = await api('/api/test/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL }),
    })
    if (!res.ok) throw new Error(`login ${res.status}: ${await res.text()}`)
    return await res.json()
  })

  // ---------- T1: try to use without credits → must hit 429 paywall ----------
  let img: Buffer | null = null
  try {
    img = await fs.readFile(SAMPLE_IMAGE)
  } catch {
    console.log(`  (image-upload steps will be skipped — sample not at ${SAMPLE_IMAGE})`)
  }

  // The 0-credit paywall check can be done via /check (no image needed),
  // which is more robust in CI. Verify both /check and /analyze when image
  // available; only /check when not.
  await step('T1: /check with 0 credits → blockReason=credits_exhausted', async () => {
    const res = await api('/api/tools/hair-color/check')
    if (!res.ok) throw new Error(`check ${res.status}: ${await res.text()}`)
    const body = await res.json()
    if (body.blockReason !== 'credits_exhausted') {
      throw new Error(`expected credits_exhausted, got ${body.blockReason}: ${JSON.stringify(body)}`)
    }
    return body
  })

  if (img) {
    await step('T1: /analyze with 0 credits → expect 429 credits_exhausted', async () => {
      const form = new FormData()
      form.append('image', new Blob([img!], { type: 'image/jpeg' }), 'sample.jpg')
      const res = await api('/api/tools/hair-color/analyze', { method: 'POST', body: form })
      if (res.status !== 429) throw new Error(`expected 429, got ${res.status}: ${await res.text()}`)
      return { status: 429, body: await res.json() }
    })
  } else {
    console.log('  ⊘ T1: /analyze image-upload check  SKIPPED (no fixture image)')
  }

  if (TIER >= 2) {
    // ---------- T2: simulate payment → balance += 10 ----------
    await step('T2: simulate-payment ¥300 → +10 credits', async () => {
      const res = await api('/api/test/simulate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: EMAIL, credits: 10, amountJpy: 300 }),
      })
      if (!res.ok) throw new Error(`simulate-payment ${res.status}: ${await res.text()}`)
      const body = await res.json()
      if (body.balance < 10) throw new Error(`balance < 10 after payment: ${body.balance}`)
      return body
    })

    // /check after refill should also reflect new balance — always runs
    await step('T2: /check after refill → balance=10, canUse=true', async () => {
      const res = await api('/api/tools/hair-color/check')
      if (!res.ok) throw new Error(`check ${res.status}: ${await res.text()}`)
      const body = await res.json()
      if (body.paidCredits !== 10 || !body.canUse) {
        throw new Error(`expected balance=10/canUse=true, got ${JSON.stringify(body)}`)
      }
      return body
    })

    if (img) {
      await step('T2: /analyze after refill → expect 200', async () => {
        const form = new FormData()
        form.append('image', new Blob([img!], { type: 'image/jpeg' }), 'sample.jpg')
        const res = await api('/api/tools/hair-color/analyze', { method: 'POST', body: form })
        if (res.status !== 200) throw new Error(`expected 200, got ${res.status}: ${(await res.text()).slice(0, 200)}`)
        const body = await res.json()
        return { quota: body.quota }
      })

      // Cross-tool: verify shared pool by using personal-color too
      await step('T2: cross-tool — personal-color also draws from same pool', async () => {
        const form = new FormData()
        form.append('image', new Blob([img!], { type: 'image/jpeg' }), 'sample.jpg')
        const res = await api('/api/tools/personal-color/analyze', { method: 'POST', body: form })
        if (res.status !== 200) throw new Error(`expected 200, got ${res.status}: ${(await res.text()).slice(0, 200)}`)
        const body = await res.json()
        // After 2 calls (1 hair-color + 1 personal-color), balance should be 10 - 2 = 8
        if (body.quota?.paidCredits !== 8) throw new Error(`expected balance=8 after 2 calls, got ${body.quota?.paidCredits}`)
        return { balance: body.quota.paidCredits }
      })
    } else {
      console.log('  ⊘ T2: /analyze cross-tool checks SKIPPED (no fixture image)')
    }
  }

  if (TIER === 3) {
    console.log('\n[T3 manual]: Open browser, go through Stripe checkout flow, then re-run with --tier=2 to verify DB state.')
  }

  // ---------- Summary ----------
  const ok = steps.filter(s => s.ok).length
  const fail = steps.length - ok
  const totalMs = steps.reduce((a, s) => a + s.ms, 0)
  console.log(`\n${ok}/${steps.length} steps passed in ${totalMs}ms`)
  if (fail > 0) {
    console.log('\nFailures:')
    for (const s of steps.filter(s => !s.ok)) console.log(`  ${s.name}: ${s.detail?.error}`)
    process.exit(1)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
