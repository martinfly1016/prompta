import type { ImageProvider, ProviderCallOpts, ProviderResult } from './types'
import { POINTS_PER_RUN } from '@/lib/credit-costs'

/**
 * Fast everyday model. Precise-editing alternative is `gpt-image-2.5-sunburst`
 * (set OPENAI_IMAGE_MODEL or OPENAI_IMAGE_EDIT_MODEL).
 * `gpt-image-1` was shut down on 2026-10-23.
 * https://developers.openai.com/api/docs/guides/image-generation
 */
export const DEFAULT_OPENAI_IMAGE_MODEL = 'gpt-image-2.5-flare'

/**
 * Official calculator, 1024×1024 medium output (~439 tokens × $30/1M) plus a
 * short prompt. High / xhigh / max are not sent: see gptImageQuality().
 */
export const OPENAI_IMAGE_COST_USD = 0.014

const GENERATIONS_ENDPOINT = 'https://api.openai.com/v1/images/generations'
const EDITS_ENDPOINT = 'https://api.openai.com/v1/images/edits'

export function resolveOpenAIImageModel(): string {
  return (process.env.OPENAI_IMAGE_MODEL || DEFAULT_OPENAI_IMAGE_MODEL).trim()
}

export function resolveOpenAIEditModel(): string {
  return (process.env.OPENAI_IMAGE_EDIT_MODEL || resolveOpenAIImageModel()).trim()
}

// Flare bills much more at high / xhigh / max. Production stays on medium
// (or low) so a 1-credit run does not jump to the ~$0.05–$0.21 tiers.
export function gptImageQuality(): 'low' | 'medium' {
  const raw = (process.env.OPENAI_IMAGE_QUALITY || 'medium').trim().toLowerCase()
  return raw === 'low' ? 'low' : 'medium'
}

function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY || process.env.chatgpt_api_key
  if (!key) throw new Error('Missing OPENAI_API_KEY')
  return key
}

function mapAspect(ar: ProviderCallOpts['aspectRatio']): string {
  switch (ar) {
    case '3:4':
    case '9:16':
      return '1024x1536'
    case '4:3':
    case '16:9':
      return '1536x1024'
    case '1:1':
    default:
      return '1024x1024'
  }
}

function extensionFor(mimeType: string): string {
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'jpg'
  if (mimeType.includes('webp')) return 'webp'
  return 'png'
}

interface InlineImage {
  base64: string
  mimeType: string
}

function referencePhotos(opts: ProviderCallOpts): InlineImage[] {
  return [
    ...(opts.sourceImage ? [opts.sourceImage] : []),
    ...(opts.referenceImages ?? []),
  ].filter((image) => image?.base64)
}

function rawBase64(data: string): string {
  const marker = 'base64,'
  const idx = data.indexOf(marker)
  return idx >= 0 ? data.slice(idx + marker.length) : data
}

async function readImagePayload(json: {
  data?: Array<{ b64_json?: string; url?: string }>
}): Promise<ProviderResult> {
  const data = json?.data?.[0]
  if (data?.b64_json) {
    return { image: { base64: data.b64_json, mimeType: 'image/png' } }
  }
  if (data?.url) {
    const imgRes = await fetch(data.url)
    if (!imgRes.ok) throw new Error(`OpenAI fetch image URL ${imgRes.status}`)
    const buf = Buffer.from(await imgRes.arrayBuffer())
    return { image: { base64: buf.toString('base64'), mimeType: 'image/png' } }
  }
  throw new Error('OpenAI returned no image data')
}

async function generate(opts: ProviderCallOpts): Promise<ProviderResult> {
  const res = await fetch(GENERATIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: resolveOpenAIImageModel(),
      prompt: opts.prompt,
      size: mapAspect(opts.aspectRatio),
      quality: gptImageQuality(),
      n: 1,
    }),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`OpenAI Image ${res.status}: ${txt.slice(0, 300)}`)
  }
  return readImagePayload(await res.json())
}

async function edit(opts: ProviderCallOpts, images: InlineImage[]): Promise<ProviderResult> {
  const form = new FormData()
  form.append('model', resolveOpenAIEditModel())
  form.append('prompt', opts.prompt)
  form.append('size', mapAspect(opts.aspectRatio))
  form.append('quality', gptImageQuality())
  form.append('n', '1')
  images.forEach((image, index) => {
    const mimeType = image.mimeType || 'image/png'
    const bytes = Buffer.from(rawBase64(image.base64), 'base64')
    const blob = new Blob([bytes], { type: mimeType })
    form.append('image[]', blob, `reference-${index}.${extensionFor(mimeType)}`)
  })

  const res = await fetch(EDITS_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getApiKey()}` },
    body: form,
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`OpenAI Image ${res.status}: ${txt.slice(0, 300)}`)
  }
  return readImagePayload(await res.json())
}

async function call(opts: ProviderCallOpts): Promise<ProviderResult> {
  const images = referencePhotos(opts)
  if (images.length > 0) return edit(opts, images)
  return generate(opts)
}

export const provider: ImageProvider = {
  id: 'openai-image',
  label: 'ChatGPT (GPT Image)',
  icon: '💬',
  iconUrl: 'https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64',
  modes: ['image-gen', 'image-edit'],
  credits: POINTS_PER_RUN,
  costUsd: OPENAI_IMAGE_COST_USD,
  call,
}
