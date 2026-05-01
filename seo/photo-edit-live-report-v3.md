# Style-Test-Live 报告 — photo-edit 真实渲染

> 渲染日期：2026-05-01
> 模型：gemini-2.5-flash-image
> 输出目录：seo/style-test-samples/output
> 渲染条数：5（成功 5 / 失败 0）

## 渲染结果

| Slug | 工具 | 源照片 | 输出 | 耗时 | 状态 |
|---|---|---|---|---:|---|
| `natural-skin-retouching-gentle` | gemini | `seo/style-test-samples/source/portrait-skin-detail.jpg` | [natural-skin-retouching-gentle.png](style-test-samples/output/natural-skin-retouching-gentle.png) | 10060ms | OK |
| `hairstyle-change-french-bob` | gemini | `seo/style-test-samples/source/portrait-long-hair.jpg` | [hairstyle-change-french-bob.png](style-test-samples/output/hairstyle-change-french-bob.png) | 11231ms | OK |
| `background-replace-studio-neutral` | gemini | `seo/style-test-samples/source/portrait-cluttered-bg.jpg` | [background-replace-studio-neutral.png](style-test-samples/output/background-replace-studio-neutral.png) | 12585ms | OK |
| `linkedin-professional-headshot` | gemini | `seo/style-test-samples/source/casual-portrait.jpg` | [linkedin-professional-headshot.png](style-test-samples/output/linkedin-professional-headshot.png) | 10199ms | OK |
| `expression-neutral-to-subtle-smile` | gemini | `seo/style-test-samples/source/portrait-neutral-face.jpg` | [expression-neutral-to-subtle-smile.png](style-test-samples/output/expression-neutral-to-subtle-smile.png) | 11131ms | OK |

## Before / After 对照

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

## 下一步评估建议

1. 人工对每张 After 评估「指令意图达成度」（保持身份、输出格式、质感、防呆是否生效）
2. 通过的 Before/After 可挂到 `/prompt/{slug}` 详情页作「効果サンプル」
3. 失败/低质条目需回 SKILL.md 补规则或调 prompt 文本，再重跑本 agent