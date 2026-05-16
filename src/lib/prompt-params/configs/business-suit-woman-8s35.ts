import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'role',
      type: 'select',
      label: '職業',
      hint: '人物の役割設定',
      match: 'author',
      options: [
        { value: 'author', label: '作家' },
        { value: 'CEO', label: 'CEO' },
        { value: 'lawyer', label: '弁護士' },
        { value: 'professor', label: '教授' },
        { value: 'doctor', label: '医師' },
        { value: 'architect', label: '建築家' },
        { value: 'journalist', label: 'ジャーナリスト' },
      ],
    },
    {
      id: 'shot',
      type: 'select',
      label: 'ショット',
      match: 'close-up',
      options: [
        { value: 'close-up', label: 'クローズアップ' },
        { value: 'medium shot', label: 'ミディアム' },
        { value: 'three-quarter portrait', label: 'スリークォーター' },
        { value: 'full body shot', label: '全身' },
        { value: 'extreme close-up of face', label: '顔超接写' },
      ],
    },
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'exuding charisma',
      options: [
        { value: 'exuding charisma', label: 'カリスマ' },
        { value: 'thoughtful and intellectual', label: '知的' },
        { value: 'warm and approachable', label: 'あたたかい' },
        { value: 'serene and composed', label: '落ち着き' },
        { value: 'fierce and determined', label: '決意' },
      ],
    },
  ],
}
