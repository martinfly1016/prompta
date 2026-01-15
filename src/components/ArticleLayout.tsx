import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import TableOfContents from './TableOfContents'
import Footer from './Footer'

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
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-16">
          <div className="container mx-auto px-6" style={{ maxWidth: '800px' }}>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              ガイド一覧に戻る
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{readingTime}分で読めます</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="container mx-auto px-6 py-12" style={{ maxWidth: '800px' }}>
          {/* Table of Contents */}
          <TableOfContents items={tocItems} />

          {/* Main Content */}
          <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20">
            {children}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              プロンプトを探してみませんか？
            </h2>
            <p className="text-blue-100 mb-6">
              Promptaには、すぐに使える高品質なプロンプトが多数あります。
            </p>
            <Link
              href="/all-prompts"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              プロンプト一覧を見る
            </Link>
          </div>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                関連するガイド
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
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
      <Footer />
    </>
  )
}
