import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import Footer from '@/components/Footer'
import { guides } from '@/content/guides'

export const metadata: Metadata = {
  title: 'AIプロンプトガイド | Prompta',
  description: 'AIを効果的に活用するためのガイド集。プロンプトエンジニアリングの基礎から、ChatGPTとClaudeの使い分け、実践的な活用事例まで詳しく解説します。',
  keywords: ['AIガイド', 'プロンプトエンジニアリング', 'ChatGPT 使い方', 'Claude 使い方'],
  openGraph: {
    title: 'AIプロンプトガイド | Prompta',
    description: 'AIを効果的に活用するためのガイド集。プロンプトエンジニアリングの基礎から実践的な活用事例まで。',
    url: 'https://www.prompta.jp/guides',
    type: 'website',
    locale: 'ja_JP',
  },
  alternates: {
    canonical: 'https://www.prompta.jp/guides',
  },
}

export default function GuidesPage() {
  // Generate ItemList Schema
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.prompta.jp/guides/${guide.slug}`,
      name: guide.title,
      description: guide.description,
    })),
  }

  // Generate Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://www.prompta.jp',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'ガイド',
        item: 'https://www.prompta.jp/guides',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-6" style={{ maxWidth: '1000px' }}>
            <div className="text-center mb-12">
              <div className="text-6xl mb-6">📚</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AIプロンプト<span className="text-blue-600">ガイド</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                AIを効果的に活用するためのガイド集。
                プロンプトエンジニアリングの基礎から実践的な活用事例まで、
                わかりやすく解説します。
              </p>
            </div>
          </div>
        </section>

        {/* Guides List */}
        <section className="py-16">
          <div className="container mx-auto px-6" style={{ maxWidth: '1000px' }}>
            <div className="grid gap-6">
              {guides.map((guide, index) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">
                          {index === 0 && '🎯'}
                          {index === 1 && '✍️'}
                          {index === 2 && '🤖'}
                          {index === 3 && '💼'}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {guide.title}
                        </h2>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{guide.readingTime}分で読めます</span>
                        </div>
                        <span>•</span>
                        <span>{guide.publishedAt}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center" style={{ maxWidth: '800px' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              すぐに使えるプロンプトをお探しですか？
            </h2>
            <p className="text-gray-600 mb-8">
              Promptaには、様々なシーンで使える高品質なプロンプトが揃っています。
            </p>
            <Link
              href="/all-prompts"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              プロンプト一覧を見る
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
