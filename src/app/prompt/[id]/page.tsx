import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'
import { generatePromptSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { generateMetaDescription } from '@/lib/seo'
import { isCuid } from '@/lib/slug'
import PromptPageClient from './page.client'

// This page is not cached - always fetches fresh data
export const dynamic = 'force-dynamic'

interface PromptImage {
  id: string
  url: string
  altText?: string
  imageType: string
  parentImageId?: string | null
  originalImages?: PromptImage[]
}

interface Tag {
  id: string
  name: string
  color?: string
}

interface Prompt {
  id: string
  slug?: string | null
  title: string
  description: string
  content: string
  category: { name: string; slug: string }
  tags?: Tag[] | string
  createdAt: string
  images?: PromptImage[]
}

// Fetch prompt data on the server
async function getPrompt(id: string): Promise<Prompt | null> {
  try {
    // For server-side rendering, construct the absolute URL using VERCEL_URL
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/prompts/${id}`)
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Failed to fetch prompt:', error)
    return null
  }
}

// Generate dynamic metadata for the prompt page
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const prompt = await getPrompt(id)

  if (!prompt) {
    return {
      title: 'プロンプトが見つかりません',
      description: 'リクエストされたプロンプトが見つかりません。'
    }
  }

  const optimizedDescription = generateMetaDescription({
    title: prompt.title,
    description: prompt.description,
    category: prompt.category,
  })

  // Use slug for canonical URL if available, otherwise use ID
  const promptUrlPath = prompt.slug || prompt.id

  return {
    title: `${prompt.title} | Prompta`,
    description: optimizedDescription,
    openGraph: {
      title: prompt.title,
      description: optimizedDescription,
      type: 'article',
      url: `https://www.prompta.jp/prompt/${promptUrlPath}`,
      images: prompt.images && prompt.images.length > 0
        ? [{ url: prompt.images[0].url, alt: prompt.title }]
        : []
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.title,
      description: optimizedDescription,
    },
    alternates: {
      canonical: `https://www.prompta.jp/prompt/${promptUrlPath}`,
    },
  }
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const prompt = await getPrompt(id)

  if (!prompt) {
    notFound()
  }

  // 301 redirect: If accessed via CUID and prompt has a slug, redirect to slug URL
  // This preserves SEO value while transitioning to new URL structure
  if (isCuid(id) && prompt.slug) {
    redirect(`/prompt/${prompt.slug}`)
  }

  // Use slug for URL if available, otherwise use ID
  const promptUrlPath = prompt.slug || prompt.id

  // Generate schema markup for SEO
  const baseUrl = 'https://www.prompta.jp'
  const promptSchema = generatePromptSchema(prompt, { baseUrl, siteName: 'Prompta' })
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'ホーム', url: '/' },
      { name: prompt.category.name, url: `/category/${prompt.category.slug}` },
      { name: prompt.title, url: `/prompt/${promptUrlPath}` }
    ],
    baseUrl
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(promptSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={null}>
        <PromptPageClient prompt={prompt} promptId={prompt.id} />
      </Suspense>
    </>
  )
}
