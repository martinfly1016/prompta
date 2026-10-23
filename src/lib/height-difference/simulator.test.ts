import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  buildGenerationPrompt,
  defaultSettings,
  layoutStage,
  type SimulatorSettings,
} from './simulator'

function withPose(pose: SimulatorSettings['pose'], framing: SimulatorSettings['framing'] = 'full'): SimulatorSettings {
  return { ...defaultSettings(), pose, framing }
}

test('taller head sits higher and both feet share the floor', () => {
  const layout = layoutStage(defaultSettings())
  assert.ok(layout.a.topY < layout.b.topY)
  assert.equal(layout.a.footY, layout.b.footY)
  assert.equal(layout.taller, 'A')
  const pxA = layout.a.footY - layout.a.topY
  const pxB = layout.b.footY - layout.b.topY
  assert.ok(Math.abs(pxA / pxB - 188 / 158) < 0.001)
})

test('raising A moves that head up and leaves B in place', () => {
  const base = layoutStage(defaultSettings())
  const raised = layoutStage({
    ...defaultSettings(),
    characterA: { ...defaultSettings().characterA, heightCm: 210 },
  })
  assert.ok(raised.a.topY < base.a.topY)
  assert.equal(raised.b.topY, base.b.topY)
})

test('body type changes shoulder width and hug stands closer than side by side', () => {
  const slim = layoutStage({
    ...defaultSettings(),
    characterA: { ...defaultSettings().characterA, bodyType: 'slim' },
  })
  const broad = layoutStage({
    ...defaultSettings(),
    characterA: { ...defaultSettings().characterA, bodyType: 'broad' },
  })
  assert.ok(broad.a.shoulderHalf > slim.a.shoulderHalf)

  const side = layoutStage(withPose('side-by-side'))
  const hug = layoutStage(withPose('hug'))
  assert.ok(Math.abs(hug.a.cx - hug.b.cx) < Math.abs(side.a.cx - side.b.cx))
})

test('waist framing crops above the floor', () => {
  const full = layoutStage(withPose('side-by-side', 'full'))
  const waist = layoutStage(withPose('side-by-side', 'waist'))
  assert.ok(waist.frame.y + waist.frame.h < full.frame.y + full.frame.h)
  assert.ok(waist.frame.y + waist.frame.h < waist.floorY)
})

test('generation prompt locks centimeters, pose, and which photo is attached', () => {
  const prompt = buildGenerationPrompt(defaultSettings(), { hasPhotoA: true, hasPhotoB: false })
  assert.match(prompt, /exactly 188 cm/)
  assert.match(prompt, /exactly 158 cm/)
  assert.match(prompt, /Height gap: 30 cm/)
  assert.match(prompt, /looks up/)
  assert.match(prompt, /1\. Character A reference photo/)
  assert.match(prompt, /No photo for Character B/)
  assert.doesNotMatch(prompt, /Character B reference photo/)
})
