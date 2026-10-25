import { test, expect, type APIRequestContext } from '@playwright/test'
import sharp from 'sharp'

const EMAIL = 'e2e-test+height-diff@prompta.jp'

const settings = {
  characterA: { label: '人物A', heightCm: 190, bodyType: 'athletic', note: '長めの黒髪、落ち着いた表情' },
  characterB: { label: '人物B', heightCm: 152, bodyType: 'slim', note: '短めの髪、やさしい笑顔' },
  pose: 'look-up',
  framing: 'full',
  style: 'anime',
  scene: 'studio',
  relationship: 'oshi',
}

test.describe('height difference generation credits', () => {
  test('charges 1 point per run, refunds on failure, and blocks logged-out or empty wallets', async ({ page }) => {
    const login = await page.request.post('/api/test/login', { data: { email: EMAIL } })
    test.skip(login.status() === 404, 'ENABLE_TEST_AUTH is off')
    expect(login.ok()).toBeTruthy()

    const good = await jpeg(320, 400)
    const tiny = await jpeg(32, 32)

    await seed(page.request, 3)
    const before = await snapshot(page.request)
    expect(before.balance).toBe(3)

    const one = await generate(page.request, { imageA: good, e2e: 'mock-success' })
    expect(one.status).toBe(200)
    expect(one.body.ok).toBe(true)
    expect(one.body.balance).toBe(2)
    expect(one.body.promptUsed).toContain('exactly 190 cm')
    expect(one.body.promptUsed).toContain('exactly 152 cm')
    expect(one.body.promptUsed).toContain('Character A reference photo')
    expect(one.body.promptUsed).not.toContain('Character B reference photo')
    const afterOne = await snapshot(page.request)
    expect(afterOne.balance).toBe(before.balance - 1)
    expect(afterOne.totalUsed).toBe(before.totalUsed + 1)

    const two = await generate(page.request, { imageA: good, imageB: good, e2e: 'mock-success' })
    expect(two.status).toBe(200)
    expect(two.body.balance).toBe(1)
    expect(two.body.promptUsed).toContain('Character B reference photo')
    const afterTwo = await snapshot(page.request)
    expect(afterTwo.balance).toBe(before.balance - 2)
    expect(afterTwo.totalUsed).toBe(before.totalUsed + 2)

    const failed = await generate(page.request, { imageA: good, imageB: good, e2e: 'force-error' })
    expect(failed.status).toBe(500)
    expect(failed.body.error).toBe('generation_failed')
    expect(failed.body.refunded).toBe(true)
    expect(failed.body.message).toBeUndefined()
    const afterFail = await snapshot(page.request)
    expect(afterFail.balance).toBe(afterTwo.balance)
    expect(afterFail.totalUsed).toBe(afterTwo.totalUsed)

    const small = await generate(page.request, { imageA: tiny, e2e: 'mock-success' })
    expect(small.status).toBe(422)
    expect(String(small.body.message)).toContain('小さすぎ')
    const afterSmall = await snapshot(page.request)
    expect(afterSmall.balance).toBe(afterFail.balance)

    await seed(page.request, 0)
    const empty = await generate(page.request, { imageA: good, e2e: 'mock-success' })
    expect(empty.status).toBe(402)
    expect(empty.body.error).toBe('credits_exhausted')
    const afterEmpty = await snapshot(page.request)
    expect(afterEmpty.balance).toBe(0)

    await page.request.delete('/api/test/login')
    const loggedOut = await generate(page.request, { imageA: good, e2e: 'mock-success' })
    expect(loggedOut.status).toBe(401)
    expect(loggedOut.body.error).toBe('login_required')
    const afterLogout = await snapshot(page.request)
    expect(afterLogout.balance).toBe(0)

    const hair = await page.request.post('/api/tools/hair-color/simulate', {
      multipart: {
        image: { name: 'hair.jpg', mimeType: 'image/jpeg', buffer: good },
        hex: '#112233',
        nameJa: 'テスト',
        nameEn: 'Test',
      },
    })
    expect(hair.status()).toBe(401)
    expect((await hair.json()).error).toBe('login_required')

    const prompt = await page.request.post('/api/prompt/execute', {
      data: { promptSlug: 'height-check', providerId: 'gemini-image', content: 'a tall and short couple' },
    })
    expect(prompt.status()).toBe(401)
    expect((await prompt.json()).error).toBe('login_required')
  })
})

async function jpeg(width: number, height: number) {
  return sharp({
    create: { width, height, channels: 3, background: { r: 200, g: 160, b: 140 } },
  }).jpeg().toBuffer()
}

async function seed(request: APIRequestContext, balance: number) {
  const res = await request.post('/api/test/seed-credits', { data: { email: EMAIL, balance } })
  expect(res.ok()).toBeTruthy()
}

async function snapshot(request: APIRequestContext) {
  const res = await request.post('/api/test/credits-snapshot', { data: { email: EMAIL } })
  expect(res.ok()).toBeTruthy()
  return res.json() as Promise<{ balance: number; totalUsed: number }>
}

async function generate(
  request: APIRequestContext,
  input: { imageA: Buffer; imageB?: Buffer; e2e: 'mock-success' | 'force-error' },
) {
  const multipart: Record<string, unknown> = {
    settings: JSON.stringify(settings),
    e2e: input.e2e,
    imageA: { name: 'a.jpg', mimeType: 'image/jpeg', buffer: input.imageA },
  }
  if (input.imageB) {
    multipart.imageB = { name: 'b.jpg', mimeType: 'image/jpeg', buffer: input.imageB }
  }
  const res = await request.post('/api/tools/height-difference/generate', { multipart })
  return { status: res.status(), body: await res.json() }
}
