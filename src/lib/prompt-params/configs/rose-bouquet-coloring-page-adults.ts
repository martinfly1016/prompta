import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'bouquetType',
      type: 'select',
      label: '花束の種類',
      match: 'rose bouquet tied with a ribbon, multiple roses in full bloom and partial bloom',
      options: [
        { value: 'rose bouquet tied with a ribbon, multiple roses in full bloom and partial bloom', label: '薔薇の花束（デフォルト）' },
        { value: 'tulip bouquet tied with a ribbon, multiple tulips with open and closed buds', label: 'チューリップの花束' },
        { value: 'lily bouquet tied with a ribbon, multiple lilies in full bloom and partial bloom', label: 'ユリの花束' },
        { value: 'sunflower bouquet tied with a ribbon, multiple sunflowers in full bloom', label: '向日葵の花束' },
        { value: 'mixed wildflower bouquet tied with a ribbon, daisies, cosmos, and chamomile in full bloom', label: '野の花ミックス' },
        { value: 'lavender bunch tied with a ribbon, multiple lavender stalks with small flowers', label: 'ラベンダーの束' },
      ],
    },
    {
      id: 'lineWeight',
      type: 'select',
      label: '線の太さ',
      match: 'medium line weight',
      options: [
        { value: 'fine line art', label: '細い線（本格コロリアージュ）' },
        { value: 'medium line weight', label: '中（デフォルト）' },
        { value: 'thick outline', label: '太い線（塗りやすい）' },
      ],
    },
    {
      id: 'style',
      type: 'select',
      label: 'スタイル',
      match: 'vintage botanical',
      options: [
        { value: 'vintage botanical', label: 'ビンテージボタニカル（デフォルト）' },
        { value: 'modern minimalist', label: 'モダンミニマル' },
        { value: 'art nouveau decorative', label: 'アールヌーボー' },
        { value: 'japanese ukiyo-e inspired', label: '和風浮世絵' },
        { value: 'whimsical hand-drawn', label: '手描き風' },
      ],
    },
  ],
}
