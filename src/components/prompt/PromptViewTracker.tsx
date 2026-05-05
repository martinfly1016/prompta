'use client'

import { useEffect } from 'react'
import { trackPromptView } from '@/lib/track'

interface Props {
  promptId: string
  slug: string
  category?: string | null
  tool?: string | null
}

export function PromptViewTracker({ promptId, slug, category, tool }: Props) {
  useEffect(() => {
    trackPromptView(promptId, { slug, category, tool })
  }, [promptId, slug, category, tool])
  return null
}
