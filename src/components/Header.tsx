'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header
      className="shadow-lg"
      style={{
        background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234))',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-3xl font-bold text-white">
          プロンプタ
        </Link>
      </div>
    </header>
  )
}
