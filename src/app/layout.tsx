import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'プロンプタ | AI プロンプト集 - ChatGPT・Claude対応',
  description: 'ChatGPTやClaudeなど、AIツール向けの高品質なプロンプト集。仕事の効率化、創造性の向上に役立つプロンプトを無料で提供します。',
  keywords: ['プロンプト', 'ChatGPT', 'Claude', 'AI', '生成AI'],
  authors: [{ name: 'Prompta' }],
  creator: 'Prompta',
  publisher: 'Prompta',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://prompta.example.com',
    title: 'プロンプタ | AI プロンプト集',
    description: 'ChatGPTやClaudeなど、AIツール向けの高品質なプロンプト集。',
    siteName: 'Prompta',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
