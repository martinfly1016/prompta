'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search as SearchIcon } from 'lucide-react'

interface PromptImage {
  url: string
  altText?: string
}

interface Prompt {
  id: string
  title: string
  description: string
  category: { name: string }
  views: number
  images?: PromptImage[]
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setHasSearched(true)

    try {
      const res = await fetch(`/api/prompts?search=${encodeURIComponent(query)}&limit=50`)
      const data = await res.json()
      setPrompts(data.prompts.filter((p: any) => p.isPublished))
    } catch (error) {
      console.error('Failed to search:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            プロンプタ
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-8 text-center">プロンプトを検索</h1>

          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="プロンプトを検索..."
              className="flex-1 px-6 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <SearchIcon size={20} />
              検索
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="text-center text-muted-foreground">検索中...</div>
        )}

        {!hasSearched && !isLoading && (
          <div className="text-center text-muted-foreground max-w-2xl mx-auto">
            <p className="text-lg">
              検索キーワードを入力してプロンプトを探してください。
            </p>
          </div>
        )}

        {hasSearched && !isLoading && (
          <div className="max-w-2xl mx-auto">
            {prompts.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                「{query}」に一致するプロンプトが見つかりませんでした。
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground mb-6">
                  {prompts.length}個のプロンプトが見つかりました
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prompts.map((prompt) => (
                    <Link
                      key={prompt.id}
                      href={`/prompt/${prompt.id}`}
                      className="group bg-white dark:bg-slate-800 border border-border rounded-lg hover:shadow-lg hover:border-primary transition-all overflow-hidden"
                    >
                      {/* 图片 */}
                      {prompt.images && prompt.images.length > 0 ? (
                        <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
                          <Image
                            src={prompt.images[0].url}
                            alt={prompt.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                          <span className="text-4xl">🖼️</span>
                        </div>
                      )}

                      {/* 内容 */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {prompt.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{prompt.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {prompt.category.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            👁️ {prompt.views}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
