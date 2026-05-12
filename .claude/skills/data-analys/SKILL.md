# /data-analys — 数据分析 Agent

站点内容建设的数据分析专家。从 Google Search Console / Google Analytics / SEMrush 拉取数据，输出结构化分析报告，指导内容优先级和采集策略。

## 参数

- `rank-track [--keywords=K1,K2] [--days=28]` — 关键词排名追踪，对比 baseline
- `content-gap [--competitor=DOMAIN] [--limit=20]` — 内容缺口分析（SEMrush）
- `traffic-report [--days=28] [--dimension=page|category|source] [--page-filter=/path]` — GA 流量归因分析
- `collect-roi [--since=YYYY-MM-DD] [--slugs=s1,s2]` — 采集效果评估
- `daily-report [--days=7]` — 7 日运营日报（流量+搜索+工具使用+收入+新内容，含 vs 上 7 日 delta）
- `full-report` — 综合报告（按顺序执行 rank-track → content-gap → traffic-report → collect-roi）

## 前提条件

### 环境变量（`.env` 中配置）

| 变量 | 来源 | 用途 |
|---|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Google Cloud Console → IAM → Service Account → Keys → JSON | GSC + GA4 API 认证 |
| `GA4_PROPERTY_ID` | GA4 管理界面 → 属性设置 → 属性 ID（纯数字，如 `123456789`） | GA4 Data API 查询 |
| `GSC_SITE_URL` | 默认 `https://www.prompta.jp`，若 GSC 中注册 URL 不同则覆写 | GSC API 查询 |
| `SEMRUSH_API_KEY` | SEMrush → 我的设置 → API → API Key | SEMrush API 调用 |

### Service Account 权限配置

1. **Google Cloud Console** → 创建 Service Account → 下载 JSON 密钥
2. **GA4**: 管理 → 属性 → 用户管理 → 添加 Service Account email（`xxx@xxx.iam.gserviceaccount.com`）→ 角色 "查看者"
3. **GSC**: 搜索资源 → 设置 → 用户和权限 → 添加 Service Account email → 权限 "完全"

### 依赖安装（首次使用前）

```bash
npm install --save-dev googleapis
```

## 工作流

### rank-track — 关键词排名追踪

**输入**: 目标关键词列表（默认从 `seo/keyword-difficulty-analysis.md` 的 S+A 级关键词）

**执行**:
```bash
npx tsx src/scripts/data-analys/gsc-query.ts \
  --mode=rank-track \
  --keywords="コスプレ プロンプト,体型 プロンプト,プロンプト 服装 女性,色 プロンプト" \
  --days=28
```

**输出格式**:
```
## 关键词排名追踪（过去 N 天 vs baseline）

| 关键词 | baseline 排名 | 当前排名 | 变化 | 曝光 | 点击 | CTR |
|---|---|---|---|---|---|---|
| コスプレ プロンプト | 6.27 | ? | ↑/↓ | N | N | N% |
```

**分析要点**:
- 排名改善 > 1 位 → 标注 🟢
- 排名无变化 → 标注 ⚪
- 排名下降 > 1 位 → 标注 🔴 + 分析原因
- 比较 Phase 1B/Phase 2 前后数据，评估 SEO copy 改动效果

### content-gap — 内容缺口分析

**输入**: 竞争对手域名（默认 `romptn.com, ururuailab.com, noplog.com, ai-freak.com`）

**执行**:
```bash
npx tsx src/scripts/data-analys/semrush-query.ts \
  --mode=content-gap \
  --competitor=romptn.com \
  --our-domain=prompta.jp \
  --limit=20 \
  --db=jp
```

**输出格式**:
```
## 内容缺口分析 — vs {competitor}

### 对手有我们没有的关键词（机会）
| 关键词 | 对手排名 | 月搜索量 | KD | 推荐动作 |
|---|---|---|---|---|
| xxx プロンプト | 3 | 2400 | 15 | 新建分类页 / Guide / Tag |

### 我们有但排名远低于对手的关键词（改善空间）
| 关键词 | 我们排名 | 对手排名 | 差距 | 推荐动作 |
```

**分析要点**:
- 筛选 KD ≤ 40 且月搜索量 ≥ 100 的可行关键词
- 按 `月搜索量 / KD` 排序 = ROI 指标
- 对每个机会词给出具体建议：新建哪种页面（分类 / Tag / Guide / Prompt 采集）

### traffic-report — 流量归因分析

**输入**: 时间范围 + 维度（page / category / source）

**执行**:
```bash
npx tsx src/scripts/data-analys/ga-query.ts \
  --mode=traffic-report \
  --days=28 \
  --dimension=page \
  --limit=30
```

**输出格式**:
```
## GA4 流量报告（过去 N 天）

### 按页面（Top 30）
| 页面路径 | 用户数 | 会话 | 平均停留 | 跳出率 | 事件数 |
|---|---|---|---|---|---|

### 流量来源分布
| 来源 | 会话占比 | 特征 |
|---|---|---|
| google / organic | 65% | 主力，SEO 驱动 |
| direct | 20% | 品牌知名度指标 |
```

**分析要点**:
- 识别高跳出率页面 → 可能需要改善 UX 或内容质量
- 识别高停留时间页面 → 可能是高质量内容，应追加内链
- 分类/Tag 页面访问量排序 → 指导内容投资优先级

### collect-roi — 采集效果评估

**输入**: 采集时间 + 可选 prompt slug 列表

**执行**:

1. 查 DB 获取指定日期后入库的 prompt slug 列表：
   ```bash
   npx tsx src/scripts/data-analys/db-query.ts --mode=recent-prompts --since=2026-04-16
   ```

2. 用 GSC 查这些 URL 的索引状态 + 排名：
   ```bash
   npx tsx src/scripts/data-analys/gsc-query.ts \
     --mode=page-performance \
     --urls="/prompt/slug1,/prompt/slug2,..." \
     --days=14
   ```

**输出格式**:
```
## 采集效果评估（采集日期: YYYY-MM-DD）

### 整体统计
- 本批入库: N 条
- 已被 Google 索引: M 条（M/N = X%）
- 产生曝光: P 次
- 产生点击: C 次
- 平均索引延迟: D 天

### 逐条明细
| slug | 入库日 | 首次索引日 | 曝光 | 点击 | 排名 | 状态 |
|---|---|---|---|---|---|---|
| xxx | 4/16 | 4/18 | 50 | 3 | 12.5 | 🟢 已索引 |
| yyy | 4/16 | — | 0 | 0 | — | 🔴 未索引 |

### 分类分布
| 分类 | 入库数 | 索引数 | 曝光合计 | 点击合计 |
```

**分析要点**:
- 索引率 < 70% → 可能内容质量不足或内链不够，建议补强 seoIntro 或增加内链
- 高曝光低点击 → title/description 不够吸引人，建议优化
- 给出「下次采集建议」：哪些关键词/分类的采集 ROI 最高

### daily-report — 7 日运营日报

**用途**: 每日/每周固定快照，覆盖站点流量、搜索曝光、两个 freemium 工具页（パーソナルカラー / 髪色诊断）的真实使用与收入、新增内容。重点是 **vs 上一个 7 天周期的 delta**。

**默认窗口**: 过去 7 天。可用 `--days=N` 调整（同时上一周期窗口也跟着变）。

**执行步骤**（agent 编排，并发拉数据）:

```bash
# A) GA 站点级流量
npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=7 --dimension=source --limit=10
npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=7 --dimension=page --limit=20

# B) GA 工具页流量（按 BEGINS_WITH 过滤）
npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=7 --dimension=page --page-filter=/tools/personal-color-analysis --limit=10
npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=7 --dimension=page --page-filter=/tools/hair-color-diagnosis --limit=10

# C) GSC 搜索数据
npx tsx src/scripts/data-analys/gsc-query.ts --mode=top-queries --days=7 --limit=20
npx tsx src/scripts/data-analys/gsc-query.ts --mode=top-pages --days=7 --limit=20

# D) DB 工具真实调用 + Stripe 收入（含上一周期对比）
npx tsx src/scripts/data-analys/db-query.ts --mode=tool-usage --days=7

# E) 新内容
npx tsx src/scripts/data-analys/db-query.ts --mode=recent-prompts --since=$(date -v-7d +%Y-%m-%d)

# F) Referral 来源细分（含 chatgpt.com / qiita.com 等 LLM/外站引用）
#    GA 默认 traffic-report 的 source dimension 已包含此信息，但需要按 channel=Referral 过滤
#    主 agent 在 Phase F 直接用 ga-query.ts 加 dimensionFilter，或者改为 inline tsx：
#    详见输出 §6「Referral 来源 / GEO 信号」节。

# G) photo-edit 类 prompt 单页流量追踪（识别 ツール化候補）
npx tsx src/scripts/data-analys/photo-edit-traffic.ts --days=7

# H) Paywall 漏斗事件（hair-color / personal-color CTA → click → checkout）
npx tsx src/scripts/data-analys/ga-query.ts --mode=tool-funnel --days=7

# I) 头部关键词排名追踪（プロンプト cluster — A定义/B書き方/C一覧）
#    2026-05-12 SEO 优化基线，监控 14 个核心 head keyword 的 7d-vs-7d 排名变化
#    用于判断 d314307 的 cannibalization 修复是否在 GSC 数据中显现
npx tsx src/scripts/data-analys/_head_keyword_track.ts --days=7
```

> macOS 上用 `date -v-7d +%Y-%m-%d`；Linux 上换成 `date -d '7 days ago' +%Y-%m-%d`。

**输出格式**:

```
# Prompta 日报（YYYY-MM-DD ~ YYYY-MM-DD，过去 7 天）

## 1. 站点流量总览
| 指标 | 本周期 | 上周期 | Δ |
|---|---|---|---|
| 会话数 | N | N | ±N% |
| 活跃用户 | N | N | ±N% |
| 自然搜索点击 | N | N | ±N% |
| 自然搜索曝光 | N | N | ±N% |

### 流量来源（Top 5）
| 渠道 | 会话 | 占比 |

### Referral 来源 / GEO 信号（重点监控）
| 来源 | 会话 | 平均停留 | 跳出率 | 备注 |
|---|---|---|---|---|
| **chatgpt.com** | N | Ns | N% | LLM 引用，**周环比要持续追** |
| qiita.com | N | Ns | N% | 自有 Qiita 文章引流 |
| accounts.google.com | N | — | — | （登录回流，可忽略） |
| その他 | … | | | |

> **GEO 监控原则**: chatgpt.com / perplexity.ai / claude.ai / phind.com 等 LLM 来源的 sessions 数环比变化是 **GEO（Generative Engine Optimization）的早期信号**。环比涨 ≥ 30% 时标 🟢，跌 ≥ 30% 时标 🔴 + 排查 llms.txt / canonical / 内容是否被改动。

## 2. 搜索表现（GSC）
### Top 10 查询
| 关键词 | 曝光 | 点击 | CTR | 排名 |
### Top 10 着陆页
| 页面 | 曝光 | 点击 | CTR | 排名 |

## 2.5 头部关键词排名追踪（プロンプト cluster）

> 数据源: `_head_keyword_track.ts`。2026-05-12 SEO 优化（commit `d314307`）开始监控的 14 个 head keyword，分 3 cluster：A 定义 / B 書き方 / C 一覧。**rank 数字越小越好**（1 = SERP 第 1 位），排名变化 ≥ 5 位标 🟢/🔴，≥ 2 位标改善/悪化，否则 ⚪ 横ばい。GSC 数据有 24-48h 延迟，所以窗口比 GA 早 1 天。

### 2.5.1 排名表
| Cluster | 关键词 | 本周期排名 | 上周期排名 | Δ | 状态 | 曝光本/上 | 着陆页 |
|---|---|---|---|---|---|---|---|
| A-定义 | プロンプト | 43.6 | 74.8 | **-31.2** | 🟢 大幅改善 | 12 / 6 | /guides/what-is-prompt |
| A-定义 | プロンプトとは | … | … | … | … | … | /guides/what-is-prompt |
| A-定义 | プロンプト 意味 | … | … | … | … | … | … |
| A-定义 | ai プロンプト とは | … | … | … | … | … | … |
| B-書き方 | プロンプト 書き方 | … | … | … | … | … | … |
| B-書き方 | プロンプト 生成 | … | … | … | … | … | … |
| B-書き方 | ai プロンプト コツ | … | … | … | … | … | … |
| B-書き方 | 生成ai プロンプト | … | … | … | … | … | … |
| C-一覧 | ai プロンプト | … | … | … | … | … | … |
| C-一覧 | プロンプト 集 | … | … | … | … | … | … |
| C-一覧 | プロンプト ai | … | … | … | … | … | … |
| C-一覧 | chatgpt プロンプト | … | … | … | … | … | … |
| C-一覧 | chat gpt プロンプト | … | … | … | … | … | … |

> 表格末按 `Δ` 升序排序（最大改善在前），让一眼能看出本周大涨/大跌项。

### 2.5.2 Cluster 概览
| Cluster | 平均排名（本周期） | 平均 Δ | 着陆页集中度 | 备注 |
|---|---|---|---|---|
| A-定义 | N | ±N | M URLs 争抢 → 期望 ≤ 1 (canonical = /guides/what-is-prompt) | … |
| B-書き方 | N | ±N | M URLs | … |
| C-一覧 | N | ±N | M URLs → 期望 ≤ 1 (canonical = / homepage) | … |

### 2.5.3 解读重点
- **Cannibalization 监控**: 任意 head keyword 出现 ≥ 3 个不同 prompta.jp 着陆页 → 标 🔴 + 在 §6 行动建议加「明确该词的 canonical URL」item
- **🟢 改善 verification**: 5/12 优化的目标词（プロンプト / プロンプトとは / プロンプト 意味 / ai プロンプト とは / プロンプト 集 / ai プロンプト 一覧 等）必须显示 🟢 改善 — 若連続 2 周仍 ⚪ 横ばい或 🔴 → 内容/canonical 修复不到位
- **🆕 新登场**: 之前 GSC 无曝光，本周首次出现 → 通常意味着新内容上线后开始爬，是积极信号；记录在 §6 「新キーワード进入」节
- **⚫ 消失**: 之前有曝光本周 0 → 通常是 GSC 24-48h 延迟假象（5/10-5/11 数据缺失），但若連続 2 周仍 0 → 内容已被去索引或排名跌出 top 100
- **Δ ≥ +5 (悪化)** 必须立刻排查：URL 是否还存在、是否新增 noindex、canonical 是否被改、HotKey 段落是否被 prompt-params 替换、internal link 是否减少

### 2.5.4 历史基线（用于多周对比，每周日报追加 1 行）
| 日期窗口 | プロンプト | プロンプトとは | ai プロンプト | 备注 |
|---|---|---|---|---|
| 2026-05-05~05-11 | 43.6 | 50.5 | 68.3 | 优化前基线（5/12 ship d314307） |
| 2026-05-12~05-18 | … | … | … | 5/12 ship 第 1 周 |
| 2026-05-19~05-25 | … | … | … | 5/12 ship 第 2 周 |

> 每次跑日报时把本周数据 append 一行（手动），3 个核心 cluster anchor keyword 各取一个。3-4 周后能看出趋势线。

## 3. 工具使用情况（重点）

### 🎨 パーソナルカラー診断（/tools/personal-color-analysis）
- **GA 流量**: 会话 N · 用户 N · 平均停留 Ns · 跳出率 N% · 事件数 N
- **真实调用**: 总 N 次（free N / paid N）· 唯一访客 N · 唯一邮箱 N
- **vs 上周期**: ±N% （前 7 天 N 次）
- **按日分布**: 5/2:N · 5/3:N · ...

### 💇 似合う髪色診断（/tools/hair-color-diagnosis）
（同上结构）

### 💴 收入
- 本周期: ¥N · N 笔 · N 个付费用户 · 发放积分 N
- 上周期: ¥N · N 笔
- 转化漏斗: 工具页会话 → free 调用 → paid 调用 → 支付（按链路给百分比）

## 3.5 Paywall 漏斗事件（GA4）

> 数据源: `ga-query.ts --mode=tool-funnel`。前端事件: `paywall_view` (modal 打开) → `paywall_purchase_click` (购入按钮按下) → `checkout_started` (Stripe 跳转) → StripePayment（已记 §3 收入）。

### 总聚合（所有工具汇总）
| 事件 | 本周期 | 上周期 | Δ |
|---|---|---|---|
| paywall_view | N | N | ±N% |
| paywall_purchase_click | N | N | ±N% |
| checkout_started | N | N | ±N% |
| StripePayment 成交 | N | N | ±N% |

**漏斗转化率**: view→click X% · click→checkout Y% · checkout→pay Z%

### 按工具/触发器切片（仅当 GA4 自定义维度 `tool` + `trigger` 已注册时）

| 工具 | 触发器 | paywall_view | view→click |
|---|---|---|---|
| hair-color | badge | N | X% |
| hair-color | candidate_card | N | X% |
| hair-color | upsell_banner | N | X% |
| hair-color | exhausted_pick / analyze / simulate / 429 | N | X% |
| personal-color | exhausted_pick / analyze | N | X% |

> ⚠️ 若 `perToolBreakdown` 输出 `_note: 'Per-tool/per-trigger split unavailable'`，说明用户还没在 **GA4 admin → Property → Custom definitions** 注册 `tool` 和 `trigger` 这两个 event-scoped 自定义维度。
> 注册当下立即可查（**没有 24-48h 处理延迟**，GA4 实时数据流近实时——5/11 实测确认）。**之前 SKILL 误标的「24-48h」是把 GSC 的延迟错套到 GA4 上**。
> 在注册前 `runReport` 调 `customEvent:trigger` 会失败，输出 fallback 聚合行；注册后立即返回切片。

### 3.5.1 DB 兜底口径（推荐与 §3.5 GA 漏斗交叉验证）

`paywall_view` 事件 2026-05-10 才上线，**之前的撞墙数据 GA 漏记**。但 `ToolUsage` 表完整保留每次调用，可以反推「实际撞 3 次 free quota 的 anon 数」：

```bash
npx tsx src/scripts/data-analys/db-query.ts --mode=paywall-hits --days=7
```

输出：
| 工具 | 唯一 anon | ≥3 free（撞墙）| <3 free | 撞墙→付费转化 |
|---|---|---|---|---|

**用法**：
- 撞墙数远 > paywall_view → instrumentation gap（修代码）
- 撞墙数 ≈ paywall_view → 两者一致，可以放心切到 GA 切片
- 撞墙→付费 < 15% → UI/价格优化重点（文案？free quota 调 5？）

### 解读重点
- **view→click < 10%**: 价格 / signin gate / 文案问题；考虑去掉登录前置 / 改 modal 文案
- **click→checkout < 50%**: Stripe API 配置或 sign-in flow 卡住
- **某个 trigger 占 view 的 80%+**: 其他 CTA 入口失效或不可见，需排查 UI

## 4. 新内容
- 本周期入库 N 条 prompt
- 分类分布: hairstyle:N, clothing:N, ...
- 工具分布: stable-diffusion:N, midjourney:N, ...

### 未审核 tag backlog（GSC noindex 大头）
- 总 tag: N | approved: M | **noindex: N-M (X%)**
- 本周期新增 tag: K（含 K_approved approved / K_unapproved 未审核）
- Top 5 高价值未审核（按 prompt 数）:
  - {tag-slug-1} ({prompts} prompts)
  - ...
- 污染 tag（tool名/-ai 后缀/-プロンプト 后缀）数量: N — 应删除而非批准

> noindex 比例 < 60% 健康；> 80% 说明审核没跟上 → 在 §6 加批量审核 action item。
> Query: `SELECT count, isApproved FROM Tag` + `findMany where:{isApproved:false} orderBy:{prompts:{_count:'desc'}} take:20`

## 7. photo-edit 单页流量追踪 / ツール化候補

> 写真加工 prompt 中，单条获得稳定有机流量 = 用户对该任务有真实需求 = ツール化候補。
> personal-color-analysis / hair-color-diagnosis 都是从单条 prompt 流量验证后做成 freemium AI 工具的。

### 评级阈值（per-prompt 7d）
- 🟢 **強候補**: ≥ 30 sessions/7d AND 平均停留 ≥ 60s — **連続 2 週 🟢 提议 tool 化**
- 🟡 **観察**: ≥ 10 sessions/7d
- ⚪ **noise floor**: < 10 sessions/7d

### Top 候補（按 sessions 倒序，本周期 ≥ 5 sessions 的）
| slug | sessions | dwell | bounce | tool | 评级 | 上周期 | 备注 |
|---|---|---|---|---|---|---|---|
| {slug} | N | Ns | N% | gemini | 🟡/🟢/⚪ | N | (連続 N 週🟢/初登场) |

### 长尾（5+ sessions 但 < 10 的，作为「pre-watch」清单）
- ⚪ {slug} — N sess / Ns dwell — 备注

### 行动
- 🟢 連続 2 週 → 在 §6 行动建议加「ツール化提案」item，含：估算开发成本、对比已上线两个工具的转化漏斗
- 🟡 → 下周仍跟踪，无操作
- ⚪ 全员 → 内容质量优化（加 Before/After 样片、补 R7 保留清单）

## 5. 异常 / 高亮
- 🔴 ... (任何 Δ < -20% 的指标)
- 🟢 ... (任何 Δ > +30% 的指标)
- ⚠️ ... (高曝光低 CTR 页 / 高跳出率页 / 0 转化的工具页)

## 6. 行动建议
1. [紧急] ...
2. [重要] ...
```

**分析要点**:
- 工具页转化链路: `pageviews → free 调用 → paid 调用 → 付费`，任何一段大幅衰减都要标注。
- `tool-usage` 的 `previousPeriodTotal=0` 时 `deltaPct` 为 `null`，输出时显示「新增 / N/A」而非「+∞%」。
- 真实「使用次数」以 `ToolUsage` 为准，不要拿 GA `eventCount` 替代（事件数包含很多无关交互）。
- 唯一访客 `uniqueAnon` 与 GA `activeUsers` 通常不一致（口径不同：anonId 是 cookie 级，跨设备会重复；GA 用浏览器指纹），二者皆列出，**不要相互替换**。
- **§7 ツール化判断准则**: 単条 prompt 流量大 ≠ 一定该做工具。还要看 (a) 任务可被自动化（不只是「读个例子」）、(b) 用户愿意付费的痛点（化妆/医疗/职业相关 > 单纯娱乐）、(c) Gemini/ChatGPT API 能稳定产出（参考 [project_gemini_image_limits.md](memory) 的能力边界）。passport-id-photo / linkedin-profile / background-replace 是天然候选，娱乐类（年代変身/絵画风）即便流量大也不适合做工具。

### full-report — 综合周报

按顺序执行: rank-track → content-gap → traffic-report → collect-roi

输出合并报告，末尾加:
```
## 行动建议（优先级排序）

1. [紧急] ...
2. [重要] ...
3. [可选] ...
```

## 脚本文件

| 文件 | 用途 |
|---|---|
| `src/scripts/data-analys/config.ts` | 共享配置（env 加载、认证、站点 URL） |
| `src/scripts/data-analys/gsc-query.ts` | GSC Search Analytics API 封装 |
| `src/scripts/data-analys/ga-query.ts` | GA4 Data API 封装 |
| `src/scripts/data-analys/semrush-query.ts` | SEMrush REST API 封装（**`SEMRUSH_API_KEY` 未配置，暂不可用**） |
| `src/scripts/data-analys/db-query.ts` | 本地 DB 查询（Prisma，prompt 入库/tag 状态） |
| `src/scripts/data-analys/photo-edit-traffic.ts` | photo-edit 单 prompt 流量追踪（§7 ツール化候補） |
| `src/scripts/data-analys/_head_keyword_track.ts` | **§2.5 头部关键词排名追踪**（プロンプト cluster 14 词，7d-vs-7d） |
| `src/scripts/data-analys/_head_keyword_pages.ts` | 头部词的着陆页分布（90 日窗口，诊断 cannibalization 用，非日报） |
| `src/scripts/data-analys/_periods.ts` | GA4 当周/上周流量总览（@ts-nocheck）— §1 站点总览的 vs 上周对比 |
| `src/scripts/data-analys/_gsc_periods.ts` | GSC 当周/上周聚合（clicks/impressions/CTR/position）— §1 自然搜索行 |
| `src/scripts/data-analys/_tag_backlog.ts` / `_tag_list_unapproved.ts` / `_tag_backlog_r2.ts` / `_tag_seo_backfill.ts` / `_tag_clean_broken.ts` | tag 审核积压管理（详 collect-content Phase 7.5 Gate） |

## Baseline 数据

关键词 baseline 来自 `seo/keyword-difficulty-analysis.md`（2026-04-16）：

| 关键词 | baseline 排名 | baseline 曝光/月 |
|---|---|---|
| コスプレ プロンプト | 6.27 | 166 |
| プロンプト 服装 女性 | 7.18 | 151 |
| 体型 プロンプト | 8.08 | 516 |
| 色 プロンプト | 8.30 | 182 |
| セーラー服 プロンプト | 7.99 | 108 |
| スレンダー プロンプト | 6.87 | 71 |
| 体格差 プロンプト | 7.74 | 72 |
| ファンタジー 衣装 プロンプト | 9.56 | 57 |

## 模型分工

| 任务 | 模型 | 理由 |
|---|---|---|
| 数据拉取 + 清洗 | Bash 脚本 (tsx) | 确定性操作，无 AI 开销 |
| 数据解读 + 建议生成 | Opus (主 agent) | 需要业务上下文的深度推理 |
| 批量标签/报告格式化 | Haiku (子 agent) | 简单结构化任务，低成本 |
