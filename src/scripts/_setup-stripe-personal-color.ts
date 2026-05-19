// @ts-nocheck
// One-shot: bootstrap Stripe product + price + webhook for the
// 150 クレジットパック ¥300 via API. Reads STRIPE_SECRET_KEY from env,
// prints price_id + webhook signing secret to stdout.
//
// Does NOT write anything to disk — caller must copy the output into Vercel
// Dashboard env vars manually (and rotate the secret key after if desired).
//
// Usage:
//   STRIPE_SECRET_KEY=sk_live_xxx STRIPE_WEBHOOK_URL=https://www.prompta.jp/api/webhooks/stripe \
//     npx tsx src/scripts/_setup-stripe-personal-color.ts

import Stripe from 'stripe'

const KEY = process.env.STRIPE_SECRET_KEY
if (!KEY) {
  console.error('Missing STRIPE_SECRET_KEY env var')
  process.exit(1)
}
const WEBHOOK_URL =
  process.env.STRIPE_WEBHOOK_URL || 'https://www.prompta.jp/api/webhooks/stripe'

const PRODUCT_NAME = 'prompta.jp 150 クレジットパック'
const PRODUCT_DESC =
  'prompta.jp 上の全ツール・全プロンプトで共通利用可能な 150 クレジットのクレジットパック。画像生成 1 回 = 5 クレジット、文字実行 1 回 = 1 クレジット消費。有効期限なし。'
const UNIT_AMOUNT_JPY = 300
const CURRENCY = 'jpy'
const EVENTS: Stripe.WebhookEndpointCreateParams.EnabledEvent[] = [
  'checkout.session.completed',
]

async function findOrCreateProduct(stripe: Stripe) {
  // Search by name to be idempotent if rerun
  const list = await stripe.products.list({ limit: 100, active: true })
  const existing = list.data.find((p) => p.name === PRODUCT_NAME)
  if (existing) {
    console.error(`✓ Product exists: ${existing.id}`)
    return existing
  }
  const created = await stripe.products.create({
    name: PRODUCT_NAME,
    description: PRODUCT_DESC,
  })
  console.error(`✓ Product created: ${created.id}`)
  return created
}

async function findOrCreatePrice(stripe: Stripe, productId: string) {
  const list = await stripe.prices.list({ product: productId, active: true, limit: 10 })
  const existing = list.data.find(
    (p) =>
      p.unit_amount === UNIT_AMOUNT_JPY &&
      p.currency === CURRENCY &&
      p.type === 'one_time',
  )
  if (existing) {
    console.error(`✓ Price exists: ${existing.id}`)
    return existing
  }
  const created = await stripe.prices.create({
    product: productId,
    unit_amount: UNIT_AMOUNT_JPY,
    currency: CURRENCY,
  })
  console.error(`✓ Price created: ${created.id}`)
  return created
}

async function findOrCreateWebhook(stripe: Stripe) {
  const list = await stripe.webhookEndpoints.list({ limit: 100 })
  const existing = list.data.find((e) => e.url === WEBHOOK_URL && e.status === 'enabled')
  if (existing) {
    console.error(
      `⚠ Webhook already exists at ${WEBHOOK_URL} (id=${existing.id}). The signing secret is NOT retrievable for an existing endpoint — either reuse the secret you already saved, or delete this endpoint in Dashboard and rerun this script.`,
    )
    return { endpoint: existing, secret: null }
  }
  const created = await stripe.webhookEndpoints.create({
    url: WEBHOOK_URL,
    enabled_events: EVENTS,
    description: 'prompta.jp personal-color tool credits webhook',
  })
  console.error(`✓ Webhook created: ${created.id}`)
  return { endpoint: created, secret: created.secret }
}

async function main() {
  const stripe = new Stripe(KEY)
  const product = await findOrCreateProduct(stripe)
  const price = await findOrCreatePrice(stripe, product.id)
  const { endpoint, secret } = await findOrCreateWebhook(stripe)

  console.error('\n=== ENV VARS TO ADD IN VERCEL ===')
  console.error(`STRIPE_SECRET_KEY=<the sk_live_... key you used to run this>`)
  console.error(`STRIPE_PRICE_ID=${price.id}`)
  if (secret) {
    console.error(`STRIPE_WEBHOOK_SECRET=${secret}`)
  } else {
    console.error(
      `STRIPE_WEBHOOK_SECRET=<pre-existing endpoint ${endpoint.id} — see warning above>`,
    )
  }

  // Machine-parseable line for the orchestrator (last line of stdout)
  console.log(
    JSON.stringify({
      product_id: product.id,
      price_id: price.id,
      webhook_endpoint_id: endpoint.id,
      webhook_secret: secret,
      webhook_url: endpoint.url,
    }),
  )
}

main().catch((e) => {
  console.error('Setup failed:', e?.message ?? e)
  process.exit(1)
})
