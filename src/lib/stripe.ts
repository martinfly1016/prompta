import Stripe from 'stripe'

const SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''

export const stripeEnabled = Boolean(SECRET_KEY)

export const stripe = stripeEnabled
  ? new Stripe(SECRET_KEY)
  : null

export const STRIPE_PRICE_ID = (process.env.STRIPE_PRICE_ID || '').trim()
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

export { CREDIT_COSTS, type CreditCostKey } from '@/lib/credit-costs'

// CI and local e2e use a non-calling stub key. Production never sets
// ENABLE_TEST_AUTH, so this cannot mint a fake Checkout URL there.
export function isCheckoutTestStub(): boolean {
  return (
    process.env.ENABLE_TEST_AUTH === 'true' &&
    (process.env.STRIPE_SECRET_KEY || '').includes('stub')
  )
}

// Checkout builds the product inline (price_data). A pre-made Price id is
// not required — the old Price was named 「パーソナルカラー診断 10回パック」.
export function stripeCheckoutReady(): boolean {
  if (isCheckoutTestStub()) return true
  return stripeEnabled
}
