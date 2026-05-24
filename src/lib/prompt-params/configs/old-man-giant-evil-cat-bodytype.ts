import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'dark and gloomy',
      options: [
        { value: 'dark and gloomy', label: '暗くて陰鬱' },
        { value: 'eerie and unsettling', label: '不気味で不安' },
        { value: 'mysterious and dim', label: '神秘的で薄暗い' },
        { value: 'ominous and brooding', label: '不吉で陰鬱' },
        { value: 'haunted twilight', label: '亡霊の黄昏' },
        { value: 'foreboding silence', label: '不気味な静寂' },
        { value: 'gothic and atmospheric', label: 'ゴシック雰囲気' },
      ],
    },
    {
      id: 'spirit',
      type: 'select',
      label: '気配',
      match: 'ghostly presence',
      options: [
        { value: 'ghostly presence', label: 'ゴーストリー' },
        { value: 'demonic presence', label: '悪魔的気配' },
        { value: 'spectral aura', label: '霊的オーラ' },
        { value: 'cursed atmosphere', label: '呪われた雰囲気' },
        { value: 'otherworldly aura', label: '異界的オーラ' },
        { value: 'sinister vibe', label: '邪悪な空気' },
        { value: 'ethereal mist', label: '幽玄な霧' },
      ],
    },
  ],
}
