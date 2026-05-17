import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'skinTone',
      type: 'select',
      label: '肌のトーン',
      match: 'tan Asian female',
      options: [
        { value: 'tan Asian female', label: '小麦肌アジア人女性' },
        { value: 'fair Asian female', label: '色白アジア人女性' },
        { value: 'olive Asian female', label: 'オリーブ肌アジア人女性' },
        { value: 'pale East Asian woman', label: '青白い東アジア女性' },
        { value: 'sun-kissed Southeast Asian woman', label: '日焼け東南アジア女性' },
      ],
    },
    {
      id: 'hair',
      type: 'select',
      label: '髪型・色',
      match: 'long brown and black straight fluffy hair',
      options: [
        { value: 'long brown and black straight fluffy hair', label: 'ロングストレート（茶黒ミックス）' },
        { value: 'long jet black straight glossy hair', label: 'ロングストレート（艶やか黒髪）' },
        { value: 'long honey brown wavy hair', label: 'ロングウェーブ（ハニーブラウン）' },
        { value: 'short bob asymmetric dark hair', label: 'ボブ（アシメダーク）' },
        { value: 'medium length silver gray hair', label: 'ミディアム（シルバーグレー）' },
        { value: 'long platinum blonde hair', label: 'ロングプラチナブロンド' },
      ],
    },
    {
      id: 'makeup',
      type: 'select',
      label: 'メイクの強さ',
      match: 'heavy eyeliner, makeup',
      options: [
        { value: 'heavy eyeliner, makeup', label: 'ヘビーアイライナー' },
        { value: 'soft natural makeup', label: 'ナチュラルメイク' },
        { value: 'bold red lip, smoky eye makeup', label: 'ボールド赤リップ＋スモーキーアイ' },
        { value: 'minimalist no-makeup look', label: 'すっぴん風' },
        { value: 'glamorous bridal makeup', label: 'グラマラスブライダル' },
      ],
    },
  ],
}
