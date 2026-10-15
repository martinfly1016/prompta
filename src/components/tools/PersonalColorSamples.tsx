'use client'

import { useState } from 'react'

// Precomputed examples. Clicking a sample never calls the API and never spends points.
const SAMPLES = [
  {
    id: 'summer',
    label: 'サンプル 1',
    season: 'サマー（夏）',
    note: '青みの肌・低めのコントラスト。明るいパステルが馴染みます。',
    colors: [
      { hex: '#F4C2C2', name: 'ベビーピンク' },
      { hex: '#A8C5D4', name: 'パウダーブルー' },
      { hex: '#C5B4E3', name: 'ラベンダー' },
      { hex: '#E8E8E8', name: 'パールホワイト' },
    ],
  },
  {
    id: 'spring',
    label: 'サンプル 2',
    season: 'スプリング（春）',
    note: '黄みの肌・明るいコントラスト。暖色のクリアカラーが映えます。',
    colors: [
      { hex: '#FFB347', name: 'アプリコット' },
      { hex: '#FF7F50', name: 'コーラル' },
      { hex: '#98D8C8', name: 'ミント' },
      { hex: '#F7E7CE', name: 'クリーム' },
    ],
  },
  {
    id: 'winter',
    label: 'サンプル 3',
    season: 'ウィンター（冬）',
    note: '青みの肌・高いコントラスト。はっきりした寒色が締まります。',
    colors: [
      { hex: '#0A1F44', name: 'ネイビー' },
      { hex: '#E10600', name: 'ピュアレッド' },
      { hex: '#FFFFFF', name: 'ホワイト' },
      { hex: '#C0C0C0', name: 'シルバー' },
    ],
  },
] as const

export function PersonalColorSamples() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sample = SAMPLES.find((s) => s.id === activeId) ?? null

  return (
    <div className="mt-6">
      <p className="text-xs text-gray-500 mb-3 text-center">
        または、サンプル結果を見る（API は呼びません・ポイントは消費しません）
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        {SAMPLES.map((s) => (
          <button
            key={s.id}
            type="button"
            data-testid="sample-button"
            aria-pressed={activeId === s.id}
            onClick={() => setActiveId(s.id)}
            className={`w-24 h-16 rounded-lg border-2 text-xs font-medium transition-all ${
              activeId === s.id
                ? 'border-sky-500 bg-sky-50 text-sky-800'
                : 'border-gray-200 bg-white text-gray-600 hover:border-sky-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {sample && (
        <div
          data-testid="sample-result"
          className="mt-4 mx-auto max-w-lg rounded-xl border border-sky-100 bg-sky-50/60 p-4 text-left"
        >
          <p className="text-xs font-semibold text-sky-700">サンプル結果</p>
          <p className="mt-1 text-sm font-bold text-gray-900">{sample.season}</p>
          <p className="mt-1 text-xs text-gray-600">{sample.note}</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {sample.colors.map((c) => (
              <div key={c.hex} className="rounded-md overflow-hidden border border-white bg-white">
                <div className="h-8" style={{ backgroundColor: c.hex }} />
                <div className="px-1 py-1 text-[10px] text-gray-700 truncate">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
