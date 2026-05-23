// @ts-nocheck
/**
 * Generate 8 hero/section illustrations for /guides/height-difference-pair-prompt
 * via fal SDXL. Each section gets one representative image to break up
 * the wall-of-text feel pointed out in user feedback.
 *
 * Cost: 8 × $0.005 ≈ $0.04
 * Output: prints { section: { url, alt } } JSON for direct paste into guide content.
 */
import 'dotenv/config'
import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { put } from '@vercel/blob'

const ROOT = resolve(__dirname, '../../..')
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/height-diff-guide-hero`
const FAL_ENDPOINT = `https://fal.run/${process.env.FAL_SD_MODEL || 'fal-ai/fast-sdxl'}`

interface ImgDef {
  key: string
  prompt: string
  alt: string
}

const IMAGES: ImgDef[] = [
  {
    key: 'section-1-concept',
    alt: '身長差プロンプトの概念図 - 2 人のキャラクターが並び立つアニメイラスト',
    prompt:
      '2 anime characters standing side by side with clear dramatic height difference, one tall around 190cm with dark hair in modern stylish coat, one petite around 155cm with light hair in soft pastel outfit, both facing the viewer with gentle warm smiles, full body shot, clean soft pastel pink and cream gradient background, professional anime illustration style, (height difference:1.3), (masterpiece:1.3), (best quality:1.4), sharp focus, hero illustration',
  },
  {
    key: 'section-2-default-behavior',
    alt: '同身長になりがちな AI 生成の典型例 - 身長差指定の必要性',
    prompt:
      'Two anime characters standing very close together, one notably taller around 188cm and one notably shorter around 152cm, dramatic visible height gap between them, both wearing simple modern clothing in matching tones, calm neutral expressions, full body shot from the front, soft studio lighting, clean light gray seamless backdrop, character design reference style, (height difference:1.4), (size difference:1.3), (masterpiece:1.3), sharp focus',
  },
  {
    key: 'section-3-six-elements',
    alt: '身長差プロンプトを構成する 6 要素を示すサンプル画像',
    prompt:
      '1boy and 1girl, tall man around 188cm in dark navy long coat dark jeans, petite woman around 160cm in cream knitted dress and black boots, height difference, holding hands, looking at each other affectionately, autumn city street at sunset, golden hour warm lighting, fallen leaves, full body shot showing clear height gap, photorealistic anime illustration style, (height difference:1.3), (masterpiece:1.3), (best quality:1.4)',
  },
  {
    key: 'section-4-situations',
    alt: '身長差プロンプトの 8 シチュエーション代表例 - カップル',
    prompt:
      '2 anime boys in BL romantic style, tall handsome man 195cm with black hair in dark wool coat, shorter cute man 165cm with light brown hair in cream sweater, height difference, standing close together facing each other softly, warm cafe interior background with bokeh, soft afternoon window light, full body shot, anime BL illustration style, (height difference:1.3), (masterpiece:1.3), (best quality:1.4), sharp focus',
  },
  {
    key: 'section-5-poses',
    alt: '身長差ハグ構図 - 包み込む抱擁のサンプル画像',
    prompt:
      'Tall anime character around 190cm in long open dark coat tenderly embracing a shorter character around 158cm in cream sweater from above, the shorter one resting their head against the taller chest with peaceful closed-eyes expression, the taller one resting chin on shorter character head with gentle smile, soft warm interior lighting from a window, blurred bookshelf background, intimate close-up shot from slight side angle, anime shoujo manga illustration style, (height difference:1.4), (masterpiece:1.3), (best quality:1.4)',
  },
  {
    key: 'section-6-troubleshooting',
    alt: '身長差プロンプト失敗例と修正例の比較 - T-pose 設定資料風',
    prompt:
      'Character design reference sheet showing two anime characters in T-pose stance side by side against a clean white grid background, one tall character around 188cm with clearly proportioned tall body, one short character around 152cm with petite body proportions, both facing directly forward, even neutral studio lighting, no shadows, full body straight-on shot with proportion measurement lines suggested faintly in background, character design sheet illustration style, (height difference:1.4), (masterpiece:1.3), (best quality:1.4), sharp focus',
  },
  {
    key: 'section-7-tools',
    alt: 'Stable Diffusion / Midjourney / DALL-E 身長差表現の違い',
    prompt:
      'Triptych anime illustration showing 3 different character pair styles side by side in one image: left panel anime cel-shaded couple with height difference, middle panel painterly Midjourney style couple with height difference, right panel soft DALL-E illustration style couple with height difference, all showing tall × short character pairs, art style comparison chart layout, magazine spread aesthetic, (height difference:1.3), (masterpiece:1.3), (best quality:1.4)',
  },
  {
    key: 'section-8-gallery',
    alt: 'prompta.jp 身長差プロンプト 15 件の作品例ギャラリー',
    prompt:
      'Anime gallery showcase composition showing 4 different romantic character pairs each with distinct height differences arranged in a 2x2 grid: BL couple top-left, yuri couple top-right, hetero couple bottom-left, fantasy knight and mage bottom-right, all in matching warm illustration style, gallery wall aesthetic, magazine spread layout, (height difference:1.3), (masterpiece:1.3), (best quality:1.4), sharp focus',
  },
]

async function callFalSdxl(prompt: string): Promise<Buffer> {
  const apiKey = process.env.FAL_KEY || process.env.FAL_API_KEY
  const res = await fetch(FAL_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Key ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      image_size: 'landscape_16_9',
      num_images: 1,
      num_inference_steps: 25,
      enable_safety_checker: true,
    }),
  })
  if (!res.ok) throw new Error(`fal ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const json: any = await res.json()
  const url: string = json?.images?.[0]?.url
  if (!url) throw new Error('no image url')
  const imgRes = await fetch(url)
  return Buffer.from(await imgRes.arrayBuffer())
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const result: Record<string, { url: string; alt: string }> = {}

  for (const img of IMAGES) {
    console.log(`\n══ ${img.key} ══`)
    const t0 = Date.now()
    const buf = await callFalSdxl(img.prompt)
    console.log(`  ${((Date.now() - t0) / 1000).toFixed(1)}s · ${(buf.length / 1024).toFixed(0)} KB`)
    await writeFile(`${OUT_DIR}/${img.key}.jpg`, buf)
    const blob = await put(`guides/height-diff/${img.key}.jpg`, buf, {
      access: 'public',
      contentType: 'image/jpeg',
      addRandomSuffix: true,
    })
    console.log(`  ${blob.url}`)
    result[img.key] = { url: blob.url, alt: img.alt }
  }

  console.log('\n══ JSON OUTPUT ══')
  console.log(JSON.stringify(result, null, 2))
  await writeFile(`${OUT_DIR}/urls.json`, JSON.stringify(result, null, 2))
  console.log(`\nWrote ${OUT_DIR}/urls.json`)
}
main().catch(e => { console.error(e); process.exit(1) })
