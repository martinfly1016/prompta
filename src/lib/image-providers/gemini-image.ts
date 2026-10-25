import type { ImageProvider, ProviderCallOpts, ProviderResult } from './types'
import { POINTS_PER_RUN } from '@/lib/credit-costs'

/**
 * Efficient default for paid 1-credit generations.
 * Docs (2026-10): https://ai.google.dev/gemini-api/docs/image-generation
 * `gemini-3.1-flash-image` and `gemini-2.5-flash-image` are legacy;
 * `gemini-3-pro-image` is the premium tier (~4x the 1K price).
 */
export const DEFAULT_GEMINI_IMAGE_MODEL = 'gemini-nano-banana-2.1'

/** Standard 1K output. 1120 image tokens × $30 / 1M. */
export const GEMINI_IMAGE_COST_USD = 0.034

const INTERACTIONS_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/interactions'

/**
 * Models this codebase historically called via generateContent.
 * Preview ids were shut down 2026-06-25; 2.5 Flash Image remains on
 * generateContent for rollback. Current Nano Banana models, including
 * the default, are Interactions-only (generateContent is not in their docs).
 */
const GENERATE_CONTENT_MODELS = new Set([
  'gemini-2.5-flash-image',
  'gemini-2.5-flash-image-preview',
  'gemini-2.0-flash-exp-image-generation',
  'gemini-2.0-flash-preview-image-generation',
  'gemini-3.1-flash-image-preview',
  'gemini-3-pro-image-preview',
])

// Nano Banana 2.1 accepts 1K, 2K, and 4K. 512px (0.5K) is Gemini 3.1 Flash
// Image only and is rejected on 2.1. Lowercase "1k" is also rejected.
const IMAGE_SIZES = new Set(['1K', '2K', '4K'])

export type GeminiImageTransport = 'interactions' | 'generateContent'

export function resolveGeminiImageModel(): string {
  return (
    process.env.GEMINI_PAID_IMAGE_MODEL ||
    process.env.GEMINI_IMAGE_MODEL ||
    DEFAULT_GEMINI_IMAGE_MODEL
  ).trim()
}

export function geminiImageTransport(model = resolveGeminiImageModel()): GeminiImageTransport {
  return GENERATE_CONTENT_MODELS.has(model) ? 'generateContent' : 'interactions'
}

function apiKey(): string {
  const key = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!key) throw new Error('Missing GOOGLE_AI_API_KEY')
  return key
}

function rawBase64(data: string): string {
  const marker = 'base64,'
  const idx = data.indexOf(marker)
  return idx >= 0 ? data.slice(idx + marker.length) : data
}

export interface GeminiInlineImage {
  base64: string
  mimeType: string
}

function listedImages(opts: ProviderCallOpts): GeminiInlineImage[] {
  const images = [
    ...(opts.sourceImage ? [opts.sourceImage] : []),
    ...(opts.referenceImages ?? []),
  ]
  return images
    .filter((image) => image?.base64)
    .map((image) => ({
      base64: rawBase64(image.base64),
      mimeType: image.mimeType || 'image/png',
    }))
}

function textToImageSize(): string {
  const raw = (process.env.GEMINI_IMAGE_SIZE || '1K').trim()
  if (!IMAGE_SIZES.has(raw)) {
    throw new Error(`GEMINI_IMAGE_SIZE must be one of ${[...IMAGE_SIZES].join(', ')}`)
  }
  return raw
}

interface ImageBlock {
  data?: string
  uri?: string
  mime_type?: string
  mimeType?: string
}

function imageData(block: ImageBlock & { inline_data?: { data?: string; mime_type?: string }; inlineData?: { data?: string; mimeType?: string } }): string | undefined {
  return block.data || block.inline_data?.data || block.inlineData?.data
}

export function extractInteractionImage(json: unknown): ImageBlock | null {
  if (!json || typeof json !== 'object') return null
  const body = json as {
    output_image?: ImageBlock
    steps?: Array<{ content?: unknown }>
  }
  const blocks: ImageBlock[] = []
  const push = (block: ImageBlock & { inline_data?: { data?: string; mime_type?: string }; inlineData?: { data?: string; mimeType?: string } }) => {
    const data = imageData(block)
    if (!data && !block.uri) return
    blocks.push({
      data,
      uri: block.uri,
      mime_type: block.mime_type || block.inline_data?.mime_type || block.mimeType || block.inlineData?.mimeType,
    })
  }
  if (body.output_image) push(body.output_image)
  for (const step of body.steps ?? []) {
    if (!Array.isArray(step?.content)) continue
    for (const block of step.content) {
      if (!block || typeof block !== 'object') continue
      const image = block as ImageBlock & { type?: string }
      if (image.type === 'image') push(image)
    }
  }
  return blocks.length > 0 ? blocks[blocks.length - 1] : null
}

const LOG_LIMIT = 500

/** Redacts long base64 blobs so an unexpected body can be logged safely. */
export function summarizeGeminiPayload(json: unknown): string {
  let text: string
  try {
    text = JSON.stringify(json, (key, value) => {
      if (typeof value === 'string' && value.length > 80 && (key === 'data' || key === 'uri')) {
        return `${value.slice(0, 16)}…(${value.length} chars)`
      }
      if (typeof value === 'string' && value.length > 240) {
        return `${value.slice(0, 80)}…(${value.length} chars)`
      }
      return value
    }) ?? 'null'
  } catch {
    text = String(json)
  }
  return text.length > LOG_LIMIT ? `${text.slice(0, LOG_LIMIT)}…` : text
}

function allowedImageUri(uri: string): boolean {
  try {
    const url = new URL(uri)
    return (
      url.protocol === 'https:' &&
      (url.hostname === 'generativelanguage.googleapis.com' ||
        url.hostname.endsWith('.googleapis.com') ||
        url.hostname.endsWith('.googleusercontent.com'))
    )
  } catch {
    return false
  }
}

async function imageFromBlock(block: ImageBlock): Promise<ProviderResult> {
  const mimeType = block.mime_type || block.mimeType || 'image/png'
  if (block.data) {
    return { image: { base64: rawBase64(block.data), mimeType } }
  }
  if (block.uri && allowedImageUri(block.uri)) {
    const res = await fetch(block.uri)
    if (!res.ok) throw new Error(`Gemini image URI ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const fetchedType = res.headers.get('content-type')?.split(';')[0] || mimeType
    return { image: { base64: buf.toString('base64'), mimeType: fetchedType } }
  }
  throw new Error('Gemini returned an image block without inline data')
}

async function callInteractions(opts: ProviderCallOpts, model: string): Promise<ProviderResult> {
  const images = listedImages(opts)
  const input: Array<Record<string, string>> = [{ type: 'text', text: opts.prompt }]
  for (const image of images) {
    input.push({ type: 'image', data: image.base64, mime_type: image.mimeType })
  }

  // Docs: response_format is { type, aspect_ratio?, image_size? }. Do not send
  // `delivery` — the API returns 400 "Image delivery mode is not supported"
  // for both "inline" and "uri". Bytes come back inline by default.
  // Edits omit image_size / aspect_ratio unless the caller asked for one,
  // so the model keeps the source photo's framing.
  const responseFormat: Record<string, string> = { type: 'image' }
  if (opts.aspectRatio) responseFormat.aspect_ratio = opts.aspectRatio
  if (images.length === 0) responseFormat.image_size = textToImageSize()

  const res = await fetch(INTERACTIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey(),
    },
    body: JSON.stringify({
      model,
      input,
      // User photos must not be retained in the 55-day interaction log.
      store: false,
      response_format: responseFormat,
    }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Gemini Image ${res.status}: ${txt.slice(0, 300)}`)
  }

  const json = await res.json()
  const status = typeof json?.status === 'string' ? json.status : ''
  if (status === 'failed') {
    const message = json?.error?.message || json?.error || 'interaction failed'
    throw new Error(`Gemini Image failed: ${String(message).slice(0, 300)}`)
  }
  const block = extractInteractionImage(json)
  if (!block) {
    const summary = summarizeGeminiPayload(json)
    console.error('[gemini-image] unexpected interaction response', summary)
    throw new Error(`Gemini returned no image. Status: ${status || 'unknown'}. Body: ${summary}`)
  }
  return imageFromBlock(block)
}

async function callGenerateContent(opts: ProviderCallOpts, model: string): Promise<ProviderResult> {
  const parts: Array<Record<string, unknown>> = [{ text: opts.prompt }]
  for (const image of listedImages(opts)) {
    parts.push({ inline_data: { mime_type: image.mimeType, data: image.base64 } })
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  const res = await fetch(`${endpoint}?key=${apiKey()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Gemini Image ${res.status}: ${txt.slice(0, 300)}`)
  }

  const json = await res.json()
  const respParts = json?.candidates?.[0]?.content?.parts ?? []
  const imgPart = respParts.find(
    (part: { inline_data?: { data?: string }; inlineData?: { data?: string } }) =>
      part?.inline_data?.data || part?.inlineData?.data,
  )
  const b64: string | undefined = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data
  if (!b64) {
    const textPart = respParts.find((part: { text?: string }) => part?.text)?.text ?? ''
    throw new Error(`Gemini returned no image. Text: ${String(textPart).slice(0, 200)}`)
  }
  return { image: { base64: b64, mimeType: 'image/png' } }
}

export async function generateGeminiImage(opts: ProviderCallOpts): Promise<ProviderResult> {
  const model = resolveGeminiImageModel()
  if (geminiImageTransport(model) === 'generateContent') {
    return callGenerateContent(opts, model)
  }
  return callInteractions(opts, model)
}

export const provider: ImageProvider = {
  id: 'gemini-image',
  label: 'Gemini (Nano Banana 2.1)',
  icon: '✨',
  iconUrl: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64',
  modes: ['image-gen', 'image-edit'],
  credits: POINTS_PER_RUN,
  costUsd: GEMINI_IMAGE_COST_USD,
  call: generateGeminiImage,
}
