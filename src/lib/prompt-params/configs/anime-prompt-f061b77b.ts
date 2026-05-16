import type { PromptParamsConfig } from '../types'
import { hairLengthOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairLength',
      type: 'select',
      label: '髪の長さ',
      match: 'long hair',
      options: hairLengthOptions('long hair'),
    },
    {
      id: 'palette',
      type: 'select',
      label: '色彩スタイル',
      hint: 'bold chromaticity = 鮮やかな色対比',
      match: 'bold chromaticity',
      options: [
        { value: 'bold chromaticity', label: '鮮やか・大胆' },
        { value: 'soft pastel palette', label: 'ソフトパステル' },
        { value: 'muted earthy tones', label: 'マットアースカラー' },
        { value: 'monochrome with red accents', label: 'モノクロ＋赤差し' },
        { value: 'neon synthwave palette', label: 'ネオン・シンセウェーブ' },
        { value: 'watercolor washes', label: '水彩風' },
        { value: 'high contrast black and white', label: 'ハイコントラスト白黒' },
      ],
    },
  ],
}
