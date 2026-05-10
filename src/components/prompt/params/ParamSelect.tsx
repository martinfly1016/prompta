'use client'

import type { ParamOption } from '@/lib/prompt-params/types'

interface Props {
  label: string
  hint?: string
  value: string
  options: ParamOption[]
  onChange: (value: string) => void
}

export function ParamSelect({ label, hint, value, options, onChange }: Props) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => {
          const selected = opt.value === value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={selected}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                selected
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
