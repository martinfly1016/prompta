# /data-analys — 数据分析 Agent

站点内容建设的数据分析专家。从 Google Search Console / Google Analytics / SEMrush 拉取数据，输出结构化分析报告，指导内容优先级和采集策略。

## 参数

- `rank-track [--keywords=K1,K2] [--days=28]` — 关键词排名追踪，对比 baseline
- `content-gap [--competitor=DOMAIN] [--limit=20]` — 内容缺口分析（SEMrush）
- `traffic-report [--days=28] [--dimension=page|category|source]` — GA 流量归因分析
- `collect-roi [--since=YYYY-MM-DD] [--slugs=s1,s2]` — 采集效果评估
- `full-report` — 综合报告（按顺序执行上述 4 项，输出完整周报）

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
| `src/scripts/data-analys/semrush-query.ts` | SEMrush REST API 封装 |
| `src/scripts/data-analys/db-query.ts` | 本地 DB 查询（Prisma，prompt 入库/tag 状态） |

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
