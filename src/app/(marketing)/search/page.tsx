'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PromptCard } from '@/components/prompt/PromptCard'
import type { NormalizedPrompt } from '@/lib/data'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<NormalizedPrompt[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }

    let cancelled = false
    setLoading(true)

    fetch(`/api/prompts?search=${encodeURIComponent(query)}&limit=20`)
      .then(res => res.json())
      .then(data => {
        if (cancelled) return
        // Normalize API response to NormalizedPrompt shape
        const prompts: NormalizedPrompt[] = (data.prompts ?? data ?? []).map((p: any) => ({
          id: p.id,
          slug: p.slug ?? p.id,
          title: p.title,
          description: p.description,
          content: p.content ?? '',
          toolSlug: p.tool?.slug ?? null,
          toolName: p.tool?.name ?? null,
          toolColor: p.tool?.color ?? null,
          toolIcon: p.tool?.icon ?? null,
          categorySlug: p.category?.slug ?? '',
          categoryName: p.category?.name ?? '',
          categoryIcon: p.category?.icon ?? null,
          tags: (() => {
            try {
              if (Array.isArray(p.tags)) return p.tags.map((t: any) => typeof t === 'string' ? t : t.name)
              if (p.tagsJson) return JSON.parse(p.tagsJson)
              return []
            } catch { return [] }
          })(),
          images: (p.images ?? []).map((i: any) => ({ url: i.url, alt: i.altText ?? null })),
          isFeatured: p.isFeatured ?? false,
          viewCount: p.viewCount ?? 0,
          copyCount: p.copyCount ?? 0,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        }))
        setResults(prompts)
      })
      .catch(() => setResults([]))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [query])

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {query ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">「{query}」の検索結果</h1>
              <p className="text-gray-500">
                {loading ? '検索中...' : `${results.length}件のプロンプトが見つかりました`}
              </p>
            </div>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {results.map(p => <PromptCard key={p.id} prompt={p} />)}
              </div>
            ) : !loading ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">🔍</p>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">該当するプロンプトが見つかりませんでした</h2>
                <p className="text-gray-500 mb-6">別のキーワードで検索してみてください。</p>
                <Link href="/prompts" className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-medium rounded-xl hover:bg-sky-700 transition-colors">全プロンプトを見る</Link>
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">プロンプトを検索</h1>
            <p className="text-gray-500 mb-6">キーワードを入力してプロンプトを検索してください。</p>
            <Link href="/prompts" className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-medium rounded-xl hover:bg-sky-700 transition-colors">全プロンプトを見る</Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-500">読み込み中...</div>}>
      <SearchContent />
    </Suspense>
  )
}
