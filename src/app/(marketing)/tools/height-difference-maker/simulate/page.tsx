import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { HeightDifferenceSimulator } from '@/components/tools/HeightDifferenceSimulator'

const PAGE_TITLE = '身長差シミュレーター｜体格差の構図を確認して写真から生成'
const PAGE_DESCRIPTION =
  '二人の身長・体型・ポーズを動かして体格差と身長差の構図を確認し、確定した設定のまま写真からAI画像を生成します。推しカップル、見上げる構図、壁ドンに対応。'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/height-difference-maker/simulate`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_CONFIG.url}/tools/height-difference-maker/simulate`,
  },
}

export default function HeightDifferenceSimulatorPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'AIツール', href: '/tools' },
            { name: '身長差メーカー', href: '/tools/height-difference-maker' },
            { name: 'シミュレーター', href: '/tools/height-difference-maker/simulate' },
          ]}
        />
      </div>

      <section className="bg-gray-50 border-t border-gray-100 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-6">
            <p className="text-sm font-semibold text-sky-700 mb-2">体格差・身長差の構図を見てから生成</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              身長差シミュレーター
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              二人の身長と体型を動かすと、同じ床の上の並びがすぐ変わります。構図を確定してから写真を添付すると、その身長差・ポーズ・フレームを指示に含めて画像を生成します。
            </p>
          </div>
          <HeightDifferenceSimulator />
        </div>
      </section>

      <section className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">プレビューと生成について</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 leading-relaxed">
            <li>プレビューは SVG のシルエットです。アップロードした顔はプレビューには出ません。</li>
            <li>確定後の生成は、髪色シミュレーションと同じ Nano Banana 2.1 画像 API と共通ポイントです。1回1ポイント。ログインすると全ツール共通で3回分が付きます。</li>
            <li>写真は1枚でも2枚でも送れます。無い方の人物は見た目メモから生成します。</li>
            <li>写真と生成結果はブラウザの応答にだけ返します。公開プロンプト集や公開ストレージには保存しません。</li>
            <li>身長の cm・差・ポーズは生成指示に固定します。モデルがセンチを完全に守るとは限りません。</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            コピペ用の英語プロンプトだけ欲しい場合は <Link href="/tools/height-difference-maker" className="text-sky-700 font-medium hover:underline">身長差メーカー</Link>、構図の解説は <Link href="/guides/height-difference-illustration-composition-guide" className="text-sky-700 font-medium hover:underline">身長差イラスト構図テンプレート</Link> を使ってください。
          </p>
        </div>
      </section>
    </>
  )
}
