import Link from 'next/link'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { SITE_CONFIG } from '@/lib/constants'

export interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: 'ホーム', href: '/' }, ...items]

  const schemaItems = allItems.map(item => ({
    name: item.name,
    url: item.href,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(schemaItems, SITE_CONFIG.url)),
        }}
      />
      <nav aria-label="パンくずリスト" className="py-3">
        <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
          {allItems.map((item, i) => {
            const isLast = i === allItems.length - 1
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {isLast ? (
                  <span className="text-gray-700 font-medium truncate max-w-[200px]">{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:text-sky-600 transition-colors truncate max-w-[200px]">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
