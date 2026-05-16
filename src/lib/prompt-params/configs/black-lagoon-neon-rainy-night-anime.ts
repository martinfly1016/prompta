import type { PromptParamsConfig } from '../types'
import { fabricColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'accentColor',
      type: 'color',
      label: 'メインカラー',
      match: 'red',
      options: fabricColorOptions('accent', 'red'),
    },
    {
      id: 'weather',
      type: 'select',
      label: '天候',
      match: 'rainy day',
      options: [
        { value: 'rainy day', label: '雨' },
        { value: 'foggy night', label: '霧夜' },
        { value: 'snowing night', label: '雪夜' },
        { value: 'thunderstorm', label: '雷雨' },
        { value: 'clear starry night', label: '星空' },
        { value: 'cherry blossom evening', label: '桜の夕暮れ' },
      ],
    },
    {
      id: 'composition',
      type: 'select',
      label: 'カメラ構図',
      match: 'stunning full body anime art',
      options: [
        { value: 'stunning full body anime art', label: '全身' },
        { value: 'dramatic close-up portrait', label: 'クローズアップ' },
        { value: 'cinematic wide shot', label: 'シネマティック広角' },
        { value: 'low angle hero shot', label: 'ローアングルヒーロー' },
        { value: 'dutch angle action shot', label: 'ダッチアングル' },
      ],
    },
  ],
}
