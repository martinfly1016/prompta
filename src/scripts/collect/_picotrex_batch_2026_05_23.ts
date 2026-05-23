// @ts-nocheck
/**
 * PicoTrex top-viral photo-edit batch — 2026-05-23.
 * 8 use cases not yet in DB, sourced from PicoTrex/Awesome-Nano-Banana-images.
 *
 * Per prompt:
 *   1. Read source photo from seo/style-test-samples/source/
 *   2. Call Gemini Nano Banana with prompt + source → render After
 *   3. Save After locally (for QA/debugging)
 *   4. Upload Before + After to Vercel Blob
 *   5. Insert Prompt row + 2 PromptImage rows (original + effect)
 *
 * Idempotent: skips slugs already in DB.
 * Cost: 8 × $0.039 = ~$0.31 Gemini API.
 *
 * Run: npx tsx src/scripts/collect/_picotrex_batch_2026_05_23.ts
 */
import 'dotenv/config'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, basename, extname } from 'node:path'
import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'

const ROOT = resolve(__dirname, '../../..')
const SOURCE_DIR = `${ROOT}/seo/style-test-samples/source`
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/picotrex-2026-05-23`
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const prisma = new PrismaClient()

interface PromptDef {
  slug: string
  source: string // basename inside SOURCE_DIR
  title: string
  description: string
  content: string // English prompt body (the actual instruction)
  tags: string[]
  seoTitle: string
  seoDescription: string
  altText: string
}

const PROMPTS: PromptDef[] = [
  {
    slug: 'action-figure-box-toy',
    source: 'portrait-default.jpg',
    title: 'アクションフィギュア化 - 玩具箱パッケージ風 AI プロンプト',
    description:
      'アップロードした人物写真を、透明ブリスター付きの玩具パッケージに収まった 6 インチのアクションフィギュアに変換するプロンプト。X で大流行中の Nano Banana 定番遊び。',
    tags: ['コスチューム', 'クリエイティブ', 'プロフェッショナル'],
    seoTitle: 'アクションフィギュア化プロンプト | Nano Banana 玩具箱パッケージ',
    seoDescription:
      'アップロード写真の人物を、玩具箱に収まったアクションフィギュアに AI で変換する Nano Banana プロンプト。顔・服色・髪色を保持。商品撮影風レンダリング。',
    altText: 'アクションフィギュア化された人物 - 玩具箱パッケージ - Nano Banana AI 生成画像',
    content:
      'I uploaded a photo. Please convert the person in the uploaded photo into a 6-inch collectible action figure, displayed inside a clear plastic blister pack mounted on a printed cardboard backing. The cardboard backing shows the character\'s name in bold typography and small illustrations of 2-3 accessories (a smartphone, sunglasses, a coffee cup). Preserve the person\'s identity, face shape, eye color, hair color, hair length, and outfit color so the figure is clearly recognizable as the source individual. Render with glossy injection-molded plastic texture, soft product studio lighting, neutral gray backdrop. Aspect ratio 1:1 at 1024x1024. Photorealistic toy product photography. Do not modify the person\'s facial features or skin tone, do not invent accessories that are not requested, and no extra characters or backgrounds.',
  },
  {
    slug: 'plush-stuffed-toy-cute',
    source: 'portrait-casual-outfit.jpg',
    title: 'ぬいぐるみ化プロンプト - 縫いぐるみ風 AI 変換',
    description:
      'アップロードした人物写真を、ふわふわのぬいぐるみ（縫いぐるみ）バージョンに変換するプロンプト。chibi プロポーション、刺繍の目鼻、縫い目あり。',
    tags: ['コスチューム', 'クリエイティブ', 'ファッション'],
    seoTitle: 'ぬいぐるみ化 AI プロンプト | Nano Banana 縫いぐるみ風変換',
    seoDescription:
      '人物写真をふわふわの縫いぐるみに変換する Nano Banana プロンプト。chibi 体型、刺繍の目鼻、縫い目、布生地の質感を再現。X で人気の AI 加工。',
    altText: 'ぬいぐるみ化された人物 - 縫いぐるみ風変換 - Nano Banana AI 生成画像',
    content:
      'I uploaded a photo. Please re-render the person in the uploaded photo as a soft plush stuffed-toy version of themselves. Use chibi proportions (oversized head, small body, stubby limbs), embroidered facial features (stitched eyes and mouth), visible stitching seams along the limbs and torso, fluffy cotton-or-polyester fabric texture. Preserve the person\'s identity, face shape, hair color, hair length, and outfit color palette so the plushie is clearly recognizable. Place the plushie on a plain pastel background. Soft natural studio lighting, sharp focus. Output at the original resolution. Photorealistic plush-toy product photography. Do not change the original face\'s distinctive features or invent characters that are not the person in the source, and no extra props beyond the plushie itself.',
  },
  {
    slug: 'ootd-flat-lay-knolling',
    source: 'portrait-casual-outfit.jpg',
    title: 'OOTD フラットレイ AI プロンプト - 服装ノーリング配置',
    description:
      'アップロードした人物の着衣写真から、服一式を上からノーリング配置で並べた OOTD フラットレイ画像を生成。各アイテムの色・柄を完全保持。',
    tags: ['ファッション', '服装', 'プロフェッショナル'],
    seoTitle: 'OOTD フラットレイ AI プロンプト | Nano Banana 服装配置',
    seoDescription:
      '人物の着衣写真から、トップス・ボトムス・小物を上から並べた OOTD フラットレイを生成。各アイテムの色と柄を完全保持。Nano Banana プロンプト。',
    altText: 'OOTD フラットレイ - 服装ノーリング配置 - Nano Banana AI 生成画像',
    content:
      'I uploaded a photo of a person wearing an outfit. Please re-render the scene as an Outfit-of-the-Day flat lay: arrange all the clothing items from the outfit (top, bottom, shoes, and any visible accessories) neatly on a clean light-beige surface, laid out in knolling style with parallel right-angled alignment. Preserve each garment\'s exact color, pattern, fabric texture, and silhouette from the source photo. Add 2-3 small contextual props next to the clothes (a coffee cup, a watch, a smartphone). Top-down camera angle (90-degree overhead), soft natural daylight from the side. Aspect ratio 1:1. Photorealistic product flat-lay photography style. Do not change any clothing color or pattern, do not invent garments not visible in the source, and no human body in the image — clothes only.',
  },
  {
    slug: 'isometric-room-view-3d',
    source: 'room-interior-livingroom.jpg',
    title: 'アイソメトリック部屋 3D ビュー化 AI プロンプト',
    description:
      'アップロードした部屋の写真を、ドールハウス風のアイソメトリック 3D ビュー（30 度アクソノメトリック投影）に変換するプロンプト。家具配置・壁色・床質を保持。',
    tags: ['インテリア', 'クリエイティブ', '部屋デザイン'],
    seoTitle: 'アイソメトリック部屋ビュー AI プロンプト | Nano Banana 3D 変換',
    seoDescription:
      '部屋の内装写真をドールハウス風アイソメトリック 3D ビューに変換する Nano Banana プロンプト。家具配置・壁色・床質を保持してパステル調レンダリング。',
    altText: 'アイソメトリック 3D 部屋ビュー - ドールハウス風変換 - Nano Banana AI 生成画像',
    content:
      'I uploaded a photo of a room interior. Please re-render the room as an isometric 3D dollhouse view — a clean geometric 30-degree axonometric projection showing the room as if cut open from a top-front-right corner. Preserve the room\'s furniture placement, wall color, floor type, window placement, and key décor elements (lighting fixtures, rugs, art on walls) from the source photo. Render in soft pastel illustration style with no harsh shadows, slightly stylized but recognizable. Top-front-right isometric camera angle, white background outside the room. Aspect ratio 1:1. Modern flat 3D architectural illustration style. Do not invent furniture or décor that is not visible in the source, do not change the room\'s overall layout, and no human figures.',
  },
  {
    slug: 'chalk-blackboard-sketch',
    source: 'portrait-default.jpg',
    title: '黒板チョーク画スタイル AI プロンプト - 手描き風変換',
    description:
      'アップロードした人物写真を、教室の黒板に白チョークとパステルカラーで描いたような手描きイラスト風に変換するプロンプト。',
    tags: ['アート', 'イラスト', 'クリエイティブ'],
    seoTitle: '黒板チョーク画スタイル AI プロンプト | Nano Banana 手描き風',
    seoDescription:
      '人物写真を黒板にチョークで描いた手描き風イラストに変換する Nano Banana プロンプト。白チョーク + パステル色、チョークの質感を再現。教室向けデザイン。',
    altText: '黒板チョーク画スタイルに変換された人物 - Nano Banana AI 生成画像',
    content:
      'I uploaded a photo. Please re-render the scene as a hand-drawn chalk illustration on a dark green classroom blackboard. Use white chalk for main outlines and pastel chalk colors (light pink, light blue, light yellow, light green) for accents and color blocks. Visible chalk texture with slight smudges and dust, dark green blackboard background with subtle horizontal eraser streaks. Preserve the person\'s identity, face shape, hair length, hair color, and outfit silhouette so the chalk drawing remains clearly recognizable. Loose hand-drawn line quality, not vector-perfect. Output at the original resolution. Hand-drawn chalk illustration style. Do not over-render with realistic shading or photographic detail — keep the loose chalk-sketch feel, and no realistic skin tones.',
  },
  {
    slug: 'sticker-die-cut-portrait',
    source: 'portrait-default.jpg',
    title: 'ステッカー化 AI プロンプト - ダイカット風人物変換',
    description:
      'アップロードした人物写真を、白縁付きのダイカットステッカー風イラストに変換するプロンプト。フラットセルシェーディング + 透過/単色背景。',
    tags: ['アート', 'イラスト', 'クリエイティブ'],
    seoTitle: 'ステッカー化 AI プロンプト | Nano Banana ダイカット風人物',
    seoDescription:
      '人物写真を白縁ダイカットステッカー風に変換する Nano Banana プロンプト。フラットセルシェーディング + 2-3 色トーン。LINE スタンプ・グッズ用デザインに。',
    altText: 'ダイカットステッカー風変換された人物 - 白縁付き - Nano Banana AI 生成画像',
    content:
      'I uploaded a photo. Please convert the person into a die-cut vinyl sticker version — a clean illustrated portrait of the person with a thick white outline (about 8-12 pixels) around the silhouette and a solid pastel background. Use flat cel-shading with 2-3 color tones per region (highlight, base, shadow), no gradients. Preserve the person\'s identity, face proportions, hair color, hair shape, and outfit color so the sticker is clearly recognizable. Output at the original resolution as a square 1024x1024 image. Modern flat illustration style suitable for sticker printing. Do not add backgrounds or scenery beyond the solid pastel fill, do not add text or logos, and no realistic photographic detail in the face.',
  },
  {
    slug: 'miniature-figurine-shelf',
    source: 'portrait-default.jpg',
    title: 'ミニチュア自画像 AI プロンプト - 棚に飾る塗装フィギュア',
    description:
      'アップロードした人物写真を、本棚に他の小物と並ぶ 4 インチの塗装済みレジン製ミニチュアフィギュアに変換するプロンプト。スケール感を表現。',
    tags: ['コスチューム', 'クリエイティブ', 'インテリア'],
    seoTitle: 'ミニチュア自画像 AI プロンプト | Nano Banana 塗装フィギュア化',
    seoDescription:
      '人物写真を本棚に飾る 4 インチのミニチュアフィギュアに変換する Nano Banana プロンプト。塗装レジン質感 + 本・植木鉢などで実物大スケール感を表現。',
    altText: 'ミニチュア塗装フィギュア化された人物 - 本棚 - Nano Banana AI 生成画像',
    content:
      'I uploaded a photo. Please convert the person into a small painted resin miniature figurine (about 4 inches tall), displayed on a wooden bookshelf next to ordinary household objects for scale: 2-3 hardcover books leaning sideways, a small potted succulent plant, a coffee mug. Preserve the person\'s identity, face shape, hair color, hair length, and outfit colors so the figurine clearly represents the source individual. Render with hand-painted miniature texture (subtle visible brush strokes, slight matte finish), soft natural shelf lighting from a side window. The wooden shelf and surrounding objects are in normal real-world scale, making the figurine look tiny by comparison. Aspect ratio 4:3 landscape. Photorealistic photography style. Do not modify the person\'s identity, do not invent accessories on the figurine that are not in the source outfit, and no other people in the scene.',
  },
  {
    slug: 'marble-sculpture-classical',
    source: 'portrait-default.jpg',
    title: '大理石彫刻化 AI プロンプト - クラシック胸像風変換',
    description:
      'アップロードした人物写真を、ルネサンスや古代ギリシャ風の純白大理石胸像に変換するプロンプト。顔の構造・髪型・ポーズを保持。',
    tags: ['アート', 'シネマティック', 'クリエイティブ'],
    seoTitle: '大理石彫刻化 AI プロンプト | Nano Banana クラシック胸像風',
    seoDescription:
      '人物写真を純白の大理石彫刻胸像に変換する Nano Banana プロンプト。ルネサンス/古代ギリシャ風、Carrara マーブル質感、博物館ギャラリー風背景。',
    altText: '大理石彫刻化された人物胸像 - クラシック様式 - Nano Banana AI 生成画像',
    content:
      'I uploaded a photo. Please re-render the person as a classical white marble sculpture bust in the style of Renaissance or ancient Greek statuary. Preserve the person\'s facial structure, hair style, hair length, and overall pose so the bust is clearly identifiable as the source individual. Use pure white Carrara marble texture with subtle vein patterns, polished surface with realistic carved-stone shadows in the hair and clothing folds. Place the bust on a simple stone or marble pedestal against a neutral museum gallery background (soft beige wall). Soft directional museum gallery lighting from the upper left. Aspect ratio 3:4 portrait. Photorealistic sculpture photography style. Do not add color to the marble, do not add modern clothing details or accessories not appropriate to classical sculpture, and no painted or polychrome surfaces.',
  },
]

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
if (!KEY) {
  console.error('Missing GOOGLE_AI_API_KEY')
  process.exit(2)
}

function mimeOf(p: string): string {
  if (p.endsWith('.png')) return 'image/png'
  if (p.endsWith('.webp')) return 'image/webp'
  return 'image/jpeg'
}

async function callGemini(promptText: string, sourcePath: string): Promise<Buffer> {
  const sourceBuf = await readFile(sourcePath)
  const parts = [
    { text: promptText },
    {
      inline_data: {
        mime_type: mimeOf(sourcePath),
        data: sourceBuf.toString('base64'),
      },
    },
  ]
  const res = await fetch(`${ENDPOINT}?key=${KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Gemini ${res.status}: ${txt.slice(0, 400)}`)
  }
  const json: any = await res.json()
  const rparts = json?.candidates?.[0]?.content?.parts ?? []
  const imgPart = rparts.find((p: any) => p?.inline_data?.data || p?.inlineData?.data)
  const b64 = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data
  if (!b64) {
    const t = rparts.find((p: any) => p?.text)?.text ?? ''
    throw new Error(`No image. Text: ${t.slice(0, 300)}`)
  }
  return Buffer.from(b64, 'base64')
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

  const photoEditCat = await prisma.category.findUnique({ where: { slug: 'photo-edit' } })
  const geminiTool = await prisma.tool.findUnique({ where: { slug: 'gemini' } })
  if (!photoEditCat || !geminiTool) {
    throw new Error('photo-edit category or gemini tool missing in DB')
  }

  const results: { slug: string; status: 'OK' | 'SKIP' | 'FAIL'; reason?: string }[] = []

  for (const p of PROMPTS) {
    console.log(`\n══════ ${p.slug} ══════`)
    // Idempotency: skip if already in DB
    const existing = await prisma.prompt.findUnique({ where: { slug: p.slug } })
    if (existing) {
      console.log(`  ⏭️  already exists, skipping`)
      results.push({ slug: p.slug, status: 'SKIP', reason: 'already exists' })
      continue
    }

    const sourcePath = `${SOURCE_DIR}/${p.source}`
    const outPath = `${OUT_DIR}/${p.slug}.png`

    try {
      console.log(`  🎨 Gemini rendering...`)
      const t0 = Date.now()
      const afterBuf = await callGemini(p.content, sourcePath)
      console.log(`     ${((Date.now() - t0) / 1000).toFixed(1)}s · ${(afterBuf.length / 1024).toFixed(0)} KB`)
      await writeFile(outPath, afterBuf)
      console.log(`     local saved: ${outPath}`)

      console.log(`  ☁️  uploading Before + After to Blob...`)
      const sourceBuf = await readFile(sourcePath)
      const beforeMime = mimeOf(p.source)
      const beforeExt = beforeMime === 'image/png' ? 'png' : 'jpg'
      const beforeBlob = await uploadToBlob(sourceBuf, `prompts/${p.slug}-before.${beforeExt}`, beforeMime)
      const afterBlob = await uploadToBlob(afterBuf, `prompts/${p.slug}-after.png`, 'image/png')

      console.log(`  💾 inserting Prompt + 2 PromptImage rows...`)
      await prisma.prompt.create({
        data: {
          slug: p.slug,
          title: p.title,
          description: p.description,
          content: p.content,
          seoTitle: p.seoTitle,
          seoDescription: p.seoDescription,
          difficulty: 'intermediate',
          isPublished: true,
          isFeatured: false,
          isAutoCollected: false,
          author: 'PicoTrex Awesome-Nano-Banana-images',
          sourceUrl: 'https://github.com/PicoTrex/Awesome-Nano-Banana-images',
          categoryId: photoEditCat.id,
          toolId: geminiTool.id,
          tags: {
            connectOrCreate: p.tags.map((tname) => ({
              where: { name: tname },
              create: { name: tname, slug: tname, isApproved: true },
            })),
          },
          images: {
            create: [
              {
                url: beforeBlob.url,
                blobKey: beforeBlob.blobKey,
                fileName: `${p.slug}-before.${beforeExt}`,
                fileSize: beforeBlob.fileSize,
                mimeType: beforeMime,
                imageType: 'original',
                order: 0,
                altText: `${p.title} - 編集元写真`,
              },
              {
                url: afterBlob.url,
                blobKey: afterBlob.blobKey,
                fileName: `${p.slug}-after.png`,
                fileSize: afterBlob.fileSize,
                mimeType: 'image/png',
                imageType: 'effect',
                order: 1,
                altText: p.altText,
              },
            ],
          },
        },
      })
      console.log(`  ✅ DB committed`)
      results.push({ slug: p.slug, status: 'OK' })
    } catch (e: any) {
      console.error(`  ❌ FAIL: ${e.message?.slice(0, 200)}`)
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
