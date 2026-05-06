'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSession, signIn } from 'next-auth/react'

export type Locale = 'ja' | 'en'

interface QuotaState {
  remainingFree: number
  freeUsedToday: number
  ipUsedToday: number
  paidCredits: number
  canUse: boolean
  blockReason: 'none' | 'free_exhausted' | 'ip_exhausted'
  stripeEnabled?: boolean
}

interface HairCandidate {
  hex: string
  nameJa: string
  nameEn: string
  toneType: 'warm' | 'cool' | 'neutral'
  brightnessLevel: number
  reasonJa: string
  category: 'safe' | 'trend' | 'bold'
}

interface PreviewSimulation {
  hex: string
  nameJa: string
  nameEn: string
  imageBase64: string
  mimeType: string
}

interface DiagnosisResult {
  analysisJa: string
  undertone: 'warm' | 'cool' | 'neutral'
  season4: 'spring' | 'summer' | 'autumn' | 'winter'
  currentHairJa: string
  candidates: HairCandidate[]
  confidence: number
}

interface AnalyzeResponse {
  diagnosis: DiagnosisResult
  previewSimulation: PreviewSimulation | null
}

const FREE_LIMIT = 3
const PRICE_LABEL = '¥300 / 10回パック'
const MAX_BYTES = 8 * 1024 * 1024
const SEASON_EMOJI = { spring: '🌸', summer: '☀️', autumn: '🍁', winter: '❄️' } as const

const STRINGS_JA = {
  season: { spring: 'スプリング（春）', summer: 'サマー（夏）', autumn: 'オータム（秋）', winter: 'ウィンター（冬）' },
  undertone: { warm: 'ウォーム（暖み）', cool: 'クール（青み）', neutral: 'ニュートラル' },
  category: {
    safe: { label: '安心の定番', icon: '🌿', color: 'emerald' },
    trend: { label: '今っぽいトレンド', icon: '✨', color: 'sky' },
    bold: { label: '個性派チャレンジ', icon: '🔥', color: 'rose' },
  },
  toneLabel: { warm: '暖色系', cool: '寒色系', neutral: 'ニュートラル' },
  statusChecking: '利用状況を確認中…',
  statusFree: (n: number) => `無料試用：残り ${n} / ${FREE_LIMIT} 回`,
  statusExhausted: '無料試用 3 回を使い切りました',
  statusPaidPrefix: '保有クレジット：',
  statusPaidSuffix: ' 回',
  statusPaidNoteFreeUsed: '（無料枠は使用済）',
  pickButton: '📁 写真を選択して髪色診断',
  pickCaption: 'JPG / PNG / WebP（最大 8MB）。写真は解析後サーバーから削除されます。',
  errImageTooLarge: '画像サイズが大きすぎます（最大 8MB）',
  errUnsupportedType: 'JPG / PNG / WebP のみ対応しています',
  errNetwork: (m: string) => `通信エラー: ${m}`,
  errAnalyze: (m: string) => `診断エラー: ${m}`,
  modalTitleFree: '無料試用 3 回を使い切りました',
  modalTitleIp: 'このネットワークの試用上限に達しました',
  modalDescFree: '無料試用は本ツールにつき 3 回までです。続けてご利用いただく場合は 10 回パックをご購入ください。クレジットはパーソナルカラー診断ツールと共通でご利用いただけます。',
  modalDescIp: '同じネットワークから 5 回以上利用されています。続けてご利用いただく場合は 10 回パックをご購入ください。',
  pricePackTitle: '10 回パック',
  priceFeatures: [
    '即時利用、有効期限なし',
    'パーソナルカラー診断ツールと共通',
    'Stripe 決済（VISA/Master/AMEX/JCB）',
    'Google サインイン または メールリンクで管理',
  ],
  purchasing: '処理中…',
  purchaseButton: `💳 10 回パックを購入（${PRICE_LABEL}）`,
  stripeNote: '※ 決済機能は Stripe 接入中。しばらくお待ちください。',
  stripeComingTitle: 'Stripe 決済は近日公開',
  signInRequired: '購入にはサインインが必要です',
  signInRequiredDesc: 'クレジットはアカウント（メールアドレス）に紐づきます。サインイン後に購入手続きへ進みます。',
  signInButton: '🔐 サインインして続ける',
  signInBenefit: '別デバイスでも同じメールでサインインすればクレジット同期',
  closeButton: '閉じる',
  purchaseCancelled: '購入がキャンセルされました',
  purchaseSuccess: '🎉 10 クレジットが追加されました！',
  recoveredSuccess: (balance: string | null) => `🎉 クレジットを復元しました${balance ? `（残り ${balance} 回）` : ''}`,
  recoverExpired: '復元リンクの有効期限が切れています。フォームから再送信してください。',
  recoverInvalid: '復元リンクが無効です。再度メールをご確認ください。',
  purchaseError: (err: string) => `購入処理エラー: ${err}`,
  stripeError: (err: string) => `Stripe 接続エラー: ${err}`,
  uploadingHeading: '📤 アップロード中…',
  uploadingDetail: '画像をサーバーに送信しています',
  elapsedFmt: (sec: number) => `${sec}秒経過 / 約 25-40秒`,
  uploadingShort: '送信中',
  analyzeSteps: [
    { icon: '📸', text: '写真を解析しています…', detail: '画像の品質と顔の位置を確認' },
    { icon: '🎨', text: '肌のアンダートーンを判定中…', detail: '黄み／青み／中性の傾向を抽出' },
    { icon: '🎭', text: '似合う髪色を 5 つ選定中…', detail: '安心の定番・トレンド・個性派から提案' },
    { icon: '🪄', text: 'Before/After を生成中…', detail: '一番おすすめのカラーで仮想プレビュー' },
    { icon: '💎', text: 'もうすぐ完了します…', detail: '結果を整形しています' },
  ],
  resultBadge: '✨ あなたの髪色診断結果',
  resultLabel: 'あなたに似合う髪色',
  candidatesHeading: '5 つの推薦カラー',
  candidatesNote: '色をタップ → AI が Before/After を生成します（1 クレジット）',
  beforeAfterHeading: 'Before / After プレビュー',
  beforeLabel: 'Before（元の写真）',
  afterLabel: 'After（AI シミュレーション）',
  noPreview: 'プレビュー画像が生成できませんでした。「色をタップ」で再試行できます。',
  simulating: '生成中…（約 15-25 秒）',
  simErrorPrefix: 'シミュレーションエラー: ',
  simExhausted: 'クレジットが足りません。10 回パックをご購入ください。',
  pickCandidate: 'この色を試す（1 クレジット）',
  pickCandidateDisabled: 'クレジット不足',
  currentlyShowing: 'プレビュー中：',
  retryNote: '※ プレビューが不自然な場合、写真の照明や髪の見え方によって AI が苦手なケースがあります。別の角度の写真でお試しください。',
  uploadedAlt: 'アップロード写真',
  lowConfidenceWarn: '⚠️ 信頼度が低めです。自然光・正面・素顔の写真で再診断すると精度が上がります。',
  confidenceLabel: '信頼度',
  currentHairLabel: '現在の髪色',
  brightnessLabel: '明るさ',
  toneTypeLabel: 'トーン',
} as const

type Strings = typeof STRINGS_JA

export interface HairColorQuotaGateProps {
  locale?: Locale
}

export function HairColorQuotaGate({ locale = 'ja' }: HairColorQuotaGateProps = {}) {
  const t = STRINGS_JA // EN locale to be added later (mirrors personal-color rollout)
  const { status: authStatus } = useSession()
  const isSignedIn = authStatus === 'authenticated'
  const [state, setState] = useState<QuotaState | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [pending, setPending] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'uploading' | 'analyzing'>('idle')
  const [analyzeResult, setAnalyzeResult] = useState<AnalyzeResponse | null>(null)
  const [activeSimulation, setActiveSimulation] = useState<PreviewSimulation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [purchaseBanner, setPurchaseBanner] = useState<string | null>(null)
  const [simulatingHex, setSimulatingHex] = useState<string | null>(null)
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setPortalTarget(document.getElementById('hair-color-result-portal'))
  }, [])

  useEffect(() => {
    if (phase !== 'analyzing') {
      setElapsedSec(0)
      setStepIndex(0)
      return
    }
    const t0 = Date.now()
    const tick = setInterval(() => {
      const sec = Math.floor((Date.now() - t0) / 1000)
      setElapsedSec(sec)
      setStepIndex(Math.min(Math.floor(sec / 6), t.analyzeSteps.length - 1))
    }, 500)
    return () => clearInterval(tick)
  }, [phase])

  useEffect(() => {
    refresh()
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const purchase = params.get('purchase')
      if (purchase === 'success') {
        // Webhook + signed-in session combine to grant + reveal credits.
        // No client-side claim needed.
        setPurchaseBanner(t.purchaseSuccess)
        cleanUrl()
        refresh()
      } else if (purchase === 'cancelled') {
        setPurchaseBanner(t.purchaseCancelled)
        cleanUrl()
      }
    }
  }, [])

  // Refresh paid balance whenever the auth session flips signed-in/out
  useEffect(() => {
    refresh()
  }, [authStatus])

  function refresh() {
    fetch('/api/tools/hair-color/check')
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
    e.target.value = ''
    if (!f) return
    if (f.size > MAX_BYTES) {
      setError(t.errImageTooLarge)
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      setError(t.errUnsupportedType)
      return
    }
    setError(null)
    setAnalyzeResult(null)
    setActiveSimulation(null)
    setPreviewUrl(URL.createObjectURL(f))
    setOriginalFile(f)
    await runAnalyze(f)
  }

  async function runAnalyze(file: File) {
    setPending(true)
    setPhase('uploading')
    try {
      const form = new FormData()
      form.append('image', file)
      setPhase('analyzing')
      const r = await fetch('/api/tools/hair-color/analyze', { method: 'POST', body: form })
      const data = await r.json()
      if (!r.ok) {
        if (r.status === 429) {
          setState((s) => (s ? { ...s, ...data, canUse: false } : data))
          setShowModal(true)
        } else if (r.status === 413 || r.status === 415 || r.status === 422) {
          setError(data.message ?? t.errAnalyze('check image'))
          setPreviewUrl(null)
        } else {
          setError(t.errAnalyze(data.message ?? data.error ?? 'unknown'))
        }
        return
      }
      setAnalyzeResult(data.result)
      setActiveSimulation(data.result?.previewSimulation ?? null)
      if (data.quota) setState(data.quota)
      setTimeout(() => {
        document.getElementById('your-hair-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    } catch (e: any) {
      setError(t.errNetwork(e?.message ?? ''))
    } finally {
      setPending(false)
      setPhase('idle')
    }
  }

  async function runSimulate(candidate: HairCandidate) {
    if (!originalFile) return
    if (!state || (!state.canUse && state.paidCredits <= 0)) {
      setShowModal(true)
      return
    }
    setSimulatingHex(candidate.hex)
    setError(null)
    try {
      const form = new FormData()
      form.append('image', originalFile)
      form.append('hex', candidate.hex)
      form.append('nameJa', candidate.nameJa)
      form.append('nameEn', candidate.nameEn)
      const r = await fetch('/api/tools/hair-color/simulate', { method: 'POST', body: form })
      const data = await r.json()
      if (!r.ok) {
        if (r.status === 429) {
          setShowModal(true)
        } else {
          setError(t.simErrorPrefix + (data.message ?? data.error ?? 'unknown'))
        }
        return
      }
      setActiveSimulation(data.simulation)
      if (data.quota) setState(data.quota)
    } catch (e: any) {
      setError(t.errNetwork(e?.message ?? ''))
    } finally {
      setSimulatingHex(null)
    }
  }

  async function handlePurchase() {
    if (!isSignedIn) {
      // Redirect to signIn with callback back to this tool page so the user
      // lands here after authenticating and can immediately purchase.
      const callbackUrl = typeof window !== 'undefined' ? window.location.pathname : '/tools/hair-color-diagnosis'
      signIn(undefined, { callbackUrl })
      return
    }
    setPending(true)
    try {
      const r = await fetch(`/api/checkout/hair-color?locale=${locale}`, { method: 'POST' })
      if (r.status === 401) {
        const callbackUrl = typeof window !== 'undefined' ? window.location.pathname : '/tools/hair-color-diagnosis'
        signIn(undefined, { callbackUrl })
        return
      }
      if (!r.ok) {
        const err = await r.json().catch(() => ({}))
        setPurchaseBanner(t.stripeError(err.error ?? 'config'))
        setPending(false)
        return
      }
      const { url } = await r.json()
      if (url) window.location.href = url
    } catch (e: any) {
      setPurchaseBanner(t.errNetwork(e?.message ?? ''))
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

      <div className="flex justify-center mb-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
            paidCredits > 0
              ? 'bg-violet-50 text-violet-700 border-violet-200'
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
                {t.statusPaidPrefix}
                <strong className="font-bold">{paidCredits}</strong>
                {t.statusPaidSuffix}
                {exhausted && <span className="text-gray-500 ml-2">{t.statusPaidNoteFreeUsed}</span>}
              </span>
            ) : exhausted ? (
              <span>{t.statusExhausted}</span>
            ) : (
              <span>{t.statusFree(remaining)}</span>
            )
          ) : (
            <span>{t.statusChecking}</span>
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

      {phase === 'analyzing' || phase === 'uploading' ? (
        <AnalyzingOverlay
          phase={phase}
          previewUrl={previewUrl}
          elapsedSec={elapsedSec}
          stepIndex={stepIndex}
          t={t}
        />
      ) : (
        <>
          <button
            type="button"
            onClick={handlePickFile}
            disabled={!state || pending}
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.pickButton}
          </button>
          <p className="mt-2 text-[11px] text-gray-400">{t.pickCaption}</p>
        </>
      )}

      {error && (
        <div className="mt-3 mx-auto max-w-md px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      {analyzeResult &&
        (portalTarget
          ? createPortal(
              <HairColorResult
                result={analyzeResult}
                previewUrl={previewUrl}
                activeSimulation={activeSimulation}
                onPick={runSimulate}
                simulatingHex={simulatingHex}
                paidCredits={paidCredits}
                remainingFree={remaining}
                t={t}
              />,
              portalTarget,
            )
          : null)}

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
              <div className="text-5xl mb-3">💇</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {state.blockReason === 'ip_exhausted' ? t.modalTitleIp : t.modalTitleFree}
              </h3>
              <p className="text-sm text-gray-600">
                {state.blockReason === 'ip_exhausted' ? t.modalDescIp : t.modalDescFree}
              </p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-5 border border-violet-100 mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.pricePackTitle}</span>
                <span className="text-xl font-bold text-violet-700">{PRICE_LABEL}</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                {t.priceFeatures.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
            </div>

            {!stripeReady ? (
              <>
                <button
                  type="button"
                  disabled
                  title={t.stripeComingTitle}
                  className="w-full px-5 py-3 bg-violet-600 text-white text-sm font-semibold rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {t.purchaseButton}
                </button>
                <p className="mt-2 text-[11px] text-gray-400 text-center">{t.stripeNote}</p>
              </>
            ) : isSignedIn ? (
              <button
                type="button"
                onClick={handlePurchase}
                disabled={pending}
                className="w-full px-5 py-3 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? t.purchasing : t.purchaseButton}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-amber-900 mb-1">
                    🔐 {t.signInRequired}
                  </p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    {t.signInRequiredDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={pending}
                  className="w-full px-5 py-3 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {t.signInButton}
                </button>
                <p className="text-[10px] text-gray-500 text-center">
                  ✓ {t.signInBenefit}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-4 w-full px-5 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t.closeButton}
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

function HairColorResult({
  result,
  previewUrl,
  activeSimulation,
  onPick,
  simulatingHex,
  paidCredits,
  remainingFree,
  t,
}: {
  result: AnalyzeResponse
  previewUrl: string | null
  activeSimulation: PreviewSimulation | null
  onPick: (c: HairCandidate) => void
  simulatingHex: string | null
  paidCredits: number
  remainingFree: number
  t: Strings
}) {
  const { diagnosis } = result
  const canSpend = paidCredits > 0 || remainingFree > 0

  return (
    <section
      id="your-hair-result"
      className="mt-12 max-w-5xl mx-auto scroll-mt-16 text-left"
    >
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-violet-50 text-violet-700 rounded-full border border-violet-200 mb-2">
          {t.resultBadge}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Diagnosis header */}
        <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-6 sm:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={t.uploadedAlt}
                className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow shrink-0"
              />
            ) : (
              <div className="text-7xl shrink-0">{SEASON_EMOJI[diagnosis.season4]}</div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">
                {t.resultLabel}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {SEASON_EMOJI[diagnosis.season4]} {t.season[diagnosis.season4]}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                  Undertone:{' '}
                  <span className="text-violet-600">{t.undertone[diagnosis.undertone]}</span>
                </span>
                {diagnosis.currentHairJa && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                    {t.currentHairLabel}:{' '}
                    <span className="text-gray-700">{diagnosis.currentHairJa}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                  {t.confidenceLabel}:{' '}
                  <span
                    className={
                      diagnosis.confidence >= 0.8
                        ? 'text-emerald-600 font-semibold'
                        : diagnosis.confidence >= 0.5
                          ? 'text-amber-600 font-semibold'
                          : 'text-rose-600 font-semibold'
                    }
                  >
                    {Math.round(diagnosis.confidence * 100)}%
                  </span>
                </span>
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-gray-600 leading-relaxed bg-white/60 rounded-lg p-3 border border-white">
            💡 {diagnosis.analysisJa}
          </p>
          {diagnosis.confidence < 0.6 && (
            <p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg p-2 border border-amber-100">
              {t.lowConfidenceWarn}
            </p>
          )}
        </div>

        {/* Before / After zone */}
        <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
          <h3 className="text-base font-bold text-gray-900 mb-4">{t.beforeAfterHeading}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BeforeCard previewUrl={previewUrl} t={t} />
            <AfterCard
              activeSimulation={activeSimulation}
              simulatingHex={simulatingHex}
              t={t}
            />
          </div>
          {activeSimulation && (
            <p className="mt-3 text-xs text-gray-500">
              {t.currentlyShowing}
              <span
                className="inline-block w-3 h-3 rounded-full align-middle mx-1.5 border border-gray-300"
                style={{ backgroundColor: activeSimulation.hex }}
              />
              <strong className="text-gray-800">{activeSimulation.nameJa}</strong>
              <span className="ml-1 font-mono text-gray-400">
                {activeSimulation.hex.toUpperCase()}
              </span>
            </p>
          )}
          <p className="mt-2 text-[11px] text-gray-400">{t.retryNote}</p>
        </div>

        {/* Candidates grid */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-base font-bold text-gray-900">{t.candidatesHeading}</h3>
            <span className="text-xs text-gray-500">{t.candidatesNote}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {diagnosis.candidates.map((c) => (
              <CandidateCard
                key={c.hex + c.nameJa}
                candidate={c}
                isActive={activeSimulation?.hex === c.hex}
                isSimulating={simulatingHex === c.hex}
                disabled={!canSpend}
                onPick={() => onPick(c)}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BeforeCard({ previewUrl, t }: { previewUrl: string | null; t: Strings }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="aspect-square bg-gray-100 relative">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt={t.beforeLabel} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            —
          </div>
        )}
      </div>
      <div className="px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-50 border-t border-gray-100">
        {t.beforeLabel}
      </div>
    </div>
  )
}

function AfterCard({
  activeSimulation,
  simulatingHex,
  t,
}: {
  activeSimulation: PreviewSimulation | null
  simulatingHex: string | null
  t: Strings
}) {
  const showSpinner = !!simulatingHex
  const dataUri = activeSimulation
    ? `data:${activeSimulation.mimeType};base64,${activeSimulation.imageBase64}`
    : null
  return (
    <div className="bg-white rounded-xl border border-violet-200 overflow-hidden">
      <div className="aspect-square bg-violet-50 relative">
        {dataUri && !showSpinner ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUri} alt={t.afterLabel} className="w-full h-full object-cover" />
        ) : showSpinner ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-violet-600 text-sm gap-2">
            <div className="animate-spin h-8 w-8 border-2 border-violet-300 border-t-violet-600 rounded-full" />
            <span className="text-xs">{t.simulating}</span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs px-4 text-center">
            {t.noPreview}
          </div>
        )}
      </div>
      <div className="px-3 py-2 text-xs font-semibold text-violet-700 bg-violet-50 border-t border-violet-100">
        {t.afterLabel}
      </div>
    </div>
  )
}

function CandidateCard({
  candidate,
  isActive,
  isSimulating,
  disabled,
  onPick,
  t,
}: {
  candidate: HairCandidate
  isActive: boolean
  isSimulating: boolean
  disabled: boolean
  onPick: () => void
  t: Strings
}) {
  const cat = t.category[candidate.category]
  const ringClass = isActive
    ? 'ring-2 ring-violet-500 border-violet-300'
    : 'border-gray-200 hover:border-violet-200'
  return (
    <div
      className={`bg-white rounded-xl border overflow-hidden transition-all ${ringClass}`}
    >
      <div
        className="h-20 w-full relative"
        style={{ backgroundColor: candidate.hex }}
        aria-label={`${candidate.nameJa} ${candidate.hex}`}
      >
        <span className="absolute top-1.5 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/85 text-gray-700 shadow-sm">
          {cat.icon} {cat.label}
        </span>
        <span className="absolute top-1.5 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/35 text-white">
          {candidate.hex.toUpperCase()}
        </span>
      </div>
      <div className="p-3">
        <div className="text-sm font-bold text-gray-900 mb-1">{candidate.nameJa}</div>
        <div className="text-[11px] text-gray-500 mb-2">{candidate.nameEn}</div>
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
            {t.toneTypeLabel}: {t.toneLabel[candidate.toneType]}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
            {t.brightnessLabel}: {candidate.brightnessLevel}/15
          </span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
          {candidate.reasonJa}
        </p>
        <button
          type="button"
          onClick={onPick}
          disabled={isSimulating || isActive || disabled}
          className={`w-full px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            isActive
              ? 'bg-violet-100 text-violet-700 cursor-default'
              : isSimulating
                ? 'bg-violet-200 text-violet-700 cursor-wait'
                : disabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          {isActive
            ? '✓ プレビュー中'
            : isSimulating
              ? '生成中…'
              : disabled
                ? t.pickCandidateDisabled
                : t.pickCandidate}
        </button>
      </div>
    </div>
  )
}

function AnalyzingOverlay({
  phase,
  previewUrl,
  elapsedSec,
  stepIndex,
  t,
}: {
  phase: 'uploading' | 'analyzing'
  previewUrl: string | null
  elapsedSec: number
  stepIndex: number
  t: Strings
}) {
  const step = t.analyzeSteps[stepIndex] ?? t.analyzeSteps[0]
  const ESTIMATED_TOTAL = 35
  const progressPct =
    phase === 'uploading' ? 8 : Math.min(95, 10 + (elapsedSec / ESTIMATED_TOTAL) * 85)

  return (
    <div className="mt-2 mx-auto max-w-sm">
      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-white via-violet-50 to-purple-50 p-6 shadow-sm">
        <div className="flex flex-col items-center">
          {previewUrl && (
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-violet-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 pointer-events-none hc-scan-overlay" />
              <div className="absolute inset-0 ring-2 ring-violet-400/0 hc-pulse-ring rounded-xl" />
            </div>
          )}

          <div className="mt-5 text-3xl hc-bounce" aria-hidden="true">
            {step.icon}
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-900 text-center">
            {phase === 'uploading' ? t.uploadingHeading : step.text}
          </p>
          <p className="mt-1 text-xs text-gray-500 text-center">
            {phase === 'uploading' ? t.uploadingDetail : step.detail}
          </p>

          <div className="mt-4 w-full">
            <div className="h-1.5 w-full bg-violet-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-500">
              <span>{Math.round(progressPct)}%</span>
              <span>{phase === 'analyzing' ? t.elapsedFmt(elapsedSec) : t.uploadingShort}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-violet-500 hc-dot hc-dot-1" />
            <span className="w-2 h-2 rounded-full bg-violet-500 hc-dot hc-dot-2" />
            <span className="w-2 h-2 rounded-full bg-violet-500 hc-dot hc-dot-3" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes hc-scan {
          0%   { transform: translateY(-100%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .hc-scan-overlay {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(167, 139, 250, 0.0) 35%,
            rgba(167, 139, 250, 0.55) 50%,
            rgba(167, 139, 250, 0.0) 65%,
            transparent 100%
          );
          animation: hc-scan 2.2s ease-in-out infinite;
        }
        @keyframes hc-pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.0) inset; }
          50%      { box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.35) inset; }
        }
        .hc-pulse-ring {
          animation: hc-pulse-ring 2.2s ease-in-out infinite;
        }
        @keyframes hc-bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .hc-bounce {
          animation: hc-bounce 1.4s ease-in-out infinite;
        }
        @keyframes hc-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40%           { transform: translateY(-6px); opacity: 1; }
        }
        .hc-dot {
          animation: hc-dot-bounce 1.2s ease-in-out infinite;
        }
        .hc-dot-1 { animation-delay: 0s; }
        .hc-dot-2 { animation-delay: 0.2s; }
        .hc-dot-3 { animation-delay: 0.4s; }
      `}</style>
    </div>
  )
}
