import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getTools, getCategories, getFeaturedPrompts, getLatestPrompts, getGuides } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import { generateOrganizationSchema } from '@/lib/schema'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'AIプロンプト集 — Stable Diffusion・Midjourney・ChatGPT・Claude対応',
  description: 'Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-Eなど主要AIツール対応の高品質プロンプト集。画像生成プロンプトからビジネス活用まで、AIを最大限活用するプロンプトを無料提供。',
  alternates: { canonical: SITE_CONFIG.url },
}

export default async function HomePage() {
  const [tools, categories, featured, latest, guides] = await Promise.all([
    getTools(),
    getCategories(),
    getFeaturedPrompts(12),
    getLatestPrompts(12),
    getGuides(),
  ])

  const orgSchema = generateOrganizationSchema({
    baseUrl: SITE_CONFIG.url,
    siteName: SITE_CONFIG.nameEn,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Hero — compact */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            AIを使いこなすための<span className="text-sky-600">プロンプト集</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-5">
            Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-E対応の高品質プロンプトを無料提供。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/prompts" className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 shadow-sm transition-all">
              プロンプトを探す →
            </Link>
            <Link href="/guides" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-sky-300 hover:text-sky-600 shadow-sm transition-all">
              使い方ガイド
            </Link>
          </div>
        </div>
      </section>

      {/* Tools + Categories — single compact row */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tools as inline pills */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">ツール</span>
            {tools.map(tool => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-full border border-gray-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all">
                <span>{tool.icon}</span>
                {tool.name}
                {tool.promptCount > 0 && <span className="text-sky-600 font-semibold">{tool.promptCount}</span>}
              </Link>
            ))}
          </div>
          {/* Categories as inline pills — hide empty ones */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">カテゴリ</span>
            {categories.map(cat => (
              <Link key={cat.slug} href={`/prompts/${cat.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-full border border-gray-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all">
                <span>{cat.icon}</span>
                {cat.name}
                {cat.promptCount > 0 && <span className="text-sky-600 font-semibold">{cat.promptCount}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Prompts — primary content, show first */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">最新のプロンプト</h2>
            <Link href="/prompts" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
              すべて見る →
            </Link>
          </div>
          <PromptGrid prompts={latest} priorityCount={4} />
        </div>
      </section>

      {/* Featured Prompts */}
      {featured.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">おすすめプロンプト</h2>
              <Link href="/prompts" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
                すべて見る →
              </Link>
            </div>
            <PromptGrid prompts={featured} />
          </div>
        </section>
      )}

      {/* Guides */}
      {guides.length > 0 && (
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">使い方ガイド</h2>
              <Link href="/guides" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guides.slice(0, 3).map(guide => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all duration-200">
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-sky-600 transition-colors mb-1.5 line-clamp-2">{guide.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-10 bg-sky-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">AIの可能性を最大限に引き出そう</h2>
          <p className="text-sm text-sky-100 mb-5">最新のAIツール向けプロンプトを定期追加中。</p>
          <Link href="/prompts" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-sky-600 text-sm font-semibold rounded-lg hover:bg-sky-50 shadow-md transition-all">
            プロンプトを探す →
          </Link>
        </div>
      </section>
    </>
  )
}
