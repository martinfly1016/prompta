import type { PromptParamsConfig } from '../types'
import { hairColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'light red hair',
      options: [
        { value: 'light red hair', label: 'ライトレッド', swatch: '#c95a3a' },
        ...hairColorOptions('light red hair').filter(o => o.value !== 'light red hair'),
      ],
    },
    {
      id: 'outfit',
      type: 'select',
      label: '服装',
      match: 'a formal suit',
      options: [
        { value: 'a formal suit', label: 'フォーマルスーツ' },
        { value: 'a casual blazer', label: 'カジュアルブレザー' },
        { value: 'an academic professor outfit', label: '大学教授スタイル' },
        { value: 'an artist smock', label: 'アーティスト風' },
        { value: 'a cocktail dress', label: 'カクテルドレス' },
        { value: 'a kimono in formal style', label: 'フォーマル和装' },
      ],
    },
    {
      id: 'background',
      type: 'select',
      label: '背景',
      match: 'dark background',
      options: [
        { value: 'dark background', label: 'ダーク背景' },
        { value: 'office urban window background', label: 'オフィス・都市窓' },
        { value: 'library bookshelf background', label: '図書館書棚' },
        { value: 'marble white studio background', label: '大理石ホワイト' },
        { value: 'gradient warm sunset background', label: 'グラデーション夕焼け' },
        { value: 'minimalist concrete wall background', label: 'ミニマルコンクリート' },
      ],
    },
  ],
}
