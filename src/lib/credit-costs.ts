// Credit cost per execution type. Kept out of stripe.ts so client
// components can import it without pulling the Stripe SDK into the browser.
//
// Pricing baseline (2026-05-19): ¥300 / 150 credit
// - 1 credit = ¥2 nominal value
// - text prompt = 1 credit
// - image prompt = 5 credit
export const CREDIT_COSTS = {
  text: 1,
  image: 5,
  image_hd: 10,
  video: 20,
} as const

export type CreditCostKey = keyof typeof CREDIT_COSTS

export const CREDITS_PER_PACK = 150
export const PACK_PRICE_JPY = 300
