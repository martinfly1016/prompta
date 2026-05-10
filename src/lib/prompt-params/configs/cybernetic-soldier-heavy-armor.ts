import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'armor',
      type: 'select',
      label: '装備',
      match: 'bulky armor',
      options: [
        { value: 'bulky armor', label: 'ヘビーアーマー' },
        { value: 'light armor', label: 'ライトアーマー' },
        { value: 'power armor', label: 'パワーアーマー' },
        { value: 'stealth suit', label: 'ステルススーツ' },
        { value: 'mecha suit', label: 'メカスーツ' },
        { value: 'tactical gear', label: 'タクティカルギア' },
      ],
    },
    {
      id: 'medium',
      type: 'select',
      label: '描画スタイル',
      match: 'digital art',
      options: [
        { value: 'digital art', label: 'デジタルアート' },
        { value: 'oil painting', label: '油絵' },
        { value: 'watercolor painting', label: '水彩画' },
        { value: 'pixel art', label: 'ピクセルアート' },
        { value: 'concept art', label: 'コンセプトアート' },
        { value: 'photo realistic', label: 'フォトリアル' },
      ],
    },
    {
      id: 'genre',
      type: 'select',
      label: 'ジャンル',
      match: 'anime style',
      options: [
        { value: 'anime style', label: 'アニメ' },
        { value: 'manga style', label: 'マンガ' },
        { value: 'realistic style', label: 'リアル' },
        { value: 'chibi style', label: 'ちび' },
        { value: 'cartoon style', label: 'カートゥーン' },
        { value: 'cyberpunk style', label: 'サイバーパンク' },
      ],
    },
  ],
}
