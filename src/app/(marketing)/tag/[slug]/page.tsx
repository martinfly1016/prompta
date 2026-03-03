import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getPromptsByTagPaginated, getTagSlugs } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import Pagination from '@/components/Pagination'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const revalidate = 60

interface Props {
  params: { slug: string }
  searchParams: { page?: string }
}

export async function generateStaticParams() {
  const slugs = await getTagSlugs()
  return slugs.map(slug => ({ slug: encodeURIComponent(slug) }))
}

export function generateMetadata({ params, searchParams }: Props): Metadata {
  const tag = decodeURIComponent(params.slug)
  const page = Number(searchParams.page) || 1
  const suffix = page > 1 ? ` — ページ${page}` : ''
  return {
    title: `「${tag}」タグのプロンプト集${suffix}`,
    description: `「${tag}」に関連するAIプロンプトの一覧。Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-E対応。`,
    alternates: { canonical: `${SITE_CONFIG.url}/tag/${params.slug}` },
  }
}

export default async function TagPage({ params, searchParams }: Props) {
  const tag = decodeURIComponent(params.slug)
  const page = Math.max(1, Number(searchParams.page) || 1)
  const { prompts, total, totalPages } = await getPromptsByTagPaginated(tag, page)

  return (
    <>
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
    </>
  )
}
