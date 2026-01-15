import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import TableOfContents from './TableOfContents'

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
      <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        {/* Navigation Bar */}
        <nav className="category-nav-bar">
          <Link href="/" className="logo-link">
            <img src="/logo.png" alt="Prompta Logo" className="logo-image" />
          </Link>
          <Link href="/" className="category-nav-item">
            <span className="category-nav-icon">🏠</span>
            <span>ホーム</span>
          </Link>
          <Link href="/guides" className="category-nav-item category-nav-item-selected">
            <span className="category-nav-icon">📚</span>
            <span>ガイド</span>
          </Link>
          <Link href="/all-prompts" className="category-nav-item">
            <span className="category-nav-icon">📋</span>
            <span>すべてのプロンプト</span>
          </Link>
        </nav>

        {/* Hero Section */}
        <section style={{ backgroundColor: '#f8fafc', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container mx-auto px-6" style={{ maxWidth: '900px' }}>
            {/* Breadcrumb */}
            <Link
              href="/guides"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#0284c7',
                fontSize: '14px',
                textDecoration: 'none',
                marginBottom: '24px',
              }}
              className="hover:underline"
            >
              <ArrowLeft size={16} />
              ガイド一覧に戻る
            </Link>

            {/* Badge */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 600,
                color: '#0284c7',
                backgroundColor: '#eff6ff',
                padding: '4px 12px',
                borderRadius: '4px',
              }}>
                📚 学習ガイド
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '16px',
              lineHeight: 1.3,
            }}>
              {title}
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '16px',
              color: '#475569',
              marginBottom: '20px',
              lineHeight: 1.6,
            }}>
              {description}
            </p>

            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} />
                {publishedAt}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} />
                {readingTime}分で読めます
              </span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '60px' }}>
          <div className="container mx-auto px-6" style={{ maxWidth: '900px' }}>
            {/* Table of Contents */}
            <TableOfContents items={tocItems} />

            {/* Main Content */}
            <div className="article-content">
              {children}
            </div>

            {/* CTA Section */}
            <div style={{
              marginTop: '48px',
              padding: '32px',
              backgroundColor: '#eff6ff',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #bfdbfe',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                ✨ プロンプトを探してみませんか？
              </h2>
              <p style={{ fontSize: '15px', color: '#475569', marginBottom: '20px' }}>
                Promptaには、すぐに使える高品質なプロンプトが多数あります。
              </p>
              <Link
                href="/all-prompts"
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                className="hover:bg-blue-700"
              >
                プロンプト一覧を見る
              </Link>
            </div>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <div style={{ marginTop: '48px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
                  📚 関連するガイド
                </h2>
                <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                  {relatedGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      style={{
                        display: 'block',
                        padding: '20px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        border: '1px solid #e2e8f0',
                        transition: 'all 0.2s',
                      }}
                      className="hover:border-blue-300 hover:shadow-sm"
                    >
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }} className="hover:text-blue-600">
                        {guide.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
                        {guide.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
