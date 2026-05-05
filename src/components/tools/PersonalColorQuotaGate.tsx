'use client'

import { useEffect, useRef, useState } from 'react'

interface QuotaState {
  remainingFree: number
  freeUsedToday: number
  ipUsedToday: number
  paidCredits: number
  canUse: boolean
  blockReason: 'none' | 'free_exhausted' | 'ip_exhausted'
  stripeEnabled?: boolean
}

interface RecommendedColor {
  hex: string
  nameJa: string
  role: 'clothing' | 'lipstick' | 'hair' | 'accessory'
}
interface AvoidColor {
  hex: string
  reasonJa: string
}
interface AnalysisResult {
  season12: string
  season4: 'spring' | 'summer' | 'autumn' | 'winter'
  undertone: 'warm' | 'cool' | 'neutral'
  contrast: 'high' | 'medium' | 'low'
  skinFeaturesJa: string
  recommendedColors: RecommendedColor[]
  avoidColors: AvoidColor[]
  confidence: number
}

const FREE_LIMIT = 3
const PRICE_LABEL = '¥300 / 10回パック'
const MAX_BYTES = 8 * 1024 * 1024
const SEASON_EMOJI = { spring: '🌸', summer: '☀️', autumn: '🍁', winter: '❄️' } as const
const SEASON_JA = { spring: 'スプリング（春）', summer: 'サマー（夏）', autumn: 'オータム（秋）', winter: 'ウィンター（冬）' } as const
const UNDERTONE_JA = { warm: 'ウォーム（暖み）', cool: 'クール（青み）', neutral: 'ニュートラル' } as const
const CONTRAST_JA = { high: '高（メリハリ）', medium: '中', low: '低（ソフト）' } as const
const ROLE_LABEL = {
  clothing: { icon: '👗', title: '服装' },
  lipstick: { icon: '💄', title: '口紅・チーク' },
  hair: { icon: '💇', title: '髪色（推奨）' },
  accessory: { icon: '💍', title: 'アクセサリー' },
} as const

export function PersonalColorQuotaGate() {
  const [state, setState] = useState<QuotaState | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [pending, setPending] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'uploading' | 'analyzing'>('idle')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [purchaseBanner, setPurchaseBanner] = useState<string | null>(null)
  const [showRecover, setShowRecover] = useState(false)
  const [recoverEmail, setRecoverEmail] = useState('')
  const [recoverPending, setRecoverPending] = useState(false)
  const [recoverMessage, setRecoverMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    refresh()
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const purchase = params.get('purchase')
      const sessionId = params.get('session_id')
      const recovered = params.get('recovered')
      if (purchase === 'success' && sessionId) {
        claimPurchase(sessionId)
      } else if (purchase === 'cancelled') {
        setPurchaseBanner('購入がキャンセルされました')
        cleanUrl()
      } else if (recovered === 'true') {
        const balance = params.get('balance')
        setPurchaseBanner(`🎉 クレジットを復元しました${balance ? `（残り ${balance} 回）` : ''}`)
        cleanUrl()
        refresh()
      } else if (recovered === 'false') {
        const reason = params.get('reason')
        setPurchaseBanner(
          reason === 'expired'
            ? '復元リンクの有効期限が切れています。フォームから再送信してください。'
            : '復元リンクが無効です。再度メールをご確認ください。',
        )
        cleanUrl()
      }
    }
  }, [])

  async function submitRecover(e: React.FormEvent) {
    e.preventDefault()
    if (!recoverEmail.trim()) return
    setRecoverPending(true)
    setRecoverMessage(null)
    try {
      const r = await fetch('/api/tools/personal-color/recover/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoverEmail.trim() }),
      })
      const data = await r.json()
      setRecoverMessage(
        r.ok
          ? data.message ?? '指定のメールアドレスにクレジットが紐づいている場合、復元リンクを送信しました。'
          : `エラー: ${data.error ?? 'unknown'}`,
      )
    } catch (e: any) {
      setRecoverMessage(`通信エラー: ${e?.message ?? ''}`)
    } finally {
      setRecoverPending(false)
    }
  }

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
    u.searchParams.delete('recovered')
    u.searchParams.delete('balance')
    u.searchParams.delete('reason')
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

  async function handlePickFile() {
    if (!state) return
    if (!state.canUse) {
      setShowModal(true)
      return
    }
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    e.target.value = '' // allow re-picking same file
    if (!f) return
    if (f.size > MAX_BYTES) {
      setError('画像サイズが大きすぎます（最大 8MB）')
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      setError('JPG / PNG / WebP のみ対応しています')
      return
    }
    setError(null)
    setResult(null)
    setPreviewUrl(URL.createObjectURL(f))
    await runAnalyze(f)
  }

  async function runAnalyze(file: File) {
    setPending(true)
    setPhase('uploading')
    try {
      const form = new FormData()
      form.append('image', file)
      setPhase('analyzing')
      const r = await fetch('/api/tools/personal-color/analyze', {
        method: 'POST',
        body: form,
      })
      const data = await r.json()
      if (!r.ok) {
        if (r.status === 429) {
          setState((s) => (s ? { ...s, ...data, canUse: false } : data))
          setShowModal(true)
        } else if (r.status === 413 || r.status === 415 || r.status === 422) {
          // Validation error — quota was NOT consumed, user can retry with another image
          setError(data.message ?? '画像を確認してください。')
          setPreviewUrl(null)
        } else {
          setError(`診断エラー: ${data.message ?? data.error ?? 'unknown'}`)
        }
        return
      }
      setResult(data.result)
      if (data.quota) setState(data.quota)
      // Scroll to result
      setTimeout(() => {
        document.getElementById('your-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    } catch (e: any) {
      setError(`通信エラー: ${e?.message ?? ''}`)
    } finally {
      setPending(false)
      setPhase('idle')
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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handlePickFile}
        disabled={!state || pending}
        className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending
          ? phase === 'analyzing'
            ? '🤖 AI が解析中…（15-25秒）'
            : '📤 アップロード中…'
          : '📁 写真を選択して診断'}
      </button>
      <p className="mt-2 text-[11px] text-gray-400">
        JPG / PNG / WebP（最大 8MB）。写真は解析後サーバーから削除されます。
      </p>

      {error && (
        <div className="mt-3 mx-auto max-w-md px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <PersonalColorResult result={result} previewUrl={previewUrl} />
      )}

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

            {/* Recovery flow */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              {!showRecover ? (
                <button
                  type="button"
                  onClick={() => setShowRecover(true)}
                  className="w-full text-xs text-sky-600 hover:text-sky-700 underline transition-colors"
                >
                  以前購入したクレジットがある場合 →
                </button>
              ) : (
                <form onSubmit={submitRecover} className="space-y-2">
                  <p className="text-xs text-gray-600">
                    購入時のメールアドレスに復元リンクをお送りします。
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      value={recoverEmail}
                      onChange={(e) => setRecoverEmail(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none"
                      disabled={recoverPending}
                    />
                    <button
                      type="submit"
                      disabled={recoverPending || !recoverEmail.trim()}
                      className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {recoverPending ? '送信中…' : '送信'}
                    </button>
                  </div>
                  {recoverMessage && (
                    <p className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded">
                      {recoverMessage}
                    </p>
                  )}
                </form>
              )}
            </div>

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

function PersonalColorResult({
  result,
  previewUrl,
}: {
  result: AnalysisResult
  previewUrl: string | null
}) {
  const groups: Record<RecommendedColor['role'], RecommendedColor[]> = {
    clothing: [],
    lipstick: [],
    hair: [],
    accessory: [],
  }
  for (const c of result.recommendedColors) groups[c.role].push(c)

  return (
    <section
      id="your-result"
      className="mt-12 max-w-5xl mx-auto scroll-mt-16 text-left"
    >
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-sky-50 text-sky-700 rounded-full border border-sky-200 mb-2">
          ✨ あなたの診断結果
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6 sm:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="アップロード写真"
                className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow shrink-0"
              />
            ) : (
              <div className="text-7xl shrink-0">{SEASON_EMOJI[result.season4]}</div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
                あなたのパーソナルカラー
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                {SEASON_EMOJI[result.season4]} {SEASON_JA[result.season4]}
              </h3>
              <p className="text-sm text-gray-700 font-medium mb-3">
                {result.season12}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                  Undertone:{' '}
                  <span className="text-blue-600">{UNDERTONE_JA[result.undertone]}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                  Contrast:{' '}
                  <span className="text-gray-700">{CONTRAST_JA[result.contrast]}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                  信頼度:{' '}
                  <span
                    className={
                      result.confidence >= 0.8
                        ? 'text-emerald-600 font-semibold'
                        : result.confidence >= 0.5
                          ? 'text-amber-600 font-semibold'
                          : 'text-rose-600 font-semibold'
                    }
                  >
                    {Math.round(result.confidence * 100)}%
                  </span>
                </span>
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-gray-600 leading-relaxed bg-white/60 rounded-lg p-3 border border-white">
            💡 {result.skinFeaturesJa}
          </p>
          {result.confidence < 0.6 && (
            <p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg p-2 border border-amber-100">
              ⚠️ 信頼度が低めです。自然光・正面・素顔の写真で再診断すると精度が上がります。
            </p>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">あなたに似合う色</h3>
            <span className="text-xs text-gray-500">役割別</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(['clothing', 'lipstick', 'hair', 'accessory'] as const).map((role) =>
              groups[role].length === 0 ? null : (
                <div key={role}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{ROLE_LABEL[role].icon}</span>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {ROLE_LABEL[role].title}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {groups[role].map((c, i) => (
                      <div
                        key={c.hex + i}
                        title={`${c.nameJa} ${c.hex.toUpperCase()}`}
                        className="bg-white rounded-lg border border-gray-100 overflow-hidden"
                      >
                        <div
                          className="h-12 w-full"
                          style={{ backgroundColor: c.hex }}
                          aria-label={`${c.nameJa} ${c.hex}`}
                        />
                        <div className="px-2 py-1.5">
                          <div className="text-xs font-medium text-gray-900 leading-tight truncate">
                            {c.nameJa}
                          </div>
                          <div className="text-[10px] text-gray-500 font-mono leading-tight mt-0.5">
                            {c.hex.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>

          {result.avoidColors.length > 0 && (
            <div className="mt-8">
              <h3 className="text-base font-bold text-gray-900 mb-3">避けたい色</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {result.avoidColors.map((c, i) => (
                  <div
                    key={c.hex + i}
                    className="flex items-start gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100"
                  >
                    <div
                      className="w-10 h-10 rounded-md border border-gray-200 shrink-0 relative overflow-hidden"
                      style={{ backgroundColor: c.hex }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold drop-shadow">
                        ✕
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{c.reasonJa}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
