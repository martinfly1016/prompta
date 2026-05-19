import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'animalGroup',
      type: 'select',
      label: '動物グループ',
      match: 'sea animals on a single canvas: one smiling fish, one octopus with curly tentacles, one sea turtle with patterned shell, one starfish with spots',
      options: [
        { value: 'sea animals on a single canvas: one smiling fish, one octopus with curly tentacles, one sea turtle with patterned shell, one starfish with spots', label: '海の生き物（デフォルト）' },
        { value: 'forest animals on a single canvas: one smiling fox, one owl on a branch, one rabbit, one squirrel with an acorn', label: '森の動物' },
        { value: 'farm animals on a single canvas: one smiling cow, one pig, one sheep, one chicken with feathers', label: '農場の動物' },
        { value: 'safari animals on a single canvas: one smiling lion, one elephant with curly trunk, one giraffe with long neck, one zebra with stripes', label: 'サファリの動物' },
        { value: 'arctic animals on a single canvas: one smiling penguin, one polar bear cub, one seal, one arctic fox with fluffy tail', label: '北極の動物' },
        { value: 'pet animals on a single canvas: one smiling cat with whiskers, one dog with floppy ears, one hamster, one parrot on a perch', label: 'ペット' },
      ],
    },
    {
      id: 'background',
      type: 'select',
      label: '背景',
      match: 'simple wavy water lines below',
      options: [
        { value: 'simple wavy water lines below', label: '波の線（デフォルト）' },
        { value: 'simple grass lines below', label: '草' },
        { value: 'small cloud outlines around', label: '雲' },
        { value: 'no background, pure white canvas', label: '背景なし（純白）' },
      ],
    },
    {
      id: 'lineWeight',
      type: 'select',
      label: '線の太さ',
      match: 'extra-thick consistent line weight',
      options: [
        { value: 'medium line weight', label: '中（少し大きな子供向け）' },
        { value: 'extra-thick consistent line weight', label: '極太（デフォルト・幼児向け）' },
        { value: 'super thick line weight for toddlers', label: '超極太（2-3歳向け）' },
      ],
    },
  ],
}
