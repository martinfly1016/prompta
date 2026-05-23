// @ts-nocheck
/**
 * 身長差ペア (height-difference pair) prompt batch — 2026-05-23.
 *
 * Drives the new SEO cluster identified from week's GSC data: 「身長差プロンプト」
 * (73 clicks/wk @ pos 2.02) family adds up to ~230 clicks/wk but current
 * tag pages are populated with off-target prompts (curvy single-body).
 *
 * Generates 15 narrative midjourney-style prompts targeting "two-character
 * height-difference pair" scenes across BL / yuri / hetero couple /
 * parent-child / OC pair / fantasy duo. Renders via fal SDXL (cheap +
 * SDXL handles tag-friendly prompts natively). Inserts into DB with:
 *   - category: body-type (matches the GSC landing)
 *   - tool: stable-diffusion
 *   - tag: 身長差 (approved)
 *
 * Cost: 15 × $0.005 fal-sdxl ≈ $0.075
 * Run: npx tsx src/scripts/collect/_height_diff_batch_2026_05_23.ts
 */
import 'dotenv/config'
import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'

const ROOT = resolve(__dirname, '../../..')
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/height-diff-2026-05-23`
const FAL_MODEL = process.env.FAL_SD_MODEL || 'fal-ai/fast-sdxl'
const FAL_ENDPOINT = `https://fal.run/${FAL_MODEL}`

interface PromptDef {
  slug: string
  title: string
  description: string
  content: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  altText: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

const PROMPTS: PromptDef[] = [
  // BL couple — height gap
  {
    slug: 'height-diff-bl-couple-tall-short',
    title: '身長差 BL カップル - 高身長×低身長プロンプト',
    description:
      '高身長攻め × 低身長受けの BL カップルを描く身長差プロンプト。pos 2 の身長差トレンドキーワード対応。anime / illustration style 向け。',
    tags: ['身長差', 'アニメ', 'ポートレート'],
    seoTitle: '身長差 BL カップル プロンプト | 高身長×低身長 AI 生成',
    seoDescription:
      '高身長攻め × 低身長受けの BL カップルを描く Stable Diffusion / Midjourney 身長差プロンプト。anime style、見上げる視線、立ち位置の指定方法も収録。',
    altText: '身長差 BL カップル - 高身長×低身長 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters standing side by side, dramatic height difference (one significantly taller, approximately 195cm; the other about 165cm), the shorter one looking up at the taller one with a soft expression, the taller one looking down with a gentle smile, modern casual outfits with contrasting color palette (dark navy and pale beige), warm indoor lighting, soft bokeh background suggesting a cafe, full body shot, sharp focus, (masterpiece:1.2), (best quality:1.4), (height difference:1.3), 2boys, BL romance illustration style',
    difficulty: 'intermediate',
  },
  // Yuri couple — height gap
  {
    slug: 'height-diff-yuri-couple-tall-petite',
    title: '身長差 百合カップル - 長身×小柄プロンプト',
    description:
      '長身×小柄の百合カップルを描く身長差プロンプト。GL ファンアート向け。anime style、見上げる目線、寄り添う構図を指定。',
    tags: ['身長差', 'アニメ', 'ポートレート'],
    seoTitle: '身長差 百合カップル プロンプト | 長身×小柄 GL 生成 AI',
    seoDescription:
      '長身お姉さん × 小柄な女の子の百合カップルを描く Stable Diffusion 身長差プロンプト。anime / GL style、頭を撫でる構図、共通の動作も収録。',
    altText: '身長差 百合カップル - 長身×小柄 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style female characters with a clear height difference (one tall around 178cm with long dark hair, the other petite around 155cm with short pastel hair), standing close together, the taller one gently placing a hand on the smaller one\'s head, soft pastel color palette, school uniforms or casual feminine outfits, warm afternoon lighting through a window, full body shot, sharp focus, (masterpiece:1.2), (best quality:1.4), (height difference:1.3), 2girls, yuri couple, GL romance illustration style',
    difficulty: 'intermediate',
  },
  // Hetero couple — classic tall man + petite woman
  {
    slug: 'height-diff-hetero-couple-classic',
    title: '身長差 男女カップル - 王道タッパ差プロンプト',
    description:
      '王道の男女身長差カップル（高身長男性×小柄女性）を描く身長差プロンプト。手をつなぐ・見上げる定番ポーズ収録。',
    tags: ['身長差', 'ポートレート', 'ファッション'],
    seoTitle: '身長差 男女カップル プロンプト | 王道 男×女 AI 生成',
    seoDescription:
      '高身長男性×小柄女性の王道身長差カップルを描く Stable Diffusion / Midjourney プロンプト。手をつなぐ・見上げる・腕を組むなど定番ポーズ別収録。',
    altText: '身長差 男女カップル - 高身長男×小柄女 - Stable Diffusion AI 生成画像',
    content:
      'A tall man (approximately 188cm) and a petite woman (approximately 160cm) standing together, holding hands, looking at each other with affectionate expressions, modern stylish casual outfits, the man in a long coat and dark jeans, the woman in a knitted dress, autumn city street background with soft golden hour lighting, full body shot showing their height difference clearly, sharp focus, (masterpiece:1.2), (best quality:1.4), (height difference:1.3), 1man and 1woman, romantic couple, photorealistic illustration style',
    difficulty: 'intermediate',
  },
  // Sibling — older brother + younger sister
  {
    slug: 'height-diff-siblings-brother-sister',
    title: '身長差 兄妹 - お兄ちゃんと妹プロンプト',
    description:
      '高校生兄と小学生妹の兄妹身長差を描くプロンプト。日常シーン・通学・並び立ちの構図。家族イラスト向け。',
    tags: ['身長差', 'アニメ', '学校制服'],
    seoTitle: '身長差 兄妹プロンプト | 高校生兄×小学生妹 AI 生成',
    seoDescription:
      '高校生兄と小学生妹の兄妹身長差を描く Stable Diffusion プロンプト。通学路の並び・手をつなぐ・頭を撫でるなど家族向け構図を収録。',
    altText: '身長差 兄妹 - 高校生兄と小学生妹 - Stable Diffusion AI 生成画像',
    content:
      'An anime-style tall older brother (about 178cm, in a Japanese high school blazer uniform) and a short younger sister (about 130cm, in an elementary school uniform with backpack), walking side by side on a suburban Japanese street, the older brother holding the younger sister\'s hand, both with kind smiles, soft morning light, cherry blossom petals in the air, full body shot showing the clear height gap, sharp focus, (masterpiece:1.2), (best quality:1.4), (height difference:1.3), 1boy and 1girl, siblings, family illustration style',
    difficulty: 'intermediate',
  },
  // Fantasy duo — giant knight + small mage
  {
    slug: 'height-diff-fantasy-knight-mage',
    title: '身長差 ファンタジー - 巨大騎士×小柄魔法使いプロンプト',
    description:
      '巨大な甲冑騎士 × 小柄なローブ魔法使いの身長差ペアプロンプト。冒険パーティ・ダンジョン背景のファンタジー定番構図。',
    tags: ['身長差', 'ファンタジー', '甲冑'],
    seoTitle: '身長差 ファンタジー プロンプト | 騎士×魔法使い AI 生成',
    seoDescription:
      '巨大な甲冑騎士×小柄なローブ魔法使いの身長差ペアを描く Stable Diffusion プロンプト。冒険パーティ、ダンジョン、ファンタジー城背景に対応。',
    altText: '身長差 ファンタジー - 騎士×魔法使い - Stable Diffusion AI 生成画像',
    content:
      'A massive armored knight (over 210cm tall, full plate armor with cape) standing protectively next to a small robed mage (about 150cm tall, hooded mage robe with a wooden staff), in a torch-lit medieval dungeon corridor, dramatic side lighting casting long shadows, both characters facing the viewer, full body shot emphasizing the dramatic size contrast, sharp focus, fantasy art style, (masterpiece:1.2), (best quality:1.4), (height difference:1.4), (size difference:1.3), 1tall knight and 1small mage, RPG adventure party',
    difficulty: 'intermediate',
  },
  // Modern couple — looking up / kabe-don
  {
    slug: 'height-diff-couple-kabedon-looking-up',
    title: '身長差 壁ドン - 見上げる視点プロンプト',
    description:
      '壁ドン構図で身長差を強調するプロンプト。高身長男性が小柄女性を壁に追い詰める少女漫画定番シーン。視点・光源の指定法も解説。',
    tags: ['身長差', 'アニメ', 'ドラマティック'],
    seoTitle: '身長差 壁ドン プロンプト | 見上げる視点 AI 生成',
    seoDescription:
      '少女漫画定番の壁ドン構図で身長差を強調する Stable Diffusion プロンプト。高身長男性が小柄女性を見下ろし、女性が見上げる感情豊かなシーン。',
    altText: '身長差 壁ドン - 見上げる構図 - Stable Diffusion AI 生成画像',
    content:
      'Romantic kabe-don pose: a tall man (about 185cm) places his hand on a wall next to a petite woman (about 158cm) trapped between his arm and the wall, the woman looking up at him with surprised flushed cheeks, the man looking down with a soft intense gaze, close-up shot from a slight low angle to emphasize his height, soft warm window light from the side, modern Japanese apartment interior background, (masterpiece:1.3), (best quality:1.4), (height difference:1.3), shoujo manga romance illustration style, blush, intimate atmosphere',
    difficulty: 'intermediate',
  },
  // Co-workers — formal duo
  {
    slug: 'height-diff-coworkers-formal-suit',
    title: '身長差 ビジネス同僚 - スーツ姿のタッパ差プロンプト',
    description:
      'ビジネススーツ姿の身長差ペア（先輩×後輩 / 上司×部下）を描くプロンプト。オフィス背景・並び立ち構図、商用イラスト向け。',
    tags: ['身長差', 'ビジネス', 'プロフェッショナル'],
    seoTitle: '身長差 ビジネス スーツプロンプト | 先輩×後輩 AI 生成',
    seoDescription:
      'スーツ姿の身長差ペア（先輩×後輩）を描く Stable Diffusion プロンプト。商用ビジネスイラスト・オフィス背景・並び立ち構図に対応。',
    altText: '身長差 ビジネス スーツ - 先輩×後輩 - Stable Diffusion AI 生成画像',
    content:
      'Two Japanese business professionals standing side by side in a modern office: a tall senior executive (about 184cm, dark gray pinstripe suit, confident posture) and a shorter junior employee (about 162cm, navy suit, more reserved posture), both holding tablets, glass office building windows behind them with city skyline blurred, natural daylight, full body shot, professional photography style, sharp focus, (masterpiece:1.2), (best quality:1.4), (height difference:1.3), 2 people, business portrait',
    difficulty: 'intermediate',
  },
  // VTuber-style — cute idol duo
  {
    slug: 'height-diff-vtuber-idol-duo',
    title: '身長差 VTuber アイドル - キラキラ衣装デュオプロンプト',
    description:
      'VTuber 風アイドルデュオの身長差プロンプト。きらきらアイドル衣装、ステージ照明、キラキラエフェクトでファンアート用に最適化。',
    tags: ['身長差', 'アニメ', 'ファンタジー衣装'],
    seoTitle: '身長差 VTuber アイドル プロンプト | デュオ衣装 AI 生成',
    seoDescription:
      'VTuber 風アイドルデュオの身長差を描く Stable Diffusion プロンプト。キラキラ衣装・ステージ照明・コラボ並び絵向けのファンアート用。',
    altText: '身長差 VTuber アイドル - デュオ衣装 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style virtual idol characters performing on stage: a tall character (about 175cm, long flowing silver hair, elegant white idol dress with golden accents) and a shorter character (about 152cm, twin tails pink hair, frilly pink idol outfit with bows), both posing with idol gestures, vibrant stage lighting with pink and blue spotlights, sparkles and light particles floating in the air, audience silhouettes in foreground, full body shot, anime illustration style, (masterpiece:1.3), (best quality:1.4), (height difference:1.3), 2girls, idol duet performance',
    difficulty: 'intermediate',
  },
  // School scene — taller upperclassman + shorter underclassman
  {
    slug: 'height-diff-senpai-kohai-school',
    title: '身長差 先輩後輩 - 部活シーンプロンプト',
    description:
      '部活帰りの先輩後輩身長差を描くプロンプト。校門前・夕焼け・並び歩きの定番シーン。学園もの二次創作向け。',
    tags: ['身長差', '学校制服', 'アニメ'],
    seoTitle: '身長差 先輩後輩 プロンプト | 部活シーン AI 生成',
    seoDescription:
      '部活帰りの先輩後輩身長差を描く Stable Diffusion プロンプト。校門前・夕焼け・並び歩き・学園もの二次創作向けのアニメイラスト。',
    altText: '身長差 先輩後輩 - 部活シーン - Stable Diffusion AI 生成画像',
    content:
      'A tall third-year Japanese high school student senpai (about 180cm, wearing a sailor uniform with red ribbon) and a shorter first-year kohai (about 158cm, same uniform style but with blue ribbon), walking together leaving the school after club activities, soft golden hour light at the school gate, cherry trees in the background, both carrying sports bags, casual smiling expressions, full body side view emphasizing the height gap, anime illustration style, (masterpiece:1.2), (best quality:1.4), (height difference:1.3), 2girls, school slice-of-life',
    difficulty: 'intermediate',
  },
  // Cosplay-style — RPG party pair
  {
    slug: 'height-diff-rpg-party-warrior-healer',
    title: '身長差 RPG パーティ - 戦士×ヒーラープロンプト',
    description:
      'RPG パーティの身長差ペア（重戦士×小柄ヒーラー）を描くプロンプト。ファンタジー冒険シーン、武具コントラスト、定番冒険チーム構成。',
    tags: ['身長差', 'ファンタジー', 'ファンタジーキャラ'],
    seoTitle: '身長差 RPG パーティ プロンプト | 戦士×ヒーラー AI 生成',
    seoDescription:
      'RPG パーティの身長差ペア（重装戦士×小柄ヒーラー）を描く Stable Diffusion プロンプト。ファンタジー冒険・武具コントラスト・並び立ち構図。',
    altText: '身長差 RPG パーティ - 戦士×ヒーラー - Stable Diffusion AI 生成画像',
    content:
      'Two RPG fantasy characters in an adventurer\'s party stance: a heavy male warrior (about 200cm, holding a massive two-handed sword, wearing scarred plate armor) standing next to a petite female healer (about 148cm, wearing a white-and-gold healer robe, holding a small ornate staff), both facing slightly toward the viewer in a determined pose, dramatic mountain landscape background, golden sunset, dust particles in the air, full body shot showing extreme size contrast, fantasy concept art style, (masterpiece:1.3), (best quality:1.4), (height difference:1.4), 1tall warrior and 1small healer, adventurer party',
    difficulty: 'advanced',
  },
  // Adult x child — parent and kid
  {
    slug: 'height-diff-parent-child-hand-holding',
    title: '身長差 親子 - 手をつなぐ日常プロンプト',
    description:
      '父娘または母息子の親子身長差プロンプト。手をつなぐ・公園・お散歩シーン。ファミリー向けほっこりイラスト。',
    tags: ['身長差', 'ポートレート', 'クリエイティブ'],
    seoTitle: '身長差 親子プロンプト | 手をつなぐ日常 AI 生成',
    seoDescription:
      '親子の身長差を描く Stable Diffusion プロンプト。手をつなぐ・公園散歩・お父さんお母さんと子ども・ファミリー向けほっこり日常イラスト。',
    altText: '身長差 親子 - 手をつなぐ日常 - Stable Diffusion AI 生成画像',
    content:
      'A loving Japanese father (about 178cm, in casual weekend outfit) and his small young daughter (about 110cm, in a yellow cardigan and white skirt), walking through an autumn park, holding hands, the father looking down with a warm smile, the daughter looking up with a happy expression, fallen leaves on the path, soft afternoon sunlight filtering through trees, full body side view emphasizing the height gap, family lifestyle photography style, (masterpiece:1.2), (best quality:1.4), (height difference:1.4), 1man and 1child, family bonding',
    difficulty: 'intermediate',
  },
  // OC pair generator template
  {
    slug: 'height-diff-oc-pair-template',
    title: '身長差 OC ペア - オリキャラ並び立ちテンプレート',
    description:
      'オリキャラ (OC) ペアの身長差設定資料を作るテンプレートプロンプト。中性的なシンプル背景、設定資料調、全身比較。',
    tags: ['身長差', 'キャラクターデザイン', 'クリエイティブ'],
    seoTitle: '身長差 OC ペア プロンプト | オリキャラ並び立ち AI 生成',
    seoDescription:
      'オリキャラ (OC) ペアの身長差設定資料を作るための Stable Diffusion プロンプトテンプレート。中性的背景・全身比較・キャラクターシート風。',
    altText: '身長差 OC ペア - オリキャラ並び立ち - Stable Diffusion AI 生成画像',
    content:
      'Original character pair reference sheet: two anime-style characters standing side by side in T-pose against a clean light-gray seamless backdrop, one tall character (about 182cm, slim build, casual outfit) and one shorter character (about 162cm, athletic build, contrasting casual outfit), both facing the viewer directly, even studio lighting from front, no shadows, character design sheet style, full body straight-on shot, sharp focus on both figures, (masterpiece:1.2), (best quality:1.4), (height difference:1.3), 2 character design sheet',
    difficulty: 'intermediate',
  },
  // Hug scene
  {
    slug: 'height-diff-hug-tall-embracing-short',
    title: '身長差 ハグ - 包み込む抱擁プロンプト',
    description:
      '身長差ハグの定番構図（背の高い方が小さい方を包み込む）を描くプロンプト。少女漫画・BL 双方適用可能。',
    tags: ['身長差', 'アニメ', 'ドラマティック'],
    seoTitle: '身長差 ハグプロンプト | 包み込む抱擁 AI 生成',
    seoDescription:
      '身長差ハグの定番構図（背の高い方が小柄な相手を包み込む）を描く Stable Diffusion プロンプト。少女漫画・BL 二次創作対応。',
    altText: '身長差 ハグ - 包み込む抱擁 - Stable Diffusion AI 生成画像',
    content:
      'A tall character (around 190cm, dark-haired, in a long open coat) tenderly embracing a shorter character (around 158cm, light-haired, in casual sweater), the shorter character\'s head resting against the taller character\'s chest, the taller character resting their chin on the shorter character\'s head, eyes closed, peaceful expressions, soft warm interior lighting, blurred bookshelf background, intimate close-up shot from a slight side angle, anime romantic illustration style, (masterpiece:1.3), (best quality:1.4), (height difference:1.4), 2 people hugging, tender romance',
    difficulty: 'intermediate',
  },
  // Mecha pilot duo — extreme size contrast
  {
    slug: 'height-diff-mecha-pilot-android',
    title: '身長差 メカ - 操縦者×大型ロボットプロンプト',
    description:
      '小柄なパイロット × 巨大メカロボットの極端な身長差を描くプロンプト。SF アニメ・ロボット好き向けの設定資料調。',
    tags: ['身長差', '未来的', 'ファンタジー'],
    seoTitle: '身長差 メカ プロンプト | 操縦者×大型ロボット AI 生成',
    seoDescription:
      '小柄なパイロット×巨大メカロボットの極端な身長差を描く Stable Diffusion プロンプト。SF アニメ風・ハンガー背景・スケール対比。',
    altText: '身長差 メカ - パイロット×大型ロボット - Stable Diffusion AI 生成画像',
    content:
      'A young anime-style mecha pilot (about 160cm, wearing a pilot suit) standing in front of their massive personal mecha robot (about 18 meters tall, glossy white-and-blue armor panels, glowing power lines), in a giant hangar with industrial structural beams overhead, dramatic backlight from hangar bay doors, low camera angle to emphasize the towering scale of the mecha versus the small pilot, sci-fi anime illustration style, (masterpiece:1.3), (best quality:1.4), (size difference:1.5), 1pilot and 1mecha robot, mech anime scale shot',
    difficulty: 'advanced',
  },
  // Anime trio with mixed heights
  {
    slug: 'height-diff-trio-mixed-heights',
    title: '身長差 3 人組 - バラバラ身長のグループプロンプト',
    description:
      '身長がバラバラな 3 人組グループ（高身長/中身長/低身長）を描くプロンプト。アイドル・部活・幼馴染グループのアニメイラスト用。',
    tags: ['身長差', 'アニメ', '学校制服'],
    seoTitle: '身長差 3 人組プロンプト | バラバラ身長グループ AI 生成',
    seoDescription:
      '3 人組グループの身長バラバラ並び絵を描く Stable Diffusion プロンプト。アイドル・部活・幼馴染グループ・アニメイラスト二次創作対応。',
    altText: '身長差 3 人組 - バラバラ身長グループ - Stable Diffusion AI 生成画像',
    content:
      'Three anime-style characters standing side by side in a horizontal lineup, each with distinctly different heights: a very tall character (about 188cm, on the left), a medium-height character (about 168cm, in the middle), and a short character (about 152cm, on the right), all wearing matching coordinated outfits in different colors (forest green / cream / soft pink), light gray clean background, even studio lighting, all facing forward with friendly expressions, full body shot framing all three from head to toe, character lineup illustration style, (masterpiece:1.2), (best quality:1.4), (height difference:1.4), 3 characters trio, group portrait',
    difficulty: 'intermediate',
  },
]

async function callFalSdxl(prompt: string): Promise<Buffer> {
  const apiKey = process.env.FAL_KEY || process.env.FAL_API_KEY
  if (!apiKey) throw new Error('Missing FAL_KEY')

  const res = await fetch(FAL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      image_size: 'square_hd',
      num_images: 1,
      num_inference_steps: 25,
      enable_safety_checker: true,
    }),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`fal-sdxl ${res.status}: ${txt.slice(0, 300)}`)
  }
  const json: any = await res.json()
  const url: string | undefined = json?.images?.[0]?.url
  if (!url) throw new Error('fal-sdxl returned no image url')
  const imgRes = await fetch(url)
  if (!imgRes.ok) throw new Error(`fal image fetch ${imgRes.status}`)
  return Buffer.from(await imgRes.arrayBuffer())
}

async function uploadToBlob(buf: Buffer, key: string, mimeType: string) {
  const blob = await put(key, buf, {
    access: 'public',
    contentType: mimeType,
    addRandomSuffix: true,
  })
  return { url: blob.url, blobKey: blob.pathname, fileSize: buf.length }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const prisma = new PrismaClient()

  const bodyTypeCat = await prisma.category.findUnique({ where: { slug: 'body-type' } })
  const sdTool = await prisma.tool.findUnique({ where: { slug: 'stable-diffusion' } })
  if (!bodyTypeCat || !sdTool) throw new Error('body-type or stable-diffusion missing')

  const results: { slug: string; status: 'OK' | 'SKIP' | 'FAIL'; reason?: string }[] = []

  for (const p of PROMPTS) {
    console.log(`\n══════ ${p.slug} ══════`)
    const existing = await prisma.prompt.findUnique({ where: { slug: p.slug } })
    if (existing) {
      console.log(`  ⏭️  exists, skipping`)
      results.push({ slug: p.slug, status: 'SKIP' })
      continue
    }

    try {
      console.log(`  🎨 fal SDXL rendering...`)
      const t0 = Date.now()
      const imgBuf = await callFalSdxl(p.content)
      console.log(`     ${((Date.now() - t0) / 1000).toFixed(1)}s · ${(imgBuf.length / 1024).toFixed(0)} KB`)
      await writeFile(`${OUT_DIR}/${p.slug}.jpg`, imgBuf)

      console.log(`  ☁️  upload Blob`)
      const blob = await uploadToBlob(imgBuf, `prompts/${p.slug}.jpg`, 'image/jpeg')

      console.log(`  💾 DB insert`)
      await prisma.prompt.create({
        data: {
          slug: p.slug,
          title: p.title,
          description: p.description,
          content: p.content,
          seoTitle: p.seoTitle,
          seoDescription: p.seoDescription,
          difficulty: p.difficulty,
          isPublished: true,
          isFeatured: false,
          isAutoCollected: false,
          author: 'prompta.jp curated batch',
          sourceUrl: 'https://www.prompta.jp/tag/身長差',
          categoryId: bodyTypeCat.id,
          toolId: sdTool.id,
          tags: {
            connectOrCreate: p.tags.map((tname) => ({
              where: { name: tname },
              create: { name: tname, slug: tname, isApproved: true },
            })),
          },
          images: {
            create: [
              {
                url: blob.url,
                blobKey: blob.blobKey,
                fileName: `${p.slug}.jpg`,
                fileSize: blob.fileSize,
                mimeType: 'image/jpeg',
                imageType: 'original',
                width: 1024,
                height: 1024,
                order: 0,
                altText: p.altText,
              },
            ],
          },
        },
      })
      console.log(`  ✅ OK`)
      results.push({ slug: p.slug, status: 'OK' })
    } catch (e: any) {
      console.error(`  ❌ ${e.message?.slice(0, 200)}`)
      results.push({ slug: p.slug, status: 'FAIL', reason: e.message?.slice(0, 200) })
    }
  }

  console.log('\n═══ SUMMARY ═══')
  for (const r of results) {
    const icon = r.status === 'OK' ? '✅' : r.status === 'SKIP' ? '⏭️ ' : '❌'
    console.log(`  ${icon} ${r.slug}${r.reason ? ` — ${r.reason}` : ''}`)
  }
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
