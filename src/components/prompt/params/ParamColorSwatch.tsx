'use client'

import type { ParamOption } from '@/lib/prompt-params/types'

interface Props {
  label: string
  hint?: string
  value: string
  options: ParamOption[]
  onChange: (value: string) => void
}

export function ParamColorSwatch({ label, hint, value, options, onChange }: Props) {
  const current = options.find(o => o.value === value)

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-semibold text-gray-900">
          {label}
          {current && <span className="ml-2 text-xs font-normal text-gray-500">{current.label}</span>}
        </label>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const selected = opt.value === value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              title={opt.label}
              aria-pressed={selected}
              aria-label={opt.label}
              className={`relative w-9 h-9 rounded-full transition-all ${
                selected
                  ? 'ring-2 ring-sky-500 ring-offset-2'
                  : 'ring-1 ring-gray-200 hover:ring-gray-400'
              }`}
              style={{ backgroundColor: opt.swatch || '#ccc' }}
            >
              {selected && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg
                    className="w-4 h-4 drop-shadow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isLight(opt.swatch) ? '#1a1a1a' : '#fff'}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function isLight(hex?: string): boolean {
  if (!hex) return false
  const m = hex.replace('#', '')
  if (m.length !== 6) return false
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.7
}
