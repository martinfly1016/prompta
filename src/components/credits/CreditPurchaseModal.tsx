'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { trackPurchaseClick, type PaywallTool } from '@/lib/track'
import { signInThenCheckout, startCreditCheckout } from '@/lib/start-checkout'
import { getPointPack, POINTS_PER_RUN, recommendedPack, type PointPack } from '@/lib/credit-costs'
import { PointPackList } from '@/components/credits/PointPackList'

interface Props {
  open: boolean
  onClose: () => void
  /** Path to return to after Stripe Checkout success/cancel. */
  returnTo: string
  /** Optional current balance to display. If undefined, no balance shown. */
  currentBalance?: number | null
  /** Optional current expiration (ISO string). If set and a balance is
   *  shown, the modal renders the next-extension preview. */
  currentExpiresAt?: string | null
  /** Funnel label for GA4. */
  tool?: PaywallTool
  /** After sign-in, continue straight into Checkout. */
  autoStart?: boolean
  /** Pack chosen before a sign-in redirect (`?pack=`). */
  initialPackId?: string | null
}

function formatJpDate(d: Date): string {
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

/**
 * Shared review-before-checkout modal. The selected pack's name and price
 * are the same strings sent to Stripe as the line item.
 */
export function CreditPurchaseModal({ open, onClose, returnTo, currentBalance, currentExpiresAt, tool = 'prompt', autoStart = false, initialPackId = null }: Props) {
  const { status: authStatus } = useSession()
  const isSignedIn = authStatus === 'authenticated'
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedPack: PointPack = getPointPack(selectedId) ?? getPointPack(initialPackId) ?? recommendedPack()

  // Lock body scroll while modal is open + close on Escape
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  async function handlePurchase() {
    setError(null)
    const pack = selectedPack
    if (!isSignedIn) {
      trackPurchaseClick(tool, false)
      signInThenCheckout(returnTo || window.location.pathname, pack.id)
      return
    }
    setPending(true)
    try {
      const result = await startCreditCheckout({
        endpoint: `/api/checkout/personal-color?returnTo=${encodeURIComponent(returnTo)}`,
        tool,
        pack,
      })
      if (!result.ok) {
        if (result.status === 401) {
          signInThenCheckout(returnTo || window.location.pathname, pack.id)
          return
        }
        setError(`購入処理エラー: ${result.error}`)
        setPending(false)
      }
    } catch (e: any) {
      setError(`通信エラー: ${e?.message ?? 'unknown'}`)
      setPending(false)
    }
  }

  const autoStarted = useRef(false)
  useEffect(() => {
    if (!open || !autoStart || !isSignedIn || autoStarted.current) return
    autoStarted.current = true
    void handlePurchase()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, autoStart, isSignedIn])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-modal-title"
    >
      <div
        data-testid="paywall-modal"
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 px-6 py-5 border-b border-sky-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="purchase-modal-title" className="text-lg font-bold text-gray-900">
                ポイントを追加
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                全ツール共通・1 回 {POINTS_PER_RUN} ポイント・有効期限 12 ヶ月
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 -mr-2 -mt-1 text-gray-400 hover:text-gray-700 rounded-md hover:bg-white/50 transition-colors"
              aria-label="閉じる"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-4">
            <PointPackList selectedId={selectedPack.id} onSelect={(pack) => setSelectedId(pack.id)} />
          </div>

          <div className="space-y-2 mb-5 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span><strong className="text-gray-900">{selectedPack.name}</strong>（¥{selectedPack.priceJpy.toLocaleString()}・税込）</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>診断・画像・文字とも <strong className="text-gray-900">1 回 1 ポイント</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>有効期限は購入から <strong className="text-gray-900">12 ヶ月</strong>。アカウントに紐づきデバイス間で同期</span>
            </div>
          </div>

          {currentBalance != null && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-800 space-y-1">
              <div>
                現在の残高: <strong>{currentBalance}</strong> ポイント → 購入後:{' '}
                <strong>{currentBalance + selectedPack.points}</strong> ポイント
              </div>
              <div className="text-sky-700/80">
                {currentExpiresAt && currentBalance > 0 ? (
                  <>
                    現在の有効期限: <strong>{formatJpDate(new Date(currentExpiresAt))}</strong>{' '}
                    → 購入後:{' '}
                    <strong>
                      {(() => {
                        const d = new Date()
                        d.setMonth(d.getMonth() + 12)
                        return formatJpDate(d)
                      })()}
                    </strong>
                  </>
                ) : (
                  <>
                    購入後の有効期限:{' '}
                    <strong>
                      {(() => {
                        const d = new Date()
                        d.setMonth(d.getMonth() + 12)
                        return formatJpDate(d)
                      })()}
                    </strong>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 mb-5 leading-relaxed">
            決済は Stripe を経由します（VISA / Master / AMEX / JCB）。当サイトはポイントカード情報を保持しません。決済完了後、自動的に元のページに戻ります。
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="w-full sm:flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="button"
              data-testid="paywall-buy"
              onClick={handlePurchase}
              disabled={pending}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              {pending ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  処理中…
                </>
              ) : (
                <>💳 {selectedPack.name}を購入</>
              )}
            </button>
          </div>

          {!isSignedIn && (
            <p className="mt-3 text-xs text-gray-500 text-center">
              ※ 購入にはサインインが必要です（ポイントはアカウントに紐づきます）
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
