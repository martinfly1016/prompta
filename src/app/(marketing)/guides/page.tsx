import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getGuides } from '@/lib/data'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'AIプロンプトガイド — 使い方・書き方完全ガイド',
  description: 'ChatGPT、Stable Diffusion、Midjourney、Claude、DALL-Eなど主要AIツールのプロンプトの書き方・使い方を解説。',
  alternates: { canonical: `${SITE_CONFIG.url}/guides` },
}

export default async function GuidesPage() {
  const guides = await getGuides()

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'ガイド', href: '/guides' }]} />
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">AIプロンプトガイド</h1>
            <p className="text-gray-600 leading-relaxed">プロンプトの基本から応用テクニックまで、AIツールを最大限活用するための包括的なガイド集です。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(guide => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors mb-2">{guide.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{guide.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-600">続きを読む →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
