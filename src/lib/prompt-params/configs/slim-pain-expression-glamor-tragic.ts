import type { PromptParamsConfig } from '../types'
import { hairColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'blonde hair',
      options: hairColorOptions('blonde hair'),
    },
    {
      id: 'mood',
      type: 'select',
      label: '感情',
      match: 'in pain',
      options: [
        { value: 'in pain', label: '苦痛' },
        { value: 'in sorrow', label: '哀しみ' },
        { value: 'in joy', label: '喜び' },
        { value: 'in serenity', label: '静謐' },
        { value: 'in fierce anger', label: '怒り' },
        { value: 'in longing', label: '憧れ' },
      ],
    },
    {
      id: 'pose',
      type: 'select',
      label: 'ポーズ',
      match: 'side glamor pose',
      options: [
        { value: 'side glamor pose', label: 'グラマー横向き' },
        { value: 'front glamor pose', label: 'グラマー正面' },
        { value: 'over the shoulder pose', label: '振り返り' },
        { value: 'kneeling pose', label: '膝立ち' },
        { value: 'leaning pose', label: 'もたれ' },
        { value: 'arms raised pose', label: '両腕上げ' },
      ],
    },
  ],
}
