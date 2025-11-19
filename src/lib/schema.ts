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
