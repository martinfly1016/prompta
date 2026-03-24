import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG, TOOLS } from '@/lib/constants'
import { getGlossaryGrouped, termToId, GLOSSARY_TERMS } from '@/lib/glossary-data'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'AI用語集 — 生成AI・プロンプト用語辞典',
  description: `生成AI・プロンプトエンジニアリングに関する${GLOSSARY_TERMS.length}以上の専門用語を日本語でわかりやすく解説。Stable Diffusion、Midjourney、ChatGPT、Claudeなど主要AIツールの用語を網羅。`,
  alternates: { canonical: `${SITE_CONFIG.url}/glossary` },
  openGraph: {
    title: 'AI用語集 — 生成AI・プロンプト用語辞典',
    description: `生成AIに関する${GLOSSARY_TERMS.length}以上の専門用語を日本語で解説。`,
    images: [{
      url: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent('AI用語集 — 生成AI・プロンプト用語辞典')}&type=guide`,
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI用語集 — 生成AI・プロンプト用語辞典',
    description: `生成AIに関する${GLOSSARY_TERMS.length}以上の専門用語を日本語で解説。`,
  },
}

export default function GlossaryPage() {
  const groups = getGlossaryGrouped()
  const toolMap = Object.fromEntries(TOOLS.map(t => [t.slug, t]))

  // JSON-LD DefinedTermSet
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'AI用語集',
    description: '生成AI・プロンプトエンジニアリングに関する専門用語辞典',
    url: `${SITE_CONFIG.url}/glossary`,
    inLanguage: 'ja-JP',
    hasDefinedTerm: GLOSSARY_TERMS.map(t => ({
      '@type': 'DefinedTerm',
      name: t.term,
      alternateName: t.termEn,
      description: t.definition,
      url: `${SITE_CONFIG.url}/glossary#${termToId(t.term)}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'AI用語集', href: '/glossary' }]} />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">AI用語集</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            生成AI・プロンプトエンジニアリングに関する{GLOSSARY_TERMS.length}以上の専門用語を日本語でわかりやすく解説。
            Stable Diffusion、Midjourney、ChatGPT、Claudeなど主要AIツールの用語を網羅しています。
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="inline-flex items-center px-3 py-1 bg-sky-50 text-sky-700 font-medium rounded-full">{GLOSSARY_TERMS.length} 用語</span>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            {groups.map(g => (
              <a
                key={g.group}
                href={`#${g.group}`}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors shrink-0"
              >
                {g.group}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {groups.map(g => (
            <div key={g.group} id={g.group} className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-sky-500">
                {g.group}
              </h2>
              <div className="space-y-6">
                {g.terms.map(term => (
                  <div
                    key={term.term}
                    id={termToId(term.term)}
                    className="scroll-mt-32 p-5 bg-white rounded-xl border border-gray-200 hover:border-sky-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{term.term}</h3>
                      <span className="text-sm text-gray-400 font-mono">{term.termEn}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">{term.definition}</p>
                    {term.relatedTools && term.relatedTools.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        {term.relatedTools.map(slug => {
                          const tool = toolMap[slug]
                          if (!tool) return null
                          return (
                            <Link
                              key={slug}
                              href={`/tools/${slug}`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md text-white"
                              style={{ backgroundColor: tool.color }}
                            >
                              {tool.icon} {tool.name}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">用語を実践してみましょう</h2>
          <p className="text-gray-600 mb-6">学んだ用語を活かして、高品質なAIプロンプトを使ってみてください。</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white text-sm font-medium rounded-xl hover:bg-sky-700 transition-colors"
            >
              プロンプト一覧を見る
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              ガイドを読む
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
