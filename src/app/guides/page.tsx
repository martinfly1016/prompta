import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.prompta.jp' },
      { '@type': 'ListItem', position: 2, name: 'ガイド', item: 'https://www.prompta.jp/guides' },
    ],
  }

  const guideIcons = ['🎯', '✍️', '🤖', '💼']

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
        <section style={{ backgroundColor: '#f8fafc', paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px', color: '#0f172a', lineHeight: 1.3 }}>
                AIプロンプト<span style={{ color: '#0284c7' }}>学習ガイド</span>
              </h1>
              <p style={{ fontSize: '16px', color: '#475569', marginBottom: '28px', lineHeight: 1.6 }}>
                AIを効果的に活用するためのガイド集。
                <br />
                プロンプトエンジニアリングの基礎から実践的な活用事例まで、わかりやすく解説します。
              </p>
              <p style={{ fontSize: '14px', color: '#0284c7', fontWeight: 500 }}>
                📚 {guides.length}本のガイド記事 • 総読了時間 {guides.reduce((acc, g) => acc + g.readingTime, 0)}分
              </p>
            </div>
          </div>
        </section>

        {/* Guides List */}
        <section style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '60px' }}>
          <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                学習コンテンツ
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                ガイド一覧
              </h2>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {guides.map((guide, index) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '24px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  className="group hover:border-blue-300 hover:shadow-md"
                >
                  {/* Icon */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    flexShrink: 0,
                  }}>
                    {guideIcons[index]}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#0284c7',
                        backgroundColor: '#eff6ff',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}>
                        ガイド {index + 1}
                      </span>
                    </div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '8px',
                      margin: 0,
                    }} className="group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#475569',
                      marginBottom: '12px',
                      lineHeight: 1.5,
                      margin: '8px 0 12px 0',
                    }}>
                      {guide.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748b' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} />
                        {guide.readingTime}分
                      </span>
                      <span>•</span>
                      <span>{guide.publishedAt}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }} className="group-hover:bg-blue-100 transition-colors">
                    <ArrowRight size={20} style={{ color: '#64748b' }} className="group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#f8fafc', paddingTop: '40px', paddingBottom: '60px' }}>
          <div className="container mx-auto px-6" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
              すぐに使えるプロンプトをお探しですか？
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', marginBottom: '24px' }}>
              Promptaには、様々なシーンで使える高品質なプロンプトが揃っています。
            </p>
            <Link
              href="/all-prompts"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              className="hover:bg-blue-700"
            >
              プロンプト一覧を見る
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
