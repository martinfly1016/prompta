import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getPromptsByTag, getTagSlugs } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getTagSlugs()
  return slugs.map(slug => ({ slug: encodeURIComponent(slug) }))
}

export function generateMetadata({ params }: Props): Metadata {
  const tag = decodeURIComponent(params.slug)
  return {
    title: `「${tag}」タグのプロンプト集`,
    description: `「${tag}」に関連するAIプロンプトの一覧。Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-E対応。`,
    alternates: { canonical: `${SITE_CONFIG.url}/tag/${params.slug}` },
  }
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.slug)
  const prompts = await getPromptsByTag(tag)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: '全プロンプト', href: '/prompts' }, { name: `# ${tag}`, href: `/tag/${params.slug}` }]} />
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2"># {tag}</h1>
            <p className="text-gray-500">「{tag}」タグが付いたプロンプト {prompts.length}件</p>
          </div>
          <PromptGrid prompts={prompts} />
        </div>
      </section>
    </>
  )
}
