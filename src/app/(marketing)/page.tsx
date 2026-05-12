import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getTools, getCategories, getFeaturedPrompts, getLatestPrompts, getGuides } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import { generateOrganizationSchema, generateFaqSchema } from '@/lib/schema'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'AIプロンプト一覧｜コピペで使える500+のプロンプト集 - Prompta',
  description: 'Stable Diffusion・Midjourney・ChatGPT・Claude・Gemini・DALL-E対応の高品質AIプロンプトを500+件、無料で一覧公開。画像生成・文章作成・写真加工のテンプレートをカテゴリ別にコピペで使えます。',
  alternates: { canonical: SITE_CONFIG.url },
  openGraph: {
    title: 'AIプロンプト一覧｜コピペで使える500+のプロンプト集',
    description: 'Stable Diffusion・Midjourney・ChatGPT・Claude・Gemini・DALL-E対応の高品質AIプロンプトをカテゴリ別に無料公開。',
  },
  twitter: {
    title: 'AIプロンプト一覧｜コピペで使える500+のプロンプト集',
    description: 'Stable Diffusion・Midjourney・ChatGPT・Claude・Gemini・DALL-E対応の高品質AIプロンプトをカテゴリ別に無料公開。',
  },
}

const HOME_FAQ: Array<{ question: string; answer: string }> = [
  {
    question: 'プロンプトとは何ですか？',
    answer: 'プロンプト（Prompt）とは、ChatGPTやStable DiffusionなどのAIに対して入力する「指示文」のことです。生成したい内容や回答してほしいことをテキストで具体的に伝える役割を持ち、プロンプトの質がAIの出力結果を大きく左右します。詳細は「プロンプトとは？AI初心者向け完全ガイド」で解説しています。',
  },
  {
    question: 'Promptaのプロンプトはどのツールで使えますか？',
    answer: 'Stable Diffusion・Midjourney・ChatGPT・Claude・Gemini・DALL-Eの6つの主要AIツールに対応しています。画像生成系プロンプト（呪文）と文章生成系プロンプト（テンプレート）を両方カバーしており、各プロンプトに対応ツールを明記しています。',
  },
  {
    question: 'プロンプトの書き方にコツはありますか？',
    answer: '効果的なプロンプトには、(1) 具体的かつ明確な指示、(2) ロール設定（「あなたは〇〇の専門家です」）、(3) 出力形式の指定、(4) 制約条件（文字数・トーン）の指定、(5) 期待する出力例の提示（Few-Shot）の5つの要素が重要です。詳しいテクニックはガイドを参照してください。',
  },
  {
    question: 'プロンプトは日本語で書けますか？',
    answer: 'ChatGPTやClaudeなどの文章生成AIは日本語プロンプトに完全対応しています。Stable DiffusionやMidjourneyなどの画像生成AIは英語が推奨されますが、DALL-E 3やGeminiは日本語も理解できます。Promptaでは日本語ユーザー向けに、日本語の解説と英語のプロンプト本文を両方掲載しています。',
  },
  {
    question: 'Promptaのプロンプトは無料で使えますか？',
    answer: 'はい、サイト上で公開している500+件のプロンプトはすべて無料でコピー・利用可能です。商用利用も自由ですが、生成された画像・文章の利用条件は各AIツールの利用規約に従ってください。',
  },
  {
    question: 'プロンプト集と他サイトの違いは何ですか？',
    answer: 'Promptaは日本語ユーザー向けに最適化された画像系・文章系プロンプトの統合カタログです。各プロンプトに日本語の解説・カテゴリ・対応ツール・サンプル画像を整備し、写真加工系（似合う髪色診断・パーソナルカラー診断など）はAIツールとしてその場で試せる仕組みも提供しています。',
  },
]

export default async function HomePage() {
  const [tools, categories, featured, latest, guides] = await Promise.all([
    getTools(),
    getCategories(),
    getFeaturedPrompts(12),
    getLatestPrompts(12),
    getGuides(),
  ])

  const orgSchema = generateOrganizationSchema({
    baseUrl: SITE_CONFIG.url,
    siteName: SITE_CONFIG.nameEn,
  })
  const faqSchema = generateFaqSchema(HOME_FAQ)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero — compact */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            <span className="text-sky-600">AIプロンプト一覧</span>｜コピペで使える500+のプロンプト集
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-5">
            Stable Diffusion・Midjourney・ChatGPT・Claude・Gemini・DALL-E対応の高品質プロンプトをカテゴリ別に無料公開。画像生成から写真加工・文章作成まで、コピペで即実践できます。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/prompts" className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 shadow-sm transition-all">
              プロンプトを探す →
            </Link>
            <Link href="/guides" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-sky-300 hover:text-sky-600 shadow-sm transition-all">
              使い方ガイド
            </Link>
          </div>
        </div>
      </section>

      {/* Tools + Categories — single compact row */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tools as inline pills */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">ツール</span>
            {tools.map(tool => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-full border border-gray-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all">
                <span>{tool.icon}</span>
                {tool.name}
                {tool.promptCount > 0 && <span className="text-sky-600 font-semibold">{tool.promptCount}</span>}
              </Link>
            ))}
          </div>
          {/* Categories as inline pills — hide empty ones */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">カテゴリ</span>
            {categories.map(cat => (
              <Link key={cat.slug} href={`/prompts/${cat.slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-full border border-gray-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all">
                <span>{cat.icon}</span>
                {cat.name}
                {cat.promptCount > 0 && <span className="text-sky-600 font-semibold">{cat.promptCount}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Prompts — primary content, show first */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">最新のプロンプト</h2>
            <Link href="/prompts" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
              すべて見る →
            </Link>
          </div>
          <PromptGrid prompts={latest} priorityCount={1} />
        </div>
      </section>

      {/* Featured Prompts */}
      {featured.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">おすすめプロンプト</h2>
              <Link href="/prompts" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
                すべて見る →
              </Link>
            </div>
            <PromptGrid prompts={featured} />
          </div>
        </section>
      )}

      {/* Guides */}
      {guides.length > 0 && (
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">使い方ガイド</h2>
              <Link href="/guides" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guides.slice(0, 3).map(guide => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all duration-200">
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-sky-600 transition-colors mb-1.5 line-clamp-2">{guide.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ — answers head queries (プロンプトとは / 書き方 / コツ / 無料か) */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">よくある質問</h2>
          <div className="space-y-4">
            {HOME_FAQ.map((item, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 open:border-sky-300 open:bg-sky-50/30">
                <summary className="cursor-pointer p-4 font-semibold text-sm sm:text-base text-gray-900 group-open:text-sky-700 list-none flex items-start justify-between gap-2">
                  <span>{item.question}</span>
                  <span className="text-sky-600 text-xl leading-none shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">{item.answer}</div>
              </details>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/guides/what-is-prompt" className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
              プロンプトの基礎をもっと学ぶ →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-sky-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">AIの可能性を最大限に引き出そう</h2>
          <p className="text-sm text-sky-100 mb-5">最新のAIツール向けプロンプトを定期追加中。</p>
          <Link href="/prompts" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-sky-600 text-sm font-semibold rounded-lg hover:bg-sky-50 shadow-md transition-all">
            プロンプトを探す →
          </Link>
        </div>
      </section>
    </>
  )
}
