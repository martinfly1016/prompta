'use client'

import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

interface Props {
  open: boolean
  onClose: () => void
  /** Path to return to after Stripe Checkout success/cancel. */
  returnTo: string
  /** Optional current balance to display. If undefined, no balance shown. */
  currentBalance?: number | null
}

/**
 * Shared "review before checkout" modal. Surfaces pack contents (150 credits
 * / ¥300 / what 150 credits buy) so users see what they're paying for BEFORE
 * being redirected to the external Stripe page.
 *
 * Used by:
 *   - PromptExecutor (credit-exhausted error path)
 *   - /account TopUpCreditsButton
 *   - future surfaces that need to top up credits
 */
export function CreditPurchaseModal({ open, onClose, returnTo, currentBalance }: Props) {
  const { status: authStatus } = useSession()
  const isSignedIn = authStatus === 'authenticated'
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  if (!open) return null

  async function handlePurchase() {
    setError(null)
    if (!isSignedIn) {
      await signIn(undefined, { callbackUrl: typeof window !== 'undefined' ? window.location.href : undefined })
      return
    }
    setPending(true)
    try {
      const r = await fetch(
        `/api/checkout/personal-color?returnTo=${encodeURIComponent(returnTo)}`,
        { method: 'POST' },
      )
      if (!r.ok) {
        const body = await r.json().catch(() => ({}))
        setError(`購入処理エラー: ${body?.error ?? r.status}`)
        setPending(false)
        return
      }
      const { url } = await r.json()
      if (url) window.location.href = url
    } catch (e: any) {
      setError(`通信エラー: ${e?.message ?? 'unknown'}`)
      setPending(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-modal-title"
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 px-6 py-5 border-b border-sky-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="purchase-modal-title" className="text-lg font-bold text-gray-900">
                💎 150 クレジットパック
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                全ツール・全 180 プロンプト共通で使えるクレジット
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
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">¥300</span>
            <span className="text-sm text-gray-500">税込・買い切り</span>
          </div>

          <div className="space-y-2 mb-5 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span><strong className="text-gray-900">150 クレジット</strong> 即時付与</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>画像生成 <strong className="text-gray-900">30 回</strong>（5 クレジット/回）</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>文字実行 <strong className="text-gray-900">150 回</strong>（1 クレジット/回）</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>パーソナルカラー診断・髪色診断・全 180 プロンプトで共通</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>有効期限なし。アカウント（メール）に紐づきデバイス間で同期</span>
            </div>
          </div>

          {currentBalance != null && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-800">
              現在の残高: <strong>{currentBalance}</strong> クレジット → 購入後:{' '}
              <strong>{currentBalance + 150}</strong> クレジット
            </div>
          )}

          <div className="text-xs text-gray-500 mb-5 leading-relaxed">
            決済は Stripe を経由します（VISA / Master / AMEX / JCB）。当サイトはクレジットカード情報を保持しません。決済完了後、自動的に元のページに戻ります。
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
                <>💳 Stripe で購入する</>
              )}
            </button>
          </div>

          {!isSignedIn && (
            <p className="mt-3 text-xs text-gray-500 text-center">
              ※ 購入にはサインインが必要です（クレジットはアカウントに紐づきます）
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
