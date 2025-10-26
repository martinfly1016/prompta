'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Copy, Check, Share2, ArrowLeft } from 'lucide-react'
import { ImageGallery } from '@/components/ImageGallery'

interface PromptImage {
  url: string
  altText?: string
}

interface Tag {
  id: string
  name: string
  color?: string
}

interface Prompt {
  id: string
  title: string
  description: string
  content: string
  category: { name: string; slug: string }
  tags?: Tag[]
  views: number
  createdAt: string
  images?: PromptImage[]
}

export default function PromptPage() {
  const params = useParams()
  const id = params.id as string

  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(`/api/prompts/${id}`)
        const data = await res.json()
        setPrompt(data)

        // Increment view count
        await fetch(`/api/view`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ promptId: id })
        }).catch(() => {})
      } catch (error) {
        console.error('Failed to fetch prompt:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrompt()
  }, [id])

  const handleCopy = async () => {
    if (!prompt) return
    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleShare = async () => {
    if (!prompt) return
    const url = `${window.location.origin}/prompt/${id}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: prompt.title,
          text: prompt.description,
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        alert('URLをコピーしました')
      }
    } catch (error) {
      console.error('Failed to share:', error)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
          読み込み中...
        </div>
      </main>
    )
  }

  if (!prompt) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">プロンプトが見つかりません</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            ホームに戻る
          </Link>
        </div>
      </main>
    )
  }

  const tags = Array.isArray(prompt.tags) ? prompt.tags : []

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold">
            プロンプタ
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft size={20} />
          ホームに戻る
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              ホーム
            </Link>
            <span>/</span>
            <Link
              href={`/category/${prompt.category.slug}`}
              className="hover:text-foreground"
            >
              {prompt.category.name}
            </Link>
          </div>

          {/* Main Content */}
          <article className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{prompt.title}</h1>
              <p className="text-xl text-muted-foreground">{prompt.description}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {prompt.category.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  👁️ {prompt.views}回閲覧
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            {prompt.images && prompt.images.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">効果画像</h2>
                <ImageGallery images={prompt.images} />
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: Tag) => (
                  <span
                    key={tag.id}
                    className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">プロンプト</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {copied ? (
                      <>
                        <Check size={18} />
                        コピーしました
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        コピー
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Share2 size={18} />
                    共有
                  </button>
                </div>
              </div>

              <pre className="p-6 bg-slate-900 text-white rounded-lg overflow-x-auto font-mono text-sm whitespace-pre-wrap break-words">
                {prompt.content}
              </pre>
            </div>

            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                このプロンプトの使い方
              </h3>
              <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-2 list-decimal list-inside">
                <li>上の「コピー」ボタンをクリックしてプロンプトをコピーします</li>
                <li>ChatGPT、Claude、その他のAIツールのチャット欄に貼り付けます</li>
                <li>Enterキーを押して実行します</li>
              </ol>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}
