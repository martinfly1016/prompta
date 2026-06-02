# Prompta 增长计划：从身長差爆发复制下一批关键词（2026-06-02）

> 数据源：GSC 28d（2026-05-05〜2026-06-01）、GA4 peak/recent 对比、SEMrush snapshot（2026-05-22）。
> 目标：把“没有目的的内容更新”改成可复用的关键词发现、页面生产、监控闭环。

## 结论

身長差不是普通 prompt 词爆发，而是一个“社交流行 + AI 生成 + 做法/工具”需求簇。近 28 天 Top query 几乎被该簇占据：

| Query | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| `身長差プロンプトやり方` | 862 | 1,640 | 52.56% | 1.44 |
| `身長差プロンプト` | 693 | 1,853 | 37.40% | 1.96 |
| `身長差 プロンプト` | 584 | 1,823 | 32.04% | 2.11 |
| `身長差プロンプトとは` | 250 | 743 | 33.65% | 2.10 |
| `身長差プロンプト作り方` | 135 | 414 | 32.61% | 1.85 |
| `推しとの身長差 ai プロンプト` | 67 | 471 | 14.23% | 4.95 |

下一阶段不应该继续散点式新增 prompt，而应该围绕以下两类机会推进：

1. **吃身長差余波**：把已有 guide 从“教程”扩成“教程 + 工具 + 模板库”的完整簇。
2. **复制爆发模型**：寻找具备“推し/流行/メーカー/診断/やり方/プロンプト”组合信号的词。

## 身長差爆发模型

这次爆发有 4 个特征：

- **已有排名基础**：核心 query 在 1〜2 位，需求放大时可以立刻接住流量。
- **用户意图不是单纯看 prompt**：`やり方`、`作り方`、`とは`、`メーカー`、`ツール`、`診断` 同时出现。
- **社交传播语境强**：`推しとの身長差`、`流行りの身長差イラスト`、`チャッピー 身長差` 暗示来自 SNS/ChatGPT 流行玩法。
- **工具意图开始出现但页面不匹配**：`身長差メーカー`、`体格差ツール` 曝光高、CTR 极低，当前 landing 仍是 guide。

## P0：立刻推进的身長差扩展

### 1. 新建 `身長差メーカー` 工具页

**证据**

| Query | Impressions | Clicks | CTR | Position |
|---|---:|---:|---:|---:|
| `身長差メーカー` | 1,678 | 7 | 0.42% | 8.89 |
| `推しとの身長差診断` | 33 | 1 | 3.03% | 9.73 |

**建议页面**

- URL：`/tools/height-difference-maker`
- Title：`身長差メーカー｜推しとの身長差をAIプロンプトで作成`
- 功能 MVP：输入角色 A/B 的身高、关系、风格、场景，输出 Stable Diffusion / Midjourney / ChatGPT 画像生成用 prompt。
- 内链：guide 顶部 CTA、`/tag/身長差`、`/tag/体格差`、`/guides/body-type-prompt-guide`。

**目标**

- 2 周内让 `身長差メーカー` CTR 从 0.42% 提升到 3% 以上。
- 4 周内进入 Top 5。

### 2. 新建或扩展 `体格差ツール` 着陆页

**证据**

| Query | Impressions | Clicks | CTR | Position | Note |
|---|---:|---:|---:|---:|---|
| `体格差ツール` | 1,161 | 4 | 0.34% | 8.71 | 3 个页面竞争 |
| `体格差 構図` | 32 | 2 | 6.25% | 9.00 | tag/guide 分散 |

**建议**

- 如果开发成本低，合并到 `height-difference-maker`，增加模式切换：`身長差` / `体格差`。
- 如果单独做，URL：`/tools/body-difference-composition`。
- 重点不是“测量工具”，而是“体格差構図 prompt generator”。

### 3. 身長差 guide 继续补“流行り/ChatGPT/推し”段落

**证据**

| Query | Impressions | CTR | Position |
|---|---:|---:|---:|
| `推しとの身長差` | 642 | 3.12% | 10.13 |
| `身長 差 ai 流行り` | 330 | 3.03% | 8.46 |
| `身長差 chatgpt` | 180 | 2.78% | 9.35 |
| `chatgpt 身長差` | 126 | 1.59% | 9.56 |

**动作**

- Guide 增加 H2：`推しとの身長差AIの作り方`、`ChatGPTで身長差プロンプトを作る方法`、`流行りの身長差イラストを再現するコツ`。
- FAQ 增加：`身長差メーカーはありますか？`，答案内链新工具。

## P1：顺势挖掘的同构关键词

优先级判断规则：

- GSC 已有曝光或 SEMrush 有量。
- 词里包含 `やり方`、`作り方`、`メーカー`、`診断`、`一覧`、`コピペ`、`流行り`、`推し` 任一意图词。
- Prompta 已经有相关页面或可快速生成高质量 prompt/工具。

### A. 体型 / 构图簇

| 关键词 | 当前信号 | 页面形态 | 优先级 |
|---|---|---|---|
| `体格差ツール` | 1,161 imp / pos 8.71 / CTR 0.34% | tool | P0 |
| `体格差 構図` | 32 imp / pos 9.00 | guide section + tag cleanup | P0 |
| `身長 プロンプト` | 733 imp / pos 6.04 | guide section | P1 |
| `背の高さ プロンプト` | 36 imp / pos 8.31 | guide section | P1 |
| `perfect anatomy プロンプト` | 35 imp / pos 8.51 | guide or SD quality section | P1 |
| `腹筋 プロンプト` | 269 imp / pos 4.79 | prompt pack + body-type section | P2 |

### B. 髪型 / 似合う系

| 关键词 | 当前信号 | 页面形态 | 优先级 |
|---|---|---|---|
| `ツインテール プロンプト` | 317 imp / pos 8.24 / CTR 0.63% | dedicated tag/guide block | P1 |
| `チャットgpt 似合う 髪型 プロンプト` | 173 imp / pos 9.72 | guide + tool CTA | P1 |
| `チャットgpt 髪型 プロンプト` | 122 imp / pos 9.69 | guide section | P1 |
| `ヘアスタイル診断 プロンプト` | 82 imp / pos 8.56 | tool bridge | P1 |
| `髪型 プロンプト 女性` | 73 imp / pos 8.73 | category intro rewrite | P2 |

这一簇和 `/tools/hair-color-diagnosis` 的转化更接近，建议做“似合う髪型プロンプト”而不是只继续堆发型 prompt。

### C. 服装 / コスプレ簇

| 关键词 | 当前信号 | 页面形态 | 优先级 |
|---|---|---|---|
| `ドレス プロンプト` | 160 imp / pos 8.66 / CTR 0.63% | tag/guide block | P1 |
| `メイド服 プロンプト` | 741 imp / pos 5.64 | dedicated section | P1 |
| `セーラー服 プロンプト` | 654 imp / pos 4.83 | tag strengthen | P1 |
| `制服 プロンプト` | 483 imp / pos 7.51 | category intro + tag CTA | P1 |
| `ナース服 プロンプト` | 45 imp / pos 9.98 | prompt pack | P2 |

这里适合批量做“服装 prompt pack”，但要控制 cannibalization：分类页负责总词，tag 页负责具体服装，prompt 详情页负责长尾样例。

### D. Gemini / ChatGPT prompt hub

| 关键词 | 当前信号 | 页面形态 | 优先级 |
|---|---|---|---|
| `gemini プロンプト 一覧` | 243 imp / pos 8.52 | hub/guide | P1 |
| `gemini プロンプト集` | 96 imp / pos 8.17 | hub/guide | P1 |
| `chatgpt プロンプト一覧` | 50 imp / pos 13.34 | hub/guide | P2 |
| `chatgpt 身長差` | 126 imp / pos 9.56 | 身長差 guide section | P1 |

建议把 `/tools/gemini` 从工具说明页升级为 prompt hub，或者新增 `/guides/gemini-prompt-collection` 的强入口。

### E. Stable Diffusion 基础簇

SEMrush snapshot 显示该簇仍是最大中期机会：

| 关键词 | 月搜 | KD | 建议 |
|---|---:|---:|---|
| `stable diffusion プロンプト` | 6,600 | 20 | 扩 pillar guide |
| `stable diffusion 服装` | 1,900 | 11 | 服装页/SD guide 互链 |
| `stable diffusion 髪型` | 1,900 | 11 | 髪型页/SD guide 互链 |
| `stable diffusion ポーズ` | 1,600 | 18 | 新 guide 或 pose hub |
| `stable diffusion 表情` | 2,400 | 18 | 新 guide 或 expression pack |

这类词不会像身長差一样突然爆，但搜索量大、KD 可控，适合做中期底盘。

## 30 天执行节奏

### Week 1：吃身長差余波

- 新建 `/tools/height-difference-maker` MVP。
- 更新 height guide：补 `メーカー`、`ChatGPT`、`流行り`、`推しとの身長差`。
- 清理 `体格差ツール` cannibalization，明确 guide/tool/tag 的目标词。
- watch keywords 增加：`身長差メーカー`、`体格差ツール`、`推しとの身長差`、`身長差 chatgpt`。

### Week 2：髪型/似合う系

- 优化 `/prompts/hairstyle` title、intro、FAQ。
- 加 `ツインテール プロンプト`、`似合う髪型 プロンプト` 专区。
- 与 `/tools/hair-color-diagnosis` 做双向 CTA。

### Week 3：服装/コスプレ细分

- 强化 `/prompts/clothing` 和 `/guides/cosplay-prompt-guide`。
- 优先补 `メイド服`、`セーラー服`、`制服`、`ドレス`。
- 每个 tag 页增加 guide CTA，不新增大量孤立详情页。

### Week 4：Gemini + Stable Diffusion hub

- 将 `/tools/gemini` 或 `/guides/gemini-prompt-collection` 做成 prompt hub。
- 扩 `/guides/stable-diffusion-prompt-guide`，增加 `服装`、`髪型`、`ポーズ`、`表情` 内链入口。
- 做 28d 复盘，决定是否进入下一批工具页。

## 监控机制

每周固定跑三类检查：

1. **爆发检测**：GSC top queries 7d vs previous 7d，找 clicks/impressions 增长超过 2 倍且 position < 10 的词。
2. **低 CTR 机会**：impressions >= 100、position 4〜10、CTR < 3%。优先改 title/meta/CTA。
3. **工具意图检测**：query 包含 `メーカー`、`ツール`、`診断`、`作成`、`生成`，如果 landing 是 guide/tag，就评估工具页。

建议把这三类输出接到 daily report，避免后续内容更新再次变成无目的采集。

## 当前推荐的下一步

先做 P0：

1. `/tools/height-difference-maker` MVP。
2. height guide 增补 `メーカー`、`ChatGPT`、`流行り`、`推しとの身長差`。
3. watch list 增加 P0 关键词。

这组三项最贴近已经发生的需求，且可以直接验证：看 `身長差メーカー` / `体格差ツール` 的 CTR 和排名是否在 7〜14 天内改善。
