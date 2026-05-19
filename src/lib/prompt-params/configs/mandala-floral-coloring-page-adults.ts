import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'flowerTheme',
      type: 'select',
      label: '花の種類',
      match: 'roses, peonies, leaves, and small buds',
      options: [
        { value: 'roses, peonies, leaves, and small buds', label: '薔薇とペチュニア（デフォルト）' },
        { value: 'lotus flowers, water lilies, leaves, and dewdrops', label: '蓮と睡蓮' },
        { value: 'sunflowers, daisies, leaves, and small buds', label: '向日葵と雛菊' },
        { value: 'cherry blossoms, plum blossoms, leaves, and falling petals', label: '桜と梅' },
        { value: 'tulips, daffodils, leaves, and small buds', label: 'チューリップと水仙' },
        { value: 'hibiscus, tropical leaves, ferns, and small buds', label: 'ハイビスカスと熱帯葉' },
      ],
    },
    {
      id: 'lineWeight',
      type: 'select',
      label: '線の太さ',
      match: 'medium consistent line weight',
      options: [
        { value: 'fine line art', label: '細い線（本格コロリアージュ）' },
        { value: 'medium consistent line weight', label: '中（デフォルト）' },
        { value: 'thick outline', label: '太い線（塗りやすい）' },
      ],
    },
    {
      id: 'detail',
      type: 'select',
      label: '細密度',
      match: 'intricate but readable',
      options: [
        { value: 'highly intricate with multiple layers', label: '超細密（時間かかる）' },
        { value: 'intricate but readable', label: '中（デフォルト）' },
        { value: 'simple and easy to color', label: 'シンプル（初心者向け）' },
      ],
    },
  ],
}
