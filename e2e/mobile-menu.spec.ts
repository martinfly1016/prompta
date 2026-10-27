import type { Page } from '@playwright/test'
import { expect, test } from './fixtures'

// iPhone-sized viewport. The marketing header drawer is `md:hidden`
// (Tailwind's 768px breakpoint), so the desktop project viewport would
// never show it.
test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
})

test.describe('mobile header menu', () => {
  test('closes after tapping a tool link and updates the URL', async ({ page }) => {
    await page.goto('/glossary')
    await openMenu(page)

    const menu = page.getByTestId('mobile-menu')
    await menu.getByRole('link', { name: '身長差メーカー' }).tap()

    await expect(menu).toBeHidden()
    await expect(page).toHaveURL(/\/tools\/height-difference-maker\/?$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByTestId('mobile-menu-backdrop')).toBeHidden()
  })

  test('closes when the tapped link is already the current page', async ({ page }) => {
    await page.goto('/tools/height-difference-maker')
    await openMenu(page)

    const menu = page.getByTestId('mobile-menu')
    await menu.getByRole('link', { name: '身長差メーカー' }).tap()

    await expect(menu).toBeHidden()
    await expect(page).toHaveURL(/\/tools\/height-difference-maker\/?$/)
    await expect(page.getByRole('heading', { level: 1, name: /身長差メーカー/ })).toBeVisible()
  })

  test('closes category and guide links, including the current page', async ({ page }) => {
    await page.goto('/glossary')
    await openMenu(page)

    const menu = page.getByTestId('mobile-menu')
    await menu.getByRole('link', { name: '用語集' }).tap()

    await expect(menu).toBeHidden()
    await expect(page).toHaveURL(/\/glossary\/?$/)

    await openMenu(page)
    await menu.getByRole('link', { name: 'ガイド' }).tap()

    await expect(menu).toBeHidden()
    await expect(page).toHaveURL(/\/guides\/?$/)
    await expect(page.getByRole('heading', { name: 'AIプロンプトガイド' })).toBeVisible()
  })

  test('closes on Escape and backdrop tap, and restores body scroll', async ({ page }) => {
    await page.goto('/glossary')
    const lower = page.getByRole('heading', { name: 'ワ行' })
    await lower.scrollIntoViewIfNeeded()
    const before = await page.evaluate(() => window.scrollY)
    expect(before).toBeGreaterThan(200)

    await openMenu(page)
    const locked = await page.evaluate(() => ({
      y: window.scrollY,
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
    }))
    expect(locked.bodyOverflow).toBe('hidden')
    expect(locked.htmlOverflow).toBe('hidden')
    expect(locked.y).toBe(before)

    await page.mouse.move(24, 24)
    await page.mouse.wheel(0, 600)
    expect(await page.evaluate(() => window.scrollY)).toBe(before)

    await page.keyboard.press('Escape')
    await expect(page.getByTestId('mobile-menu')).toBeHidden()
    const unlocked = await page.evaluate(() => ({
      y: window.scrollY,
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
    }))
    expect(unlocked.bodyOverflow).toBe('')
    expect(unlocked.htmlOverflow).toBe('')
    expect(unlocked.y).toBe(before)

    await openMenu(page)
    await page.getByTestId('mobile-menu-backdrop').tap()
    await expect(page.getByTestId('mobile-menu')).toBeHidden()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
    expect(await page.evaluate(() => window.scrollY)).toBe(before)
  })
})

async function openMenu(page: Page) {
  const button = page.getByTestId('mobile-menu-button')
  await expect(button).toBeVisible()
  await button.tap()
  await expect(page.getByTestId('mobile-menu')).toBeVisible()
}
