import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'プロンプトギャラリー | AI プロンプト集',
  description: 'ChatGPTやClaudeなど、AIツール向けの高品質なプロンプト集。仕事の効率化、創造性の向上に役立つプロンプトを無料で提供します。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  )
}
