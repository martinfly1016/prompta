import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getTools, getCategories, getAllPrompts } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { generateCollectionPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: '全プロンプト一覧 — AIプロンプト集',
  description: 'Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-E向けの全プロンプト一覧。',
  alternates: { canonical: `${SITE_CONFIG.url}/prompts` },
}

export default async function AllPromptsPage() {
  const [tools, categories, prompts] = await Promise.all([
    getTools(),
    getCategories(),
    getAllPrompts(),
  ])

  const schema = generateCollectionPageSchema('全プロンプト一覧', 'すべてのAIプロンプトコレクション', `${SITE_CONFIG.url}/prompts`, prompts.length)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: '全プロンプト', href: '/prompts' }]} />
      </div>
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">全プロンプト一覧</h1>
            <p className="text-gray-600">{prompts.length}件のプロンプトを掲載中。ツールやカテゴリで絞り込みできます。</p>
          </div>
          <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-gray-200">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ツール</p>
              <div className="flex flex-wrap gap-2">
                {tools.map(tool => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors">
                    {tool.icon} {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">カテゴリ</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Link key={cat.slug} href={`/prompts/${cat.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <PromptGrid prompts={prompts} />
        </div>
      </section>
    </>
  )
}
