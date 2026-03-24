import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { TOOL_COMPARISONS, getComparisonsByType, getFeatureKeys } from '@/lib/comparison-data'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'AIツール比較 — Stable Diffusion vs Midjourney vs DALL-E / ChatGPT vs Claude vs Gemini',
  description: '主要AIツールを徹底比較。画像生成AI（Stable Diffusion、Midjourney、DALL-E）とテキスト生成AI（ChatGPT、Claude、Gemini）の機能・料金・特徴を一覧表で比較。',
  alternates: { canonical: `${SITE_CONFIG.url}/compare` },
  openGraph: {
    title: 'AIツール比較 — 主要AI徹底比較',
    description: '画像生成AI・テキスト生成AIの機能・料金・特徴を一覧表で比較。',
    images: [{
      url: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent('AIツール比較 — 主要AI徹底比較')}&type=tool`,
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIツール比較 — 主要AI徹底比較',
    description: '画像生成AI・テキスト生成AIの機能・料金・特徴を一覧表で比較。',
  },
}

function FeatureLevel({ level }: { level: string }) {
  const colors: Record<string, string> = {
    '◎': 'text-green-600 bg-green-50',
    '○': 'text-sky-600 bg-sky-50',
    '△': 'text-amber-600 bg-amber-50',
    '×': 'text-gray-400 bg-gray-50',
  }
  const symbol = level.charAt(0)
  const colorClass = colors[symbol] || 'text-gray-600 bg-gray-50'

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}>
      {level}
    </span>
  )
}

export default function ComparePage() {
  const imageTools = getComparisonsByType('image')
  const textTools = getComparisonsByType('text')
  const imageFeatures = getFeatureKeys(imageTools)
  const textFeatures = getFeatureKeys(textTools)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'AIツール比較', href: '/compare' }]} />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">AIツール比較</h1>
          <p className="text-gray-600 leading-relaxed">
            主要なAIツールの機能・料金・特徴を一覧表で徹底比較。
            画像生成AI（Stable Diffusion、Midjourney、DALL-E）とテキスト生成AI（ChatGPT、Claude、Gemini）のそれぞれの強みと弱みを理解し、最適なツールを選びましょう。
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-3">
            <a href="#image-gen" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
              🎨 画像生成AI比較
            </a>
            <a href="#text-gen" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
              💬 テキスト生成AI比較
            </a>
          </div>
        </div>
      </section>

      {/* Image Gen Comparison */}
      <section id="image-gen" className="py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">画像生成AI比較</h2>
          <p className="text-gray-500 text-sm mb-8">Stable Diffusion vs Midjourney vs DALL-E 3</p>

          {/* Overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {imageTools.map(tool => (
              <div key={tool.slug} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{tool.name}</h3>
                    <span className="text-sm font-medium" style={{ color: tool.color }}>{tool.pricing}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4">{tool.pricingDetail}</p>
                <p className="text-sm text-gray-600 mb-4 font-medium">{tool.bestFor}</p>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-green-700 mb-1.5">強み</p>
                  <ul className="space-y-1">
                    {tool.strengths.slice(0, 3).map((s, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-green-500 mt-0.5 shrink-0">+</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-red-700 mb-1.5">弱み</p>
                  <ul className="space-y-1">
                    {tool.weaknesses.slice(0, 2).map((w, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5 shrink-0">-</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center text-xs font-medium text-sky-600 hover:text-sky-700"
                >
                  {tool.name}のプロンプトを見る →
                </Link>
              </div>
            ))}
          </div>

          {/* Feature matrix */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">機能比較表</h3>
              <p className="text-xs text-gray-500 mt-1">◎ 優秀 ○ 対応 △ 制限あり × 非対応</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-50 min-w-[200px]">機能</th>
                    {imageTools.map(tool => (
                      <th key={tool.slug} className="text-center px-4 py-3 text-sm font-semibold min-w-[140px]" style={{ color: tool.color }}>
                        {tool.icon} {tool.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {imageFeatures.map((feature, i) => (
                    <tr key={feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-2.5 text-sm text-gray-700 font-medium">{feature}</td>
                      {imageTools.map(tool => (
                        <td key={tool.slug} className="text-center px-4 py-2.5">
                          <FeatureLevel level={tool.features[feature]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Text Gen Comparison */}
      <section id="text-gen" className="py-12 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">テキスト生成AI比較</h2>
          <p className="text-gray-500 text-sm mb-8">ChatGPT vs Claude vs Gemini</p>

          {/* Overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {textTools.map(tool => (
              <div key={tool.slug} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{tool.name}</h3>
                    <span className="text-sm font-medium" style={{ color: tool.color }}>{tool.pricing}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4">{tool.pricingDetail}</p>
                <p className="text-sm text-gray-600 mb-4 font-medium">{tool.bestFor}</p>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-green-700 mb-1.5">強み</p>
                  <ul className="space-y-1">
                    {tool.strengths.slice(0, 3).map((s, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-green-500 mt-0.5 shrink-0">+</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-red-700 mb-1.5">弱み</p>
                  <ul className="space-y-1">
                    {tool.weaknesses.slice(0, 2).map((w, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5 shrink-0">-</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center text-xs font-medium text-sky-600 hover:text-sky-700"
                >
                  {tool.name}のプロンプトを見る →
                </Link>
              </div>
            ))}
          </div>

          {/* Feature matrix */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">機能比較表</h3>
              <p className="text-xs text-gray-500 mt-1">◎ 優秀 ○ 対応 △ 制限あり × 非対応</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-50 min-w-[200px]">機能</th>
                    {textTools.map(tool => (
                      <th key={tool.slug} className="text-center px-4 py-3 text-sm font-semibold min-w-[140px]" style={{ color: tool.color }}>
                        {tool.icon} {tool.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {textFeatures.map((feature, i) => (
                    <tr key={feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-2.5 text-sm text-gray-700 font-medium">{feature}</td>
                      {textTools.map(tool => (
                        <td key={tool.slug} className="text-center px-4 py-2.5">
                          <FeatureLevel level={tool.features[feature]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How to choose */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">目的別おすすめツール</h2>
          <div className="space-y-4">
            {[
              { purpose: 'アニメ・イラスト制作', recommend: 'Stable Diffusion', reason: 'カスタムモデル（AnimagineXL等）とLoRAで、アニメスタイルの自由度が最も高い。', tool: 'stable-diffusion' },
              { purpose: '商業デザイン・広告素材', recommend: 'Midjourney', reason: '最小限のプロンプトでプロフェッショナルな品質。クライアントワークに最適。', tool: 'midjourney' },
              { purpose: 'ブログ・SNS用画像', recommend: 'DALL-E 3', reason: 'ChatGPTから日本語で指示するだけで高品質な画像を生成。テキスト描画も正確。', tool: 'dall-e' },
              { purpose: '文章作成・ビジネス文書', recommend: 'ChatGPT', reason: 'プラグインとGPTsの拡張性が高く、汎用的なビジネスタスクに強い。', tool: 'chatgpt' },
              { purpose: 'コーディング・長文分析', recommend: 'Claude', reason: '200Kトークンの長文処理と高精度なコード生成。指示への忠実度が高い。', tool: 'claude' },
              { purpose: 'Google連携・最新情報', recommend: 'Gemini', reason: 'Gmail/Docs/Drive等との統合が深く、最新のWeb情報にアクセスしやすい。', tool: 'gemini' },
            ].map(item => (
              <div key={item.purpose} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="shrink-0 w-32">
                  <p className="text-sm font-semibold text-gray-900">{item.purpose}</p>
                </div>
                <div className="flex-1">
                  <Link href={`/tools/${item.tool}`} className="text-sm font-bold text-sky-600 hover:text-sky-700">
                    {item.recommend} →
                  </Link>
                  <p className="text-xs text-gray-600 mt-1">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">各ツールのプロンプトを試してみましょう</h2>
          <p className="text-gray-600 mb-6">ツールの特性に合った高品質なプロンプトをすぐに使えます。</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TOOL_COMPARISONS.map(tool => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-xl hover:opacity-90 transition-opacity"
                style={{ backgroundColor: tool.color }}
              >
                {tool.icon} {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
