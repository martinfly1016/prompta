'use client'

import { useEffect, useState } from 'react'

interface QuotaState {
  remainingFree: number
  freeUsedToday: number
  ipUsedToday: number
  paidCredits: number
  canUse: boolean
  blockReason: 'none' | 'free_exhausted' | 'ip_exhausted'
}

const FREE_LIMIT = 3
const PRICE_LABEL = '¥300 / 10回パック'

export function PersonalColorQuotaGate() {
  const [state, setState] = useState<QuotaState | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [pending, setPending] = useState(false)

  // initial fetch
  useEffect(() => {
    fetch('/api/tools/personal-color/check')
      .then((r) => r.json())
      .then((s) => setState(s))
      .catch(() => {})
  }, [])

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
        // Phase 1: simulate analyze flow — scroll to mock result
        document
          .getElementById('result-preview')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } finally {
      setPending(false)
    }
  }

  const remaining = state?.remainingFree ?? FREE_LIMIT
  const exhausted = state?.canUse === false

  return (
    <>
      {/* Status chip */}
      <div className="flex justify-center mb-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
            exhausted
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : remaining <= 1
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
          aria-live="polite"
        >
          <span className="text-base">{exhausted ? '🔒' : '✨'}</span>
          {state ? (
            exhausted ? (
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

      {/* Trigger button (replaces the disabled placeholder) */}
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
                <span className="text-sm font-semibold text-gray-900">
                  10 回パック
                </span>
                <span className="text-xl font-bold text-sky-700">{PRICE_LABEL}</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ 即時利用、有効期限なし</li>
                <li>✓ Stripe 決済（VISA/Master/AMEX/JCB）</li>
                <li>✓ メール 1 つで管理、登録不要</li>
              </ul>
            </div>

            <button
              type="button"
              disabled
              title="Stripe 決済は近日公開"
              className="w-full px-5 py-3 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              💳 10 回パックを購入（{PRICE_LABEL}）
            </button>
            <p className="mt-2 text-[11px] text-gray-400 text-center">
              ※ 決済機能は Stripe 接入中。明日 9:00 (UTC) に無料枠が自動リセットされます。
            </p>

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
