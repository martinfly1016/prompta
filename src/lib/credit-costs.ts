// Single source of truth for run cost, welcome grant, and the two paid packs.
// Server deduction and client copy both import this file.

/** Every generation or run: diagnosis, image, text, hair-color simulation, prompt-execute. */
export const POINTS_PER_RUN = 1

/**
 * Granted once, on the first sign-in (Google or email).
 * Wallets that already have a welcome grant are not rewritten.
 */
export const WELCOME_POINTS = 3

export const WELCOME_COPY_JA = `ログインで ${WELCOME_POINTS} 回無料（全ツール共通・1 回 ${POINTS_PER_RUN} ポイント）`
export const WELCOME_COPY_EN = `Sign in for ${WELCOME_POINTS} free runs (all tools, ${POINTS_PER_RUN} point each)`

export interface PointPack {
  id: 'pack-20' | 'pack-70'
  points: number
  priceJpy: number
  /** Shown on the site and sent as the Stripe line-item name. */
  name: string
  description: string
  recommended: boolean
}

export const POINT_PACKS: readonly PointPack[] = [
  {
    id: 'pack-20',
    points: 20,
    priceJpy: 300,
    name: 'Prompta 20ポイント',
    description:
      'prompta.jp 全ツール共通の 20 ポイント（20 回分）。1 回 1 ポイント。購入から 12 ヶ月有効。',
    recommended: false,
  },
  {
    id: 'pack-70',
    points: 70,
    priceJpy: 980,
    name: 'Prompta 70ポイント',
    description:
      'prompta.jp 全ツール共通の 70 ポイント（70 回分）。1 回 1 ポイント。購入から 12 ヶ月有効。',
    recommended: true,
  },
]

export function getPointPack(id: string | null | undefined): PointPack | null {
  if (!id) return null
  return POINT_PACKS.find((pack) => pack.id === id) ?? null
}

export function recommendedPack(): PointPack {
  return POINT_PACKS.find((pack) => pack.recommended) ?? POINT_PACKS[0]
}

/** Receipt label. Matches a known pack, otherwise the granted point count. */
export function packDisplayName(points: number, priceJpy: number): string {
  const pack = POINT_PACKS.find((p) => p.points === points && p.priceJpy === priceJpy)
  return pack?.name ?? `${points} ポイント`
}

export function creditPackPriceData(pack: PointPack) {
  return {
    currency: 'jpy' as const,
    unit_amount: pack.priceJpy,
    product_data: {
      name: pack.name,
      description: pack.description,
    },
  }
}

/** Grant points only for a known pack whose price matches what Stripe charged. */
export function resolvePaidPack(
  packId: string | null | undefined,
  amountJpy: number | null,
): { ok: true; pack: PointPack } | { ok: false; reason: 'unknown_pack' | 'amount_mismatch' } {
  const pack = getPointPack(packId)
  if (!pack) return { ok: false, reason: 'unknown_pack' }
  if (amountJpy != null && amountJpy !== pack.priceJpy) {
    return { ok: false, reason: 'amount_mismatch' }
  }
  return { ok: true, pack }
}

export const CREDIT_COSTS = {
  text: POINTS_PER_RUN,
  image: POINTS_PER_RUN,
  image_hd: POINTS_PER_RUN,
  video: POINTS_PER_RUN,
} as const

export type CreditCostKey = keyof typeof CREDIT_COSTS
