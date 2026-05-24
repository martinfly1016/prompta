'use client'

import { useState } from 'react'

interface CodeBlockProps {
  code: string
  // Where this code block lives — sent as GA4 'surface' for funnel attribution
  // (e.g. "guide:bl-composition-prompt-guide").
  surface?: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
  }
}

export function CodeBlock({ code, surface }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'copy_code_block', { surface, code_length: code.length })
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4 group">
      <pre className="p-4 pr-14 bg-gray-900 text-gray-100 rounded-xl text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'コピー済み' : 'コードをコピー'}
        title={copied ? 'コピー済み' : 'コードをコピー'}
        className={`absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-all ${
          copied
            ? 'bg-emerald-500/90 text-white'
            : 'bg-gray-700/80 text-gray-200 hover:bg-gray-600 hover:text-white opacity-70 group-hover:opacity-100'
        }`}
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            コピー済み
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            コピー
          </>
        )}
      </button>
    </div>
  )
}
