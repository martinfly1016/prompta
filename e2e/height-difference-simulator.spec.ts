import { test, expect } from '@playwright/test'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'

test.describe('height difference simulator', () => {
  test('adjusts the preview, locks it, and sends those settings with a photo', async ({ page }) => {
    const photoPath = path.join(os.tmpdir(), `prompta-height-sim-${Date.now()}.jpg`)
    const photo = await sharp({
      create: { width: 320, height: 400, channels: 3, background: { r: 210, g: 176, b: 150 } },
    }).jpeg().toBuffer()
    await fs.promises.writeFile(photoPath, photo)

    await page.route('**/api/auth/session', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: { name: 'Test', email: 'height-sim@example.com' },
          expires: '2099-01-01T00:00:00.000Z',
        }),
      })
    })
    await page.route('**/api/tools/balance', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ balance: 3, canUse: true, signedIn: true, stripeEnabled: false, ga: [] }),
      })
    })

    let posted = ''
    await page.route('**/api/tools/height-difference/generate', async (route) => {
      posted = route.request().postData() ?? ''
      const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          imageBase64: png,
          mimeType: 'image/png',
          promptUsed: 'locked test prompt exactly 200 cm',
          balance: 2,
          ga: [],
        }),
      })
    })

    await page.goto('/tools/height-difference-maker/simulate')
    const stage = page.getByTestId('height-sim-stage')
    await expect(stage).toHaveAttribute('aria-label', /人物A 188cm、人物B 158cm/)
    const before = Number(await page.getByTestId('height-sim-figure-a').getAttribute('data-top'))

    await page.getByRole('slider', { name: '人物Aの身長' }).fill('200')
    await expect(stage).toHaveAttribute('aria-label', /人物A 200cm/)
    const after = Number(await page.getByTestId('height-sim-figure-a').getAttribute('data-top'))
    expect(after).toBeLessThan(before)
    await expect(page.getByTestId('height-sim-gap')).toContainText('42cm')

    await page.getByRole('button', { name: '細身' }).first().click()
    const slimShoulder = Number(await page.getByTestId('height-sim-figure-a').getAttribute('data-shoulder'))
    await page.getByRole('button', { name: '横幅広め' }).first().click()
    const broadShoulder = Number(await page.getByTestId('height-sim-figure-a').getAttribute('data-shoulder'))
    expect(broadShoulder).toBeGreaterThan(slimShoulder)

    const sideGap = Math.abs(
      Number(await page.getByTestId('height-sim-figure-a').getAttribute('data-cx')) -
      Number(await page.getByTestId('height-sim-figure-b').getAttribute('data-cx')),
    )
    await page.getByRole('button', { name: 'ハグ' }).click()
    const hugGap = Math.abs(
      Number(await page.getByTestId('height-sim-figure-a').getAttribute('data-cx')) -
      Number(await page.getByTestId('height-sim-figure-b').getAttribute('data-cx')),
    )
    expect(hugGap).toBeLessThan(sideGap)

    await page.getByRole('button', { name: '腰上' }).click()
    await page.getByTestId('height-sim-confirm').click()
    await expect(page.getByTestId('height-sim-photo-step')).toBeVisible()
    await expect(page.getByTestId('height-sim-summary')).toContainText('200cm')
    await expect(page.getByTestId('height-sim-summary')).toContainText('腰上')
    await expect(page.getByRole('slider', { name: '人物Aの身長' })).toBeDisabled()

    await page.getByTestId('height-sim-file-a').setInputFiles(photoPath)
    await expect(page.getByTestId('height-sim-balance')).toHaveText('残り 3 ポイント')
    await page.getByTestId('height-sim-generate').click()

    await expect(page.getByRole('img', { name: '身長差を反映した生成結果' })).toBeVisible()
    expect(posted).toContain('"heightCm":200')
    expect(posted).toContain('"pose":"hug"')
    expect(posted).toContain('"framing":"waist"')
    expect(posted).toContain('"bodyType":"broad"')
    expect(posted).toContain('character-a.jpg')
    await expect(page.getByTestId('height-sim-balance')).toHaveText('残り 2 ポイント')
  })
})
