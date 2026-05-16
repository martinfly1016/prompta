import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: 'アートスタイル',
      hint: 'dark academia / 細密画など',
      match: 'dark academia',
      options: [
        { value: 'dark academia', label: 'ダークアカデミア' },
        { value: 'film noir', label: 'フィルムノワール' },
        { value: 'soft pastel academia', label: 'パステルアカデミア' },
        { value: 'gothic romance', label: 'ゴシックロマンス' },
        { value: 'minimalist editorial', label: 'ミニマルエディトリアル' },
        { value: 'vintage 90s photography', label: '90年代ヴィンテージ' },
      ],
    },
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'candid atmosphere',
      options: [
        { value: 'candid atmosphere', label: 'キャンディッド' },
        { value: 'tense atmosphere', label: '緊張感' },
        { value: 'serene atmosphere', label: '静謐' },
        { value: 'mysterious atmosphere', label: '神秘的' },
        { value: 'playful atmosphere', label: '遊び心' },
      ],
    },
    {
      id: 'palette',
      type: 'color',
      label: '色調',
      match: 'dark bronze and gray',
      options: [
        { value: 'dark bronze and gray', label: 'ダークブロンズ＋グレー', swatch: '#5a4a32' },
        { value: 'deep burgundy and cream', label: 'バーガンディ＋クリーム', swatch: '#6b2a3a' },
        { value: 'navy and warm beige', label: 'ネイビー＋ベージュ', swatch: '#1f2a4a' },
        { value: 'forest green and gold', label: 'フォレスト＋ゴールド', swatch: '#3a5a3a' },
        { value: 'charcoal and silver', label: 'チャコール＋シルバー', swatch: '#3a3a3a' },
        { value: 'sepia and cream', label: 'セピア＋クリーム', swatch: '#7a5a3a' },
      ],
    },
  ],
}
