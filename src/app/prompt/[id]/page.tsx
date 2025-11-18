'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Copy, Check, Share2 } from 'lucide-react'
import { ImageGallery } from '@/components/ImageGallery'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import SkeletonNav from '@/components/SkeletonNav'

// Helper function to slugify tag names (supports Japanese and other languages)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g, '') // Keep Japanese characters
}

interface PromptImage {
  id: string
  url: string
  altText?: string
  imageType: string // 'effect' or 'original'
  parentImageId?: string | null // Reference to effect image for original images
  originalImages?: PromptImage[] // Original images for this effect image
}

interface Tag {
  id: string
  name: string
  color?: string
}

interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  _count?: { prompts: number }
}

interface Prompt {
  id: string
  title: string
  description: string
  content: string
  category: { name: string; slug: string }
  tags?: Tag[] | string
  createdAt: string
  images?: PromptImage[]
}

// Navigation component for detail page
function CategoryNavigation({
  categories,
  isLoading,
  onSearch,
  onSearchClear,
}: {
  categories: Category[]
  isLoading: boolean
  onSearch: (query: string) => void
  onSearchClear: () => void
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
            onSearch={onSearch}
            onClear={onSearchClear}
            isSearching={false}
          />
        </nav>
      )}
    </>
  )
}

export default function PromptPage() {
  const params = useParams()
  const id = params.id as string

  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to homepage which has built-in search functionality
      const encodedQuery = encodeURIComponent(query)
      window.location.href = `/?search=${encodedQuery}`
    }
  }

  const handleSearchClear = () => {
    window.location.href = '/'
  }

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(`/api/prompts/${id}`)
        const data = await res.json()
        setPrompt(data)
      } catch (error) {
        console.error('Failed to fetch prompt:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrompt()
  }, [id])

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
      <>
        <Suspense fallback={null}>
          <CategoryNavigation
            categories={categories}
            isLoading={categoriesLoading}
            onSearch={handleSearch}
            onSearchClear={handleSearchClear}
          />
        </Suspense>
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
            読み込み中...
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!prompt) {
    return (
      <>
        <Suspense fallback={null}>
          <CategoryNavigation
            categories={categories}
            isLoading={categoriesLoading}
            onSearch={handleSearch}
            onSearchClear={handleSearchClear}
          />
        </Suspense>
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-muted-foreground">プロンプトが見つかりません</p>
            <Link href="/" className="text-primary hover:underline mt-4 inline-block">
              ホームに戻る
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Parse tags from string or array
  const parseTags = (): string[] => {
    if (!prompt.tags) return []
    if (typeof prompt.tags === 'string') {
      try {
        const parsed = JSON.parse(prompt.tags)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return Array.isArray(prompt.tags) ? prompt.tags.map(t => (typeof t === 'string' ? t : t.name)) : []
  }

  const tagList = parseTags()

  return (
    <>
      <Suspense fallback={null}>
        <CategoryNavigation
          categories={categories}
          isLoading={categoriesLoading}
          onSearch={handleSearch}
          onSearchClear={handleSearchClear}
        />
      </Suspense>
      <main className="min-h-screen bg-background">
        {/* Fixed 1280px width container for main content */}
        <div className="mx-auto px-6 py-8" style={{ maxWidth: '1280px' }}>
          {/* Main Content */}
          <article className="space-y-6">
            {/* Header - Card Style - White Background */}
            <div className="rounded-lg space-y-4" style={{ backgroundColor: '#ffffff', padding: '32px' }}>
              <h1 className="text-2xl font-bold text-foreground">{prompt.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{prompt.description}</p>

              <div className="flex items-center gap-4 pt-4 flex-wrap" style={{ borderTop: '1px solid #e2e8f0' }}>
                {prompt.category && (
                  <span
                    className="text-xs px-4 py-2 rounded-full font-medium"
                    style={{
                      backgroundColor: 'rgba(2, 132, 199, 0.1)',
                      color: '#0284c7'
                    }}
                  >
                    {prompt.category.name}
                  </span>
                )}
              </div>
            </div>

            {/* Clickable Tags Section - Separate Card */}
            {tagList.length > 0 && (
              <div className="rounded-lg" style={{ backgroundColor: '#faf5ff', padding: '24px' }}>
                <div className="flex flex-wrap" style={{ gap: '16px', rowGap: '16px' }}>
                  {tagList.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/tag/${slugify(tag)}`}
                      className="rounded-full font-medium transition-all duration-200 hover:opacity-80 no-underline"
                      style={{
                        display: 'inline-block',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        fontSize: '1rem',
                        backgroundColor: 'transparent',
                        color: '#9333ea',
                        border: '1px solid #9333ea',
                        textDecoration: 'none'
                      }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Image Gallery - Card Style - Light Gray Background */}
            {prompt.images && prompt.images.length > 0 && (
              <div className="rounded-lg space-y-4" style={{ backgroundColor: '#f1f5f9', padding: '32px' }}>
                <h2 className="text-xl font-semibold text-foreground">効果画像</h2>
                <ImageGallery images={prompt.images} />
              </div>
            )}

            {/* Tags - Duplicate section removed as tags are already displayed above */}

            {/* Spacing divider */}
            <div className="h-4"></div>

            {/* Content - Apple Style Design - White Background */}
            <div className="rounded-lg space-y-4" style={{ backgroundColor: '#ffffff', padding: '32px' }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-semibold" style={{ color: '#1d1d1f' }}>
                  プロンプト
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-white font-medium transition-all duration-200"
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#0071e3',
                      borderRadius: '980px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0, 113, 227, 0.15)',
                      fontSize: '15px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0077ed'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 113, 227, 0.25)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0071e3'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 113, 227, 0.15)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        コピーしました
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        コピー
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 font-medium transition-all duration-200"
                    style={{
                      padding: '10px 24px',
                      backgroundColor: 'transparent',
                      borderRadius: '980px',
                      border: '1.5px solid #0071e3',
                      color: '#0071e3',
                      cursor: 'pointer',
                      fontSize: '15px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 113, 227, 0.08)'
                      e.currentTarget.style.borderColor = '#0077ed'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.borderColor = '#0071e3'
                    }}
                  >
                    <Share2 size={16} />
                    共有
                  </button>
                </div>
              </div>

              {/* Code container with shallow gray background */}
              <div style={{
                background: '#f5f5f7',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #e5e5e7'
              }}>
                <pre style={{
                  padding: '24px',
                  color: '#1d1d1f',
                  margin: 0,
                  fontFamily: "'SF Mono', 'Monaco', 'Menlo', monospace",
                  fontSize: '15px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  overflowX: 'auto'
                }}>
                  {prompt.content}
                </pre>
              </div>
            </div>

            {/* Info - Apple Style Design - Light Gray Background */}
            <div className="rounded-lg" style={{ backgroundColor: '#fafafa', border: '1px solid #e5e5e7', padding: '32px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)' }}>
              <h3 className="font-medium mb-6 flex items-center gap-2" style={{ fontSize: '14px', color: '#6e6e73' }}>
                <span className="text-xl">💡</span>
                このプロンプトの使い方
              </h3>
              <ul className="space-y-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <li className="flex items-start gap-4">
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#0071e3',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '12px',
                      fontWeight: '600',
                      flexShrink: 0,
                      marginTop: '3px'
                    }}
                  >
                    1
                  </span>
                  <span style={{ fontSize: '14px', color: '#6e6e73', lineHeight: '1.5' }}>上の「コピー」ボタンをクリックしてプロンプトをコピーします</span>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#0071e3',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '12px',
                      fontWeight: '600',
                      flexShrink: 0,
                      marginTop: '3px'
                    }}
                  >
                    2
                  </span>
                  <span style={{ fontSize: '14px', color: '#6e6e73', lineHeight: '1.5' }}>ChatGPT、Claude、その他のAIツールのチャット欄に貼り付けます</span>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#0071e3',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '12px',
                      fontWeight: '600',
                      flexShrink: 0,
                      marginTop: '3px'
                    }}
                  >
                    3
                  </span>
                  <span style={{ fontSize: '14px', color: '#6e6e73', lineHeight: '1.5' }}>画像生成が必要な場合は、ご自身の画像をアップロードしてください</span>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#0071e3',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '12px',
                      fontWeight: '600',
                      flexShrink: 0,
                      marginTop: '3px'
                    }}
                  >
                    4
                  </span>
                  <span style={{ fontSize: '14px', color: '#6e6e73', lineHeight: '1.5' }}>Enterキーを押して実行します</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
