import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色（ハート風）',
      match: 'pink hair heart',
      options: [
        { value: 'pink hair heart', label: 'ピンク', swatch: '#e89bb4' },
        { value: 'red hair heart', label: 'レッド', swatch: '#a0322a' },
        { value: 'blue hair heart', label: 'ブルー', swatch: '#4a6fa5' },
        { value: 'purple hair heart', label: 'パープル', swatch: '#8a6aa8' },
        { value: 'silver hair heart', label: 'シルバー', swatch: '#c8c8d0' },
        { value: 'gold hair heart', label: 'ゴールド', swatch: '#d4a64a' },
        { value: 'rainbow hair heart', label: 'レインボー', swatch: '#e89bb4' },
      ],
    },
    {
      id: 'palette',
      type: 'select',
      label: '色調',
      match: 'muted colors',
      options: [
        { value: 'muted colors', label: 'マットカラー' },
        { value: 'vibrant colors', label: '鮮やかカラー' },
        { value: 'pastel colors', label: 'パステル' },
        { value: 'monochrome', label: 'モノクロ' },
        { value: 'sepia tones', label: 'セピア' },
        { value: 'neon colors', label: 'ネオン' },
      ],
    },
  ],
}
