import type { ParamConfig } from './types'

export type ParamValues = Record<string, string>

export function defaultValues(params: ParamConfig[]): ParamValues {
  const out: ParamValues = {}
  for (const p of params) out[p.id] = p.match
  return out
}

export function interpolate(
  content: string,
  params: ParamConfig[],
  values: ParamValues,
): string {
  let out = content
  for (const p of params) {
    const v = values[p.id] ?? p.match
    if (v === p.match) continue
    const idx = out.indexOf(p.match)
    if (idx === -1) continue
    out = out.slice(0, idx) + v + out.slice(idx + p.match.length)
  }
  return out
}
