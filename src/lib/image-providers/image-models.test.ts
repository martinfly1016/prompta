import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import { simulateHairColor } from '../hair-color-ai'
import {
  DEFAULT_GEMINI_IMAGE_MODEL,
  extractInteractionImage,
  geminiImageTransport,
  generateGeminiImage,
  resolveGeminiImageModel,
  summarizeGeminiPayload,
} from './gemini-image'
import {
  DEFAULT_OPENAI_IMAGE_MODEL,
  gptImageQuality,
  provider as openaiProvider,
  resolveOpenAIEditModel,
  resolveOpenAIImageModel,
} from './openai-image'

const TINY_PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

type FetchCall = { url: string; init: RequestInit }

const originalFetch = globalThis.fetch
let calls: FetchCall[]

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

beforeEach(() => {
  calls = []
  delete process.env.GEMINI_PAID_IMAGE_MODEL
  delete process.env.GEMINI_IMAGE_MODEL
  delete process.env.GEMINI_IMAGE_SIZE
  delete process.env.OPENAI_IMAGE_MODEL
  delete process.env.OPENAI_IMAGE_EDIT_MODEL
  delete process.env.OPENAI_IMAGE_QUALITY
  process.env.GOOGLE_AI_API_KEY = 'test-google'
  process.env.OPENAI_API_KEY = 'test-openai'
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
    calls.push({ url, init: init ?? {} })
    if (url.includes('/interactions')) {
      return jsonResponse({
        status: 'completed',
        steps: [
          {
            type: 'model_output',
            content: [{ type: 'image', data: TINY_PNG, mime_type: 'image/png' }],
          },
        ],
      })
    }
    if (url.includes('/images/')) {
      return jsonResponse({ data: [{ b64_json: TINY_PNG }] })
    }
    if (url.includes(':generateContent')) {
      return jsonResponse({
        candidates: [{ content: { parts: [{ inline_data: { data: TINY_PNG } }] } }],
      })
    }
    return jsonResponse({ error: 'unexpected url' }, 500)
  }) as typeof fetch
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('gemini image model', () => {
  it('defaults to nano banana 2.1 on the Interactions API', async () => {
    assert.equal(resolveGeminiImageModel(), DEFAULT_GEMINI_IMAGE_MODEL)
    assert.equal(DEFAULT_GEMINI_IMAGE_MODEL, 'gemini-nano-banana-2.1')
    assert.equal(geminiImageTransport(), 'interactions')

    const out = await generateGeminiImage({ prompt: 'a red square on white' })
    assert.equal(out.image?.base64, TINY_PNG)
    assert.equal(calls.length, 1)
    assert.equal(calls[0].url, 'https://generativelanguage.googleapis.com/v1beta/interactions')
    const body = JSON.parse(String(calls[0].init.body))
    assert.equal(body.model, 'gemini-nano-banana-2.1')
    assert.equal(body.store, false)
    assert.equal(body.response_format.delivery, undefined)
    assert.deepEqual(body.response_format, {
      type: 'image',
      image_size: '1K',
    })
    assert.equal(body.input.length, 1)
    assert.equal(calls[0].init.headers && (calls[0].init.headers as Record<string, string>)['x-goog-api-key'], 'test-google')
  })

  it('sends the source photo and extra references without forcing a square crop', async () => {
    await generateGeminiImage({
      prompt: 'recolor the hair only',
      aspectRatio: '3:4',
      sourceImage: { base64: TINY_PNG, mimeType: 'image/jpeg' },
      referenceImages: [{ base64: TINY_PNG, mimeType: 'image/png' }],
    })
    const body = JSON.parse(String(calls[0].init.body))
    assert.equal(body.input.length, 3)
    assert.equal(body.input[0].type, 'text')
    assert.equal(body.input[1].mime_type, 'image/jpeg')
    assert.equal(body.input[2].mime_type, 'image/png')
    assert.equal(body.response_format.aspect_ratio, '3:4')
    assert.equal(body.response_format.image_size, undefined)
    assert.equal(body.response_format.delivery, undefined)
  })

  it('rejects 512, which Nano Banana 2.1 does not support', async () => {
    process.env.GEMINI_IMAGE_SIZE = '512'
    await assert.rejects(
      () => generateGeminiImage({ prompt: 'a red square on white' }),
      /GEMINI_IMAGE_SIZE/,
    )
    assert.equal(calls.length, 0)
    process.env.GEMINI_IMAGE_SIZE = '0.5K'
    await assert.rejects(
      () => generateGeminiImage({ prompt: 'a red square on white' }),
      /GEMINI_IMAGE_SIZE/,
    )
  })

  it('keeps generateContent for a legacy rollback model', async () => {
    process.env.GEMINI_PAID_IMAGE_MODEL = 'gemini-2.5-flash-image'
    assert.equal(geminiImageTransport(), 'generateContent')
    await generateGeminiImage({
      prompt: 'edit',
      sourceImage: { base64: TINY_PNG, mimeType: 'image/png' },
    })
    assert.match(calls[0].url, /models\/gemini-2\.5-flash-image:generateContent/)
    const body = JSON.parse(String(calls[0].init.body))
    assert.deepEqual(body.generationConfig, { responseModalities: ['IMAGE'] })
    assert.equal(body.contents[0].parts[1].inline_data.mime_type, 'image/png')
  })

  it('throws when the provider fails so callers can refund the credit', async () => {
    globalThis.fetch = (async () => jsonResponse({ error: { message: 'quota' } }, 429)) as typeof fetch
    await assert.rejects(
      () => generateGeminiImage({ prompt: 'a red square on white' }),
      /Gemini Image 429/,
    )
  })

  it('reads an image from either steps or output_image', () => {
    assert.equal(
      extractInteractionImage({
        output_image: { data: 'abc', mime_type: 'image/jpeg' },
      })?.data,
      'abc',
    )
    assert.equal(
      extractInteractionImage({
        status: 'completed',
        steps: [
          {
            type: 'model_output',
            content: [{ type: 'image', data: TINY_PNG, mime_type: 'image/png' }],
          },
        ],
      })?.mime_type,
      'image/png',
    )
    assert.equal(extractInteractionImage({ status: 'completed', steps: [] }), null)
  })

  it('logs a truncated body when the interaction shape has no image', async () => {
    const logged: string[] = []
    const original = console.error
    console.error = (...args: unknown[]) => {
      logged.push(args.map((part) => String(part)).join(' '))
    }
    const huge = 'A'.repeat(2000)
    globalThis.fetch = (async () =>
      jsonResponse({
        status: 'completed',
        steps: [{ type: 'model_output', content: [{ type: 'text', text: 'no image', data: huge }] }],
      })) as typeof fetch
    try {
      await assert.rejects(
        () => generateGeminiImage({ prompt: 'a red square on white' }),
        /Gemini returned no image/,
      )
    } finally {
      console.error = original
    }
    const summary = logged.join('\n')
    assert.match(summary, /unexpected interaction response/)
    assert.match(summary, /no image/)
    assert.ok(summary.length < huge.length)
    assert.match(summarizeGeminiPayload({ data: huge }), /chars\)/)
  })
})

describe('openai image model', () => {
  it('defaults to flare and still caps quality at medium', () => {
    assert.equal(resolveOpenAIImageModel(), DEFAULT_OPENAI_IMAGE_MODEL)
    assert.equal(DEFAULT_OPENAI_IMAGE_MODEL, 'gpt-image-2.5-flare')
    assert.equal(resolveOpenAIEditModel(), 'gpt-image-2.5-flare')
    process.env.OPENAI_IMAGE_QUALITY = 'high'
    assert.equal(gptImageQuality(), 'medium')
    process.env.OPENAI_IMAGE_QUALITY = 'low'
    assert.equal(gptImageQuality(), 'low')
    process.env.OPENAI_IMAGE_EDIT_MODEL = 'gpt-image-2.5-sunburst'
    assert.equal(resolveOpenAIEditModel(), 'gpt-image-2.5-sunburst')
  })

  it('generates with flare when there is no reference photo', async () => {
    const out = await openaiProvider.call({ prompt: 'a ceramic cup', aspectRatio: '16:9' })
    assert.equal(out.image?.base64, TINY_PNG)
    assert.equal(calls[0].url, 'https://api.openai.com/v1/images/generations')
    const body = JSON.parse(String(calls[0].init.body))
    assert.equal(body.model, 'gpt-image-2.5-flare')
    assert.equal(body.size, '1536x1024')
    assert.equal(body.quality, 'medium')
  })

  it('edits with the reference photo instead of dropping it', async () => {
    await openaiProvider.call({
      prompt: 'change only the shirt color to blue, keep the face',
      sourceImage: { base64: TINY_PNG, mimeType: 'image/png' },
      referenceImages: [{ base64: TINY_PNG, mimeType: 'image/webp' }],
    })
    assert.equal(calls[0].url, 'https://api.openai.com/v1/images/edits')
    const headers = calls[0].init.headers as Record<string, string>
    assert.equal(headers['Content-Type'], undefined)
    assert.match(headers.Authorization, /^Bearer /)
    const form = calls[0].init.body as FormData
    assert.equal(form.get('model'), 'gpt-image-2.5-flare')
    assert.equal(form.getAll('image[]').length, 2)
  })

  it('throws on an API error', async () => {
    globalThis.fetch = (async () => jsonResponse({ error: { message: 'down' } }, 500)) as typeof fetch
    await assert.rejects(() => openaiProvider.call({ prompt: 'a cup' }), /OpenAI Image 500/)
  })
})

describe('hair color simulation', () => {
  it('edits the uploaded portrait through the shared provider and keeps the identity prompt', async () => {
    const result = await simulateHairColor(Buffer.from(TINY_PNG, 'base64'), 'image/jpeg', '#8B5A2B', 'ライトブラウン', 'Light Brown')
    assert.equal(result.imageBase64, TINY_PNG)
    assert.match(result.promptUsed, /STRICT INVARIANT/)
    assert.match(result.promptUsed, /ONLY the COLOR of hair pixels/)
    const body = JSON.parse(String(calls[0].init.body))
    assert.equal(body.model, 'gemini-nano-banana-2.1')
    assert.equal(body.input[1].type, 'image')
    assert.equal(body.input[1].mime_type, 'image/jpeg')
    assert.deepEqual(body.response_format, { type: 'image' })
  })
})
