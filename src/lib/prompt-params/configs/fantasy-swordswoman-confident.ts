import type { PromptParamsConfig } from '../types'
import { hairColorOptions, fabricColorOptions } from '../options'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'hairColor',
      type: 'color',
      label: '髪色',
      match: 'auburn hair',
      options: hairColorOptions('auburn hair'),
    },
    {
      id: 'cloak',
      type: 'color',
      label: 'クローク色',
      match: 'black cloak',
      options: fabricColorOptions('cloak', 'black cloak'),
    },
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'haughty',
      options: [
        { value: 'haughty', label: '高慢' },
        { value: 'serene', label: '穏やか' },
        { value: 'fierce', label: '激しい' },
        { value: 'melancholic', label: '憂鬱' },
        { value: 'cheerful', label: '陽気' },
        { value: 'mysterious', label: '神秘的' },
      ],
    },
  ],
}
