'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { listProvidersForMode, recommendForPrompt } from '@/lib/image-providers/registry'
import type { ExecuteMode, ImageProvider, ProviderId } from '@/lib/image-providers/types'

interface PromptShape {
  slug: string
  title: string
  content: string
  categorySlug?: string | null
  toolSlug?: string | null
}

interface Props {
  prompt: PromptShape
  /** Optional getter — called right before execute to pick up the latest
   *  content from the parent (e.g. PromptParamsPanel rendered output).
   *  If absent, uses prompt.content. */
  getCurrentContent?: () => string
}

type ExecuteResult =
  | { mode: 'text'; text: string; balance: number }
  | { mode: 'image'; imageUrl: string; balance: number }

const MAX_PHOTO_BYTES = 8 * 1024 * 1024

export function PromptExecutor({ prompt, getCurrentContent }: Props) {
  const { status: authStatus } = useSession()
  const isSignedIn = authStatus === 'authenticated'

  const { mode: recommendedMode, defaultProviderId } = recommendForPrompt({
    categorySlug: prompt.categorySlug,
    toolSlug: prompt.toolSlug,
  })
  const [mode] = useState<ExecuteMode>(recommendedMode)
  const providers = listProvidersForMode(mode)
  const [providerId, setProviderId] = useState<ProviderId>(defaultProviderId)
  const provider: ImageProvider | undefined = providers.find((p) => p.id === providerId)

  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ExecuteResult | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [sourceImage, setSourceImage] = useState<{ base64: string; mimeType: string; name: string; size: number } | null>(null)
  const [sourcePreviewUrl, setSourcePreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Revoke object URL when component unmounts or source changes to avoid memory leaks
  useEffect(() => {
    return () => {
      if (sourcePreviewUrl) URL.revokeObjectURL(sourcePreviewUrl)
    }
  }, [sourcePreviewUrl])

  // Read balance once on mount when signed in
  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/tools/balance', { cache: 'no-store' })
      .then((r) => r.json())
      .then((j) => {
        if (typeof j?.balance === 'number') setBalance(j.balance)
      })
      .catch(() => {})
  }, [isSignedIn])

  // Remember preferred provider in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('prompta-pref-provider')
      if (saved && providers.some((p) => p.id === saved)) {
        setProviderId(saved as ProviderId)
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function selectProvider(id: ProviderId) {
    setProviderId(id)
    try {
      localStorage.setItem('prompta-pref-provider', id)
    } catch {}
  }

  async function onPickPhoto(file: File) {
    if (file.size > MAX_PHOTO_BYTES) {
      setError('画像が大きすぎます（最大 8MB）')
      return
    }
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      setError('JPG / PNG / WebP のみ対応しています')
      return
    }
    setError(null)
    if (sourcePreviewUrl) URL.revokeObjectURL(sourcePreviewUrl)
    const buf = await file.arrayBuffer()
    const base64 = Buffer.from(buf).toString('base64')
    setSourceImage({ base64, mimeType: file.type, name: file.name, size: file.size })
    setSourcePreviewUrl(URL.createObjectURL(file))
  }

  function clearPhoto() {
    if (sourcePreviewUrl) URL.revokeObjectURL(sourcePreviewUrl)
    setSourceImage(null)
    setSourcePreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function execute() {
    setError(null)
    setResult(null)

    if (!isSignedIn) {
      // Let user pick provider (Google OAuth or email magic link) via the
      // custom sign-in page configured in NextAuth (`pages.signIn`).
      await signIn(undefined, { callbackUrl: typeof window !== 'undefined' ? window.location.href : undefined })
      return
    }

    if (mode === 'image-edit' && !sourceImage) {
      setError('編集元の写真をアップロードしてください')
      return
    }

    const content = getCurrentContent ? getCurrentContent() : prompt.content
    const positive = content.split('\n\n---\n\nNegative prompt:')[0].trim()
    const negPart = content.split('\n\n---\n\nNegative prompt:')[1]?.trim()

    setRunning(true)
    try {
      const res = await fetch('/api/prompt/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptSlug: prompt.slug,
          providerId,
          content: positive,
          negativePrompt: negPart,
          sourceImage: mode === 'image-edit' ? sourceImage : undefined,
        }),
      })
      const j = await res.json()
      if (!res.ok) {
        if (j.error === 'credits_exhausted') {
          setError('クレジットが足りません。150 クレジットパック ¥300 をご購入ください。')
        } else if (j.error === 'login_required') {
          await signIn(undefined, { callbackUrl: window.location.href })
        } else if (j.error === 'rate_limited') {
          setError('リクエストが多すぎます。少し時間を空けてから再試行してください。')
        } else if (j.error === 'provider_error') {
          setError(`生成エラー: ${j.message ?? '不明'}。クレジットは返却されました。`)
        } else {
          setError(`エラー: ${j.error ?? res.status}`)
        }
        return
      }
      setResult({
        mode: j.mode,
        text: j.text,
        imageUrl: j.imageUrl,
        balance: j.balance,
      } as ExecuteResult)
      setBalance(j.balance)
    } catch (e: any) {
      setError(`通信エラー: ${e.message ?? 'unknown'}`)
    } finally {
      setRunning(false)
    }
  }

  return (
    <section className="my-8 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🚀 ここで試す
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            このプロンプトをサイト内で実行できます。
            {balance !== null && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-sky-200 text-sky-800 font-medium">
                💎 残り {balance} クレジット
              </span>
            )}
          </p>
        </div>
        {provider && (
          <span className="text-sm font-medium text-gray-700">
            実行 1 回 = <strong>{provider.credits} クレジット</strong>
          </span>
        )}
      </div>

      {providers.length > 1 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            実行ツールを選択
          </p>
          <div className="flex flex-wrap gap-2">
            {providers.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => selectProvider(p.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  p.id === providerId
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
                <span className="text-xs opacity-75">({p.credits} クレジット)</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === 'image-edit' && (
        <div className="mb-4 rounded-lg bg-white border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            📸 編集元の写真をアップロード
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onPickPhoto(f)
            }}
            className="hidden"
          />
          {!sourceImage ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-700 hover:border-sky-400 hover:bg-sky-50 transition-colors text-sm font-medium"
            >
              📁 写真を選択（JPG / PNG / WebP, 最大 8MB）
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {sourcePreviewUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={sourcePreviewUrl}
                  alt="アップロードした編集元の写真"
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg border border-gray-200 bg-gray-50"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-emerald-700 font-medium mb-1">
                  ✓ 写真がアップロードされました
                </p>
                <p className="text-xs text-gray-500 truncate" title={sourceImage.name}>
                  {sourceImage.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(sourceImage.size / 1024).toFixed(0)} KB · {sourceImage.mimeType}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-gray-700 border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                  >
                    🔄 差し替え
                  </button>
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-gray-500 border border-gray-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={execute}
        disabled={running || (mode === 'image-edit' && !sourceImage)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {running ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            生成中…（{mode === 'text' ? '5-15' : '15-30'}秒）
          </>
        ) : (
          <>
            🚀 実行（{provider?.credits ?? 5} クレジット消費）
          </>
        )}
      </button>

      {!isSignedIn && (
        <p className="mt-3 text-xs text-gray-500">
          ※ 実行にはサインインが必要です（Google または メールリンク、初回 15 クレジット無料プレゼント）
        </p>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          {error}
          {error.includes('クレジットが足りません') && (
            <div className="mt-2">
              <Link
                href="/tools/personal-color-analysis#purchase"
                className="inline-flex items-center gap-1 text-red-700 font-medium underline"
              >
                💳 150 クレジットパックを購入（¥300）
              </Link>
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-xl bg-white border border-emerald-200 p-4 sm:p-6">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-3">
            ✨ 実行結果
          </p>
          {result.mode === 'text' && result.text && (
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 bg-gray-50 rounded p-3 border border-gray-100">
                {result.text}
              </pre>
            </div>
          )}
          {result.mode === 'image' && result.imageUrl && (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.imageUrl}
                alt={`${prompt.title} — 実行結果`}
                className="w-full rounded-lg border border-gray-200"
              />
              <p className="mt-2 text-xs text-gray-500">
                ※ 生成画像は 24 時間後に削除されます。必要な場合は早めにダウンロードしてください。
              </p>
              <div className="mt-3 flex gap-2">
                <a
                  href={result.imageUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  ⬇️ ダウンロード
                </a>
                <button
                  type="button"
                  onClick={execute}
                  disabled={running}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:border-sky-300 transition-colors"
                >
                  🔄 別バージョンを生成
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
