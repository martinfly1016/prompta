/**
 * Batch-generate coloring book pages via Gemini 2.5/3.1 Flash Image.
 *
 * Each entry produces a single PNG saved to /tmp/gen-coloring-{slug}.png
 * Optimized strict prompt template ensures pure white bg + outline-only
 * (no grayscale, no black fills, no shading).
 *
 * Usage: npx tsx src/scripts/_gen_coloring_batch.ts
 */

import { writeFileSync } from 'node:fs'

const IMAGE_MODEL =
  process.env.GEMINI_PAID_IMAGE_MODEL ||
  process.env.GEMINI_IMAGE_MODEL ||
  'gemini-3.1-flash-image-preview'

const IMAGE_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

type Spec = {
  slug: string
  audience: 'adults' | 'children' | 'seniors'
  level: 'intricate' | 'moderate' | 'extra-thick-simple'
  subject: string
  /** Used to bias composition: portrait, square */
  composition: 'square' | 'portrait'
  /** Japanese label for log only */
  jaTitle: string
}

const SPECS: Spec[] = [
  {
    slug: 'adults-mandala-floral',
    jaTitle: '大人向けマンダラ花柄塗り絵',
    audience: 'adults',
    level: 'intricate',
    composition: 'square',
    subject:
      'A symmetrical botanical mandala centered on the canvas. Concentric layers of roses, peony petals, leaves, and small buds radiating from a central blossom. Intricate but every shape clearly readable.',
  },
  {
    slug: 'adults-rose-bouquet',
    jaTitle: '大人向けバラの花束塗り絵',
    audience: 'adults',
    level: 'intricate',
    composition: 'portrait',
    subject:
      'A vintage botanical illustration of a rose bouquet tied with a ribbon. Roses in full bloom and partial bloom, leaves with visible veins, baby breath flowers scattered around. Centered composition with clear margin around the bouquet.',
  },
  {
    slug: 'adults-cherry-blossom-zen',
    jaTitle: '大人向け桜と禅庭塗り絵',
    audience: 'adults',
    level: 'moderate',
    composition: 'portrait',
    subject:
      'A traditional Japanese zen scene: a single cherry blossom branch arching across the canvas, several five-petal sakura flowers in full bloom, a few falling petals, and stylized cloud outlines in the background. Minimal and elegant.',
  },
  {
    slug: 'kids-cute-dinosaur',
    jaTitle: '子供向けかわいい恐竜塗り絵',
    audience: 'children',
    level: 'extra-thick-simple',
    composition: 'square',
    subject:
      'A friendly cute cartoon dinosaur (Stegosaurus or Brontosaurus) with a big smile, big round eyes drawn as simple outlined circles, standing in a simple jungle scene with two palm trees and a few outlined ferns. Cheerful and child-friendly.',
  },
  {
    slug: 'kids-sea-animals',
    jaTitle: '子供向け海の生き物塗り絵',
    audience: 'children',
    level: 'extra-thick-simple',
    composition: 'square',
    subject:
      'A cute group of sea animals arranged on a single canvas: one smiling fish, one octopus with curly tentacles, one sea turtle with a patterned shell, one starfish. All drawn with simple thick outlines, big friendly eyes (outlined circles, NEVER filled black). Simple wavy water lines below.',
  },
  {
    slug: 'seniors-large-flowers',
    jaTitle: '高齢者向け大きな花塗り絵',
    audience: 'seniors',
    level: 'extra-thick-simple',
    composition: 'portrait',
    subject:
      'Three large simple flowers arranged side by side: a sunflower (left), a tulip (center), a daisy (right). Each flower drawn with VERY thick clear outlines and minimal internal detail. Stems and a few leaves below. Designed for easy coloring by users with limited fine motor control.',
  },
]

function buildPrompt(s: Spec): string {
  const lineWeight =
    s.level === 'intricate'
      ? 'medium consistent line weight (~2px equivalent), fine where needed for petals/leaves'
      : s.level === 'moderate'
        ? 'medium-thick consistent line weight (~3px equivalent)'
        : 'EXTRA-THICK consistent line weight (~4-5px equivalent), prioritizing simplicity over detail'

  const aspectHint =
    s.composition === 'portrait'
      ? 'Aspect ratio: portrait (taller than wide), suitable for A4 printing.'
      : 'Aspect ratio: square (1:1), suitable for a coloring book page.'

  return `TASK: Generate ONE coloring book page in pure black-and-white line art style, INSTANTLY printable.

SUBJECT: ${s.subject}

TARGET AUDIENCE: ${s.audience}
LINE WEIGHT: ${lineWeight}
${aspectHint}

ABSOLUTE REQUIREMENTS (ALL must be satisfied — no exceptions):
1. PURE 100% WHITE background. No clouds, no halftone dots, no texture, no fill, no shading, no gradient anywhere on the background.
2. ONLY pure black outline strokes. No grayscale tones whatsoever.
3. EVERY shape defined by OUTLINE ONLY. Eyes, pupils, noses, mouths, leaves, petals — ALL must be open outlined shapes with WHITE interiors.
4. Consistent ${lineWeight} throughout the whole illustration.
5. The entire subject must fit within the canvas with comfortable margin — DO NOT crop the illustration at the edges.
6. ${aspectHint}
7. Result must be IMMEDIATELY usable as a coloring book page — a child with crayons should have clear, well-defined regions to color in.

ABSOLUTELY FORBIDDEN (output will be rejected if any of these appear):
- ANY gray tone (light gray, dark gray, halftone, dot pattern)
- ANY filled black region — eyes/pupils/noses must be OUTLINE CIRCLES, never filled. Shadows must NOT exist.
- Realistic shading, depth cues, gradients
- Photographic elements, 3D rendering, lighting effects
- Colors of any kind
- Text, watermarks, signatures, logos
- Cluttered overlap that makes individual shapes unreadable

EDGE CASES (handle correctly):
- Animal eyes: draw as two outlined concentric circles (outer eye + outlined pupil), never filled black.
- Animal noses: draw as an outlined triangle or oval, never filled.
- Flower centers: outlined small circle with optional radiating outlined dots, NEVER a solid black dot.
- Backgrounds that "should be dark" (night sky, ocean depth): IGNORE the realism — keep the background pure white.
- If unsure between adding detail or simplifying, ALWAYS simplify.

QUALITY CHECK before you output:
- Is every region either WHITE or a thin BLACK LINE? If yes, output. If any region is filled black or has gray, REDRAW from scratch.

Output ONE image only.`
}

async function generateOne(spec: Spec, apiKey: string): Promise<void> {
  const prompt = buildPrompt(spec)
  console.log(`\n[${spec.slug}] ${spec.jaTitle}`)
  console.log(`  Audience: ${spec.audience} | Level: ${spec.level} | Composition: ${spec.composition}`)
  console.log(`  Prompt length: ${prompt.length} chars`)

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  }

  const t0 = Date.now()
  const res = await fetch(`${IMAGE_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const txt = await res.text()
    console.error(`  FAIL ${res.status}: ${txt.slice(0, 300)}`)
    return
  }

  const json: any = await res.json()
  const parts = json?.candidates?.[0]?.content?.parts ?? []
  const imgPart = parts.find((p: any) => p?.inline_data?.data || p?.inlineData?.data)
  const b64: string | undefined = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data

  if (!b64) {
    const textPart = parts.find((p: any) => p?.text)?.text ?? ''
    console.error(`  NO IMAGE returned. Text response: ${textPart.slice(0, 200)}`)
    return
  }

  const buf = Buffer.from(b64, 'base64')
  const out = `/tmp/gen-coloring-${spec.slug}.png`
  writeFileSync(out, buf)
  console.log(`  OK ${(Date.now() - t0) / 1000}s -> ${out} (${(buf.length / 1024).toFixed(0)} KB)`)
}

;(async () => {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing GOOGLE_AI_API_KEY')

  console.log(`Model: ${IMAGE_MODEL}`)
  console.log(`Batch size: ${SPECS.length}`)

  for (const spec of SPECS) {
    try {
      await generateOne(spec, apiKey)
    } catch (e: any) {
      console.error(`  ERR: ${e.message}`)
    }
  }

  console.log('\nAll done. Check /tmp/gen-coloring-*.png')
})().catch((e) => {
  console.error('FATAL', e.message)
  process.exit(1)
})
