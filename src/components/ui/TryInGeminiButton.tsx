'use client'

import { useState } from 'react'
import { trackPromptTry } from '@/lib/track'

interface TryInGeminiButtonProps {
  content: string
  className?: string
  promptId?: string
  slug?: string
  category?: string | null
  tool?: string | null
}

// Gemini does not have a public ?q= URL pre-fill, so this button always
// copies to clipboard and opens gemini.google.com — user pastes manually.
export function TryInGeminiButton({
  content,
  className = '',
  promptId,
  slug,
  category,
  tool,
}: TryInGeminiButtonProps) {
  const [copied, setCopied] = useState(false)

  const baseClass = `inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow-md ${className}`
  const blueClass = 'bg-blue-600 text-white hover:bg-blue-700'
  const copiedClass = 'bg-green-500 text-white'

  const icon = (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.304 14.304 0 0 0 12 12 14.304 14.304 0 0 0-12 12Z"/>
    </svg>
  )

  async function handleClick() {
    trackPromptTry(promptId, 'gemini', { slug, category, tool })
    try {
      await navigator.clipboard.writeText(content)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer')
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseClass} ${copied ? copiedClass : blueClass}`}
      title="プロンプトをコピーして Gemini を開きます。写真をアップロードして貼り付けてください。"
    >
      {icon}
      {copied ? 'コピー完了！Geminiに貼り付けてください' : 'Geminiで試す（コピー＆開く）'}
    </button>
  )
}
