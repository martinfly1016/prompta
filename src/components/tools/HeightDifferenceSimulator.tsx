'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Loader2, RefreshCw, Ruler, Upload } from 'lucide-react'
import { CreditPurchaseModal } from '@/components/credits/CreditPurchaseModal'
import { POINTS_PER_RUN, WELCOME_COPY_JA } from '@/lib/credit-costs'
import { redirectToSignIn } from '@/lib/start-checkout'
import { flushConfirmedGaEvents, trackInsufficientPoints, trackLoginClick, trackToolEvent } from '@/lib/track'
import {
  BODY_OPTIONS,
  FRAMING_OPTIONS,
  HEIGHT_MAX,
  HEIGHT_MIN,
  MAX_PHOTO_BYTES,
  POSE_OPTIONS,
  RELATION_OPTIONS,
  SCENE_OPTIONS,
  STYLE_OPTIONS,
  buildGenerationPrompt,
  clampHeight,
  defaultSettings,
  layoutStage,
  STAGE,
  summarizeJa,
  type BodyType,
  type CharacterSettings,
  type FigureLayout,
  type SimulatorSettings,
  type StageLayout,
} from '@/lib/height-difference/simulator'

type LocalPhoto = { file: File; url: string }
type ResultImage = { imageBase64: string; mimeType: string; promptUsed: string }

const FIGURE_FILL = { A: '#0284c7', B: '#e11d48' } as const

export function HeightDifferenceSimulator() {
  const { status } = useSession()
  const isSignedIn = status === 'authenticated'
  const [settings, setSettings] = useState<SimulatorSettings>(defaultSettings)
  const [locked, setLocked] = useState<SimulatorSettings | null>(null)
  const [photoA, setPhotoA] = useState<LocalPhoto | null>(null)
  const [photoB, setPhotoB] = useState<LocalPhoto | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ResultImage | null>(null)
  const [showPurchase, setShowPurchase] = useState(false)
  const photosRef = useRef({ photoA, photoB })
  photosRef.current = { photoA, photoB }

  const active = locked ?? settings
  const layout = useMemo(() => layoutStage(active), [active])
  const promptPreview = useMemo(
    () => buildGenerationPrompt(active, { hasPhotoA: !!photoA, hasPhotoB: !!photoB }),
    [active, photoA, photoB],
  )

  useEffect(() => {
    trackToolEvent('height_difference_simulator_view', { tool: 'height-difference-simulator' })
  }, [])

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/tools/balance', { cache: 'no-store' })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json?.balance === 'number') setBalance(json.balance)
        flushConfirmedGaEvents(json?.ga)
      })
      .catch(() => {})
  }, [isSignedIn])

  useEffect(() => {
    return () => {
      const current = photosRef.current
      if (current.photoA) URL.revokeObjectURL(current.photoA.url)
      if (current.photoB) URL.revokeObjectURL(current.photoB.url)
    }
  }, [])

  function updateCharacter(id: 'A' | 'B', patch: Partial<CharacterSettings>) {
    if (locked) return
    setSettings((current) => {
      const key = id === 'A' ? 'characterA' : 'characterB'
      return { ...current, [key]: { ...current[key], ...patch } }
    })
  }

  function swapCharacters() {
    if (locked) return
    setSettings((current) => ({
      ...current,
      characterA: current.characterB,
      characterB: current.characterA,
    }))
    setPhotoA(photoB)
    setPhotoB(photoA)
  }

  function confirmComposition() {
    const snapshot = structuredClone(settings)
    snapshot.characterA.heightCm = clampHeight(snapshot.characterA.heightCm)
    snapshot.characterB.heightCm = clampHeight(snapshot.characterB.heightCm)
    snapshot.characterA.label = snapshot.characterA.label.trim() || '人物A'
    snapshot.characterB.label = snapshot.characterB.label.trim() || '人物B'
    setSettings(snapshot)
    setLocked(structuredClone(snapshot))
    setResult(null)
    setError(null)
    trackToolEvent('height_difference_simulator_confirm', {
      tool: 'height-difference-simulator',
      height_gap: Math.abs(snapshot.characterA.heightCm - snapshot.characterB.heightCm),
      pose: snapshot.pose,
      framing: snapshot.framing,
    })
  }

  async function onPick(id: 'A' | 'B', file: File | undefined) {
    setError(null)
    if (!file) return
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      setError('JPG / PNG / WebP のみ対応しています。')
      return
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError('画像が大きすぎます（最大 8MB）。')
      return
    }
    const next = { file, url: URL.createObjectURL(file) }
    if (id === 'A') {
      if (photoA) URL.revokeObjectURL(photoA.url)
      setPhotoA(next)
    } else {
      if (photoB) URL.revokeObjectURL(photoB.url)
      setPhotoB(next)
    }
  }

  async function generate() {
    if (!locked) return
    if (!photoA && !photoB) {
      setError('人物Aか人物Bの写真を少なくとも1枚選んでください。無い方は見た目メモから生成します。')
      return
    }
    if (!isSignedIn) {
      trackLoginClick('height-difference-simulator')
      redirectToSignIn('/tools/height-difference-maker/simulate')
      return
    }
    if (balance !== null && balance < POINTS_PER_RUN) {
      trackInsufficientPoints('height-difference', POINTS_PER_RUN, balance)
      setShowPurchase(true)
      setError('ポイントが足りません。ポイントパックをご購入ください。')
      return
    }

    setRunning(true)
    setError(null)
    trackToolEvent('height_difference_simulator_generate', {
      tool: 'height-difference-simulator',
      pose: locked.pose,
      has_photo_a: !!photoA,
      has_photo_b: !!photoB,
    })
    try {
      const form = new FormData()
      form.set('settings', JSON.stringify(locked))
      if (photoA) form.set('imageA', await fileToJpeg(photoA.file), 'character-a.jpg')
      if (photoB) form.set('imageB', await fileToJpeg(photoB.file), 'character-b.jpg')
      const response = await fetch('/api/tools/height-difference/generate', { method: 'POST', body: form })
      const data = await response.json().catch(() => ({}))
      flushConfirmedGaEvents(data?.ga)
      if (!response.ok) {
        if (data?.error === 'login_required') {
          redirectToSignIn('/tools/height-difference-maker/simulate')
          return
        }
        if (data?.error === 'credits_exhausted') {
          if (typeof data.paidCredits === 'number') setBalance(data.paidCredits)
          setShowPurchase(true)
          setError('ポイントが足りません。ポイントパックをご購入ください。')
          return
        }
        setError(generationErrorMessage(data))
        if (typeof data?.paidCredits === 'number') setBalance(data.paidCredits)
        return
      }
      setResult({
        imageBase64: data.imageBase64,
        mimeType: data.mimeType || 'image/png',
        promptUsed: data.promptUsed || '',
      })
      if (typeof data.balance === 'number') setBalance(data.balance)
    } catch (cause: unknown) {
      const message = cause instanceof Error ? cause.message : ''
      setError(message || '通信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setRunning(false)
    }
  }

  const resultUrl = result ? `data:${result.mimeType};base64,${result.imageBase64}` : null

  return (
    <div className="space-y-6">
      <ol className="grid grid-cols-3 gap-2 text-sm">
        <Step n={1} label="構図を調整" active={!locked} />
        <Step n={2} label="構図を確定" active={!!locked} />
        <Step n={3} label="写真で生成" active={!!locked} />
      </ol>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,440px)_minmax(0,1fr)] gap-6 items-start">
        <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-sky-600" aria-hidden="true" />
              構図プレビュー
            </h2>
            <p className="text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-100 rounded-full px-2.5 py-1" data-testid="height-sim-gap">
              差 {layout.gapCm}cm・{layout.ratio.toFixed(2)}倍
            </p>
          </div>
          <SimulatorStage layout={layout} />
          <p className="mt-2 text-xs text-gray-500 leading-relaxed">
            プレビューはシルエットです。足元は同じ床に揃え、頭の高さと肩幅が身長・体型に追従します。
          </p>
        </section>

        <fieldset disabled={locked !== null} className="min-w-0 bg-white border border-gray-200 rounded-lg p-4 sm:p-5 disabled:opacity-60">
          <legend className="px-1 text-base font-bold text-gray-900">人物とポーズ</legend>
          <div className="mt-3 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CharacterCard
                title="人物A"
                character={settings.characterA}
                onLabel={(label) => updateCharacter('A', { label })}
                onNote={(note) => updateCharacter('A', { note })}
                onHeight={(heightCm) => updateCharacter('A', { heightCm })}
                onBody={(bodyType) => updateCharacter('A', { bodyType })}
              />
              <CharacterCard
                title="人物B"
                character={settings.characterB}
                onLabel={(label) => updateCharacter('B', { label })}
                onNote={(note) => updateCharacter('B', { note })}
                onHeight={(heightCm) => updateCharacter('B', { heightCm })}
                onBody={(bodyType) => updateCharacter('B', { bodyType })}
              />
            </div>

            <button
              type="button"
              onClick={swapCharacters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-sky-300 hover:text-sky-700 disabled:hover:border-gray-200"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              AとBを入れ替え
            </button>

            <OptionRow
              label="ポーズ"
              value={settings.pose}
              options={POSE_OPTIONS}
              onChange={(pose) => setSettings((current) => ({ ...current, pose }))}
            />
            <OptionRow
              label="フレーム"
              value={settings.framing}
              options={FRAMING_OPTIONS}
              onChange={(framing) => setSettings((current) => ({ ...current, framing }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <SelectField
                label="関係性"
                value={settings.relationship}
                options={RELATION_OPTIONS}
                onChange={(relationship) => setSettings((current) => ({ ...current, relationship }))}
              />
              <SelectField
                label="画風"
                value={settings.style}
                options={STYLE_OPTIONS}
                onChange={(style) => setSettings((current) => ({ ...current, style }))}
              />
              <SelectField
                label="背景"
                value={settings.scene}
                options={SCENE_OPTIONS}
                onChange={(scene) => setSettings((current) => ({ ...current, scene }))}
              />
            </div>
          </div>
        </fieldset>
      </div>

      {!locked ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="button"
            data-testid="height-sim-confirm"
            onClick={confirmComposition}
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700"
          >
            この構図で確定
          </button>
          <p className="text-sm text-gray-600">確定すると身長・体型・ポーズ・フレームがロックされ、写真を添付できます。</p>
        </div>
      ) : (
        <section data-testid="height-sim-photo-step" className="bg-white border border-sky-200 rounded-lg p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-gray-900">確定した構図で写真生成</h2>
              <p className="mt-1 text-sm text-gray-700" data-testid="height-sim-summary">{summarizeJa(locked)}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLocked(null)
                setResult(null)
                setError(null)
              }}
              className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-sky-300"
            >
              調整に戻る
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PhotoSlot
              title="人物Aの写真"
              hint="無い場合は見た目メモから生成します"
              testId="height-sim-file-a"
              photo={photoA}
              onPick={(file) => onPick('A', file)}
              onClear={() => {
                if (photoA) URL.revokeObjectURL(photoA.url)
                setPhotoA(null)
              }}
            />
            <PhotoSlot
              title="人物Bの写真"
              hint="無い場合は見た目メモから生成します"
              testId="height-sim-file-b"
              photo={photoB}
              onPick={(file) => onPick('B', file)}
              onClear={() => {
                if (photoB) URL.revokeObjectURL(photoB.url)
                setPhotoB(null)
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              data-testid="height-sim-generate"
              onClick={generate}
              disabled={running || (!photoA && !photoB)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {running && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {running
                ? '生成中…'
                : isSignedIn
                  ? `写真から生成（${POINTS_PER_RUN}ポイント）`
                  : 'サインインして生成'}
            </button>
            <p className="text-sm text-gray-600">
              {isSignedIn
                ? balance === null
                  ? 'ポイントを確認しています。'
                  : <span data-testid="height-sim-balance">残り {balance} ポイント</span>
                : WELCOME_COPY_JA}
            </p>
          </div>
          {running && <p className="text-sm text-gray-500">20〜40秒ほどかかることがあります。このページを開いたまま待ってください。</p>}
          {error && <p className="text-sm font-medium text-rose-700" role="alert">{error}</p>}

          {resultUrl && (
            <div className="space-y-3">
              <img src={resultUrl} alt="身長差を反映した生成結果" className="max-h-[640px] w-auto rounded-lg border border-gray-200" />
              <a
                href={resultUrl}
                download="prompta-height-difference.png"
                className="inline-flex rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-sky-300"
              >
                画像を保存
              </a>
            </div>
          )}

          <details className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-gray-800">生成に渡す指示（英語）</summary>
            <pre className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-gray-700">{result?.promptUsed || promptPreview}</pre>
          </details>
        </section>
      )}

      <p className="text-sm text-gray-600">
        プロンプトだけ欲しい場合は <Link href="/tools/height-difference-maker" className="text-sky-700 font-medium hover:underline">身長差メーカー</Link> に戻れます。無料のプロンプト集はそのままです。
      </p>

      <CreditPurchaseModal
        open={showPurchase}
        onClose={() => setShowPurchase(false)}
        returnTo="/tools/height-difference-maker/simulate"
        currentBalance={balance}
        tool="height-difference"
      />
    </div>
  )
}

function Step({ n, label, active }: { n: number; label: string; active: boolean }) {
  return (
    <li className={`rounded-lg border px-3 py-2 ${active ? 'border-sky-400 bg-sky-50 text-sky-900' : 'border-gray-200 bg-white text-gray-500'}`}>
      <span className="block text-[11px] font-semibold">ステップ {n}</span>
      <span className="block font-bold">{label}</span>
    </li>
  )
}

function SimulatorStage({ layout }: { layout: StageLayout }) {
  const maskId = useId().replace(/:/g, '')
  const { a, b, frame } = layout
  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className="w-full h-auto rounded-lg bg-slate-100"
      role="img"
      data-testid="height-sim-stage"
      data-gap-cm={layout.gapCm}
      aria-label={`人物A ${a.heightCm}cm、人物B ${b.heightCm}cm、差 ${layout.gapCm}cm`}
    >
      <defs>
        <linearGradient id={`${maskId}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <mask id={maskId}>
          <rect width={layout.width} height={layout.height} fill="white" />
          <rect x={frame.x} y={frame.y} width={frame.w} height={frame.h} fill="black" />
        </mask>
      </defs>
      <rect width={layout.width} height={layout.height} fill={`url(#${maskId}-bg)`} />
      {rulerTicks(layout.floorY).map((tick) => (
        <g key={tick.cm}>
          <line x1={28} y1={tick.y} x2={layout.width - 16} y2={tick.y} stroke="#cbd5e1" strokeDasharray="2 6" />
          <text x={8} y={tick.y + 4} fill="#64748b" fontSize="11">{tick.cm}</text>
        </g>
      ))}
      <line x1={24} y1={layout.floorY} x2={layout.width - 16} y2={layout.floorY} stroke="#334155" strokeWidth="3" />
      <text x={32} y={layout.floorY + 16} fill="#475569" fontSize="11">床</text>
      {layout.wall && <rect x={layout.wall.x} y={layout.wall.y} width={layout.wall.w} height={layout.wall.h} rx="2" fill="#94a3b8" />}
      <Figure fig={a} fill={FIGURE_FILL.A} />
      <Figure fig={b} fill={FIGURE_FILL.B} />
      <rect
        width={layout.width}
        height={layout.height}
        fill="rgba(15,23,42,0.45)"
        mask={`url(#${maskId})`}
      />
      <rect
        x={frame.x}
        y={frame.y}
        width={frame.w}
        height={frame.h}
        fill="none"
        stroke="#0284c7"
        strokeWidth="2"
        data-testid="height-sim-frame"
        data-frame-h={Math.round(frame.h)}
      />
      <HeightLabel fig={a} fill={FIGURE_FILL.A} />
      <HeightLabel fig={b} fill={FIGURE_FILL.B} />
      {layout.gapCm > 0 && (
        <g>
          <line
            x1={layout.width - 30}
            y1={Math.min(a.topY, b.topY)}
            x2={layout.width - 30}
            y2={Math.max(a.topY, b.topY)}
            stroke="#0369a1"
            strokeWidth="2"
          />
          <text x={layout.width - 36} y={(a.topY + b.topY) / 2} textAnchor="end" fill="#0369a1" fontSize="12" fontWeight="700">
            {layout.gapCm}cm
          </text>
        </g>
      )}
    </svg>
  )
}

function rulerTicks(floorY: number) {
  const ticks = []
  for (let cm = 120; cm <= 210; cm += 30) {
    ticks.push({ cm, y: floorY - cm * STAGE.pxPerCm })
  }
  return ticks
}

function Figure({ fig, fill }: { fig: FigureLayout; fill: string }) {
  const hx = fig.cx + fig.headShiftX
  const armWidth = Math.max(7, fig.shoulderHalf * 0.34)
  return (
    <g data-testid={`height-sim-figure-${fig.id.toLowerCase()}`} data-top={Math.round(fig.topY)} data-cx={Math.round(fig.cx)} data-shoulder={Math.round(fig.shoulderHalf)}>
      <ellipse cx={fig.cx} cy={fig.footY + 2} rx={fig.hipHalf + 10} ry="5" fill="rgba(15,23,42,0.12)" />
      <line x1={fig.armL.x1} y1={fig.armL.y1} x2={fig.armL.x2} y2={fig.armL.y2} stroke={fill} strokeWidth={armWidth} strokeLinecap="round" />
      <line x1={fig.armR.x1} y1={fig.armR.y1} x2={fig.armR.x2} y2={fig.armR.y2} stroke={fill} strokeWidth={armWidth} strokeLinecap="round" />
      <path
        d={`M ${fig.cx - fig.hipHalf * 0.85} ${fig.hipY}
            L ${fig.cx - fig.hipHalf * 0.55} ${fig.kneeY}
            L ${fig.cx - fig.hipHalf * 0.35} ${fig.footY}
            L ${fig.cx - 3} ${fig.footY}
            L ${fig.cx - 2} ${fig.kneeY}
            L ${fig.cx - 1} ${fig.hipY} Z`}
        fill={fill}
      />
      <path
        d={`M ${fig.cx + fig.hipHalf * 0.85} ${fig.hipY}
            L ${fig.cx + fig.hipHalf * 0.55} ${fig.kneeY}
            L ${fig.cx + fig.hipHalf * 0.35} ${fig.footY}
            L ${fig.cx + 3} ${fig.footY}
            L ${fig.cx + 2} ${fig.kneeY}
            L ${fig.cx + 1} ${fig.hipY} Z`}
        fill={fill}
      />
      <path
        d={`M ${fig.cx - fig.shoulderHalf} ${fig.shoulderY}
            Q ${fig.cx} ${fig.shoulderY - 8} ${fig.cx + fig.shoulderHalf} ${fig.shoulderY}
            L ${fig.cx + fig.hipHalf} ${fig.hipY}
            Q ${fig.cx} ${fig.hipY + 8} ${fig.cx - fig.hipHalf} ${fig.hipY} Z`}
        fill={fill}
      />
      <rect x={hx - 4} y={fig.headCy + fig.headR - 2} width="8" height="10" rx="2" fill={fill} />
      <circle cx={hx} cy={fig.headCy} r={fig.headR} fill={fill} />
      <circle cx={hx + fig.eyeDx * 0.3} cy={fig.headCy + 1} r={fig.headR * 0.68} fill="#fff7ed" />
      <circle cx={hx + fig.eyeDx - 3} cy={fig.headCy + fig.eyeDy} r="1.4" fill="#0f172a" />
      <circle cx={hx + fig.eyeDx + 3} cy={fig.headCy + fig.eyeDy} r="1.4" fill="#0f172a" />
    </g>
  )
}

function HeightLabel({ fig, fill }: { fig: FigureLayout; fill: string }) {
  const text = `${fig.label.slice(0, 8)} ${fig.heightCm}cm`
  const width = Math.max(74, text.length * 7.2)
  const x = fig.cx - width / 2
  const y = fig.topY - 22
  return (
    <g>
      <rect x={x} y={y} width={width} height="18" rx="9" fill="white" stroke={fill} />
      <text x={fig.cx} y={y + 13} textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">{text}</text>
    </g>
  )
}

function CharacterCard({
  title,
  character,
  onLabel,
  onNote,
  onHeight,
  onBody,
}: {
  title: string
  character: CharacterSettings
  onLabel: (value: string) => void
  onNote: (value: string) => void
  onHeight: (value: number) => void
  onBody: (value: BodyType) => void
}) {
  const sliderLabel = `${title}の身長`
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <span className="text-sm font-bold text-sky-700 tabular-nums" data-testid={`height-sim-${title}-cm`}>{character.heightCm}cm</span>
      </div>
      <input
        value={character.label}
        maxLength={24}
        onChange={(event) => onLabel(event.target.value)}
        aria-label={`${title}の名前`}
        className="mb-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      />
      <textarea
        value={character.note}
        maxLength={160}
        rows={2}
        onChange={(event) => onNote(event.target.value)}
        aria-label={`${title}の見た目メモ`}
        className="mb-2 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      />
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={HEIGHT_MIN}
          max={HEIGHT_MAX}
          value={character.heightCm}
          aria-label={sliderLabel}
          onChange={(event) => onHeight(clampHeight(Number(event.target.value)))}
          className="w-full accent-sky-600"
        />
        <input
          type="number"
          min={HEIGHT_MIN}
          max={HEIGHT_MAX}
          value={character.heightCm}
          aria-label={`${title}の身長（数値）`}
          onChange={(event) => onHeight(clampHeight(Number(event.target.value)))}
          className="w-16 rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm tabular-nums"
        />
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1">
        {BODY_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={character.bodyType === option.id}
            onClick={() => onBody(option.id)}
            className={`rounded-md border px-1 py-1 text-[11px] font-semibold ${
              character.bodyType === option.id
                ? 'border-sky-500 bg-sky-50 text-sky-900'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function OptionRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly { id: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              value === option.id
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-sky-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly { id: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-gray-900 mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}

function PhotoSlot({
  title,
  hint,
  testId,
  photo,
  onPick,
  onClear,
}: {
  title: string
  hint: string
  testId: string
  photo: LocalPhoto | null
  onPick: (file: File | undefined) => void
  onClear: () => void
}) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
      <p className="text-sm font-bold text-gray-900">{title}</p>
      <p className="text-xs text-gray-500 mb-2">{hint}</p>
      {photo ? (
        <div className="space-y-2">
          <img src={photo.url} alt="" className="h-36 w-full object-cover rounded-md border border-gray-200" />
          <button type="button" onClick={onClear} className="text-sm font-medium text-rose-700">写真を外す</button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-6 text-sm text-gray-600 hover:border-sky-300">
          <Upload className="w-4 h-4" aria-hidden="true" />
          JPG / PNG / WebP
          <input
            data-testid={testId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              onPick(event.target.files?.[0])
              event.target.value = ''
            }}
          />
        </label>
      )}
    </div>
  )
}

async function fileToJpeg(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height))
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))
    if (Math.min(width, height) < 256) {
      throw new Error('画像が小さすぎます。256×256 以上の写真を選んでください。')
    }
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('画像を処理できませんでした。')
    ctx.drawImage(bitmap, 0, 0, width, height)
    let quality = 0.86
    let blob: Blob | null = null
    for (let attempt = 0; attempt < 3; attempt += 1) {
      blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
      if (blob && blob.size <= 3_500_000) break
      quality -= 0.15
    }
    if (!blob) throw new Error('画像を処理できませんでした。')
    return blob
  } finally {
    bitmap.close()
  }
}

function generationErrorMessage(data: { error?: string; message?: string; refunded?: boolean }): string {
  if (data?.message && data.error !== 'generation_failed') return data.message
  if (data?.error === 'no_image') return '写真を少なくとも1枚選んでください。'
  if (data?.error === 'image_too_large') return '画像が大きすぎます（最大 8MB）。'
  if (data?.error === 'unsupported_type') return 'JPG / PNG / WebP のみ対応しています。'
  if (data?.error === 'invalid_settings') return '構図設定を読み取れませんでした。確定し直してください。'
  if (data?.error === 'generation_failed') {
    return data.refunded
      ? '生成に失敗しました。ポイントは返却されています。'
      : '生成に失敗しました。'
  }
  return '生成に失敗しました。時間をおいて再度お試しください。'
}
