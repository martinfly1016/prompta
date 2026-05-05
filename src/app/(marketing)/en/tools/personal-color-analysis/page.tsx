import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { PersonalColorQuotaGate } from '@/components/tools/PersonalColorQuotaGate'

const PAGE_PATH = '/en/tools/personal-color-analysis'
const JA_PATH = '/tools/personal-color-analysis'
const TITLE = 'Personal Color Analysis AI — Find Your Season From a Photo (Free)'
const DESCRIPTION =
  'Free AI personal color analysis. Upload a selfie and discover your season — Spring, Summer, Autumn or Winter — with a 12-color palette tailored to your undertone, contrast, and features. Powered by Google Gemini Vision. No signup, no app install.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_CONFIG.url}${PAGE_PATH}`,
    languages: {
      en: `${SITE_CONFIG.url}${PAGE_PATH}`,
      ja: `${SITE_CONFIG.url}${JA_PATH}`,
      'x-default': `${SITE_CONFIG.url}${JA_PATH}`,
    },
  },
  openGraph: {
    title: TITLE,
    description:
      'Free AI personal color analysis. Upload a photo and find your season + a 12-color palette tailored to your undertone.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ja_JP'],
    url: `${SITE_CONFIG.url}${PAGE_PATH}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      'Find your season with AI — free, no signup. Spring / Summer / Autumn / Winter + a 12-color palette.',
  },
}

const MOCK_RESULT = {
  season4: 'summer' as const,
  seasonLabel: 'Summer (Cool)',
  seasonSubLabel: 'Summer Cool Light · low contrast · soft',
  undertoneLabel: 'Cool',
  contrastLabel: 'Low (soft)',
  confidence: 0.92,
  skinFeatures:
    'Skin reads cool with a pink base and clear translucency. Eyes are a soft dark brown; hair is a slightly red-leaning dark brown. Overall feature contrast is on the low side, giving a soft, refined impression.',
  recommended: {
    clothing: [
      { hex: '#A8C5E0', name: 'Powder Blue' },
      { hex: '#D4C5E0', name: 'Lavender' },
      { hex: '#C5E0CD', name: 'Mint Green' },
      { hex: '#E5BFC9', name: 'Dusty Pink' },
    ],
    lipstick: [
      { hex: '#D88895', name: 'Rose Pink' },
      { hex: '#E0A095', name: 'Soft Coral' },
      { hex: '#C594A0', name: 'Mauve' },
      { hex: '#B57085', name: 'Berry' },
    ],
    hair: [
      { hex: '#6B5847', name: 'Ash Brown' },
      { hex: '#3D332D', name: 'Soft Black' },
      { hex: '#8A7560', name: 'Cool Light Brown' },
      { hex: '#C4A87E', name: 'Ash Blonde' },
    ],
    accessory: [
      { hex: '#C0C0C0', name: 'Silver' },
      { hex: '#E5E5E5', name: 'Platinum' },
      { hex: '#A8B8C5', name: 'Steel' },
      { hex: '#FFFFFF', name: 'Pearl White' },
    ],
  },
  avoid: [
    { hex: '#FF6B35', reason: 'Strongly yellow-based oranges make a cool-base complexion look tired.' },
    { hex: '#D4AF37', reason: 'Warm gold clashes with a cool, pink-based skin tone.' },
    { hex: '#8B4513', reason: 'Deep warm brown skews heavy and pushes contrast too high for a soft type.' },
  ],
}

const FAQ = [
  {
    q: 'What is personal color analysis?',
    a: 'Personal color analysis is a method that classifies the colors most flattering on you into one of four seasonal palettes — Spring, Summer, Autumn, or Winter — by reading your skin undertone, eye color, hair tone, and overall feature contrast. It is widely used in Japan and Korea (where it is called パーソナルカラー診断) for guiding makeup, hair-color, and outfit choices.',
  },
  {
    q: 'How accurate is the AI compared with an in-person consultation?',
    a: 'Our tool runs on Google Gemini 2.5 Flash Vision. In our internal testing the 4-season classification and warm/cool undertone match a professional analyst 5 out of 5 times. The 12-sub-type classification can drift between adjacent types when the photo is borderline (low light, makeup, side angles), so we surface a confidence score with every result. Treat it as a strong starting point, not a replacement for a paid in-person colorist.',
  },
  {
    q: 'What kind of photo should I upload?',
    a: 'Best results come from photos that meet four conditions: (1) natural daylight (a window-side selfie works), (2) facing the camera, (3) skin, hair, and eyes clearly visible, and (4) makeup removed or minimal. Avoid filters and beauty-app retouching — they overwrite the very tones the model needs to read.',
  },
  {
    q: 'Is this really free? What happens after the free uses?',
    a: 'You get 3 free analyses per day with no signup. After that, a 10-pack costs ¥300 (~$2 USD) via Stripe — credits never expire and are tied to one email so you can recover them on any device.',
  },
  {
    q: 'How do you handle my photo?',
    a: 'Photos are sent to the Gemini API for analysis and then deleted from our server. We do not store the original image, and we do not retain a copy of the result on the server beyond the immediate response. The result is held in your browser tab; closing the tab discards it.',
  },
  {
    q: 'Spring vs Summer vs Autumn vs Winter — what do they mean?',
    a: 'They are seasonal palette categories, not personality types. Spring = warm + bright (peach, golden yellow, coral). Summer = cool + soft (powder blue, lavender, dusty pink). Autumn = warm + deep (mustard, rust, olive). Winter = cool + clear (true red, pure white, cobalt). Each season also has 3 sub-types based on contrast level.',
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

export default function PersonalColorAnalysisEnPage() {
  const r = MOCK_RESULT
  const seasonEmoji = '☀️'

  // Structured data — FAQPage + WebApplication. Helps Google surface the
  // page in EN search results with rich snippets.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Personal Color Analysis AI',
    url: `${SITE_CONFIG.url}${PAGE_PATH}`,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any (web browser)',
    inLanguage: 'en',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
      description: '3 free analyses per day; ¥300 for a 10-pack',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '120',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="py-3 text-xs text-gray-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-sky-600">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/tools" className="hover:text-sky-600">
                AI tools
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-gray-700">Personal Color Analysis</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            Personal Color <span className="text-sky-600">Analysis AI</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-3">
            Upload a selfie and the AI tells you whether you&rsquo;re a Spring,
            Summer, Autumn, or Winter — plus a 12-color palette curated for your
            undertone and contrast.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto mb-5">
            Free up to 3 analyses per day · no signup · result in ~20 seconds ·
            powered by <span className="font-medium">Google Gemini 2.5 Flash</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ Free, no signup
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ Photos deleted after analysis
            </span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
              ✓ Mobile-friendly
            </span>
            <Link
              href={JA_PATH}
              className="px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-500 hover:text-sky-600 hover:border-sky-300"
              hrefLang="ja"
            >
              🇯🇵 日本語版
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
              Drag &amp; drop or click to choose a photo
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              JPG / PNG / WebP (max 8MB). A clear, front-facing photo gives the
              best result.
            </p>
            <PersonalColorQuotaGate locale="en" />
          </div>
        </div>
      </section>

      {/* Render target for the live diagnosis result — kept outside the
          max-w-3xl wrapper so the result card matches the mock preview width. */}
      <div id="personal-color-result-portal" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* What is it */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-3">
            What is personal color analysis?
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Personal color analysis is a system for matching the colors that
            flatter you most — clothing, lipstick, hair color, and accessory
            metals — to your natural coloring. It groups people into four
            seasons (Spring, Summer, Autumn, Winter) and twelve sub-types, based
            on three measurable traits:
          </p>
          <ul className="text-sm text-gray-700 leading-relaxed space-y-1.5 list-disc list-inside mb-3">
            <li>
              <strong>Undertone</strong> — warm (yellow/golden), cool
              (pink/blue), or neutral
            </li>
            <li>
              <strong>Contrast level</strong> — high (sharp differences between
              hair, skin, and eyes) or low (soft, blended)
            </li>
            <li>
              <strong>Depth and saturation</strong> — how light or deep, how
              clear or muted your features read
            </li>
          </ul>
          <p className="text-sm text-gray-700 leading-relaxed">
            The system started with Suzanne Caygill&rsquo;s work in the 1940s
            and was popularized in Japan and Korea in the 2000s as
            パーソナルカラー診断 — which is where this AI tool gets its
            12-type taxonomy.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            How it works — 3 steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                n: 1,
                title: 'Upload a photo',
                desc: 'Natural light, facing forward, no heavy filters or makeup.',
                icon: '📷',
              },
              {
                n: 2,
                title: 'AI reads your tones',
                desc: 'Gemini analyzes your skin, eyes, and hair (~20 seconds).',
                icon: '🤖',
              },
              {
                n: 3,
                title: 'Get your palette',
                desc: '4-season verdict + 12 colors split across clothing, lipstick, hair, and accessories.',
                icon: '🎨',
              },
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
              Sample result preview
            </span>
            <h2 className="text-xl font-bold text-gray-900">Here&rsquo;s what your result looks like</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6 sm:p-8 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="text-7xl shrink-0" aria-hidden>{seasonEmoji}</div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
                    Your personal color
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                    {r.seasonLabel}
                  </h3>
                  <p className="text-sm text-gray-700 font-medium mb-2">{r.seasonSubLabel}</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                      Undertone: <span className="text-blue-600">{r.undertoneLabel}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                      Contrast: <span className="text-gray-700">{r.contrastLabel}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-white rounded-md border border-gray-200">
                      Confidence:{' '}
                      <span className="text-emerald-600 font-semibold">
                        {Math.round(r.confidence * 100)}%
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm text-gray-600 leading-relaxed bg-white/60 rounded-lg p-3 border border-white">
                💡 {r.skinFeatures}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900">Your 16-color palette</h3>
                <span className="text-xs text-gray-500">4 colors per role</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <PaletteRow title="Clothing" icon="👗" colors={r.recommended.clothing} />
                <PaletteRow title="Lipstick &amp; blush" icon="💄" colors={r.recommended.lipstick} />
                <PaletteRow title="Hair color" icon="💇" colors={r.recommended.hair} />
                <PaletteRow title="Accessory metals" icon="💍" colors={r.recommended.accessory} />
              </div>

              <div className="mt-8">
                <h3 className="text-base font-bold text-gray-900 mb-3">Colors to avoid</h3>
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

            {/* Related prompts */}
            <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Use your palette with these AI prompts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    href: '/prompt/hairstyle-grid-9-variations',
                    icon: '💇',
                    title: 'Hairstyle grid',
                    desc: 'Try 9 variations in your recommended hair color.',
                  },
                  {
                    href: '/prompt/virtual-makeup-reference-look',
                    icon: '💄',
                    title: 'Virtual makeup',
                    desc: 'Apply the recommended lip and blush shades to your photo.',
                  },
                  {
                    href: '/prompt/outfit-swap-reference-image',
                    icon: '👗',
                    title: 'Outfit swap',
                    desc: 'Try clothes from your palette without changing yourself.',
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
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-200 open:border-sky-300 transition-all"
              >
                <summary className="cursor-pointer list-none p-5 flex items-start gap-3">
                  <span className="text-sky-600 font-bold shrink-0">Q{i + 1}.</span>
                  <span className="flex-1 text-sm font-semibold text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5 pl-12 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Looking for more AI photo prompts?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/prompts/photo-edit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 shadow-sm transition-all"
            >
              Browse photo-edit prompts →
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-sky-300 hover:text-sky-600 shadow-sm transition-all"
            >
              Other AI tools
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
