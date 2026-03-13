import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GUIDES, TOOLS, SITE_CONFIG, getRelatedGuides, GUIDE_RELATIONS } from '@/lib/constants'
import { getPromptsByTool } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const guide = GUIDES.find(g => g.slug === resolvedParams.slug)
  if (!guide) return {}

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
    },
  }
}

// Guide content store — static content for each guide
const GUIDE_CONTENT: Record<string, { sections: Array<{ title: string; content: string }>, faq: Array<{ q: string; a: string }> }> = {
  'what-is-prompt': {
    sections: [
      {
        title: 'プロンプトとは？',
        content: `プロンプト（Prompt）とは、AIに対して入力する指示文のことです。ChatGPTやStable Diffusionなどの生成AIに「何を生成してほしいか」を伝えるテキストがプロンプトです。

プロンプトの質がAIの出力結果を大きく左右するため、効果的なプロンプトの書き方を学ぶことは、AIを活用する上で非常に重要です。

例えば、ChatGPTに「メールを書いて」と指示するよりも、「取引先の田中部長に、来週の会議日程変更をお詫びする丁寧なビジネスメールを200文字程度で書いてください」と指示した方が、はるかに良い結果が得られます。`,
      },
      {
        title: 'プロンプトエンジニアリングとは',
        content: `プロンプトエンジニアリングとは、AIから最適な出力を引き出すためにプロンプトを設計・最適化する技術です。

テキスト生成AIでは、ロール設定（「あなたは○○の専門家です」）、具体的な条件指定、出力形式の指定などが重要なテクニックです。

画像生成AIでは、品質タグ（masterpiece, best quality）、スタイル指定（anime style, photorealistic）、構図指定（close-up, wide angle）などのテクニックが使われます。`,
      },
      {
        title: 'プロンプトの基本構造',
        content: `効果的なプロンプトには以下の要素が含まれます：

1. **タスクの明確化** — AIに何をしてほしいかを明確に伝える
2. **コンテキスト** — 背景情報や制約条件を提供する
3. **出力形式** — どのような形式で回答してほしいかを指定する
4. **例示（Few-Shot）** — 期待する出力の例を提示する
5. **制約条件** — 文字数、トーン、スタイルなどの制約を設定する

これらの要素を組み合わせることで、AIからより正確で有用な出力を得ることができます。`,
      },
      {
        title: '主要AIツール別のプロンプトの違い',
        content: `AIツールによってプロンプトの書き方は異なります：

**ChatGPT / Claude（テキスト生成AI）**
- 自然な日本語で指示を書く
- ロール設定やステップバイステップの指示が効果的
- 長い文脈を理解できるので、詳細な指示が可能

**Stable Diffusion / Midjourney（画像生成AI）**
- 英語のキーワードをカンマ区切りで並べる
- 品質タグや重み付けで結果を制御
- ネガティブプロンプトで不要な要素を排除

**DALL-E（画像生成AI）**
- 自然な英語の文章で描写
- スタイルや雰囲気を文章で表現
- ChatGPTと統合して使える`,
      },
    ],
    faq: [
      { q: 'プロンプトは日本語で書けますか？', a: 'ChatGPTやClaudeなどのテキスト生成AIは日本語のプロンプトに対応しています。画像生成AI（Stable Diffusion、Midjourney）は英語のプロンプトが推奨されますが、一部は日本語にも対応しています。' },
      { q: 'プロンプトの書き方にルールはありますか？', a: '厳密なルールはありませんが、具体的で明確な指示を書くことが重要です。曖昧な表現を避け、期待する結果を詳細に記述することで、AIの出力品質が向上します。' },
      { q: 'プロンプトエンジニアリングのスキルは必要ですか？', a: '基本的な使い方は誰でもすぐに始められます。しかし、プロンプトエンジニアリングのテクニックを学ぶことで、AIをより効果的に活用でき、業務効率の大幅な向上が期待できます。' },
    ],
  },
  'stable-diffusion-prompt-guide': {
    sections: [
      {
        title: 'Stable Diffusionのプロンプト基礎',
        content: `Stable Diffusion（SD）のプロンプトは、生成したい画像の特徴を英語のキーワードで記述します。キーワードはカンマ（,）で区切って並べ、重要度に応じて順序を調整します。

基本構文：\`主題, スタイル, 品質タグ, 照明, 構図\`

例：\`beautiful girl, long hair, white dress, in garden, (masterpiece:1.2), (best quality:1.4), soft lighting, bokeh background\``,
      },
      {
        title: '品質タグの使い方',
        content: `高品質な画像を生成するために、以下の品質タグを使用します：

- **masterpiece** — 傑作レベルの品質
- **best quality** — 最高品質
- **ultra-detailed** — 超精細
- **8k** — 8K解像度相当の詳細さ
- **realistic** — リアルなスタイル

重み付け：\`(masterpiece:1.2)\` のように数値で強調度を調整できます。1.0が標準、1.5で強い強調、0.5で弱い適用になります。`,
      },
      {
        title: 'ネガティブプロンプト',
        content: `ネガティブプロンプトは、生成結果から除外したい要素を指定します。品質向上に欠かせないテクニックです。

推奨ネガティブプロンプト：
\`(worst quality:1.4), (low quality:1.4), normal quality, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry\`

不要な要素を具体的に指定することで、生成結果の品質が大幅に向上します。`,
      },
    ],
    faq: [
      { q: 'Stable Diffusionのプロンプトは何語で書きますか？', a: '基本的に英語で記述します。日本語にも一部対応していますが、英語の方がより正確に意図が伝わり、高品質な結果が得られます。' },
      { q: 'プロンプトの長さに制限はありますか？', a: 'トークン数（75トークン程度）に制限があります。長すぎるプロンプトは後半が無視される場合があるため、重要なキーワードを先頭に配置することが重要です。' },
    ],
  },
  'midjourney-prompt-guide': {
    sections: [
      {
        title: 'Midjourneyプロンプトの基本',
        content: `Midjourneyは、Discordベースの画像生成AIツールです。プロンプトは自然な英語の文章で記述でき、Stable Diffusionよりも直感的に使えます。

基本構文：\`/imagine prompt: [画像の説明] --[パラメータ]\`

Midjourneyの特徴は、アーティスティックな解釈力にあります。シンプルなプロンプトでも、独特の美しいスタイルで画像が生成されます。`,
      },
      {
        title: '主要パラメータ',
        content: `Midjourneyでは、パラメータを使って生成結果を細かく制御できます：

- **--ar** — アスペクト比（例: --ar 16:9, --ar 2:3）
- **--v** — バージョン指定（例: --v 6）
- **--s** — スタイライゼーション（0-1000、高いほどアーティスティック）
- **--q** — 品質（.25, .5, 1）
- **--niji** — アニメ風スタイル用のモデル
- **--no** — 特定要素の除外（例: --no text）`,
      },
    ],
    faq: [
      { q: 'Midjourneyは無料で使えますか？', a: 'Midjourneyは有料サブスクリプション制です。月額プランに加入することで、一定数の画像を生成できます。' },
    ],
  },
  'chatgpt-prompt-techniques': {
    sections: [
      {
        title: 'ChatGPTプロンプトの基本テクニック',
        content: `ChatGPTで効果的な結果を得るための基本テクニックを紹介します。

**ロール設定**: 「あなたは○○の専門家です」と役割を与えることで、その分野に特化した回答を引き出せます。

**ステップバイステップ指示**: 複雑なタスクを段階的に分解して指示することで、より正確な結果が得られます。

**出力形式の指定**: 「箇条書きで」「表形式で」「JSON形式で」など、出力形式を明示することで、使いやすい結果を得られます。`,
      },
      {
        title: '高度なテクニック',
        content: `**Few-Shot プロンプティング**: 期待する入出力の例を1-3個提示することで、AIの理解を助けます。

**Chain of Thought**: 「ステップバイステップで考えてください」と指示することで、論理的な推論を促し、より正確な回答を引き出せます。

**制約付きプロンプト**: 文字数、トーン、フォーマットなどの制約を明確にすることで、期待通りの出力を得やすくなります。`,
      },
    ],
    faq: [
      { q: 'ChatGPTとClaudeでプロンプトの書き方は違いますか？', a: '基本的なテクニックは共通ですが、各モデルの特性に合わせた調整が効果的です。Claudeは長文理解と分析に強く、ChatGPTは創造性とコード生成に強い傾向があります。' },
    ],
  },
  'negative-prompt-guide': {
    sections: [
      {
        title: 'ネガティブプロンプトとは',
        content: `ネガティブプロンプトは、AI画像生成において「生成してほしくない要素」を指定する機能です。Stable DiffusionやMidjourneyなどの画像生成AIで使用され、出力品質を大幅に向上させる重要なテクニックです。

例えば、人物画像を生成する際に「bad hands, extra fingers」をネガティブプロンプトに設定することで、手の描写が改善されます。`,
      },
      {
        title: '汎用ネガティブプロンプト',
        content: `ほぼすべての画像生成で使える基本ネガティブプロンプト：

\`(worst quality:1.4), (low quality:1.4), normal quality, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry, deformed, disfigured, mutation, extra limbs\`

このテンプレートをベースに、生成する画像の内容に応じて項目を追加・削除して使用します。`,
      },
    ],
    faq: [
      { q: 'ネガティブプロンプトは必須ですか？', a: '必須ではありませんが、使用することで画像品質が大幅に向上します。特にStable Diffusionでは、ネガティブプロンプトなしだと品質の低い画像が生成されやすいため、常に使用することを推奨します。' },
    ],
  },
}

export default async function GuidePage({ params }: Props) {
  const resolvedParams = await params
  const guide = GUIDES.find(g => g.slug === resolvedParams.slug)
  if (!guide) notFound()

  const guideContent = GUIDE_CONTENT[guide.slug]
  if (!guideContent) notFound()

  const relatedGuides = getRelatedGuides(guide.slug)
  const relations = GUIDE_RELATIONS[guide.slug]
  const relatedToolSlugs = relations?.tools ?? []
  const primaryTool = relatedToolSlugs[0]
  const relatedPrompts = primaryTool
    ? (await getPromptsByTool(primaryTool)).slice(0, 4)
    : []

  const faqSchema = guideContent.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guideContent.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  } : null

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'ガイド', href: '/guides' },
            { name: guide.title.split('—')[0].trim(), href: `/guides/${guide.slug}` },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-12">
          {/* Table of Contents — Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">目次</p>
              <nav className="space-y-1.5">
                {guideContent.sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="block text-sm text-gray-600 hover:text-sky-600 transition-colors py-1 border-l-2 border-transparent hover:border-sky-600 pl-3"
                  >
                    {section.title}
                  </a>
                ))}
                {guideContent.faq.length > 0 && (
                  <a
                    href="#faq"
                    className="block text-sm text-gray-600 hover:text-sky-600 transition-colors py-1 border-l-2 border-transparent hover:border-sky-600 pl-3"
                  >
                    よくある質問
                  </a>
                )}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {guide.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {guide.description}
              </p>
            </header>

            {/* Mobile TOC */}
            <nav className="lg:hidden mb-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">目次</p>
              <ol className="space-y-1 text-sm">
                {guideContent.sections.map((section, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`} className="text-sky-600 hover:text-sky-700">
                      {i + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Article Sections */}
            <div className="space-y-10">
              {guideContent.sections.map((section, i) => (
                <section key={i} id={`section-${i}`} className="scroll-mt-20">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-sky-500 inline-block">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content.split('\n\n').map((paragraph, j) => {
                      if (paragraph.startsWith('```')) {
                        const code = paragraph.replace(/```\w*\n?/g, '').trim()
                        return (
                          <pre key={j} className="my-4 p-4 bg-gray-900 text-gray-100 rounded-xl text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        )
                      }
                      return (
                        <p key={j} className="mb-4" dangerouslySetInnerHTML={{
                          __html: paragraph
                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                            .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 text-red-600 rounded text-sm font-mono">$1</code>')
                        }} />
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* FAQ */}
            {guideContent.faq.length > 0 && (
              <section id="faq" className="mt-12 scroll-mt-20">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-sky-500 inline-block">
                  よくある質問
                </h2>
                <div className="space-y-4">
                  {guideContent.faq.map((item, i) => (
                    <div key={i} className="p-5 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-2">Q. {item.q}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">A. {item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Prompts */}
            {relatedPrompts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-sky-500 inline-block">
                  関連プロンプト
                </h2>
                <PromptGrid prompts={relatedPrompts} />
                {primaryTool && (
                  <div className="mt-4 text-center">
                    <Link
                      href={`/tools/${primaryTool}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700"
                    >
                      {TOOLS.find(t => t.slug === primaryTool)?.name} のプロンプトをもっと見る →
                    </Link>
                  </div>
                )}
              </section>
            )}

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-sky-500 inline-block">
                  関連ガイド
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedGuides.map(g => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-sky-600 mb-1">{g.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{g.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA — Tool-specific */}
            <section className="mt-12 p-6 bg-sky-50 rounded-xl text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-2">プロンプトを試してみましょう</h2>
              <p className="text-sm text-gray-600 mb-4">
                このガイドで学んだテクニックを、実際のプロンプトで試してみてください。
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {(relatedToolSlugs.length > 0
                  ? TOOLS.filter(t => relatedToolSlugs.includes(t.slug))
                  : TOOLS.slice(0, 3)
                ).map(tool => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-sm font-medium text-gray-700 rounded-lg border border-gray-200 hover:border-sky-300 hover:text-sky-700 transition-all"
                  >
                    {tool.icon} {tool.name}
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  )
}
