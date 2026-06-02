import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { getPromptsByTagPaginated, getApprovedTagSlugs, getTagBySlug, getPrimaryCategoryForTag, getPopularTagsByCategory } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import Pagination from '@/components/Pagination'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const revalidate = 60

// Tag-level guide override — checked before the category fallback. Use when a
// specific tag has a more precisely-matched guide than its parent category's
// default (e.g. 身長差/体格差 → dedicated pair-prompt guide, not the broader
// body-type guide that absorbs every body-related query).
const TAG_TO_GUIDE: Record<string, { slug: string; title: string }> = {
  '身長差': { slug: 'height-difference-pair-prompt', title: '身長差プロンプトのやり方・作り方完全ガイド' },
  '体格差': { slug: 'height-difference-pair-prompt', title: '身長差・体格差プロンプト完全ガイド' },
  'BL': { slug: 'bl-composition-prompt-guide', title: 'BL カップル構図のAIプロンプト完全ガイド' },
  'BL ポーズ': { slug: 'bl-pose-collection-guide', title: 'BL ポーズ集｜AIで再現する男性 2 人の定番 30 ポーズ完全ガイド' },
  '二人構図': { slug: 'two-person-composition-prompt-guide', title: 'カップルポーズ・二人構図のAIプロンプト完全ガイド' },
  'カップル': { slug: 'two-person-composition-prompt-guide', title: 'カップルポーズ・二人構図のAIプロンプト完全ガイド' },
  '壁ドン': { slug: 'two-person-composition-prompt-guide', title: '二人構図プロンプト完全ガイド｜壁ドン・キス・ハグ構図' },
  'キス': { slug: 'two-person-composition-prompt-guide', title: '二人構図プロンプト完全ガイド｜壁ドン・キス・ハグ構図' },
  'ハグ': { slug: 'two-person-composition-prompt-guide', title: '二人構図プロンプト完全ガイド｜壁ドン・キス・ハグ構図' },
  'お姫様抱っこ': { slug: 'two-person-composition-prompt-guide', title: '二人構図プロンプト完全ガイド｜お姫様抱っこ・キス構図' },
  '見上げる': { slug: 'two-person-composition-prompt-guide', title: '二人構図プロンプト完全ガイド｜見上げる構図' },
}

// Category → canonical guide fallback. Used to surface a "詳しい解説ガイド" CTA
// on tag pages so prompt-seeking visitors who'd rather read context (~11% of
// /tag/身長差 sessions already do this) get a clear path in addition to the
// inline prompts.
const CATEGORY_TO_GUIDE: Record<string, { slug: string; title: string }> = {
  'hairstyle': { slug: 'hairstyle-prompt-guide', title: '髪型プロンプトの書き方ガイド' },
  'cosplay':   { slug: 'cosplay-prompt-guide', title: 'コスプレプロンプトの書き方ガイド' },
  'anime':     { slug: 'anime-prompt-guide', title: 'アニメ風プロンプトの書き方ガイド' },
  'body-type': { slug: 'body-type-prompt-guide', title: '体型・身長差プロンプトの書き方ガイド' },
  'color':     { slug: 'color-prompt-guide', title: '色・カラープロンプトの書き方ガイド' },
}

const TAG_GUIDE_CTA_COPY: Record<string, { label: string; description: string }> = {
  '身長差': {
    label: 'やり方・作り方を先に読む',
    description: '推しとの身長差、BL・百合・男女カップル、逆身長差、体格差の英語プロンプト例をまとめています。',
  },
  '体格差': {
    label: '体格差の出し方を先に読む',
    description: '筋肉質 × 小柄、騎士 × 魔法使いなど、身長差と体格差を分けて指定するコツを解説しています。',
  },
}

const TAG_TO_TOOL: Record<string, { href: string; label: string; title: string; description: string }> = {
  '身長差': {
    href: '/tools/height-difference-maker',
    label: '身長差メーカー',
    title: '推しとの身長差プロンプトを作成する',
    description: '身長・関係性・ポーズを選ぶだけで、Stable Diffusion / Midjourney / ChatGPT 用の英語プロンプトを生成できます。',
  },
  '体格差': {
    href: '/tools/height-difference-maker',
    label: '体格差ツール',
    title: '体格差構図プロンプトを作成する',
    description: '筋肉量・肩幅・横幅の差を強調する体格差プロンプトとネガティブプロンプトを生成できます。',
  },
}

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
    alternates: { canonical: `${SITE_CONFIG.url}/tag/${params.slug}${page > 1 ? `?page=${page}` : ''}` },
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
  const relatedGuide =
    TAG_TO_GUIDE[tag] ?? (primaryCategory ? CATEGORY_TO_GUIDE[primaryCategory.slug] : undefined)
  const guideCtaCopy = TAG_GUIDE_CTA_COPY[tag]
  const relatedTool = TAG_TO_TOOL[tag]

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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2"># {tag}</h1>
            <p className="text-gray-500">「{tag}」タグが付いたプロンプト {total}件</p>
          </div>

          {relatedGuide && page === 1 && (
            <Link
              href={`/guides/${relatedGuide.slug}`}
              className="group flex items-center gap-3 mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg hover:border-sky-400 hover:bg-sky-100 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-sky-700 uppercase tracking-wide mb-0.5">
                  {guideCtaCopy?.label ?? '解説ガイド'}
                </p>
                <p className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors truncate">
                  {relatedGuide.title}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {guideCtaCopy?.description ?? 'プロンプトの書き方・使い方を詳しく解説（5分）'}
                </p>
              </div>
              <span className="flex-shrink-0 text-sky-600 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          )}

          {relatedTool && page === 1 && (
            <Link
              href={relatedTool.href}
              className="group flex items-center gap-3 mb-6 p-4 bg-white border border-sky-200 rounded-lg hover:border-sky-400 hover:bg-sky-50 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-50 text-lg shrink-0">
                📏
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-sky-700 uppercase tracking-wide mb-0.5">
                  {relatedTool.label}
                </p>
                <p className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors">
                  {relatedTool.title}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {relatedTool.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-sky-600 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          )}

          <PromptGrid
            prompts={prompts}
            showInlinePrompt
            inlinePromptSurface="tag-card"
          />
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
