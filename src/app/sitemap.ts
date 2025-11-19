import type { MetadataRoute } from 'next'

interface Prompt {
  id: string
  createdAt: string
  updatedAt?: string
}

interface Category {
  slug: string
  updatedAt?: string
}

interface Tag {
  slug: string
  updatedAt?: string
}

async function getPrompts(): Promise<Prompt[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/prompts?limit=10000`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.prompts || []
  } catch (error) {
    console.error('Failed to fetch prompts for sitemap:', error)
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/categories`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return []
    const data = await res.json()
    return data || []
  } catch (error) {
    console.error('Failed to fetch categories for sitemap:', error)
    return []
  }
}

async function getTags(): Promise<Tag[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/tags`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.tags || []
  } catch (error) {
    console.error('Failed to fetch tags for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://prompta.jp'

  // Fetch all data in parallel
  const [prompts, categories, tags] = await Promise.all([
    getPrompts(),
    getCategories(),
    getTags(),
  ])

  const routes: MetadataRoute.Sitemap = []

  // Homepage
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  })

  // All prompts page
  routes.push({
    url: `${baseUrl}/all-prompts`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  })

  // Category pages
  categories.forEach((category: any) => {
    routes.push({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: category.updatedAt ? new Date(category.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Tag pages
  tags.forEach((tag: any) => {
    routes.push({
      url: `${baseUrl}/tag/${tag.slug}`,
      lastModified: tag.updatedAt ? new Date(tag.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Prompt detail pages
  prompts.forEach((prompt: any) => {
    routes.push({
      url: `${baseUrl}/prompt/${prompt.id}`,
      lastModified: prompt.updatedAt ? new Date(prompt.updatedAt) : new Date(prompt.createdAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return routes
}
