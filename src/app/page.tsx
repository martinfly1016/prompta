'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import TagChip from '@/components/TagChip'
import SearchBar from '@/components/SearchBar'
import SkeletonNav from '@/components/SkeletonNav'
import PromptCardSkeleton from '@/components/PromptCardSkeleton'
import Pagination from '@/components/Pagination'
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
}: {
  categories: Category[]
  isLoading: boolean
  onCategoryChange: (slug: string | null) => void
  onSearch: (query: string) => void
  onSearchClear: () => void
  isSearching: boolean
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
      {isLoading ? (
        <SkeletonNav />
      ) : (
        <nav className="category-nav-bar">
          <Link href="/" className="logo-link">
            <img src="/logo.png" alt="Prompta Logo" className="logo-image" />
          </Link>
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
          />
        </nav>
      )}
    </>
  )
}

interface PaginationData {
  page: number
  limit: number
  total: number
  pages: number
}

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState<Category[]>([])
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Prompt[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [isCategoryTransitioning, setIsCategoryTransitioning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  })
  const [searchPagination, setSearchPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  })

  // Initialize search from URL params
  useEffect(() => {
    const searchParam = searchParams.get('search')
    const pageParam = searchParams.get('page')

    if (searchParam) {
      // Trigger search when search param is present
      setSearchQuery(searchParam)
      setIsSearchMode(true)
      setCurrentPage(pageParam ? parseInt(pageParam) || 1 : 1)
    } else {
      // Reset search mode if no search param
      const categoryParam = searchParams.get('category')
      if (categoryParam) {
        setSelectedCategory(categoryParam)
      }
      if (pageParam) {
        setCurrentPage(parseInt(pageParam) || 1)
      }
      setIsSearchMode(false)
      setSearchQuery('')
    }
  }, [searchParams])

  // Handle search query changes from URL
  useEffect(() => {
    if (isSearchMode && searchQuery) {
      const fetchSearchResults = async () => {
        setIsSearching(true)
        setSearchError(null)
        try {
          const res = await fetch(
            `/api/prompts?search=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=20`
          )
          if (!res.ok) {
            throw new Error('検索に失敗しました。もう一度お試しください。')
          }
          const data = await res.json()
          const results = (data.prompts || []).filter((p: Prompt) => p)
          setSearchResults(results)
          setSearchPagination(data.pagination || {
            page: currentPage,
            limit: 20,
            total: 0,
            pages: 0,
          })
        } catch (error) {
          console.error('Failed to search:', error)
          setSearchError(error instanceof Error ? error.message : '検索中にエラーが発生しました。')
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      }
      fetchSearchResults()
    }
  }, [isSearchMode, searchQuery, currentPage])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [catsRes, promptsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch(`/api/prompts?page=${currentPage}&limit=20`),
        ])

        if (!catsRes.ok || !promptsRes.ok) {
          throw new Error('データの取得に失敗しました。もう一度お試しください。')
        }

        const catsData = await catsRes.json()
        const promptsData = await promptsRes.json()

        setCategories(catsData)
        setPrompts(promptsData.prompts || [])
        setPagination(promptsData.pagination || {
          page: currentPage,
          limit: 20,
          total: 0,
          pages: 0,
        })
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setError(error instanceof Error ? error.message : 'ページの読み込みに失敗しました。')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  // Update selected category when it changes from the nav component
  const handleSelectedCategoryChange = (slug: string | null) => {
    // Only show transition loading if category actually changed
    if (slug !== selectedCategory) {
      setIsCategoryTransitioning(true)
      setSelectedCategory(slug)
      // Remove loading state after brief transition for smooth effect
      setTimeout(() => setIsCategoryTransitioning(false), 150)
    }
  }

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setSearchQuery(query)
    setCurrentPage(1)
    setIsSearching(true)
    setIsSearchMode(true)
    setSearchError(null)

    try {
      const res = await fetch(`/api/prompts?search=${encodeURIComponent(query)}&page=1&limit=20`)
      if (!res.ok) {
        throw new Error('検索に失敗しました。もう一度お試しください。')
      }
      const data = await res.json()
      const results = (data.prompts || []).filter((p: Prompt) => p)
      setSearchResults(results)
      setSearchPagination(data.pagination || {
        page: 1,
        limit: 20,
        total: 0,
        pages: 0,
      })
      router.push(`/?search=${encodeURIComponent(query)}&page=1`)
    } catch (error) {
      console.error('Failed to search:', error)
      setSearchError(error instanceof Error ? error.message : '検索中にエラーが発生しました。')
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
    setSearchError(null)
    setCurrentPage(1)
    router.push('/')
  }

  // Retry function for loading
  const handleRetryLoad = () => {
    setIsLoading(true)
    setError(null)
    const fetchData = async () => {
      try {
        const [catsRes, promptsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch(`/api/prompts?page=${currentPage}&limit=20`),
        ])

        if (!catsRes.ok || !promptsRes.ok) {
          throw new Error('データの取得に失敗しました。もう一度お試しください。')
        }

        const catsData = await catsRes.json()
        const promptsData = await promptsRes.json()

        setCategories(catsData)
        setPrompts(promptsData.prompts || [])
        setPagination(promptsData.pagination || {
          page: currentPage,
          limit: 20,
          total: 0,
          pages: 0,
        })
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setError(error instanceof Error ? error.message : 'ページの読み込みに失敗しました。')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }

  // Handle pagination page change
  const handlePageChange = (page: number) => {
    if (isSearchMode) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}&page=${page}`)
    } else if (selectedCategory) {
      router.push(`/?category=${selectedCategory}&page=${page}`)
    } else {
      router.push(`/?page=${page}`)
    }
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle search pagination
  const handleSearchPageChange = async (page: number) => {
    try {
      const res = await fetch(
        `/api/prompts?search=${encodeURIComponent(searchQuery)}&page=${page}&limit=20`
      )
      if (!res.ok) {
        throw new Error('ページの読み込みに失敗しました。')
      }
      const data = await res.json()
      const results = (data.prompts || []).filter((p: Prompt) => p)
      setSearchResults(results)
      setSearchPagination(data.pagination || {
        page,
        limit: 20,
        total: 0,
        pages: 0,
      })
      router.push(`/?search=${encodeURIComponent(searchQuery)}&page=${page}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Failed to fetch search page:', error)
      setSearchError(error instanceof Error ? error.message : 'ページの読み込みに失敗しました。')
    }
  }

  // Filter prompts based on selected category or search mode
  const filteredPrompts = isSearchMode
    ? searchResults
    : selectedCategory
      ? prompts.filter(p => p.category.slug === selectedCategory)
      : prompts

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Category Navigation Bar - Wrapped in Suspense */}
      <Suspense fallback={null}>
        <CategoryNavigation
          categories={categories}
          isLoading={isLoading}
          onCategoryChange={handleSelectedCategoryChange}
          onSearch={handleSearch}
          onSearchClear={handleSearchClear}
          isSearching={isSearching}
        />
      </Suspense>

      {/* Hero Section - Optimized with proper spacing */}
      <section style={{ backgroundColor: '#f8fafc', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px', color: '#0f172a', lineHeight: 1.3 }}>
              AIを使いこなすための<span style={{ color: '#0284c7' }}>プロンプト集</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#475569', marginBottom: '28px', lineHeight: 1.6 }}>
              ChatGPT、Claude、その他のAIツール向けの高品質なプロンプトを無料で提供。
              <br className="hidden sm:block" />
              仕事の効率化から創造性の向上まで、あらゆるシーンで役立つプロンプト。
            </p>

            <p style={{ fontSize: '14px', color: '#0284c7', fontWeight: 500 }}>
              💡 上部のナビゲーションバーから簡単に検索できます
            </p>
          </div>
        </div>
      </section>

      {/* Featured Prompts - Optimized */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              {isSearchMode
                ? `検索結果: "${searchQuery}"`
                : selectedCategory
                  ? 'カテゴリプロンプト'
                  : '人気のプロンプト'}
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              {isSearchMode
                ? `${filteredPrompts.length}個見つかりました`
                : selectedCategory
                  ? categories.find(c => c.slug === selectedCategory)?.name
                  : 'トレンドプロンプト'}
            </h2>
          </div>

          {error ? (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', margin: 0 }}>データの読み込みエラー</h2>
              <p style={{ color: '#475569', maxWidth: '600px', margin: '12px auto 24px auto' }}>
                {error}
              </p>
              <button
                onClick={handleRetryLoad}
                style={{ display: 'inline-block', paddingLeft: '24px', paddingRight: '24px', paddingTop: '12px', paddingBottom: '12px', backgroundColor: '#dc2626', color: '#ffffff', borderRadius: '6px', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              >
                もう一度試す
              </button>
            </div>
          ) : isLoading ? (
            <div className="auto-grid-responsive">
              {Array.from({ length: 12 }).map((_, i) => (
                <PromptCardSkeleton key={i} />
              ))}
            </div>
          ) : isSearching ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground">検索中...</p>
              </div>
            </div>
          ) : searchError ? (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: '12px' }}>検索エラー</h2>
              <p style={{ color: '#475569', maxWidth: '600px', margin: '12px auto 24px auto' }}>
                {searchError}
              </p>
              <button
                onClick={handleSearchClear}
                style={{ display: 'inline-block', paddingLeft: '24px', paddingRight: '24px', paddingTop: '12px', paddingBottom: '12px', backgroundColor: '#dc2626', color: '#ffffff', borderRadius: '6px', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              >
                検索をクリア
              </button>
            </div>
          ) : isSearchMode && filteredPrompts.length === 0 ? (
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fed7aa', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: '12px' }}>該当する内容が見つかりませんでした</h2>
              <p style={{ color: '#475569', maxWidth: '600px', margin: '12px auto 24px auto' }}>
                「{searchQuery}」に一致するプロンプトはありません。
                <br />
                別のキーワードで試してください。
              </p>
              <button
                onClick={handleSearchClear}
                style={{ display: 'inline-block', paddingLeft: '24px', paddingRight: '24px', paddingTop: '12px', paddingBottom: '12px', backgroundColor: '#0284c7', color: '#ffffff', borderRadius: '6px', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
              >
                検索をクリア
              </button>
            </div>
          ) : filteredPrompts.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', paddingTop: '48px', paddingBottom: '48px' }}>
              {selectedCategory
                ? 'このカテゴリにはプロンプトがありません。'
                : 'プロンプトはまだ利用できません。'}
            </div>
          ) : (
            <>
              <div
                className="auto-grid-responsive transition-opacity duration-150"
                style={{
                  opacity: isCategoryTransitioning ? 0.5 : 1,
                }}
              >
                {filteredPrompts.map((prompt) => (
                <Link
                  key={prompt.id}
                  href={`/prompt/${prompt.id}`}
                  className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                >
                  {/* 画像 */}
                  <div className="relative w-full bg-gray-100 overflow-hidden flex-shrink-0" style={{paddingBottom: '100%'}}>
                    {prompt.images && prompt.images.length > 0 ? (
                      <img
                        src={getImageProxyUrl(prompt.images[0].url)}
                        alt={prompt.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        🎯
                      </div>
                    )}
                  </div>

                  {/* コンテンツ */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '12px', fontSize: '16px', lineHeight: 1.4, color: '#0f172a' }} className="line-clamp-2">
                      {prompt.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#475569', marginBottom: '16px', flex: 1, lineHeight: 1.5 }} className="line-clamp-2">
                      {prompt.description}
                    </p>

                    {/* タグ */}
                    {(() => {
                      let tags = []
                      if (prompt.tags) {
                        if (typeof prompt.tags === 'string') {
                          try {
                            tags = JSON.parse(prompt.tags)
                          } catch {
                            tags = []
                          }
                        } else if (Array.isArray(prompt.tags)) {
                          tags = prompt.tags
                        }
                      }
                      return tags && tags.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                          {tags.slice(0, 3).map((tag: any, idx: number) => (
                            <TagChip
                              key={typeof tag === 'string' ? `tag-${idx}` : tag.id}
                              name={typeof tag === 'string' ? tag : tag.name}
                              color={typeof tag === 'string' ? undefined : tag.color}
                            />
                          ))}
                          {tags.length > 3 && (
                            <span style={{ fontSize: '12px', color: '#64748b', paddingLeft: '8px' }}>
                              +{tags.length - 3}
                            </span>
                          )}
                        </div>
                      ) : null
                    })()}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '12px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#0284c7', paddingLeft: '10px', paddingRight: '10px', paddingTop: '4px', paddingBottom: '4px', borderRadius: '4px', fontWeight: 500 }}>
                        {prompt.category.name}
                      </span>
                    </div>
                  </div>
                </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {isSearchMode ? (
                <Pagination
                  currentPage={searchPagination.page}
                  totalPages={searchPagination.pages}
                  onPageChange={handleSearchPageChange}
                />
              ) : (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', paddingTop: '60px', paddingBottom: '40px', borderTop: '1px solid #1e293b' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontWeight: 700, color: '#ffffff', marginBottom: '12px', fontSize: '18px' }}>プロンプタ</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                AIプロンプトの共有プラットフォーム。ChatGPT、Claudeなど様々なAIに対応。
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '12px', fontSize: '14px' }}>ナビゲーション</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                    ホーム
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link href="#categories" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', fontSize: '14px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                    カテゴリ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '12px', fontSize: '14px' }}>言語</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>日本語 (日本)</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
            <p style={{ margin: 0 }}>&copy; 2024 Prompta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}
