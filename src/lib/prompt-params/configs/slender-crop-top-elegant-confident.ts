import type { PromptParamsConfig } from '../types'
import { hairColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'blonde hair',
      options: hairColorOptions('blonde hair'),
    },
    {
      id: 'pupils',
      type: 'color',
      label: '瞳色',
      match: 'blue pupils',
      options: [
        { value: 'black pupils', label: '黒', swatch: '#1a1a1a' },
        { value: 'brown pupils', label: 'ブラウン', swatch: '#6b4423' },
        { value: 'amber pupils', label: 'アンバー', swatch: '#c89a3a' },
        { value: 'blue pupils', label: 'ブルー', swatch: '#4a6fa5' },
        { value: 'green pupils', label: 'グリーン', swatch: '#5a8a6a' },
        { value: 'red pupils', label: 'レッド', swatch: '#a0322a' },
        { value: 'purple pupils', label: 'パープル', swatch: '#8a6aa8' },
        { value: 'gold pupils', label: 'ゴールド', swatch: '#d4a64a' },
      ],
    },
    {
      id: 'top',
      type: 'select',
      label: 'トップス',
      match: 'crop top',
      options: [
        { value: 'crop top', label: 'クロップトップ' },
        { value: 'tank top', label: 'タンクトップ' },
        { value: 't-shirt', label: 'Tシャツ' },
        { value: 'blouse', label: 'ブラウス' },
        { value: 'sweater', label: 'セーター' },
        { value: 'corset top', label: 'コルセットトップ' },
      ],
    },
    {
      id: 'pose',
      type: 'select',
      label: 'ポーズ',
      match: 'three quarter pose',
      options: [
        { value: 'front facing pose', label: '正面' },
        { value: 'three quarter pose', label: '3/4ポーズ' },
        { value: 'side profile pose', label: '横向き' },
        { value: 'over the shoulder pose', label: '振り返り' },
        { value: 'walking pose', label: '歩き' },
        { value: 'leaning pose', label: 'もたれ' },
      ],
    },
  ],
}
