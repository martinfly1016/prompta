import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'product',
      type: 'select',
      label: '製品',
      match: 'organ oil  for hair',
      options: [
        { value: 'organ oil  for hair', label: 'ヘアオイル' },
        { value: 'argan shampoo bottle', label: 'シャンプー' },
        { value: 'rose perfume bottle', label: '香水' },
        { value: 'body lotion bottle', label: 'ボディローション' },
        { value: 'face serum dropper', label: '美容液ドロッパー' },
        { value: 'hair conditioner tube', label: 'コンディショナー' },
      ],
    },
    {
      id: 'colorScheme',
      type: 'select',
      label: '色彩スキーム',
      match: 'colored blue and pink',
      options: [
        { value: 'colored blue and pink', label: 'ブルー＋ピンク' },
        { value: 'colored gold and white', label: 'ゴールド＋ホワイト' },
        { value: 'colored coral and mint', label: 'コーラル＋ミント' },
        { value: 'colored lavender and cream', label: 'ラベンダー＋クリーム' },
        { value: 'colored sage green and rose gold', label: 'セージ＋ローズゴールド' },
        { value: 'colored monochrome black and silver', label: 'モノクロ＋シルバー' },
      ],
    },
  ],
}
