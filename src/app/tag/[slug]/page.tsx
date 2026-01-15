import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getImageProxyUrl } from '@/lib/image-proxy'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

interface Prompt {
  id: string
  slug?: string | null
  title: string
  description: string
  createdAt: Date | string
  category: { name: string; slug: string }
  images?: any[]
  tags: string | null
}

interface TagInfo {
  name: string
  slug: string
  count: number
}

// Helper function to slugify tag names (supports Japanese and other languages)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g, '')
}

// Fetch all tags with their counts
async function getAllTags(): Promise<TagInfo[]> {
  try {
    const prompts = await prisma.prompt.findMany({
      where: { isPublished: true },
      select: { tags: true },
    })

    const tagCountMap = new Map<string, number>()
    for (const prompt of prompts) {
      if (prompt.tags) {
        try {
          const parsedTags = JSON.parse(prompt.tags)
          if (Array.isArray(parsedTags)) {
            for (const tag of parsedTags) {
              const tagName = typeof tag === 'string' ? tag : tag.name || ''
              if (tagName) {
                tagCountMap.set(tagName, (tagCountMap.get(tagName) || 0) + 1)
              }
            }
          }
        } catch (e) {
          console.warn('Failed to parse tags:', prompt.tags)
        }
      }
    }

    return Array.from(tagCountMap.entries()).map(([name, count]) => ({
      name,
      slug: slugify(name),
      count,
    }))
  } catch (error) {
    console.error('Failed to fetch tags:', error)
    return []
  }
}

// Fetch prompts for a specific tag
async function getPromptsForTag(tagName: string): Promise<Prompt[]> {
  try {
    const prompts = await prisma.prompt.findMany({
      where: { isPublished: true },
      include: {
        category: { select: { name: true, slug: true } },
        images: { orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Filter prompts by tag
    return prompts
      .filter((p) => {
        if (!p.tags) return false
        try {
          const parsedTags = JSON.parse(p.tags)
          const tags = Array.isArray(parsedTags)
            ? parsedTags.map(t => (typeof t === 'string' ? t : t.name || ''))
            : []
          return tags.some(t => t.toLowerCase() === tagName.toLowerCase())
        } catch {
          return false
        }
      })
      .map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        createdAt: p.createdAt,
        category: p.category,
        images: p.images,
        tags: p.tags,
      }))
  } catch (error) {
    console.error('Failed to fetch prompts:', error)
    return []
  }
}

// Generate static params for all tags
export async function generateStaticParams() {
  const allTags = await getAllTags()
  return allTags.map((tag) => ({
    slug: tag.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const decodedSlug = decodeURIComponent(slug)

  const allTags = await getAllTags()
  const currentTag = allTags.find(
    (t) => t.slug === slug || t.name.toLowerCase() === decodedSlug.toLowerCase()
  )

  if (!currentTag) {
    return {
      title: 'タグが見つかりません',
      description: 'リクエストされたタグが見つかりません。',
    }
  }

  const baseUrl = 'https://www.prompta.jp'
  // Use the original tag name for canonical URL to ensure consistency
  const canonicalSlug = encodeURIComponent(currentTag.name)

  return {
    title: `${currentTag.name} - プロンプタ`,
    description: `${currentTag.name}タグに関連する${currentTag.count}個のプロンプト。AI、デザイン、プログラミングなど、様々な用途のプロンプト集。`,
    keywords: [currentTag.name, 'プロンプト', 'AI', 'ChatGPT'],
    openGraph: {
      title: `${currentTag.name} - プロンプタ`,
      description: `${currentTag.name}タグに関連する${currentTag.count}個のプロンプト`,
      url: `${baseUrl}/tag/${canonicalSlug}`,
      type: 'website',
      locale: 'ja_JP',
    },
    alternates: {
      canonical: `${baseUrl}/tag/${canonicalSlug}`,
    },
  }
}

export default async function TagPage({ params }: Props) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const decodedSlug = decodeURIComponent(slug)

  // Fetch data on the server
  const allTags = await getAllTags()

  const currentTag = allTags.find(
    (t) => t.slug === slug || t.name.toLowerCase() === decodedSlug.toLowerCase()
  )

  if (!currentTag) {
    return (
      <>
        <main className="min-h-screen bg-gray-50">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-6xl mb-4">🚫</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">タグが見つかりません</h1>
              <p className="text-gray-600 mb-6">
                リクエストされたタグが見つかりません。
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const prompts = await getPromptsForTag(currentTag.name)

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                {currentTag.name}
              </h1>
              <div className="mt-6 text-base font-semibold text-purple-600 dark:text-purple-400">
                全 {prompts.length} 件のプロンプト
              </div>
            </div>

            {/* All Tags Display - Horizontal Scrollable */}
            {allTags.length > 0 && (
              <div className="mt-16 mb-12">
                <div className="flex flex-wrap gap-3">
                  {allTags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/tag/${tag.slug}`}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        tag.slug === slug
                          ? 'bg-[#9333ea] text-white shadow-md'
                          : 'bg-transparent text-[#9333ea] border border-[#9333ea] hover:bg-[#faf5ff]'
                      }`}
                    >
                      {tag.name} ({tag.count})
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Prompts Section */}
        <section style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '60px' }}>
          <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
            {prompts.length === 0 ? (
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
              <div className="auto-grid-responsive">
                {prompts.map((prompt, index) => (
                  <Link
                    key={prompt.id}
                    href={`/prompt/${prompt.slug || prompt.id}`}
                    className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                  >
                    {/* 画像 */}
                    <div className="relative w-full bg-gray-100 overflow-hidden flex-shrink-0" style={{ paddingBottom: '100%' }}>
                      {prompt.images && prompt.images.length > 0 ? (() => {
                        const effectImages = prompt.images.filter((img: any) => img.imageType === 'effect')
                        const displayImage = effectImages.length > 0 ? effectImages[effectImages.length - 1] : prompt.images[0]
                        return (
                          <Image
                            src={getImageProxyUrl(displayImage.url)}
                            alt={prompt.title}
                            width={400}
                            height={300}
                            quality={80}
                            priority={index === 0}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
