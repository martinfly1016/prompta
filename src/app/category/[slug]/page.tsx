'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface Prompt {
  id: string
  title: string
  description: string
  views: number
  createdAt: string
}

interface Category {
  name: string
  description?: string
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [category, setCategory] = useState<Category | null>(null)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch('/api/categories')
        const categories = await res.json()
        const found = categories.find((c: any) => c.slug === slug)
        if (found) {
          setCategory(found)
        }
      } catch (error) {
        console.error('Failed to fetch category:', error)
      }
    }

    const fetchPrompts = async () => {
      try {
        const res = await fetch('/api/prompts')
        const data = await res.json()
        const filtered = data.prompts.filter(
          (p: any) => p.category.slug === slug && p.isPublished
        )
        setPrompts(filtered)
      } catch (error) {
        console.error('Failed to fetch prompts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
    fetchPrompts()
  }, [slug])

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

        {isLoading ? (
          <div className="text-center text-muted-foreground">読み込み中...</div>
        ) : (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-2">{category?.name}</h1>
              <p className="text-lg text-muted-foreground">{category?.description}</p>
            </div>

            {prompts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                このカテゴリにはまだプロンプトがありません。
              </div>
            ) : (
              <div className="space-y-4">
                {prompts.map((prompt) => (
                  <Link
                    key={prompt.id}
                    href={`/prompt/${prompt.id}`}
                    className="block p-6 bg-white dark:bg-slate-800 border border-border rounded-lg hover:shadow-lg hover:border-primary transition-all"
                  >
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary">
                      {prompt.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{prompt.description}</p>
                    <span className="text-xs text-muted-foreground">
                      👁️ {prompt.views}回閲覧
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
