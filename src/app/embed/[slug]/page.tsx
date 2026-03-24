import { notFound } from 'next/navigation'
import { getPromptBySlug } from '@/lib/data'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export default async function EmbedPromptPage({ params }: Props) {
  const resolvedParams = await params
  const prompt = await getPromptBySlug(decodeURIComponent(resolvedParams.slug))
  if (!prompt) notFound()

  const promptUrl = `${SITE_CONFIG.url}/prompt/${prompt.slug}`

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {prompt.toolName && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-white rounded-md"
                style={{ backgroundColor: prompt.toolColor || '#6b7280' }}
              >
                {prompt.toolIcon} {prompt.toolName}
              </span>
            )}
            {prompt.categoryName && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-sky-50 text-sky-700 rounded-md">
                {prompt.categoryIcon} {prompt.categoryName}
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        {prompt.images.length > 0 && (
          <div className="relative aspect-video bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={prompt.images[0].url}
              alt={prompt.images[0].alt || prompt.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
            <a href={promptUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">
              {prompt.title}
            </a>
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{prompt.description}</p>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap line-clamp-4">
            {prompt.content}
          </div>
        </div>

        {/* Footer — attribution */}
        <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <a
            href={promptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sky-600 hover:text-sky-700 font-medium"
          >
            続きを見る →
          </a>
          <a
            href={SITE_CONFIG.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-gradient-to-br from-sky-500 to-indigo-500 text-white text-[8px] font-bold">P</span>
            Prompta
          </a>
        </div>
      </div>
    </div>
  )
}
