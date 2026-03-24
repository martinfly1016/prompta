import Link from 'next/link'
import { TOOLS, CATEGORIES, SITE_CONFIG } from '@/lib/constants'
import { SearchBar } from './SearchBar'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold text-sky-600">{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors">
                AIツール
                <svg className="inline-block ml-1 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[240px]">
                  <Link
                    href="/tools"
                    className="block px-4 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 border-b border-gray-100 mb-1"
                  >
                    すべてのツール →
                  </Link>
                  {TOOLS.map(tool => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-gray-500">{tool.nameJa}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors">
                カテゴリ
                <svg className="inline-block ml-1 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[220px]">
                  <Link
                    href="/prompts"
                    className="block px-4 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 border-b border-gray-100 mb-1"
                  >
                    すべてのプロンプト →
                  </Link>
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/prompts/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                    >
                      <span>{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Guides Link */}
            <Link
              href="/guides"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
            >
              ガイド
            </Link>

            {/* Glossary Link */}
            <Link
              href="/glossary"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
            >
              用語集
            </Link>
          </nav>

          {/* Search + Mobile Menu */}
          <div className="flex items-center gap-3">
            <SearchBar />
            {/* Mobile menu button */}
            <MobileMenuButton />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </header>
  )
}

function MobileMenuButton() {
  return (
    <label htmlFor="mobile-menu-toggle" className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </label>
  )
}

function MobileNav() {
  return (
    <>
      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
      <div className="md:hidden peer-checked:block hidden border-t border-gray-200 bg-white">
        <div className="px-4 py-3 space-y-1">
          <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">AIツール</p>
          <Link href="/tools" className="block px-3 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 rounded-lg">
            すべてのツール
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
      </div>
    </>
  )
}
