import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'object',
      type: 'select',
      label: 'オブジェクト',
      match: 'glassy surreal futuristic object',
      options: [
        { value: 'glassy surreal futuristic object', label: 'ガラス質の未来オブジェ' },
        { value: 'transparent crystal futuristic object', label: '透明クリスタル' },
        { value: 'chrome and glass futuristic object', label: 'クローム＋ガラス' },
        { value: 'floating holographic futuristic object', label: '浮遊ホログラム' },
      ],
    },
    {
      id: 'colorTheme',
      type: 'select',
      label: '配色',
      match: 'blue and yellow color theme',
      options: [
        { value: 'blue and yellow color theme', label: 'ブルー×イエロー' },
        { value: 'cyan and magenta color theme', label: 'シアン×マゼンタ' },
        { value: 'black and gold color theme', label: 'ブラック×ゴールド' },
        { value: 'white and electric blue color theme', label: '白×電気ブルー' },
      ],
    },
    {
      id: 'lighting',
      type: 'select',
      label: '発光',
      match: 'fluorescent neon light',
      options: [
        { value: 'fluorescent neon light', label: '蛍光ネオン' },
        { value: 'soft internal glow', label: '内側からの淡い発光' },
        { value: 'sharp laser rim light', label: 'レーザーリムライト' },
        { value: 'cinematic volumetric light', label: 'シネマ風ボリューム光' },
      ],
    },
  ],
}
