'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import Footer from '@/components/Footer'
import SkeletonNav from '@/components/SkeletonNav'
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
  createdAt: string
  category: { name: string; slug: string }
  images?: PromptImage[]
  tags?: string | Tag[]
}

interface TagInfo {
  name: string
  slug: string
  count: number
}

interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  _count?: { prompts: number }
}

// Navigation component for tag page
function CategoryNavigation({
  categories,
  isLoading,
}: {
  categories: Category[]
  isLoading: boolean
}) {
  const router = useRouter()

  const handleCategoryClick = (categorySlug: string | null) => {
    if (categorySlug) {
      router.push(`/?category=${categorySlug}`)
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
            className="category-nav-item"
          >
            <span className="category-nav-icon">📂</span>
            <span>全部</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="category-nav-item"
            >
              <span className="category-nav-icon">{cat.icon || '📌'}</span>
              <span>{cat.name}</span>
            </button>
          ))}
          <div className="search-bar-nav-spacer"></div>
          <SearchBar
            onSearch={() => {}}
            onClear={() => {}}
            isSearching={false}
          />
        </nav>
      )}
    </>
  )
}

export default function TagPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [allTags, setAllTags] = useState<TagInfo[]>([])
  const [currentTag, setCurrentTag] = useState<TagInfo | null>(null)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Prompt[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [isSearchTransitioning, setIsSearchTransitioning] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  // Helper function to check if tag matches (case-insensitive)
  const parseTagsFromPrompt = (tags: string | Tag[] | undefined): string[] => {
    if (!tags) return []
    if (typeof tags === 'string') {
      try {
        const parsed = JSON.parse(tags)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return Array.isArray(tags) ? tags.map(t => (typeof t === 'string' ? t : t.name)) : []
  }

  const tagMatches = (promptTags: string | Tag[] | undefined, targetTag: string): boolean => {
    const tags = parseTagsFromPrompt(promptTags)
    return tags.some(t => t.toLowerCase() === targetTag.toLowerCase())
  }

  // Fetch categories for navigation
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags')
        const data = await res.json()
        setAllTags(data.tags || [])

        // Find current tag - compare case-insensitively and handle both encoded/decoded slugs
        const found = data.tags.find((t: TagInfo) =>
          t.slug === slug || t.name.toLowerCase() === decodeURIComponent(slug).toLowerCase()
        )
        if (found) {
          setCurrentTag(found)
        } else {
          console.warn('Tag not found:', slug, 'Available tags:', data.tags.map((t: TagInfo) => t.slug))
          // Tag not found, redirect to home
          router.push('/')
          return
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error)
        router.push('/')
      }
    }

    const fetchPrompts = async () => {
      try {
        const res = await fetch('/api/prompts?limit=100')
        const data = await res.json()

        // Filter prompts by current tag - use the decoded slug for comparison
        const decodedSlug = decodeURIComponent(slug)
        const filtered = (data.prompts || []).filter((p: Prompt) =>
          tagMatches(p.tags, decodedSlug)
        )

        setPrompts(filtered)
      } catch (error) {
        console.error('Failed to fetch prompts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTags()
    fetchPrompts()
  }, [slug, router])

  // Handle tag switch
  const handleTagSwitch = (tagSlug: string) => {
    if (tagSlug !== slug) {
      router.push(`/tag/${tagSlug}`)
    }
  }

  // Handle search within tag
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
        (p: Prompt) => tagMatches(p.tags, slug)
      )
      setSearchResults(results)
    } catch (error) {
      console.error('Failed to search:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
      setTimeout(() => setIsSearchTransitioning(false), 150)
    }
  }

  // Handle search clear
  const handleSearchClear = () => {
    setIsSearchTransitioning(true)
    setSearchQuery('')
    setSearchResults([])
    setIsSearchMode(false)
    setTimeout(() => setIsSearchTransitioning(false), 150)
  }

  // Filter prompts based on search mode
  const filteredPrompts = isSearchMode ? searchResults : prompts

  if (isLoading) {
    return (
      <>
        <Suspense fallback={null}>
          <CategoryNavigation categories={categories} isLoading={categoriesLoading} />
        </Suspense>
        <main className="min-h-screen bg-gray-50">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">読み込み中...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Suspense fallback={null}>
        <CategoryNavigation categories={categories} isLoading={categoriesLoading} />
      </Suspense>
      <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {currentTag && (
        <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              ホームに戻る
            </Link>

            <div className="max-w-3xl mb-12">
              <div className="text-6xl mb-6">🏷️</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">{currentTag.name}</h1>
              <div className="mt-6 text-base font-semibold text-purple-600 dark:text-purple-400">
                全 {isSearchMode ? filteredPrompts.length : prompts.length} 件のプロンプト
              </div>
            </div>

            {/* All Tags Display - Horizontal Scrollable */}
            {allTags.length > 0 && (
              <div className="mt-16 mb-12">
                <div className="flex flex-wrap gap-3">
                  {allTags.map((tag) => (
                    <button
                      key={tag.slug}
                      onClick={() => handleTagSwitch(tag.slug)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        tag.slug === slug
                          ? 'bg-[#9333ea] text-white shadow-md'
                          : 'bg-transparent text-[#9333ea] border border-[#9333ea] hover:bg-[#faf5ff]'
                      }`}
                    >
                      {tag.name} ({tag.count})
                    </button>
                  ))}
                </div>
              </div>
            )}

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

      <section style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          {isSearching ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground">検索中...</p>
              </div>
            </div>
          ) : isSearchMode && filteredPrompts.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">該当する内容が見つかりませんでした</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                「{searchQuery}」に一致するプロンプトはありません。
                <br />
                別のキーワードで試してください。
              </p>
              <button
                onClick={handleSearchClear}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                検索をクリア
              </button>
            </div>
          ) : prompts.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">プロンプトがありません</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                このタグに該当するプロンプトがありません。
                <br />
                別のタグを試してください。
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
                className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-md"
              >
                {/* 画像 */}
                <div className="relative w-full bg-gray-100 overflow-hidden flex-shrink-0" style={{paddingBottom: '100%'}}>
                  {prompt.images && prompt.images.length > 0 ? (() => {
                    const effectImages = prompt.images.filter((img: any) => img.imageType === 'effect')
                    const displayImage = effectImages.length > 0 ? effectImages[effectImages.length - 1] : prompt.images[0]
                    return (
                      <img
                        src={getImageProxyUrl(displayImage.url)}
                        alt={prompt.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )
                  })() : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                      ✨
                    </div>
                  )}
                </div>

                {/* コンテンツ */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold mb-2 text-base leading-snug text-gray-900 line-clamp-2">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1 leading-relaxed">
                    {prompt.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
