// @ts-nocheck
/**
 * 体格差カップル batch — 2026-05-27 (/tag/体格差 Phase 2)
 *
 * Phase 1 (commit 6029a73) retagged 14 height-diff + BL prompts to
 * /tag/体格差, growing it 5 → 19 and pushing dark-fantasy noise to page 2.
 * But the dominant search intents — 男女体格差カップル / 筋肉差カップル /
 * 逆体格差 / 百合体格差 — still have 0 dedicated prompts.
 *
 * This batch ships 6 dedicated ペア体格差 prompts using fal SDXL,
 * mirroring the BL batch 2026-05-24 neutral-framing pattern that passed
 * SDXL safety filter 12/12.
 *
 * Cost: 6 × ~$0.005 ≈ $0.03
 *
 * Schema:
 *   - category: body-type
 *   - tool: stable-diffusion
 *   - tags: 体格差 / 身長差 / カップル + situation-specific
 *
 * Run: npx tsx src/scripts/collect/_bodytype_diff_batch_2026_05_27.ts
 */
import 'dotenv/config'
import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'

const ROOT = resolve(__dirname, '../../..')
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/bodytype-diff-2026-05-27`
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
    slug: 'bodytype-diff-muscular-male-petite-female',
    title: '体格差カップル - 筋肉質男性 × 小柄女性プロンプト',
    description:
      '体格差カップル王道の構図プロンプト。筋肉質 185cm 男性 × 小柄スリム 158cm 女性、街中カジュアル散歩シーン。体格差 + 身長差で「守られる感」が映える。',
    tags: ['体格差', '身長差', 'カップル', 'ボディタイプ'],
    seoTitle: '体格差カップル プロンプト | 筋肉質男 × 小柄女 二人構図 AI 生成',
    seoDescription:
      '体格差カップル王道プロンプト。筋肉質 185cm × 小柄スリム 158cm の男女、街中カジュアル散歩。体格差 + 身長差で守られる感を演出。Stable Diffusion / Midjourney 対応。',
    altText: '体格差カップル - 筋肉質男性 × 小柄女性 - Stable Diffusion AI 生成画像',
    content:
      '1man and 1woman walking together on a sunny urban street, muscular tall man around 185cm with broad shoulders and toned arms in a casual white t-shirt and jeans, petite slim woman around 158cm with delicate frame in a light summer dress, holding hands gently with the height difference and body size contrast clearly visible, woman looking up at man with a soft warm smile, man looking down with a gentle protective expression, golden hour warm lighting, autumn city street with leaves on sidewalk, full body shot from three-quarter angle, photorealistic illustration style, (body size difference:1.4), (height difference:1.3), (muscular man and petite woman:1.3), (masterpiece:1.2), (best quality:1.4)',
    difficulty: 'intermediate',
  },
  {
    slug: 'bodytype-diff-athlete-gym-training-couple',
    title: '体格差カップル - ジムでパーソナルトレーニングプロンプト',
    description:
      'ジムで筋肉質トレーナー × 細身女性のパートナートレーニング体格差プロンプト。スポーツウェア・スピンバイク・ダンベル背景。筋肉差 / フィットネスシーン定番。',
    tags: ['体格差', '身長差', 'カップル', 'ボディタイプ'],
    seoTitle: '体格差 ジム プロンプト | トレーナー × 細身女性 二人構図 AI 生成',
    seoDescription:
      'ジム筋肉差カップル構図プロンプト。筋肉質トレーナー 188cm × 細身女性 162cm、パートナートレーニング。フィットネス / スポーツ BL の応用にも。',
    altText: '体格差 ジム構図 - トレーナー × 細身女性 - Stable Diffusion AI 生成画像',
    content:
      '1man and 1woman in a modern gym, very muscular athletic man around 188cm with bulging biceps and chiseled abs in a black tank top and shorts, lean slim woman around 162cm in pink sports bra and gym leggings, man standing behind her gently spotting her shoulders as she performs squats with a barbell, dramatic body size contrast between his bulky muscular frame and her slender athletic build, modern gym equipment in background, bright daylight through tall windows, full body shot from side angle, dynamic fitness photography aesthetic, (muscle mass difference:1.4), (body size contrast:1.3), (athletic training composition:1.3), (masterpiece:1.3), (best quality:1.4)',
    difficulty: 'intermediate',
  },
  {
    slug: 'bodytype-diff-bear-hug-large-male-tiny-female',
    title: '体格差カップル - 大柄男性が小柄女性を後ろから抱きしめるプロンプト',
    description:
      '体格差ハグ構図プロンプト。大柄 195cm 男性が petite 152cm 女性を後ろから優しく包み込む。冬コート姿・雪景色、極端体格差の包容感を演出。',
    tags: ['体格差', '身長差', 'カップル', 'ボディタイプ'],
    seoTitle: '体格差 ハグ プロンプト | 大柄男性 × 小柄女性 包み込み AI 生成',
    seoDescription:
      '体格差ハグ構図プロンプト。大柄 195cm 男性が petite 152cm 女性を包み込む。冬コート・雪景色、極端体格差の包容感シーン。Stable Diffusion 対応。',
    altText: '体格差ハグ - 大柄男性 × 小柄女性 - Stable Diffusion AI 生成画像',
    content:
      '1man and 1woman standing close on a snowy winter street, very large bulky tall man around 195cm with broad shoulders and a thick athletic build in a long dark wool coat, tiny petite woman around 152cm with delicate slender frame in a beige knit coat, man standing behind her wrapping both arms protectively around her shoulders and torso, woman tilting her head back slightly to lean against his chest with a soft closed-eye smile, falling snowflakes around them, warm street lamp glow, dramatic body size and height contrast clearly visible, full body shot from three-quarter front angle, romantic winter illustration aesthetic, (body size difference:1.5), (height difference:1.4), (large man embracing petite woman:1.3), (masterpiece:1.3), (best quality:1.4)',
    difficulty: 'advanced',
  },
  {
    slug: 'bodytype-diff-yuri-tall-curvy-petite-slim',
    title: '体格差百合カップル - 長身カーヴィ × 小柄スリムプロンプト',
    description:
      '百合体格差カップル構図プロンプト。長身カーヴィなお姉さん 178cm × 小柄スリムな妹系 155cm、学園シーンで頭ぽんぽん。体格差 + 関係性の差で愛おしさを演出。',
    tags: ['体格差', '身長差', 'カップル', 'ボディタイプ'],
    seoTitle: '体格差百合 プロンプト | 長身カーヴィ × 小柄 二人構図 AI 生成',
    seoDescription:
      '百合体格差構図プロンプト。長身カーヴィお姉さん 178cm × 小柄スリム妹系 155cm、学校制服で頭ぽんぽん。yuri / お姉さん × 妹定番。Stable Diffusion 対応。',
    altText: '体格差百合 - 長身カーヴィ × 小柄スリム - Stable Diffusion AI 生成画像',
    content:
      '2girls in school uniforms after class in a sunny school courtyard, tall curvy mature looking onee-san type around 178cm with hourglass figure and long dark hair in a navy blazer uniform, petite slim younger looking imouto type around 155cm with delicate slender frame and short pastel pink hair in the same uniform, taller curvy girl gently patting the smaller girl\'s head with a warm affectionate smile, smaller girl looking up at her with soft blushing happy expression, cherry blossom petals drifting in afternoon light, dramatic body size and height contrast clearly visible, full body shot from three-quarter angle, soft shoujo manga aesthetic, (body size difference:1.3), (height difference:1.3), (curvy and petite contrast:1.3), (yuri composition:1.2), (masterpiece:1.3), (best quality:1.4), 2girls',
    difficulty: 'intermediate',
  },
  {
    slug: 'bodytype-diff-reverse-tall-athletic-female-shorter-slim-male',
    title: '逆体格差カップル - 長身アスリート女性 × 細身男性プロンプト',
    description:
      '逆体格差カップル構図プロンプト。長身アスリート女性 178cm × 細身男性 168cm、女性のほうが背も体格も上の逆パターン。月間 1,900 件需要の SNS 人気ジャンル。',
    tags: ['体格差', '身長差', 'カップル', 'ボディタイプ'],
    seoTitle: '逆体格差カップル プロンプト | 長身女 × 細身男 AI 生成',
    seoDescription:
      '逆体格差カップル構図プロンプト。長身アスリート女性 178cm × 細身男性 168cm、女性のほうが背も体格も上。SNS 人気ジャンル、Stable Diffusion 対応。',
    altText: '逆体格差カップル - 長身女性 × 細身男性 - Stable Diffusion AI 生成画像',
    content:
      '1woman and 1man standing close on a modern city plaza, tall athletic toned woman around 178cm with broad shoulders, long legs and defined arms in a chic cropped tank top and high-waisted trousers, shorter slimmer man around 168cm with slim narrow build in a casual cardigan and jeans, woman standing slightly behind him with her arm draped casually over his shoulders, man looking up at her with a soft affectionate smile, woman looking down at him with a confident warm smirk, modern city plaza with glass buildings in background, soft afternoon lighting, dramatic reverse height and body size contrast clearly visible, full body shot from front three-quarter angle, photorealistic illustration aesthetic, (reverse height difference:1.4), (taller athletic woman:1.3), (shorter slim man:1.3), (reverse body size contrast:1.3), (masterpiece:1.3), (best quality:1.4)',
    difficulty: 'advanced',
  },
  {
    slug: 'bodytype-diff-bodybuilder-female-slim-male-extreme',
    title: '極端体格差 - 筋肉質女性ボディビルダー × 細身男性プロンプト',
    description:
      '極端体格差カップル構図プロンプト。女性ボディビルダー 172cm 大胸筋アスリート × 細身男性 175cm、ジム背景で筋肉差を強調。筋肉差 / 強いヒロイン系の定番。',
    tags: ['体格差', 'カップル', 'ボディタイプ'],
    seoTitle: '筋肉差カップル プロンプト | 女性ボディビルダー × 細身男性 AI 生成',
    seoDescription:
      '極端筋肉差カップル構図プロンプト。女性ボディビルダー 172cm × 細身男性 175cm、ジム背景。強いヒロイン / 筋肉差ジャンル Stable Diffusion 対応。',
    altText: '極端筋肉差 - 女性ボディビルダー × 細身男性 - Stable Diffusion AI 生成画像',
    content:
      '1woman and 1man in a modern gym, extremely muscular female bodybuilder around 172cm with massive defined chest, bulging biceps, six-pack abs and broad shoulders in a black sports bra and athletic shorts, slim slender man around 175cm with narrow shoulders and lean delicate build in a simple white t-shirt and jeans, woman standing in a confident power stance with arms slightly flexed showing her muscle mass, man standing beside her looking with a mix of admiration and amused surprise, gym equipment in background, dramatic side lighting emphasizing her muscle definition, dramatic extreme body size and muscle mass contrast clearly visible, full body shot from front angle, photorealistic illustration aesthetic, (muscle mass difference:1.5), (body size contrast:1.4), (muscular woman and slim man:1.4), (masterpiece:1.3), (best quality:1.4)',
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

  const bodyTypeCat = await prisma.category.findUnique({ where: { slug: 'body-type' } })
  const sdTool = await prisma.tool.findUnique({ where: { slug: 'stable-diffusion' } })
  if (!bodyTypeCat || !sdTool) throw new Error('body-type category or stable-diffusion tool missing')

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
          sourceUrl: 'https://www.prompta.jp/guides/height-difference-pair-prompt',
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
