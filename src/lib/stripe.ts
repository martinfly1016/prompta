import Stripe from 'stripe'

const SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''

export const stripeEnabled = Boolean(SECRET_KEY)

export const stripe = stripeEnabled
  ? new Stripe(SECRET_KEY)
  : null

export const STRIPE_PRICE_ID = (process.env.STRIPE_PRICE_ID || '').trim()
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

export {
  CREDIT_COSTS,
  CREDITS_PER_PACK,
  PACK_PRICE_JPY,
  type CreditCostKey,
} from '@/lib/credit-costs'

// CI and local e2e use a non-calling stub key. Production never sets
// ENABLE_TEST_AUTH, so this cannot mint a fake Checkout URL there.
export function isCheckoutTestStub(): boolean {
  return (
    process.env.ENABLE_TEST_AUTH === 'true' &&
    (process.env.STRIPE_SECRET_KEY || '').includes('stub')
  )
}

// True only when a Checkout Session can actually be created. A secret key
// without a price id used to light up the buy button and then 503.
export function stripeCheckoutReady(): boolean {
  if (isCheckoutTestStub()) return true
  return stripeEnabled && STRIPE_PRICE_ID.length > 0
}
