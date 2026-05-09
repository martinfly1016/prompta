// Retrieves a Stripe Checkout session by id and prints relevant fields as JSON.
// Used by test_checkout_email_pin_full (case #26) to verify the server-pinned
// customer_email actually made it into Stripe's record.
//
// Usage:
//   node tests/inspect-stripe-session.js <session_id>
//
// Requires STRIPE_SECRET_KEY in env (sk_test_*).

const Stripe = require('stripe')

const [, , sessionId] = process.argv
if (!sessionId) {
  console.error('Usage: node inspect-stripe-session.js <session_id>')
  process.exit(2)
}

const SECRET_KEY = process.env.STRIPE_SECRET_KEY
if (!SECRET_KEY) {
  console.error('Missing STRIPE_SECRET_KEY in env')
  process.exit(2)
}

const stripe = new Stripe(SECRET_KEY)

;(async () => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    console.log(
      JSON.stringify({
        id: session.id,
        customer_email: session.customer_email,
        customer_details: session.customer_details,
        payment_status: session.payment_status,
        status: session.status,
        metadata: session.metadata,
      }),
    )
  } catch (e) {
    console.error('Stripe retrieve failed:', e.message)
    process.exit(1)
  }
})()
