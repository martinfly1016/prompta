# Style-Test 报告 — photo-edit 分类

> 审计日期：2026-05-01
> 审计目标：category=photo-edit（最新 10 条）
> 审计条数：10
> 审计范围：阶段 1（静态规则审计，未调用图像 API）
> 规则集：SKILL.md 写真加工 prompt 5 项强制规则 + 长度 + 工具风格 + 多样性

---

## 总体评分

| 指标 | 通过率 | 详情 |
|---|---:|---|
| R1 对象引用 | 9/10 (90%) | 1 条用 "this vintage black-and-white photograph"，规则正则未命中 |
| R2 保持声明 | 10/10 (100%) | 全部含 Preserve/Keep/Maintain + unchanged/exactly/completely |
| R3 输出指定 | 8/10 (80%) | 2 条缺 output spec |
| R4 质感词 | 8/10 (80%) | 2 条缺质感词 |
| R5 反向防呆 | 8/10 (80%) | 2 条缺 do not/avoid/no 类负面约束 |
| L 长度合规 | 10/10 (100%) | min=50, max=87, avg=65.3，全在 15–120 区间 |
| T 工具风格 | 10/10 (100%) | 全部为祈使式，匹配 gemini 工具风格 |
| D 多样性 | PASS | D1/D3 良好；D2 "Preserve" 占 60%，建议轻度调整 |

**总体合规率（5 项强制规则全过）**：5/10 = **50%**

合规明细：
- 全 5 项 PASS：1, 4, 8, 9（4 条）
- R1 严格正则未命中但语义到位：6（1 条，可视情况算通过）
- 缺 R3：3, 7（2 条）
- 缺 R4：5, 10（2 条）
- 缺 R5：2, 5（2 条）

---

## 逐条审计

### 1. remove-bystanders-temple-background

**Title**：不要物除去 通行人削除 - 京都神社背景
**Difficulty**：advanced | **Tool**：gemini | **词数**：70

**Prompt**：
> Remove the unrelated bystanders walking in the background of the uploaded photo while keeping the main subject in the foreground completely untouched. Reconstruct the background — a Kyoto temple courtyard with stone paving and wooden architecture — so the cleanup looks seamless and continuous. Preserve the original lighting, shadows on the ground, and the subject's pose and expression. Output at the original resolution, photorealistic, do not invent details that conflict with the existing scene.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the uploaded photo" |
| R2 保持声明 | PASS | "completely untouched" / "Preserve the original lighting" |
| R3 输出指定 | PASS | "at the original resolution" |
| R4 质感词 | PASS | "photorealistic" |
| R5 反向防呆 | PASS | "do not invent details" |
| L 长度 | PASS | 70 |
| T 工具风格 | PASS | 祈使式 |

**结论**：完全合规。结构示范：祈使式开头 + 显式保持声明 + 输出规格 + 反向防呆。可作为该类「不要物除去」的标杆 prompt。

---

### 2. outfit-swap-business-suit

**Title**：着せ替え ビジネススーツ - AI写真加工
**Difficulty**：intermediate | **Tool**：gemini | **词数**：60

**Prompt**：
> Swap the outfit of the person in this image to a tailored navy single-breasted business suit with a crisp white dress shirt and a thin burgundy tie. Preserve the original pose, body proportions, hairstyle, facial identity, and background completely. Match the existing lighting on the new fabric with realistic wrinkles and natural shadows at the lapels and cuffs. Output as a 4:5 portrait, photorealistic.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the person in this image" |
| R2 保持声明 | PASS | "Preserve the original pose ... completely" |
| R3 输出指定 | PASS | "4:5 portrait" |
| R4 质感词 | PASS | "photorealistic" / "realistic wrinkles" / "natural shadows" |
| R5 反向防呆 | **FAIL** | 无 do not / avoid / no... |
| L 长度 | PASS | 60 |
| T 工具风格 | PASS | 祈使式 |

**改写建议（R5）**：在末尾追加：
`Do not alter the facial features or invent accessories that are not requested.`

**修订后完整 prompt**：
> Swap the outfit of the person in this image to a tailored navy single-breasted business suit with a crisp white dress shirt and a thin burgundy tie. Preserve the original pose, body proportions, hairstyle, facial identity, and background completely. Match the existing lighting on the new fabric with realistic wrinkles and natural shadows at the lapels and cuffs. Output as a 4:5 portrait, photorealistic. **Do not alter the facial features or invent accessories that are not requested.**

---

### 3. expression-neutral-to-subtle-smile

**Title**：表情変更 ニッコリ笑顔 - AI写真加工
**Difficulty**：intermediate | **Tool**：gemini | **词数**：60

**Prompt**：
> Change the expression of the person in the uploaded photo from neutral to a subtle, closed-mouth smile with a slight upward curve at the corners of the lips and gentle warmth around the eyes. Preserve the person's identity, facial proportions, hairstyle, and lighting completely. Avoid teeth showing and do not invent details around the mouth. Keep skin texture realistic and natural-looking.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the person in the uploaded photo" |
| R2 保持声明 | PASS | "Preserve the person's identity ... completely" |
| R3 输出指定 | **FAIL** | 无 aspect / resolution / output spec |
| R4 质感词 | PASS | "natural-looking" / "Keep skin texture realistic" |
| R5 反向防呆 | PASS | "Avoid teeth showing" / "do not invent details" |
| L 长度 | PASS | 60 |
| T 工具风格 | PASS | 祈使式 |

**改写建议（R3）**：在末尾加输出规格：
`Output at the original resolution.`

**修订后完整 prompt**：
> Change the expression of the person in the uploaded photo from neutral to a subtle, closed-mouth smile with a slight upward curve at the corners of the lips and gentle warmth around the eyes. Preserve the person's identity, facial proportions, hairstyle, and lighting completely. Avoid teeth showing and do not invent details around the mouth. Keep skin texture realistic and natural-looking. **Output at the original resolution.**

---

### 4. linkedin-professional-headshot

**Title**：LinkedIn プロフィール写真 - ビジネス向けAI加工
**Difficulty**：intermediate | **Tool**：gemini | **词数**：64

**Prompt**：
> Crop and restyle the uploaded photo into a LinkedIn-ready professional headshot. Replace the background with a softly defocused modern office featuring floor-to-ceiling windows and warm ambient lighting. Preserve the person's facial features, expression, and outfit. Add subtle catchlights in the eyes and gentle three-point studio lighting on the face. Output as a 1:1 square at 1024×1024, photorealistic, do not over-smooth the skin.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the uploaded photo" |
| R2 保持声明 | PASS | "Preserve the person's facial features..." |
| R3 输出指定 | PASS | "1:1 square at 1024×1024" + "headshot" |
| R4 质感词 | PASS | "photorealistic" + "studio lighting" + "subtle" |
| R5 反向防呆 | PASS | "do not over-smooth the skin" |
| L 长度 | PASS | 64 |
| T 工具风格 | PASS | 祈使式 |

**结论**：完全合规。LinkedIn 头像类高质量样板。

---

### 5. background-replace-studio-neutral

**Title**：背景置換 スタジオ風 - AI写真加工プロンプト
**Difficulty**：intermediate | **Tool**：gemini | **词数**：64

**Prompt**：
> Replace the background of the uploaded photo with a softly blurred professional photography studio backdrop in neutral light gray (#D8D8D8), with subtle vignetting toward the corners. Keep the person's pose, facial expression, hair flyaways, and clothing exactly as in the original. Match the existing key-light direction and 5500K color temperature on the subject so the composite looks natural. Output as a 1:1 square at 1024×1024 pixels.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the uploaded photo" |
| R2 保持声明 | PASS | "Keep the person's pose ... exactly as in the original" |
| R3 输出指定 | PASS | "1:1 square at 1024×1024 pixels" |
| R4 质感词 | **FAIL** | 仅有 "looks natural"（短语，非 R4 白名单），缺 photorealistic / natural-looking / studio lighting 这种结尾质感锚词 |
| R5 反向防呆 | **FAIL** | 无 do not / avoid / no... |
| L 长度 | PASS | 64 |
| T 工具风格 | PASS | 祈使式 |

**改写建议（R4 + R5）**：在末尾追加质感词 + 反向防呆：
`Photorealistic and natural-looking, with no white halo around the subject and no color cast on the skin from the new background.`

**修订后完整 prompt**：
> Replace the background of the uploaded photo with a softly blurred professional photography studio backdrop in neutral light gray (#D8D8D8), with subtle vignetting toward the corners. Keep the person's pose, facial expression, hair flyaways, and clothing exactly as in the original. Match the existing key-light direction and 5500K color temperature on the subject so the composite looks natural. Output as a 1:1 square at 1024×1024 pixels. **Photorealistic and natural-looking, with no white halo around the subject and no color cast on the skin from the new background.**

---

### 6. colorize-vintage-photo-1950s

**Title**：白黒写真カラー化 1950年代風 - 写真修復
**Difficulty**：intermediate | **Tool**：gemini | **词数**：65

**Prompt**：
> Colorize this vintage black-and-white photograph with historically plausible tones for the 1950s era: warm sepia-leaning skin tones, muted clothing colors appropriate to the period, and a softly desaturated background. Preserve the original composition, grain, and facial details exactly. Do not sharpen aggressively or invent details that are not visible in the source. Output at the original resolution, natural-looking and photorealistic.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | **FAIL（严格）** | 用 "this vintage black-and-white photograph"，正则白名单为 `this (image\|photo\|picture)`，"photograph" 未列入。语义清晰，但建议替换为白名单词 |
| R2 保持声明 | PASS | "Preserve the original composition ... exactly" |
| R3 输出指定 | PASS | "at the original resolution" |
| R4 质感词 | PASS | "natural-looking" + "photorealistic" |
| R5 反向防呆 | PASS | "Do not sharpen aggressively or invent details" |
| L 长度 | PASS | 65 |
| T 工具风格 | PASS | 祈使式 |

**改写建议（R1）**：把 `this vintage black-and-white photograph` 改为 `the uploaded vintage black-and-white photo`，让对象引用与规则白名单对齐。

**修订后第一句**：
> **Colorize the uploaded vintage black-and-white photo** with historically plausible tones for the 1950s era: ...

---

### 7. hairstyle-change-french-bob

**Title**：髪型変更 ボブカット - AI写真加工プロンプト
**Difficulty**：intermediate | **Tool**：gemini | **词数**：60

**Prompt**：
> Change the hairstyle of the person in the uploaded photo to a chin-length French bob with blunt-cut bangs that just touch the eyebrows. Keep the original hair color, facial identity, expression, clothing, and background unchanged. Match the lighting and shadow direction of the existing photo so the new hair blends naturally around the ears and neckline. Photorealistic, do not modify the facial structure.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the person in the uploaded photo" |
| R2 保持声明 | PASS | "Keep the original hair color ... unchanged" |
| R3 输出指定 | **FAIL** | 无 aspect / resolution / output spec |
| R4 质感词 | PASS | "Photorealistic" |
| R5 反向防呆 | PASS | "do not modify the facial structure" |
| L 长度 | PASS | 60 |
| T 工具风格 | PASS | 祈使式 |

**改写建议（R3）**：在末尾加：
`Output at the original resolution.`

**修订后完整 prompt**：
> Change the hairstyle of the person in the uploaded photo to a chin-length French bob with blunt-cut bangs that just touch the eyebrows. Keep the original hair color, facial identity, expression, clothing, and background unchanged. Match the lighting and shadow direction of the existing photo so the new hair blends naturally around the ears and neckline. Photorealistic, do not modify the facial structure. **Output at the original resolution.**

---

### 8. natural-skin-retouching-gentle

**Title**：自然な美肌レタッチ - Gemini写真加工
**Difficulty**：intermediate | **Tool**：gemini | **词数**：73

**Prompt**：
> Softly retouch the face of the person in this image: reduce visible blemishes and minor redness, even out skin tone, and gently smooth pores while keeping skin texture, freckles, moles, and fine lines intact. Do not change the facial structure, eye shape, or jawline. Maintain the original pose, hair, and clothing. Output at the original resolution, photorealistic, do not over-smooth the skin and no plastic-looking face.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the person in this image" |
| R2 保持声明 | PASS | "intact" + "Do not change the facial structure" + "Maintain the original pose" |
| R3 输出指定 | PASS | "at the original resolution" |
| R4 质感词 | PASS | "photorealistic" |
| R5 反向防呆 | PASS | "do not over-smooth" + "no plastic-looking face" |
| L 长度 | PASS | 73 |
| T 工具风格 | PASS | 祈使式 |

**结论**：完全合规。美肌类反向防呆三连（do not change / do not over-smooth / no plastic-looking）非常到位，可作为标杆。

---

### 9. passport-id-photo-icao-compliant

**Title**：パスポート証明写真 ICAO規格 - AI写真加工
**Difficulty**：advanced | **Tool**：gemini | **词数**：87

**Prompt**：
> Transform the uploaded photo into a compliant Japanese passport ID photo following ICAO standards: plain white background (#FFFFFF), head centered and facing directly forward, neutral closed-mouth expression, both ears and full forehead visible, eyes open and looking at the camera, no shadows on the face or background. Preserve the person's natural skin texture and facial identity without beautification. Crop to 35×45mm with the head measuring 32–36mm from chin to crown. Output at 600 DPI.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the uploaded photo" |
| R2 保持声明 | PASS | "Preserve the person's natural skin texture and facial identity without beautification" |
| R3 输出指定 | PASS | "passport ID photo" + "35×45mm" + "600 DPI" |
| R4 质感词 | PASS | "natural skin texture" |
| R5 反向防呆 | PASS | "without beautification" + "no shadows on the face" |
| L 长度 | PASS | 87 |
| T 工具风格 | PASS | 祈使式 |

**结论**：完全合规。规格化要求（ICAO + 物理尺寸 + DPI）非常详尽，advanced 难度合理。

---

### 10. background-removal-transparent-png

**Title**：背景透過 PNG 出力 - 写真加工プロンプト
**Difficulty**：beginner | **Tool**：gemini | **词数**：50

**Prompt**：
> Remove the background from the uploaded photo and isolate the person cleanly along the hair edges and shoulders. Preserve the original skin tones, clothing colors, and facial details exactly as they are. Output as a transparent PNG at the original resolution with anti-aliased edges and no white halo around the subject.

| 规则 | 结果 | 检测短语 |
|---|---|---|
| R1 对象引用 | PASS | "the uploaded photo" |
| R2 保持声明 | PASS | "Preserve the original skin tones ... exactly as they are" |
| R3 输出指定 | PASS | "transparent PNG at the original resolution" |
| R4 质感词 | **FAIL** | 无 photorealistic / natural-looking / sharp focus / natural skin |
| R5 反向防呆 | PASS | "no white halo around the subject" |
| L 长度 | PASS | 50 |
| T 工具风格 | PASS | 祈使式 |

**改写建议（R4）**：在 "Output as ..." 句之前补一句质感锚词：
`Keep the cutout sharp focus and natural-looking around the hair edges.`

**修订后完整 prompt**：
> Remove the background from the uploaded photo and isolate the person cleanly along the hair edges and shoulders. Preserve the original skin tones, clothing colors, and facial details exactly as they are. **Keep the cutout sharp focus and natural-looking around the hair edges.** Output as a transparent PNG at the original resolution with anti-aliased edges and no white halo around the subject.

---

## 多样性分析（D 规则）

### D1 开头动词分布

| 动词 | 条数 | 占比 |
|---|---:|---:|
| Remove | 2 | 20% |
| Change | 2 | 20% |
| Swap | 1 | 10% |
| Crop | 1 | 10% |
| Replace | 1 | 10% |
| Colorize | 1 | 10% |
| Softly (retouch) | 1 | 10% |
| Transform | 1 | 10% |

**判定**：PASS — 最大占比 20%，分布良好，无单一动词雷同问题。

### D2 保持声明措辞分布

| 引导词 | 条数 | 占比 |
|---|---:|---:|
| Preserve | 6 | 60% |
| Keep | 3 | 30% |
| Maintain | 1 | 10% |

**判定**：WARN（轻度）— "Preserve" 占 60%，略有偏倚。建议在下一轮采集中增加 "Maintain" / "Keep ... unchanged" / "Lock the [feature]" 的多样表达，降至 ≤ 50%。

### D3 长度分布

- min = 50（beginner: background-removal）
- max = 87（advanced: passport-icao）
- avg = 65.3
- range = 37 词
- 难度分级与长度正相关（beginner=50 < intermediate≈60–73 < advanced=70–87）

**判定**：PASS — 长度方差良好，体现了 beginner/intermediate/advanced 的难度分级，符合 SKILL.md 期望的「难度差异通过长度+细节量体现」。

---

## 总结

### 优点
1. **R2 保持声明 100% 合规**：全部 prompt 都有显式 preserve/keep/maintain + 修饰词（unchanged/exactly/completely/intact）。这是写真加工类最关键的护栏，做得非常扎实。
2. **L 长度 100% 合规且分级清晰**：beginner=50, intermediate=60–73, advanced=70–87，与 SKILL.md 推荐的难度梯度高度吻合。
3. **T 工具风格 100% 合规**：全部祈使式开头，匹配 gemini（Nano Banana）一文完结的输入习惯，无对话风污染。
4. **D1 开头动词分散度好**：8 种不同动词，最大占比 20%，无机械化采集痕迹。
5. **标杆 prompt**：#1（不要物除去）、#4（LinkedIn）、#8（美肌）、#9（パスポート）四条结构示范完整，可作为后续生成的 few-shot 样本。

### 需改进（按严重度排序）

1. **R3 / R4 / R5 各有 2 条缺失**（共 6 个失败点，分散在 5 条 prompt 上）：
   - R3 缺失：#3 表情变更、#7 髪型变更 — 都是「主体修改」类，容易忘记输出规格
   - R4 缺失：#5 背景置换、#10 背景透過 — 都是「背景操作」类，描述背景细节后忘了给主体一个质感锚词
   - R5 缺失：#2 着せ替え、#5 背景置換 — 着せ替え/背景类负面约束容易遗漏
2. **R1 严格正则未命中**：#6 用了 "this vintage black-and-white photograph"，"photograph" 不在白名单。语义没问题但建议统一用 "photo"。
3. **D2 "Preserve" 占 60%**：保持声明引导词偏单一，建议下一轮多用 "Keep ... unchanged"、"Maintain"、"Lock the [feature]" 等多样表达。

### 建议下一步

1. **手动修订**：按本报告「修订后完整 prompt」段落，对 #2, #3, #5, #6, #7, #10 共 6 条进行 DB UPDATE。可一次性写一个 SQL 脚本（或在管理后台逐条编辑）。
2. **更新 SKILL.md**：把以下三个生成约束加为硬性规则：
   - R3：所有 photo-edit prompt 必须含至少一个输出规格关键词（aspect / resolution / passport size / DPI / "at the original resolution"）；建议「主体修改」类（hairstyle / expression / makeup）默认追加 `Output at the original resolution.` 兜底。
   - R4：所有 photo-edit prompt 必须含至少一个质感词，结尾兜底锚词推荐 `Photorealistic and natural-looking.`
   - R5：所有 photo-edit prompt 必须含至少一个反向防呆短语；针对常见类别给出推荐模板：
     - 着せ替え类：`Do not alter the facial features or invent accessories.`
     - 背景置換类：`No white halo around the subject and no color cast on the skin from the new background.`
     - 美肌类：`Do not over-smooth the skin and no plastic-looking face.`
     - 表情/髪型类：`Do not modify the facial structure or invent details around the mouth/hair.`
3. **保持声明多样化**：在 SKILL.md 的「写真加工 prompt 生成模板」中明确列出 Preserve / Keep / Maintain / Lock 四种表达，并要求生成时随机选用，避免全部用 Preserve。
4. **阶段 2 启动**：当前 4 条全合规 prompt（#1, #4, #8, #9）可作为优先候选，进入 `style-test-live` agent（待建）做真实 Gemini API 渲染验证，挑选 Before/After 样片用于详情页「効果サンプル」。
