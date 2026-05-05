import Stripe from 'stripe'

const SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''

export const stripeEnabled = Boolean(SECRET_KEY)

export const stripe = stripeEnabled
  ? new Stripe(SECRET_KEY)
  : null

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || ''
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

export const CREDITS_PER_PACK = 10
export const PACK_PRICE_JPY = 300
