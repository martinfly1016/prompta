'use client'

import { useState } from 'react'

interface EmbedButtonProps {
  slug: string
  baseUrl: string
}

export function EmbedButton({ slug, baseUrl }: EmbedButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const embedCode = `<iframe src="${baseUrl}/embed/${slug}" width="100%" height="400" style="border:none;border-radius:12px;max-width:500px;" loading="lazy"></iframe>`

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silent fail
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700 transition-colors"
        title="埋め込みコードを取得"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">埋め込みコード</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">以下のコードをブログやWebサイトに貼り付けてください。</p>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-xs leading-relaxed break-all">
              {embedCode}
            </div>
            <button
              onClick={handleCopy}
              className={`mt-4 w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-sky-600 text-white hover:bg-sky-700'
              }`}
            >
              {copied ? 'コピーしました！' : 'コードをコピー'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
