# Style-Test-Live 视觉评估报告

> 渲染日期：2026-05-01
> 模型：gemini-2.5-flash-image
> 渲染条数：10 / 10 全部成功（API 层面）
> 视觉评估：人工审阅 10 张 After PNG，对照源照片 + prompt 意图判定

## 评估口径

每条按三轴打分：

- **I (Intent)**：prompt 要求的核心编辑是否真的发生
- **R2 (Preserve)**：身份 / 姿势 / 背景等明确保留项是否真的保留
- **R5 (Guard)**：反向防呆约束（不要塑料感、不要白晕、不要过锐等）是否真的避免

最终判定：
- **PASS** = 三轴全部 ✅
- **PARTIAL** = I ✅ 但 R2 或 R5 有明显失分
- **FAIL** = I 未达成

## 全量评估表

| # | Slug | I 意图 | R2 保持 | R5 防呆 | 判定 | 关键观察 |
|---|---|:-:|:-:|:-:|:-:|---|
| 1 | `remove-bystanders-temple-background` | ✅ 路人没了 | ❌ 主体 3 人组、原寺院构图全部重新生成 | ✅ 无明显伪影 | **PARTIAL** | Gemini 把整张图重新画了，路人确实不在，但原本的 3 个朋友也不在了 |
| 2 | `outfit-swap-business-suit` | ✅ 海军蓝西装 / 白衬衫 / 红领带 | ❌ 面部身份明显改变 + 背景被换成纯灰（prompt 要求 preserve background） | ✅ 没乱加配饰 | **PARTIAL** | 服装换得专业，但身份保持失败 |
| 3 | `expression-neutral-to-subtle-smile` | ✅ 嘴角微上扬 | ✅ 身份/发型/姿势保留 | ✅ 无露齿 | **PASS** | 微笑非常自然 subtle，规则严格执行 |
| 4 | `linkedin-professional-headshot` | ✅ 现代办公室柔焦背景 / 三点光 | ✅ 服装/发型保留，身份接近 | ✅ 无过度磨皮 | **PASS** | 商业可用质量 |
| 5 | `background-replace-studio-neutral` | ✅ 纯灰 #D8D8D8 | ✅ 主体毛衣/姿势/微笑全部保留 | ✅ 无白晕、无肤色偏色 | **PASS** | 视觉效果最好的一张，可直接做封面样片 |
| 6 | `colorize-vintage-photo-1950s` | ✅ 上色合理 | ❌ **完全重新生成** — 人脸、姿势、纹理都不是源 B&W 照 | ⚠️ 没有过锐但也没"保留 grain" | **PARTIAL** | colorize 任务被 Gemini 当成 text-to-image 重画了 |
| 7 | `hairstyle-change-french-bob` | ✅ 齐刘海 chin-length bob | ✅ 白 T 恤 / 浅灰背景 / 身份接近 | ✅ 面部结构未改 | **PASS** | 标杆样片 |
| 8 | `natural-skin-retouching-gentle` | ✅ 光滑了瑕疵 | ✅ **下颌雀斑/痣保留** + 身份保留 | ✅ 无塑料感 | **PASS** | R5 反向防呆生效得最明显的一条，强烈推荐做样片 |
| 9 | `passport-id-photo-icao-compliant` | ✅ 白底 / 中心 / 中性表情 / 35×45 比例 | ✅ 身份高保留 | ✅ 无美颜 / 面部无阴影 | **PASS** | 教科书级证件照 |
| 10 | `background-removal-transparent-png` | ❌ **未抠图，输出仍是原杂乱客厅，不是透明 PNG** | N/A | N/A | **FAIL** | Gemini 2.5 Flash Image 当前不支持 alpha 通道输出 |

## 汇总

- **PASS：5 条** — expression / linkedin / bg-replace / hairstyle / skin-retouch / passport
- **PARTIAL：3 条** — bystanders / outfit-swap / colorize（意图达成但保持声明被忽略）
- **FAIL：1 条** — bg-removal-transparent-png（Gemini 模型限制）

PASS 率 = **60%**，含 PARTIAL 的「视觉效果可用」率 = **90%**。

## 关键发现（阶段 1 静态审计抓不到）

### 发现 1：Gemini 在「身份保持」上比 prompt 写的弱

即使 prompt 严格写明 `Preserve the facial identity completely`，Gemini 仍倾向把人脸**重新生成**（尤其 colorize / outfit-swap / bystanders 这种「编辑范围大」的场景）。R2 在静态审计上 100% 通过，但真实模型只有 7 / 9 真正生效（已扣除 N/A 的 bg-removal）。

**根因推测**：Gemini 2.5 Flash Image 的 attention 是「整图重绘 + 局部锚定」，不是真正的像素级 inpainting。编辑范围越大越容易触发"重画"。

### 发现 2：透明 PNG 输出 Gemini 当前不支持

`background-removal-transparent-png` 完全失败 — 模型直接返回原图未修改。建议详情页将该 prompt 标注「Gemini 不适用，推荐 Photoroom / remove.bg / rembg」，或把工具切换到 ChatGPT 画像編集（GPT-4o image）再试。

### 发现 3：编辑「面积小、改动局部」的任务最稳

PASS 的 5 条都是局部改动（表情微笑、磨皮、头发、证件照构图、加 LinkedIn 背景）。背景大改 + 服装大改 + 全图上色 这三类是 PARTIAL 重灾区。

## 建议动作

### 立即修订

1. **SKILL.md 新增 R6 规则**（仅 colorize / restore / bystander-removal 类）：
   `Do not regenerate the photo from scratch — only operate on the existing pixels and preserve every face, pose, and texture exactly as the source.`
2. **bg-removal-transparent-png 详情页加标注**：`※ Gemini 2.5 Flash Image はアルファ出力に未対応。Photoroom / remove.bg / rembg などの専用ツール推奨。`
3. **outfit-swap-business-suit prompt 强化身份锁定**：在 R2 后追加 `Lock the exact facial identity and skin tone of the source person — do not regenerate the face.`

### 推荐做「効果サンプル」上详情页（视觉可用性高）

排序（最佳 → 仍可用）：

1. ⭐ `background-replace-studio-neutral` — 干净度最高，主体身份保留最完美
2. ⭐ `natural-skin-retouching-gentle` — 反向防呆生效得最明显（雀斑保留、不塑料）
3. ⭐ `passport-id-photo-icao-compliant` — 规格化输出标杆
4. `hairstyle-change-french-bob` — 发型变化清晰，对比强
5. `linkedin-professional-headshot` — 商业感强
6. `expression-neutral-to-subtle-smile` — 微表情 subtle，需要 Before/After 并列才看得出区别

### 阶段 3 路线图

- 把 PASS 的 5 张 Before/After 上传到 Vercel Blob，给 `Prompt` 模型加 `sampleBeforeUrl` / `sampleAfterUrl` 字段，详情页做「効果サンプル」section
- 用 Sonnet 4.6 multimodal 自动给 After 打 0-5 分（替代人工评估），把分数列进 live-report
- 对 PARTIAL / FAIL 条目按 R6 改写 prompt 后重跑本 agent，对比修订前后差异

## V2 结果（R6 加固后重跑）

> 重跑日期：2026-05-01
> 范围：outfit-swap-business-suit / colorize-vintage-photo-1950s / remove-bystanders-temple-background
> v1 备份在 `seo/style-test-samples/output/_v1_*.png`

| Slug | v1 vs v2 视觉变化 | R6 效果 |
|---|---|---|
| outfit-swap-business-suit | ≈ 0（仍生成「穿西装的通用亚洲女性」模板，身份未保留） | ❌ **无效** |
| colorize-vintage-photo-1950s | ≈ 0（仍是全新生成的彩色女性，源 B&W 照纹理 / 姿势 / 身份完全丢失） | ❌ **无效** |
| remove-bystanders-temple-background | ≈ 0（仍是全新生成的和服樱花场景） | ❌ **无效** |

### 关键修订结论

**R6 prompt 规则在 Gemini 2.5 Flash Image 上几乎无效**。模型在大范围编辑任务上倾向 text-to-image 模式，明确写"do not regenerate"也会被忽略。这是**模型能力上限**，不是 prompt 工程能解决的。

### 调整建议

1. **SKILL.md 的 R6 仍保留** — 对未来更强的模型（Gemini 3.0 / Nano Banana Pro）可能生效，且静态审计层面提供保险
2. **PARTIAL 三条在 Gemini 工具下仅适合作"概念展示"，不适合作真实编辑工具推荐**：
   - colorize-vintage-photo-1950s → 详情页应明确「Gemini は新規生成寄り、ピクセル保持には Photoshop Neural Filters 推奨」
   - outfit-swap-business-suit → 改 toolSlug 为 chatgpt（GPT-4o image edit）或保留 Gemini 但加注「アイデンティティ保持には限界あり」
   - remove-bystanders-temple-background → 同样推荐 ChatGPT 或专门的 inpainting 工具
3. **样片选材最终结论**：仅用 6 个 PASS 条目作「効果サンプル」上线，3 个 PARTIAL 不上首屏样片，避免误导用户对工具能力的预期
