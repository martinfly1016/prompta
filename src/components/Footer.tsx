'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-24 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <h3 className="font-bold text-white mb-3 text-lg">プロンプタ</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              AIプロンプトの共有プラットフォーム。ChatGPT、Claudeなど様々なAIに対応。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">ナビゲーション</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="#categories" className="text-slate-400 hover:text-white transition-colors">
                  カテゴリ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">言語</h4>
            <p className="text-sm text-slate-400">日本語 (日本)</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p>&copy; 2024 Prompta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
