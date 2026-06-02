import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { HeightDifferenceMaker } from '@/components/tools/HeightDifferenceMaker'

export const metadata: Metadata = {
  title: '身長差メーカー｜推しとの身長差・体格差AIプロンプトを作成',
  description:
    '身長差メーカー。推しとの身長差、体格差、逆身長差、3人構図のAI画像生成プロンプトを入力だけで作成。Stable Diffusion・Midjourney・ChatGPT画像生成に対応、ネガティブプロンプトも自動生成。',
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/height-difference-maker`,
  },
  openGraph: {
    title: '身長差メーカー｜推しとの身長差・体格差AIプロンプトを作成',
    description:
      '身長・体格・関係性・ポーズを選ぶだけで、身長差プロンプトとネガティブプロンプトを自動生成。',
    type: 'website',
    locale: 'ja_JP',
  },
}

const TOOL_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '身長差メーカー',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  inLanguage: 'ja',
  url: `${SITE_CONFIG.url}/tools/height-difference-maker`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
}

const FAQ = [
  {
    q: '身長差メーカーとは何ですか？',
    a: '推しキャラやオリキャラの身長・体格・関係性・ポーズを選ぶだけで、Stable Diffusion・Midjourney・ChatGPT画像生成向けの英語プロンプトを作成できる無料ツールです。',
  },
  {
    q: '体格差ツールとしても使えますか？',
    a: 'はい。モードを「体格差」に切り替えると、身長だけでなく肩幅・筋肉量・体格差を強調するキーワードを自動で追加します。',
  },
  {
    q: '生成したプロンプトはどのAIで使えますか？',
    a: 'Stable Diffusion、NovelAI、Midjourney、DALL-E、ChatGPT画像生成で使えます。Stable Diffusionではネガティブプロンプトも併用すると身長差が崩れにくくなります。',
  },
]

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function HeightDifferenceMakerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(TOOL_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'AIツール', href: '/tools' },
            { name: '身長差メーカー', href: '/tools/height-difference-maker' },
          ]}
        />
      </div>

      <main className="bg-gray-50 border-t border-gray-100">
        <section className="py-8 lg:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-6">
              <p className="text-sm font-semibold text-sky-700 mb-2">身長差・体格差プロンプト生成</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
                身長差メーカー
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                推しとの身長差、BL・百合・男女カップル、逆身長差、体格差、3 人並びの英語プロンプトを作成できます。
                Stable Diffusion 用のネガティブプロンプトも同時に出力します。
              </p>
            </div>

            <HeightDifferenceMaker />
          </div>
        </section>

        <section className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">身長差プロンプトを安定させるコツ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: '人数を必ず固定する',
                  body: '2girls、2boys、1boy and 1girl、3 characters のように人数を先頭に置くと、単体化や人数崩れを防ぎやすくなります。',
                },
                {
                  title: '差分キーワードを重ねる',
                  body: 'height difference、tall and short、size difference を組み合わせ、必要に応じて (height difference:1.35) のように重み付けします。',
                },
                {
                  title: '同身長を除外する',
                  body: 'same height、equal height、identical body proportions をネガティブに入れると、2 人の身長が揃う失敗を減らせます。',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">詳しい解説</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/guides/height-difference-pair-prompt"
                className="block rounded-lg border border-sky-200 bg-white p-4 hover:border-sky-400 transition-colors"
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">身長差プロンプトのやり方・作り方完全ガイド</h3>
                <p className="text-sm text-gray-600">推しとの身長差、体格差、逆身長差、ControlNet、失敗対策をまとめています。</p>
              </Link>
              <Link
                href="/tag/%E8%BA%AB%E9%95%B7%E5%B7%AE"
                className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-sky-400 transition-colors"
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">身長差プロンプト集</h3>
                <p className="text-sm text-gray-600">BL・百合・男女・ファンタジーなど、画像付きの実例プロンプトを確認できます。</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">よくある質問</h2>
            <div className="space-y-3">
              {FAQ.map((item) => (
                <div key={item.q} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Q. {item.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">A. {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
