# GSC「Crawled - currently not indexed」内容质量审查（2026-05-11）

## 总览

- GSC URL Inspection API 实测 sitemap 全量 609 URL
- 命中 **28 个 Crawled-not-indexed** 桶（比当天早些时候的 38 个少 10，反映 Google 重新评估自然恢复）
- 占总 published prompts (481) 的 4.8% — 非系统性问题

## 1. 分类（5 + 23）

### 🏷️ 已批准 tag 但 Google 拒索引（5 个）

| Tag | 关联 prompts | 备注 |
|---|---:|---|
| シネマティック | 62 | 高价值 tag 居然不被索引——内容深度问题 |
| gemini | 40 | tool 同名 tag，可能被识为重复 |
| 意思決定 | 17 | text-tool 类 |
| 兜 | 9 | costume 类 |
| 着せ替え | 7 | photo-edit 类 |

**症结**：tag 页面只有 prompt 卡片列表 + 模板化标题，Google 视为「比 category 页更薄」。

**潜在修复**（不今天做）:
- 在 tag 页面加 seoIntro 字段（schema 改造）
- 或者在 `/tag/[slug]/page.tsx` 加固定的 H2 解说段 + Q&A schema
- 优先级：低（这些 tag 仍可通过 sitemap 间接帮助内链权重传递）

### ✏️ 内容过短 prompt（5 个）

| Slug | 字符数 | 分类 | 建议 |
|---|---:|---|---|
| blue-braided-hair-pink-eyes | 96 | hairstyle | 加日文 seoIntro/description 扩展 |
| red-cocktail-dress-elegant-xut5 | 105 | clothing | 同上 |
| tan-asian-long-hair-eyeliner | 108 | hairstyle | 同上 |
| school-uniform-pleated-skirt | 112 | cosplay | 同上 |
| long-black-hair-91060e05 | 130 | hairstyle | 同上 |

**症结**：SD-style tag-list prompt 天然短，Google 视为薄内容。

**潜在修复**（不今天做）:
- 把这些 prompt 加 ParamConfig（参考 prompt-params 机制）→ 详情页有交互内容
- 或者 description 扩到 150-200 chars + 加「使い方コツ」段
- 优先级：中（5 个 prompt，工作量 1 小时；但 ROI 不大）

### 🖼️ 缺视觉 prompt（3 个，text-tool）

| Slug | 分类 | tool |
|---|---|---|
| gemini-assessment-rubric | education | claude |
| midjourney-youtube-creator-team | hairstyle | midjourney（无图，应是 bug） |
| textbook-summary-extraction | education | chatgpt |

**症结**：text-tool prompt 没有缩略图。

**潜在修复**：
- 生成 OG 风格海报作为缩略图（半小时/张）
- midjourney-youtube-creator-team 的分类是 hairstyle 但 tool 是 midjourney——分类标错了，应改为 anime 或 creative
- 优先级：低-中

### 🏷️ 缺已批准 tag（2 个）

| Slug | 分类 |
|---|---|
| giraffe-herd-kilimanjaro-sunset | camera |
| textbook-summary-extraction | education |

**修复**：审核这些 prompt 的现有 tag，approve 1-2 个核心 tag。或加新 tag。

### 😴 仅 zero-views 但其他指标正常（13 个）

| Slug | 分类 |
|---|---|
| brown-tone-ink-illustration-psychedelic | color |
| sepia-ink-japanese-art-rice-paper | color |
| futuristic-headdress-orange-eyes | costume |
| snow-queen-fantasy-gown | costume |
| afro-tribal-artistic-hairstyle | hairstyle |
| goth-black-leather-dark-sorceress | clothing |
| australia-pro-film-camera-actress-wide | costume |
| australian-actress-cameraman-fullbody-pro | costume |
| deep-grey-cyan-studio-dance-costume | costume |
| elf-warrior-red-dragon-costume | costume |
| long-black-hair-8e65a75b | hairstyle |
| hairstyle-change-french-bob | photo-edit |
| (others) | various |

**症结**：chicken-and-egg — Google 不索引 → 用户看不到 → 没有 view → 信号弱。时间会解决，新加的 5 个卡片徽章（`🆎 Before/After / NEW`）应该会帮助提升内链点击。

**修复**：不需要主动处理。

## 2. 结论

**不建议把 28 个全部手工修复**——回报递减：
- 5 tag 问题需要 schema 改造，工作量大
- 3 text-tool 缺视觉需要单独生成 OG 图
- 5 内容过短的合计搜索量小（每个潜在月搜索 < 50）
- 13 zero-views 时间会解决

**实际今天处理**：
- ✅ 2 个 cheap-win tag approval（见 commit 即将提交）
- ❌ 不动 5 内容过短
- ❌ 不动 3 缺视觉
- ❌ 不动 5 tag 索引（待 schema 改造）

## 3. 长期 backlog（不紧急）

| 优先级 | 项 | 工作量 |
|---|---|---|
| 中 | 给 5 个内容过短的 prompt 加 ParamConfig（接入参数化机制） | 1-2 小时 |
| 中 | 修复 `midjourney-youtube-creator-team` 错分到 hairstyle 的 bug | 5 分钟 |
| 低 | tag 页面 schema 加 seoIntro / Q&A schema | 4-6 小时 |
| 低 | 给 3 个 text-tool prompt 生成 OG 风格缩略图 | 1 小时 |

## 4. 期待自然恢复

GSC 5/18+ 重爬完后，今天上线的改动应让以下数字下降：
- Crawled-not-indexed: 28 → 期待 < 15
- 因为：(a) 卡片徽章引导更多内链点击 → 更多 view → 索引信号增强；(b) 5 个新 Theme B prompt 注入新词，可能带动相邻 prompt 一起重评
