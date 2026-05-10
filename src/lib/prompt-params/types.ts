export type ParamOption = {
  value: string
  label: string
  swatch?: string
}

type ParamBase = {
  id: string
  label: string
  hint?: string
  match: string
  options: ParamOption[]
}

export type ParamConfig =
  | (ParamBase & { type: 'color' })
  | (ParamBase & { type: 'select' })

export type PromptParamsConfig = {
  params: ParamConfig[]
}
