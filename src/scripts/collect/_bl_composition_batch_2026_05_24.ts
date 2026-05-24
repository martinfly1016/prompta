// @ts-nocheck
/**
 * BL 構図 (BL composition) prompt batch — 2026-05-24.
 *
 * Cluster: BL 構図 (8.1K) + BL ポーズ (1.9K) + BL イラスト 構図 (720) +
 * カップル ポーズ (1.9K) + 二人 ポーズ (1.9K) — Semrush expansion data.
 *
 * Generates 12 anime-style narrative prompts covering 8 ポーズ × varied
 * シチュエーション for BL pair composition. Renders via fal SDXL. Uses
 * neutral SFW framing ("romantic tension between two men", "intimate
 * moment") rather than explicit BL terminology to avoid SDXL safety
 * blocks while still hitting the SEO cluster via tags/titles.
 *
 * Schema:
 *   - category: anime (composition / illustration intent)
 *   - tool: stable-diffusion
 *   - tags: BL / 二人構図 / カップル / pose-specific (壁ドン / キス / ハグ
 *           / お姫様抱っこ / 背中合わせ / 見上げる) — all isApproved=true
 *
 * Cost: 12 × $0.005 fal-sdxl ≈ $0.06
 * Run: npx tsx src/scripts/collect/_bl_composition_batch_2026_05_24.ts
 */
import 'dotenv/config'
import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'

const ROOT = resolve(__dirname, '../../..')
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/bl-composition-2026-05-24`
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
  {
    slug: 'bl-couple-side-by-side-cafe',
    title: 'BL 二人構図 - カフェで並び立ちプロンプト',
    description:
      '男性 2 人が並び立つカフェ風 BL 構図プロンプト。並び立ちは BL イラストの基礎構図。anime style、自然な距離感、視線交差を学べる。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ', 'ポートレート'],
    seoTitle: 'BL 二人構図 並び立ちプロンプト | カフェ風カップル AI 生成',
    seoDescription:
      '男性 2 人並び立ち BL 構図の Stable Diffusion / Midjourney プロンプト。カフェ風背景、自然な距離感、視線交差。同人イラスト・構図素材としてコピペ可。',
    altText: 'BL カップル並び立ち - カフェ風構図 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters standing side by side in a warm cafe interior, close friends with emotional bond, soft eye contact toward each other, modern casual outfits in complementary earth tones (soft beige and warm brown), gentle smiles, full body shot, three-quarter view, warm indoor lighting with bokeh background, slice-of-life anime illustration style, sharp focus, (masterpiece:1.2), (best quality:1.4), (intimate composition:1.2), 2boys, manga reference composition',
    difficulty: 'beginner',
  },
  {
    slug: 'bl-couple-hand-holding-park',
    title: 'BL 二人構図 - 公園で手をつなぐプロンプト',
    description:
      '男性 2 人が公園で手をつなぐ BL 構図プロンプト。手をつなぐポーズは関係性を伝える定番。指の絡め方・視線の方向まで指定可。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL カップル 手をつなぐプロンプト | 公園散歩 二人構図 AI 生成',
    seoDescription:
      '男性 2 人が手をつなぐ公園散歩シーンの BL プロンプト。指の絡め方・視線・服装まで詳細指定。Stable Diffusion / Midjourney 対応。',
    altText: 'BL カップル 手をつなぐ - 公園散歩構図 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters walking through an autumn park while gently holding hands with fingers interlocked, close friends with deep emotional bond, both looking at each other with soft warm expressions, casual modern outfits (one in dark navy coat, the other in cream sweater), falling autumn leaves, golden hour lighting, side-angle full body shot, romantic slice-of-life atmosphere, anime illustration style, (masterpiece:1.2), (best quality:1.4), (hand holding:1.3), (intimate gesture:1.2), 2boys',
    difficulty: 'beginner',
  },
  {
    slug: 'bl-couple-hug-from-behind',
    title: 'BL 二人構図 - 後ろからハグするプロンプト',
    description:
      '高身長キャラが小柄キャラを後ろから優しく抱きしめる BL ハグ構図。室内シーン、暖色照明、密着感のある肩・腕の配置を指定。',
    tags: ['BL', '二人構図', 'カップル', 'ハグ', 'アニメ'],
    seoTitle: 'BL カップル 後ろからハグプロンプト | 二人構図 室内 AI 生成',
    seoDescription:
      '後ろからのハグ構図 BL プロンプト。高身長キャラ × 小柄キャラ、腕・肩の配置、室内暖色照明まで指定。同人イラスト構図参考。',
    altText: 'BL カップル 後ろからハグ - 室内構図 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters in a back-hug pose, taller character (around 185cm) embracing shorter character (around 168cm) from behind, arms wrapped around shoulders, the shorter one leaning back into the embrace with closed eyes and a soft smile, both wearing comfortable home outfits (oversized sweater and tee), warm indoor evening lighting with soft lamp glow, cozy living room background, close intimate three-quarter shot, slice-of-life manga illustration, (masterpiece:1.2), (best quality:1.4), (back hug pose:1.4), (intimate composition:1.3), 2boys, height difference visible',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-princess-carry-rescue',
    title: 'BL 二人構図 - お姫様抱っこプロンプト',
    description:
      '高身長キャラが小柄キャラをお姫様抱っこする BL 構図。並び立ち以上に難易度が高い接触ポーズ。腕の配置・体重の見え方を指定。',
    tags: ['BL', '二人構図', 'カップル', 'お姫様抱っこ', 'アニメ'],
    seoTitle: 'BL お姫様抱っこ プロンプト | 二人構図 ロマンチック AI 生成',
    seoDescription:
      'お姫様抱っこ構図の BL プロンプト。男性 2 人、腕の配置・身長差・視線の交差を詳細指定。Stable Diffusion / Midjourney 対応、同人イラスト参考。',
    altText: 'BL お姫様抱っこ構図 - ロマンチック - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters in a princess carry pose, taller stronger character (around 190cm) holding lighter character (around 165cm) in his arms with one arm under the knees and one arm supporting the back, the carried character has one arm gently around the taller one\'s neck, both looking at each other with soft loving expressions, fantasy castle hall background with warm torch lighting, full body shot with three-quarter angle, romantic shoujo manga aesthetic, (masterpiece:1.3), (best quality:1.4), (princess carry pose:1.4), (height difference:1.3), 2boys',
    difficulty: 'advanced',
  },
  {
    slug: 'bl-couple-kabedon-school',
    title: 'BL 二人構図 - 学校廊下で壁ドンプロンプト',
    description:
      '学校廊下で壁ドンする BL 構図。少女漫画定番ポーズの BL バージョン。低身長キャラの見上げる視線・赤面表現まで指定。',
    tags: ['BL', '二人構図', 'カップル', '壁ドン', '学校制服', 'アニメ'],
    seoTitle: 'BL 壁ドン プロンプト | 学校廊下 二人構図 AI 生成',
    seoDescription:
      '学校廊下の壁ドン構図 BL プロンプト。男性 2 人、低身長キャラの見上げる視線・赤面、ロー アングル指定。少女漫画的 BL イラスト参考。',
    altText: 'BL 壁ドン構図 - 学校廊下 - Stable Diffusion AI 生成画像',
    content:
      'Kabe-don pose between two anime-style male high school students in a sunlit school hallway, taller character (around 185cm) with one hand placed against the wall above the shorter character\'s shoulder, shorter character (around 168cm) with back against the wall looking up flushed with surprise and soft tension, both in dark school uniform jackets, afternoon sunlight streaming through windows, low camera angle to emphasize height difference and dramatic mood, shoujo manga emotional aesthetic, (masterpiece:1.3), (best quality:1.4), (kabe-don pose:1.4), (tension atmosphere:1.3), (height difference:1.2), 2boys',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-kiss-leaning-down',
    title: 'BL 二人構図 - 屈んでキスするプロンプト',
    description:
      '高身長キャラが屈んで小柄キャラにキスをする BL 構図。視線が上下交差する瞬間。顔崩壊しにくいサイドビュー指定。',
    tags: ['BL', '二人構図', 'カップル', 'キス', 'アニメ'],
    seoTitle: 'BL キス構図 プロンプト | 屈むキス 二人構図 AI 生成',
    seoDescription:
      '高身長キャラが屈んでキスする BL 構図プロンプト。視線交差、サイドビュー、ロマンチック照明を指定。同人イラスト構図参考。',
    altText: 'BL キスシーン構図 - 屈むキス - Stable Diffusion AI 生成画像',
    content:
      'Romantic kiss scene between two anime-style male characters, taller character (around 188cm) leaning down to kiss shorter character (around 168cm), shorter character on tiptoe with one hand on taller\'s chest and eyes closed, both with soft expressions of tenderness, side-view profile shot to emphasize the height difference and the leaning angle, warm rim lighting from sunset window behind them, soft bokeh interior background, romantic shoujo manga kiss scene, close intimate shot, (masterpiece:1.3), (best quality:1.4), (kiss scene:1.4), (height difference:1.3), (romantic atmosphere:1.3), 2boys',
    difficulty: 'advanced',
  },
  {
    slug: 'bl-couple-looking-up-tension',
    title: 'BL 二人構図 - 見上げる × 見下ろす対面プロンプト',
    description:
      '低身長キャラが見上げ、高身長キャラが見下ろす BL 対面構図。視線の上下だけで関係性を演出。最も汎用性の高い基本構図。',
    tags: ['BL', '二人構図', 'カップル', '見上げる', 'アニメ'],
    seoTitle: 'BL 見上げる構図 プロンプト | 対面 二人構図 AI 生成',
    seoDescription:
      '見上げる × 見下ろす対面 BL 構図プロンプト。視線の上下、表情、ロー アングルを指定。「見上げる構図」1.6K 検索対応のテンプレート。',
    altText: 'BL 見上げる構図 - 対面 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters standing close and facing each other, shorter character (around 168cm) looking up at taller character (around 188cm) with a soft questioning expression, taller character looking down with a gentle protective expression, close mid-shot with slight low angle to emphasize the looking-up composition, soft warm indoor lighting, blurred bookshelf background suggesting a library, emotional shoujo manga aesthetic, (masterpiece:1.3), (best quality:1.4), (looking up composition:1.4), (height difference:1.2), (intimate eye contact:1.3), 2boys',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-back-to-back-rivals',
    title: 'BL 二人構図 - 背中合わせのライバル構図プロンプト',
    description:
      '背中合わせに立つ男性 2 人の BL/バディ構図。クール対等構図、ライバル関係や運命のペア表現に最適。少年漫画的なカッコよさ。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL バディ構図 プロンプト | 背中合わせ 二人 AI 生成',
    seoDescription:
      '背中合わせの BL バディ構図プロンプト。ライバル関係・運命の二人を演出する対等構図。少年漫画スタイル、ドラマチック照明指定。',
    altText: 'BL バディ構図 - 背中合わせ - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters standing back to back with arms crossed, both with serious cool determined expressions, dynamic confident poses, similar heights for an equal partnership feel, contrasting outfit colors (one in dark black/red, the other in white/silver), dramatic backlight with lens flare, full body shot from slight low angle, shounen anime illustration style, (masterpiece:1.3), (best quality:1.4), (back to back pose:1.4), (dramatic composition:1.3), 2boys, rivalry tension',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-forehead-touch-private',
    title: 'BL 二人構図 - 額をつける親密シーンプロンプト',
    description:
      'お互いの額をくっつける BL 構図。キスより穏やかな親密表現、目を閉じた静かな瞬間。同人誌・グッズイラストの定番ポーズ。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL 額キス構図 プロンプト | 親密シーン 二人構図 AI 生成',
    seoDescription:
      'お互いの額を合わせる BL 親密構図プロンプト。穏やかなロマンス・目を閉じた静的シーン・暖色照明を指定。同人イラスト参考。',
    altText: 'BL 額をつける構図 - 親密シーン - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters with foreheads gently touching, both with eyes softly closed and tender expressions, hands resting on each other\'s shoulders or holding each other\'s face, close-up intimate shot from slight three-quarter angle, soft warm rim lighting from window behind them, blurred warm indoor background, deeply emotional quiet moment, shoujo manga aesthetic, (masterpiece:1.3), (best quality:1.4), (forehead touch:1.4), (emotional intimacy:1.3), 2boys, gentle romance',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-shoulder-lean-cafe',
    title: 'BL 二人構図 - 肩に寄りかかるカフェシーンプロンプト',
    description:
      '低身長キャラが高身長キャラの肩に寄りかかるカフェシーン。日常感のあるリラックスした BL 構図。コーヒー・窓の自然光指定。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL 肩に寄りかかる構図 プロンプト | カフェ 二人 AI 生成',
    seoDescription:
      'カフェで肩に寄りかかる BL 構図プロンプト。日常感、リラックスした表情、コーヒー・窓辺の自然光を指定。Stable Diffusion 対応。',
    altText: 'BL カフェ構図 - 肩に寄りかかる - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters sitting close together at a window cafe table, shorter character (around 170cm) leaning his head softly on taller character (around 185cm)\'s shoulder, taller character looking down at him with a soft smile, coffee cups on the table, sunlight streaming through the cafe window, casual modern outfits in warm earth tones, medium close-up shot from side angle, slice-of-life shoujo manga aesthetic, (masterpiece:1.2), (best quality:1.4), (shoulder lean pose:1.3), (intimate composition:1.2), 2boys, daily life romance',
    difficulty: 'beginner',
  },
  {
    slug: 'bl-couple-business-suit-office',
    title: 'BL 二人構図 - オフィスでのスーツ姿プロンプト',
    description:
      '大人 BL の定番、オフィスでのスーツ姿 2 人構図。落ち着いた表情、ビジネスシーンに緊張感ある関係性。窓辺・ブラインド光指定。',
    tags: ['BL', '二人構図', 'カップル', 'スーツ', 'アニメ'],
    seoTitle: 'BL オフィス構図 プロンプト | スーツ 大人 二人構図 AI 生成',
    seoDescription:
      'オフィスでのスーツ姿 BL 構図プロンプト。大人 BL、ビジネスシーンの緊張感、窓辺ブラインド光、落ち着いた表情を指定。',
    altText: 'BL オフィス構図 - スーツ姿 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style adult male characters in business suits standing in a modern office, one leaning slightly against a desk while the other stands close in front of him, both with calm composed expressions and quiet emotional tension between them, mature adult features, dark charcoal and navy suits, blinds casting striped light across the scene, medium full body shot from three-quarter angle, sophisticated adult BL aesthetic, (masterpiece:1.3), (best quality:1.4), (mature composition:1.3), (subtle tension:1.2), 2boys, business setting',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-fantasy-knight-mage',
    title: 'BL 二人構図 - 騎士×魔法使いファンタジーペアプロンプト',
    description:
      '中世ファンタジー世界の騎士×魔法使い BL ペア構図。武装と魔法書、運命の二人感ある対立 / 共闘構図。同人ゲーム的世界観。',
    tags: ['BL', '二人構図', 'カップル', 'ファンタジー', 'アニメ'],
    seoTitle: 'BL 騎士×魔法使いプロンプト | ファンタジー 二人構図 AI 生成',
    seoDescription:
      'ファンタジー BL ペア構図プロンプト。騎士×魔法使い、武装と魔法書、運命の二人感を演出。同人ゲーム的世界観の Stable Diffusion 対応テンプレート。',
    altText: 'BL ファンタジー構図 - 騎士×魔法使い - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters in medieval fantasy setting, tall armored knight (around 190cm) standing protectively behind robed mage (around 168cm), knight in silver and blue plate armor with sword at hip, mage in deep purple robes holding ancient grimoire, both facing forward with serious expressions of bonded determination, ancient stone hall background with mysterious blue magical light, full body shot from slight low angle, fantasy concept art illustration, (masterpiece:1.3), (best quality:1.4), (fantasy duo composition:1.3), (height difference:1.2), 2boys, knight and mage partnership',
    difficulty: 'advanced',
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
  const buf = Buffer.from(await imgRes.arrayBuffer())
  // Size guard — fal safety filter can silently return a tiny black placeholder.
  // Reject anything under 50KB; the refund/skip path treats this as a hard fail.
  if (buf.length < 50 * 1024) {
    throw new Error(`fal-sdxl returned suspicious small image (${buf.length} bytes) — likely safety block`)
  }
  return buf
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

  const animeCat = await prisma.category.findUnique({ where: { slug: 'anime' } })
  const sdTool = await prisma.tool.findUnique({ where: { slug: 'stable-diffusion' } })
  if (!animeCat || !sdTool) throw new Error('anime category or stable-diffusion tool missing')

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
          sourceUrl: 'https://www.prompta.jp/guides/bl-composition-prompt-guide',
          categoryId: animeCat.id,
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
