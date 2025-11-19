# SEO 优化实施指南

## 快速开始 - 立即可实施的优化

### 第一步：创建 404 页面 (5分钟)

**文件**: `/src/app/not-found.tsx`

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          404
        </h1>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#334155' }}>
          ページが見つかりません
        </h2>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>
          申し訳ございません。お探しのページは見つかりませんでした。
        </p>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{
            padding: '12px 24px',
            backgroundColor: '#0284c7',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            ホームに戻る
          </Link>
          <Link href="/?search=" style={{
            padding: '12px 24px',
            backgroundColor: '#e2e8f0',
            color: '#0f172a',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            プロンプトを検索
          </Link>
        </div>
      </div>
    </div>
  )
}
```

---

### 第二步：为提示词详情页添加动态元数据 (30分钟)

**文件**: `/src/app/prompt/[id]/page.tsx`

在文件顶部添加：

```tsx
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  
  try {
    const res = await fetch(`http://localhost:3000/api/prompts/${id}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      return {
        title: 'プロンプト | プロンプタ',
        description: 'プロンプトが見つかりません'
      }
    }
    
    const prompt = await res.json()
    
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const imageUrl = prompt.images?.[0]?.url || `${baseUrl}/logo.png`
    
    return {
      title: `${prompt.title} | プロンプタ`,
      description: prompt.description,
      keywords: [
        prompt.title,
        prompt.category?.name,
        'プロンプト',
        'ChatGPT',
        'Claude'
      ],
      openGraph: {
        title: prompt.title,
        description: prompt.description,
        type: 'article',
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: prompt.title
        }],
        url: `${baseUrl}/prompt/${id}`,
      },
      other: {
        'article:published_time': prompt.createdAt,
      }
    }
  } catch (error) {
    console.error('Failed to fetch prompt metadata:', error)
    return {
      title: 'プロンプト | プロンプタ',
      description: 'プロンプトの詳細ページ'
    }
  }
}
```

---

### 第三步：为类别页面添加动态元数据 (20分钟)

**文件**: `/src/app/category/[slug]/page.tsx`

在文件顶部添加：

```tsx
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  try {
    const res = await fetch('http://localhost:3000/api/categories', {
      cache: 'no-store'
    })
    const categories = await res.json()
    const category = categories.find((c: any) => c.slug === slug)
    
    if (!category) {
      return {
        title: 'カテゴリ | プロンプタ',
        description: 'プロンプトカテゴリ'
      }
    }
    
    return {
      title: `${category.name} | プロンプタ`,
      description: category.description || `${category.name}カテゴリのプロンプト一覧`,
      keywords: [category.name, 'プロンプト', 'カテゴリ'],
      openGraph: {
        title: `${category.name} - プロンプタ`,
        description: category.description || `${category.name}カテゴリ`,
        type: 'website',
        url: `${baseUrl}/category/${slug}`,
      }
    }
  } catch (error) {
    return {
      title: 'カテゴリ | プロンプタ',
      description: 'プロンプトカテゴリページ'
    }
  }
}
```

---

### 第四步：为标签页面添加动态元数据 (20分钟)

**文件**: `/src/app/tag/[slug]/page.tsx`

在文件顶部添加：

```tsx
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const decodedSlug = decodeURIComponent(slug)
  
  return {
    title: `${decodedSlug} | プロンプタ`,
    description: `${decodedSlug}タグのプロンプト一覧です。ChatGPT、Claude、その他のAIツール向けのプロンプトを探せます。`,
    keywords: [decodedSlug, 'プロンプト', 'タグ'],
    openGraph: {
      title: `${decodedSlug} - プロンプタ`,
      description: `${decodedSlug}タグのプロンプト一覧`,
      type: 'website',
      url: `${baseUrl}/tag/${slug}`,
    }
  }
}
```

---

### 第五步：添加 JSON-LD 结构化数据 (45分钟)

**创建文件**: `/src/lib/schema.ts`

```typescript
export interface SchemaContext {
  baseUrl: string
  siteName: string
}

export function generateOrganizationSchema(context: SchemaContext) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Prompta",
    "url": context.baseUrl,
    "logo": `${context.baseUrl}/logo.png`,
    "description": "AIプロンプトの共有プラットフォーム。ChatGPT、Claudeなど様々なAIに対応。",
    "sameAs": [
      "https://twitter.com/prompta_jp"
    ],
    "contact": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "prompta.jp@gmail.com"
    }
  }
}

export function generatePromptSchema(
  prompt: {
    id: string
    title: string
    description: string
    content: string
    category?: { name: string }
    images?: Array<{ url: string }>
    createdAt: string
    updatedAt?: string
  },
  context: SchemaContext
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${context.baseUrl}/prompt/${prompt.id}`,
    "name": prompt.title,
    "description": prompt.description,
    "text": prompt.content,
    "image": prompt.images?.[0]?.url || `${context.baseUrl}/logo.png`,
    "dateCreated": prompt.createdAt,
    "dateModified": prompt.updatedAt || prompt.createdAt,
    "inLanguage": "ja-JP",
    "url": `${context.baseUrl}/prompt/${prompt.id}`,
    "author": {
      "@type": "Organization",
      "name": "Prompta"
    }
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  }
}

export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  itemCount: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "description": description,
    "url": url,
    "numberOfItems": itemCount
  }
}
```

在首页添加 Organization schema：

**文件**: `/src/app/page.tsx` (在 HomeContent 组件中)

```tsx
import { generateOrganizationSchema } from '@/lib/schema'

export function HomeContent() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const schemaMarkup = generateOrganizationSchema({
    baseUrl,
    siteName: 'Prompta'
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      {/* ... 其他内容 ... */}
    </>
  )
}
```

在提示词详情页添加 schema：

**文件**: `/src/app/prompt/[id]/page.tsx`

```tsx
import { generatePromptSchema, generateBreadcrumbSchema } from '@/lib/schema'

export default function PromptPage() {
  const params = useParams()
  const id = params.id as string
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  // ... 现有代码 ...

  if (prompt) {
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(promptSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {/* ... 其他内容 ... */}
      </>
    )
  }
}
```

---

### 第六步：改进 robots.txt (5分钟)

**文件**: `/public/robots.txt`

```
User-agent: *
Allow: /
Allow: /api/categories
Allow: /api/tags
Disallow: /admin
Disallow: /api/
Disallow: /api/auth/
Disallow: /api/image-proxy
Disallow: /*?*search=*
Disallow: /*?*page=2$
Disallow: /*?*page=[3-9]

User-agent: Googlebot
Crawl-delay: 0
Request-rate: 1/1s

User-agent: Baiduspider
Crawl-delay: 1
Request-rate: 1/1s

Sitemap: /sitemap.xml
```

---

### 第七步：优化 Sitemap (1小时)

创建多个 sitemap 文件来避免单个 sitemap 过大。

**文件**: `/src/app/sitemap-categories.ts`

```typescript
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  try {
    const categories = await prisma.category.findMany()

    return categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: cat.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Failed to generate categories sitemap:', error)
    return []
  }
}
```

**文件**: `/src/app/sitemap-tags.ts`

```typescript
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  try {
    // 获取所有提示词并提取唯一标签
    const prompts = await prisma.prompt.findMany({
      where: { isPublished: true },
      select: { tags: true }
    })

    const tagSet = new Set<string>()
    prompts.forEach(p => {
      if (p.tags) {
        try {
          const parsed = JSON.parse(p.tags)
          if (Array.isArray(parsed)) {
            parsed.forEach(tag => {
              if (typeof tag === 'string') tagSet.add(tag)
              else if (tag.name) tagSet.add(tag.name)
            })
          }
        } catch {}
      }
    })

    return Array.from(tagSet).map((tag) => ({
      url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Failed to generate tags sitemap:', error)
    return []
  }
}
```

更新主 sitemap：

**文件**: `/src/app/sitemap.ts`

```typescript
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const basicSitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  try {
    const categories = await prisma.category.findMany()
    const prompts = await prisma.prompt.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 10000 // 限制数量避免超大 sitemap
    })

    const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: cat.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const promptUrls: MetadataRoute.Sitemap = prompts.map((prompt, idx) => ({
      url: `${baseUrl}/prompt/${prompt.id}`,
      lastModified: prompt.updatedAt,
      changeFrequency: 'daily' as const,
      priority: Math.max(0.5, 1 - (idx / prompts.length) * 0.5),
    }))

    return [...basicSitemap, ...categoryUrls, ...promptUrls]
  } catch (error) {
    console.error('Failed to generate full sitemap:', error)
    return basicSitemap
  }
}
```

---

## 中期优化 (下一步)

### 1. 将 `<img>` 转换为 `<Image>` 组件

这是一个较大的改动，需要修改多个文件。详见主报告的相关部分。

### 2. 添加相关提示词推荐

在 `/src/app/prompt/[id]/page.tsx` 中添加"相关推荐"部分。

### 3. 实现 ISR 缓存

在各个页面文件中添加：

```typescript
export const revalidate = 3600 // 1小时重新验证
```

---

## 性能优化检查清单

- [ ] 使用 Google PageSpeed Insights 检查性能
- [ ] 检查 Core Web Vitals 指标
- [ ] 使用 Lighthouse 进行完整审计
- [ ] 监控搜索控制台中的核心指标

---

## 验证和测试

### 验证元数据
```bash
# 使用 curl 检查元数据
curl -s http://localhost:3000/prompt/[id] | grep -o '<meta name="description"[^>]*>'
```

### 验证 Schema
1. 访问 https://validator.schema.org/
2. 输入您的网站 URL
3. 检查 JSON-LD 是否有效

### 验证 Sitemap
1. 访问 http://localhost:3000/sitemap.xml
2. 检查是否有效且包含所有页面

---

## 监控和跟踪

### 设置 Google Search Console
1. 访问 https://search.google.com/search-console
2. 添加您的网站
3. 上传 sitemap.xml
4. 监控索引状态

### 设置 Google Analytics 4
```typescript
// 在 /src/app/layout.tsx 中添加：
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script dangerouslySetInnerHTML={{__html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
`}} />
```

---

## 常见问题

**Q: 何时应该检查 SEO 改进效果？**
A: Google 通常需要 2-4 周来重新爬取和索引更新。使用 Google Search Console 监控进度。

**Q: 动态元数据生成是否会影响性能？**
A: 不会。Next.js 在构建时或服务器端生成元数据，不会影响客户端性能。

**Q: 是否需要同时实施所有优化？**
A: 不需要。优先实施高优先级项目（动态元数据、Schema、404页面）。其他可以逐步实施。

