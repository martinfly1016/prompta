// @ts-nocheck
/**
 * BL シチュエーション拡張 batch — 2026-05-24 (Tier B step 1)
 *
 * Adds 10 more BL composition prompts covering situations the initial
 * 12-batch didn't touch — library, hospital, band room, kitchen,
 * sportswear, subway-rain, wedding, VTuber, rainy street, yukata.
 *
 * Each prompt keeps the same neutral SFW framing pattern that passed
 * SDXL safety filter 12/12 in the prior batch.
 *
 * Schema:
 *   - category: anime
 *   - tool: stable-diffusion
 *   - tags: BL / 二人構図 / カップル + situation-specific
 *
 * Cost: 10 × $0.005 ≈ $0.05
 * Run: npx tsx src/scripts/collect/_bl_situation_batch_2026_05_24.ts
 */
import 'dotenv/config'
import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'

const ROOT = resolve(__dirname, '../../..')
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/bl-situation-2026-05-24`
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
    slug: 'bl-couple-library-study-together',
    title: 'BL 二人構図 - 図書館で勉強するプロンプト',
    description:
      '図書館で並んで本を読む / 勉強する BL 構図プロンプト。学生 BL の定番、静かな空間と差し込む光、本越しの視線交差を指定。',
    tags: ['BL', '二人構図', 'カップル', '学校制服', 'アニメ'],
    seoTitle: 'BL 図書館構図 プロンプト | 勉強シーン 二人構図 AI 生成',
    seoDescription:
      '図書館で勉強する BL 構図プロンプト。本越しの視線交差、差し込む光、学生 BL の静かな親密シーン。Stable Diffusion / Midjourney 対応。',
    altText: 'BL 図書館構図 - 勉強シーン - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male high school students sitting side by side at a library table with stacks of open books, taller character (around 178cm) leaning slightly toward shorter character (around 168cm) pointing at a textbook, shorter looking up at him with a soft thoughtful expression, dust motes in sunbeam through tall window, warm afternoon library light, school uniforms, full body shot from three-quarter angle, slice-of-life anime aesthetic, (masterpiece:1.2), (best quality:1.4), (study scene composition:1.2), (intimate quiet atmosphere:1.2), 2boys',
    difficulty: 'beginner',
  },
  {
    slug: 'bl-couple-rooftop-sunset',
    title: 'BL 二人構図 - 学校屋上で夕焼けプロンプト',
    description:
      '学校屋上で並んで夕焼けを見る BL 構図。フェンス・夕日・制服、青春 BL の頂点シーン。背中越しの距離感が映える構図。',
    tags: ['BL', '二人構図', 'カップル', '学校制服', 'アニメ'],
    seoTitle: 'BL 屋上構図 プロンプト | 学校 夕焼け 二人構図 AI 生成',
    seoDescription:
      'BL 学校屋上の夕焼け構図プロンプト。フェンス・夕日・制服、青春 BL シーン。Stable Diffusion / Midjourney 対応テンプレ。',
    altText: 'BL 屋上構図 - 学校 夕焼けシーン - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male high school students on a school rooftop at sunset, taller character (around 178cm) leaning forward with both hands on the chain-link fence looking out, shorter character (around 168cm) standing close beside him also gazing toward the orange sky, both in dark school uniforms, golden hour warm orange and pink sky behind them, soft wind moving their hair, full body shot from side angle, melancholic youth BL aesthetic, (masterpiece:1.3), (best quality:1.4), (rooftop sunset composition:1.3), (youthful emotional atmosphere:1.3), 2boys',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-band-practice-room',
    title: 'BL 二人構図 - バンド練習室プロンプト',
    description:
      'バンド練習室でギター×ボーカル BL 構図。楽器・防音壁・夕方の明かり、音楽 BL の定番シーン。視線交差と熱量のある瞬間。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL バンド構図 プロンプト | 練習室 ギター ボーカル AI 生成',
    seoDescription:
      'BL バンド練習室構図プロンプト。ギタリスト×ボーカル、楽器・防音壁、音楽 BL の熱量シーン。BLEACH BLEACH 系・ヒプマイ系の応用にも。',
    altText: 'BL バンド構図 - 練習室 ギター×ボーカル - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male band members in a music practice room, taller guitarist (around 185cm) playing electric guitar with focused passionate expression, shorter vocalist (around 168cm) holding microphone close singing with eyes locked on guitarist, both wearing casual band outfits (black t-shirt + jeans), soundproof walls with band posters, warm evening lighting from a single floor lamp, full body shot from low three-quarter angle, dynamic music BL aesthetic, (masterpiece:1.3), (best quality:1.4), (band performance composition:1.3), (musical tension:1.3), 2boys',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-kitchen-morning-cook',
    title: 'BL 二人構図 - キッチンで朝食作りプロンプト',
    description:
      '同棲 BL の定番、キッチンで朝食を作る二人構図。エプロン姿、コーヒー、朝の自然光。日常感ある親密シーン。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL 同棲構図 プロンプト | キッチン 朝食 二人構図 AI 生成',
    seoDescription:
      'BL 同棲シーン構図プロンプト。キッチンで朝食を作る二人、エプロン姿、コーヒー、朝の自然光。日常 BL の Stable Diffusion テンプレ。',
    altText: 'BL 同棲構図 - キッチン朝食シーン - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters in a modern apartment kitchen on a sunny morning, taller character (around 185cm in apron) cooking eggs at stove with focused expression, shorter character (around 170cm in pajamas) leaning back against counter holding coffee mug watching with sleepy soft smile, morning sunlight streaming through window, warm domestic atmosphere, full body shot from three-quarter angle, slice-of-life manga aesthetic, (masterpiece:1.2), (best quality:1.4), (domestic morning scene:1.3), (cohabitation intimacy:1.2), 2boys',
    difficulty: 'beginner',
  },
  {
    slug: 'bl-couple-sportswear-gym-training',
    title: 'BL 二人構図 - ジムでスポーツウェアプロンプト',
    description:
      'ジム / 体育館で筋トレ・ストレッチする BL 二人構図。スポーツウェア・汗・夏感、運動部 BL や大人 BL の応用シーン。',
    tags: ['BL', '二人構図', 'カップル', 'スーツ', 'アニメ'],
    seoTitle: 'BL スポーツ構図 プロンプト | ジム筋トレ 二人構図 AI 生成',
    seoDescription:
      'BL スポーツ構図プロンプト。ジム / 体育館で筋トレ・ストレッチ、スポーツウェア・汗・体格差。運動部 BL / 大人 BL Stable Diffusion 対応。',
    altText: 'BL スポーツ構図 - ジム筋トレ - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters in modern gym, taller muscular character (around 188cm) helping shorter slimmer character (around 172cm) with stretching exercise, taller standing behind gently supporting shorter\'s shoulders, both in athletic sportswear (tank top + shorts), sweat sheen on skin, gym equipment in background, bright clean lighting, full body shot from side angle, dynamic athletic aesthetic with subtle emotional tension, (masterpiece:1.3), (best quality:1.4), (athletic training composition:1.3), (body contact stretching:1.2), 2boys',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-rainy-street-umbrella',
    title: 'BL 二人構図 - 雨の街で相合傘プロンプト',
    description:
      '雨の街で 1 本の傘を共有する BL 構図。相合傘の定番、濡れた街・ネオン反射・密着感。少女漫画的ロマンス頂点シーン。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL 雨の街構図 プロンプト | 相合傘 二人構図 AI 生成',
    seoDescription:
      'BL 相合傘の二人構図プロンプト。雨の街・ネオン反射・密着感、少女漫画的ロマンスシーン。Stable Diffusion 雨表現対応テンプレ。',
    altText: 'BL 雨の街構図 - 相合傘 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters sharing a single dark umbrella in rainy nighttime city street, taller character (around 188cm) holding umbrella while leaning slightly toward shorter character (around 168cm) on his right, shoulders touching closely under the umbrella, wet street reflecting neon shop signs in pinks and blues, both in dark coats, soft melancholic romantic atmosphere, full body shot from low front angle, cinematic shoujo manga aesthetic, (masterpiece:1.3), (best quality:1.4), (shared umbrella composition:1.4), (intimate rain scene:1.3), 2boys',
    difficulty: 'advanced',
  },
  {
    slug: 'bl-couple-wedding-ceremony-formal',
    title: 'BL 二人構図 - 結婚式タキシードプロンプト',
    description:
      '結婚式・誓いのシーンの BL 二人構図。タキシード姿、教会・チャペル背景、誓いの言葉のロマンチック頂点。婚礼 BL に最適。',
    tags: ['BL', '二人構図', 'カップル', 'スーツ', 'アニメ'],
    seoTitle: 'BL 結婚式構図 プロンプト | タキシード 二人構図 AI 生成',
    seoDescription:
      'BL 結婚式・誓いシーン構図プロンプト。タキシード姿、教会背景、ロマンチック頂点シーン。婚礼 BL Stable Diffusion 対応。',
    altText: 'BL 結婚式構図 - タキシード誓いシーン - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters in elegant white and black tuxedos facing each other at a chapel altar, holding hands while exchanging soft loving gazes, surrounded by white flowers and candles, stained glass window light casting colorful patterns, both with gentle ceremonial expressions, full body shot from three-quarter angle, romantic wedding aesthetic, (masterpiece:1.3), (best quality:1.4), (wedding ceremony composition:1.4), (formal romantic atmosphere:1.3), 2boys',
    difficulty: 'advanced',
  },
  {
    slug: 'bl-couple-vtuber-stream-collab',
    title: 'BL 二人構図 - VTuber コラボ配信プロンプト',
    description:
      'VTuber コラボ配信中の BL 二人構図。ヘッドセット・モニター・配信機材、現代的・テックな BL シチュエーション。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL VTuber構図 プロンプト | コラボ配信 二人構図 AI 生成',
    seoDescription:
      'BL VTuber コラボ配信シーンの構図プロンプト。ヘッドセット・モニター・配信機材、テックな現代 BL。Stable Diffusion 配信シーン対応。',
    altText: 'BL VTuber構図 - コラボ配信 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male VTuber-style characters streaming together in a modern setup room, sitting close at a long desk with two glowing monitors and ring lights, wearing matching headphones around their necks, taller character (185cm) leaning toward shorter (170cm) pointing at the screen with an excited expression, shorter laughing with a soft smile, RGB keyboard glow, posters in background, evening atmosphere, full body shot from three-quarter angle, modern anime aesthetic, (masterpiece:1.3), (best quality:1.4), (streaming collab composition:1.3), (tech room atmosphere:1.2), 2boys',
    difficulty: 'intermediate',
  },
  {
    slug: 'bl-couple-yukata-summer-festival',
    title: 'BL 二人構図 - 浴衣で夏祭りプロンプト',
    description:
      '夏祭り・花火大会で浴衣姿の BL 二人構図。屋台・提灯・花火、和風 BL の頂点シーン。指を絡める手・並んで歩く構図。',
    tags: ['BL', '二人構図', 'カップル', 'アニメ'],
    seoTitle: 'BL 浴衣構図 プロンプト | 夏祭り 花火 二人構図 AI 生成',
    seoDescription:
      'BL 浴衣 / 夏祭り構図プロンプト。屋台・提灯・花火、和風ロマンス BL。Stable Diffusion 夏祭りシーン対応テンプレート。',
    altText: 'BL 浴衣構図 - 夏祭り花火 - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style male characters in traditional yukata at a summer festival, taller character (around 185cm in dark navy yukata) and shorter (around 170cm in pale indigo yukata) walking together holding hands with fingers interlocked, festival lanterns and food stalls in soft bokeh background, fireworks bursting overhead in warm sparkles, both with gentle festival smiles, full body shot from three-quarter angle, romantic summer aesthetic, traditional anime illustration style, (masterpiece:1.3), (best quality:1.4), (festival yukata composition:1.4), (summer romance scene:1.3), 2boys',
    difficulty: 'advanced',
  },
  {
    slug: 'bl-couple-subway-late-commute',
    title: 'BL 二人構図 - 終電 / 地下鉄プロンプト',
    description:
      '終電 / 深夜の地下鉄で寄り添う BL 二人構図。スーツ姿のオフィス BL、車窓の流れる光、疲れた肩寄り。大人 BL シーン。',
    tags: ['BL', '二人構図', 'カップル', 'スーツ', 'アニメ'],
    seoTitle: 'BL 地下鉄構図 プロンプト | 終電 オフィス 二人構図 AI 生成',
    seoDescription:
      'BL 終電 / 地下鉄構図プロンプト。スーツ姿で寄り添う、車窓の流れる光、大人オフィス BL シーン。Stable Diffusion 対応テンプレ。',
    altText: 'BL 地下鉄構図 - 終電シーン - Stable Diffusion AI 生成画像',
    content:
      'Two anime-style adult male characters in business suits sitting close together on an empty late-night subway train, shorter character (around 172cm) leaning his head softly on taller character (around 185cm)\'s shoulder with eyes closed in exhaustion, taller looking down at him with a quiet protective expression, dark blue suits with loosened ties, dim subway interior lighting with motion-blurred lights through window behind them, medium close-up from three-quarter angle, mature adult BL aesthetic, (masterpiece:1.3), (best quality:1.4), (late night commute composition:1.3), (quiet intimate atmosphere:1.3), 2boys',
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
  const buf = Buffer.from(await imgRes.arrayBuffer())
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
