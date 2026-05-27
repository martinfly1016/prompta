// @ts-nocheck
/**
 * 体格差 hard-fail retry with gpt-image-1 — 2026-05-27
 *
 * SDXL fast model couldn't handle 3 anti-bias compositions:
 * 1. yuri-curvy-petite — drew similar body types
 * 2. reverse-tall-female — drew 2 women instead of 1F+1M
 * 3. bodybuilder-female-slim-male — drew man with abs anyway
 *
 * gpt-image-1 is far more prompt-faithful via natural language.
 * Cost: 3 × $0.04 ≈ $0.12
 *
 * Run: npx tsx src/scripts/collect/_bodytype_diff_gpt_retry_2026_05_27.ts
 */
import 'dotenv/config'
import { writeFile, mkdir } from 'node:fs/promises'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { put, del } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'

function loadEnvFile(path: string): void {
  if (!existsSync(path)) return
  const text = readFileSync(path, 'utf8')
  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#')) continue
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!m) continue
    const name = m[1]
    if (process.env[name] !== undefined) continue
    process.env[name] = m[2].replace(/^['"]|['"]$/g, '')
  }
}
loadEnvFile('.env.local')

const ROOT = resolve(__dirname, '../../..')
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/bodytype-diff-gpt-2026-05-27`

interface RetryDef {
  slug: string
  /** Natural language description optimized for gpt-image-1 */
  description: string
  /** The cleaned-up prompt text saved to DB (English, can include weights) */
  promptText: string
}

const RETRIES: RetryDef[] = [
  {
    slug: 'bodytype-diff-yuri-tall-curvy-petite-slim',
    // Rewritten 2nd time to avoid OpenAI safety filter (the prior "high school
    // + large bust" combination triggered sexual-content rejection).
    // Switched to adult women in a coffee shop, removed bust-specific wording,
    // emphasized hourglass and petite via silhouette terms instead.
    description:
      'A vibrant anime illustration showing exactly two adult women standing together in front of a cozy modern coffee shop. The woman on the left is tall and mature-looking (about 178cm), with an hourglass silhouette featuring distinctly wide hips, a narrow waist, and a fuller curvy figure overall. She has long flowing dark brown hair and wears a navy blazer with a midi skirt. The woman on the right is much smaller and obviously petite (about 155cm), with a very slim, delicate, narrow-shouldered, slender frame. She has short pastel pink hair and wears a matching navy blazer with a pleated skirt. The taller curvy woman is affectionately patting the smaller petite woman on the head with a warm gentle smile; the smaller woman looks up at her with a soft happy expression. Autumn afternoon golden hour light, warm friendly mood. The dramatic body size and height contrast between the two — the taller curvy figure vs the smaller slender figure — must be the clearly visible focus of the image. Full body shot from three-quarter angle. Soft shoujo manga aesthetic, high quality.',
    promptText:
      '2girls only, exactly two adult women in front of a cozy modern coffee shop, tall mature curvy onee-san type around 178cm with hourglass silhouette wide hips narrow waist long flowing dark hair in a navy blazer with midi skirt, petite small slim imouto type around 155cm with narrow shoulders delicate slender frame short pastel pink hair in the same navy blazer uniform, taller curvy woman affectionately patting smaller petite woman head with warm gentle smile, smaller woman looking up with soft happy expression, autumn golden hour warm light, dramatic body size and height contrast clearly visible between the two, full body shot from three-quarter angle, soft shoujo manga aesthetic, (2girls:1.5), (curvy onee-san and petite imouto:1.4), (hourglass silhouette:1.3), (very petite slim:1.3), (body size difference:1.3), (height difference:1.3), (masterpiece:1.3), (best quality:1.4), 2girls',
  },
  /* skip — already passed in prior run
  {
    slug: 'bodytype-diff-reverse-tall-athletic-female-shorter-slim-male',
    description:
      'A photorealistic image showing exactly one woman and one man (heterosexual couple) standing close together on a modern city plaza. The woman is on the left, clearly tall and athletically built (about 180cm), with broad shoulders, long muscular legs, and defined arms; she wears a chic cropped tank top and high-waisted trousers. The man is on the right, distinctly much shorter than the woman (about 165cm) — visibly 15cm shorter — with a slim, slender, narrow-shouldered, lean delicate build; he wears a casual cardigan and jeans. The woman is clearly the taller and larger figure. She drapes her arm casually over his shoulders and looks down at him with a confident warm smirk. He looks up at her with a soft affectionate smile. Modern city plaza with glass buildings in background, soft afternoon lighting. The reverse height pairing (woman taller, man shorter and slimmer) must be clearly and dramatically visible — this is the central focus of the image. Full body shot from front three-quarter angle. Photorealistic illustration aesthetic.',
    promptText:
      '1woman and 1man standing close together on a modern city plaza, very tall athletic toned woman around 180cm with broad shoulders, long legs, defined arms and muscular build in a chic cropped tank top and high-waisted trousers, woman is clearly taller than the man and physically larger, much shorter slim slender man around 165cm with narrow shoulders and lean delicate slim build in a casual cardigan and jeans, woman draping her arm casually over man shoulders looking down at him, man looking up at her with a soft affectionate smile, modern city plaza with glass buildings in background, soft afternoon lighting, dramatic reverse height and body size contrast clearly visible, full body shot from front three-quarter angle, photorealistic illustration aesthetic, (woman taller than man:1.6), (reverse height difference:1.5), (tall athletic woman 180cm:1.4), (short slim man 165cm:1.4), (masterpiece:1.3), (best quality:1.4)',
  },
  {
    slug: 'bodytype-diff-bodybuilder-female-slim-male-extreme',
    description:
      'A photorealistic image showing exactly one woman and one man in a modern gym. The woman on the left is an extremely muscular professional female bodybuilder (about 172cm) — she has massive defined chest muscles, huge bulging biceps, visible six-pack abs, broad muscular shoulders, and a competition-ready physique. She wears a black sports bra and athletic shorts. She stands in a confident power stance flexing her arms to display her enormous muscle mass. The man on the right is the opposite: a very slim, skinny, narrow-shouldered, lean delicate young man (about 175cm) with twig-like thin arms and no muscle definition whatsoever — he looks like a typical office worker or student, not athletic at all. He wears a simple loose white t-shirt and slim jeans. He stands beside her looking small and slim in comparison, with a soft admiring expression as he looks at her muscles. The woman is clearly the muscular dominant figure; the man is clearly the slim non-athletic figure. Gym equipment in background, dramatic side lighting emphasizing her muscle definition. The extreme muscle-mass dominance of the woman over the slim non-muscular man must be the central, obvious focus.',
    promptText:
      '1woman and 1man in a modern gym, extremely muscular female bodybuilder around 172cm with massive defined chest, bulging biceps, six-pack abs and broad muscular shoulders in a black sports bra and athletic shorts, very slim slender man around 175cm with very narrow shoulders, lean delicate skinny frame and twig-like arms in a simple loose white t-shirt and slim jeans, woman standing in a confident power stance flexing her arms showing massive muscle mass, man standing beside her looking small and slim in comparison with a soft admiring expression, gym equipment in background, dramatic side lighting emphasizing her muscle definition, woman is much more muscular than the man, photorealistic illustration aesthetic, (female bodybuilder:1.6), (extremely muscular woman:1.5), (massive female muscles:1.4), (very slim skinny narrow man:1.5), (delicate twig arms man:1.4), (woman much more muscular than man:1.5), (extreme muscle mass difference female dominance:1.4), (masterpiece:1.3), (best quality:1.4)',
  }, */
]

async function callGptImage(naturalDesc: string): Promise<Buffer> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.chatgpt_api_key
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY / chatgpt_api_key')

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt: naturalDesc,
      size: '1024x1024',
      n: 1,
    }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`gpt-image-1 ${res.status}: ${txt.slice(0, 400)}`)
  }
  const json: any = await res.json()
  const data = json?.data?.[0]
  if (data?.b64_json) {
    return Buffer.from(data.b64_json, 'base64')
  }
  if (data?.url) {
    const imgRes = await fetch(data.url)
    if (!imgRes.ok) throw new Error(`fetch image url ${imgRes.status}`)
    return Buffer.from(await imgRes.arrayBuffer())
  }
  throw new Error('gpt-image-1 returned no image data')
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
      console.log(`  🎨 gpt-image-1 generating (1024x1024, ~30s)...`)
      const t0 = Date.now()
      const imgBuf = await callGptImage(r.description)
      console.log(`     ${((Date.now() - t0) / 1000).toFixed(1)}s · ${(imgBuf.length / 1024).toFixed(0)} KB`)
      if (imgBuf.length < 30 * 1024) {
        throw new Error(`gpt-image-1 returned suspicious small image ${imgBuf.length}B`)
      }
      await writeFile(`${OUT_DIR}/${r.slug}.png`, imgBuf)

      console.log(`  ☁️  upload Blob`)
      const blob = await uploadToBlob(imgBuf, `prompts/${r.slug}-gpt.png`, 'image/png')

      console.log(`  🗑️  delete old blob + image rows`)
      for (const img of existing.images) {
        try { await del(img.url) } catch (e: any) { console.warn(`     ⚠️ blob del: ${e.message?.slice(0, 100)}`) }
        await prisma.promptImage.delete({ where: { id: img.id } })
      }

      console.log(`  💾 DB: update content (stay unpublished for manual review)`)
      await prisma.prompt.update({
        where: { slug: r.slug },
        data: {
          content: r.promptText,
          images: {
            create: [
              {
                url: blob.url,
                blobKey: blob.blobKey,
                fileName: `${r.slug}-gpt.png`,
                fileSize: blob.fileSize,
                mimeType: 'image/png',
                imageType: 'original',
                width: 1024,
                height: 1024,
                order: 0,
                altText: `体格差カップル gpt-image-1 retry - ${r.slug}`,
              },
            ],
          },
        },
      })
      console.log(`  ✅ OK (unpublished — manual review pending)`)
      results.push({ slug: r.slug, status: 'OK' })
    } catch (e: any) {
      console.error(`  ❌ ${e.message?.slice(0, 300)}`)
      results.push({ slug: r.slug, status: 'FAIL', reason: e.message?.slice(0, 200) })
    }
  }

  console.log('\n═══ GPT RETRY SUMMARY ═══')
  for (const r of results) {
    const icon = r.status === 'OK' ? '✅' : '❌'
    console.log(`  ${icon} ${r.slug}${r.reason ? ` — ${r.reason}` : ''}`)
  }
  console.log('\nReview at: seo/style-test-samples/output/bodytype-diff-gpt-2026-05-27/')
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
