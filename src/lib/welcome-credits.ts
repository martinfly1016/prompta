import { POINTS_PER_RUN, WELCOME_POINTS } from '@/lib/credit-costs'

// The grant is the constant above, not an environment variable. Copy imported
// from credit-costs.ts has to match what grantWelcomeBonusIfEligible writes.
export const DEFAULT_WELCOME_BONUS_CREDITS = WELCOME_POINTS

export function resolveWelcomeBonusCredits(): number {
  return WELCOME_POINTS
}

export function welcomeRuns(credits = WELCOME_POINTS): number {
  return Math.max(1, Math.floor(credits / POINTS_PER_RUN))
}
