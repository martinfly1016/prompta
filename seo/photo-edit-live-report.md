# Style-Test-Live 报告 — photo-edit 真实渲染

> 渲染日期：2026-05-01
> 模型：gemini-2.5-flash-image
> 输出目录：seo/style-test-samples/output
> 渲染条数：10（成功 10 / 失败 0）

## 渲染结果

| Slug | 工具 | 源照片 | 输出 | 耗时 | 状态 |
|---|---|---|---|---:|---|
| `background-removal-transparent-png` | gemini | `seo/style-test-samples/source/portrait-cluttered-bg.jpg` | [background-removal-transparent-png.png](style-test-samples/output/background-removal-transparent-png.png) | 12914ms | OK |
| `passport-id-photo-icao-compliant` | gemini | `seo/style-test-samples/source/casual-portrait.jpg` | [passport-id-photo-icao-compliant.png](style-test-samples/output/passport-id-photo-icao-compliant.png) | 18713ms | OK |
| `natural-skin-retouching-gentle` | gemini | `seo/style-test-samples/source/portrait-skin-detail.jpg` | [natural-skin-retouching-gentle.png](style-test-samples/output/natural-skin-retouching-gentle.png) | 18417ms | OK |
| `hairstyle-change-french-bob` | gemini | `seo/style-test-samples/source/portrait-long-hair.jpg` | [hairstyle-change-french-bob.png](style-test-samples/output/hairstyle-change-french-bob.png) | 9948ms | OK |
| `colorize-vintage-photo-1950s` | gemini | `seo/style-test-samples/source/vintage-bw.jpg` | [colorize-vintage-photo-1950s.png](style-test-samples/output/colorize-vintage-photo-1950s.png) | 10972ms | OK |
| `background-replace-studio-neutral` | gemini | `seo/style-test-samples/source/portrait-cluttered-bg.jpg` | [background-replace-studio-neutral.png](style-test-samples/output/background-replace-studio-neutral.png) | 11149ms | OK |
| `linkedin-professional-headshot` | gemini | `seo/style-test-samples/source/casual-portrait.jpg` | [linkedin-professional-headshot.png](style-test-samples/output/linkedin-professional-headshot.png) | 10259ms | OK |
| `expression-neutral-to-subtle-smile` | gemini | `seo/style-test-samples/source/portrait-neutral-face.jpg` | [expression-neutral-to-subtle-smile.png](style-test-samples/output/expression-neutral-to-subtle-smile.png) | 10516ms | OK |
| `outfit-swap-business-suit` | gemini | `seo/style-test-samples/source/portrait-casual-outfit.jpg` | [outfit-swap-business-suit.png](style-test-samples/output/outfit-swap-business-suit.png) | 10076ms | OK |
| `remove-bystanders-temple-background` | gemini | `seo/style-test-samples/source/group-photo.jpg` | [remove-bystanders-temple-background.png](style-test-samples/output/remove-bystanders-temple-background.png) | 9789ms | OK |

## Before / After 对照

### background-removal-transparent-png

**Title**：背景透過 PNG 出力 - 写真加工プロンプト

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-cluttered-bg.jpg) | ![after](style-test-samples/output/background-removal-transparent-png.png) |

### passport-id-photo-icao-compliant

**Title**：パスポート証明写真 ICAO規格 - AI写真加工

| Before | After |
|---|---|
| ![before](style-test-samples/source/casual-portrait.jpg) | ![after](style-test-samples/output/passport-id-photo-icao-compliant.png) |

### natural-skin-retouching-gentle

**Title**：自然な美肌レタッチ - Gemini写真加工

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-skin-detail.jpg) | ![after](style-test-samples/output/natural-skin-retouching-gentle.png) |

### hairstyle-change-french-bob

**Title**：髪型変更 ボブカット - AI写真加工プロンプト

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-long-hair.jpg) | ![after](style-test-samples/output/hairstyle-change-french-bob.png) |

### colorize-vintage-photo-1950s

**Title**：白黒写真カラー化 1950年代風 - 写真修復

| Before | After |
|---|---|
| ![before](style-test-samples/source/vintage-bw.jpg) | ![after](style-test-samples/output/colorize-vintage-photo-1950s.png) |

### background-replace-studio-neutral

**Title**：背景置換 スタジオ風 - AI写真加工プロンプト

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-cluttered-bg.jpg) | ![after](style-test-samples/output/background-replace-studio-neutral.png) |

### linkedin-professional-headshot

**Title**：LinkedIn プロフィール写真 - ビジネス向けAI加工

| Before | After |
|---|---|
| ![before](style-test-samples/source/casual-portrait.jpg) | ![after](style-test-samples/output/linkedin-professional-headshot.png) |

### expression-neutral-to-subtle-smile

**Title**：表情変更 ニッコリ笑顔 - AI写真加工

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-neutral-face.jpg) | ![after](style-test-samples/output/expression-neutral-to-subtle-smile.png) |

### outfit-swap-business-suit

**Title**：着せ替え ビジネススーツ - AI写真加工

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-casual-outfit.jpg) | ![after](style-test-samples/output/outfit-swap-business-suit.png) |

### remove-bystanders-temple-background

**Title**：不要物除去 通行人削除 - 京都神社背景

| Before | After |
|---|---|
| ![before](style-test-samples/source/group-photo.jpg) | ![after](style-test-samples/output/remove-bystanders-temple-background.png) |

## 下一步评估建议

1. 人工对每张 After 评估「指令意图达成度」（保持身份、输出格式、质感、防呆是否生效）
2. 通过的 Before/After 可挂到 `/prompt/{slug}` 详情页作「効果サンプル」
3. 失败/低质条目需回 SKILL.md 补规则或调 prompt 文本，再重跑本 agent