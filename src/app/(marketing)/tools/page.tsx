import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getTools } from '@/lib/data'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'AIツール一覧 — 対応AI画像生成・テキスト生成ツール',
  description: 'Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-Eなど、プロンプタが対応するAIツールの一覧。',
  alternates: { canonical: `${SITE_CONFIG.url}/tools` },
}

export default async function ToolsPage() {
  const tools = await getTools()

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'AIツール', href: '/tools' }]} />
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">対応AIツール一覧</h1>
            <p className="text-gray-600 leading-relaxed">画像生成からテキスト生成まで、主要なAIツール向けの高品質プロンプトを網羅しています。</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{tool.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">{tool.name}</h2>
                    <p className="text-sm text-gray-500 mb-1">{tool.nameJa}</p>
                    <span className="text-xs text-sky-600 font-medium">{tool.promptCount} プロンプト</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">{tool.description}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-sky-600">プロンプトを見る →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
