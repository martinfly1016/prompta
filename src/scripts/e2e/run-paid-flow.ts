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
import { prisma } from '../../lib/prisma'
import { emailHash, grantWelcomeBonusIfEligible } from '../../lib/paid-credits'
import { resolveWelcomeBonusCredits } from '../../lib/welcome-credits'
import { getPointPack, POINTS_PER_RUN, recommendedPack, WELCOME_POINTS } from '../../lib/credit-costs'
import { refundPendingGeneration, startGeneration } from '../../lib/generation-output'
import { gptImageQuality } from '../../lib/image-providers/openai-image'

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

  await step('packs, welcome constant, and image quality cap', async () => {
    const small = getPointPack('pack-20')
    const large = getPointPack('pack-70')
    if (!small || small.points !== 20 || small.priceJpy !== 300 || small.name !== 'Prompta 20ポイント') {
      throw new Error(`pack-20 mismatch ${JSON.stringify(small)}`)
    }
    if (!large || large.points !== 70 || large.priceJpy !== 980 || large.name !== 'Prompta 70ポイント' || !large.recommended) {
      throw new Error(`pack-70 mismatch ${JSON.stringify(large)}`)
    }
    if (recommendedPack().id !== 'pack-70') throw new Error('recommended pack changed')
    if (getPointPack('pack-150')) throw new Error('legacy pack id must not resolve')
    if (POINTS_PER_RUN !== 1 || WELCOME_POINTS !== 3) throw new Error('cost/welcome drifted')
    const prevWelcome = process.env.WELCOME_BONUS_CREDITS
    process.env.WELCOME_BONUS_CREDITS = '20'
    if (resolveWelcomeBonusCredits() !== WELCOME_POINTS) throw new Error('env override must be ignored')
    if (prevWelcome == null) delete process.env.WELCOME_BONUS_CREDITS
    else process.env.WELCOME_BONUS_CREDITS = prevWelcome
    const prevQ = process.env.OPENAI_IMAGE_QUALITY
    process.env.OPENAI_IMAGE_QUALITY = 'high'
    if (gptImageQuality() !== 'medium') throw new Error('high quality leaked')
    process.env.OPENAI_IMAGE_QUALITY = 'LOW'
    if (gptImageQuality() !== 'low') throw new Error('low quality not accepted')
    process.env.OPENAI_IMAGE_QUALITY = 'auto'
    if (gptImageQuality() !== 'medium') throw new Error('unknown quality leaked')
    if (prevQ == null) delete process.env.OPENAI_IMAGE_QUALITY
    else process.env.OPENAI_IMAGE_QUALITY = prevQ
    return { welcome: WELCOME_POINTS, recommended: 'pack-70' }
  })

  await step('existing welcome wallets are not rewritten', async () => {
    async function untouched(email: string, balance: number) {
      const eh = emailHash(email)
      await prisma.paidCredits.deleteMany({ where: { emailHash: eh } })
      await prisma.paidCredits.create({
        data: {
          emailHash: eh,
          email,
          balance,
          totalEarned: balance,
          welcomeBonus: balance,
          welcomeBonusAt: new Date(),
          expiresAt: new Date(Date.now() + 86_400_000),
        },
      })
      const again = await grantWelcomeBonusIfEligible(email)
      if (again.granted) throw new Error(`${email} was granted again`)
      if (again.balance !== balance) throw new Error(`${email} balance ${again.balance} != ${balance}`)
    }
    await untouched('e2e-test+welcome-3@prompta.jp', 3)
    await untouched('e2e-test+welcome-15@prompta.jp', 15)
    const freshEmail = 'e2e-test+welcome-new@prompta.jp'
    const freshHash = emailHash(freshEmail)
    await prisma.paidCredits.deleteMany({ where: { emailHash: freshHash } })
    const first = await grantWelcomeBonusIfEligible(freshEmail)
    if (!first.granted || first.balance !== WELCOME_POINTS || first.amount !== WELCOME_POINTS) {
      throw new Error(`new grant ${JSON.stringify(first)}`)
    }
    const second = await grantWelcomeBonusIfEligible(freshEmail)
    if (second.granted || second.balance !== WELCOME_POINTS) throw new Error('repeat grant changed the wallet')
    return { fresh: first.balance }
  })

  await step('failed generation refunds once and records refunded', async () => {
    const email = 'e2e-test+refund@prompta.jp'
    const eh = emailHash(email)
    await prisma.generationOutput.deleteMany({ where: { emailHash: eh } })
    await prisma.paidCredits.deleteMany({ where: { emailHash: eh } })
    await prisma.paidCredits.create({
      data: {
        emailHash: eh,
        email,
        balance: 4,
        totalEarned: 5,
        totalUsed: 1,
        expiresAt: new Date(Date.now() + 86_400_000),
      },
    })
    const id = await startGeneration({ emailHash: eh, tool: 'personal-color', creditsUsed: 1 })
    await prisma.paidCredits.update({
      where: { emailHash: eh },
      data: { balance: { decrement: 1 }, totalUsed: { increment: 1 } },
    })
    const ok = await refundPendingGeneration(id, eh, 'e2e failure')
    if (!ok) throw new Error('refund did not claim the pending row')
    const again = await refundPendingGeneration(id, eh, 'e2e failure')
    if (again) throw new Error('second refund succeeded')
    const row = await prisma.paidCredits.findUnique({ where: { emailHash: eh } })
    if (row?.balance !== 4 || row?.totalUsed !== 1) {
      throw new Error(`wallet after refund balance=${row?.balance} used=${row?.totalUsed}`)
    }
    const gen = await prisma.generationOutput.findUnique({ where: { id } })
    if (gen?.status !== 'refunded') throw new Error(`status ${gen?.status}`)
    return { id, status: gen.status }
  })

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

  await step('T1: confirmed insufficient_points when a 1-point spend is rejected', async () => {
    const res = await api('/api/tools/hair-color/consume', { method: 'POST' })
    if (res.status !== 429) throw new Error(`expected 429, got ${res.status}: ${await res.text()}`)
    const body = await res.json()
    const ev = (body.ga || []).find((e) => e.name === 'insufficient_points')
    if (!ev) throw new Error(`missing insufficient_points: ${JSON.stringify(body)}`)
    if (ev.params?.tool !== 'hair-color' || ev.params?.needed !== 1 || ev.params?.balance !== 0) {
      throw new Error(`bad params: ${JSON.stringify(ev.params)}`)
    }
    return ev.params
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

    await step('T2: confirmed points_spent after a delivered 1-point action', async () => {
      const res = await api('/api/tools/hair-color/consume', { method: 'POST' })
      if (res.status !== 200) throw new Error(`expected 200, got ${res.status}: ${await res.text()}`)
      const body = await res.json()
      const ev = (body.ga || []).find((e) => e.name === 'points_spent')
      if (!ev) throw new Error(`missing points_spent: ${JSON.stringify(body)}`)
      if (ev.params?.tool !== 'hair-color' || ev.params?.amount !== 1) {
        throw new Error(`bad params: ${JSON.stringify(ev.params)}`)
      }
      if (ev.params.balance_after !== body.paidCredits) {
        throw new Error(`balance_after ${ev.params.balance_after} != paidCredits ${body.paidCredits}`)
      }
      return ev.params
    })
  }

  if (TIER === 3) {
    console.log('\n[T3 manual]: Open browser, go through Stripe checkout flow, then re-run with --tier=2 to verify DB state.')
  }

  await step('confirm: unknown session is not a purchase', async () => {
    const res = await api('/api/checkout/confirm?session_id=cs_test_missing_e2e')
    const body = await res.json()
    if (body.confirmed !== false) throw new Error(`expected unconfirmed, got ${JSON.stringify(body)}`)
    return body
  })

  await step('confirm: simulated payment for this login is confirmed', async () => {
    const res = await api('/api/test/simulate-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, credits: 10, amountJpy: 300 }),
    })
    if (!res.ok) throw new Error(`simulate-payment ${res.status}: ${await res.text()}`)
    const paid = await res.json()
    const conf = await api(`/api/checkout/confirm?session_id=${encodeURIComponent(paid.sessionId)}`)
    const body = await conf.json()
    if (!body.confirmed || body.transactionId !== paid.sessionId) {
      throw new Error(`confirm failed: ${JSON.stringify(body)}`)
    }
    return body
  })

  if ((process.env.STRIPE_SECRET_KEY || '').includes('stub')) {
    await step('checkout stub returns a Stripe URL and does not charge', async () => {
      const res = await api('/api/checkout/hair-color?pack=pack-20', { method: 'POST' })
      if (!res.ok) throw new Error(`checkout ${res.status}: ${await res.text()}`)
      const body = await res.json()
      if (!String(body.url || '').startsWith('https://checkout.stripe.com/')) {
        throw new Error(`expected stripe url, got ${body.url}`)
      }
      if (body.packId !== 'pack-20' || body.credits !== 20 || body.value !== 300) {
        throw new Error(`stub pack mismatch ${JSON.stringify(body)}`)
      }
      const bad = await api('/api/checkout/hair-color?pack=nope', { method: 'POST' })
      if (bad.status !== 400) throw new Error(`unknown pack status ${bad.status}`)
      return { url: body.url, packId: body.packId }
    })
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
