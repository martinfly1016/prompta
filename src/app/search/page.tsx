'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search as SearchIcon, X } from 'lucide-react'
import TagChip from '@/components/TagChip'
import { getImageProxyUrl } from '@/lib/image-proxy'

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
  category: { name: string }
  views: number
  images?: PromptImage[]
  tags?: Tag[]
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        setCategories(await res.json())
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() && !selectedCategory) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      let url = '/api/prompts?limit=50'
      if (query) url += `&search=${encodeURIComponent(query)}`

      const res = await fetch(url)
      const data = await res.json()
      let filtered = data.prompts.filter((p: any) => p.isPublished)

      if (selectedCategory) {
        filtered = filtered.filter((p: any) => p.category.slug === selectedCategory)
      }

      setPrompts(filtered)
    } catch (error) {
      console.error('Failed to search:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearFilters = () => {
    setQuery('')
    setSelectedCategory('')
    setPrompts([])
    setHasSearched(false)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Search Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              プロンプトを<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">検索</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              あなたにぴったりのプロンプトを見つけましょう
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* 検索入力 */}
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="キーワードで検索（例：文章作成、コード生成）..."
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 transition-all"
                />
              </div>

              {/* フィルター */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 transition-all"
                  >
                    <option value="">すべてのカテゴリ</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 検索ボタン */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold"
                >
                  <SearchIcon size={20} />
                  検索
                </button>
              </div>

              {/* クリアボタン */}
              {(query || selectedCategory) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <X size={16} />
                  フィルターをクリア
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-16">
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">検索中...</p>
            </div>
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              キーワードまたはカテゴリを選択して検索してください。
              <br />
              あなたが探しているプロンプトが見つかります。
            </p>
          </div>
        )}

        {hasSearched && !isLoading && (
          <div>
            {prompts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">😕</div>
                <h2 className="text-2xl font-bold mb-2">マッチするプロンプトが見つかりませんでした</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  「{query || selectedCategory}」に一致するプロンプトはありません。
                  <br />
                  別のキーワードまたはカテゴリで試してください。
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  フィルターをリセット
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {prompts.length}個のプロンプトが見つかりました
                    </h2>
                    {query && (
                      <p className="text-muted-foreground mt-2">
                        「{query}」
                        {selectedCategory && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
                      </p>
                    )}
                  </div>
                </div>

                <div className="auto-grid-responsive">
                  {prompts.map((prompt) => (
                    <Link
                      key={prompt.id}
                      href={`/prompt/${prompt.id}`}
                      className="group flex flex-col h-full bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 ring-1 ring-white/5 hover:ring-primary/30 card-shine"
                    >
                      {/* 画像 */}
                      <div className="relative w-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 overflow-hidden flex-shrink-0 image-overlay" style={{paddingBottom: '100%'}}>
                        {prompt.images && prompt.images.length > 0 ? (
                          <img
                            src={getImageProxyUrl(prompt.images[0].url)}
                            alt={prompt.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-4xl">
                            📝
                          </div>
                        )}
                      </div>

                      {/* コンテンツ */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-semibold mb-2 text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 text-slate-100">
                          {prompt.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-3 line-clamp-2 flex-1 leading-relaxed">
                          {prompt.description}
                        </p>

                        {/* Tags */}
                        {prompt.tags && prompt.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {prompt.tags.slice(0, 3).map((tag) => (
                              <TagChip
                                key={tag.id}
                                name={tag.name}
                                color={tag.color}
                              />
                            ))}
                            {prompt.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground px-2.5 py-1">
                                +{prompt.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 px-3 py-1.5 rounded-full font-medium border border-blue-400/20 backdrop-blur-sm">
                            {prompt.category.name}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
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
