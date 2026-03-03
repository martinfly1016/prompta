import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/constants'
import { getCategoryBySlug, getCategorySlugs, getPromptsByCategory, getTools, getCategories } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { generateCollectionPageSchema } from '@/lib/schema'

interface Props { params: { category: string } }

export async function generateStaticParams() {
  const slugs = await getCategorySlugs()
  return slugs.map(category => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.category)
  if (!cat) return {}
  return {
    title: `${cat.name}プロンプト集 — AI画像生成向け${cat.nameEn}プロンプト`,
    description: (cat.description ?? '').slice(0, 155),
    alternates: { canonical: `${SITE_CONFIG.url}/prompts/${cat.slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const [category, prompts, tools, allCategories] = await Promise.all([
    getCategoryBySlug(params.category),
    getPromptsByCategory(params.category),
    getTools(),
    getCategories(),
  ])
  if (!category) notFound()

  const categoryTools = tools.filter(tool => prompts.some(p => p.toolSlug === tool.slug))
  const schema = generateCollectionPageSchema(`${category.name}プロンプト集`, category.description, `${SITE_CONFIG.url}/prompts/${category.slug}`, prompts.length)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: '全プロンプト', href: '/prompts' }, { name: category.name, href: `/prompts/${category.slug}` }]} />
      </div>

      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}プロンプト集</h1>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">{category.description}</p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 bg-sky-50 text-sky-700 text-sm font-medium rounded-full">{prompts.length} プロンプト</span>
              {categoryTools.map(tool => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-sky-50 hover:text-sky-700 transition-colors">
                  {tool.icon} {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PromptGrid prompts={prompts} />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{category.name}プロンプトのコツ</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-sky-500 mt-1">•</span><span>具体的な描写を含める（色、質感、スタイルなど）</span></li>
            <li className="flex items-start gap-2"><span className="text-sky-500 mt-1">•</span><span>品質タグ（masterpiece, best quality）を追加して品質を向上</span></li>
            <li className="flex items-start gap-2"><span className="text-sky-500 mt-1">•</span><span>ネガティブプロンプトを活用して不要な要素を除外</span></li>
            <li className="flex items-start gap-2"><span className="text-sky-500 mt-1">•</span><span>重み付け（例: (keyword:1.3)）で特定の要素を強調</span></li>
          </ul>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">関連カテゴリ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {allCategories.filter(c => c.slug !== category.slug).slice(0, 4).map(cat => (
              <Link key={cat.slug} href={`/prompts/${cat.slug}`} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.nameEn}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
