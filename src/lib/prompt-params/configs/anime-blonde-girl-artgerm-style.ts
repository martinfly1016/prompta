import type { PromptParamsConfig } from '../types'
import { eyeColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairLength',
      type: 'select',
      label: '髪の長さ',
      match: 'short blonde hair',
      options: [
        { value: 'short blonde hair', label: 'ショートブロンド' },
        { value: 'long blonde hair', label: 'ロングブロンド' },
        { value: 'wavy black hair', label: 'ウェーブ黒髪' },
        { value: 'long pink hair', label: 'ロングピンク' },
        { value: 'short silver hair', label: 'ショートシルバー' },
        { value: 'twintail brown hair', label: 'ツインテール茶髪' },
      ],
    },
    {
      id: 'eyeColor',
      type: 'color',
      label: '瞳の色',
      match: 'blue eyes',
      options: eyeColorOptions('blue eyes'),
    },
    {
      id: 'artist',
      type: 'select',
      label: 'アーティストスタイル',
      hint: '参照する画家',
      match: 'by artgerm',
      options: [
        { value: 'by artgerm', label: 'Artgerm' },
        { value: 'by Krenz Cushart', label: 'Krenz Cushart' },
        { value: 'by Ilya Kuvshinov', label: 'Ilya Kuvshinov' },
        { value: 'by WLOP', label: 'WLOP' },
        { value: 'by Sakimichan', label: 'Sakimichan' },
        { value: 'by Loish', label: 'Loish' },
      ],
    },
  ],
}
