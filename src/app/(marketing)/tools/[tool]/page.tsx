import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_CONFIG, getGuidesForTool, getToolPageContent } from '@/lib/constants'
import { generateSoftwareApplicationSchema, generateFaqSchema } from '@/lib/schema'
import { getToolBySlug, getToolSlugs, getPromptsByToolPaginated, getTools, getCategories } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import Pagination from '@/components/Pagination'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const revalidate = 60

interface Props {
  params: { tool: string }
  searchParams: { page?: string }
}

export async function generateStaticParams() {
  const slugs = await getToolSlugs()
  return slugs.map(tool => ({ tool }))
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const tool = await getToolBySlug(params.tool)
  if (!tool) return {}
  const page = Number(searchParams.page) || 1
  const suffix = page > 1 ? ` — ページ${page}` : ''
  const extended = getToolPageContent(tool.slug)
  const defaultTitle = `${tool.name}プロンプト集【無料・コピペOK】— ${tool.nameJa}向けAIプロンプト${suffix}`
  const title = extended?.seoTitle ? `${extended.seoTitle}${suffix}` : defaultTitle
  const defaultDescription = `${tool.name}（${tool.nameJa}）で使える高品質プロンプト集。コピペでそのまま使える実用例を多数掲載。${(tool.description ?? '').slice(0, 70)}`.slice(0, 158)
  const description = (extended?.seoDescription ?? defaultDescription).slice(0, 158)
  const ogImage = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(`${tool.name} プロンプト集`)}&tool=${tool.slug}&type=tool`
  return {
    title,
    description,
    alternates: { canonical: `${SITE_CONFIG.url}/tools/${tool.slug}` },
    robots: page > 1 ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export default async function ToolPage({ params, searchParams }: Props) {
  const page = Math.max(1, Number(searchParams.page) || 1)

  const [tool, { prompts, total, totalPages }, allTools, categories] = await Promise.all([
    getToolBySlug(params.tool),
    getPromptsByToolPaginated(params.tool, page),
    getTools(),
    getCategories(),
  ])
  if (!tool) notFound()

  const toolCategories = categories.filter(cat => prompts.some(p => p.categorySlug === cat.slug))

  const appSchema = generateSoftwareApplicationSchema(
    { name: tool.name, nameJa: tool.nameJa, description: tool.description ?? '', slug: tool.slug },
    { baseUrl: SITE_CONFIG.url, siteName: SITE_CONFIG.nameEn }
  )
  const extended = getToolPageContent(tool.slug)
  const faqSchema = extended?.faqs.length ? generateFaqSchema(extended.faqs) : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'AIツール', href: '/tools' }, { name: tool.name, href: `/tools/${tool.slug}` }]} />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-5">
            <span className="text-5xl">{tool.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name} プロンプト集</h1>
              <p className="text-sm text-gray-500 mb-3">{tool.nameJa}</p>
              <p className="text-gray-600 max-w-2xl leading-relaxed">{tool.description}</p>
              <span className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 bg-sky-50 text-sky-700 text-sm font-medium rounded-full">{total} プロンプト</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tool intro — long-form SEO copy (only renders for tools with TOOL_PAGE_CONTENT entry) */}
      {extended && (
        <section className="bg-white py-10 border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">{extended.intro.heading}</h2>
            <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
              {extended.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category filters */}
      {toolCategories.length > 0 && (
        <section className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 py-4 overflow-x-auto">
              <span className="text-sm text-gray-500 shrink-0">カテゴリ:</span>
              {toolCategories.map(cat => (
                <Link key={cat.slug} href={`/prompts/${cat.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors shrink-0">
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tool.name} のプロンプト一覧</h2>
          <PromptGrid prompts={prompts} />
          <Pagination currentPage={page} totalPages={totalPages} basePath={`/tools/${tool.slug}`} />
        </div>
      </section>

      {/* How to Use */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{tool.name} プロンプトの使い方</h2>
          <div className="space-y-6">
            {['プロンプトを選ぶ', 'プロンプトをコピー', `${tool.name} で実行`].map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-700 font-bold text-sm rounded-full shrink-0">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{step}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {i === 0 && '上のプロンプト一覧から、使いたいプロンプトをクリックして詳細ページを開きます。'}
                    {i === 1 && '詳細ページの「コピー」ボタンをクリックして、プロンプトをクリップボードにコピーします。'}
                    {i === 2 && `コピーしたプロンプトを${tool.name}の入力欄に貼り付けて実行します。`}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {(() => {
            const toolGuides = getGuidesForTool(tool.slug)
            return toolGuides.length > 0 ? (
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">詳しい使い方ガイド</p>
                {toolGuides.slice(0, 4).map(guide => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 mt-1.5"
                  >
                    <span>📖</span> {guide.title}
                  </Link>
                ))}
              </div>
            ) : null
          })()}
        </div>
      </section>

      {/* Use cases + tips + FAQ (only for tools with extended content) */}
      {extended && (
        <>
          <section className="py-12 bg-gray-50 border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{extended.useCases.heading}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {extended.useCases.items.map((u, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-1.5 text-sm sm:text-base">{u.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{extended.tips.heading}</h2>
              <ol className="space-y-4">
                {extended.tips.items.map((t, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-700 font-bold text-sm rounded-full shrink-0">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{t.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="py-12 bg-gray-50 border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">よくある質問</h2>
              <div className="space-y-3">
                {extended.faqs.map((f, i) => (
                  <details key={i} className="group bg-white rounded-xl border border-gray-200 open:border-sky-300 open:bg-sky-50/30">
                    <summary className="cursor-pointer p-4 font-semibold text-sm sm:text-base text-gray-900 group-open:text-sky-700 list-none flex items-start justify-between gap-2">
                      <span>{f.question}</span>
                      <span className="text-sky-600 text-xl leading-none shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div
                      className="px-4 pb-4 text-sm text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: f.answer }}
                    />
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Related Tools */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">他のAIツール</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {allTools.filter(t => t.slug !== tool.slug).map(t => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{t.name}</h3>
                  <p className="text-xs text-gray-500">{t.nameJa}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
