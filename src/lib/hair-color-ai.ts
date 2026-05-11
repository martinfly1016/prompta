// Gemini Vision wrapper for 似合う髪色診断 + Gemini 2.5 Flash Image hair recolor.
//
// Two stages:
//   1. diagnoseHairColor(buf, mime) — Vision call returns 5 candidate hair
//      colors with hex + Japanese name + reason + category (safe/trend/bold).
//   2. simulateHairColor(buf, mime, hex, nameJa) — Image edit call returns
//      a PNG of the same person with only the hair color changed. R7-compliant
//      preserve clause + R5 negative + R3 output spec + R4 quality anchor.

const TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash'
// Default: gemini-3.1-flash-image-preview (a.k.a. "Nano Banana 2"),
// the sweet-spot variant — $0.067/call at 1K, ~58% gross margin per
// credit. Visual quality is on par with the $0.134 Pro tier (verified
// 2026-05-11 A/B/C test on tied-back hair) at 50% of Pro's cost.
//
// Why NB2 over Flash ($0.039) for paid tools:
//   - Old prompt + Flash = catastrophic structure drift → 1:8 conversion
//     baseline is biased by buggy result quality
//   - New TASK/STRICT INVARIANT prompt + NB2 produces pixel-faithful
//     output → quality issue removed → conversion should improve
//   - Welcome-bonus economics: 1:5 break-even is plausible post-fix
//   - Long-term: repeat purchases run at 58% margin (no welcome cost)
//
// Content production (collect / style-test-live) stays on the cheap
// Flash via GEMINI_IMAGE_MODEL — that's high-volume internal cost, not
// user-facing revenue. See memory: reference_gemini_image_models.md.
const IMAGE_MODEL =
  process.env.GEMINI_PAID_IMAGE_MODEL ||
  process.env.GEMINI_IMAGE_MODEL ||
  'gemini-3.1-flash-image-preview'
const TEXT_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent`
const IMAGE_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

const DIAGNOSE_PROMPT = `You are a professional Japanese hair colorist (ヘアカラーリスト) with deep training in personal color theory (4-season + undertone) and current Japanese hair trends.

Analyze the uploaded portrait photo and recommend exactly 5 hair colors that would suit this person.

Base your recommendations on:
- Skin undertone (warm yellow / cool pink / neutral)
- Eye color and contrast
- Current hair color (if visible)
- Overall feature contrast (hair vs skin vs eyes)
- Personal color season (spring / summer / autumn / winter)

The 5 candidates MUST cover this distribution:
- 2 "safe" colors — natural-looking choices that almost certainly suit them (e.g. dark brown, soft beige brown)
- 2 "trend" colors — currently popular Japanese salon colors that match their undertone (e.g. アッシュベージュ, ミルクティーブラウン, シアーグレージュ)
- 1 "bold" color — a more adventurous choice that would still flatter (e.g. inner color, high-saturation shade)

Output ONLY a single JSON object with this exact schema, no surrounding text or markdown:

{
  "analysis_ja": "<1-2 sentence Japanese description of skin tone / undertone / current hair / why these recommendations fit>",
  "undertone": "warm" | "cool" | "neutral",
  "season_4": "spring" | "summer" | "autumn" | "winter",
  "current_hair_ja": "<short Japanese description of the current hair color visible in the photo, e.g. 黒髪, 暗めのブラウン>",
  "candidates": [
    {
      "hex": "#XXXXXX",
      "name_ja": "<Japanese hair color name (e.g. ダークブラウン, アッシュベージュ)>",
      "name_en": "<English equivalent (e.g. Dark Brown, Ash Beige)>",
      "tone_type": "warm" | "cool" | "neutral",
      "brightness_level": <integer 1-15, where 1 = very dark black, 15 = very light blonde>,
      "reason_ja": "<1 short Japanese sentence explaining why this color suits the person>",
      "category": "safe" | "trend" | "bold"
    }
  ],
  "confidence": <0.0 to 1.0>
}

Rules:
- candidates: exactly 5 entries, in the order listed above (safe, safe, trend, trend, bold)
- All hex codes must be valid 6-digit hex AND must visually represent the actual hair color described
- name_ja must use natural Japanese hair color terminology (no romaji, no English)
- reason_ja: max 40 Japanese characters, focus on undertone match or feature complement
- confidence: honest self-rating; if photo is poorly lit / face is small / heavy filter, lower confidence
- Be deterministic; if borderline, pick the more conservative option and lower confidence
- If the photo does not clearly show a face, set confidence below 0.4 and base recommendations on visible elements`

export type Undertone = 'warm' | 'cool' | 'neutral'
export type Season4 = 'spring' | 'summer' | 'autumn' | 'winter'
export type HairCandidateCategory = 'safe' | 'trend' | 'bold'

export interface HairCandidate {
  hex: string
  nameJa: string
  nameEn: string
  toneType: Undertone
  brightnessLevel: number
  reasonJa: string
  category: HairCandidateCategory
}

export interface HairDiagnosisResult {
  analysisJa: string
  undertone: Undertone
  season4: Season4
  currentHairJa: string
  candidates: HairCandidate[]
  confidence: number
}

const HEX_RE = /^#[0-9A-F]{6}$/i

function normaliseHex(s: string): string {
  if (!s) return '#3D2914'
  let v = s.startsWith('#') ? s : '#' + s
  v = v.toUpperCase()
  return HEX_RE.test(v) ? v : '#3D2914'
}

function clampInt(v: any, min: number, max: number, fallback: number): number {
  const n = typeof v === 'number' ? Math.round(v) : parseInt(String(v ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

function normaliseUndertone(s: any): Undertone {
  return ['warm', 'cool', 'neutral'].includes(s) ? (s as Undertone) : 'neutral'
}

function normaliseSeason(s: any): Season4 {
  return ['spring', 'summer', 'autumn', 'winter'].includes(s)
    ? (s as Season4)
    : 'spring'
}

function normaliseCategory(s: any): HairCandidateCategory {
  return ['safe', 'trend', 'bold'].includes(s) ? (s as HairCandidateCategory) : 'safe'
}

export async function diagnoseHairColor(
  imageBuffer: Buffer,
  mimeType: string,
): Promise<HairDiagnosisResult> {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing GOOGLE_AI_API_KEY')

  const body = {
    contents: [
      {
        parts: [
          { text: DIAGNOSE_PROMPT },
          { inline_data: { mime_type: mimeType, data: imageBuffer.toString('base64') } },
        ],
      },
    ],
    generationConfig: {
      temperature: 0,
      topP: 0.95,
      responseMimeType: 'application/json',
    },
  }

  const res = await fetch(`${TEXT_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Gemini ${res.status}: ${txt.slice(0, 300)}`)
  }

  const json: any = await res.json()
  const text =
    json?.candidates?.[0]?.content?.parts?.find((p: any) => p?.text)?.text ?? ''
  if (!text) throw new Error('Empty response from Gemini')

  let parsed: any
  try {
    parsed = JSON.parse(text)
  } catch (e: any) {
    throw new Error(
      `Failed to parse Gemini JSON: ${e.message} | head: ${text.slice(0, 200)}`,
    )
  }

  const rawCandidates = Array.isArray(parsed.candidates) ? parsed.candidates : []
  const candidates: HairCandidate[] = rawCandidates.slice(0, 8).map((c: any) => ({
    hex: normaliseHex(String(c?.hex ?? '')),
    nameJa: String(c?.name_ja ?? '').slice(0, 30) || '未指定',
    nameEn: String(c?.name_en ?? '').slice(0, 40) || 'unknown',
    toneType: normaliseUndertone(c?.tone_type),
    brightnessLevel: clampInt(c?.brightness_level, 1, 15, 6),
    reasonJa: String(c?.reason_ja ?? '').slice(0, 120),
    category: normaliseCategory(c?.category),
  }))

  if (candidates.length < 3) {
    throw new Error('Gemini returned too few hair candidates')
  }

  return {
    analysisJa: String(parsed.analysis_ja ?? '').slice(0, 300),
    undertone: normaliseUndertone(parsed.undertone),
    season4: normaliseSeason(parsed.season_4),
    currentHairJa: String(parsed.current_hair_ja ?? '').slice(0, 60),
    candidates,
    confidence:
      typeof parsed.confidence === 'number'
        ? Math.max(0, Math.min(1, parsed.confidence))
        : 0.5,
  }
}

// Build the recolor prompt — principled, NOT enumerated. We don't list
// hairstyles (infinite); we state the invariant: every non-hair pixel
// AND the hair-silhouette outline must be byte-identical to source.
// Only hair-pixel COLOR may change. Treat as color-only inpainting.
function buildRecolorPrompt(hex: string, nameJa: string, nameEn: string): string {
  return `TASK
Recolor the hair to ${hex} (${nameEn} / ${nameJa}).

STRICT INVARIANT
- The hairstyle must NOT change in any way — same length, same shape, same arrangement, same partition, same bangs, same bound/loose state, same individual strand placement.
- Every non-hair pixel must be IDENTICAL to the source (face, skin, eyes, brows, lips, ears, neck, shoulders, clothing, background).
- The hair-silhouette outline — where hair meets skin / background / clothing — must be IDENTICAL to the source, pixel-for-pixel.
- ONLY the COLOR of hair pixels may change. No new hair pixels, no removed hair pixels.

Treat this as a color-only inpainting operation: do not regenerate, reshape, lengthen, shorten, loosen, tighten, or add to any hair. If the source has tightly bound hair with no loose strands near the face, the output must show the same. If the source has flowing hair, keep the same flow. Output the same composition with only hair color modified.

Photorealistic. Original resolution.`
}

export interface HairSimulationResult {
  imageBase64: string
  mimeType: 'image/png'
  promptUsed: string
}

export async function simulateHairColor(
  imageBuffer: Buffer,
  mimeType: string,
  hex: string,
  nameJa: string,
  nameEn: string,
): Promise<HairSimulationResult> {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing GOOGLE_AI_API_KEY')

  const prompt = buildRecolorPrompt(hex, nameJa, nameEn)

  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          { inline_data: { mime_type: mimeType, data: imageBuffer.toString('base64') } },
        ],
      },
    ],
    generationConfig: { responseModalities: ['IMAGE'] },
  }

  const res = await fetch(`${IMAGE_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Gemini Image ${res.status}: ${txt.slice(0, 300)}`)
  }

  const json: any = await res.json()
  const parts = json?.candidates?.[0]?.content?.parts ?? []
  const imgPart = parts.find(
    (p: any) => p?.inline_data?.data || p?.inlineData?.data,
  )
  const b64: string | undefined =
    imgPart?.inline_data?.data ?? imgPart?.inlineData?.data
  if (!b64) {
    const textPart = parts.find((p: any) => p?.text)?.text ?? ''
    throw new Error(`No image returned from Gemini. Text: ${textPart.slice(0, 200)}`)
  }

  return {
    imageBase64: b64,
    mimeType: 'image/png',
    promptUsed: prompt,
  }
}
