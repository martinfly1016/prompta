import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { getPromptsByTagPaginated, getApprovedTagSlugs, getTagBySlug, getPrimaryCategoryForTag, getPopularTagsByCategory } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import Pagination from '@/components/Pagination'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const revalidate = 60

interface Props {
  params: { slug: string }
  searchParams: { page?: string }
}

export async function generateStaticParams() {
  const slugs = await getApprovedTagSlugs()
  return slugs.map(slug => ({ slug: encodeURIComponent(slug) }))
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.slug)
  const page = Number(searchParams.page) || 1
  const suffix = page > 1 ? ` — ページ${page}` : ''

  const tagData = await getTagBySlug(tag)
  const isApproved = tagData?.isApproved ?? false

  const defaultTitle = `「${tag}」プロンプト一覧【無料・コピペOK】${suffix}`
  const defaultDescription = `「${tag}」関連のAIプロンプト集。Stable Diffusion・Midjourney・ChatGPT・Claude・DALL-E対応。コピペでそのまま使えるサンプルを多数掲載しています。`

  const title = tagData?.seoTitle
    ? `${tagData.seoTitle}${suffix}`
    : defaultTitle
  const description = page === 1 && tagData?.seoDescription
    ? tagData.seoDescription
    : defaultDescription

  return {
    title,
    description,
    alternates: { canonical: `${SITE_CONFIG.url}/tag/${params.slug}` },
    ...(!isApproved && { robots: { index: false, follow: true } }),
  }
}

export default async function TagPage({ params, searchParams }: Props) {
  const tag = decodeURIComponent(params.slug)
  const page = Math.max(1, Number(searchParams.page) || 1)
  const [tagData, { prompts, total, totalPages }] = await Promise.all([
    getTagBySlug(tag),
    getPromptsByTagPaginated(tag, page),
  ])

  const primaryCategory = tagData ? await getPrimaryCategoryForTag(tag) : null
  const relatedTags = primaryCategory
    ? (await getPopularTagsByCategory(primaryCategory.slug, 8)).filter(t => t.slug !== tag).slice(0, 6)
    : []

  const tagUrl = `${SITE_CONFIG.url}/tag/${params.slug}`
  const collectionSchema = generateCollectionPageSchema(
    `「${tag}」プロンプト一覧`,
    tagData?.seoDescription ?? `「${tag}」関連のAIプロンプト集`,
    tagUrl,
    total,
  )
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'ホーム', url: '/' },
      { name: '全プロンプト', url: '/prompts' },
      { name: `# ${tag}`, url: `/tag/${params.slug}` },
    ],
    SITE_CONFIG.url,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: '全プロンプト', href: '/prompts' }, { name: `# ${tag}`, href: `/tag/${params.slug}` }]} />
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2"># {tag}</h1>
            <p className="text-gray-500">「{tag}」タグが付いたプロンプト {total}件</p>
          </div>
          <PromptGrid prompts={prompts} />
          <Pagination currentPage={page} totalPages={totalPages} basePath={`/tag/${params.slug}`} />
        </div>
      </section>

      {tagData?.seoIntro && (
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">「{tag}」プロンプトとは？</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {tagData.seoIntro}
            </p>
          </div>
        </section>
      )}

      {relatedTags.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">関連タグ</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map(t => (
                <Link
                  key={t.slug}
                  href={`/tag/${encodeURIComponent(t.slug)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 text-sm font-medium rounded-full border border-sky-200 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                >
                  <span>#</span>
                  <span>{t.name}</span>
                  <span className="text-xs text-sky-500">{t.promptCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {primaryCategory && (
        <section className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/prompts/${primaryCategory.slug}`}
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
            >
              <span>{primaryCategory.icon}</span>
              <span>「{primaryCategory.name}」カテゴリの全プロンプトを見る →</span>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
