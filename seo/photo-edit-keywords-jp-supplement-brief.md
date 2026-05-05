# Brief: 日语 photo-edit 关键词补充调研（hair color / wall color / colorize / personal color）

> 用途：交给另一个 agent 执行的需求文档。读完即可独立完成，不需要回到这个对话上下文。
>
> 创建日期：2026-05-05
> 委托人：yuchao（prompta.jp owner）
> 期望交付：1 份 Markdown 报告 + 4 份 JSON 原始数据
> 期望耗时：30-60 分钟（含人工 SemRush 操作）

---

## 1. Why / 背景

prompta.jp 是日文 AI 提示词站，photo-edit 分类目前 18 条 prompt（10 旧 + 8 条 2026-05-04 新增），覆盖背景透過 / 証明写真 / 美肌 / 髪型変更（仅 1 款 bob）/ 着せ替え（仅 2 款）/ 表情 / カラー化（1 款）/ 不要物除去 / outpainting / 1970年代変身。

委托人在 SemRush 跑了一个英语关键词扫描（截图：65 keywords / 总搜索量 990 / 平均 KD 33%），发现 4 个细分主题在英语市场需求强烈，怀疑日语市场也有对应需求但**目前 prompta.jp 几乎没覆盖**：

1. **AI hair color changer / visualizer** —— 截图里至少 6 个英语变体（`ai hair color app` / `hair color ai app` / `paint ai color visualizer app` / `ai hair color changer app` / `ai app for hair color`）
2. **AI wall / paint color visualizer** —— 室内装修视觉化（`wall color ai app`）
3. **AI app to put color in B&W photo** —— 旧照片着色（已有 1 款 colorize-vintage-photo-1950s 但只覆盖头部词「写真 カラー化 AI」10/月）
4. **AI color analysis app** —— パーソナルカラー診断（日本市场超热门，Y2K 美容潮叠加）

委托人想要确认：**这 4 个主题在日语市场的真实搜索量和 KD**，决定下一轮 photo-edit 月度入库（计划 2026-06-04 前后）是否要补这几块、各补几条。

---

## 2. 输入 / Input

### 2.1 已查过的 30 个日语词（去重源，避免重复调研）

读 `/Users/yuchao/Documents/vibe coding/prompta/seo/photo-edit-keywords.md` 的全数据表，里面列了 30 个 2026-05-01 已调研的日语词（写真加工 / 画像編集 / 背景透過 / 証明写真 / 髪型変更 等）。**调研结果如果与那张表里的词重复，标注「已调研」并引用月搜索量，不再算入新增缺口。**

### 2.2 已发布的 photo-edit prompt slug 清单

读 prompta.jp DB 取（也可以从 sitemap 里 grep `/prompt/` + 排除非 photo-edit）：

```bash
cd "/Users/yuchao/Documents/vibe coding/prompta"
npx tsx -e "
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient();
(async()=>{
  const rows=await p.prompt.findMany({where:{category:{slug:'photo-edit'},isPublished:true},select:{slug:true,title:true,tags:{select:{name:true}}}});
  console.log(JSON.stringify(rows,null,2));
  await p.\$disconnect();
})()
"
```

### 2.3 4 个主题的 head term 候选（必查）

| Theme | 主 head term（必查） | 备选 head term（如主词数据稀疏，再加） |
|---|---|---|
| A. 髪色 / hair color | `髪色 AI` | `髪色 シミュレーション` / `ヘアカラー アプリ` / `バーチャル ヘアカラー` |
| B. 部屋・壁 色 / wall paint | `部屋 色 AI` | `壁 色 シミュレーション` / `インテリアカラー AI` / `ペイント シミュレーター AI` |
| C. 白黒写真 カラー化 / B&W colorize | `白黒写真 カラー化` | `モノクロ写真 カラー化` / `古い写真 カラー化 AI` / `写真 着色 AI` |
| D. パーソナルカラー診断 / color analysis | `パーソナルカラー診断 AI` | `顔 パーソナルカラー診断` / `似合う色 AI` / `パーソナルカラー AI 写真` |

### 2.4 必查的扩展长尾词（每主题至少包含这些 exact-match）

**A. 髪色（≥10 词）**：
- AI 髪色 変更
- 髪色 シミュレーション AI
- 髪色 アプリ（无 AI 也查）
- AI ヘアカラー チェンジャー
- 髪色 試着 AI
- 写真 髪色 変更 AI
- バーチャル ヘアカラー

**B. 部屋・壁色（≥6 词）**：
- 部屋 色 シミュレーション
- 壁 色 AI
- インテリア カラー シミュレーション AI
- 壁紙 色 シミュレーション AI
- ペイント シミュレーター AI

**C. カラー化（≥6 词，去重已查的「写真 カラー化 AI」10/月）**：
- 白黒写真 カラー化 AI
- モノクロ写真 カラー化
- 古い写真 カラー化 AI
- 写真 着色 AI
- 白黒 カラー化 アプリ

**D. パーソナルカラー（≥6 词）**：
- パーソナルカラー診断 AI
- パーソナルカラー診断 アプリ
- 顔 パーソナルカラー診断 AI
- 似合う色 AI 診断
- AI パーソナルカラー
- 写真 パーソナルカラー AI

---

## 3. 数据源 / Data sources（按可行性排序）

### 选项 1（首选）：SemRush Keyword Magic Tool

如果你（agent）有 SEMRUSH_API_KEY 或登录的 SemRush 浏览器会话：
- 数据库：`jp`（日本）
- 设备：desktop
- 匹配：exact match（精确一致）
- 字段：keyword / monthly_volume / KD / CPC (¥) / search_intent / SERP_features

**注意**：SemRush JP 数据库对很多日语长尾词返回「不可用 / no data」。这是预期的，不是 bug。返回为空时在报告里标 `-` 不要瞎填 0。

### 选项 2（次选）：Google Keyword Planner（需要 Google Ads 账号）

返回 volume 区间（如「100-1K」），KD 不提供。粒度比 SemRush 粗但免费。

### 选项 3（兜底）：Google Trends + 现有 GSC 数据

- Google Trends 看相对热度（无绝对 volume）
- 用 prompta.jp 的 GSC 数据看是否本站已经有 impressions（如果已经有，至少证明该词被搜过）

```bash
# GSC 查 query 数据（需要 GOOGLE_SERVICE_ACCOUNT_JSON 已配置）
cd "/Users/yuchao/Documents/vibe coding/prompta"
npx tsx src/scripts/data-analys/gsc-query.ts --mode=top-queries --days=90
```

### 选项 4（如果上面都跑不通）

至少把 28 个候选词分组，标记每个的「主观判断市场预期」（hi/mid/lo），交回去让人工决定。

---

## 4. 工作流 / Workflow

### Step 1 — 查询执行

对每个主题：
1. 用主 head term 做 broad/related search，记录前 50 条结果（按 volume 降序）
2. 对必查长尾词做 exact-match 精确查询
3. 合并去重，过滤掉与 `seo/photo-edit-keywords.md` 已查 30 词重复的项

### Step 2 — 缺口标记

对每个候选词，与 prompta.jp 现有 photo-edit prompt 列表（Step 2.2 查到的）对比，标 3 档：
- ✅ **已覆盖**：现有 prompt 的 title / SEO title / tags 直接命中该关键词 → 列出对应 slug
- ⚠️ **部分覆盖**：现有 prompt 沾边但 SEO title 没明确命中（如「髪型変更 ボブカット」对「髪色 AI」算部分覆盖） → 列出 slug + 缺口建议
- ❌ **缺口**：完全没对应 prompt → 标记需新增

### Step 3 — 优先级打分

对每个 ❌ 缺口词计算 `priority_score = monthly_volume / max(KD, 5)`（KD 缺失时用 30 替代）。

### Step 4 — 人工挑选 PicoTrex 案例（如时间允许）

参考 memory `reference_picotrex_nano_banana_repo.md`（位置：`~/.claude/projects/-Users-yuchao-Documents-vibe-coding-prompta/memory/`）里 PicoTrex 仓库的「下次月度可挑的未用案例」清单，对应到 4 主题。如果某缺口词找不到对应的 PicoTrex 案例，标「需 AI 自生成 prompt」。

---

## 5. 输出 / Deliverables

### 5.1 主报告（Markdown，必须）

写到：`/Users/yuchao/Documents/vibe coding/prompta/seo/photo-edit-keywords-2026-05-supplement.md`

格式：

```markdown
# 日语 photo-edit 关键词补充调研（2026-05-05）

> 数据源：SemRush JP / 设备 desktop / exact match（如有变动注明）
> 调研者：[agent 名]
> 总查询词数：N / 有数据返回数：M / 缺口词数：K

## エグゼクティブ・サマリー

- 4 主题中需求强度排序：[基于 ROI 排序，如 髪色 > パーソナルカラー診断 > 部屋色 > カラー化]
- Top 5 高优先级缺口（建议下轮入库）：
  1. `xxxxx`（XXX/月、KD XX）→ 建议 PicoTrex 例 #X
  2. ...
- Top 3 已覆盖词（确认 SEO 标题命中良好）：...
- 不建议追加的主题：[如「部屋色」volume 极低，建议跳过]

## Theme A — 髪色 変更 / Hair Color

| キーワード | 月間検索量 | KD | CPC (¥) | Intent | 状態 | 対応 prompt slug | 推奨 PicoTrex 例 |
|---|---:|---:|---:|---|---|---|---|
| 髪色 AI | 320 | 28 | 89 | informational | ❌缺口 | - | 例 #15 髪型グリッド変体 |
| ...

(同样格式 Theme B / C / D)

## 建议的下一轮 photo-edit 月度入库主题（按优先级）

按本调研的 priority_score 排序，前 8 条：

1. **髪色 変更（多色サンプル）** — 缺口词累计 volume XXX/月
   - 候选 PicoTrex 例：#15 + 改写为多色版
   - 建议 prompt slug: `hair-color-change-multi-shade`
   - 预期命中关键词：`髪色 AI`、`AI 髪色 変更`、...

2. **パーソナルカラー診断** — ...

(8 条全列)

## 不建议本轮追加的方向

- `部屋 色 AI` 系列：日语 volume < 50/月（如确认），ROI 太低
- ...

## 附件
- 4 份 JSON 原始数据：`seo/photo-edit-keywords-jp-raw/{theme}.json`
```

### 5.2 原始数据（JSON × 4，必须）

写到：
- `seo/photo-edit-keywords-jp-raw/hair-color.json`
- `seo/photo-edit-keywords-jp-raw/wall-color.json`
- `seo/photo-edit-keywords-jp-raw/bw-colorize.json`
- `seo/photo-edit-keywords-jp-raw/personal-color.json`

每份 JSON schema：

```json
{
  "theme": "hair-color",
  "head_term": "髪色 AI",
  "data_source": "SemRush JP exact-match desktop",
  "queried_at": "2026-05-05T...",
  "results": [
    {
      "keyword": "髪色 AI",
      "monthly_volume": 320,
      "kd": 28,
      "cpc_jpy": 89,
      "intent": "informational",
      "serp_features": ["sitelinks", "image_pack"],
      "raw": "..."
    }
  ],
  "no_data_keywords": ["髪色 試着 AI", "..."]
}
```

---

## 6. 验证 / Verification

报告交付前自查：

1. 4 个主题各至少 8 个有数据的关键词（共 ≥ 32 条）
2. 每个 ❌ 缺口词有 priority_score 排序
3. Top 5 缺口词的累计 monthly volume ≥ 200/月（否则说明这 4 个主题在 JP 真的弱，调研结论应该是「不建议大量入库」而非「按这个清单入库」）
4. 每个 ✅ 已覆盖词列出对应 slug，slug 真实存在（grep sitemap.xml 确认）
5. JSON 文件能被 `node -e "console.log(require('./xxx.json').results.length)"` 正常解析

---

## 7. Out of Scope（明确不做）

- 不修改 DB / 不发 IndexNow / 不改前端代码 — 本轮纯调研
- 不基于本调研直接写 prompt 入库 —— 报告交付后由委托人 review，下一轮 photo-edit 月度入库时再消化
- 不查英语 65 词的英语 volume —— 截图已给，只查日语对应
- 不研究 SD / Midjourney / 文字 prompt 关键词 —— 专注 photo-edit
- 不重复查 `seo/photo-edit-keywords.md` 表格里 2026-05-01 已查的 30 词

---

## 8. Constraints / 约束

- **不要在报告里编造 volume 数字**。无数据就标 `-`，并在 `no_data_keywords` 字段里列出。
- **如果 SemRush 5 次免费配额用尽**，停下来汇报「已用 X/5，已查 Y 个词，需要登录态/API key 继续」，不要为了凑齐数据瞎跑别的免费工具。
- **报告里所有 slug 引用**必须真实存在，写之前用 `curl -s -o /dev/null -w "%{http_code}" https://www.prompta.jp/prompt/{slug}` 验证 200。
- **PicoTrex 案例编号**引用前必须读 README_ja.md 的「Nano Banana 事例」批次（`https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/README_ja.md`）确认例子真实存在 + 用途匹配。

---

## 9. 委托人偏好（注意）

- 沟通用中文，技术内容（关键词/slug/SEO title）用日文/英文
- 不要长篇大论 —— 报告 executive summary 1 屏内能读完
- 数据 > 直觉 —— 没数据就说没数据，不要凭感觉给推荐
- 跑出来如果**所有 4 主题在 JP 都很弱**，结论可以是「不值得追加」，不需要硬凑出 8 条新增建议

---

## 10. 任务完成定义

满足以下全部 → 任务完成：
- [ ] `seo/photo-edit-keywords-2026-05-supplement.md` 已写，包含 4 个主题的完整表 + 优先级建议
- [ ] 4 份 JSON 原始数据写入 `seo/photo-edit-keywords-jp-raw/`
- [ ] 报告里每个 slug 引用真实存在（HTTP 200）
- [ ] 报告里每个 PicoTrex 例编号在 README_ja.md 里能找到
- [ ] 验证清单 6.1-6.5 全过

交付方式：直接 commit 到 git（`docs(seo): photo-edit JP keywords 2026-05 supplement research`），不要 push。委托人 review 后决定下一步。
