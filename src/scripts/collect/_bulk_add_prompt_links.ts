// @ts-nocheck
/**
 * Bulk-insert "✨ 関連プロンプト集" section into 9 zero-internal-link guides.
 *
 * Each new section is appended just before the closing `],\n    faq: [`
 * of the guide's `sections` array. Uses the markdown link rendering
 * shipped earlier today so the [title](/prompt/slug) syntax becomes
 * clickable <a> tags at runtime.
 *
 * Run once: npx tsx src/scripts/collect/_bulk_add_prompt_links.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const PAGE_PATH = resolve(__dirname, '../../../src/app/(marketing)/guides/[slug]/page.tsx')

interface LinkBlock {
  guide: string
  title: string
  intro: string
  links: { label: string; href: string }[]
  outroLink?: { label: string; href: string }
}

const BLOCKS: LinkBlock[] = [
  {
    guide: 'hairstyle-prompt-guide',
    title: '✨ 関連プロンプト集 — すぐ試せる髪型サンプル',
    intro: '本ガイドで紹介した髪型表現テクニックを使ったプロンプトです。クリックで詳細ページに移動、ログイン後にサイト内で実行できます。',
    links: [
      { label: 'ストレートロングの黒髪ヘアスタイル', href: '/prompt/straight-long-black-hair-glossy' },
      { label: 'ツインテール金髪セーラームーン風美少女', href: '/prompt/twintail-blonde-sailor-outfit' },
      { label: '赤髪ビジネスウーマン 正装スーツ', href: '/prompt/red-hair-business-suit-portrait' },
      { label: 'レトロ風ツートンカラーヘア', href: '/prompt/two-tone-red-white-retro-hair' },
      { label: '魔法のエルフ戦士 編み込み髪型', href: '/prompt/elf-warrior-braided-hair' },
      { label: '花髪・水彩画風 女の子ポートレート', href: '/prompt/flower-hair-watercolor-girl-mj' },
    ],
    outroLink: { label: '全ての髪型プロンプト一覧（カテゴリページ）', href: '/prompts/hairstyle' },
  },
  {
    guide: 'body-type-prompt-guide',
    title: '✨ 関連プロンプト集 — 体型・身長差サンプル',
    intro: '本ガイドの体型表現テクニックを使ったサンプルプロンプトです。スレンダー・カーヴィ・筋肉質・身長差ペアまで幅広くカバー。',
    links: [
      { label: '格闘技女性：強い腹筋とアスレティック体型', href: '/prompt/athletic-jiu-jitsu-girl-muscles' },
      { label: 'ピンクジムウェアのカーヴィボディ', href: '/prompt/curvy-pink-gym-simple-background' },
      { label: 'スレンダー高身長美女クロップトップ', href: '/prompt/slender-crop-top-elegant-confident' },
      { label: 'ダークファンタジー酒場戦士肖像画', href: '/prompt/dark-fantasy-tavern-warrior' },
      { label: 'スレンダー体型 ロングブラウンヘア', href: '/prompt/slender-brown-hair-full-length' },
      { label: '老人 × 巨大怪物の体格差', href: '/prompt/old-man-giant-monster-bodytype-dark' },
    ],
    outroLink: { label: '全ての体型プロンプト + 身長差ペア集', href: '/prompts/body-type' },
  },
  {
    guide: 'cosplay-prompt-guide',
    title: '✨ 関連プロンプト集 — コスプレ実例',
    intro: '本ガイドのコスプレ表現テクニックを使ったプロンプトです。アニメキャラ再現から学園もの・ファンタジーまで。',
    links: [
      { label: '不思議の国のアリス風コスプレ', href: '/prompt/alice-in-wonderland-cosplay' },
      { label: '解かれたネクタイ制服', href: '/prompt/untied-necktie-uniform-girl' },
      { label: '学校制服プロンプト セーラー服コスプレ', href: '/prompt/school-uniform-pleated-skirt' },
      { label: 'ウォーハンマー40K ケイオスウィッチ', href: '/prompt/warhammer-40k-chaos-witch-cosplay' },
      { label: '黒白メイド - コスプレプロンプト', href: '/prompt/maid-costume-3d-render' },
      { label: 'ダークアカデミア学校制服', href: '/prompt/dark-academia-school-uniform' },
      { label: '竜姫ゼルダ青目ドレス', href: '/prompt/dragon-princess-zelda-dress' },
    ],
    outroLink: { label: '全てのコスプレプロンプト', href: '/prompts/cosplay' },
  },
  {
    guide: 'color-prompt-guide',
    title: '✨ 関連プロンプト集 — カラーパレット実例',
    intro: '本ガイドのカラー指定テクニックを使ったプロンプトです。ネオン・サイバーパンク・モノクロ・パステルまで色彩設計の幅広い実例。',
    links: [
      { label: 'ネオン・サイバーパンク色彩表現', href: '/prompt/neon-cyberpunk-1' },
      { label: 'AI 色彩表現プロンプト', href: '/prompt/color-theme-13' },
      { label: 'グリーン肌キャラクター カラー表現', href: '/prompt/green-skin-character-colorful-hat' },
      { label: 'モノクロ・グレースケール映像スタイル', href: '/prompt/monochrome-theme-14' },
      { label: '工筆画風の鮮やかなミネラルカラー', href: '/prompt/gongbi-painting-mineral-pigment-colors' },
      { label: '夕焼け川・森景色 色彩カラー', href: '/prompt/sunset-river-forest-color-mj' },
    ],
    outroLink: { label: '全てのカラープロンプト', href: '/prompts/color' },
  },
  {
    guide: 'anime-prompt-guide',
    title: '✨ 関連プロンプト集 — アニメイラスト実例',
    intro: '本ガイドのアニメスタイル表現テクニックを使ったプロンプトです。ポートレート・キャラデザ・水墨画風・80 年代アニメまで幅広く。',
    links: [
      { label: 'animeプロンプト基礎', href: '/prompt/anime-prompt-f061b77b' },
      { label: '美しいアニメ女性キャラクター 宇宙', href: '/prompt/anime-girl-space-03' },
      { label: '初音ミクの水墨画風イラスト', href: '/prompt/hatsune-miku-ink-wash-japanese' },
      { label: 'アニメキャラクターデザイン ネオン', href: '/prompt/anime-char-neon-07' },
      { label: 'オレンジヘアポニーテール キャラクター', href: '/prompt/orange-hair-braid-multicolor-jacket' },
      { label: '80 年代アニメ宇宙戦士女性 DALL-E', href: '/prompt/dalle-1980s-anime-space-opera-girl' },
    ],
    outroLink: { label: '全てのアニメプロンプト', href: '/prompts/anime' },
  },
  {
    guide: 'midjourney-prompt-guide',
    title: '✨ 関連プロンプト集 — Midjourney 実例',
    intro: '本ガイドの Midjourney プロンプト記法を使った実例集。背景・キャラ・カラー・ファッションなど主要ジャンルを網羅。',
    links: [
      { label: 'ネオン未来都市 - 背景プロンプト', href: '/prompt/neon-futuristic-cityscape-aerial' },
      { label: '黒白メイド - コスプレプロンプト', href: '/prompt/maid-costume-3d-render' },
      { label: 'グリーン肌キャラクター カラー表現', href: '/prompt/green-skin-character-colorful-hat' },
      { label: '青黄トカゲ・王族キャラ', href: '/prompt/royal-creature-blue-yellow-mj' },
      { label: 'オレンジジャケット・サイバーパンク街', href: '/prompt/cyberpunk-street-jacket-mj' },
      { label: '花髪・水彩画風 女の子ポートレート', href: '/prompt/flower-hair-watercolor-girl-mj' },
      { label: '白と金のドレス赤髪女性ポートレート', href: '/prompt/white-gold-dress-red-haired-portrait' },
    ],
    outroLink: { label: 'Midjourney 全プロンプト集', href: '/tools/midjourney' },
  },
  {
    guide: 'chatgpt-prompt-techniques',
    title: '✨ 関連プロンプト集 — ChatGPT 実例',
    intro: '本ガイドの ChatGPT プロンプト技法を使った業務・学習・写真加工サンプル集。コピペで即時利用可。',
    links: [
      { label: '実験レポート作成', href: '/prompt/chatgpt-lab-report-writing' },
      { label: '医師の白衣に着せ替え', href: '/prompt/uniform-medical-doctor-white-coat' },
      { label: '日本運転免許証用証明写真変換', href: '/prompt/id-photo-chatgpt-japan-license' },
      { label: '語彙力強化', href: '/prompt/chatgpt-vocabulary-building' },
      { label: '文章校正・推敲', href: '/prompt/chatgpt-writer-proofreader' },
      { label: 'SEO 記事最適化', href: '/prompt/chatgpt-seo-article' },
      { label: 'LinkedIn 投稿制作', href: '/prompt/chatgpt-linkedin-post-creator' },
    ],
    outroLink: { label: 'ChatGPT 全プロンプト集', href: '/tools/chatgpt' },
  },
  {
    guide: 'prompt-language-game',
    title: '✨ 関連プロンプト集 — 言語学習・文章系',
    intro: '本ガイドの言語学習・文章生成のテクニックを使った Claude / ChatGPT 実例集。',
    links: [
      { label: '学術論文執筆アドバイザー - Claude', href: '/prompt/claude-academic-writing-advisor' },
      { label: '論文執筆 - Claude プロンプト', href: '/prompt/claude-research-paper' },
      { label: '語彙力強化 - ChatGPT', href: '/prompt/chatgpt-vocabulary-building' },
      { label: '読解力向上 - ChatGPT', href: '/prompt/chatgpt-reading-comprehension' },
      { label: 'ディベート準備 - ChatGPT', href: '/prompt/chatgpt-debate-preparation' },
      { label: 'メール作成 - Claude', href: '/prompt/claude-professional-email' },
    ],
    outroLink: { label: 'ライティング系プロンプト一覧', href: '/prompts/writing' },
  },
  {
    guide: 'negative-prompt-guide',
    title: '✨ 関連プロンプト集 — ネガティブプロンプトが効く実例',
    intro: '本ガイドのネガティブプロンプト技法をそのまま使えるサンプル集。高品質生成のテンプレとして。',
    links: [
      { label: 'animeプロンプト基礎', href: '/prompt/anime-prompt-f061b77b' },
      { label: '美しいアニメ女性キャラクター', href: '/prompt/anime-girl-space-03' },
      { label: 'セーラー服プリーツスカート黒髪', href: '/prompt/sailor-uniform-pleated-skirt' },
      { label: 'ストレートロングの黒髪ヘアスタイル', href: '/prompt/straight-long-black-hair-glossy' },
      { label: '初音ミクの水墨画風イラスト', href: '/prompt/hatsune-miku-ink-wash-japanese' },
      { label: 'スタジオライティングポートレート', href: '/prompt/studio-lighting-portrait-detailed' },
    ],
    outroLink: { label: 'アニメ + 髪型 + 撮影系プロンプト集', href: '/prompts/anime' },
  },
  {
    guide: 'ai-coloring-page-prompt',
    title: '✨ 関連プロンプト集 — 即印刷できる塗り絵サンプル',
    intro: '本ガイドのテンプレートで実際に生成した塗り絵プロンプトです。子供向け・大人向け・高齢者向け・季節物まで。コピペで A4 印刷可。',
    links: [
      { label: 'マンダラ花柄 大人の塗り絵', href: '/prompt/mandala-floral-coloring-page-adults' },
      { label: '薔薇の花束 大人の塗り絵', href: '/prompt/rose-bouquet-coloring-page-adults' },
      { label: 'かわいい恐竜 子供の塗り絵', href: '/prompt/cute-dinosaur-coloring-page-kids' },
      { label: '海の生き物 子供の塗り絵', href: '/prompt/sea-animals-coloring-page-kids' },
      { label: '大きな花 高齢者向け塗り絵', href: '/prompt/large-flowers-coloring-page-seniors' },
      { label: '桜と禅の塗り絵プロンプト', href: '/prompt/cherry-blossom-zen-coloring-page' },
    ],
    outroLink: { label: '全てのクリエイティブ系プロンプト', href: '/prompts/creative' },
  },
  {
    guide: 'prompt-writing-guide',
    title: '✨ 関連プロンプト集 — 書き方ガイドの即試せる実例',
    intro: '本ガイドの 7 つのコツ（ゴール設定・ロール・Few-Shot 等）を組み込んだ業務・学習・SEO 用テンプレート集。',
    links: [
      { label: '学術論文執筆アドバイザー - Claude', href: '/prompt/claude-academic-writing-advisor' },
      { label: '論文執筆 - Claude プロンプト', href: '/prompt/claude-research-paper' },
      { label: 'SEO 記事最適化 - ChatGPT', href: '/prompt/chatgpt-seo-article' },
      { label: 'ビジネスプラン - ChatGPT', href: '/prompt/chatgpt-business-plan' },
      { label: 'メール作成 - Claude', href: '/prompt/claude-professional-email' },
      { label: '交渉戦略コーチ - Claude', href: '/prompt/claude-negotiation-strategy' },
      { label: '実験レポート作成 - ChatGPT', href: '/prompt/chatgpt-lab-report-writing' },
    ],
    outroLink: { label: 'ライティング系プロンプト一覧', href: '/prompts/writing' },
  },
  {
    guide: 'gemini-prompt-collection',
    title: '✨ 関連プロンプト集 — Gemini 実例',
    intro: '本ガイドの Gemini 2.5 Flash Image（Nano Banana）プロンプト技法を使った写真加工・編集サンプル集。アップロード写真でそのまま使える。',
    links: [
      { label: '参照画像から服装移植 - 着せ替え', href: '/prompt/outfit-swap-reference-image' },
      { label: '髪色シミュレーション AI', href: '/prompt/hair-color-natural-simulation' },
      { label: '結婚式白無垢に着せ替え', href: '/prompt/wedding-shiromuku-japanese' },
      { label: '自然な美肌レタッチ', href: '/prompt/natural-skin-retouching-gentle' },
      { label: '背景置換 スタジオ風', href: '/prompt/background-replace-studio-neutral' },
      { label: 'AI 写真自動補正', href: '/prompt/photo-auto-enhance-vivid' },
      { label: '髪型バリエーション 9 マスグリッド', href: '/prompt/hairstyle-grid-9-variations' },
    ],
    outroLink: { label: 'Gemini 全プロンプト集', href: '/tools/gemini' },
  },
]

function renderBlock(b: LinkBlock): string {
  const linkLines = b.links.map((l) => `- [${l.label}](${l.href})`).join('\n')
  const outroLine = b.outroLink ? `\n\n→ ${b.linksOutro || ''}[${b.outroLink.label}](${b.outroLink.href})` : ''
  // Note: content uses literal newlines + markdown links — relies on the markdown
  // link renderer added in commit aadfb65.
  return `      {
        title: '${b.title}',
        content: \`${b.intro}

${linkLines}${outroLine}\`,
      },
`
}

function main() {
  let src = readFileSync(PAGE_PATH, 'utf-8')
  let inserted = 0
  let skipped = 0

  for (const block of BLOCKS) {
    // Find this guide's block start
    const guideStartRe = new RegExp(`^  '${block.guide}':\\s*\\{`, 'm')
    const guideStartMatch = guideStartRe.exec(src)
    if (!guideStartMatch) {
      console.error(`[${block.guide}] guide block not found, skipping`)
      skipped++
      continue
    }
    const guideStart = guideStartMatch.index

    // Find this guide's `    ],\n    faq:` closing of sections — search within this guide block
    const guideSlice = src.slice(guideStart)
    const closingMatch = /^    \],\n    faq:/m.exec(guideSlice)
    if (!closingMatch) {
      console.error(`[${block.guide}] closing pattern not found, skipping`)
      skipped++
      continue
    }
    const insertPos = guideStart + closingMatch.index

    // Check idempotency — skip if already inserted (look for "関連プロンプト集" inside this guide's slice)
    const nextGuideMatch = /\n  '[a-z-]+':\s*\{/.exec(guideSlice.slice(closingMatch.index))
    const guideEnd = guideStart + (nextGuideMatch ? closingMatch.index + nextGuideMatch.index : src.length - guideStart)
    const thisGuideContent = src.slice(guideStart, guideEnd)
    if (thisGuideContent.includes('関連プロンプト集')) {
      console.log(`[${block.guide}] already has 関連プロンプト集 section, skipping`)
      skipped++
      continue
    }

    const newSectionText = renderBlock(block)
    src = src.slice(0, insertPos) + newSectionText + src.slice(insertPos)
    console.log(`[${block.guide}] inserted (${block.links.length} prompt links)`)
    inserted++
  }

  writeFileSync(PAGE_PATH, src)
  console.log(`\n✅ inserted: ${inserted}, skipped: ${skipped}`)
}

main()
