// Shared composition model for the height-difference simulator.
// The SVG preview and the Gemini prompt both read this so a locked
// setting cannot drift between what the user saw and what was generated.

export const HEIGHT_MIN = 120
export const HEIGHT_MAX = 210
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024

export const STAGE = {
  width: 440,
  height: 500,
  floorY: 468,
  pxPerCm: 2.02,
  headRadius: 15,
} as const

export const BODY_OPTIONS = [
  { id: 'slim', label: '細身', prompt: 'slim narrow build, narrow shoulders' },
  { id: 'average', label: '標準', prompt: 'average balanced build' },
  { id: 'athletic', label: 'がっちり', prompt: 'athletic build, broader shoulders, visible muscle' },
  { id: 'broad', label: '横幅広め', prompt: 'wide build, broad shoulders, larger body width' },
] as const

export const POSE_OPTIONS = [
  { id: 'side-by-side', label: '並んで立つ', prompt: 'standing side by side, relaxed arms, both facing the viewer' },
  { id: 'holding-hands', label: '手をつなぐ', prompt: 'holding hands, turned slightly toward each other' },
  { id: 'look-up', label: '見上げる・見下ろす', prompt: 'the shorter character looks up and the taller character looks down gently' },
  { id: 'hug', label: 'ハグ', prompt: 'the taller character embraces the shorter one, close and warm, both feet still on the same floor' },
  { id: 'kabedon', label: '壁ドン', prompt: 'kabe-don: the taller character plants one hand on the wall above the shorter character, who looks up' },
  { id: 'almost-kiss', label: 'キス直前', prompt: 'almost kissing, the taller character leans down, the shorter character is on tiptoe, and the height gap stays obvious' },
  { id: 'back-to-back', label: '背中合わせ', prompt: 'standing back to back, height difference readable from the head line' },
] as const

export const FRAMING_OPTIONS = [
  { id: 'full', label: '全身', prompt: 'full-body vertical framing, both pairs of feet visible, headroom above the taller head' },
  { id: 'three-quarter', label: '膝上', prompt: 'three-quarter framing cropped around the knees, both heads fully visible, height difference still obvious' },
  { id: 'waist', label: '腰上', prompt: 'waist-up framing, both heads fully visible, never crop the taller head, height difference readable from the head line' },
] as const

export const STYLE_OPTIONS = [
  { id: 'anime', label: 'アニメ塗り', prompt: 'polished anime illustration' },
  { id: 'photo', label: '写真風', prompt: 'photorealistic photograph, natural skin, soft light' },
  { id: 'manga', label: '少女漫画', prompt: 'shoujo manga illustration, clean line art' },
] as const

export const SCENE_OPTIONS = [
  { id: 'studio', label: 'シンプルな背景', prompt: 'soft studio background, plain floor' },
  { id: 'school', label: '校門・夕方', prompt: 'school gate at golden hour' },
  { id: 'cafe', label: 'カフェ', prompt: 'modern cafe interior' },
  { id: 'night', label: '夜の街', prompt: 'city street at night' },
] as const

export const RELATION_OPTIONS = [
  { id: 'oshi', label: '推しカップル', prompt: 'a favorite character and their partner, romantic tension' },
  { id: 'hetero', label: '男女カップル', prompt: 'a romantic couple, one man and one woman' },
  { id: 'bl', label: 'BL カップル', prompt: 'two male characters with gentle romantic tension' },
  { id: 'yuri', label: '百合カップル', prompt: 'two female characters with soft romantic tension' },
  { id: 'siblings', label: '兄妹・兄弟', prompt: 'siblings standing together' },
] as const

export type BodyType = (typeof BODY_OPTIONS)[number]['id']
export type PoseId = (typeof POSE_OPTIONS)[number]['id']
export type FramingId = (typeof FRAMING_OPTIONS)[number]['id']
export type StyleId = (typeof STYLE_OPTIONS)[number]['id']
export type SceneId = (typeof SCENE_OPTIONS)[number]['id']
export type RelationId = (typeof RELATION_OPTIONS)[number]['id']

export interface CharacterSettings {
  label: string
  heightCm: number
  bodyType: BodyType
  note: string
}

export interface SimulatorSettings {
  characterA: CharacterSettings
  characterB: CharacterSettings
  pose: PoseId
  framing: FramingId
  style: StyleId
  scene: SceneId
  relationship: RelationId
}

export interface Point {
  x: number
  y: number
}

export interface FigureLayout {
  id: 'A' | 'B'
  label: string
  heightCm: number
  bodyType: BodyType
  cx: number
  topY: number
  headCy: number
  headR: number
  headShiftX: number
  shoulderY: number
  hipY: number
  kneeY: number
  footY: number
  shoulderHalf: number
  hipHalf: number
  eyeDx: number
  eyeDy: number
  armL: { x1: number; y1: number; x2: number; y2: number }
  armR: { x1: number; y1: number; x2: number; y2: number }
}

export interface StageLayout {
  width: number
  height: number
  floorY: number
  a: FigureLayout
  b: FigureLayout
  frame: { x: number; y: number; w: number; h: number }
  wall: { x: number; y: number; w: number; h: number } | null
  gapCm: number
  ratio: number
  taller: 'A' | 'B' | 'tie'
}

const BODY_MULT: Record<BodyType, number> = {
  slim: 0.76,
  average: 1,
  athletic: 1.22,
  broad: 1.48,
}

function byId<T extends { id: string; prompt: string }>(options: readonly T[], id: string): string {
  return options.find((option) => option.id === id)?.prompt ?? id
}

export function defaultSettings(): SimulatorSettings {
  return {
    characterA: {
      label: '人物A',
      heightCm: 188,
      bodyType: 'athletic',
      note: '長めの黒髪、落ち着いた表情',
    },
    characterB: {
      label: '人物B',
      heightCm: 158,
      bodyType: 'slim',
      note: '短めの髪、やさしい笑顔',
    },
    pose: 'look-up',
    framing: 'full',
    style: 'anime',
    scene: 'studio',
    relationship: 'oshi',
  }
}

export function clampHeight(cm: number): number {
  if (!Number.isFinite(cm)) return 160
  return Math.min(HEIGHT_MAX, Math.max(HEIGHT_MIN, Math.round(cm)))
}

export function heightGap(settings: Pick<SimulatorSettings, 'characterA' | 'characterB'>): number {
  return Math.abs(settings.characterA.heightCm - settings.characterB.heightCm)
}

export function heightRatio(settings: Pick<SimulatorSettings, 'characterA' | 'characterB'>): number {
  const tall = Math.max(settings.characterA.heightCm, settings.characterB.heightCm)
  const short = Math.min(settings.characterA.heightCm, settings.characterB.heightCm)
  if (short <= 0) return 1
  return tall / short
}

export function summarizeJa(settings: SimulatorSettings): string {
  const pose = POSE_OPTIONS.find((option) => option.id === settings.pose)?.label ?? settings.pose
  const framing = FRAMING_OPTIONS.find((option) => option.id === settings.framing)?.label ?? settings.framing
  const bodyA = BODY_OPTIONS.find((option) => option.id === settings.characterA.bodyType)?.label
  const bodyB = BODY_OPTIONS.find((option) => option.id === settings.characterB.bodyType)?.label
  const gap = heightGap(settings)
  const ratio = heightRatio(settings).toFixed(2)
  return `${settings.characterA.label} ${settings.characterA.heightCm}cm（${bodyA}） / ${settings.characterB.label} ${settings.characterB.heightCm}cm（${bodyB}） / 差 ${gap}cm・${ratio}倍 / ${pose} / ${framing}`
}

function metrics(
  id: 'A' | 'B',
  character: CharacterSettings,
  cx: number,
): Omit<FigureLayout, 'headShiftX' | 'eyeDx' | 'eyeDy' | 'armL' | 'armR'> {
  const heightPx = character.heightCm * STAGE.pxPerCm
  const footY = STAGE.floorY
  const topY = footY - heightPx
  const headR = STAGE.headRadius
  const headCy = topY + headR
  const shoulderY = headCy + headR + 8
  const hipY = footY - heightPx * 0.46
  const kneeY = footY - heightPx * 0.24
  const mult = BODY_MULT[character.bodyType]
  return {
    id,
    label: character.label,
    heightCm: character.heightCm,
    bodyType: character.bodyType,
    cx,
    topY,
    headCy,
    headR,
    shoulderY,
    hipY,
    kneeY,
    footY,
    shoulderHalf: 20 * mult,
    hipHalf: 14 * mult,
  }
}

function hangArms(base: Omit<FigureLayout, 'headShiftX' | 'eyeDx' | 'eyeDy' | 'armL' | 'armR'>) {
  return {
    armL: {
      x1: base.cx - base.shoulderHalf,
      y1: base.shoulderY + 2,
      x2: base.cx - base.shoulderHalf - 8,
      y2: base.hipY + 18,
    },
    armR: {
      x1: base.cx + base.shoulderHalf,
      y1: base.shoulderY + 2,
      x2: base.cx + base.shoulderHalf + 8,
      y2: base.hipY + 18,
    },
  }
}

export function layoutStage(settings: SimulatorSettings): StageLayout {
  const { width, height, floorY } = STAGE
  const mid = width / 2
  const spread =
    settings.pose === 'hug' || settings.pose === 'back-to-back'
      ? 34
      : settings.pose === 'almost-kiss'
        ? 48
        : settings.pose === 'holding-hands'
          ? 64
          : settings.pose === 'kabedon'
            ? 58
            : 78
  const wallShift =
    settings.pose === 'kabedon'
      ? settings.characterA.heightCm >= settings.characterB.heightCm
        ? 18
        : -18
      : 0
  const ax = mid - spread + wallShift
  const bx = mid + spread + wallShift

  const aBase = metrics('A', settings.characterA, ax)
  const bBase = metrics('B', settings.characterB, bx)
  const aArms = hangArms(aBase)
  const bArms = hangArms(bBase)

  const taller: StageLayout['taller'] =
    settings.characterA.heightCm === settings.characterB.heightCm
      ? 'tie'
      : settings.characterA.heightCm > settings.characterB.heightCm
        ? 'A'
        : 'B'
  const shorterBase = taller === 'B' ? aBase : bBase

  if (settings.pose === 'holding-hands') {
    const handY = (aBase.shoulderY + aBase.hipY + bBase.shoulderY + bBase.hipY) / 4
    const midX = (ax + bx) / 2
    aArms.armR = { ...aArms.armR, x2: midX, y2: handY }
    bArms.armL = { ...bArms.armL, x2: midX, y2: handY }
  }

  if (settings.pose === 'hug') {
    aArms.armR = { ...aArms.armR, x2: bBase.cx - bBase.shoulderHalf * 0.15, y2: bBase.shoulderY + 28 }
    bArms.armL = { ...bArms.armL, x2: aBase.cx + aBase.shoulderHalf * 0.15, y2: aBase.shoulderY + 28 }
  }

  if (settings.pose === 'kabedon' && taller !== 'tie') {
    const tallArms = taller === 'A' ? aArms : bArms
    const wallX = shorterBase.id === 'B' ? width - 46 : 54
    const raised = {
      x1: taller === 'A' ? aArms.armR.x1 : bArms.armL.x1,
      y1: taller === 'A' ? aArms.armR.y1 : bArms.armL.y1,
      x2: wallX,
      y2: shorterBase.topY + 6,
    }
    if (taller === 'A') tallArms.armR = raised
    else tallArms.armL = raised
  }

  let aEye = { eyeDx: 2, eyeDy: 0 }
  let bEye = { eyeDx: -2, eyeDy: 0 }
  let aHead = 0
  let bHead = 0
  if (settings.pose === 'look-up' && taller !== 'tie') {
    if (taller === 'A') {
      aEye = { eyeDx: 3, eyeDy: 3 }
      bEye = { eyeDx: -3, eyeDy: -4 }
    } else {
      aEye = { eyeDx: 3, eyeDy: -4 }
      bEye = { eyeDx: -3, eyeDy: 3 }
    }
  }
  if (settings.pose === 'almost-kiss') {
    aHead = 8
    bHead = -8
    aEye = { eyeDx: 4, eyeDy: taller === 'A' ? 2 : -2 }
    bEye = { eyeDx: -4, eyeDy: taller === 'B' ? 2 : -2 }
  }
  if (settings.pose === 'back-to-back') {
    aEye = { eyeDx: -5, eyeDy: 0 }
    bEye = { eyeDx: 5, eyeDy: 0 }
  }
  if (settings.pose === 'kabedon' && taller !== 'tie') {
    if (taller === 'A') bEye = { eyeDx: -2, eyeDy: -4 }
    else aEye = { eyeDx: 2, eyeDy: -4 }
  }

  const a: FigureLayout = { ...aBase, ...aArms, ...aEye, headShiftX: aHead }
  const b: FigureLayout = { ...bBase, ...bArms, ...bEye, headShiftX: bHead }

  const headTop = Math.min(a.topY, b.topY) - 18
  const camera = taller === 'B' ? b : a
  const frameBottom =
    settings.framing === 'waist'
      ? camera.hipY
      : settings.framing === 'three-quarter'
        ? camera.kneeY
        : floorY + 8
  const frame = {
    x: 36,
    y: Math.max(8, headTop),
    w: width - 72,
    h: Math.max(80, frameBottom - Math.max(8, headTop)),
  }

  const wall =
    settings.pose === 'kabedon'
      ? shorterBase.id === 'A'
        ? { x: 40, y: 20, w: 16, h: floorY - 20 }
        : { x: width - 56, y: 20, w: 16, h: floorY - 20 }
      : null

  return {
    width,
    height,
    floorY,
    a,
    b,
    frame,
    wall,
    gapCm: heightGap(settings),
    ratio: heightRatio(settings),
    taller,
  }
}

function appearanceLine(character: CharacterSettings, who: 'A' | 'B', hasPhoto: boolean): string {
  const note = character.note.replace(/\s+/g, ' ').trim()
  if (hasPhoto) {
    return `Use the attached Character ${who} photo as the identity reference for ${character.label}. Keep the face, hair, and recognizable features, but redraw the body to the locked height and pose. Do not paste the original photo into the frame.`
  }
  return `No photo for Character ${who}. Invent ${character.label} from this description only: ${note || 'an original character with no specific real-person likeness'}.`
}

export function buildGenerationPrompt(
  settings: SimulatorSettings,
  photos: { hasPhotoA: boolean; hasPhotoB: boolean },
): string {
  const a = settings.characterA
  const b = settings.characterB
  const gap = heightGap(settings)
  const ratio = heightRatio(settings).toFixed(2)
  const taller =
    gap === 0
      ? 'neither — draw them at the same height'
      : a.heightCm > b.heightCm
        ? `character A (${a.label})`
        : `character B (${b.label})`
  const shorter =
    gap === 0
      ? 'neither'
      : a.heightCm < b.heightCm
        ? `character A (${a.label})`
        : `character B (${b.label})`

  const attachments: string[] = []
  if (photos.hasPhotoA) attachments.push('Character A reference photo')
  if (photos.hasPhotoB) attachments.push('Character B reference photo')

  return [
    'Create one illustration of exactly two people together.',
    `Relationship: ${byId(RELATION_OPTIONS, settings.relationship)}.`,
    'LOCKED COMPOSITION — follow these measurements. Do not average the heights and do not ignore the gap:',
    `- Character A, called "${a.label}": exactly ${a.heightCm} cm tall, ${byId(BODY_OPTIONS, a.bodyType)}.`,
    `- Character B, called "${b.label}": exactly ${b.heightCm} cm tall, ${byId(BODY_OPTIONS, b.bodyType)}.`,
    `- Taller person: ${taller}. Shorter person: ${shorter}.`,
    `- Height gap: ${gap} cm. Taller divided by shorter: ${ratio}.`,
    '- Both people stand on the same floor. The taller head is visibly higher by that gap. Same height, equal height, and cropped legs are wrong.',
    a.bodyType === b.bodyType
      ? '- Their body widths are similar; the height gap is the main contrast.'
      : `- Body contrast is required: A is ${byId(BODY_OPTIONS, a.bodyType)}, B is ${byId(BODY_OPTIONS, b.bodyType)}.`,
    `- Pose: ${byId(POSE_OPTIONS, settings.pose)}.`,
    `- Framing: ${byId(FRAMING_OPTIONS, settings.framing)}.`,
    `- Style: ${byId(STYLE_OPTIONS, settings.style)}. Scene: ${byId(SCENE_OPTIONS, settings.scene)}.`,
    'Attached images, in this order:',
    attachments.length ? attachments.map((line, index) => `${index + 1}. ${line}`).join('\n') : 'None.',
    appearanceLine(a, 'A', photos.hasPhotoA),
    appearanceLine(b, 'B', photos.hasPhotoB),
    photos.hasPhotoA && !photos.hasPhotoB
      ? 'Character B must be a different person from Character A. Do not reuse A\'s face.'
      : 'Keep A and B as two distinct people.',
    'Output a single image with no captions, no height labels, no collage, and no extra people.',
  ].join('\n')
}
