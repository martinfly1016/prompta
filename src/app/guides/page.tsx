import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import { guides } from '@/content/guides'
import Header from '@/components/Header'

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

  const guideIcons = ['🎯', '✍️', '🤖', '💼']
  const guideColors = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-purple-500 to-pink-600',
    'from-orange-500 to-red-600',
  ]

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

      {/* Header */}
      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
              style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
            />
          </div>

          <div className="relative container mx-auto px-6 py-20 md:py-28" style={{ maxWidth: '1000px' }}>
            <div className="text-center">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  <BookOpen size={16} />
                  無料で学べる
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                AIプロンプト
                <br />
                <span className="text-yellow-300">完全ガイド</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
                AIを効果的に活用するためのガイド集。
                プロンプトエンジニアリングの基礎から実践的な活用事例まで、
                わかりやすく解説します。
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-8 text-white/80">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{guides.length}</div>
                  <div className="text-sm">ガイド記事</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {guides.reduce((acc, g) => acc + g.readingTime, 0)}分
                  </div>
                  <div className="text-sm">総読了時間</div>
                </div>
              </div>
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
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Icon Section */}
                    <div
                      className={`flex-shrink-0 w-full md:w-48 h-32 md:h-auto bg-gradient-to-br ${guideColors[index]} flex items-center justify-center`}
                    >
                      <span className="text-5xl md:text-6xl filter drop-shadow-lg">
                        {guideIcons[index]}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          ガイド {index + 1}
                        </span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </h2>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                        {guide.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{guide.readingTime}分</span>
                          </div>
                          <span>•</span>
                          <span>{guide.publishedAt}</span>
                        </div>

                        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                          <span>読む</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6" style={{ maxWidth: '800px' }}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
              <div className="text-4xl mb-4">✨</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                すぐに使えるプロンプトをお探しですか？
              </h2>
              <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
                Promptaには、様々なシーンで使える高品質なプロンプトが揃っています。
              </p>
              <Link
                href="/all-prompts"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                プロンプト一覧を見る
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
