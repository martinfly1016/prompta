import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PersonalColorQuotaGate } from '@/components/tools/PersonalColorQuotaGate'

export const metadata: Metadata = {
  title: 'パーソナルカラー診断 写真 AI — 無料・登録不要',
  description:
    '写真をアップロードするだけで AI がパーソナルカラーを診断。4シーズン判定 + 16色おすすめパレット + 似合う髪色・口紅・服装の提案。Gemini 2.5 Flash 搭載、無料・登録不要。',
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/personal-color-analysis`,
    languages: {
      ja: `${SITE_CONFIG.url}/tools/personal-color-analysis`,
      en: `${SITE_CONFIG.url}/en/tools/personal-color-analysis`,
      'x-default': `${SITE_CONFIG.url}/tools/personal-color-analysis`,
    },
  },
  openGraph: {
    title: 'パーソナルカラー診断 写真 AI — 無料・登録不要',
    description:
      '写真をアップロードするだけで AI がパーソナルカラーを診断。4シーズン判定 + 16色おすすめパレット。',
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: ['en_US'],
  },
}

const MOCK_RESULT = {
  season12: 'summer-cool-light',
  season4: 'summer',
  season4Ja: 'サマー（夏）',
  seasonLabel: 'Summer Cool Light',
  seasonSubJa: 'クール（青み）／コントラスト：低／ソフト',
  undertone: 'cool' as const,
  contrast: 'low' as const,
  confidence: 0.92,
  skinFeaturesJa:
    '肌は青みがかったピンクベースで透明感あり。瞳は柔らかいダークブラウン、髪はやや赤みのあるダークブラウン。全体のコントラストは低めで、柔らかく上品な印象。',
  recommended: {
    clothing: [
      { hex: '#A8C5E0', name: 'パウダーブルー' },
      { hex: '#D4C5E0', name: 'ラベンダー' },
      { hex: '#C5E0CD', name: 'ミントグリーン' },
      { hex: '#E5BFC9', name: 'ダスティピンク' },
    ],
    lipstick: [
      { hex: '#D88895', name: 'ローズピンク' },
      { hex: '#E0A095', name: 'ソフトコーラル' },
      { hex: '#C594A0', name: 'モーヴ' },
      { hex: '#B57085', name: 'ベリー' },
    ],
    hair: [
      { hex: '#6B5847', name: 'アッシュブラウン' },
      { hex: '#3D332D', name: 'ソフトブラック' },
      { hex: '#8A7560', name: 'クールライトブラウン' },
      { hex: '#C4A87E', name: 'アッシュブロンド' },
    ],
    accessory: [
      { hex: '#C0C0C0', name: 'シルバー' },
      { hex: '#E5E5E5', name: 'プラチナ' },
      { hex: '#A8B8C5', name: 'スチール' },
      { hex: '#FFFFFF', name: 'パール' },
    ],
  },
  avoid: [
    { hex: '#FF6B35', reason: '黄み強めのオレンジは肌を疲れて見せる' },
    { hex: '#D4AF37', reason: '黄金色は青みベース肌と調和しにくい' },
    { hex: '#8B4513', reason: '深い茶色は重く見えコントラストが強すぎる' },
  ],
}

const SAMPLE_PHOTOS = [
  { src: '/og-default.png', label: 'サンプル 1' },
  { src: '/og-default.png', label: 'サンプル 2' },
  { src: '/og-default.png', label: 'サンプル 3' },
]

const FAQ = [
  {
    q: 'パーソナルカラー診断とは何ですか？',
    a: '肌・瞳・髪の色味から、その人に最も似合う色のグループ（春・夏・秋・冬の4シーズン）を判定する手法です。日本・韓国で特に人気で、メイク・ヘアカラー・服装選びの参考になります。',
  },
  {
    q: 'AIの診断結果は信頼できますか？',
    a: '本ツールは Google Gemini 2.5 Flash の Vision モデルで、4シーズン分類と暖/冷ベースの判定は高精度（テストで5/5一致）。12タイプ細分は隣接タイプ間でゆらぎが出る場合があるため、参考値として表示しています。プロのカラリストによる対面診断の代替ではなく、自宅で気軽に試す目的でご利用ください。',
  },
  {
    q: '結果の見方を教えてください',
    a: '4シーズン（大区分）とコントラスト・undertone を主軸に、推奨色16種を「服装/口紅/髪色/アクセサリー」の役割別に4色ずつ表示します。各色には日本語名とHEXコードが付き、コピーして他のツールで使えます。',
  },
  {
    q: '写真の撮り方のコツは？',
    a: '①自然光（窓際など）で②正面を向き③肌・髪・瞳がはっきり見える④メイクを落とした状態 — の4条件を満たすと精度が上がります。フィルター・加工アプリの結果は使わないでください。',
  },
  {
    q: '写真データはどう扱われますか？',
    a: 'アップロードされた写真は診断のために Gemini API に送信され、診断完了後はサーバーから削除されます。当サイトでは保存しません。診断結果は一時的にブラウザに保持されますが、ページを閉じれば破棄されます。',
  },
]

function ColorSwatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div
      className="bg-white rounded-lg border border-gray-100 overflow-hidden"
      title={`${name} ${hex.toUpperCase()}`}
    >
      <div
        className="h-12 w-full"
        style={{ backgroundColor: hex }}
        aria-label={`${name} ${hex}`}
      />
      <div className="px-2 py-1.5">
        <div className="text-xs font-medium text-gray-900 leading-tight truncate">{name}</div>
        <div className="text-[10px] text-gray-500 font-mono leading-tight mt-0.5">
          {hex.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

function PaletteRow({
  title,
  icon,
  colors,
}: {
  title: string
  icon: string
  colors: { hex: string; name: string }[]
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {colors.map((c) => (
          <ColorSwatch key={c.hex + c.name} hex={c.hex} name={c.name} />
        ))}
      </div>
    </div>
  )
}

export default function PersonalColorAnalysisPage() {
  const r = MOCK_RESULT
  const seasonEmoji =
    r.season4 === 'spring'
      ? '🌸'
      : r.season4 === 'summer'
        ? '☀️'
        : r.season4 === 'autumn'
          ? '🍁'
          : '❄️'

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'AIツール', href: '/tools' },
            { name: 'パーソナルカラー診断', href: '/tools/personal-color-analysis' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            パーソナルカラー<span className="text-sky-600">診断 AI</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-5">
            写真をアップロードするだけで、AI が4シーズン分類 + 似合う16色を診断。無料・登録不要・数秒で結果。
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ 完全無料
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ 登録不要
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ 写真は保存しません
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ Gemini 2.5 Flash 搭載
            </span>
            <Link
              href="/en/tools/personal-color-analysis"
              className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-500 hover:text-sky-600 hover:border-sky-300"
              hrefLang="en"
            >
              🇺🇸 English version
            </Link>
          </div>
        </div>
      </section>

      {/* Upload section */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border-2 border-dashed border-sky-300 p-8 sm:p-12 text-center hover:border-sky-400 transition-colors">
            <div className="text-5xl mb-4">📷</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              写真をドラッグ&ドロップ または クリックして選択
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              JPG / PNG（最大 10MB）／ 顔がはっきり写った正面写真を推奨
            </p>
            <PersonalColorQuotaGate />
          </div>

          {/* Sample photos */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-3 text-center">
              または、サンプル写真で結果を確認
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {SAMPLE_PHOTOS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-20 h-20 rounded-lg border-2 border-gray-200 hover:border-sky-400 bg-gray-100 overflow-hidden transition-all"
                  title={s.label}
                  disabled
                >
                  <span className="block text-xs text-gray-400 pt-7">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Render target for the live diagnosis result — sits outside the
          max-w-3xl upload card so the result card can render at the same
          full width as the mock preview below. PersonalColorQuotaGate
          portals into this node when an analysis succeeds. */}
      <div id="personal-color-result-portal" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* How it works */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">使い方は3ステップ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { n: 1, title: '写真をアップロード', desc: '自然光・正面・素顔の写真がベスト', icon: '📷' },
              { n: 2, title: 'AI が分析', desc: '肌・瞳・髪のトーンを Gemini が解析（5-15秒）', icon: '🤖' },
              { n: 3, title: '結果を確認', desc: '4シーズン + 推奨16色 + 化粧・髪・服のヒント', icon: '🎨' },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white text-sm font-bold rounded-full shrink-0">
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

      {/* Mock result preview */}
      <section id="result-preview" className="py-12 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-full border border-amber-200 mb-2">
              サンプル結果プレビュー
            </span>
            <h2 className="text-xl font-bold text-gray-900">こんな診断結果が表示されます</h2>
          </div>

          {/* Result card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Top: season big display */}
            <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6 sm:p-8 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="text-7xl shrink-0" aria-hidden="true">{seasonEmoji}</div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
                    あなたのパーソナルカラー
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                    {r.season4Ja}
                  </h3>
                  <p className="text-sm text-gray-700 font-medium mb-2">
                    {r.seasonLabel} <span className="text-gray-400">·</span> {r.seasonSubJa}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                      Undertone: <span className="text-blue-600">クール</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                      Contrast: <span className="text-gray-700">低（ソフト）</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                      信頼度: <span className="text-emerald-600 font-semibold">{Math.round(r.confidence * 100)}%</span>
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm text-gray-600 leading-relaxed bg-white/60 rounded-lg p-3 border border-white">
                💡 {r.skinFeaturesJa}
              </p>
            </div>

            {/* Recommended colors */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900">あなたに似合う16色</h3>
                <span className="text-xs text-gray-500">役割別に各4色</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <PaletteRow title="服装" icon="👗" colors={r.recommended.clothing} />
                <PaletteRow title="口紅・チーク" icon="💄" colors={r.recommended.lipstick} />
                <PaletteRow title="髪色（推奨）" icon="💇" colors={r.recommended.hair} />
                <PaletteRow title="アクセサリー" icon="💍" colors={r.recommended.accessory} />
              </div>

              {/* Avoid colors */}
              <div className="mt-8">
                <h3 className="text-base font-bold text-gray-900 mb-3">避けたい色</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {r.avoid.map((c) => (
                    <div
                      key={c.hex}
                      className="flex items-start gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100"
                    >
                      <div
                        className="w-10 h-10 rounded-md border border-gray-200 shrink-0 relative overflow-hidden"
                        style={{ backgroundColor: c.hex }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold drop-shadow">
                          ✕
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{c.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related prompts CTA */}
            <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                診断結果を活かす AI プロンプト
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    href: '/prompt/hairstyle-grid-9-variations',
                    icon: '💇',
                    title: '髪型バリエーション',
                    desc: '推奨髪色で9種類試着',
                  },
                  {
                    href: '/prompt/virtual-makeup-reference-look',
                    icon: '💄',
                    title: 'バーチャルメイク',
                    desc: '推奨リップ色を反映',
                  },
                  {
                    href: '/prompt/outfit-swap-reference-image',
                    icon: '👗',
                    title: '着せ替え',
                    desc: '推奨色の服を試着',
                  },
                ].map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="group flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all"
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{p.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
                className="group bg-white rounded-xl border border-gray-200 open:border-sky-300 transition-all"
              >
                <summary className="cursor-pointer list-none p-5 flex items-start gap-3">
                  <span className="text-sky-600 font-bold shrink-0">Q{i + 1}.</span>
                  <span className="flex-1 text-sm font-semibold text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">▼</span>
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
          <p className="text-sm text-gray-600 mb-4">写真加工系のプロンプトをもっと見る</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/prompts/photo-edit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 shadow-sm transition-all"
            >
              写真加工プロンプト一覧 →
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-sky-300 hover:text-sky-600 shadow-sm transition-all"
            >
              他の AI ツール
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
