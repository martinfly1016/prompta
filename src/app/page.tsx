'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import TagChip from '@/components/TagChip'
import SearchBar from '@/components/SearchBar'
import { getImageProxyUrl } from '@/lib/image-proxy'

interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  _count?: { prompts: number }
}

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
  category: { name: string; slug: string }
  views: number
  images?: PromptImage[]
  tags?: Tag[]
}

// Separate component to handle useSearchParams with Suspense
// This component renders category navigation with dynamic selection state
function CategoryNavigation({
  categories,
  isLoading,
  onCategoryChange,
  onSearch,
  onSearchClear,
  isSearching,
  hasSearchResults,
}: {
  categories: Category[]
  isLoading: boolean
  onCategoryChange: (slug: string | null) => void
  onSearch: (query: string) => void
  onSearchClear: () => void
  isSearching: boolean
  hasSearchResults: boolean
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    setSelectedCategory(categoryParam)
    onCategoryChange(categoryParam)
  }, [searchParams, onCategoryChange])

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
    onCategoryChange(categorySlug)
    if (categorySlug) {
      router.push(`?category=${categorySlug}`)
    } else {
      router.push('/')
    }
  }

  return (
    <>
      {!isLoading && categories.length > 0 && (
        <nav className="category-nav-bar">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`category-nav-item ${
              !selectedCategory
                ? 'category-nav-item-selected'
                : ''
            }`}
          >
            <span className="category-nav-icon">📂</span>
            <span>全部</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`category-nav-item ${
                selectedCategory === cat.slug
                  ? 'category-nav-item-selected'
                  : ''
              }`}
            >
              <span className="category-nav-icon">{cat.icon || '📌'}</span>
              <span>{cat.name}</span>
            </button>
          ))}
          <div className="search-bar-nav-spacer"></div>
          <SearchBar
            onSearch={onSearch}
            onClear={onSearchClear}
            isSearching={isSearching}
            hasResults={hasSearchResults}
          />
        </nav>
      )}
    </>
  )
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Prompt[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, promptsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/prompts?limit=12'),
        ])

        const catsData = await catsRes.json()
        const promptsData = await promptsRes.json()

        setCategories(catsData)
        setPrompts(promptsData.prompts || [])
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update selected category when it changes from the nav component
  const handleSelectedCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug)
  }

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setSearchQuery(query)
    setIsSearching(true)
    setIsSearchMode(true)

    try {
      const res = await fetch(`/api/prompts?search=${encodeURIComponent(query)}&limit=50`)
      const data = await res.json()
      const results = (data.prompts || []).filter((p: Prompt) => p)
      setSearchResults(results)
    } catch (error) {
      console.error('Failed to search:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle search clear
  const handleSearchClear = () => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearchMode(false)
  }

  // Filter prompts based on selected category or search mode
  const filteredPrompts = isSearchMode
    ? searchResults
    : selectedCategory
      ? prompts.filter(p => p.category.slug === selectedCategory)
      : prompts

  return (
    <main className="min-h-screen bg-background">
      {/* Category Navigation Bar - Wrapped in Suspense */}
      <Suspense fallback={null}>
        <CategoryNavigation
          categories={categories}
          isLoading={isLoading}
          onCategoryChange={handleSelectedCategoryChange}
          onSearch={handleSearch}
          onSearchClear={handleSearchClear}
          isSearching={isSearching}
          hasSearchResults={isSearchMode}
        />
      </Suspense>

      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-blue-900/20"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-indigo-900/20"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              AIを使いこなすための<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">プロンプト集</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              ChatGPT、Claude、その他のAIツール向けの高品質なプロンプトを無料で提供。
              <br className="hidden sm:block" />
              仕事の効率化から創造性の向上まで、あらゆるシーンで役立つプロンプト。
            </p>

            <p className="text-md text-primary font-semibold">
              💡 上部のナビゲーションバーから簡単に検索できます
            </p>
          </div>
        </div>
      </section>

      {/* Featured Prompts - Moved Up */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="text-sm font-semibold text-primary mb-2">
                {isSearchMode
                  ? `検索結果: "${searchQuery}"`
                  : selectedCategory
                    ? 'カテゴリプロンプト'
                    : '人気のプロンプト'}
              </div>
              <h2 className="text-4xl font-bold">
                {isSearchMode
                  ? `${filteredPrompts.length}個見つかりました`
                  : selectedCategory
                    ? categories.find(c => c.slug === selectedCategory)?.name
                    : 'トレンドプロンプト'}
              </h2>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground">読み込み中...</div>
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
              <h2 className="text-2xl font-bold mb-2">該当する内容が見つかりませんでした</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
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
          ) : filteredPrompts.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {selectedCategory
                ? 'このカテゴリにはプロンプトがありません。'
                : 'プロンプトはまだ利用できません。'}
            </div>
          ) : (
            <div className="auto-grid-responsive">
              {filteredPrompts.slice(0, 12).map((prompt) => (
                <Link
                  key={prompt.id}
                  href={`/prompt/${prompt.id}`}
                  className="group flex flex-col h-full bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 ring-1 ring-white/5 hover:ring-primary/30 card-shine"
                >
                  {/* 图片 */}
                  <div className="relative w-full bg-gradient-to-br from-slate-700/50 via-slate-800/50 to-slate-900/50 overflow-hidden flex-shrink-0 image-overlay" style={{paddingBottom: '100%'}}>
                    {prompt.images && prompt.images.length > 0 ? (
                      <img
                        src={getImageProxyUrl(prompt.images[0].url)}
                        alt={prompt.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        🎯
                      </div>
                    )}
                  </div>

                  {/* 内容 */}
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
                          <span className="text-xs text-slate-400 px-2.5 py-1">
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
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">プロンプト作成者様へ</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-blue-100">
            あなたが作成したプロンプトを共有しませんか?
            <br className="hidden sm:block" />
            管理画面からプロンプトを追加・管理できます。
          </p>
          <Link
            href="/admin/login"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            管理画面へログイン
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-white mb-4 text-lg">プロンプタ</h3>
              <p className="text-sm text-slate-400">
                AIプロンプトの共有プラットフォーム。ChatGPT、Claudeなど様々なAIに対応。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">ナビゲーション</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <span className="text-slate-500 cursor-default">
                    プロンプト検索 (ナビゲーションバー)
                  </span>
                </li>
                <li>
                  <Link href="#categories" className="hover:text-white transition-colors">
                    カテゴリ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">管理</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/admin/login" className="hover:text-white transition-colors">
                    管理画面
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">言語</h4>
              <p className="text-sm">日本語 (日本)</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 Prompta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
