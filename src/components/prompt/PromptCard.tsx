import Link from 'next/link'
import Image from 'next/image'
import type { NormalizedPrompt } from '@/lib/data'

interface PromptCardProps {
  prompt: NormalizedPrompt
  priority?: boolean // true for above-fold images (first 4-8 cards)
}

export function PromptCard({ prompt, priority = false }: PromptCardProps) {
  const hasImage = prompt.images.length > 0

  return (
    <Link
      href={`/prompt/${prompt.slug}`}
      className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-sky-300 hover:shadow-lg transition-all duration-200"
    >
      {/* Thumbnail — fixed aspect ratio for consistent grid + CLS prevention */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {hasImage ? (
          <Image
            src={prompt.images[0].url}
            alt={prompt.images[0].alt || prompt.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center">
            <p className="text-xs text-gray-500 font-mono line-clamp-6 leading-relaxed">
              {prompt.content.slice(0, 200)}
            </p>
          </div>
        )}
        {/* Tool badge */}
        {prompt.toolName && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium text-white rounded-md"
            style={{ backgroundColor: prompt.toolColor || '#6b7280' }}
          >
            {prompt.toolName}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-sky-600 transition-colors mb-1.5">
          {prompt.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {prompt.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3 mt-auto">
          {prompt.categoryName && (
            <span className="px-2 py-0.5 text-[10px] font-medium bg-sky-50 text-sky-700 rounded-full">
              {prompt.categoryIcon} {prompt.categoryName}
            </span>
          )}
          {prompt.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {prompt.viewCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {prompt.copyCount.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  )
}
