import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'
import TableOfContents from './TableOfContents'
import Header from './Header'

interface TocItem {
  id: string
  text: string
  level: number
}

interface RelatedGuide {
  slug: string
  title: string
  description: string
}

interface ArticleLayoutProps {
  title: string
  description: string
  publishedAt: string
  readingTime: number
  tocItems: TocItem[]
  children: React.ReactNode
  relatedGuides?: RelatedGuide[]
}

export default function ArticleLayout({
  title,
  description,
  publishedAt,
  readingTime,
  tocItems,
  children,
  relatedGuides = [],
}: ArticleLayoutProps) {
  return (
    <>
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
          </div>

          <div className="relative container mx-auto px-6 py-16 md:py-20" style={{ maxWidth: '900px' }}>
            {/* Breadcrumb */}
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={18} />
              ガイド一覧に戻る
            </Link>

            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <BookOpen size={16} />
                学習ガイド
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              {description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Calendar size={16} />
                <span className="text-sm">{publishedAt}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock size={16} />
                <span className="text-sm">{readingTime}分で読めます</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="container mx-auto px-6 py-12" style={{ maxWidth: '900px' }}>
          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 -mt-8 relative z-10">
            {/* Table of Contents */}
            <TableOfContents items={tocItems} />

            {/* Main Content */}
            <div className="article-content">
              {children}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              プロンプトを探してみませんか？
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
              Promptaには、すぐに使える高品質なプロンプトが多数あります。
            </p>
            <Link
              href="/all-prompts"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              プロンプト一覧を見る
            </Link>
          </div>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">📚</span>
                関連するガイド
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {guide.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  )
}
