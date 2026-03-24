import Link from 'next/link'
import { TOOLS, CATEGORIES, GUIDES, SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              AIプロンプトの無料コレクション。Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-Eなど主要AIツールに対応した高品質プロンプトを提供しています。
            </p>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              AIツール
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tools" className="text-sm text-gray-400 hover:text-white transition-colors">
                  ツール一覧
                </Link>
              </li>
              {TOOLS.map(tool => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {tool.icon} {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              カテゴリ
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/prompts" className="text-sm text-gray-400 hover:text-white transition-colors">
                  全プロンプト
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.slug}>
                  <Link
                    href={`/prompts/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              学習リソース
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/guides" className="text-sm text-gray-400 hover:text-white transition-colors">
                  ガイド一覧
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-sm text-gray-400 hover:text-white transition-colors">
                  AI用語集
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-gray-400 hover:text-white transition-colors">
                  AIツール比較
                </Link>
              </li>
              {GUIDES.slice(0, 4).map(guide => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {guide.title.split('—')[0].split('：')[0]}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 mt-6">
              お問い合わせ
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ✉️ {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/${SITE_CONFIG.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  𝕏 {SITE_CONFIG.twitter}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {SITE_CONFIG.nameEn}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/guides" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              利用規約
            </Link>
            <Link href="/guides" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
