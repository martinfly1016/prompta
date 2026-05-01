# Style-Test-Live 报告 — photo-edit 真实渲染

> 渲染日期：2026-05-01
> 模型：gemini-2.5-flash-image
> 输出目录：seo/style-test-samples/output
> 渲染条数：1（成功 1 / 失败 0）

## 渲染结果

| Slug | 工具 | 源照片 | 输出 | 耗时 | 状态 |
|---|---|---|---|---:|---|
| `passport-id-photo-icao-compliant` | gemini | `seo/style-test-samples/source/casual-portrait.jpg` | [passport-id-photo-icao-compliant.png](style-test-samples/output/passport-id-photo-icao-compliant.png) | 12408ms | OK |

## Before / After 对照

### passport-id-photo-icao-compliant

**Title**：パスポート証明写真 ICAO規格 - AI写真加工

| Before | After |
|---|---|
| ![before](style-test-samples/source/casual-portrait.jpg) | ![after](style-test-samples/output/passport-id-photo-icao-compliant.png) |

## 下一步评估建议

1. 人工对每张 After 评估「指令意图达成度」（保持身份、输出格式、质感、防呆是否生效）
2. 通过的 Before/After 可挂到 `/prompt/{slug}` 详情页作「効果サンプル」
3. 失败/低质条目需回 SKILL.md 补规则或调 prompt 文本，再重跑本 agent