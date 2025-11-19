import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Footer from '@/components/Footer'
import { generatePromptSchema, generateBreadcrumbSchema } from '@/lib/schema'
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

  return {
    title: `${prompt.title} | Prompta`,
    description: prompt.description,
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      type: 'article',
      url: `https://prompta.jp/prompt/${id}`,
      images: prompt.images && prompt.images.length > 0
        ? [{ url: prompt.images[0].url, alt: prompt.title }]
        : []
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.title,
      description: prompt.description,
    }
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

  // Generate schema markup for SEO
  const baseUrl = 'https://prompta.jp'
  const promptSchema = generatePromptSchema(prompt, { baseUrl, siteName: 'Prompta' })
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'ホーム', url: '/' },
      { name: prompt.category.name, url: `/category/${prompt.category.slug}` },
      { name: prompt.title, url: `/prompt/${id}` }
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
        <PromptPageClient prompt={prompt} promptId={id} />
      </Suspense>
      <Footer />
    </>
  )
}
