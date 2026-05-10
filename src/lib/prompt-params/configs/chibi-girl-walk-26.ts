import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairLength',
      type: 'select',
      label: '髪の長さ',
      match: 'short haired',
      options: [
        { value: 'short haired', label: 'ショート' },
        { value: 'medium haired', label: 'ミディアム' },
        { value: 'long haired', label: 'ロング' },
        { value: 'twin tailed', label: 'ツインテール' },
        { value: 'ponytail', label: 'ポニーテール' },
      ],
    },
    {
      id: 'top',
      type: 'select',
      label: 'トップス',
      match: 'tank top',
      options: [
        { value: 'tank top', label: 'タンクトップ' },
        { value: 't-shirt', label: 'Tシャツ' },
        { value: 'hoodie', label: 'パーカー' },
        { value: 'sweater', label: 'セーター' },
        { value: 'blouse', label: 'ブラウス' },
        { value: 'crop top', label: 'クロップトップ' },
      ],
    },
    {
      id: 'bottom',
      type: 'select',
      label: 'ボトムス',
      match: 'short skirt',
      options: [
        { value: 'short skirt', label: 'ショートスカート' },
        { value: 'pleated skirt', label: 'プリーツスカート' },
        { value: 'long skirt', label: 'ロングスカート' },
        { value: 'shorts', label: 'ショートパンツ' },
        { value: 'jeans', label: 'ジーンズ' },
      ],
    },
    {
      id: 'view',
      type: 'select',
      label: '視点',
      match: 'side view',
      options: [
        { value: 'front view', label: '正面' },
        { value: 'side view', label: '横向き' },
        { value: 'back view', label: '後ろ向き' },
        { value: 'three quarter view', label: '斜め' },
      ],
    },
  ],
}
