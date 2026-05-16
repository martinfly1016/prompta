import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'dressType',
      type: 'select',
      label: 'ドレスタイプ',
      match: 'cocktail dress',
      options: [
        { value: 'cocktail dress', label: 'カクテルドレス' },
        { value: 'evening gown', label: 'イブニングガウン' },
        { value: 'A-line dress', label: 'Aラインドレス' },
        { value: 'wrap dress', label: 'ラップドレス' },
        { value: 'sheath dress', label: 'シースドレス' },
        { value: 'mermaid dress', label: 'マーメイドドレス' },
      ],
    },
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'blond',
      options: [
        { value: 'blond', label: 'ブロンド', swatch: '#e8c97a' },
        { value: 'brunette', label: 'ブルネット', swatch: '#3b2417' },
        { value: 'red-haired', label: 'レッド', swatch: '#a0322a' },
        { value: 'jet black', label: 'ジェットブラック', swatch: '#1a1a1a' },
        { value: 'silver-haired', label: 'シルバー', swatch: '#c8c8d0' },
        { value: 'auburn', label: 'オーバーン', swatch: '#7a3e22' },
      ],
    },
    {
      id: 'background',
      type: 'select',
      label: '背景',
      match: 'dark background',
      options: [
        { value: 'dark background', label: 'ダーク' },
        { value: 'soft beige background', label: 'ソフトベージュ' },
        { value: 'velvet red background', label: 'ベルベットレッド' },
        { value: 'marble white background', label: 'マーブルホワイト' },
        { value: 'gradient gray background', label: 'グラデーショングレー' },
        { value: 'neon city background', label: 'ネオンシティ' },
      ],
    },
  ],
}
