# 塗り絵试点 — Option A 极简验证（2026-05-19 ship → 2026-06-02 评估）

## 决策依据

来源: `seo/coloring-book-seo-plan.md` 5/19 提案
原方案（Option B）: 1 tool page + 6 category landing + 30 prompt，工程量 1.5-2 天，6 周验证
采纳方案（Option A 极简）: 1 guide + 10-15 prompt + 2 tag，工程量 2 小时，2 周看初始信号

## 5/19 Ship 内容

| 项 | 内容 | 状态 |
|---|---|---|
| watch-keywords.ts | 加 4 条塗り絵 cluster | ✓ |
| Guide | `/guides/ai-coloring-page-prompt` (target `ai 塗り絵` KD 19) | ⏳ |
| Prompt 入库 | 10-15 条 lexica `coloring page / line art / mandala` 关键词搜索 | ⏳ |
| Tag approve | `coloring-page` + `line-art` (sitemap 收录) | ⏳ |

## 风险控制

- 全部主题为**非 IP** 范围（花/动物/风景/曼陀罗/和柄）
- 禁止 prompt 中出现 ポケモン / ディズニー / サンリオ / 鬼滅 / アンパンマン / プリキュア
- 入库 prompt 走标准 collect-content pipeline，AI 富化阶段额外检查

## 6/2 评估 checklist（2 周后）

### 1. 内容上线确认
- [ ] 跑 `npx tsx src/scripts/data-analys/db-query.ts --mode=recent-prompts --since=2026-05-19` 确认入库数 ≥ 10
- [ ] `/guides/ai-coloring-page-prompt` 已被 Google indexed（用 GSC URL Inspection）
- [ ] `/tag/coloring-page` 和 `/tag/line-art` 已 approved + 进 sitemap

### 2. GSC 曝光（28 日窗口）
跑 `npx tsx src/scripts/data-analys/gsc-query.ts --mode=top-queries --days=28`，筛 `塗り絵 / ぬりえ / 線画 / coloring`

**合理预期（2 周时点）**：
- 至少 1 条 `ai 塗り絵` / `線画 プロンプト` 相关曝光 ≥ 5
- 排名 pos 30-80（Google 已认但未排名）

### 3. GA 流量信号
- `npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=14 --dimension=page --page-filter=/guides/ai-coloring-page-prompt`
- `page-filter=/prompt` 看入库的 prompt 单页是否有访问

### 4. 决策准则

| 信号 | 等级 | 行动 |
|---|---|---|
| 任意 1 条塗り絵关键词曝光 ≥ 10 + 平均停留 ≥ 30s | 🟢 | 投入 Option B 全套 MVP |
| 已 indexed 但 0 impressions | 🟡 | 续等 2 周（6/16 二评估） |
| 仍未 indexed | 🔴 | 内容 / 内链问题修复后续等 |
| 任何塗り絵关键词 30 日累计点击 ≥ 5 | 🟢🟢 | 立即上工具页 + 4 分类落地页 |

### 5. 评估输出
完成《塗り絵试点 2 周评估报告》 → `seo/coloring-trial-eval-2026-06-02.md`

## 评估时点选择理由

- 2 周 = Google 完成首次爬 + 初步索引判断
- 6/16（4 周）= GSC 28 日窗口能看到 ai 塗り絵 (KD 19) 是否启动排名
- 7/14（8 周）= 大头机会词 (KD 30-36) 才有可能进 top 20

## 已存 Cron

`CronCreate id=72ee1888` 6/2 09:03 一次性提醒，session-only 不持久（Claude 重启会丢）。本文件作持久 fallback。
