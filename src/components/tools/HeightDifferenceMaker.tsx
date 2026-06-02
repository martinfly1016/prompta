'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Copy, RefreshCw, Ruler, Users, Wand2 } from 'lucide-react'
import { trackToolEvent } from '@/lib/track'

type Mode = 'height' | 'body' | 'reverse' | 'trio'
type OutputType = 'stable-diffusion' | 'midjourney' | 'chatgpt'

const modeOptions: Array<{ value: Mode; label: string; description: string }> = [
  { value: 'height', label: '身長差', description: '高い人物と低い人物の差を強調' },
  { value: 'body', label: '体格差', description: '筋肉量・肩幅・横幅の差を強調' },
  { value: 'reverse', label: '逆身長差', description: '女性側や左側の人物を高く見せる' },
  { value: 'trio', label: '3人構図', description: '高・中・低の並びを作る' },
]

const relationshipOptions = [
  '推しカップル',
  'BL カップル',
  '百合カップル',
  '男女カップル',
  '兄妹',
  '先輩後輩',
  'RPG パーティ',
  'VTuber デュオ',
]

const poseOptions = [
  '並んで立つ',
  '手をつなぐ',
  '見上げる・見下ろす',
  'ハグ',
  '壁ドン',
  'キス直前',
  '背中合わせ',
  'キャラクター設定資料',
]

const styleOptions = [
  'anime illustration',
  'shoujo manga style',
  'photorealistic illustration',
  'fantasy concept art',
  'VTuber key visual',
  'character design sheet',
]

const sceneOptions = [
  'school gate at golden hour',
  'modern cafe interior',
  'fantasy castle corridor',
  'city street at night',
  'soft studio background',
  'idol stage with spotlights',
  'autumn park walkway',
  'simple white background',
]

const relationshipMap: Record<string, string> = {
  '推しカップル': 'two favorite original characters with romantic tension',
  'BL カップル': 'two male characters with gentle romantic tension',
  '百合カップル': 'two female characters with soft romantic tension',
  '男女カップル': 'a boy and a girl as a couple',
  '兄妹': 'an older sibling and younger sibling',
  '先輩後輩': 'senpai and kohai pair',
  'RPG パーティ': 'fantasy adventure party pair',
  'VTuber デュオ': 'VTuber idol duo',
}

const poseMap: Record<string, string> = {
  '並んで立つ': 'standing side by side, full body shot, even spacing',
  '手をつなぐ': 'holding hands, looking at each other, full body shot',
  '見上げる・見下ろす': 'shorter character looking up, taller character looking down gently',
  'ハグ': 'tall character embracing the shorter one, warm intimate pose',
  '壁ドン': 'kabe-don pose, taller character hand on wall, shorter character looking up',
  'キス直前': 'almost kissing, taller character leaning down, shorter character standing on tiptoe',
  '背中合わせ': 'standing back to back, full body composition',
  'キャラクター設定資料': 'character lineup, clean full body reference sheet',
}

function characterPhrase(name: string, description: string, height: number, role: string) {
  return `${name || role}, ${description}, around ${height}cm`
}

function getBuildPhrase(mode: Mode) {
  if (mode === 'body') {
    return '(body size difference:1.4), (build difference:1.35), broad shoulders versus narrow shoulders, muscle mass contrast'
  }
  if (mode === 'reverse') {
    return '(reverse height difference:1.35), (woman taller:1.3), clearly taller left character'
  }
  if (mode === 'trio') {
    return '(varied heights:1.35), tall medium short lineup, clear height progression'
  }
  return '(height difference:1.35), (tall and short:1.25), clear height gap'
}

function buildPrompt(values: {
  mode: Mode
  outputType: OutputType
  characterA: string
  characterB: string
  characterC: string
  descriptionA: string
  descriptionB: string
  descriptionC: string
  heightA: number
  heightB: number
  heightC: number
  relationship: string
  pose: string
  style: string
  scene: string
}) {
  const relation = relationshipMap[values.relationship] ?? values.relationship
  const pose = poseMap[values.pose] ?? values.pose
  const count = values.mode === 'trio' ? '3 characters' : values.relationship === '男女カップル' ? '1boy and 1girl' : '2 characters'
  const first = characterPhrase(values.characterA, values.descriptionA, values.heightA, 'tall character')
  const second = characterPhrase(values.characterB, values.descriptionB, values.heightB, 'short character')
  const third = characterPhrase(values.characterC, values.descriptionC, values.heightC, 'middle character')
  const contrast = getBuildPhrase(values.mode)

  const base = values.mode === 'trio'
    ? `${count}, ${first} on the left, ${third} in the middle, ${second} on the right, ${relation}, ${contrast}, ${pose}, ${values.scene}, ${values.style}, full body shot, clean composition, (masterpiece:1.2), (best quality:1.4)`
    : `${count}, ${first}, ${second}, ${relation}, ${contrast}, ${pose}, ${values.scene}, ${values.style}, full body shot, clear full-body proportions, (masterpiece:1.2), (best quality:1.4)`

  if (values.outputType === 'midjourney') {
    return `${base.replace(/\(([^:]+):[0-9.]+\)/g, '$1')} --ar 9:16 --v 6 --style raw`
  }

  if (values.outputType === 'chatgpt') {
    return `Create an image prompt for ${relation}. Show ${first} and ${second}${values.mode === 'trio' ? ` plus ${third}` : ''}. The image must clearly show ${values.mode === 'body' ? 'body size and build contrast' : 'the height difference'}, with ${pose}. Use ${values.style} in ${values.scene}. Keep a full body composition and make the difference visually obvious.`
  }

  return base
}

function buildNegativePrompt(mode: Mode) {
  const common = 'same height, equal height, identical body proportions, same size, bad anatomy, bad hands, extra arms, fused bodies, conjoined twins, cropped legs, worst quality, low quality, blurry'
  if (mode === 'reverse') {
    return `${common}, tall man taller than woman, traditional height pairing, man towering over woman`
  }
  if (mode === 'body') {
    return `${common}, same body type, identical builds, equal body sizes`
  }
  return common
}

export function HeightDifferenceMaker() {
  const [mode, setMode] = useState<Mode>('height')
  const [outputType, setOutputType] = useState<OutputType>('stable-diffusion')
  const [characterA, setCharacterA] = useState('tall partner')
  const [characterB, setCharacterB] = useState('petite partner')
  const [characterC, setCharacterC] = useState('medium partner')
  const [descriptionA, setDescriptionA] = useState('long dark hair, calm expression, elegant outfit')
  const [descriptionB, setDescriptionB] = useState('short pastel hair, gentle smile, cute outfit')
  const [descriptionC, setDescriptionC] = useState('medium height friend, balanced outfit')
  const [heightA, setHeightA] = useState(188)
  const [heightB, setHeightB] = useState(158)
  const [heightC, setHeightC] = useState(170)
  const [relationship, setRelationship] = useState('推しカップル')
  const [pose, setPose] = useState('見上げる・見下ろす')
  const [style, setStyle] = useState('anime illustration')
  const [scene, setScene] = useState('school gate at golden hour')
  const [copied, setCopied] = useState<'prompt' | 'negative' | null>(null)

  const prompt = useMemo(() => buildPrompt({
    mode,
    outputType,
    characterA,
    characterB,
    characterC,
    descriptionA,
    descriptionB,
    descriptionC,
    heightA,
    heightB,
    heightC,
    relationship,
    pose,
    style,
    scene,
  }), [mode, outputType, characterA, characterB, characterC, descriptionA, descriptionB, descriptionC, heightA, heightB, heightC, relationship, pose, style, scene])

  const negativePrompt = useMemo(() => buildNegativePrompt(mode), [mode])
  const gap = Math.abs(heightA - heightB)

  useEffect(() => {
    trackToolEvent('height_difference_tool_view', {
      tool: 'height-difference-maker',
      surface: 'tool-page',
    })
  }, [])

  const trackInteraction = (action: string, extra: Record<string, unknown> = {}) => {
    trackToolEvent('height_difference_tool_click', {
      tool: 'height-difference-maker',
      surface: 'tool-page',
      action,
      mode,
      output_type: outputType,
      height_gap: gap,
      ...extra,
    })
  }

  const copyText = async (kind: 'prompt' | 'negative', text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(kind)
    trackToolEvent('height_difference_prompt_copy', {
      tool: 'height-difference-maker',
      surface: 'tool-page',
      copy_kind: kind,
      mode,
      output_type: outputType,
      height_gap: gap,
      prompt_length: text.length,
    })
    window.setTimeout(() => setCopied(null), 1600)
  }

  const swapCharacters = () => {
    setCharacterA(characterB)
    setCharacterB(characterA)
    setDescriptionA(descriptionB)
    setDescriptionB(descriptionA)
    setHeightA(heightB)
    setHeightB(heightA)
    trackInteraction('swap_characters')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)] gap-6">
      <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <Wand2 className="w-5 h-5 text-sky-600" aria-hidden="true" />
          <h2 className="text-lg font-bold text-gray-900">プロンプト設定</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">モード</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {modeOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  data-testid={`height-maker-mode-${option.value}`}
                  onClick={() => {
                    setMode(option.value)
                    trackInteraction('mode_change', { next_mode: option.value })
                  }}
                  className={`min-h-[74px] rounded-lg border px-3 py-2 text-left transition-colors ${
                    mode === option.value
                      ? 'border-sky-500 bg-sky-50 text-sky-900'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-sky-300'
                  }`}
                >
                  <span className="block text-sm font-semibold">{option.label}</span>
                  <span className="block text-xs text-gray-500 mt-1 leading-snug">{option.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField label="関係性" value={relationship} onChange={setRelationship} options={relationshipOptions} />
            <SelectField label="ポーズ" value={pose} onChange={setPose} options={poseOptions} />
            <SelectField label="画風" value={style} onChange={setStyle} options={styleOptions} />
            <SelectField label="背景" value={scene} onChange={setScene} options={sceneOptions} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CharacterField
              label={mode === 'reverse' ? '高く見せたい人物' : '高い人物'}
              name={characterA}
              description={descriptionA}
              height={heightA}
              min={150}
              max={215}
              onNameChange={setCharacterA}
              onDescriptionChange={setDescriptionA}
              onHeightChange={setHeightA}
            />
            <CharacterField
              label="低い人物"
              name={characterB}
              description={descriptionB}
              height={heightB}
              min={120}
              max={190}
              onNameChange={setCharacterB}
              onDescriptionChange={setDescriptionB}
              onHeightChange={setHeightB}
            />
            {mode === 'trio' && (
              <div className="sm:col-span-2">
                <CharacterField
                  label="中間の人物"
                  name={characterC}
                  description={descriptionC}
                  height={heightC}
                  min={130}
                  max={205}
                  onNameChange={setCharacterC}
                  onDescriptionChange={setDescriptionC}
                  onHeightChange={setHeightC}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Ruler className="w-4 h-4 text-sky-600" aria-hidden="true" />
              <span>身長差: <strong className="text-gray-900">{gap}cm</strong></span>
            </div>
            <button
              type="button"
              onClick={swapCharacters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-sky-300 hover:text-sky-700"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              入れ替え
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 lg:sticky lg:top-20 self-start">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          <h2 className="text-lg font-bold text-gray-900">生成結果</h2>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {([
            ['stable-diffusion', 'SD'],
            ['midjourney', 'MJ'],
            ['chatgpt', 'ChatGPT'],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-testid={`height-maker-output-${value}`}
              onClick={() => {
                setOutputType(value)
                trackInteraction('output_change', { next_output_type: value })
              }}
              className={`rounded-lg border px-2 py-2 text-sm font-semibold transition-colors ${
                outputType === value
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <OutputBlock
          label="Prompt"
          value={prompt}
          copied={copied === 'prompt'}
          onCopy={() => copyText('prompt', prompt)}
        />
        {outputType === 'stable-diffusion' && (
          <OutputBlock
            label="Negative prompt"
            value={negativePrompt}
            copied={copied === 'negative'}
            onCopy={() => copyText('negative', negativePrompt)}
          />
        )}
      </section>
    </div>
  )
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-gray-900 mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
      >
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

function CharacterField({
  label,
  name,
  description,
  height,
  min,
  max,
  onNameChange,
  onDescriptionChange,
  onHeightChange,
}: {
  label: string
  name: string
  description: string
  height: number
  min: number
  max: number
  onNameChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onHeightChange: (value: number) => void
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center justify-between gap-3 mb-2">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <span className="text-sm font-bold text-sky-700 tabular-nums">{height}cm</span>
      </div>
      <input
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        className="mb-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
        aria-label={`${label} name`}
      />
      <textarea
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        rows={3}
        className="mb-2 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
        aria-label={`${label} description`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={height}
        onChange={(event) => onHeightChange(Number(event.target.value))}
        className="w-full accent-sky-600"
        aria-label={`${label} height`}
      />
    </div>
  )
}

function OutputBlock({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string
  value: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-sky-300 hover:text-sky-700"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
          {copied ? 'コピー済み' : 'コピー'}
        </button>
      </div>
      <textarea
        readOnly
        value={value}
        rows={label === 'Prompt' ? 9 : 5}
        className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-xs leading-relaxed text-gray-800"
      />
    </div>
  )
}
