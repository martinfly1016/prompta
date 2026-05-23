'use client'

import { useState } from 'react'
import { CreditPurchaseModal } from './CreditPurchaseModal'

interface Props {
  /** Path to return to after Stripe success/cancel. */
  returnTo: string
  currentBalance?: number | null
  /** ISO timestamp — passed through to the modal so it can show the
   *  current expiration alongside the post-purchase one. */
  currentExpiresAt?: string | null
  /** Tailwind class overrides for the trigger button. */
  className?: string
  children?: React.ReactNode
}

/**
 * Server-component-friendly button that opens the CreditPurchaseModal.
 * Drop in anywhere a "buy credits" CTA is needed:
 *
 *   <TopUpCreditsButton returnTo="/account" currentBalance={balance}>
 *     💳 ポイントを補充する
 *   </TopUpCreditsButton>
 */
export function TopUpCreditsButton({
  returnTo,
  currentBalance,
  currentExpiresAt,
  className,
  children,
}: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          'inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-colors'
        }
      >
        {children ?? '💳 ポイントを補充する'}
      </button>
      <CreditPurchaseModal
        open={open}
        onClose={() => setOpen(false)}
        returnTo={returnTo}
        currentBalance={currentBalance}
        currentExpiresAt={currentExpiresAt}
      />
    </>
  )
}
