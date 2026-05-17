import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { HairColorQuotaGate } from '@/components/tools/HairColorQuotaGate'

export const metadata: Metadata = {
  title: '似合う髪色診断 AI — 写真からヘアカラー提案 + Before/After',
  description:
    '自分に似合う髪色が分からない？写真 1 枚で AI が髪色 5 候補を自動提案し、Gemini 2.5 Flash Image で Before/After を生成。従来の髪色シミュレーターと違い、パーソナルカラー・瞳・肌色から判定する AI 髪色診断です。Google ログインで 3 回無料。',
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
  {
    q: '髪色 AI 診断と普通の髪色シミュレーターは何が違いますか？',
    a: '従来の髪色シミュレーターは「自分で色を選んでプレビュー」する受動的なツールです。本ツールは AI が肌色・瞳・パーソナルカラーから「あなたに似合う色」を自動判定し、その候補で Before/After を生成する点が大きく違います。色選びに迷う方ほど効果を実感しやすく、サロン来店前のイメージトレーニングとして特に好評です。Gemini 2.5 Flash Image 搭載で実際に染めたような写実的なシミュレーションが可能です。',
  },
  {
    q: '自分に似合う髪色を見つけるコツは何ですか？',
    a: 'まず①パーソナルカラー（春/夏/秋/冬）を把握する、②現在の髪色が暖色系か寒色系かを認識する、③瞳の色とのコントラスト（メリハリ）を考慮する、の 3 ステップが基本です。本ツールはこれら全てを AI で自動判定するため、迷う必要はありません。アップロード写真を撮る際は「自然光・正面・素顔（メイク薄め）・フィルターなし」の 4 条件を守ると精度が大幅に上がります。',
  },
  {
    q: 'パーソナルカラー診断と似合う髪色診断、どちらを先に使うべきですか？',
    a: '目的によります。「髪色だけサクッと知りたい」なら本ツール（似合う髪色診断）を直接、「服・口紅・アクセサリーも含めた全体コーディネート」を考えたいなら 先に 「パーソナルカラー診断 AI」を使うのがおすすめです。クレジットは両ツール共通なので、両方試して比較しても無駄になりません。多くのユーザーは「先に髪色 → 後で服装」の順で活用しています。',
  },
  {
    q: 'AI 髪色シミュレーターで失敗しないコツは？',
    a: '①ブリーチが必要な明るい色を選ぶ場合は、AI のシミュレーション結果と実際のサロン仕上がりに差が出やすい点を理解しておく、②「個性派チャレンジ」枠の色をいきなり試すのではなく、まず「安心の定番」枠で AI 判定の精度を確認する、③別の候補を 2-3 色試して比較してから美容師さんに相談する — の 3 点が失敗回避のコツです。AI が示すのは「あなたに似合う方向性」であり、最終的な仕上がりは美容師さんとの相談で詰めることをおすすめします。',
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
              ✓ Google ログインで 3 回無料
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

      {/* Cross-link to personal-color tool — moved below Upload so users see
          this tool's own CTA first (was above-the-fold pre-2026-05-17,
          which diverted hair-color traffic to personal-color and inflated
          hair-color bounce to 88.2% / 0 real usage / 5/10-5/16). */}
      <section className="py-4">
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

      {/* What is "似合う髪色" — captures `自分 に 似合う 髪色` (1.2K/月) + `髪色 ai 診断` (1.8K/月) */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            自分に似合う髪色とは？AI が判定する <span className="text-violet-700">4 つの要素</span>
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            「自分に似合う髪色」は、なんとなく好きな色ではなく、肌・瞳・顔立ち・現在の髪色との調和で決まります。本ツールは、写真 1
            枚から以下の 4 要素を AI で同時に判定し、サロンで実際に再現可能な髪色 5
            候補を提案します。プロのカラリストが診断時に見ている観点と同じ軸です。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌡️</span>
                <h3 className="text-sm font-bold text-gray-900">アンダートーン（暖み／青み）</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                肌が黄み寄りのウォーム系か、青み寄りのクール系かを判定。アッシュ系・オレンジ系などの選び分けの基礎になります。
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👁️</span>
                <h3 className="text-sm font-bold text-gray-900">瞳の色とコントラスト</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                瞳の暗さと肌色の差（コントラスト）が高いほど、はっきりした髪色がマッチします。低コントラストの方はソフトな色が似合う傾向。
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🍂</span>
                <h3 className="text-sm font-bold text-gray-900">パーソナルカラー（4 シーズン）</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                春・夏・秋・冬の 4
                分類で「似合う色の世界」を絞ります。例えばオータム（秋）の方はテラコッタやモカブラウンが映えます。
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💇</span>
                <h3 className="text-sm font-bold text-gray-900">現在の髪色との相性</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                ブリーチが必要な色か、現状からの自然な遷移か。実現可能性とダメージ予測も含めて 5
                候補に「安心の定番／トレンド／個性派」のバランスを取ります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI髪色シミュレーター vs 従来 — captures `髪色 シミュレーター` (680/月) */}
      <section className="py-12 bg-gradient-to-b from-violet-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            AI 髪色シミュレーターと <span className="text-violet-700">従来ツールの違い</span>
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            「髪色シミュレーター」は古くからある定番ツールですが、AI を組み込むことで使い勝手と精度が大きく変わります。本ツールと一般的な髪色シミュレーターの違いを比較しました。
          </p>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-1/3">項目</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-500">従来の髪色シミュレーター</th>
                  <th className="px-4 py-3 text-left font-semibold text-violet-700">本ツール（AI 髪色診断）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">色選び</td>
                  <td className="px-4 py-3 text-xs text-gray-600">自分でカラーパレットから選ぶ</td>
                  <td className="px-4 py-3 text-xs text-gray-700">AI が肌・瞳・パーソナルカラーから自動提案</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">候補数</td>
                  <td className="px-4 py-3 text-xs text-gray-600">無制限（全色から選択）</td>
                  <td className="px-4 py-3 text-xs text-gray-700">5 候補に絞り込み（迷わない）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">プレビュー精度</td>
                  <td className="px-4 py-3 text-xs text-gray-600">色置換のみ（不自然なエッジ）</td>
                  <td className="px-4 py-3 text-xs text-gray-700">Gemini 2.5 Flash Image による写実的な仕上がり</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">パーソナル要素</td>
                  <td className="px-4 py-3 text-xs text-gray-600">なし（みんな同じ色見本）</td>
                  <td className="px-4 py-3 text-xs text-gray-700">あり（あなたの写真から判定）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">所要時間</td>
                  <td className="px-4 py-3 text-xs text-gray-600">数分（手動で何度も試す）</td>
                  <td className="px-4 py-3 text-xs text-gray-700">15-25 秒で 5 候補 + Before/After 1 枚</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            ※ 従来ツールも比較・参考用途では有効ですが、「自分に似合う髪色」を素早く絞り込みたい場合は AI 診断のほうが効率的です。
          </p>
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
