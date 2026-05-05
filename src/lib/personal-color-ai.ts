// Gemini Vision wrapper for パーソナルカラー診断.
// Returns structured JSON validated against AnalysisResult shape.
//
// Day-0 feasibility (2026-05-05):
//  - 4-season + undertone: 5/5 stable across 3 reruns
//  - 12-type: occasionally drifts between adjacent types (acceptable)
//  - JSON schema: 15/15 valid with responseMimeType=application/json + temp=0
//  - Latency: 15-23s per call
//  - Cost: ~$0.005 per call

const MODEL = process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const ANALYSIS_PROMPT = `You are a professional Japanese personal color analyst (パーソナルカラリスト) trained in the 4-season + 12-type system used in Japan and Korea.

Analyze the uploaded portrait photo and classify the person into one of the 12 types based on:
- Skin undertone (warm yellow / cool pink / neutral)
- Hair color depth and tone
- Eye color and contrast
- Overall feature contrast level (the contrast between hair, skin, and eyes)

The 12 types are:
- Spring (warm + bright): spring-warm-bright, spring-warm-light, spring-warm-vivid
- Summer (cool + soft): summer-cool-light, summer-cool-soft, summer-cool-mute
- Autumn (warm + deep): autumn-warm-deep, autumn-warm-mute, autumn-warm-strong
- Winter (cool + clear): winter-cool-clear, winter-cool-deep, winter-cool-bright

Output ONLY a single JSON object with this exact schema, no surrounding text or markdown:

{
  "season_12": "<one of the 12 types above>",
  "season_4": "spring" | "summer" | "autumn" | "winter",
  "undertone": "warm" | "cool" | "neutral",
  "contrast": "high" | "medium" | "low",
  "skin_features_ja": "<1-2 sentence Japanese description of skin tone, hair, and eyes>",
  "recommended_colors": [
    { "hex": "#XXXXXX", "name_ja": "<Japanese color name>", "role": "clothing" | "lipstick" | "hair" | "accessory" }
  ],
  "avoid_colors": [
    { "hex": "#XXXXXX", "reason_ja": "<short Japanese reason>" }
  ],
  "confidence": <0.0 to 1.0>
}

Rules:
- recommended_colors: exactly 12 entries, 3 each for the 4 roles (clothing / lipstick / hair / accessory)
- avoid_colors: exactly 3 entries
- All hex codes must be valid 6-digit hex
- confidence is your honest self-rating of how clearly the photo allows classification (lighting, angle, makeup absence)
- Be deterministic: do not introduce randomness; if the photo is borderline, pick the more likely type and lower confidence
- If the photo does not clearly show a human face, set confidence below 0.4 and base recommendations on best-guess from visible elements`

export type Season4 = 'spring' | 'summer' | 'autumn' | 'winter'
export type Undertone = 'warm' | 'cool' | 'neutral'
export type Contrast = 'high' | 'medium' | 'low'
export type ColorRole = 'clothing' | 'lipstick' | 'hair' | 'accessory'

export interface RecommendedColor {
  hex: string
  nameJa: string
  role: ColorRole
}
export interface AvoidColor {
  hex: string
  reasonJa: string
}
export interface AnalysisResult {
  season12: string
  season4: Season4
  undertone: Undertone
  contrast: Contrast
  skinFeaturesJa: string
  recommendedColors: RecommendedColor[]
  avoidColors: AvoidColor[]
  confidence: number
}

const HEX_RE = /^#[0-9A-F]{6}$/i

function normaliseRole(s: string): ColorRole {
  const t = (s || '').toLowerCase()
  if (t.startsWith('lip')) return 'lipstick'
  if (t.startsWith('hair')) return 'hair'
  if (t.startsWith('access')) return 'accessory'
  return 'clothing'
}

function normaliseHex(s: string): string {
  if (!s) return '#000000'
  let v = s.startsWith('#') ? s : '#' + s
  v = v.toUpperCase()
  return HEX_RE.test(v) ? v : '#000000'
}

export async function analyzePersonalColor(
  imageBuffer: Buffer,
  mimeType: string,
): Promise<AnalysisResult> {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing GOOGLE_AI_API_KEY')

  const body = {
    contents: [
      {
        parts: [
          { text: ANALYSIS_PROMPT },
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

  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
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
    throw new Error(`Failed to parse Gemini JSON: ${e.message} | head: ${text.slice(0, 200)}`)
  }

  const recommended = Array.isArray(parsed.recommended_colors)
    ? parsed.recommended_colors.slice(0, 16).map((c: any) => ({
        hex: normaliseHex(String(c?.hex ?? '')),
        nameJa: String(c?.name_ja ?? '').slice(0, 30),
        role: normaliseRole(String(c?.role ?? '')),
      }))
    : []
  const avoid = Array.isArray(parsed.avoid_colors)
    ? parsed.avoid_colors.slice(0, 5).map((c: any) => ({
        hex: normaliseHex(String(c?.hex ?? '')),
        reasonJa: String(c?.reason_ja ?? '').slice(0, 100),
      }))
    : []

  if (recommended.length < 4) {
    throw new Error('Gemini returned too few recommended colors')
  }

  return {
    season12: String(parsed.season_12 ?? 'spring-warm-bright'),
    season4: ['spring', 'summer', 'autumn', 'winter'].includes(parsed.season_4)
      ? parsed.season_4
      : ('spring' as Season4),
    undertone: ['warm', 'cool', 'neutral'].includes(parsed.undertone)
      ? parsed.undertone
      : ('neutral' as Undertone),
    contrast: ['high', 'medium', 'low'].includes(parsed.contrast)
      ? parsed.contrast
      : ('medium' as Contrast),
    skinFeaturesJa: String(parsed.skin_features_ja ?? '').slice(0, 300),
    recommendedColors: recommended,
    avoidColors: avoid,
    confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.5,
  }
}
