'use client'

import { useMemo, useState } from 'react'
import type { ParamConfig } from '@/lib/prompt-params/types'
import { defaultValues } from '@/lib/prompt-params/interpolate'
import { CopyButton } from '@/components/ui/CopyButton'
import { trackParamChange } from '@/lib/track'
import { ParamColorSwatch } from './ParamColorSwatch'
import { ParamSelect } from './ParamSelect'

interface Props {
  promptId: string
  slug: string
  category?: string | null
  tool?: string | null
  content: string
  params: ParamConfig[]
}

type Segment = { text: string; paramId?: string }

function buildSegments(content: string, params: ParamConfig[]): Segment[] {
  const matches: { start: number; end: number; paramId: string }[] = []
  for (const p of params) {
    const idx = content.indexOf(p.match)
    if (idx !== -1) matches.push({ start: idx, end: idx + p.match.length, paramId: p.id })
  }
  matches.sort((a, b) => a.start - b.start)

  const segs: Segment[] = []
  let pos = 0
  for (const m of matches) {
    if (m.start > pos) segs.push({ text: content.slice(pos, m.start) })
    segs.push({ text: '', paramId: m.paramId })
    pos = m.end
  }
  if (pos < content.length) segs.push({ text: content.slice(pos) })
  return segs
}

export function PromptParamsPanel({ promptId, slug, category, tool, content, params }: Props) {
  const segments = useMemo(() => buildSegments(content, params), [content, params])
  const [values, setValues] = useState(() => defaultValues(params))

  const rendered = useMemo(
    () =>
      segments
        .map(s => (s.paramId ? values[s.paramId] ?? '' : s.text))
        .join(''),
    [segments, values],
  )

  const dirty = params.some(p => values[p.id] !== p.match)

  function update(paramId: string, value: string) {
    setValues(v => ({ ...v, [paramId]: value }))
    trackParamChange(promptId, paramId, value, { slug, category, tool })
  }

  function reset() {
    setValues(defaultValues(params))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900">プロンプト</h2>
        <CopyButton
          text={rendered}
          variant="compact"
          promptId={promptId}
          slug={slug}
          category={category}
          tool={tool}
        />
      </div>

      {/* Customize panel */}
      <div className="mb-4 p-5 bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sky-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <h3 className="text-sm font-bold text-gray-900">カスタマイズ</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide text-sky-700 bg-sky-100 rounded">
              NEW
            </span>
          </div>
          {dirty && (
            <button
              type="button"
              onClick={reset}
              className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2"
            >
              初期値に戻す
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {params.map(p => {
            const value = values[p.id] ?? p.match
            if (p.type === 'color') {
              return (
                <ParamColorSwatch
                  key={p.id}
                  label={p.label}
                  hint={p.hint}
                  value={value}
                  options={p.options}
                  onChange={v => update(p.id, v)}
                />
              )
            }
            return (
              <ParamSelect
                key={p.id}
                label={p.label}
                hint={p.hint}
                value={value}
                options={p.options}
                onChange={v => update(p.id, v)}
              />
            )
          })}
        </div>
      </div>

      {/* Rendered content */}
      <div className="bg-gray-900 text-gray-100 rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
        {segments.map((s, i) => {
          if (!s.paramId) return <span key={i}>{s.text}</span>
          const v = values[s.paramId] ?? ''
          const changed = params.find(p => p.id === s.paramId)?.match !== v
          return (
            <span
              key={i}
              className={`rounded px-1 py-0.5 transition-colors ${
                changed
                  ? 'bg-amber-400/30 text-amber-100 ring-1 ring-amber-400/50'
                  : 'bg-sky-500/20 text-sky-100 ring-1 ring-sky-400/30'
              }`}
            >
              {v}
            </span>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <CopyButton
          text={rendered}
          promptId={promptId}
          slug={slug}
          category={category}
          tool={tool}
        />
      </div>
    </div>
  )
}
