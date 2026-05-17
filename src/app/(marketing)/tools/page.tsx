import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getTools } from '@/lib/data'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'AIツール一覧 — 対応AI画像生成・テキスト生成ツール',
  description: 'Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-Eなど、プロンプタが対応するAIツールの一覧。',
  alternates: { canonical: `${SITE_CONFIG.url}/tools` },
}

export default async function ToolsPage() {
  const tools = await getTools()

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'AIツール', href: '/tools' }]} />
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">AI ツール一覧</h1>
            <p className="text-gray-600 leading-relaxed">写真アップロードで使える AI 診断ツールから、各 AI モデル向けプロンプト集まで網羅しています。</p>
          </div>

          {/* Featured interactive tools */}
          <div className="mb-12">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">インタラクティブ AI ツール</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Link
                href="/tools/personal-color-analysis"
                className="group block p-6 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 rounded-2xl border border-sky-100 hover:border-sky-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="text-5xl shrink-0">🎨</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-700 transition-colors">
                        パーソナルカラー診断 AI
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      写真から 4 シーズン判定 + 似合う 16 色 + 避けたい色を診断。Gemini 2.5 Flash、Google ログインで 3 回無料。
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 bg-white rounded-full border border-gray-200 text-gray-700">Google ログインで 3 回無料</span>
                      <span className="ml-auto inline-flex items-center gap-1 text-sky-600 font-medium">診断する →</span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/tools/hair-color-diagnosis"
                className="group block p-6 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl border border-violet-100 hover:border-violet-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="text-5xl shrink-0">💇</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
                        似合う髪色診断 AI
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">NEW</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      写真からヘアカラー 5 提案 + Before/After シミュレーション画像。Gemini 2.5 Flash Image、Google ログインで 3 回無料。
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 bg-white rounded-full border border-gray-200 text-gray-700">Before/After 付き</span>
                      <span className="px-2 py-0.5 bg-white rounded-full border border-gray-200 text-gray-700">Google ログインで 3 回無料</span>
                      <span className="ml-auto inline-flex items-center gap-1 text-violet-600 font-medium">診断する →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">AI モデル別プロンプト集</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{tool.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">{tool.name}</h2>
                    <p className="text-sm text-gray-500 mb-1">{tool.nameJa}</p>
                    <span className="text-xs text-sky-600 font-medium">{tool.promptCount} プロンプト</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">{tool.description}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-sky-600">プロンプトを見る →</span>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
