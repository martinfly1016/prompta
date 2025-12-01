import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'プロンプタ | AI プロンプト集 - ChatGPT・Claude対応',
  description: 'ChatGPTやClaude、Gemini、Grok、nanobananaなど、AIツール向けの高品質なプロンプト集。仕事の効率化、創造性の向上に役立つプロンプトを無料で提供します。',
  keywords: ['プロンプト', 'ChatGPT', 'Claude', 'Gemini', 'Grok', 'nanobanana', 'AI', '生成AI'],
  authors: [{ name: 'Prompta' }],
  creator: 'Prompta',
  publisher: 'Prompta',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://www.prompta.jp',
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
  alternates: {
    canonical: 'https://www.prompta.jp/',
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
        <Footer />
      </body>
    </html>
  )
}
