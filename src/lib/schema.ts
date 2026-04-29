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
    "itemListElement": items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      const fullUrl = item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`;

      return {
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        // Exclude 'item' field for the last breadcrumb (current page) per Google's guidelines
        ...(isLast ? {} : { "item": fullUrl })
      };
    })
  }
}

export function generateSoftwareApplicationSchema(
  tool: { name: string; nameJa: string; description: string; slug: string },
  context: SchemaContext
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "alternateName": tool.nameJa,
    "description": tool.description,
    "url": `${context.baseUrl}/tools/${tool.slug}`,
    "applicationCategory": "Multimedia",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY",
    },
  }
}

export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string }>,
  _context: SchemaContext,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "url": url,
    "inLanguage": "ja-JP",
    "step": steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.text,
    })),
  }
}

export function generateFaqSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
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
