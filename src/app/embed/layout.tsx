import '../globals.css'

export const metadata = {
  robots: { index: false, follow: false },
}

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-white">
        {children}
      </body>
    </html>
  )
}
