// @ts-nocheck
/**
 * Generate hero illustrations for every section in every guide except
 * height-difference-pair-prompt (which already has inline images).
 *
 * 84 sections × ~$0.005 fal-sdxl ≈ $0.42 total. Idempotent: state.json
 * tracks completed renders so reruns only fill in gaps after API hiccups.
 *
 * Output: seo/style-test-samples/output/all-guides-hero/state.json
 * Then page.tsx rendering reads from a GUIDE_HERO_IMAGES const for
 * lazy-loaded <img> injection.
 *
 * Run: npx tsx src/scripts/collect/_all_guides_hero_images.ts
 */
import 'dotenv/config'
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { put } from '@vercel/blob'

const ROOT = resolve(__dirname, '../../..')
const PAGE_PATH = `${ROOT}/src/app/(marketing)/guides/[slug]/page.tsx`
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/all-guides-hero`
const STATE_PATH = `${OUT_DIR}/state.json`
const FAL_ENDPOINT = `https://fal.run/${process.env.FAL_SD_MODEL || 'fal-ai/fast-sdxl'}`
const SKIP_GUIDE = 'height-difference-pair-prompt' // already has inline imgs

// Per-guide style prompt — appended to a common postfix. Sections within
// the same guide share a style, with random seed variation per call.
const GUIDE_STYLES: Record<string, string> = {
  'what-is-prompt':
    'Conceptual illustration of an AI assistant chatting with a person, modern digital art aesthetic, soft pastel palette, friendly atmosphere',
  'stable-diffusion-prompt-guide':
    'Anime-style character illustration showcasing Stable Diffusion art, vibrant detailed anime art reference sheet, professional anime quality',
  'midjourney-prompt-guide':
    'Cinematic dreamlike portrait art reference, Midjourney signature style, dramatic lighting, painterly fantasy aesthetic, magazine cover quality',
  'chatgpt-prompt-techniques':
    'Conceptual illustration of a productivity workspace with a laptop showing AI chat, modern flat illustration, clean professional aesthetic, warm color palette',
  'prompt-language-game':
    'Playful illustration of language learning with AI, friendly characters, soft watercolor children\'s book aesthetic, warm bright palette',
  'negative-prompt-guide':
    'Anime character portrait art reference showing high-quality clean image generation, professional anime illustration, sharp focus, clean studio aesthetic',
  'hairstyle-prompt-guide':
    'Anime character with detailed varied hairstyles showcase, hairstyle reference sheet, professional anime illustration, multiple hair color and style options visible',
  'anime-prompt-guide':
    'Beautiful anime character portrait, signature anime art style, vibrant colors, detailed illustration, manga-inspired aesthetic',
  'cosplay-prompt-guide':
    'Anime character in elaborate cosplay outfit, detailed costume design, professional anime cosplay illustration, vibrant theatrical aesthetic',
  'body-type-prompt-guide':
    'Anime character body type and proportions reference sheet, multiple body silhouettes showcased, character design illustration, full body shot',
  'color-prompt-guide':
    'Anime character with vibrant color palette focus, color scheme reference illustration, professional anime art, harmonious color composition',
  'prompt-writing-guide':
    'Conceptual illustration of a writer collaborating with AI, modern flat illustration, productive workspace aesthetic, soft warm palette',
  'personal-color-hair-color':
    'Stylish person with personalized hair color analysis, fashion magazine portrait, beauty editorial photography style, professional studio lighting',
  'gemini-prompt-collection':
    'Modern conceptual illustration of Google Gemini AI assistance, friendly geometric design, clean professional aesthetic, soft Google brand palette',
  'ai-coloring-page-prompt':
    'Hand-drawn coloring book line art illustration showcasing intricate patterns and shapes, black and white linework, mandala or floral motif',
}

const COMMON_POSTFIX = 'soft modern aesthetic, sharp focus, (masterpiece:1.2), (best quality:1.4), 16:9 landscape composition, professional illustration quality'

interface Section {
  guide: string
  idx: number
  title: string
}

function extractSections(src: string): Section[] {
  const lines = src.split('\n')
  let current: string | null = null
  let inGuideContent = false
  let sectionIdx = 0
  const sections: Section[] = []

  // Locate the GUIDE_CONTENT block start to avoid matching guide-like patterns elsewhere
  const guideContentLine = lines.findIndex((l) => /^const GUIDE_CONTENT:/.test(l))
  if (guideContentLine === -1) throw new Error('GUIDE_CONTENT not found')
  inGuideContent = true

  for (let i = guideContentLine; i < lines.length; i++) {
    const line = lines[i]
    const guideMatch = /^  '([a-z-]+)':\s*\{/.exec(line)
    if (guideMatch) {
      current = guideMatch[1]
      sectionIdx = 0
      continue
    }
    if (current && /^        title:\s*'/.test(line)) {
      const titleMatch = /^        title:\s*'(.+?)',?\s*$/.exec(line)
      if (titleMatch) {
        sections.push({ guide: current, idx: sectionIdx, title: titleMatch[1] })
        sectionIdx++
      }
    }
  }
  return sections.filter((s) => s.guide !== SKIP_GUIDE)
}

async function loadState(): Promise<Record<string, { url: string; alt: string }>> {
  try {
    await access(STATE_PATH)
    const txt = await readFile(STATE_PATH, 'utf-8')
    return JSON.parse(txt)
  } catch {
    return {}
  }
}

async function saveState(state: Record<string, { url: string; alt: string }>) {
  await writeFile(STATE_PATH, JSON.stringify(state, null, 2))
}

// Safety filter dummy blacks are ~14-20 KB. Real renders are 100-400 KB.
// Anything under 50 KB is treated as a safety reject so we retry.
const SAFETY_BLACK_THRESHOLD_BYTES = 50_000

async function callFalSdxl(prompt: string): Promise<Buffer> {
  const apiKey = process.env.FAL_KEY || process.env.FAL_API_KEY
  if (!apiKey) throw new Error('Missing FAL_KEY')
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
  if (!res.ok) throw new Error(`fal ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const json: any = await res.json()
  const url = json?.images?.[0]?.url
  if (!url) throw new Error('no image url')
  const imgRes = await fetch(url)
  const buf = Buffer.from(await imgRes.arrayBuffer())
  if (buf.length < SAFETY_BLACK_THRESHOLD_BYTES) {
    throw new Error(`SAFETY_BLOCK (${buf.length}B suggests blank image — fal safety filter)`)
  }
  return buf
}

/**
 * Generate with up to 2 retries using progressively safer prompts. fal-ai's
 * safety filter occasionally returns near-black images for prompts that
 * mention couples / characters / clothing in ways the filter dislikes;
 * stripping color/identity details usually unblocks them.
 */
async function generateWithRetry(originalPrompt: string): Promise<Buffer> {
  try {
    return await callFalSdxl(originalPrompt)
  } catch (e: any) {
    if (!e.message?.startsWith('SAFETY_BLOCK')) throw e
    console.warn(`     ⚠️  safety block — retry #1 with simplified prompt`)
    // Strip likely-trigger phrases for retry
    const simplified = originalPrompt
      .replace(/\bBL\b|\byaoi\b|\byuri\b|\bromantic\b|\bcouple\b/gi, 'characters')
      .replace(/\bboys\b|\bgirls\b/gi, 'characters')
      .replace(/\bembracing\b|\bhugging\b|\bkabe-don\b|\bkabedon\b/gi, 'standing together')
    try {
      return await callFalSdxl(simplified)
    } catch (e2: any) {
      if (!e2.message?.startsWith('SAFETY_BLOCK')) throw e2
      console.warn(`     ⚠️  safety block — retry #2 with ultra-generic prompt`)
      // Last-ditch: very generic illustration
      const generic = 'Anime style hero illustration, soft modern aesthetic, professional anime art, masterpiece, best quality, sharp focus, 16:9 landscape composition, decorative concept art'
      return callFalSdxl(generic)
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const src = await readFile(PAGE_PATH, 'utf-8')
  const sections = extractSections(src)
  console.log(`Found ${sections.length} sections across ${new Set(sections.map(s => s.guide)).size} guides`)

  const state = await loadState()
  let done = 0
  let skip = 0
  let fail = 0

  for (const sec of sections) {
    const key = `${sec.guide}/${sec.idx}`
    if (state[key]?.url) {
      skip++
      continue
    }
    const guideStyle = GUIDE_STYLES[sec.guide]
    if (!guideStyle) {
      console.warn(`  ⚠️  no GUIDE_STYLES entry for ${sec.guide}, skipping`)
      fail++
      continue
    }
    const prompt = `${guideStyle}, scene representing "${sec.title}", ${COMMON_POSTFIX}`
    const altText = `${sec.title} - prompta.jp ガイド挿絵`

    console.log(`\n[${done + skip + fail + 1}/${sections.length}] ${key} :: ${sec.title.slice(0, 50)}`)
    try {
      const t0 = Date.now()
      const buf = await generateWithRetry(prompt)
      console.log(`  ${((Date.now() - t0) / 1000).toFixed(1)}s · ${(buf.length / 1024).toFixed(0)} KB`)
      const blob = await put(`guides/${sec.guide}/section-${sec.idx}.jpg`, buf, {
        access: 'public',
        contentType: 'image/jpeg',
        addRandomSuffix: true,
      })
      state[key] = { url: blob.url, alt: altText }
      await saveState(state)
      done++
      console.log(`  ✅ ${blob.url}`)
    } catch (e: any) {
      console.error(`  ❌ ${e.message?.slice(0, 200)}`)
      fail++
    }
  }

  console.log(`\n══ SUMMARY ══`)
  console.log(`  ✅ done:    ${done}`)
  console.log(`  ⏭️  skipped: ${skip} (already in state)`)
  console.log(`  ❌ failed:  ${fail}`)
  console.log(`  state: ${STATE_PATH}`)
}
main().catch((e) => { console.error(e); process.exit(1) })
