'use client'

/**
 * PromptInteractive — wraps PromptParamsPanel + PromptExecutor so that
 * adjustments in the params panel propagate into the in-site execution.
 *
 * Without this wrapper, PromptExecutor reads the original prompt.content
 * and ignores any user customization. With it:
 *  - PromptParamsPanel reports its rendered output via `onRenderedChange`
 *  - PromptInteractive holds that rendered string in state
 *  - PromptExecutor receives a getCurrentContent callback that returns it
 */

import { useCallback, useRef, useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { TryInChatGPTButton } from '@/components/ui/TryInChatGPTButton'
import { TryInGeminiButton } from '@/components/ui/TryInGeminiButton'
import { PromptParamsPanel } from './params/PromptParamsPanel'
import { PromptExecutor } from './PromptExecutor'
import type { PromptParamsConfig } from '@/lib/prompt-params/types'

interface Prompt {
  id: string
  slug: string
  title: string
  content: string
  categorySlug?: string | null
  toolSlug?: string | null
}

interface Props {
  prompt: Prompt
  paramsConfig: PromptParamsConfig | null
  isTextPrompt: boolean
  isPhotoEdit: boolean
}

export function PromptInteractive({ prompt, paramsConfig, isTextPrompt, isPhotoEdit }: Props) {
  // Latest rendered content from PromptParamsPanel. ref to avoid re-rendering
  // PromptExecutor on every keystroke — PromptExecutor reads it lazily on
  // execute() via getCurrentContent.
  const renderedRef = useRef<string>(prompt.content)
  const [renderedDisplay, setRenderedDisplay] = useState<string>(prompt.content)

  const onRenderedChange = useCallback((rendered: string) => {
    renderedRef.current = rendered
    setRenderedDisplay(rendered)
  }, [])

  const getCurrentContent = useCallback(() => renderedRef.current, [])

  // Out-bound buttons (ChatGPT / Gemini) should also receive the latest
  // rendered content. Re-renders on every keystroke are acceptable here
  // because the buttons are cheap (just text + click handler).
  const outboundContent = paramsConfig ? renderedDisplay : prompt.content

  return (
    <>
      <section className="mb-8">
        {paramsConfig ? (
          <PromptParamsPanel
            promptId={prompt.id}
            slug={prompt.slug}
            category={prompt.categorySlug}
            tool={prompt.toolSlug}
            content={prompt.content}
            params={paramsConfig.params}
            onRenderedChange={onRenderedChange}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">プロンプト</h2>
              <CopyButton
                text={prompt.content}
                variant="compact"
                promptId={prompt.id}
                slug={prompt.slug}
                category={prompt.categorySlug}
                tool={prompt.toolSlug}
              />
            </div>
            <div className="bg-gray-900 text-gray-100 rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {prompt.content}
            </div>
          </>
        )}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {!paramsConfig && (
            <CopyButton
              text={prompt.content}
              promptId={prompt.id}
              slug={prompt.slug}
              category={prompt.categorySlug}
              tool={prompt.toolSlug}
            />
          )}
          {isTextPrompt && (
            <TryInChatGPTButton
              content={outboundContent}
              promptId={prompt.id}
              slug={prompt.slug}
              category={prompt.categorySlug}
              tool={prompt.toolSlug}
            />
          )}
          {isPhotoEdit && (
            <TryInGeminiButton
              content={outboundContent}
              promptId={prompt.id}
              slug={prompt.slug}
              category={prompt.categorySlug}
              tool={prompt.toolSlug}
            />
          )}
        </div>
        {isTextPrompt && (
          <p className="mt-3 text-xs text-gray-500 text-center">
            {outboundContent.length <= 2000
              ? '「ChatGPTで試す」ボタンを押すと、入力欄にプロンプトが自動入力された状態でChatGPTが開きます。'
              : '長いプロンプトのため、ボタンを押すとプロンプトがクリップボードにコピーされ、ChatGPTが新しいタブで開きます。入力欄に貼り付けてご利用ください。'}
          </p>
        )}
        {isPhotoEdit && (
          <p className="mt-3 text-xs text-gray-500 text-center">
            「Geminiで試す」ボタンを押すとプロンプトがコピーされ、Gemini が新しいタブで開きます。編集したい写真をアップロードしてプロンプトを貼り付けてください。
          </p>
        )}
      </section>

      <PromptExecutor
        prompt={{
          slug: prompt.slug,
          title: prompt.title,
          content: prompt.content,
          categorySlug: prompt.categorySlug,
          toolSlug: prompt.toolSlug,
        }}
        getCurrentContent={getCurrentContent}
      />
    </>
  )
}
