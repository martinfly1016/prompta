import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'style',
      type: 'select',
      label: '画風',
      match: 'necronomicon illustrations',
      options: [
        { value: 'necronomicon illustrations', label: 'ネクロノミコン挿絵' },
        { value: 'medieval bestiary illustrations', label: '中世博物誌風' },
        { value: 'gothic horror illustrations', label: 'ゴシックホラー' },
        { value: 'dark fantasy illustrations', label: 'ダークファンタジー' },
        { value: 'victorian engraving illustrations', label: 'ヴィクトリア銅版画' },
        { value: 'horror comic illustrations', label: 'ホラーコミック' },
        { value: 'mythology painting illustrations', label: '神話絵画' },
      ],
    },
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'ghostly presence',
      options: [
        { value: 'ghostly presence', label: 'ゴーストリー' },
        { value: 'eerie atmosphere', label: '不気味' },
        { value: 'mysterious aura', label: '神秘的' },
        { value: 'menacing tone', label: '威圧的' },
        { value: 'sacred ritual', label: '神聖儀式' },
        { value: 'haunting silence', label: '亡霊の静寂' },
        { value: 'cosmic horror', label: 'コズミックホラー' },
      ],
    },
  ],
}
