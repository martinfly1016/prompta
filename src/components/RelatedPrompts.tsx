'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getImageProxyUrl } from '@/lib/image-proxy'

interface PromptImage {
  id: string
  url: string
  imageType: string
}

interface RelatedPrompt {
  id: string
  slug?: string
  title: string
  description: string
  images?: PromptImage[]
}

interface RelatedPromptsProps {
  currentPromptId: string
  categorySlug: string
  tags: string[]
  limit?: number
}

export default function RelatedPrompts({
  currentPromptId,
  categorySlug,
  tags,
  limit = 4,
}: RelatedPromptsProps) {
  const [relatedPrompts, setRelatedPrompts] = useState<RelatedPrompt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const params = new URLSearchParams({
          excludeId: currentPromptId,
          category: categorySlug,
          tags: tags.join(','),
          limit: limit.toString(),
        })

        const res = await fetch(`/api/prompts/related?${params}`)
        if (!res.ok) {
          throw new Error('Failed to fetch related prompts')
        }

        const data = await res.json()
        setRelatedPrompts(data.prompts || [])
      } catch (error) {
        console.error('Failed to fetch related prompts:', error)
        setRelatedPrompts([])
      } finally {
        setLoading(false)
      }
    }

    fetchRelated()
  }, [currentPromptId, categorySlug, tags, limit])

  // Don't render if loading or no related prompts
  if (loading || relatedPrompts.length === 0) {
    return null
  }

  return (
    <section
      className="rounded-lg"
      style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e5e5e7',
        padding: '32px',
        marginTop: '24px',
      }}
    >
      <h2
        className="font-semibold mb-6"
        style={{
          fontSize: '18px',
          color: '#1d1d1f',
        }}
      >
        関連するプロンプト
      </h2>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        {relatedPrompts.map((prompt) => {
          // Get the display image (prefer effect images)
          const effectImages = prompt.images?.filter(
            (img) => img.imageType === 'effect'
          )
          const displayImage =
            effectImages && effectImages.length > 0
              ? effectImages[effectImages.length - 1]
              : prompt.images?.[0]

          // Use slug if available, otherwise fall back to id
          const promptUrl = `/prompt/${prompt.slug || prompt.id}`

          return (
            <Link
              key={prompt.id}
              href={promptUrl}
              className="group block bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div
                className="relative w-full bg-gray-100 overflow-hidden"
                style={{ paddingBottom: '100%' }}
              >
                {displayImage ? (
                  <Image
                    src={getImageProxyUrl(displayImage.url)}
                    alt={prompt.title}
                    width={200}
                    height={200}
                    quality={75}
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl bg-gray-50">
                    🎯
                  </div>
                )}
              </div>

              {/* Title */}
              <div style={{ padding: '12px' }}>
                <h3
                  className="line-clamp-2 group-hover:text-blue-600 transition-colors"
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0f172a',
                    lineHeight: 1.4,
                  }}
                >
                  {prompt.title}
                </h3>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
