import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleLayout from '@/components/ArticleLayout'
import { getGuideBySlug, getAllGuideSlugs, getRelatedGuides } from '@/content/guides'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static params for all guides
export async function generateStaticParams() {
  const slugs = getAllGuideSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return {
      title: 'ガイドが見つかりません',
      description: 'リクエストされたガイドが見つかりません。',
    }
  }

  const baseUrl = 'https://www.prompta.jp'

  return {
    title: `${guide.title} | Prompta`,
    description: guide.description,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${baseUrl}/guides/${guide.slug}`,
      type: 'article',
      locale: 'ja_JP',
      publishedTime: guide.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    alternates: {
      canonical: `${baseUrl}/guides/${guide.slug}`,
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  const relatedGuides = getRelatedGuides(slug, 2)
  const tocItems = guide.sections.map((section) => ({
    id: section.id,
    text: section.title,
    level: 2,
  }))

  // Generate Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Prompta',
      url: 'https://www.prompta.jp',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Prompta',
      url: 'https://www.prompta.jp',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.prompta.jp/guides/${guide.slug}`,
    },
  }

  // Generate Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://www.prompta.jp',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'ガイド',
        item: 'https://www.prompta.jp/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: `https://www.prompta.jp/guides/${guide.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleLayout
        title={guide.title}
        description={guide.description}
        publishedAt={guide.publishedAt}
        readingTime={guide.readingTime}
        tocItems={tocItems}
        relatedGuides={relatedGuides.map((g) => ({
          slug: g.slug,
          title: g.title,
          description: g.description,
        }))}
      >
        {guide.sections.map((section) => (
          <section key={section.id} className="mb-12">
            <h2 id={section.id} className="text-2xl font-bold text-gray-900 mb-4 scroll-mt-20">
              {section.title}
            </h2>
            <div className="prose prose-lg max-w-none">
              {section.content.split('\n\n').map((paragraph, i) => {
                // Handle bold text
                const formattedParagraph = paragraph.replace(
                  /\*\*(.+?)\*\*/g,
                  '<strong>$1</strong>'
                )

                // Check if it's a list
                if (paragraph.startsWith('- ') || paragraph.startsWith('× ') || paragraph.startsWith('○ ')) {
                  const items = paragraph.split('\n')
                  return (
                    <ul key={i} className="list-disc pl-6 mb-4 space-y-1">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: item.replace(/^[-×○]\s*/, '').replace(
                              /\*\*(.+?)\*\*/g,
                              '<strong>$1</strong>'
                            )
                          }}
                        />
                      ))}
                    </ul>
                  )
                }

                // Check if it's a numbered list
                if (/^\d+\./.test(paragraph)) {
                  const items = paragraph.split('\n')
                  return (
                    <ol key={i} className="list-decimal pl-6 mb-4 space-y-1">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: item.replace(/^\d+\.\s*/, '').replace(
                              /\*\*(.+?)\*\*/g,
                              '<strong>$1</strong>'
                            )
                          }}
                        />
                      ))}
                    </ol>
                  )
                }

                return (
                  <p
                    key={i}
                    className="text-gray-700 mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                  />
                )
              })}
            </div>
          </section>
        ))}
      </ArticleLayout>
    </>
  )
}
