import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { SITE_CONFIG } from '@/lib/constants'
import { SEASONS, SEASON_SLUGS, type SeasonSlug } from '@/lib/seo/personal-color-seasons'

export const revalidate = 86400 // 1 day — content is static

export function generateStaticParams() {
  return SEASON_SLUGS.map((season) => ({ season }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ season: string }>
}): Promise<Metadata> {
  const { season } = await params
  const s = SEASONS[season as SeasonSlug]
  if (!s) return {}
  const title = `パーソナルカラー ${s.nameJaShort} (${s.nameJa}) 完全ガイド — 似合う色・髪色・メイク`
  const description = `${s.nameJa}タイプの特徴・似合う 12 色・避けたい色・メイク・髪色を完全解説。自分が ${s.nameJaShort} かどうかは写真 AI 診断で 30 秒判定（Google ログインで 3 回無料）。`
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/tools/personal-color-analysis/${s.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'ja_JP',
    },
  }
}

export default async function SeasonPage({
  params,
}: {
  params: Promise<{ season: string }>
}) {
  const { season } = await params
  const s = SEASONS[season as SeasonSlug]
  if (!s) notFound()

  // FAQ schema.org markup
  const FAQ_LD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const otherSeasons = SEASON_SLUGS.filter((sl) => sl !== s.slug).map((sl) => SEASONS[sl])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'AIツール', href: '/tools' },
            { name: 'パーソナルカラー診断', href: '/tools/personal-color-analysis' },
            { name: s.nameJa, href: `/tools/personal-color-analysis/${s.slug}` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className={`bg-gradient-to-br ${s.themeGradient} py-12`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-3"
            style={{ backgroundColor: s.themeHex, color: '#fff' }}
          >
            パーソナルカラー {s.nameJaShort}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {s.nameJa} 完全ガイド
          </h1>
          <p className="text-base text-gray-700 mb-4">{s.tagline}</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              アンダートーン: {s.undertone === 'warm' ? 'ウォーム（暖み）' : 'クール（青み）'}
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              明度: {s.brightness === 'bright' ? '明るい' : s.brightness === 'soft' ? 'ソフト' : s.brightness === 'rich' ? 'ディープ' : 'シャープ'}
            </span>
          </div>
        </div>
      </section>

      {/* Diagnosis CTA */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border-2 border-sky-200 p-6 sm:p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              あなたは本当に {s.nameJaShort}タイプですか？
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              写真 1 枚で AI が 4 シーズンを自動判定（Google ログインで 3 回無料）。
              {s.nameJaShort}以外の可能性も含めて、あなたに最適なシーズンを 30 秒で確認できます。
            </p>
            <Link
              href="/tools/personal-color-analysis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm transition-all"
            >
              📷 AI パーソナルカラー診断を試す（無料 3 回）→
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{s.nameJa}とは？</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{s.intro}</p>
        </div>
      </section>

      {/* Person features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">{s.nameJa}タイプの 4 つの特徴</h2>
          <div className="space-y-3">
            <FeatureCard icon="✨" label="肌" text={s.features.skin} />
            <FeatureCard icon="👁️" label="瞳" text={s.features.eye} />
            <FeatureCard icon="💇" label="髪" text={s.features.hair} />
            <FeatureCard icon="🌈" label="全体" text={s.features.overall} />
          </div>
        </div>
      </section>

      {/* Best colors */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{s.nameJa}に似合う 12 色</h2>
          <p className="text-sm text-gray-600 mb-6">
            肌・瞳・髪の透明感を最大限引き出すベストカラー。服・口紅・アクセサリー全てに応用可能。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {s.bestColors.map((c) => (
              <ColorSwatch key={c.hex} color={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Makeup & hair */}
      <section className="py-12 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            {s.nameJa}の似合うメイク・髪色
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              💄 メイク
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong className="text-gray-900">リップ：</strong>
                {s.makeup.lip}
              </div>
              <div>
                <strong className="text-gray-900">チーク：</strong>
                {s.makeup.cheek}
              </div>
              <div>
                <strong className="text-gray-900">アイメイク：</strong>
                {s.makeup.eye}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              💇 似合う髪色
            </h3>
            <ul className="space-y-1 text-sm text-gray-700 list-disc pl-5 mb-4">
              {s.hairColors.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            <Link
              href="/tools/hair-color-diagnosis"
              className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:text-violet-800"
            >
              → AI 髪色診断で実際の Before/After を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Avoid colors */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{s.nameJa}が避けたい色</h2>
          <p className="text-sm text-gray-600 mb-5">
            これらの色は顔色を悪く見せたり、肌のくすみを強調しやすい色です。完全に避ける必要はありませんが、顔まわり（トップス・スカーフ）には使わないのが無難です。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {s.avoidColors.map((c) => (
              <ColorSwatch key={c.hex} color={c} subdued />
            ))}
          </div>
        </div>
      </section>

      {/* Style notes */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            {s.nameJa}のファッション・小物のコツ
          </h2>
          <ul className="space-y-2.5">
            {s.styleNotes.map((n, i) => (
              <li key={i} className="flex items-start gap-2.5 bg-white rounded-lg border border-gray-200 p-4">
                <span className="text-amber-600 font-bold shrink-0">✓</span>
                <span className="text-sm text-gray-700 leading-relaxed">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">よくある質問（{s.nameJaShort}専用）</h2>
          <div className="space-y-3">
            {s.faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-xl border border-gray-200 open:border-sky-300 transition-all">
                <summary className="cursor-pointer p-5 flex items-start gap-3 list-none">
                  <span className="text-sky-600 font-bold shrink-0">Q.</span>
                  <span className="flex-1 text-sm font-semibold text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">▼</span>
                </summary>
                <div className="px-5 pb-5 pl-12 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other seasons (internal links) */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">他のシーズンも確認</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            自分が違うシーズンかも？4 タイプを比較して特徴を確認してみましょう。
          </p>
          <div className="grid grid-cols-3 gap-3">
            {otherSeasons.map((o) => (
              <Link
                key={o.slug}
                href={`/tools/personal-color-analysis/${o.slug}`}
                className="block bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-sm transition-all p-4 text-center"
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: o.themeHex }}
                />
                <div className="text-sm font-bold text-gray-900">{o.nameJa}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{o.nameEn}</div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/tools/personal-color-analysis"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all"
            >
              📷 AI で自分のシーズンを判定する →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ icon, label, text }: { icon: string; label: string; text: string }) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-200 p-4">
      <div className="text-2xl shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</div>
        <div className="text-sm text-gray-800 leading-relaxed">{text}</div>
      </div>
    </div>
  )
}

function ColorSwatch({
  color,
  subdued = false,
}: {
  color: { hex: string; nameJa: string; nameEn: string }
  subdued?: boolean
}) {
  return (
    <div className={`rounded-xl border border-gray-200 overflow-hidden ${subdued ? 'opacity-90' : ''}`}>
      <div
        className="h-20 w-full relative"
        style={{ backgroundColor: color.hex }}
        aria-label={`${color.nameJa} ${color.hex}`}
      >
        <span className="absolute top-1.5 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/35 text-white">
          {color.hex.toUpperCase()}
        </span>
      </div>
      <div className="p-2.5">
        <div className="text-xs font-bold text-gray-900">{color.nameJa}</div>
        <div className="text-[10px] text-gray-500">{color.nameEn}</div>
      </div>
    </div>
  )
}
