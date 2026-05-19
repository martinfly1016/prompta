import Stripe from 'stripe'

const SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''

export const stripeEnabled = Boolean(SECRET_KEY)

export const stripe = stripeEnabled
  ? new Stripe(SECRET_KEY)
  : null

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || ''
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

// Pricing baseline (2026-05-19): ¥300 / 150 credit
// - 1 credit = ¥2 nominal value
// - 文字 prompt 実行 = 1 credit (Gemini 2.5 Flash text, ~$0.005 cost, ~60% margin)
// - 画像 prompt 実行 = 5 credit (Gemini Flash Image / GPT Image 1.5, ~$0.04 cost, ~30% net margin)
// - 高品質 / 動画 reserved at 10 / 20 credit (not yet enabled)
export const CREDITS_PER_PACK = 150
export const PACK_PRICE_JPY = 300

// Credit cost per execution type. Single source of truth — used by
// hair-color, personal-color, and the future PromptExecutor.
export const CREDIT_COSTS = {
  text: 1,       // text-out via Gemini Flash text (or Vision-to-text)
  image: 5,      // image-out via Gemini Flash Image / OpenAI GPT Image 1.5
  image_hd: 10,  // reserved: GPT Image 1 High / SD Ultra
  video: 20,    // reserved: future video models
} as const

export type CreditCostKey = keyof typeof CREDIT_COSTS
