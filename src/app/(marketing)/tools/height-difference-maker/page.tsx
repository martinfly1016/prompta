import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { HeightDifferenceMaker } from '@/components/tools/HeightDifferenceMaker'

export const metadata: Metadata = {
  title: '身長差メーカー｜推しとの身長差AIプロンプトを無料作成・コピペ',
  description:
    '身長差メーカーで推しとの身長差、体格差、逆身長差、3人構図のAI画像生成プロンプトを無料作成。Stable Diffusion・Midjourney・ChatGPT画像生成向けの英語プロンプトとネガティブプロンプトをコピペできます。',
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/height-difference-maker`,
  },
  openGraph: {
    title: '身長差メーカー｜推しとの身長差AIプロンプトを無料作成・コピペ',
    description:
      '身長・体格・関係性・ポーズを選ぶだけで、身長差プロンプトとネガティブプロンプトを無料で作成してコピペできます。',
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
    a: '推しキャラやオリキャラの身長・体格・関係性・ポーズを選ぶだけで、Stable Diffusion・Midjourney・ChatGPT画像生成向けの英語プロンプトを無料作成してコピペできるツールです。',
  },
  {
    q: '体格差ツールとしても使えますか？',
    a: 'はい。モードを「体格差」に切り替えると、身長だけでなく肩幅・筋肉量・体格差を強調するキーワードを自動で追加します。',
  },
  {
    q: '生成したプロンプトはどのAIで使えますか？',
    a: 'Stable Diffusion、NovelAI、Midjourney、DALL-E、ChatGPT画像生成で使えます。Stable Diffusionではネガティブプロンプトも併用すると身長差が崩れにくくなります。',
  },
  {
    q: 'ChatGPT画像生成用の身長差プロンプトも作れますか？',
    a: 'はい。出力形式を「ChatGPT」に切り替えると、身長差、体格差、ポーズ、全身構図を自然な英語指示に変換できます。DALL-E 系の画像生成にも流用できます。',
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
                身長差メーカー｜AIプロンプトを無料作成
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                推しとの身長差、BL・百合・男女カップル、逆身長差、体格差、3 人並びの英語プロンプトを無料で作成できます。
                Stable Diffusion・Midjourney・ChatGPT画像生成向けの身長差プロンプトとネガティブプロンプトを、そのままコピペできます。
              </p>
            </div>

            <HeightDifferenceMaker />
          </div>
        </section>

        <section className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">身長差メーカーでできること</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              身長差メーカーは、身長差プロンプトをゼロから書く代わりに、身長・関係性・ポーズを選んでコピペ用の英語プロンプトを作る無料ツールです。
              「身長差メーカー」「身長差 AI」「身長差 メーカー AI」で探している場合は、まずここでベースを作り、必要に応じて下のガイドで細かく調整してください。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: '推しとの身長差',
                  body: '推しカップル、OC ペア、夢絵風の身長差プロンプトを、身長 cm と外見特徴から作成します。',
                },
                {
                  title: '体格差ツール',
                  body: '肩幅、筋肉量、横幅の差を出したい場合は「体格差」モードで body size difference を追加します。',
                },
                {
                  title: 'ChatGPT画像生成',
                  body: 'ChatGPT / DALL-E 系向けには、タグではなく自然な英語指示に変換して全身構図を明示します。',
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
                <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-t border-gray-100">
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
                href="/guides/oshi-height-difference-ai-guide"
                className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-sky-400 transition-colors"
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">推しとの身長差 AI の作り方</h3>
                <p className="text-sm text-gray-600">推しカップル、OC ペア、夢絵風の身長差プロンプトを短く作る方法。</p>
              </Link>
              <Link
                href="/guides/body-size-difference-prompt-guide"
                className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-sky-400 transition-colors"
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">体格差プロンプト集</h3>
                <p className="text-sm text-gray-600">筋肉量、肩幅、骨格、横幅の差を出すコピペ例とネガティブ。</p>
              </Link>
              <Link
                href="/guides/height-difference-illustration-composition-guide"
                className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-sky-400 transition-colors"
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">身長差イラスト構図テンプレート</h3>
                <p className="text-sm text-gray-600">見上げる、ハグ、壁ドン、3 人並びなど構図別テンプレート。</p>
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
