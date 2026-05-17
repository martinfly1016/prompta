'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSession, signIn } from 'next-auth/react'
import {
  trackPaywallView,
  trackPurchaseClick,
  trackCheckoutStarted,
  type PaywallTrigger,
} from '@/lib/track'

const TOOL = 'personal-color' as const

function openPaywall(setShow: (v: boolean) => void, trigger: PaywallTrigger) {
  trackPaywallView(TOOL, trigger)
  setShow(true)
}

export type Locale = 'ja' | 'en'

interface QuotaState {
  remainingFree: number
  freeUsedToday: number
  ipUsedToday: number
  paidCredits: number
  canUse: boolean
  blockReason: 'none' | 'login_required' | 'credits_exhausted' | 'free_exhausted' | 'ip_exhausted'
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

// Phase 0 (2026-05-11) — credit-only. Welcome bonus = 3 on first login.
const WELCOME_CREDITS = 3
const PRICE_LABEL = '¥300 / 10回パック'
const PRICE_LABEL_EN = '¥300 / 10-pack'
const MAX_BYTES = 8 * 1024 * 1024
const SEASON_EMOJI = { spring: '🌸', summer: '☀️', autumn: '🍁', winter: '❄️' } as const

// Locale-aware string table. Result-card terms (skin description, color
// names) come from Gemini in Japanese for now — EN locale renders the
// scaffolding in English plus a small "JA result text" note.
const STRINGS = {
  ja: {
    season: { spring: 'スプリング（春）', summer: 'サマー（夏）', autumn: 'オータム（秋）', winter: 'ウィンター（冬）' },
    undertone: { warm: 'ウォーム（暖み）', cool: 'クール（青み）', neutral: 'ニュートラル' },
    contrast: { high: '高（メリハリ）', medium: '中', low: '低（ソフト）' },
    role: {
      clothing: { icon: '👗', title: '服装' },
      lipstick: { icon: '💄', title: '口紅・チーク' },
      hair: { icon: '💇', title: '髪色（推奨）' },
      accessory: { icon: '💍', title: 'アクセサリー' },
    },
    statusChecking: '利用状況を確認中…',
    statusLoginRequired: `ログインで ${WELCOME_CREDITS} クレジット獲得（無料）`,
    statusFree: (n: number) => `クレジット残り ${n} 回`,
    statusExhausted: 'クレジットを使い切りました',
    statusPaidPrefix: '保有クレジット：',
    statusPaidSuffix: ' 回',
    statusPaidNoteFreeUsed: '',
    pickButton: '📁 写真を選択して診断',
    pickCaption: 'JPG / PNG / WebP（最大 8MB）。写真は解析後サーバーから削除されます。',
    errImageTooLarge: '画像サイズが大きすぎます（最大 8MB）',
    errUnsupportedType: 'JPG / PNG / WebP のみ対応しています',
    errCheckImage: '画像を確認してください。',
    errNetwork: (m: string) => `通信エラー: ${m}`,
    errAnalyze: (m: string) => `診断エラー: ${m}`,
    modalTitleFree: 'クレジット不足',
    modalTitleIp: 'クレジット不足',
    modalTitleLogin: `Google ログインで ${WELCOME_CREDITS} 回無料`,
    modalDescFree: 'クレジットを使い切りました。続けてご利用いただく場合は 10 回パックをご購入ください。クレジットは全ツール共通でご利用いただけます。',
    modalDescIp: 'クレジットを使い切りました。続けてご利用いただく場合は 10 回パックをご購入ください。',
    modalDescLogin: `初回 Google ログインで ${WELCOME_CREDITS} クレジット無料プレゼント。即時利用可能・別ツールでも共通でお使いいただけます。クレジットを使い切ったあとに有料パックをご検討ください。`,
    signInFreeButton: `🔐 Google でサインイン（無料 ${WELCOME_CREDITS} 回）`,
    signInFreeBenefit: 'メールアドレスは結果保存・別端末同期に使用されます。スパムは送りません。',
    pricePackTitle: '10 回パック',
    priceFeatures: ['即時利用、有効期限なし', '似合う髪色診断ツールと共通', 'Stripe 決済（VISA/Master/AMEX/JCB）', 'Google サインイン または メールリンクで管理'],
    purchasing: '処理中…',
    purchaseButton: (price: string) => `💳 10 回パックを購入（${price}）`,
    stripeComingTitle: 'Stripe 決済は近日公開',
    stripeNote: '※ 決済機能は Stripe 接入中。しばらくお待ちください。',
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
    elapsedFmt: (sec: number) => `${sec}秒経過 / 約 15-25秒`,
    uploadingShort: '送信中',
    analyzeSteps: [
      { icon: '📸', text: '写真を解析しています…', detail: '画像の品質と顔の位置を確認' },
      { icon: '🎨', text: '肌のアンダートーンを判定中…', detail: '黄み／青み／中性の傾向を抽出' },
      { icon: '👁️', text: '瞳と髪のトーンを分析中…', detail: 'コントラストの強さを推定' },
      { icon: '✨', text: '似合う 12 色を選定中…', detail: '4 シーズン体系に基づいてマッチング' },
      { icon: '🪄', text: 'もうすぐ完了します…', detail: '結果を整形しています' },
    ],
    resultBadge: '✨ あなたの診断結果',
    resultLabel: 'あなたのパーソナルカラー',
    yourColors: 'あなたに似合う色',
    byRole: '役割別',
    confidenceLabel: '信頼度',
    lowConfidenceWarn: '⚠️ 信頼度が低めです。自然光・正面・素顔の写真で再診断すると精度が上がります。',
    avoidColors: '避けたい色',
    uploadedAlt: 'アップロード写真',
    enResultNote: '',
    ctaExhaustedTrigger: '→ 続けて使う（10回 ¥300）',
    upsellBannerHeading: 'もう一人診断する？',
    upsellBannerBody: 'クレジット切れの場合は ',
    upsellBannerLink: '10 回 ¥300 パック',
    upsellBannerSuffix: 'で続行できます',
  },
  en: {
    season: { spring: 'Spring (Warm)', summer: 'Summer (Cool)', autumn: 'Autumn (Warm)', winter: 'Winter (Cool)' },
    undertone: { warm: 'Warm', cool: 'Cool', neutral: 'Neutral' },
    contrast: { high: 'High (sharp)', medium: 'Medium', low: 'Low (soft)' },
    role: {
      clothing: { icon: '👗', title: 'Clothing' },
      lipstick: { icon: '💄', title: 'Lipstick / blush' },
      hair: { icon: '💇', title: 'Hair color' },
      accessory: { icon: '💍', title: 'Accessory metals' },
    },
    statusChecking: 'Checking usage…',
    statusLoginRequired: `Sign in to get ${WELCOME_CREDITS} free credits`,
    statusFree: (n: number) => `${n} credits left`,
    statusExhausted: 'Out of credits',
    statusPaidPrefix: 'Credits: ',
    statusPaidSuffix: ' left',
    statusPaidNoteFreeUsed: '',
    pickButton: '📁 Pick a photo to analyze',
    pickCaption: 'JPG / PNG / WebP (max 8MB). Photos are deleted from our server after analysis.',
    errImageTooLarge: 'Image is too large (max 8MB)',
    errUnsupportedType: 'Only JPG / PNG / WebP are supported',
    errCheckImage: 'Please check your image.',
    errNetwork: (m: string) => `Network error: ${m}`,
    errAnalyze: (m: string) => `Analysis error: ${m}`,
    modalTitleFree: 'Out of credits',
    modalTitleIp: 'Out of credits',
    modalTitleLogin: `Sign in for ${WELCOME_CREDITS} free analyses`,
    modalDescFree: 'You have used all your credits. Grab a 10-analysis pack to keep going — credits are shared across all tools.',
    modalDescIp: 'You have used all your credits. Grab a 10-analysis pack to keep going.',
    modalDescLogin: `Sign in with Google to get ${WELCOME_CREDITS} free credits — instantly usable across all our AI tools. Buy a 10-pack only when you run out.`,
    signInFreeButton: `🔐 Sign in with Google (${WELCOME_CREDITS} free)`,
    signInFreeBenefit: 'Email is used to save results and sync across devices. No spam.',
    pricePackTitle: '10-analysis pack',
    priceFeatures: ['Instant access, never expires', 'Shared with the hair color diagnosis tool', 'Stripe checkout (VISA / Master / AMEX / JCB)', 'Sign in with Google or email link to manage'],
    purchasing: 'Processing…',
    purchaseButton: (price: string) => `💳 Buy 10-pack (${price})`,
    stripeComingTitle: 'Stripe checkout coming soon',
    stripeNote: '※ Stripe integration in progress. Please check back soon.',
    signInRequired: 'Sign in required to purchase',
    signInRequiredDesc: 'Credits are tied to your account (email). Sign in first, then you will land on the checkout page.',
    signInButton: '🔐 Sign in to continue',
    signInBenefit: 'Sign in with the same email on another device to sync credits',
    closeButton: 'Close',
    purchaseCancelled: 'Purchase was cancelled',
    purchaseSuccess: '🎉 10 credits added!',
    recoveredSuccess: (balance: string | null) => `🎉 Credits restored${balance ? ` (${balance} left)` : ''}`,
    recoverExpired: 'Recovery link expired. Please request a new one from the form.',
    recoverInvalid: 'Recovery link invalid. Please check your email again.',
    purchaseError: (err: string) => `Purchase error: ${err}`,
    stripeError: (err: string) => `Stripe error: ${err}`,
    uploadingHeading: '📤 Uploading…',
    uploadingDetail: 'Sending the image to our server',
    elapsedFmt: (sec: number) => `${sec}s elapsed / ~15-25s total`,
    uploadingShort: 'Uploading',
    analyzeSteps: [
      { icon: '📸', text: 'Reading your photo…', detail: 'Checking image quality and face position' },
      { icon: '🎨', text: 'Detecting skin undertone…', detail: 'Warm / cool / neutral lean' },
      { icon: '👁️', text: 'Reading eye and hair tones…', detail: 'Estimating overall contrast' },
      { icon: '✨', text: 'Selecting your 12 best colors…', detail: 'Matching against the 4-season system' },
      { icon: '🪄', text: 'Almost done…', detail: 'Formatting your result' },
    ],
    resultBadge: '✨ Your result',
    resultLabel: 'Your personal color',
    yourColors: 'Colors that suit you',
    byRole: 'Grouped by role',
    confidenceLabel: 'Confidence',
    lowConfidenceWarn: '⚠️ Low confidence. Try a fresh photo: natural light, facing the camera, no filters or heavy makeup.',
    avoidColors: 'Colors to avoid',
    uploadedAlt: 'Your uploaded photo',
    enResultNote:
      '🌐 Note: AI-generated descriptions and color names are currently in Japanese. Full English output rolls out in the next update — the seasonal label, palette HEX codes, and badges are universal.',
    ctaExhaustedTrigger: '→ Continue (10-pack ¥300)',
    upsellBannerHeading: 'Diagnose another person?',
    upsellBannerBody: 'If credits run out, the ',
    upsellBannerLink: '10-analysis ¥300 pack',
    upsellBannerSuffix: ' lets you keep going.',
  },
} as const

export interface PersonalColorQuotaGateProps {
  locale?: Locale
}

export function PersonalColorQuotaGate({ locale = 'ja' }: PersonalColorQuotaGateProps = {}) {
  const t = STRINGS[locale]
  const ANALYZE_STEPS = t.analyzeSteps
  const { status: authStatus } = useSession()
  const isSignedIn = authStatus === 'authenticated'
  const [state, setState] = useState<QuotaState | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [pending, setPending] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'uploading' | 'analyzing'>('idle')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [purchaseBanner, setPurchaseBanner] = useState<string | null>(null)
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Result is rendered via portal into a sibling node OUTSIDE the upload
  // card's max-w-3xl wrapper, so the result card can use full max-w-5xl
  // width like the mock preview below it.
  useEffect(() => {
    setPortalTarget(document.getElementById('personal-color-result-portal'))
  }, [])

  // Tick elapsed seconds + cycle the step message during analyze
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
      setStepIndex(Math.min(Math.floor(sec / 4), ANALYZE_STEPS.length - 1))
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
        // No client-side claim step needed.
        setPurchaseBanner(t.purchaseSuccess)
        cleanUrl()
        refresh()
      } else if (purchase === 'cancelled') {
        setPurchaseBanner(t.purchaseCancelled)
        cleanUrl()
      }
    }
  }, [])

  // Refresh credit balance whenever auth session flips signed-in/out
  useEffect(() => {
    refresh()
  }, [authStatus])

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

  async function handlePickFile() {
    if (!state) return
    if (!state.canUse) {
      // Phase 0 (5/11 df57544): canUse=false has two distinct causes —
      // unauthenticated (login_required) vs. signed-in with 0 credits
      // (exhausted_pick). Keep the trigger labels separate so GA4 can slice
      // "acquire new users" vs. "re-monetize existing users" funnels.
      const trigger: PaywallTrigger =
        state.blockReason === 'login_required' ? 'login_required' : 'exhausted_pick'
      openPaywall(setShowModal, trigger)
      return
    }
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    e.target.value = '' // allow re-picking same file
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
          openPaywall(setShowModal, 'exhausted_analyze')
        } else if (r.status === 413 || r.status === 415 || r.status === 422) {
          // Validation error — quota was NOT consumed, user can retry with another image
          setError(data.message ?? t.errCheckImage)
          setPreviewUrl(null)
        } else {
          setError(t.errAnalyze(data.message ?? data.error ?? 'unknown'))
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
      setError(t.errNetwork(e?.message ?? ''))
    } finally {
      setPending(false)
      setPhase('idle')
    }
  }

  // Sign-in-only path for the login_required modal variant: users who have
  // never used the tool should be steered to "claim 3 free credits" rather
  // than the Stripe checkout flow. Fires purchase_click so the funnel still
  // captures the intent, but the callback URL goes back to the tool page so
  // the user lands with welcomeBonus credits ready to consume.
  async function handleSignInFree() {
    trackPurchaseClick(TOOL, false)
    const callbackUrl =
      typeof window !== 'undefined'
        ? window.location.pathname
        : '/tools/personal-color-analysis'
    signIn(undefined, { callbackUrl })
  }

  async function handlePurchase() {
    trackPurchaseClick(TOOL, isSignedIn)
    if (!isSignedIn) {
      const callbackUrl =
        typeof window !== 'undefined'
          ? window.location.pathname
          : '/tools/personal-color-analysis'
      signIn(undefined, { callbackUrl })
      return
    }
    setPending(true)
    try {
      const r = await fetch(`/api/checkout/personal-color?locale=${locale}`, { method: 'POST' })
      if (r.status === 401) {
        const callbackUrl =
          typeof window !== 'undefined'
            ? window.location.pathname
            : '/tools/personal-color-analysis'
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
      if (url) {
        trackCheckoutStarted(TOOL)
        window.location.href = url
      }
    } catch (e: any) {
      setPurchaseBanner(t.errNetwork(e?.message ?? ''))
      setPending(false)
    }
  }

  // Phase 0: remaining = current credit balance (welcome bonus + purchased).
  // remainingFree is always 0 from the API now; we just read paidCredits.
  const paidCredits = state?.paidCredits ?? 0
  const remaining = paidCredits
  const exhausted = state?.canUse === false
  const loginRequired = state?.blockReason === 'login_required'
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

      {/* Status chip — Phase 0: 3 distinct states (login / exhausted / has credits) */}
      <div className="flex justify-center mb-4">
        {!state ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-gray-50 text-gray-500 border-gray-200">
            <span className="text-base">⏳</span>
            <span>{t.statusChecking}</span>
          </div>
        ) : loginRequired ? (
          <a
            href="/auth/signin"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 transition-colors"
            aria-live="polite"
          >
            <span className="text-base">🔐</span>
            <span className="font-semibold">{t.statusLoginRequired}</span>
          </a>
        ) : exhausted && paidCredits === 0 ? (
          <button
            type="button"
            onClick={() => openPaywall(setShowModal, 'badge')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 transition-colors"
            aria-live="polite"
          >
            <span className="text-base">🔒</span>
            <span>{t.statusExhausted}</span>
            <span className="ml-1 underline font-semibold">{t.ctaExhaustedTrigger}</span>
          </button>
        ) : (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
              remaining <= 1
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}
            aria-live="polite"
          >
            <span className="text-base">💎</span>
            <span>
              {t.statusPaidPrefix}
              <strong className="font-bold">{paidCredits}</strong>
              {t.statusPaidSuffix}
            </span>
          </div>
        )}
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Result — portaled into #personal-color-result-portal so it can
          escape the upload card's narrower max-w-3xl wrapper */}
      {result &&
        (portalTarget
          ? createPortal(
              <PersonalColorResult
                result={result}
                previewUrl={previewUrl}
                showUpsell={paidCredits === 0 && remaining <= 1}
                onUpgrade={() => openPaywall(setShowModal, 'upsell_banner')}
                t={t}
              />,
              portalTarget,
            )
          : null)}

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
              <div className="text-5xl mb-3">{loginRequired ? '🎁' : '🎨'}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {loginRequired
                  ? t.modalTitleLogin
                  : state.blockReason === 'ip_exhausted'
                    ? t.modalTitleIp
                    : t.modalTitleFree}
              </h3>
              <p className="text-sm text-gray-600">
                {loginRequired
                  ? t.modalDescLogin
                  : state.blockReason === 'ip_exhausted'
                    ? t.modalDescIp
                    : t.modalDescFree}
              </p>
            </div>

            {/* Price pack box — only shown for credit-exhausted users.
                login_required users haven't tried the tool yet, so showing
                a ¥300 price tag would derail their first impression. */}
            {!loginRequired && (
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-5 border border-sky-100 mb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{t.pricePackTitle}</span>
                  <span className="text-xl font-bold text-sky-700">{locale === 'en' ? PRICE_LABEL_EN : PRICE_LABEL}</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {t.priceFeatures.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {loginRequired ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleSignInFree}
                  disabled={pending}
                  className="w-full px-5 py-3 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {t.signInFreeButton}
                </button>
                <p className="text-[11px] text-gray-500 text-center">
                  {t.signInFreeBenefit}
                </p>
              </div>
            ) : !stripeReady ? (
              <>
                <button
                  type="button"
                  disabled
                  title={t.stripeComingTitle}
                  className="w-full px-5 py-3 bg-sky-600 text-white text-sm font-semibold rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {t.purchaseButton(locale === 'en' ? PRICE_LABEL_EN : PRICE_LABEL)}
                </button>
                <p className="mt-2 text-[11px] text-gray-400 text-center">{t.stripeNote}</p>
              </>
            ) : isSignedIn ? (
              <button
                type="button"
                onClick={handlePurchase}
                disabled={pending}
                className="w-full px-5 py-3 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? t.purchasing : t.purchaseButton(locale === 'en' ? PRICE_LABEL_EN : PRICE_LABEL)}
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
                  className="w-full px-5 py-3 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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

type Strings = (typeof STRINGS)[Locale]

function PersonalColorResult({
  result,
  previewUrl,
  showUpsell,
  onUpgrade,
  t,
}: {
  result: AnalysisResult
  previewUrl: string | null
  showUpsell: boolean
  onUpgrade: () => void
  t: Strings
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
          {t.resultBadge}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6 sm:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={t.uploadedAlt}
                className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow shrink-0"
              />
            ) : (
              <div className="text-7xl shrink-0">{SEASON_EMOJI[result.season4]}</div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
                {t.resultLabel}
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                {SEASON_EMOJI[result.season4]} {t.season[result.season4]}
              </h3>
              <p className="text-sm text-gray-700 font-medium mb-3">
                {result.season12}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                  Undertone:{' '}
                  <span className="text-blue-600">{t.undertone[result.undertone]}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                  Contrast:{' '}
                  <span className="text-gray-700">{t.contrast[result.contrast]}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                  {t.confidenceLabel}:{' '}
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
          {t.enResultNote && (
            <p className="mt-2 text-[11px] text-sky-700 bg-sky-50 rounded-lg p-2 border border-sky-100 leading-relaxed">
              {t.enResultNote}
            </p>
          )}
          {result.confidence < 0.6 && (
            <p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg p-2 border border-amber-100">
              {t.lowConfidenceWarn}
            </p>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">{t.yourColors}</h3>
            <span className="text-xs text-gray-500">{t.byRole}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(['clothing', 'lipstick', 'hair', 'accessory'] as const).map((role) =>
              groups[role].length === 0 ? null : (
                <div key={role}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{t.role[role].icon}</span>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {t.role[role].title}
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
              <h3 className="text-base font-bold text-gray-900 mb-3">{t.avoidColors}</h3>
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

          {showUpsell && (
            <button
              type="button"
              onClick={onUpgrade}
              className="mt-8 w-full text-left px-4 py-3 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg hover:from-sky-100 hover:to-blue-100 transition-colors"
            >
              <div className="text-sm font-semibold text-gray-900 mb-1">
                💡 {t.upsellBannerHeading}
              </div>
              <div className="text-xs text-gray-700">
                {t.upsellBannerBody}
                <strong className="text-sky-700 underline">{t.upsellBannerLink}</strong>
                {t.upsellBannerSuffix}
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
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
  // Estimate progress as a function of elapsed time, capped at 95%
  // (the last 5% is reserved for "result is being rendered")
  const ESTIMATED_TOTAL = 22
  const progressPct =
    phase === 'uploading' ? 8 : Math.min(95, 10 + (elapsedSec / ESTIMATED_TOTAL) * 85)

  return (
    <div className="mt-2 mx-auto max-w-sm">
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-white via-sky-50 to-blue-50 p-6 shadow-sm">
        <div className="flex flex-col items-center">
          {previewUrl && (
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-sky-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="" className="w-full h-full object-cover" />
              {/* Animated gradient sweep */}
              <div className="absolute inset-0 pointer-events-none pc-scan-overlay" />
              {/* Translucent dim with cycling glow */}
              <div className="absolute inset-0 ring-2 ring-sky-400/0 pc-pulse-ring rounded-xl" />
            </div>
          )}

          <div className="mt-5 text-3xl pc-bounce" aria-hidden="true">
            {step.icon}
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-900 text-center">
            {phase === 'uploading' ? t.uploadingHeading : step.text}
          </p>
          <p className="mt-1 text-xs text-gray-500 text-center">
            {phase === 'uploading' ? t.uploadingDetail : step.detail}
          </p>

          {/* Progress bar */}
          <div className="mt-4 w-full">
            <div className="h-1.5 w-full bg-sky-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-500">
              <span>{Math.round(progressPct)}%</span>
              <span>{phase === 'analyzing' ? t.elapsedFmt(elapsedSec) : t.uploadingShort}</span>
            </div>
          </div>

          {/* Animated bouncing dots */}
          <div className="mt-4 flex gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-sky-500 pc-dot pc-dot-1" />
            <span className="w-2 h-2 rounded-full bg-sky-500 pc-dot pc-dot-2" />
            <span className="w-2 h-2 rounded-full bg-sky-500 pc-dot pc-dot-3" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pc-scan {
          0%   { transform: translateY(-100%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .pc-scan-overlay {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(56, 189, 248, 0.0) 35%,
            rgba(56, 189, 248, 0.55) 50%,
            rgba(56, 189, 248, 0.0) 65%,
            transparent 100%
          );
          animation: pc-scan 2.2s ease-in-out infinite;
        }
        @keyframes pc-pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.0) inset; }
          50%      { box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.35) inset; }
        }
        .pc-pulse-ring {
          animation: pc-pulse-ring 2.2s ease-in-out infinite;
        }
        @keyframes pc-bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .pc-bounce {
          animation: pc-bounce 1.4s ease-in-out infinite;
        }
        @keyframes pc-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40%           { transform: translateY(-6px); opacity: 1; }
        }
        .pc-dot {
          animation: pc-dot-bounce 1.2s ease-in-out infinite;
        }
        .pc-dot-1 { animation-delay: 0s; }
        .pc-dot-2 { animation-delay: 0.2s; }
        .pc-dot-3 { animation-delay: 0.4s; }
      `}</style>
    </div>
  )
}
