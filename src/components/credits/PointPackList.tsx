'use client'

import { POINT_PACKS, type PointPack } from '@/lib/credit-costs'

export function PointPackList({
  selectedId,
  onSelect,
}: {
  selectedId: string
  onSelect: (pack: PointPack) => void
}) {
  return (
    <div className="space-y-2" data-testid="point-packs">
      {POINT_PACKS.map((pack) => {
        const selected = pack.id === selectedId
        return (
          <button
            key={pack.id}
            type="button"
            data-testid={`pack-${pack.id}`}
            data-recommended={pack.recommended ? 'true' : 'false'}
            aria-pressed={selected}
            onClick={() => onSelect(pack)}
            className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
              selected
                ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500'
                : 'border-gray-200 bg-white hover:border-sky-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{pack.name}</span>
                  {pack.recommended && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded">
                      おすすめ
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-gray-600">
                  {pack.points} ポイント（{pack.points} 回分）・1 回 1 ポイント・有効期限 12 ヶ月
                </p>
              </div>
              <span className="text-lg font-bold text-gray-900 shrink-0">¥{pack.priceJpy.toLocaleString()}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
