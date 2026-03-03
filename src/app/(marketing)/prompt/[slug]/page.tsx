import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/constants'
import { getPromptBySlug, getPromptSlugs, getRelatedPrompts } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import { CopyButton } from '@/components/ui/CopyButton'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { generatePromptSchema } from '@/lib/schema'

export const revalidate = 60

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getPromptSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const prompt = await getPromptBySlug(decodeURIComponent(resolvedParams.slug))
  if (!prompt) return {}
  return {
    title: prompt.title,
    description: prompt.description,
    alternates: { canonical: `${SITE_CONFIG.url}/prompt/${prompt.slug}` },
    openGraph: { title: prompt.title, description: prompt.description, type: 'article' },
  }
}

export default async function PromptDetailPage({ params }: Props) {
  const resolvedParams = await params
  const slug = decodeURIComponent(resolvedParams.slug)
  const prompt = await getPromptBySlug(slug)
  if (!prompt) notFound()

  const related = await getRelatedPrompts(prompt, 4)

  const schema = generatePromptSchema(
    { id: prompt.slug, title: prompt.title, description: prompt.description, content: prompt.content, category: prompt.categoryName ? { name: prompt.categoryName } : undefined, createdAt: prompt.createdAt, updatedAt: prompt.updatedAt },
    { baseUrl: SITE_CONFIG.url, siteName: SITE_CONFIG.nameEn },
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          ...(prompt.toolSlug ? [{ name: prompt.toolName!, href: `/tools/${prompt.toolSlug}` }] : []),
          ...(prompt.categorySlug ? [{ name: prompt.categoryName, href: `/prompts/${prompt.categorySlug}` }] : []),
          { name: prompt.title.slice(0, 30), href: `/prompt/${prompt.slug}` },
        ]} />
      </div>

      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {prompt.toolName && (
                <Link href={`/tools/${prompt.toolSlug}`} className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-white rounded-md" style={{ backgroundColor: prompt.toolColor || '#6b7280' }}>
                  {prompt.toolIcon} {prompt.toolName}
                </Link>
              )}
              {prompt.categoryName && (
                <Link href={`/prompts/${prompt.categorySlug}`} className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-sky-50 text-sky-700 rounded-md hover:bg-sky-100 transition-colors">
                  {prompt.categoryIcon} {prompt.categoryName}
                </Link>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{prompt.title}</h1>
            <p className="text-gray-600 leading-relaxed">{prompt.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {prompt.viewCount.toLocaleString()} 閲覧
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                {prompt.copyCount.toLocaleString()} コピー
              </span>
              <time className="text-gray-400">{new Date(prompt.updatedAt).toLocaleDateString('ja-JP')}</time>
            </div>
          </header>

          {/* Images */}
          {prompt.images.length > 0 && (
            <section className="mb-8">
              <div className={`grid gap-4 ${prompt.images.length === 1 ? 'grid-cols-1 max-w-lg' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {prompt.images.map((img, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt || prompt.title}
                      className="w-full h-auto object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prompt Content */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">プロンプト</h2>
              <CopyButton text={prompt.content} variant="compact" />
            </div>
            <div className="bg-gray-900 text-gray-100 rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap">{prompt.content}</div>
            <div className="mt-4 text-center">
              <CopyButton text={prompt.content} />
            </div>
          </section>

          {/* Usage */}
          <section className="mb-8 p-6 bg-sky-50 rounded-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">使い方</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              {['上のプロンプトをコピーボタンでコピーします。', `${prompt.toolName ?? 'AIツール'}を開き、プロンプト入力欄に貼り付けます。`, '必要に応じて、{ }で囲まれた部分を自分の内容に置き換えてください。', '生成を実行して結果を確認します。'].map((text, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-sky-600 text-white text-xs font-bold rounded-full shrink-0">{i + 1}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">タグ</h2>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map(tag => (
                  <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors">
                    # {tag}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">関連プロンプト</h2>
            <PromptGrid prompts={related} />
          </div>
        </section>
      )}
    </>
  )
}
