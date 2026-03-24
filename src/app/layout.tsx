import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'プロンプタ | AIプロンプト集 — Stable Diffusion・Midjourney・ChatGPT・Claude対応',
    template: '%s | プロンプタ',
  },
  description: 'Stable Diffusion、Midjourney、ChatGPT、Claude、DALL-Eなど主要AIツール対応の高品質プロンプト集。画像生成から文章作成まで、AIを最大限活用するプロンプトを無料提供。',
  keywords: ['プロンプト', 'AIプロンプト', 'Stable Diffusion', 'Midjourney', 'ChatGPT', 'Claude', 'DALL-E', '画像生成', 'AI', '生成AI', 'プロンプトエンジニアリング'],
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
    title: 'プロンプタ | AIプロンプト集',
    description: 'Stable Diffusion、Midjourney、ChatGPT、Claudeなど主要AIツール対応の高品質プロンプト集。',
    siteName: 'Prompta',
    images: [{
      url: 'https://www.prompta.jp/api/og?title=AI%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88%E9%9B%86&type=prompt',
      width: 1200,
      height: 630,
      alt: 'プロンプタ — AIプロンプト集',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@prompta_jp',
    title: 'プロンプタ | AIプロンプト集',
    description: 'Stable Diffusion、Midjourney、ChatGPT、Claudeなど主要AIツール対応の高品質プロンプト集。',
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-76RGV3H6S2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-76RGV3H6S2');
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
