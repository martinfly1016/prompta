'use client'

import { useEffect, useState } from 'react'

interface QuotaState {
  remainingFree: number
  freeUsedToday: number
  ipUsedToday: number
  paidCredits: number
  canUse: boolean
  blockReason: 'none' | 'free_exhausted' | 'ip_exhausted'
  stripeEnabled?: boolean
}

const FREE_LIMIT = 3
const PRICE_LABEL = '¥300 / 10回パック'

export function PersonalColorQuotaGate() {
  const [state, setState] = useState<QuotaState | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [pending, setPending] = useState(false)
  const [purchaseBanner, setPurchaseBanner] = useState<string | null>(null)

  // initial fetch
  useEffect(() => {
    refresh()
    // Handle Stripe success redirect
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const purchase = params.get('purchase')
      const sessionId = params.get('session_id')
      if (purchase === 'success' && sessionId) {
        claimPurchase(sessionId)
      } else if (purchase === 'cancelled') {
        setPurchaseBanner('購入がキャンセルされました')
        cleanUrl()
      }
    }
  }, [])

  function refresh() {
    fetch('/api/tools/personal-color/check')
      .then((r) => r.json())
      .then((s) => setState(s))
      .catch(() => {})
  }

  function cleanUrl() {
    const u = new URL(window.location.href)
    u.searchParams.delete('purchase')
    u.searchParams.delete('session_id')
    window.history.replaceState({}, '', u.toString())
  }

  async function claimPurchase(sessionId: string) {
    try {
      const r = await fetch('/api/checkout/personal-color/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      if (r.ok) {
        setPurchaseBanner('🎉 10 クレジットが追加されました！')
        refresh()
      } else {
        const err = await r.json().catch(() => ({}))
        setPurchaseBanner(`購入処理エラー: ${err.error ?? 'unknown'}`)
      }
    } finally {
      cleanUrl()
    }
  }

  async function handleTryClick() {
    if (!state) return
    if (!state.canUse) {
      setShowModal(true)
      return
    }
    setPending(true)
    try {
      const r = await fetch('/api/tools/personal-color/consume', { method: 'POST' })
      const s: QuotaState = await r.json()
      setState(s)
      if (!s.canUse) {
        setShowModal(true)
      } else {
        document
          .getElementById('result-preview')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } finally {
      setPending(false)
    }
  }

  async function handlePurchase() {
    setPending(true)
    try {
      const r = await fetch('/api/checkout/personal-color', { method: 'POST' })
      if (!r.ok) {
        const err = await r.json().catch(() => ({}))
        setPurchaseBanner(`Stripe 接続エラー: ${err.error ?? '設定未完了'}`)
        setPending(false)
        return
      }
      const { url } = await r.json()
      if (url) window.location.href = url
    } catch (e: any) {
      setPurchaseBanner(`通信エラー: ${e?.message ?? ''}`)
      setPending(false)
    }
  }

  const remaining = state?.remainingFree ?? FREE_LIMIT
  const paidCredits = state?.paidCredits ?? 0
  const exhausted = state?.canUse === false
  const stripeReady = state?.stripeEnabled === true

  return (
    <>
      {purchaseBanner && (
        <div className="mb-4 max-w-md mx-auto">
          <div className="px-4 py-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-sm text-center">
            {purchaseBanner}
            <button
              type="button"
              onClick={() => setPurchaseBanner(null)}
              className="ml-3 text-emerald-600 hover:text-emerald-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Status chip */}
      <div className="flex justify-center mb-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
            paidCredits > 0
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : exhausted
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : remaining <= 1
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
          aria-live="polite"
        >
          <span className="text-base">
            {paidCredits > 0 ? '💎' : exhausted ? '🔒' : '✨'}
          </span>
          {state ? (
            paidCredits > 0 ? (
              <span>
                保有クレジット：<strong className="font-bold">{paidCredits}</strong> 回
                {exhausted && <span className="text-gray-500 ml-2">（無料枠は使用済）</span>}
              </span>
            ) : exhausted ? (
              <span>本日の無料利用は使い切りました</span>
            ) : (
              <span>
                本日の残り：<strong className="font-bold">{remaining}</strong> / {FREE_LIMIT} 回
              </span>
            )
          ) : (
            <span>利用状況を確認中…</span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleTryClick}
        disabled={!state || pending}
        className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? '処理中…' : '📁 写真を選択して診断（プレビュー）'}
      </button>
      <p className="mt-2 text-[11px] text-gray-400">
        ※ 現在プレビュー版のため、実際の写真解析は近日公開。今はサンプル結果が表示されます。
      </p>

      {/* Modal */}
      {showModal && state && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fadein"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-5">
              <div className="text-5xl mb-3">🎨</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {state.blockReason === 'ip_exhausted'
                  ? 'このネットワークの本日上限に達しました'
                  : '本日の無料 3 回を使い切りました'}
              </h3>
              <p className="text-sm text-gray-600">
                {state.blockReason === 'ip_exhausted'
                  ? '同じネットワークで本日 5 回以上利用されています。明日 9:00 (UTC基準) にリセットされます。'
                  : '無料枠は毎日 9:00 (UTC基準) にリセットされます。今すぐ続けたい場合は 10 回パックをご購入ください。'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-5 border border-sky-100 mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">10 回パック</span>
                <span className="text-xl font-bold text-sky-700">{PRICE_LABEL}</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ 即時利用、有効期限なし</li>
                <li>✓ Stripe 決済（VISA/Master/AMEX/JCB）</li>
                <li>✓ メール 1 つで管理、登録不要</li>
              </ul>
            </div>

            {stripeReady ? (
              <button
                type="button"
                onClick={handlePurchase}
                disabled={pending}
                className="w-full px-5 py-3 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? '処理中…' : `💳 10 回パックを購入（${PRICE_LABEL}）`}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  title="Stripe 決済は近日公開"
                  className="w-full px-5 py-3 bg-sky-600 text-white text-sm font-semibold rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  💳 10 回パックを購入（{PRICE_LABEL}）
                </button>
                <p className="mt-2 text-[11px] text-gray-400 text-center">
                  ※ 決済機能は Stripe 接入中。明日 9:00 (UTC) に無料枠が自動リセットされます。
                </p>
              </>
            )}

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-3 w-full px-5 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein {
          animation: fadein 0.2s ease-out;
        }
      `}</style>
    </>
  )
}
