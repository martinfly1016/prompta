import { PromptCard } from './PromptCard'
import type { NormalizedPrompt } from '@/lib/data'

interface PromptGridProps {
  prompts: NormalizedPrompt[]
  columns?: 2 | 3 | 4
  /** Number of leading cards whose images get priority (preloaded). */
  priorityCount?: number
}

export function PromptGrid({ prompts, columns = 4, priorityCount = 0 }: PromptGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (prompts.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p className="text-lg">プロンプトが見つかりません</p>
        <p className="text-sm mt-1">他のカテゴリや検索をお試しください。</p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4 lg:gap-6`}>
      {prompts.map((prompt, i) => (
        <PromptCard key={prompt.id} prompt={prompt} priority={i < priorityCount} />
      ))}
    </div>
  )
}
