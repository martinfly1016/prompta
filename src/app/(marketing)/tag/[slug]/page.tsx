import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { getPromptsByTagPaginated, getApprovedTagSlugs, getTagBySlug, getPrimaryCategoryForTag, getPopularTagsByCategory } from '@/lib/data'
import { PromptGrid } from '@/components/prompt/PromptGrid'
import Pagination from '@/components/Pagination'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { notFound } from 'next/navigation'
import { REVALIDATE_LIST_SECONDS } from '@/lib/cache-policy'
import { isTagIndexable } from '@/lib/seo/indexing-policy'

export const revalidate = REVALIDATE_LIST_SECONDS

// Tag-level guide override — checked before the category fallback. Use when a
// specific tag has a more precisely-matched guide than its parent category's
// default (e.g. 身長差/体格差 → dedicated pair-prompt guide, not the broader
// body-type guide that absorbs every body-related query).
const TAG_TO_GUIDE: Record<string, { slug: string; title: string }> = {
  '身長差': { slug: 'height-difference-pair-prompt', title: '身長差プロンプトのやり方・作り方完全ガイド' },
  '体格差': { slug: 'height-difference-pair-prompt', title: '身長差・体格差プロンプト完全ガイド' },
  'BL': { slug: 'bl-composition-prompt-guide', title: 'BL カップル構図のAIプロンプト完全ガイド' },
  'BL ポーズ': { slug: 'bl-pose-collection-guide', title: 'BL ポーズ集｜AIで再現する男性 2 人の定番 30 ポーズ完全ガイド' },
  '二人構図': { slug: 'two-person-composition-prompt-guide', title: 'カップルポーズ・二人構図のAIプロンプト完全ガイド' },
  'カップル': { slug: 'two-person-composition-prompt-guide', title: 'カップルポーズ・二人構図のAIプロンプト完全ガイド' },
  '壁ドン': { slug: 'kabedon-prompt-guide', title: '壁ドンプロンプト｜身長差・視点別の英語呪文【コピペOK】' },
  'キス': { slug: 'kiss-prompt-guide', title: 'キスプロンプト集｜キス顔・頬キス・キス待ちの英語呪文【コピペOK】' },
  'ハグ': { slug: 'hug-prompt-guide', title: 'ハグ・抱き合うプロンプト｜バックハグ等の英語呪文【コピペOK】' },
  'バックハグ': { slug: 'hug-prompt-guide', title: 'ハグ・抱き合うプロンプト｜バックハグ等の英語呪文【コピペOK】' },
  '抱き合う': { slug: 'hug-prompt-guide', title: 'ハグ・抱き合うプロンプト｜バックハグ等の英語呪文【コピペOK】' },
  '後ろから抱きつく': { slug: 'hug-prompt-guide', title: 'ハグ・抱き合うプロンプト｜バックハグ等の英語呪文【コピペOK】' },
  '暗い': { slug: 'dark-room-prompt-guide', title: '暗い部屋プロンプト｜薄暗い室内・夜の照明の英語呪文【コピペOK】' },
  '低身長': { slug: 'short-height-petite-prompt', title: '低身長・小柄プロンプト｜大人の小柄キャラの英語呪文【コピペOK】' },
  '小柄': { slug: 'short-height-petite-prompt', title: '低身長・小柄プロンプト｜大人の小柄キャラの英語呪文【コピペOK】' },
  'お姫様抱っこ': { slug: 'princess-carry-prompt-guide', title: 'お姫様抱っこプロンプト｜英語呪文と崩れ対策【コピペOK】' },
  'ぽっちゃり': { slug: 'plump-body-prompt-guide', title: 'ぽっちゃりプロンプト｜ふくよか体型の英語呪文【コピペOK】' },
  '見上げる': { slug: 'two-person-composition-prompt-guide', title: '二人構図プロンプト完全ガイド｜見上げる構図' },
  'ローアングル': { slug: 'low-angle-prompt-guide', title: '下からのアングルプロンプト【コピペOK】' },
  'カメラアングル': { slug: 'composition-angle-prompt-guide', title: '構図・アングルのプロンプト一覧｜正面・斜め・全身【コピペOK】' },
  '俯瞰': { slug: 'high-angle-prompt-guide', title: '見下ろす構図・俯瞰プロンプト｜上からのアングル【コピペOK】' },
  '金髪': { slug: 'hair-color-prompt-guide', title: '髪色プロンプト一覧｜メッシュ・インナーカラー【コピペOK】' },
  '黒髪': { slug: 'hair-color-prompt-guide', title: '髪色プロンプト一覧｜メッシュ・インナーカラー【コピペOK】' },
  '赤髪': { slug: 'hair-color-prompt-guide', title: '髪色プロンプト一覧｜メッシュ・インナーカラー【コピペOK】' },
  '銀髪': { slug: 'hair-color-prompt-guide', title: '髪色プロンプト一覧｜メッシュ・インナーカラー【コピペOK】' },
  'マルチカラー': { slug: 'hair-color-prompt-guide', title: '髪色プロンプト一覧｜メッシュ・インナーカラー【コピペOK】' },
  '背景': { slug: 'background-prompt-guide', title: '背景プロンプト一覧【場所別・コピペOK】' },
  '表情変更': { slug: 'stable-diffusion-expression-prompt', title: 'Stable Diffusion表情プロンプト【コピペOK】' },
  'ネックレス': { slug: 'accessory-prompt-guide', title: 'ネックレス・アクセサリープロンプト｜英語一覧【コピペOK】' },
  'ジュエリー': { slug: 'accessory-prompt-guide', title: 'ネックレス・アクセサリープロンプト｜英語一覧【コピペOK】' },
  'アクセサリー': { slug: 'accessory-prompt-guide', title: 'ネックレス・アクセサリープロンプト｜英語一覧【コピペOK】' },
  'スーツ': { slug: 'suit-lab-coat-prompt-guide', title: 'スーツ・白衣プロンプト｜仕事服の英語呪文【コピペOK】' },
  '線画': { slug: 'art-style-prompt-guide', title: '画風プロンプト一覧｜絵柄・塗りの英語呪文【コピペOK】' },
  '水彩': { slug: 'art-style-prompt-guide', title: '画風プロンプト一覧｜絵柄・塗りの英語呪文【コピペOK】' },
  '厚塗り': { slug: 'art-style-prompt-guide', title: '画風プロンプト一覧｜絵柄・塗りの英語呪文【コピペOK】' },
  '画風': { slug: 'art-style-prompt-guide', title: '画風プロンプト一覧｜絵柄・塗りの英語呪文【コピペOK】' },
  '油絵': { slug: 'art-style-prompt-guide', title: '画風プロンプト一覧｜絵柄・塗りの英語呪文【コピペOK】' },
  'ドット絵': { slug: 'art-style-prompt-guide', title: '画風プロンプト一覧｜絵柄・塗りの英語呪文【コピペOK】' },
  'ロングヘア': { slug: 'long-hair-prompt-guide', title: 'ロングヘアプロンプト｜ストレート・黒髪【コピペOK】' },
  'ストレート': { slug: 'long-hair-prompt-guide', title: 'ロングヘアプロンプト｜ストレート・黒髪【コピペOK】' },
  'ストレートヘア': { slug: 'long-hair-prompt-guide', title: 'ロングヘアプロンプト｜ストレート・黒髪【コピペOK】' },
  '黒髪ロング': { slug: 'long-hair-prompt-guide', title: 'ロングヘアプロンプト｜ストレート・黒髪【コピペOK】' },
  '編み込み': { slug: 'braid-prompt-guide', title: '編み込み・三つ編みプロンプト｜英語呪文一覧【コピペOK】' },
  '三つ編み': { slug: 'braid-prompt-guide', title: '編み込み・三つ編みプロンプト｜英語呪文一覧【コピペOK】' },
  'おさげ': { slug: 'braid-prompt-guide', title: '編み込み・三つ編みプロンプト｜英語呪文一覧【コピペOK】' },
  '前髪': { slug: 'bangs-prompt-guide', title: '前髪プロンプト一覧｜ぱっつん・分け目の英語呪文【コピペOK】' },
  'ぱっつん': { slug: 'bangs-prompt-guide', title: '前髪プロンプト一覧｜ぱっつん・分け目の英語呪文【コピペOK】' },
  '姫カット': { slug: 'bangs-prompt-guide', title: '前髪プロンプト一覧｜ぱっつん・分け目の英語呪文【コピペOK】' },
  '着物': { slug: 'kimono-prompt-guide', title: '着物プロンプト｜白無垢・浴衣・袴の英語呪文【コピペOK】' },
  '白無垢': { slug: 'kimono-prompt-guide', title: '着物プロンプト｜白無垢・浴衣・袴の英語呪文【コピペOK】' },
  '浴衣': { slug: 'kimono-prompt-guide', title: '着物プロンプト｜白無垢・浴衣・袴の英語呪文【コピペOK】' },
  '和服': { slug: 'kimono-prompt-guide', title: '着物プロンプト｜白無垢・浴衣・袴の英語呪文【コピペOK】' },
  '和装': { slug: 'kimono-prompt-guide', title: '着物プロンプト｜白無垢・浴衣・袴の英語呪文【コピペOK】' },
  '袴': { slug: 'kimono-prompt-guide', title: '着物プロンプト｜白無垢・浴衣・袴の英語呪文【コピペOK】' },
  '振袖': { slug: 'kimono-prompt-guide', title: '着物プロンプト｜白無垢・浴衣・袴の英語呪文【コピペOK】' },
  'ファンタジー衣装': { slug: 'fantasy-outfit-prompt-guide', title: 'ファンタジー衣装プロンプト｜騎士・魔法使いの呪文【コピペOK】' },
  '鎧': { slug: 'fantasy-outfit-prompt-guide', title: 'ファンタジー衣装プロンプト｜騎士・魔法使いの呪文【コピペOK】' },
  '甲冑': { slug: 'fantasy-outfit-prompt-guide', title: 'ファンタジー衣装プロンプト｜騎士・魔法使いの呪文【コピペOK】' },
  '魔法使い': { slug: 'fantasy-outfit-prompt-guide', title: 'ファンタジー衣装プロンプト｜騎士・魔法使いの呪文【コピペOK】' },
  'ファンタジーキャラ': { slug: 'fantasy-outfit-prompt-guide', title: 'ファンタジー衣装プロンプト｜騎士・魔法使いの呪文【コピペOK】' },
  '全身': { slug: 'composition-angle-prompt-guide', title: '構図・アングルのプロンプト一覧｜正面・斜め・全身【コピペOK】' },
  '構図': { slug: 'composition-angle-prompt-guide', title: '構図・アングルのプロンプト一覧｜正面・斜め・全身【コピペOK】' },
  'アングル': { slug: 'composition-angle-prompt-guide', title: '構図・アングルのプロンプト一覧｜正面・斜め・全身【コピペOK】' },
  '後ろ姿': { slug: 'composition-angle-prompt-guide', title: '構図・アングルのプロンプト一覧｜正面・斜め・全身【コピペOK】' },
  '横顔': { slug: 'composition-angle-prompt-guide', title: '構図・アングルのプロンプト一覧｜正面・斜め・全身【コピペOK】' },
  '年賀状': { slug: 'new-year-card-ai-prompt-guide', title: 'AI年賀状プロンプト2027｜未年の羊イラスト【コピペOK】' },
  'お正月': { slug: 'new-year-card-ai-prompt-guide', title: 'AI年賀状プロンプト2027｜未年の羊イラスト【コピペOK】' },
  '正月': { slug: 'new-year-card-ai-prompt-guide', title: 'AI年賀状プロンプト2027｜未年の羊イラスト【コピペOK】' },
  'ドレス': { slug: 'dress-prompt-guide', title: 'ドレスプロンプト｜種類・色・丈の英語呪文一覧【コピペOK】' },
  'ウェディングドレス': { slug: 'dress-prompt-guide', title: 'ドレスプロンプト｜種類・色・丈の英語呪文一覧【コピペOK】' },
  'イブニングドレス': { slug: 'dress-prompt-guide', title: 'ドレスプロンプト｜種類・色・丈の英語呪文一覧【コピペOK】' },
  'ワンピース': { slug: 'dress-prompt-guide', title: 'ドレスプロンプト｜種類・色・丈の英語呪文一覧【コピペOK】' },
  'オッドアイ': { slug: 'eye-prompt-guide', title: '目・瞳のプロンプト一覧｜色・形・ハイライト【コピペOK】' },
  '瞳': { slug: 'eye-prompt-guide', title: '目・瞳のプロンプト一覧｜色・形・ハイライト【コピペOK】' },
  '目': { slug: 'eye-prompt-guide', title: '目・瞳のプロンプト一覧｜色・形・ハイライト【コピペOK】' },
  '青い目': { slug: 'eye-prompt-guide', title: '目・瞳のプロンプト一覧｜色・形・ハイライト【コピペOK】' },
  '赤い目': { slug: 'eye-prompt-guide', title: '目・瞳のプロンプト一覧｜色・形・ハイライト【コピペOK】' },
}

const TAG_ALSO_GUIDES: Record<string, { slug: string; title: string; description: string }> = {
  '俯瞰': {
    slug: 'low-angle-prompt-guide',
    title: '下からのアングルプロンプト【コピペOK】',
    description: '下から見上げる構図です。見下ろす構図とはカメラの向きが逆になります。',
  },
  'カップル': {
    slug: 'hug-prompt-guide',
    title: 'ハグ・抱き合うプロンプト｜バックハグ等の英語呪文【コピペOK】',
    description: '抱き合う、バックハグ、後ろから抱きつくときの腕の位置を英語タグでまとめています。',
  },
  '二人構図': {
    slug: 'hand-holding-prompt-guide',
    title: '恋人繋ぎプロンプト｜手をつなぐ英語呪文【コピペOK】',
    description: '恋人繋ぎ・手をつなぐときの指の位置と、指が増えるときの直し方を英語タグでまとめています。',
  },
  'お姫様抱っこ': {
    slug: 'hug-prompt-guide',
    title: 'ハグ・抱き合うプロンプト｜バックハグ等の英語呪文【コピペOK】',
    description: '抱きしめる・バックハグはこちら。',
  },
  'BL': {
    slug: 'hug-prompt-guide',
    title: 'ハグ・抱き合うプロンプト｜バックハグ等の英語呪文【コピペOK】',
    description: '後ろから抱きつく構図と、腕を回す位置の英語タグです。',
  },
}

const TAG_META_OVERRIDE: Record<string, { title: string; description: string }> = {
  'セーラー服': {
    title: 'セーラー服プロンプト集｜スカーフ・夏服・冬服【コピペOK】',
    description: 'セーラー服プロンプト集。スカーフ、夏服の半袖、冬服の長袖、黒セーラーを英語タグでコピペできます。',
  },
  '証明写真': {
    title: '証明写真プロンプト｜ChatGPT・Gemini用【コピペOK】',
    description: '証明写真をAIで作るプロンプト集。ChatGPT・Geminiに自撮りを渡して、履歴書・パスポート・マイナンバー・在留カード規格に近づける背景色やサイズ、服装の指示文をコピペで使えます。仕上がりが提出できるかは、発行元の指定で確認してください。',
  },
  'ぽっちゃり': {
    title: '「ぽっちゃり」プロンプト作例集｜ふくよか・プラスサイズ',
    description: 'ぽっちゃり・ふくよか・プラスサイズ体型の大人キャラのAIプロンプト作例集。plump・plus-size の使い分けと崩れ対策は、ぽっちゃりプロンプトの解説ガイドで紹介しています。',
  },
  '暗い': {
    title: '「暗い部屋」プロンプト作例集｜薄暗い室内・夜の照明',
    description: '暗い部屋・薄暗い室内・夜の間接照明のAIプロンプト作例集。英語タグの書き方と、暗くなりすぎるときの直し方は暗い部屋プロンプトの解説ガイドで紹介しています。',
  },
  'キス': {
    title: '「キス」プロンプト作例集｜キス顔・キスシーン',
    description: 'キス顔・キスシーンのAIプロンプト作例集。頬へのキスやキス待ち顔の英語タグと、顔が崩れるときの直し方はキスプロンプトの解説ガイドで紹介しています。',
  },
  '金髪': {
    title: '「金髪」プロンプト作例集｜ブロンドヘアの英語タグ',
    description: '金髪・ブロンドヘアのAIプロンプト作例集。blonde hair の色味の違いやメッシュ・インナーカラーとの組み合わせは、髪色プロンプトの解説ガイドで紹介しています。',
  },
}

// Category → canonical guide fallback. Used to surface a "詳しい解説ガイド" CTA
// on tag pages so prompt-seeking visitors who'd rather read context (~11% of
// /tag/身長差 sessions already do this) get a clear path in addition to the
// inline prompts.
const CATEGORY_TO_GUIDE: Record<string, { slug: string; title: string }> = {
  'hairstyle': { slug: 'hairstyle-prompt-guide', title: '髪型プロンプトの書き方ガイド' },
  'cosplay':   { slug: 'cosplay-prompt-guide', title: 'コスプレプロンプトの書き方ガイド' },
  'anime':     { slug: 'anime-prompt-guide', title: 'アニメ風プロンプトの書き方ガイド' },
  'body-type': { slug: 'body-type-prompt-guide', title: '体型・身長差プロンプトの書き方ガイド' },
  'color':     { slug: 'color-prompt-guide', title: '色・カラープロンプトの書き方ガイド' },
}

const TAG_GUIDE_CTA_COPY: Record<string, { label: string; description: string }> = {
  '身長差': {
    label: 'やり方・作り方を先に読む',
    description: '推しとの身長差、BL・百合・男女カップル、逆身長差、体格差の英語プロンプト例をまとめています。',
  },
  '体格差': {
    label: '体格差の出し方を先に読む',
    description: '筋肉質 × 小柄、騎士 × 魔法使いなど、身長差と体格差を分けて指定するコツを解説しています。',
  },
}

const TAG_TO_TOOL: Record<string, { href: string; label: string; title: string; description: string }> = {
  '身長差': {
    href: '/tools/height-difference-maker',
    label: '身長差メーカー',
    title: '推しとの身長差プロンプトを作成する',
    description: '身長・関係性・ポーズを選ぶだけで、Stable Diffusion / Midjourney / ChatGPT 用の英語プロンプトを生成できます。',
  },
  '体格差': {
    href: '/tools/height-difference-maker',
    label: '体格差ツール',
    title: '体格差構図プロンプトを作成する',
    description: '筋肉量・肩幅・横幅の差を強調する体格差プロンプトとネガティブプロンプトを生成できます。',
  },
}

export async function generateStaticParams() {
  const slugs = await getApprovedTagSlugs()
  return slugs.map(slug => ({ slug: encodeURIComponent(slug) }))
}

/** Decode once or twice. A double-encoded param would otherwise miss the tag and noindex the real URL. */
export function decodeTagSlug(raw: string): string {
  let value = raw
  for (let i = 0; i < 2; i++) {
    if (!/%[0-9A-Fa-f]{2}/.test(value)) break
    try {
      const next = decodeURIComponent(value)
      if (next === value) break
      value = next
    } catch {
      break
    }
  }
  return value
}

export async function tagMetadata(rawSlug: string, page: number): Promise<Metadata> {
  const tag = decodeTagSlug(rawSlug)
  const suffix = page > 1 ? ` — ページ${page}` : ''

  const tagData = await getTagBySlug(tag)
  const isApproved = tagData?.isApproved ?? false
  const indexable = isTagIndexable(tag, isApproved)

  const override = TAG_META_OVERRIDE[tag]
  const defaultTitle = `「${tag}」プロンプト一覧【無料・コピペOK】${suffix}`
  const defaultDescription = `「${tag}」関連のAIプロンプト集。Stable Diffusion・Midjourney・ChatGPT・Claude・DALL-E対応。コピペでそのまま使えるサンプルを多数掲載しています。`

  const title = override
    ? `${override.title}${suffix}`
    : tagData?.seoTitle
      ? `${tagData.seoTitle}${suffix}`
      : defaultTitle
  const description = page === 1 && override
    ? override.description
    : page === 1 && tagData?.seoDescription
      ? tagData.seoDescription
      : defaultDescription

  return {
    title,
    description,
    alternates: { canonical: `${SITE_CONFIG.url}/tag/${encodeURIComponent(tag)}${page > 1 ? `/page/${page}` : ''}` },
    ...(!indexable && { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }),
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return tagMetadata(params.slug, 1)
}

export async function TagListing({ slug: rawSlug, page }: { slug: string; page: number }) {
  const tag = decodeTagSlug(rawSlug)
  const [tagData, { prompts, total, totalPages }] = await Promise.all([
    getTagBySlug(tag),
    getPromptsByTagPaginated(tag, page),
  ])
  if (page > Math.max(totalPages, 1)) notFound()

  const primaryCategory = tagData ? await getPrimaryCategoryForTag(tag) : null
  const relatedTags = primaryCategory
    ? (await getPopularTagsByCategory(primaryCategory.slug, 8)).filter(t => t.slug !== tag).slice(0, 6)
    : []
  const relatedGuide =
    TAG_TO_GUIDE[tag] ?? (primaryCategory ? CATEGORY_TO_GUIDE[primaryCategory.slug] : undefined)
  const alsoGuide = TAG_ALSO_GUIDES[tag]
  const guideCtaCopy = TAG_GUIDE_CTA_COPY[tag]
  const relatedTool = TAG_TO_TOOL[tag]

  const tagUrl = `${SITE_CONFIG.url}/tag/${encodeURIComponent(tag)}`
  const collectionSchema = generateCollectionPageSchema(
    `「${tag}」プロンプト一覧`,
    tagData?.seoDescription ?? `「${tag}」関連のAIプロンプト集`,
    tagUrl,
    total,
  )
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'ホーム', url: '/' },
      { name: '全プロンプト', url: '/prompts' },
      { name: `# ${tag}`, url: `/tag/${encodeURIComponent(tag)}` },
    ],
    SITE_CONFIG.url,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: '全プロンプト', href: '/prompts' }, { name: `# ${tag}`, href: `/tag/${encodeURIComponent(tag)}` }]} />
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2"># {tag}</h1>
            <p className="text-gray-500">「{tag}」タグが付いたプロンプト {total}件</p>
          </div>

          {relatedGuide && page === 1 && (
            <Link
              href={`/guides/${relatedGuide.slug}`}
              className="group flex items-center gap-3 mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg hover:border-sky-400 hover:bg-sky-100 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-sky-700 uppercase tracking-wide mb-0.5">
                  {guideCtaCopy?.label ?? '解説ガイド'}
                </p>
                <p className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors truncate">
                  {relatedGuide.title}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {guideCtaCopy?.description ?? 'プロンプトの書き方・使い方を詳しく解説（5分）'}
                </p>
              </div>
              <span className="flex-shrink-0 text-sky-600 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          )}

          {alsoGuide && page === 1 && alsoGuide.slug !== relatedGuide?.slug && (
            <Link
              href={`/guides/${alsoGuide.slug}`}
              className="group flex items-center gap-3 mb-6 p-4 bg-white border border-sky-200 rounded-lg hover:border-sky-400 hover:bg-sky-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-sky-700 uppercase tracking-wide mb-0.5">
                  関連ガイド
                </p>
                <p className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors truncate">
                  {alsoGuide.title}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {alsoGuide.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-sky-600 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          )}

          {relatedTool && page === 1 && (
            <Link
              href={relatedTool.href}
              className="group flex items-center gap-3 mb-6 p-4 bg-white border border-sky-200 rounded-lg hover:border-sky-400 hover:bg-sky-50 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-50 text-lg shrink-0">
                📏
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-sky-700 uppercase tracking-wide mb-0.5">
                  {relatedTool.label}
                </p>
                <p className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors">
                  {relatedTool.title}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {relatedTool.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-sky-600 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          )}

          <PromptGrid
            prompts={prompts}
            showInlinePrompt
            inlinePromptSurface="tag-card"
          />
          <Pagination currentPage={page} totalPages={totalPages} basePath={`/tag/${encodeURIComponent(tag)}`} />
        </div>
      </section>

      {tagData?.seoIntro && (
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">「{tag}」プロンプトとは？</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {tagData.seoIntro}
            </p>
          </div>
        </section>
      )}

      {relatedTags.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">関連タグ</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map(t => (
                <Link
                  key={t.slug}
                  href={`/tag/${encodeURIComponent(t.slug)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 text-sm font-medium rounded-full border border-sky-200 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                >
                  <span>#</span>
                  <span>{t.name}</span>
                  <span className="text-xs text-sky-500">{t.promptCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {primaryCategory && (
        <section className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/prompts/${primaryCategory.slug}`}
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
            >
              <span>{primaryCategory.icon}</span>
              <span>「{primaryCategory.name}」カテゴリの全プロンプトを見る →</span>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

export default function TagPage({ params }: { params: { slug: string } }) {
  return <TagListing slug={params.slug} page={1} />
}
