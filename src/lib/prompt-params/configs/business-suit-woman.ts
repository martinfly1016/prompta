import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'suitColor',
      type: 'color',
      label: 'スーツの色',
      match: 'blue or gold suits',
      options: [
        { value: 'blue or gold suits', label: 'ブルー/ゴールド', swatch: '#4a6fa5' },
        { value: 'charcoal grey suits', label: 'チャコールグレー', swatch: '#3a3a3a' },
        { value: 'navy and burgundy suits', label: 'ネイビー/バーガンディ', swatch: '#1f2a4a' },
        { value: 'cream and pastel pink suits', label: 'クリーム/ピンク', swatch: '#f5e0c8' },
        { value: 'emerald green suits', label: 'エメラルド', swatch: '#3a7a5a' },
        { value: 'pure white suits', label: 'ピュアホワイト', swatch: '#f7f7f7' },
        { value: 'classic black suits', label: 'ブラック', swatch: '#1a1a1a' },
      ],
    },
    {
      id: 'setting',
      type: 'select',
      label: 'シーン',
      match: 'board room conference',
      options: [
        { value: 'board room conference', label: '役員会議室' },
        { value: 'modern open office', label: 'モダンオープンオフィス' },
        { value: 'rooftop terrace meeting', label: '屋上テラス' },
        { value: 'press conference stage', label: 'プレス記者会見' },
        { value: 'startup co-working space', label: 'コワーキング' },
        { value: 'luxury hotel lobby', label: 'ホテルロビー' },
      ],
    },
    {
      id: 'style',
      type: 'select',
      label: 'アートスタイル',
      match: 'digital painting',
      options: [
        { value: 'digital painting', label: 'デジタルペイント' },
        { value: 'oil painting', label: '油絵' },
        { value: 'editorial photography', label: 'エディトリアル写真' },
        { value: 'gouache illustration', label: 'ガッシュ' },
        { value: 'watercolor illustration', label: '水彩' },
      ],
    },
  ],
}
