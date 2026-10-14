import { CREDIT_COSTS } from '@/lib/credit-costs'

// Default matches the "3 free image tries" promise: 15 credits / 5 per image.
// Override with WELCOME_BONUS_CREDITS. Values below one image run are raised
// so a brand-new account can complete at least one paid try.
export const DEFAULT_WELCOME_BONUS_CREDITS = 15

export function resolveWelcomeBonusCredits(): number {
  // Bracket access stays runtime-configurable. Next inlines process.env.NAME
  // at build time, which would freeze the welcome grant until the next build.
  const raw = process.env['WELCOME_BONUS_CREDITS']
  const parsed =
    raw == null || raw.trim() === '' ? DEFAULT_WELCOME_BONUS_CREDITS : Number(raw)
  const n = Number.isFinite(parsed) ? Math.floor(parsed) : DEFAULT_WELCOME_BONUS_CREDITS
  return Math.max(n, CREDIT_COSTS.image)
}

export function welcomeImageTries(credits = resolveWelcomeBonusCredits()): number {
  return Math.max(1, Math.floor(credits / CREDIT_COSTS.image))
}
