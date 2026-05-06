import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { HairColorQuotaGate } from '@/components/tools/HairColorQuotaGate'

export const metadata: Metadata = {
  title: '似合う髪色診断 AI — 写真からヘアカラー提案 + Before/After',
  description:
    '写真をアップロードするだけで AI があなたに似合う髪色を 5 つ提案し、Gemini 2.5 Flash Image で Before/After のシミュレーション画像を生成。パーソナルカラーに基づいて安心の定番・トレンド・個性派から選べます。無料・登録不要。',
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/hair-color-diagnosis`,
  },
  openGraph: {
    title: '似合う髪色診断 AI — 写真からヘアカラー提案 + Before/After',
    description:
      '写真をアップロードするだけで AI があなたに似合う髪色を 5 つ提案し、Gemini 2.5 Flash Image で Before/After を生成。',
    type: 'website',
    locale: 'ja_JP',
  },
}

const SAMPLE_CANDIDATES = [
  {
    hex: '#3D2914',
    nameJa: 'ダークブラウン',
    nameEn: 'Dark Brown',
    category: 'safe',
    catLabel: '🌿 安心の定番',
    reasonJa: '髪のうるおいを引き立てる定番カラー。落ち着いた印象でオフィスにも◎',
  },
  {
    hex: '#5C4232',
    nameJa: 'ナチュラルブラウン',
    nameEn: 'Natural Brown',
    category: 'safe',
    catLabel: '🌿 安心の定番',
    reasonJa: '肌色を明るく見せる王道ブラウン。ダメージも目立ちにくい',
  },
  {
    hex: '#A89373',
    nameJa: 'シアーベージュ',
    nameEn: 'Sheer Beige',
    category: 'trend',
    catLabel: '✨ 今っぽいトレンド',
    reasonJa: 'ブリーチなしで再現できる透け感ベージュ。今シーズン人気',
  },
  {
    hex: '#7A6B5C',
    nameJa: 'アッシュグレージュ',
    nameEn: 'Ash Greige',
    category: 'trend',
    catLabel: '✨ 今っぽいトレンド',
    reasonJa: 'ニュアンス感のある外国人風カラー。クール系の方に',
  },
  {
    hex: '#B85C3D',
    nameJa: 'カッパーレッド',
    nameEn: 'Copper Red',
    category: 'bold',
    catLabel: '🔥 個性派チャレンジ',
    reasonJa: '暖色系の血色感あるカラー。チャレンジしたい方に',
  },
]

const FAQ = [
  {
    q: '似合う髪色診断とは何ですか？',
    a: '肌のアンダートーン（暖み／青み）、瞳の色、現在の髪色、全体のコントラストから、その人に最も似合う髪色を判定する手法です。パーソナルカラー診断と密接に関連しており、4 シーズン分類（春/夏/秋/冬）と暖冷ベースを軸に、サロンで実際に再現可能な日本のトレンドカラーから 5 候補を提案します。',
  },
  {
    q: 'Before / After のシミュレーション画像はどう作られますか？',
    a: 'Google の最新画像編集モデル「Gemini 2.5 Flash Image（通称 Nano Banana）」が、アップロードされた写真の髪部分のみを指定したカラーに置き換えます。顔・服装・背景・髪型（長さ・カット）はすべて元のまま保持します。生成には 15-25 秒ほどかかります。',
  },
  {
    q: '料金はどうなっていますか？',
    a: '無料試用：本ツールにつき 3 回まで（リセットなし）。それ以上は ¥300 / 10 回パックを Stripe で購入できます。クレジットは「パーソナルカラー診断」ツールと共通でご利用いただけます。1 回の診断で「5 候補の提示 + 一番おすすめのカラーで Before/After」が含まれます。別の候補を試す場合は 1 回ずつ追加でクレジットを消費します。',
  },
  {
    q: '別の候補もシミュレーションできますか？',
    a: 'はい、5 候補それぞれに「この色を試す」ボタンがあります。タップするとその色で Before/After を再生成します。1 タップ＝ 1 クレジット消費です。',
  },
  {
    q: '写真の撮り方のコツは？',
    a: '①自然光（窓際など）で②正面を向き③髪全体が画面に収まる④フィルターをかけない — の 4 条件を満たすと精度が上がります。長髪の方は髪を耳の後ろに流さず、ある程度顔回りに見える角度がおすすめです。',
  },
  {
    q: '写真データはどう扱われますか？',
    a: 'アップロードされた写真は診断のために Gemini API に送信され、診断完了後はサーバーから削除されます。当サイトでは保存しません。Before/After で生成された画像は一時的にブラウザに保持されますが、ページを閉じれば破棄されます。',
  },
  {
    q: 'プロのカラリストの代替になりますか？',
    a: 'なりません。AI 診断は照明・撮影条件に左右されるため、参考値としてご利用ください。実際にカラーリングする前には、必ず信頼できる美容師にご相談ください。本ツールは「サロン来店前のイメトレ」「セルフカラーの方向性決め」「美容師さんへのオーダー時の参考画像づくり」に最適です。',
  },
]

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const TOOL_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '似合う髪色診断 AI — Hair Color Diagnosis',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  inLanguage: 'ja',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
    description: '無料試用 3 回 + ¥300/10 回パック',
  },
  aggregateRating: undefined,
}

const RELATED_TOOLS_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      url: `${SITE_CONFIG.url}/tools/hair-color-diagnosis`,
      name: '似合う髪色診断 AI',
    },
    {
      '@type': 'ListItem',
      position: 2,
      url: `${SITE_CONFIG.url}/tools/personal-color-analysis`,
      name: 'パーソナルカラー診断 AI',
    },
  ],
}

export default function HairColorDiagnosisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TOOL_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RELATED_TOOLS_LD) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'AIツール', href: '/tools' },
            { name: '似合う髪色診断', href: '/tools/hair-color-diagnosis' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-violet-50 to-white py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            似合う<span className="text-violet-600">髪色診断 AI</span>
            <span className="block text-base sm:text-lg lg:text-xl font-medium text-gray-600 mt-2">
              写真からヘアカラー 5 提案 + Before/After シミュレーション
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-5">
            写真をアップロードするだけで、AI があなたのパーソナルカラーに合う髪色を 5 つ提案し、Gemini 2.5 Flash
            Image が実際に染めたらどう見えるかを Before/After でシミュレーションします。
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ 無料試用 3 回
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ 登録不要
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ 写真は保存しません
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ Gemini 2.5 Flash Image 搭載
            </span>
          </div>
        </div>
      </section>

      {/* Cross-link to personal-color tool */}
      <section className="py-2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tools/personal-color-analysis"
            className="block bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl px-4 py-3 hover:border-sky-300 transition-all"
          >
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="text-base mr-1.5">💡</span>
              <strong className="text-sky-700">全身のパーソナルカラー</strong>
              （服・口紅・アクセサリー含む 16 色パレット）から診断したい方は
              <span className="text-sky-600 font-semibold underline ml-1">パーソナルカラー診断 AI →</span>
            </p>
          </Link>
        </div>
      </section>

      {/* Upload section */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border-2 border-dashed border-violet-300 p-8 sm:p-12 text-center hover:border-violet-400 transition-colors">
            <div className="text-5xl mb-4">💇</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              写真をアップロードして髪色診断
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              JPG / PNG / WebP（最大 8MB）／ 顔と髪がはっきり写った正面写真を推奨
            </p>
            <HairColorQuotaGate />
          </div>
        </div>
      </section>

      {/* Render target for live result */}
      <div
        id="hair-color-result-portal"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      />

      {/* How it works */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            使い方は 3 ステップ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                n: 1,
                title: '写真をアップロード',
                desc: '自然光・正面・髪全体が見える写真がベスト',
                icon: '📷',
              },
              {
                n: 2,
                title: 'AI が分析・5 候補提案',
                desc: '肌のアンダートーン・瞳・現在の髪色を Gemini が解析',
                icon: '🎨',
              },
              {
                n: 3,
                title: 'Before/After を確認',
                desc: 'おすすめカラーで実際の見え方を画像生成',
                icon: '✨',
              },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-violet-600 text-white text-sm font-bold rounded-full shrink-0">
                    {s.n}
                  </span>
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample candidates preview */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-full border border-amber-200 mb-2">
              サンプル提案プレビュー
            </span>
            <h2 className="text-xl font-bold text-gray-900">こんな 5 つの髪色が提案されます</h2>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">
              「安心の定番 × 2」「今っぽいトレンド × 2」「個性派チャレンジ × 1」のバランスで、肌色・瞳・現状髪色から最適な
              5 色を選びます。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_CANDIDATES.map((c) => (
              <div
                key={c.hex}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div
                  className="h-20 w-full relative"
                  style={{ backgroundColor: c.hex }}
                  aria-label={`${c.nameJa} ${c.hex}`}
                >
                  <span className="absolute top-1.5 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/85 text-gray-700 shadow-sm">
                    {c.catLabel}
                  </span>
                  <span className="absolute top-1.5 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/35 text-white">
                    {c.hex.toUpperCase()}
                  </span>
                </div>
                <div className="p-3">
                  <div className="text-sm font-bold text-gray-900 mb-0.5">{c.nameJa}</div>
                  <div className="text-[11px] text-gray-500 mb-2">{c.nameEn}</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{c.reasonJa}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">よくある質問</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-200 open:border-violet-300 transition-all"
              >
                <summary className="cursor-pointer list-none p-5 flex items-start gap-3">
                  <span className="text-violet-600 font-bold shrink-0">Q{i + 1}.</span>
                  <span className="flex-1 text-sm font-semibold text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5 pl-12 text-sm text-gray-700 leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600 mb-4">他の AI 診断・写真加工ツール</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tools/personal-color-analysis"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 shadow-sm transition-all"
            >
              パーソナルカラー診断 AI →
            </Link>
            <Link
              href="/prompts/photo-edit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 shadow-sm transition-all"
            >
              写真加工プロンプト一覧 →
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-violet-300 hover:text-violet-600 shadow-sm transition-all"
            >
              他の AI ツール
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
