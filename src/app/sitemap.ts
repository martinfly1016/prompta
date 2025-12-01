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
    // Try multiple URLs in order of preference
    const urls = [
      'https://www.prompta.jp/api/prompts?limit=10000',  // Production domain
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/prompts?limit=10000` : null,
      process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/prompts?limit=10000` : null,
      'http://localhost:3000/api/prompts?limit=10000'  // Fallback for local dev
    ].filter(Boolean) as string[]

    let data = null
    for (const url of urls) {
      try {
        console.log('Attempting to fetch prompts from:', url)
        const res = await fetch(url, {
          next: { revalidate: 3600 } // Cache for 1 hour
        })

        if (res.ok) {
          data = await res.json()
          console.log('Successfully fetched prompts from:', url, 'Count:', data.prompts?.length || 0)
          return data.prompts || []
        }
      } catch (e) {
        console.error('Failed to fetch from', url, ':', e)
        continue
      }
    }

    console.error('Failed to fetch prompts from all URLs')
    return []
  } catch (error) {
    console.error('Failed to fetch prompts for sitemap:', error)
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const urls = [
      'https://www.prompta.jp/api/categories',
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/categories` : null,
      process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/categories` : null,
      'http://localhost:3000/api/categories'
    ].filter(Boolean) as string[]

    for (const url of urls) {
      try {
        const res = await fetch(url, {
          next: { revalidate: 3600 }
        })

        if (res.ok) {
          const data = await res.json()
          console.log('Successfully fetched categories from:', url, 'Count:', data?.length || 0)
          return data || []
        }
      } catch (e) {
        console.error('Failed to fetch categories from', url)
        continue
      }
    }

    return []
  } catch (error) {
    console.error('Failed to fetch categories for sitemap:', error)
    return []
  }
}

async function getTags(): Promise<Tag[]> {
  try {
    const urls = [
      'https://www.prompta.jp/api/tags',
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/tags` : null,
      process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/tags` : null,
      'http://localhost:3000/api/tags'
    ].filter(Boolean) as string[]

    for (const url of urls) {
      try {
        const res = await fetch(url, {
          next: { revalidate: 3600 }
        })

        if (res.ok) {
          const data = await res.json()
          console.log('Successfully fetched tags from:', url, 'Count:', data.tags?.length || 0)
          return data.tags || []
        }
      } catch (e) {
        console.error('Failed to fetch tags from', url)
        continue
      }
    }

    return []
  } catch (error) {
    console.error('Failed to fetch tags for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.prompta.jp'

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
