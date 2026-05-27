// @ts-nocheck
/**
 * 体格差カップル retry batch — 2026-05-27
 *
 * Initial batch (commit pending) shipped 6 prompts; quality audit found
 * 5/6 failed to follow the brief due to SDXL's training bias overriding
 * explicit instructions for: reverse-height pairings, extreme muscle
 * contrast with female muscle dominance, 2girls strict count, and
 * back-hug pose.
 *
 * This script:
 * 1. Re-renders the 5 fails with strengthened prompts (heavier negative,
 *    danbooru tags, explicit anti-bias weighting per height-diff guide §5)
 * 2. Replaces blob + DB image row + content field
 * 3. Re-publishes if quality passes (manual review still required after)
 *
 * Failed slugs already unpublished via scripts/_unpublish-bodytype-diff-fails.ts
 *
 * Cost: 5 × ~$0.005 ≈ $0.025
 * Run: npx tsx src/scripts/collect/_bodytype_diff_retry_2026_05_27.ts
 */
import 'dotenv/config'
import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { put, del } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'

const ROOT = resolve(__dirname, '../../..')
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/bodytype-diff-retry-2026-05-27`
const FAL_MODEL = process.env.FAL_SD_MODEL || 'fal-ai/fast-sdxl'
const FAL_ENDPOINT = `https://fal.run/${FAL_MODEL}`

interface RetryDef {
  slug: string
  positive: string
  negative: string
}

const NEGATIVE_BASE = 'deformed body, bad anatomy, distorted proportions, extra limbs, fused fingers, missing limbs, worst quality, low quality, blurry, jpeg artifacts'

const RETRIES: RetryDef[] = [
  {
    // Issue: woman drew muscular like bodybuilder; needs lean feminine slim
    slug: 'bodytype-diff-athlete-gym-training-couple',
    positive:
      '1man and 1woman in a modern gym, very muscular athletic man around 188cm with bulging biceps and chiseled abs in a black tank top and shorts, slim lean feminine woman around 162cm with delicate slender frame and narrow shoulders in a pink sports bra and gym leggings, man standing behind woman gently spotting her shoulders as she performs squats with a barbell, woman appears clearly slim and delicate compared to the heavily muscular man, modern gym equipment in background, bright clean daylight through tall windows, full body shot from side angle, photorealistic fitness photography aesthetic, (muscular man:1.4), (slim feminine woman:1.4), (extreme muscle mass difference:1.4), (slim petite female body:1.3), (masterpiece:1.3), (best quality:1.4)',
    negative: `${NEGATIVE_BASE}, muscular woman, female bodybuilder, woman with abs, woman with biceps, broad-shouldered woman, masculine woman, equal muscle mass, two muscular figures`,
  },
  {
    // Issue: no hug captured, just standing apart; needs explicit back-hug
    slug: 'bodytype-diff-bear-hug-large-male-tiny-female',
    positive:
      '1man and 1woman, large muscular tall man around 195cm with broad shoulders and thick athletic build standing behind tiny petite slim woman around 152cm with delicate slender frame, man wrapping both arms around woman from behind in a tight hug, his arms crossed over her chest and waist, his chin resting on top of her head, woman holding his arms and leaning back into his chest with a soft closed-eye smile, both in casual winter clothes (man in dark wool sweater, woman in beige knit dress), warm cafe interior background blurred, dramatic body size and height contrast clearly visible, full body shot from front three-quarter angle, romantic illustration aesthetic, (hug from behind:1.5), (arms wrapped around her waist:1.4), (large man embracing tiny petite woman:1.4), (height difference:1.4), (body size difference:1.4), (masterpiece:1.3), (best quality:1.4)',
    negative: `${NEGATIVE_BASE}, standing apart, no contact, retro film aesthetic, vintage film, sepia, two figures separated, facing each other, side by side standing`,
  },
  {
    // Issue: drew 3 girls; needs strict 2girls + clear body type contrast
    slug: 'bodytype-diff-yuri-tall-curvy-petite-slim',
    positive:
      '2girls only, exactly two girls in a sunny school courtyard, tall mature looking onee-san around 178cm with full curvy hourglass body, large bust, wide hips, narrow waist, long flowing dark hair in a navy school blazer uniform, petite small younger looking imouto type around 155cm with very slim delicate flat-chested narrow-shouldered frame and short pastel pink hair in the same uniform, taller curvy onee-san gently patting smaller petite girl head with warm affectionate smile, smaller girl looking up with soft blushing happy expression, cherry blossom petals drifting in afternoon light, dramatic body size and height contrast clearly visible between the two, full body shot from three-quarter angle, soft anime illustration aesthetic, (2girls:1.5), (curvy onee-san and petite imouto:1.4), (hourglass figure:1.3), (very petite slim:1.3), (body size difference:1.3), (height difference:1.3), (masterpiece:1.3), (best quality:1.4)',
    negative: `${NEGATIVE_BASE}, 3girls, multiple girls, crowd of girls, group of three or more, third girl in background, similar body types, same body size, equal heights`,
  },
  {
    // Issue: man drew taller and more muscular (opposite of "reverse")
    // Apply guide §5 advice: heavy weight on reverse + man-shorter negative
    slug: 'bodytype-diff-reverse-tall-athletic-female-shorter-slim-male',
    positive:
      '1woman and 1man standing close together on a modern city plaza, very tall athletic toned woman around 180cm with broad shoulders, long legs, defined arms and muscular build in a chic cropped tank top and high-waisted trousers, woman is clearly taller than the man and physically larger, much shorter slim slender man around 165cm with narrow shoulders and lean delicate slim build in a casual cardigan and jeans, man stands lower than woman due to clear height difference, woman draping her arm casually over man shoulders looking down at him, man looking up at her with a soft affectionate smile, modern city plaza with glass buildings in background, soft afternoon lighting, dramatic reverse height and body size contrast clearly visible, full body shot from front three-quarter angle, photorealistic illustration aesthetic, (woman taller than man:1.6), (reverse height difference:1.5), (tall athletic woman 180cm:1.4), (short slim man 165cm:1.4), (woman looking down at shorter man:1.4), (masterpiece:1.3), (best quality:1.4)',
    negative: `${NEGATIVE_BASE}, tall man, man taller than woman, man towering over woman, traditional height pairing, equal height, man looking down at woman, woman looking up at man, muscular man, tall muscular man, broad shouldered man, man taller`,
  },
  {
    // Issue: man drew as giant bodybuilder (opposite of "slim man")
    // Need extreme anti-bias weighting on slim narrow male
    slug: 'bodytype-diff-bodybuilder-female-slim-male-extreme',
    positive:
      '1woman and 1man in a modern gym, extremely muscular female bodybuilder around 172cm with massive defined chest, bulging biceps, six-pack abs and broad muscular shoulders in a black sports bra and athletic shorts, very slim slender man around 175cm with very narrow shoulders, lean delicate skinny frame and twig-like arms in a simple loose white t-shirt and slim jeans, woman standing in a confident power stance flexing her arms showing massive muscle mass, man standing beside her looking small and slim in comparison with a soft admiring expression, gym equipment in background, dramatic side lighting emphasizing her muscle definition, woman is much more muscular than the man, photorealistic illustration aesthetic, (female bodybuilder:1.6), (extremely muscular woman:1.5), (massive female muscles:1.4), (very slim skinny narrow man:1.5), (delicate twig arms man:1.4), (woman much more muscular than man:1.5), (extreme muscle mass difference female dominance:1.4), (masterpiece:1.3), (best quality:1.4)',
    negative: `${NEGATIVE_BASE}, muscular man, male bodybuilder, broad shouldered man, man with abs, man with biceps, bulky man, tall man, masculine muscular male, two muscular figures, equal muscle mass, man bigger than woman, athletic man, fit man, ripped man`,
  },
]

async function callFalSdxl(positive: string, negative: string): Promise<Buffer> {
  const apiKey = process.env.FAL_KEY || process.env.FAL_API_KEY
  if (!apiKey) throw new Error('Missing FAL_KEY')

  const res = await fetch(FAL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: positive,
      negative_prompt: negative,
      image_size: 'square_hd',
      num_images: 1,
      num_inference_steps: 30,
      guidance_scale: 8.5,
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

  const results: { slug: string; status: 'OK' | 'FAIL'; reason?: string }[] = []

  for (const r of RETRIES) {
    console.log(`\n══════ ${r.slug} ══════`)
    const existing = await prisma.prompt.findUnique({
      where: { slug: r.slug },
      include: { images: true },
    })
    if (!existing) {
      console.log(`  ❌ prompt not found`)
      results.push({ slug: r.slug, status: 'FAIL', reason: 'not found' })
      continue
    }

    try {
      console.log(`  🎨 fal SDXL re-rendering (steps=30, cfg=8.5)...`)
      const t0 = Date.now()
      const imgBuf = await callFalSdxl(r.positive, r.negative)
      console.log(`     ${((Date.now() - t0) / 1000).toFixed(1)}s · ${(imgBuf.length / 1024).toFixed(0)} KB`)
      await writeFile(`${OUT_DIR}/${r.slug}.jpg`, imgBuf)

      console.log(`  ☁️  upload new Blob`)
      const blob = await uploadToBlob(imgBuf, `prompts/${r.slug}-retry.jpg`, 'image/jpeg')

      console.log(`  🗑️  delete old blob + image row`)
      for (const img of existing.images) {
        try { await del(img.url) } catch (e: any) { console.warn(`     ⚠️ blob del: ${e.message?.slice(0, 100)}`) }
        await prisma.promptImage.delete({ where: { id: img.id } })
      }

      console.log(`  💾 DB: update content + isPublished=false (keep manual review gate)`)
      await prisma.prompt.update({
        where: { slug: r.slug },
        data: {
          content: r.positive,
          // intentionally LEAVE isPublished=false; user will re-publish
          // after visual review confirms retry quality
          images: {
            create: [
              {
                url: blob.url,
                blobKey: blob.blobKey,
                fileName: `${r.slug}-retry.jpg`,
                fileSize: blob.fileSize,
                mimeType: 'image/jpeg',
                imageType: 'original',
                width: 1024,
                height: 1024,
                order: 0,
                altText: `体格差カップル retry - ${r.slug}`,
              },
            ],
          },
        },
      })
      console.log(`  ✅ retry OK (still unpublished — manual review pending)`)
      results.push({ slug: r.slug, status: 'OK' })
    } catch (e: any) {
      console.error(`  ❌ ${e.message?.slice(0, 200)}`)
      results.push({ slug: r.slug, status: 'FAIL', reason: e.message?.slice(0, 200) })
    }
  }

  console.log('\n═══ RETRY SUMMARY ═══')
  for (const r of results) {
    const icon = r.status === 'OK' ? '✅' : '❌'
    console.log(`  ${icon} ${r.slug}${r.reason ? ` — ${r.reason}` : ''}`)
  }
  console.log('\nNext: review images at seo/style-test-samples/output/bodytype-diff-retry-2026-05-27/')
  console.log('then republish passing ones via DB update isPublished=true.')
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
