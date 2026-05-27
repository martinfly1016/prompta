/**
 * Provider registry. Auto-discovers all registered providers and exposes
 * helpers to:
 *  - List providers for a given mode (text / image-gen / image-edit)
 *  - Recommend a default provider for a given prompt (by category + tool)
 *  - Look up provider by id
 *
 * To add a new provider: drop the file in this directory and add to PROVIDERS.
 */

import { provider as geminiImage } from './gemini-image'
import { provider as openaiImage } from './openai-image'
import { provider as geminiText } from './gemini-text'
import { provider as falSdxl } from './fal-sdxl'
import type { ExecuteMode, ImageProvider, ProviderId } from './types'

export const PROVIDERS: ImageProvider[] = [
  geminiImage,
  openaiImage,
  falSdxl,
  geminiText,
]

const BY_ID = Object.fromEntries(PROVIDERS.map((p) => [p.id, p])) as Record<ProviderId, ImageProvider>

export function getProvider(id: ProviderId): ImageProvider | null {
  return BY_ID[id] ?? null
}

export function listProvidersForMode(mode: ExecuteMode): ImageProvider[] {
  return PROVIDERS.filter((p) => p.modes.includes(mode))
}

/**
 * Inspect a prompt's category + tool slug and return the recommended
 * execute mode + default provider. Used by <PromptExecutor> to seed the
 * UI before the user picks anything.
 */
export function recommendForPrompt(args: {
  categorySlug: string | null | undefined
  toolSlug: string | null | undefined
}): { mode: ExecuteMode; defaultProviderId: ProviderId } {
  const { categorySlug, toolSlug } = args
  // photo-edit category → image-edit (requires source upload)
  if (categorySlug === 'photo-edit') {
    return { mode: 'image-edit', defaultProviderId: 'gemini-image' }
  }
  // text-prompt categories → text generation
  const TEXT_CATEGORIES = new Set([
    'writing',
    'programming',
    'business',
    'education',
  ])
  const TEXT_TOOLS = new Set(['chatgpt', 'claude'])
  if (
    (categorySlug && TEXT_CATEGORIES.has(categorySlug)) ||
    (toolSlug && TEXT_TOOLS.has(toolSlug))
  ) {
    return { mode: 'text', defaultProviderId: 'gemini-text' }
  }
  // SD-tagged prompts default to fal-sdxl — most SD prompts in the DB are
  // tag-style (comma-delimited keywords + weight syntax) which SDXL handles
  // natively, whereas Gemini Nano Banana treats them as natural-language
  // descriptions.
  if (toolSlug === 'stable-diffusion') {
    return { mode: 'image-gen', defaultProviderId: 'fal-sdxl' }
  }
  // Default: image generation (hairstyle, clothing, anime, creative, etc.)
  return { mode: 'image-gen', defaultProviderId: 'gemini-image' }
}

/**
 * Anti-bias keyword patterns that fast-sdxl reliably fails on, regardless
 * of negative_prompt / cfg_scale / weighting. These signal compositions
 * that contradict the model's training distribution (reverse pairings,
 * extreme contrast, strict character count, opposite-of-stereotype body
 * types). Empirically validated against the 2026-05-27 体格差カップル
 * batch where fast-sdxl scored 1/6 on first pass and 2/3 on retry, while
 * gpt-image-1 scored 3/3 on the same hard subset.
 *
 * Detection is intentionally permissive (any single hit triggers): the
 * 8x cost of gpt-image-1 over fast-sdxl ($0.04 vs $0.005) is far smaller
 * than the cost of shipping a wrong image + unpublish + retry cycle.
 */
const ANTI_BIAS_PATTERNS: RegExp[] = [
  // reverse-pairing keywords (height/body inversion of stereotype)
  /\breverse\s+(?:height|body|size)\b/i,
  /\b(?:woman|female)\s+taller\s+than\s+(?:man|male)\b/i,
  /\btaller\s+(?:woman|female)\b.*\b(?:shorter|smaller|petite)\s+(?:man|male)\b/i,
  // extreme female muscular dominance
  /\bfemale\s+bodybuilder\b/i,
  /\b(?:extremely\s+)?muscular\s+wom[ae]n\b/i,
  /\bwoman\s+(?:much\s+)?more\s+muscular\s+than\s+(?:man|male)\b/i,
  // strict count + dramatic body contrast (where SDXL drifts toward similar bodies)
  /\b2girls\b.*\b(?:curvy|hourglass|voluptuous)\b.*\b(?:petite|flat|slim|delicate)\b/i,
  /\b(?:dramatic|extreme)\s+(?:body|muscle)\s+(?:size|mass)\s+(?:difference|contrast)\b/i,
  // explicit "female dominance" semantic
  /\bfemale\s+dominance\b/i,
]

export interface PickImageProviderOpts {
  /** The English prompt text being submitted to the image model. */
  promptText: string
  /** Force a specific provider (skips heuristics). For testing / one-offs. */
  override?: ProviderId
}

/**
 * Pick the best image provider for a given prompt at batch-generation
 * time. Returns `fal-sdxl` for in-distribution prompts (cheap, fast) and
 * escalates to `openai-image` (gpt-image-1) when anti-bias keywords are
 * detected.
 *
 * Use this in `src/scripts/collect/_<batch>_*.ts` instead of hard-coding
 * `FAL_ENDPOINT`. The 8x cost premium for the small fraction of
 * anti-bias prompts is well worth the brief-match accuracy.
 *
 * @example
 *   const { providerId, reason } = pickImageProvider({ promptText: p.content })
 *   const buf = providerId === 'openai-image'
 *     ? await callGptImage(p.naturalDescription)
 *     : await callFalSdxl(p.content)
 */
export function pickImageProvider(opts: PickImageProviderOpts): {
  providerId: ProviderId
  reason: string
} {
  if (opts.override) {
    return { providerId: opts.override, reason: `override=${opts.override}` }
  }
  const hits: string[] = []
  for (const re of ANTI_BIAS_PATTERNS) {
    const m = opts.promptText.match(re)
    if (m) hits.push(m[0])
  }
  if (hits.length > 0) {
    return {
      providerId: 'openai-image',
      reason: `anti-bias hits: ${hits.slice(0, 3).map((h) => JSON.stringify(h)).join(', ')}`,
    }
  }
  return { providerId: 'fal-sdxl', reason: 'in-distribution, default' }
}
