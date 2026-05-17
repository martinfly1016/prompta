import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'technique',
      type: 'select',
      label: '描画技法',
      match: 'palette knife and brush',
      options: [
        { value: 'palette knife and brush', label: 'ペインティングナイフ＋ブラシ' },
        { value: 'watercolor wash and dry brush', label: '水彩ウォッシュ＋ドライブラシ' },
        { value: 'thick impasto strokes', label: '厚塗りインパスト' },
        { value: 'pen and ink with hatching', label: 'ペン＆インク＋ハッチング' },
        { value: 'pastel chalk smudges', label: 'パステルチョーク' },
        { value: 'collage and torn paper', label: 'コラージュ＋ちぎり紙' },
      ],
    },
    {
      id: 'palette',
      type: 'select',
      label: '色彩パレット',
      match: 'primary colors',
      options: [
        { value: 'primary colors', label: '原色（赤青黄）' },
        { value: 'pastel colors', label: 'パステル' },
        { value: 'monochrome black and white', label: 'モノクロ' },
        { value: 'sunset gradient orange pink purple', label: 'サンセット' },
        { value: 'neon cyberpunk colors', label: 'ネオン・サイバーパンク' },
        { value: 'earth tones sienna ochre umber', label: 'アースカラー' },
      ],
    },
    {
      id: 'subject',
      type: 'select',
      label: 'モチーフ',
      match: 'trees and birds',
      options: [
        { value: 'trees and birds', label: '木と鳥' },
        { value: 'ocean waves and seashells', label: '海と貝殻' },
        { value: 'mountains and clouds', label: '山と雲' },
        { value: 'flowers and butterflies', label: '花と蝶' },
        { value: 'abstract geometric shapes', label: '抽象幾何' },
        { value: 'human figures dancing', label: '踊る人々' },
      ],
    },
  ],
}
