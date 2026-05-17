import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'monster',
      type: 'select',
      label: 'モンスター種類',
      hint: 'giant scale で対比される生物',
      match: 'giant hairy baby monster',
      options: [
        { value: 'giant hairy baby monster', label: '毛むくじゃらの赤ちゃん怪物' },
        { value: 'giant evil cat monster', label: '巨大邪猫' },
        { value: 'giant tentacled deep sea creature', label: '深海触手生物' },
        { value: 'giant mechanical golem', label: '機械ゴーレム' },
        { value: 'giant ancient dragon', label: '古代ドラゴン' },
        { value: 'giant skeletal beast', label: '骨格獣' },
      ],
    },
    {
      id: 'era',
      type: 'select',
      label: '時代感',
      match: '1890',
      options: [
        { value: '1890', label: '1890年代（ヴィクトリアン）' },
        { value: '1920', label: '1920年代（モダニズム）' },
        { value: '1970', label: '1970年代（ニューウェーブ）' },
        { value: 'medieval', label: '中世' },
        { value: 'far future', label: '遠未来' },
      ],
    },
    {
      id: 'mood',
      type: 'select',
      label: '雰囲気',
      match: 'dark and gloomy',
      options: [
        { value: 'dark and gloomy', label: '暗く陰鬱' },
        { value: 'ethereal and dreamy', label: '幻想的' },
        { value: 'serene and tranquil', label: '静謐' },
        { value: 'chaotic and intense', label: '混沌・激烈' },
        { value: 'mysterious and otherworldly', label: '神秘的・異世界' },
      ],
    },
  ],
}
