// Direct webhook POST helper for tests. Bypasses `stripe trigger`'s
// fixture pipeline (which is fragile when overriding customer_email)
// by constructing the event payload ourselves and signing it with the
// test webhook secret using Stripe SDK's generateTestHeaderString.
//
// Usage:
//   node tests/send-webhook.js <email> <credits> [sessionId] [product]

const Stripe = require('stripe')
const http = require('http')

const [, , email, creditsArg, sessionIdArg, productArg] = process.argv
if (!email || !creditsArg) {
  console.error('Usage: node send-webhook.js <email> <credits> [sessionId] [product]')
  process.exit(2)
}
const credits = String(parseInt(creditsArg, 10))
const sessionId = sessionIdArg || `cs_test_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
const product = productArg || 'hair-color-pack'

const SECRET_KEY = process.env.STRIPE_SECRET_KEY
const WHSEC = process.env.STRIPE_WEBHOOK_SECRET
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/webhooks/stripe'

if (!SECRET_KEY || !WHSEC) {
  console.error('Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET in env')
  process.exit(2)
}

const stripe = new Stripe(SECRET_KEY)

// Minimal but realistic checkout.session.completed event payload — only
// includes the fields the webhook handler reads: id, customer_details.email,
// customer_email, metadata.credits, metadata.product, amount_total,
// payment_intent.
const session = {
  id: sessionId,
  object: 'checkout.session',
  amount_total: parseInt(credits, 10) * 30,
  currency: 'jpy',
  customer_details: { email },
  customer_email: null,
  payment_intent: `pi_test_${Date.now()}`,
  metadata: { credits, product, sessionEmail: email },
  payment_status: 'paid',
  status: 'complete',
}

const event = {
  id: `evt_test_${Date.now()}`,
  object: 'event',
  type: 'checkout.session.completed',
  api_version: '2024-06-20',
  created: Math.floor(Date.now() / 1000),
  data: { object: session },
  livemode: false,
}

const payload = JSON.stringify(event)
const signature = stripe.webhooks.generateTestHeaderString({ payload, secret: WHSEC })

const url = new URL(WEBHOOK_URL)
const req = http.request(
  {
    hostname: url.hostname,
    port: url.port || 80,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'stripe-signature': signature,
    },
  },
  (res) => {
    let body = ''
    res.on('data', (c) => (body += c))
    res.on('end', () => {
      console.log(JSON.stringify({ status: res.statusCode, body, sessionId, email, credits }))
      process.exit(res.statusCode >= 200 && res.statusCode < 300 ? 0 : 1)
    })
  },
)
req.on('error', (e) => {
  console.error('Request error:', e.message)
  process.exit(1)
})
req.write(payload)
req.end()
