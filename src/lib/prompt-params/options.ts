import type { ParamOption } from './types'

const HAIR_COLOR_BASE: ParamOption[] = [
  { value: 'black hair', label: '黒髪', swatch: '#1a1a1a' },
  { value: 'dark brown hair', label: 'ダークブラウン', swatch: '#3b2417' },
  { value: 'brown hair', label: 'ブラウン', swatch: '#6b4423' },
  { value: 'auburn hair', label: 'オーバーン', swatch: '#7a3e22' },
  { value: 'red hair', label: 'レッド', swatch: '#a0322a' },
  { value: 'orange hair', label: 'オレンジ', swatch: '#d27a3a' },
  { value: 'blonde hair', label: 'ブロンド', swatch: '#e8c97a' },
  { value: 'platinum blonde hair', label: 'プラチナブロンド', swatch: '#f0e8d2' },
  { value: 'silver hair', label: 'シルバー', swatch: '#c8c8d0' },
  { value: 'white hair', label: 'ホワイト', swatch: '#f7f7f7' },
  { value: 'grey hair', label: 'グレー', swatch: '#7a7a7a' },
  { value: 'pink hair', label: 'ピンク', swatch: '#e89bb4' },
  { value: 'blue hair', label: 'ブルー', swatch: '#4a6fa5' },
  { value: 'purple hair', label: 'パープル', swatch: '#8a6aa8' },
  { value: 'violet hair', label: 'バイオレット', swatch: '#6e4a8e' },
  { value: 'green hair', label: 'グリーン', swatch: '#5a8a6a' },
]

const HAIR_LENGTH_BASE: ParamOption[] = [
  { value: 'short hair', label: 'ショート' },
  { value: 'medium hair', label: 'ミディアム' },
  { value: 'long hair', label: 'ロング' },
  { value: 'very long hair', label: 'スーパーロング' },
]

const HAIR_STYLE_BASE: ParamOption[] = [
  { value: 'straight hair', label: 'ストレート' },
  { value: 'wavy hair', label: 'ウェーブ' },
  { value: 'curly hair', label: 'カール' },
  { value: 'braided hair', label: '三つ編み' },
  { value: 'ponytail', label: 'ポニーテール' },
  { value: 'twintails', label: 'ツインテール' },
]

const EXPRESSION_BASE: ParamOption[] = [
  { value: 'smile', label: '微笑み' },
  { value: 'gentle smile', label: '優しい微笑み' },
  { value: 'serious face', label: '真顔' },
  { value: 'laughing', label: '笑顔' },
  { value: 'pout', label: 'ふくれっ面' },
  { value: 'shy expression', label: '恥ずかしそう' },
  { value: 'smirk', label: '不敵な笑み' },
  { value: 'confident', label: '自信' },
]

const EYE_COLOR_BASE: ParamOption[] = [
  { value: 'black eyes', label: '黒', swatch: '#1a1a1a' },
  { value: 'brown eyes', label: 'ブラウン', swatch: '#6b4423' },
  { value: 'amber eyes', label: 'アンバー', swatch: '#c89a3a' },
  { value: 'hazel eyes', label: 'ヘーゼル', swatch: '#9a7a4a' },
  { value: 'blue eyes', label: 'ブルー', swatch: '#4a6fa5' },
  { value: 'green eyes', label: 'グリーン', swatch: '#5a8a6a' },
  { value: 'red eyes', label: 'レッド', swatch: '#a0322a' },
  { value: 'purple eyes', label: 'パープル', swatch: '#8a6aa8' },
  { value: 'pink eyes', label: 'ピンク', swatch: '#e89bb4' },
  { value: 'aqua eyes', label: 'アクア', swatch: '#5dc1c8' },
  { value: 'gold eyes', label: 'ゴールド', swatch: '#d4a64a' },
]

// Generic "fabric color" palette — usable for collars, dresses, capes, skirts, etc.
// The match prefix is supplied at config site (e.g. "blue sailor collar" → red sailor collar).
function fabricColors(suffix: string): ParamOption[] {
  return [
    { value: `red ${suffix}`, label: 'レッド', swatch: '#b03030' },
    { value: `pink ${suffix}`, label: 'ピンク', swatch: '#e89bb4' },
    { value: `orange ${suffix}`, label: 'オレンジ', swatch: '#d27a3a' },
    { value: `yellow ${suffix}`, label: 'イエロー', swatch: '#e0c648' },
    { value: `green ${suffix}`, label: 'グリーン', swatch: '#5a8a6a' },
    { value: `blue ${suffix}`, label: 'ブルー', swatch: '#4a6fa5' },
    { value: `navy ${suffix}`, label: 'ネイビー', swatch: '#1f2a4a' },
    { value: `purple ${suffix}`, label: 'パープル', swatch: '#8a6aa8' },
    { value: `black ${suffix}`, label: 'ブラック', swatch: '#1a1a1a' },
    { value: `white ${suffix}`, label: 'ホワイト', swatch: '#f7f7f7' },
    { value: `grey ${suffix}`, label: 'グレー', swatch: '#7a7a7a' },
    { value: `brown ${suffix}`, label: 'ブラウン', swatch: '#6b4423' },
  ]
}

// Ensures the default (matched) value is included in the option list,
// even if not present in the preset palette.
function withDefault(options: ParamOption[], defaultValue: string, fallbackLabel = '原文'): ParamOption[] {
  if (options.some(o => o.value === defaultValue)) return options
  return [{ value: defaultValue, label: fallbackLabel }, ...options]
}

export function hairColorOptions(defaultValue: string): ParamOption[] {
  return withDefault(HAIR_COLOR_BASE, defaultValue)
}
export function hairLengthOptions(defaultValue: string): ParamOption[] {
  return withDefault(HAIR_LENGTH_BASE, defaultValue)
}
export function hairStyleOptions(defaultValue: string): ParamOption[] {
  return withDefault(HAIR_STYLE_BASE, defaultValue)
}
export function expressionOptions(defaultValue: string): ParamOption[] {
  return withDefault(EXPRESSION_BASE, defaultValue)
}
export function eyeColorOptions(defaultValue: string): ParamOption[] {
  return withDefault(EYE_COLOR_BASE, defaultValue)
}
export function fabricColorOptions(suffix: string, defaultValue: string): ParamOption[] {
  return withDefault(fabricColors(suffix), defaultValue)
}
