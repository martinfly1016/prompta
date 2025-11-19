import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getImageProxyUrl } from '@/lib/image-proxy'
import Footer from '@/components/Footer'
import { generateBreadcrumbSchema } from '@/lib/schema'

interface PromptImage {
  url: string
  altText?: string
  imageType?: string
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
  category: { name: string; slug: string }
  images?: PromptImage[]
  tags?: Tag[] | string
}

async function getPrompts(): Promise<Prompt[]> {
  try {
    // For server-side rendering, construct the absolute URL
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/prompts?limit=10000`, {
      next: { revalidate: 0 } // No caching - fetch fresh data every time
    })
    if (!res.ok) {
      console.error('Failed to fetch prompts:', res.status, res.statusText)
      return []
    }
    const data = await res.json()
    return data.prompts || []
  } catch (error) {
    console.error('Failed to fetch prompts:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'すべてのプロンプト | Prompta',
  description: 'Promptaの全プロンプト一覧。ChatGPT、Claude、Gemini、Grok対応のAIプロンプトが全て揃っています。',
  openGraph: {
    title: 'すべてのプロンプト | Prompta',
    description: 'Promptaの全プロンプト一覧。ChatGPT、Claude、Gemini、Grok対応のAIプロンプトが全て揃っています。',
    url: 'https://prompta.jp/all-prompts',
    type: 'website',
  },
  alternates: {
    canonical: 'https://prompta.jp/',
  },
}

export default async function AllPromptsPage() {
  const prompts = await getPrompts()

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'ホーム', url: '/' },
      { name: 'すべてのプロンプト', url: '/all-prompts' }
    ],
    'https://prompta.jp'
  )

  // Generate ItemList schema for all prompts
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: prompts.slice(0, 100).map((prompt, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://prompta.jp/prompt/${prompt.id}`,
      name: prompt.title,
      description: prompt.description
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section style={{ backgroundColor: '#f8fafc', paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px', color: '#0f172a', lineHeight: 1.3 }}>
                すべての<span style={{ color: '#0284c7' }}>プロンプト</span>
              </h1>
              <p style={{ fontSize: '16px', color: '#475569', marginBottom: '28px', lineHeight: 1.6 }}>
                Promptaに登録されているすべてのプロンプトを確認できます。
                <br />
                ChatGPT、Claude、Gemini、Grok対応のプロンプトが {prompts.length} 件あります。
              </p>
            </div>
          </div>
        </section>

        {/* Prompts Grid */}
        <section style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '60px' }}>
          <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {prompts.length} 件のプロンプト
              </h2>
            </div>

            {prompts.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', paddingTop: '48px', paddingBottom: '48px' }}>
                プロンプトが見つかりません。
              </div>
            ) : (
              <div className="auto-grid-responsive">
                {prompts.map((prompt, index) => (
                  <Link
                    key={prompt.id}
                    href={`/prompt/${prompt.id}`}
                    className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                  >
                    {/* Image */}
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

                    {/* Content */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontWeight: 700, marginBottom: '10px', fontSize: '15px', lineHeight: 1.3, color: '#0f172a' }} className="line-clamp-2">
                        {prompt.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#475569', marginBottom: '12px', flex: 1, lineHeight: 1.4 }} className="line-clamp-2">
                        {prompt.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '12px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#0284c7', paddingLeft: '10px', paddingRight: '10px', paddingTop: '4px', paddingBottom: '4px', borderRadius: '4px', fontWeight: 500 }}>
                          {prompt.category.name}
                        </span>
                      </div>
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
