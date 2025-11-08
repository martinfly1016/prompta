'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Copy, Check, Share2, ArrowLeft } from 'lucide-react'
import { ImageGallery } from '@/components/ImageGallery'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import SkeletonNav from '@/components/SkeletonNav'

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
  tags?: Tag[]
  views: number
  createdAt: string
  images?: PromptImage[]
}

// Navigation component for detail page
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

export default function PromptPage() {
  const params = useParams()
  const id = params.id as string

  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

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
          <CategoryNavigation categories={categories} isLoading={categoriesLoading} />
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
          <CategoryNavigation categories={categories} isLoading={categoriesLoading} />
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

  const tags = Array.isArray(prompt.tags) ? prompt.tags : []

  return (
    <>
      <Suspense fallback={null}>
        <CategoryNavigation categories={categories} isLoading={categoriesLoading} />
      </Suspense>
      <main className="min-h-screen bg-background">
        {/* Full-width back button section */}
        <div className="px-6 py-6">
          <div className="mx-auto" style={{ maxWidth: '1280px' }}>
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft size={20} />
              ホームに戻る
            </Link>
          </div>
        </div>

        {/* Fixed 1280px width container for main content */}
        <div className="mx-auto px-6 py-8" style={{ maxWidth: '1280px' }}>
          {/* Breadcrumb */}
          {prompt.category && (
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
          )}

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
                <span className="text-sm text-muted-foreground">
                  👁️ {prompt.views}回閲覧
                </span>
              </div>
            </div>

            {/* Image Gallery - Card Style - Light Gray Background */}
            {prompt.images && prompt.images.length > 0 && (
              <div className="rounded-lg space-y-4" style={{ backgroundColor: '#f1f5f9', padding: '32px' }}>
                <h2 className="text-xl font-semibold text-foreground">効果画像</h2>
                <ImageGallery images={prompt.images} />
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="rounded-lg" style={{ backgroundColor: '#ffffff', padding: '32px' }}>
                <h3 className="text-base font-semibold text-foreground mb-4">タグ</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: Tag) => (
                    <span
                      key={tag.id}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#475569'
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Spacing divider */}
            <div className="h-4"></div>

            {/* Content - Emphasized Card Style - White Background */}
            <div className="rounded-lg border-l-4 space-y-4" style={{ backgroundColor: '#ffffff', borderLeftColor: '#0284c7', padding: '32px' }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl font-semibold" style={{ color: '#0284c7' }}>
                  プロンプト
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-white font-medium transition-all duration-200"
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#0284c7',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
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
                    className="flex items-center gap-2 font-medium transition-all duration-200"
                    style={{
                      padding: '12px 20px',
                      backgroundColor: 'transparent',
                      borderRadius: '6px',
                      border: '2px solid #0284c7',
                      color: '#0284c7',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Share2 size={18} />
                    共有
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 dark:bg-slate-950 rounded-lg overflow-hidden">
                <pre className="p-6 text-white overflow-x-auto font-mono text-sm whitespace-pre-wrap break-words">
                  {prompt.content}
                </pre>
              </div>
            </div>

            {/* Info - Card Style - Light Gray Background */}
            <div className="border-l-4 rounded-lg" style={{ backgroundColor: '#f1f5f9', borderLeftColor: '#0284c7', padding: '32px' }}>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                このプロンプトの使い方
              </h3>
              <ol className="text-base text-gray-700 dark:text-gray-300 space-y-3 list-decimal list-inside">
                <li className="font-medium">上の「コピー」ボタンをクリックしてプロンプトをコピーします</li>
                <li className="font-medium">ChatGPT、Claude、その他のAIツールのチャット欄に貼り付けます</li>
                <li className="font-medium">Enterキーを押して実行します</li>
              </ol>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
