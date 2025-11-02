'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import TagChip from '@/components/TagChip'
import SearchBar from '@/components/SearchBar'
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
  views: number
  createdAt: string
  category: { name: string; slug: string }
  images?: PromptImage[]
  tags?: Tag[]
}

interface Category {
  name: string
  description?: string
  icon?: string
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [category, setCategory] = useState<Category | null>(null)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Prompt[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [isSearchTransitioning, setIsSearchTransitioning] = useState(false)

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

  // Handle search within category
  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setSearchQuery(query)
    setIsSearching(true)
    setIsSearchTransitioning(true)
    setIsSearchMode(true)

    try {
      const res = await fetch(`/api/prompts?search=${encodeURIComponent(query)}&limit=50`)
      const data = await res.json()
      const results = (data.prompts || []).filter(
        (p: Prompt) => p.category.slug === slug
      )
      setSearchResults(results)
    } catch (error) {
      console.error('Failed to search:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
      // Remove transition loading after brief delay for smooth effect
      setTimeout(() => setIsSearchTransitioning(false), 150)
    }
  }

  // Handle search clear
  const handleSearchClear = () => {
    setIsSearchTransitioning(true)
    setSearchQuery('')
    setSearchResults([])
    setIsSearchMode(false)
    // Remove transition loading after brief delay
    setTimeout(() => setIsSearchTransitioning(false), 150)
  }

  // Filter prompts based on search mode
  const filteredPrompts = isSearchMode ? searchResults : prompts

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb & Hero */}
      {!isLoading && category && (
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              ホームに戻る
            </Link>

            <div className="max-w-3xl mb-12">
              <div className="text-6xl mb-6">{category?.icon || '📌'}</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">{category?.name}</h1>
              <p className="text-lg text-gray-700 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                {category?.description}
              </p>
              <div className="mt-6 text-base font-semibold text-blue-600 dark:text-blue-400">
                全 {isSearchMode ? filteredPrompts.length : prompts.length} 件のプロンプト
              </div>
            </div>

            {/* Search Bar in Hero */}
            <div className="max-w-md">
              <SearchBar
                onSearch={handleSearch}
                onClear={handleSearchClear}
                isSearching={isSearching}
              />
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">読み込み中...</p>
            </div>
          </div>
        ) : isSearching ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">検索中...</p>
            </div>
          </div>
        ) : isSearchMode && filteredPrompts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">😕</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">該当する内容が見つかりませんでした</h2>
            <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-base">
              「{searchQuery}」に一致するプロンプトはありません。
              <br />
              別のキーワードで試してください。
            </p>
            <button
              onClick={handleSearchClear}
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              検索をクリア
            </button>
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📭</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">プロンプトがありません</h2>
            <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-base">
              このカテゴリにはまだプロンプトが登録されていません。
              <br />
              近日公開予定です。
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              ホームに戻る
            </Link>
          </div>
        ) : (
          <div
            className="auto-grid-responsive transition-opacity duration-150"
            style={{
              opacity: isSearchTransitioning ? 0.5 : 1,
            }}
          >
            {filteredPrompts.map((prompt) => (
              <Link
                key={prompt.id}
                href={`/prompt/${prompt.id}`}
                className="group flex flex-col h-full bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 ring-1 ring-white/5 hover:ring-primary/30 card-shine"
              >
                {/* 画像 */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 overflow-hidden flex-shrink-0 image-overlay">
                  {prompt.images && prompt.images.length > 0 ? (
                    <img
                      src={getImageProxyUrl(prompt.images[0].url)}
                      alt={prompt.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      ✨
                    </div>
                  )}
                </div>

                {/* コンテンツ */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold mb-3 text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2 text-white">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1 leading-relaxed">
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

                  <div className="mt-auto">
                    <span className="text-xs text-slate-500 font-semibold">
                      👁️ {prompt.views} 回閲覧
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
