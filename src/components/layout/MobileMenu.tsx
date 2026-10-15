'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { CATEGORIES, TOOLS } from '@/lib/constants'

/**
 * Mobile header drawer. The marketing layout stays mounted across
 * client navigations, so this must close itself — a CSS checkbox would
 * stay checked and keep covering the page that just loaded.
 */
export function MobileMenu() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routeKey = `${pathname}?${searchParams.toString()}`
  const [open, setOpen] = useState(false)

  // Close on any route or query-string change (back/forward, redirects).
  // Taps on the current URL do not change this key, so link clicks close
  // the menu themselves.
  useEffect(() => {
    setOpen(false)
  }, [routeKey])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Desktop nav replaces the drawer at the md breakpoint. Drop the lock
  // if the viewport grows while the menu is open.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    return lockBodyScroll()
  }, [open])

  function closeIfMenuLink(event: MouseEvent<HTMLElement>) {
    const target = event.target
    if (!(target instanceof Element)) return
    const link = target.closest('a')
    if (!link || !event.currentTarget.contains(link)) return
    setOpen(false)
  }

  const drawer = open
    ? createPortal(
        // Portaled to body so the header's backdrop-filter does not become
        // the containing block for this fixed layer.
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-[60] flex flex-col">
          <nav
            id="mobile-menu"
            data-testid="mobile-menu"
            aria-label="モバイルメニュー"
            className="border-t border-gray-200 bg-white max-h-[calc(100%-3rem)] overflow-y-auto overscroll-contain touch-pan-y"
            onClickCapture={closeIfMenuLink}
          >
            <div className="px-4 py-3 space-y-1">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">AIツール</p>
              <Link href="/tools" className="block px-3 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 rounded-lg">
                すべてのツール
              </Link>
              <Link
                href="/tools/height-difference-maker"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-sky-700 bg-white rounded-lg border border-sky-100"
              >
                <span>📏</span>
                <span className="whitespace-nowrap">身長差メーカー</span>
                <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">NEW</span>
              </Link>
              <Link
                href="/tools/personal-color-analysis"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-sky-700 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border border-sky-100"
              >
                <span>🎨</span>
                <span className="whitespace-nowrap">パーソナルカラー診断</span>
              </Link>
              <Link
                href="/tools/hair-color-diagnosis"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-violet-700 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-100"
              >
                <span>💇</span>
                <span className="whitespace-nowrap">似合う髪色診断</span>
                <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">NEW</span>
              </Link>
              {TOOLS.map(tool => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 rounded-lg"
                >
                  <span>{tool.icon}</span>
                  <span>{tool.name}</span>
                </Link>
              ))}

              <div className="border-t border-gray-100 my-2" />

              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">カテゴリ</p>
              <Link href="/prompts" className="block px-3 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 rounded-lg">
                すべてのプロンプト
              </Link>
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/prompts/${cat.slug}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 rounded-lg"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}

              <div className="border-t border-gray-100 my-2" />

              <Link href="/guides" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-sky-50 rounded-lg">
                📚 ガイド
              </Link>
              <Link href="/glossary" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-sky-50 rounded-lg">
                📖 用語集
              </Link>
            </div>
          </nav>
          <button
            type="button"
            tabIndex={-1}
            aria-label="メニューを閉じる"
            data-testid="mobile-menu-backdrop"
            className="flex-1 min-h-12 bg-black/40"
            onClick={() => setOpen(false)}
          />
        </div>,
        document.body
      )
    : null

  return (
    <>
      <button
        type="button"
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        data-testid="mobile-menu-button"
        onClick={() => setOpen(value => !value)}
      >
        <MenuGlyph open={open} />
      </button>
      {drawer}
    </>
  )
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  )
}

function lockBodyScroll(): () => void {
  const body = document.body
  const html = document.documentElement
  const scrollY = window.scrollY
  const prev = {
    bodyOverflow: body.style.overflow,
    htmlOverflow: html.style.overflow,
    bodyOverscroll: body.style.overscrollBehavior,
    htmlOverscroll: html.style.overscrollBehavior,
    bodyTouchAction: body.style.touchAction,
  }

  body.style.overflow = 'hidden'
  html.style.overflow = 'hidden'
  body.style.overscrollBehavior = 'none'
  html.style.overscrollBehavior = 'none'
  body.style.touchAction = 'none'

  const stopBackgroundScroll = (event: TouchEvent) => {
    const menu = document.getElementById('mobile-menu')
    if (menu && event.target instanceof Node && menu.contains(event.target)) return
    event.preventDefault()
  }
  document.addEventListener('touchmove', stopBackgroundScroll, { passive: false })

  return () => {
    body.style.overflow = prev.bodyOverflow
    html.style.overflow = prev.htmlOverflow
    body.style.overscrollBehavior = prev.bodyOverscroll
    html.style.overscrollBehavior = prev.htmlOverscroll
    body.style.touchAction = prev.bodyTouchAction
    document.removeEventListener('touchmove', stopBackgroundScroll)
    if (window.scrollY !== scrollY) window.scrollTo(0, scrollY)
  }
}
