# 4 周冲刺计划：日 PV 600 → 1000

> 起算日: 2026-05-12
> 评估日: 2026-06-11
> Baseline: 335 PV/天（5/5-5/11 7d 均值）
> Commit 目标: **600 PV/天**（50% 概率）
> Stretch 目标: **1000 PV/天**（20% 概率，需运气 + 外部突破）
> Monitor 信号: **800 PV/天**（飞轮转起来的拐点）

参考：[`docs/growth-plan-1000pv-30d.md`](growth-plan-1000pv-30d.md) 完整通道分析。

---

## 0. 总产出预估（按节奏跑完 4 周）

| 通道 | 30d 净增 PV/天 |
|---|---:|
| 现有页排名上推（5/18 重爬果实） | +90 |
| 现有页 CTR 重写（5/23-31 回查窗口） | +30 |
| Card 徽章 / Phase 0/1/2 内部漏斗 | +10 |
| chatgpt.com / GEO referral 持续放大 | +20 |
| **70 个新 prompt（2.3× 当前节奏）** | **+12** |
| **工具页深度 SEO（1 个 5k+ keyword pos 7）** | **+35** |
| **4 篇 Qiita 累计** | **+35** |
| X 推送累计 | +10 |
| **合计净增** | **+242** |

→ 335 + 242 = **~577 PV/天**（接近 commit 600）

剩余 +400 到 stretch 1000 靠：viral + 外部资源 + 运气。**节奏内做不到 1000，但能扎实到 600**。

---

## 1. 每周 KPI（4 周节奏卡）

每周固定输出：

| 类型 | Week 1 | Week 2 | Week 3 | Week 4 | 4w 合计 |
|---|---:|---:|---:|---:|---:|
| 新 prompt 采集 | **15** | **20** | **20** | **15** | **70** |
| SEO 重写 / schema | 2 | 2 | 2 | 1 | 7 |
| Qiita 文章 | 1 | 1 | 1 | 0-1 | 3-4 |
| X 推送 | 0 | 5 | 5 | 5 | 15 |
| 数据复盘（周三） | 1 | 1 | 1 | 1 | 4 |

---

## 2. 每周详细任务

### Week 1（5/12-18）— 启动 + 基建

**主题**：清理积压基建 / 启动 Phase 0 之后的 watch

| 日 | 任务 | 预计 |
|---|---|---|
| Mon 5/12 | 采集 5 prompt（photo-edit Theme A 髪色 アプリ系，目标 keyword: 髪 色 変える アプリ 3600/月） | 2-3h |
| Tue 5/13 | **跑 daily-report 看 paywall_view 切片首次可用** + /tools/gemini SEO 重写（CTR 优化）+ 写 Qiita 1 篇（パーソナルカラー 攻略） | 半天 |
| Wed 5/14 | **数据复盘**: GA paywall_funnel / NB2 转化率 / GSC trend；采集 5 prompt | 半天 |
| Thu 5/15 | QuotaGate 抽象（Phase 4 开工）；采集 5 prompt | 半天 |
| Fri 5/16 | photo-edit Theme C 白黒カラー化 采集 5 prompt | 2h |
| Sat-Sun | 数据观察，不做大动作 | — |

**Week 1 KPI**: 20 prompt 采集 / 1 SEO 重写 / 1 Qiita / 1 复盘 / Phase 4 启动

### Week 2（5/19-25）— SEO 收果实 + 提速采集

**主题**：批次 1/2 SEO 重写回查窗口；采集提速

| 日 | 任务 |
|---|---|
| Mon 5/19 | 采集 7 prompt（SD 服装高量词缺口） |
| Tue 5/20 | **5/19 数据决策点**: Week 1 < 380 PV/d → 转 GEO/外链优先 |
| Wed 5/21 | **数据复盘**；采集 5 prompt |
| Thu 5/22 | Tag backlog R2 清理（466 → 期待 < 300 noindex）+ 采集 5 prompt |
| Fri 5/23 | **批次 1 SEO 回查** (clothing/hairstyle/color CTR ≥ 5%?) + X 推送 5 个 BA 样片 |
| Sat 5/24 | **批次 2 SEO 回查** (camera/body-type-guide/sd-guide) |
| Sun 5/25 | Qiita 写 1 篇（髪色 シミュレーション 攻略） |

**Week 2 KPI**: 20 prompt / 2 SEO 回查 / X 5 推 / 1 Qiita / 1 复盘

### Week 3（5/26-6/1）— 工具页突破 + GEO

**主题**：tool 页深度 SEO + GEO 加固

| 日 | 任务 |
|---|---|
| Mon 5/26 | 采集 7 prompt（SD 角色场景高量词） |
| Tue 5/27 | **5/27 数据决策点**: Week 2 < 480 PV/d → 暂停 SEO 转工具页突破 |
| Wed 5/28 | **数据复盘**；给 /tools/personal-color-analysis + hair-color-diagnosis 加 1000 字 Q&A section |
| Thu 5/29 | top 6 category 页加 FAQ schema（JSON-LD）；采集 5 prompt |
| Fri 5/30 | X 推送 5 BA 样片；采集 5 prompt |
| Sat 5/31 | **photo-edit 类 SEO 批次 3 回查**（Theme B 5 prompts + category） |
| Sun 6/1 | Qiita 写 1 篇（外壁色 シミュレーション 攻略） |

**Week 3 KPI**: 20 prompt / FAQ schema 6 页 / Q&A 2 tool 页 / X 5 推 / 1 Qiita / 1 复盘 / 1 SEO 回查

### Week 4（5/29 6/2-8）— 数据闭环 + 临门一脚

**主题**：看 Week 1-3 结果，缺口补强

| 日 | 任务 |
|---|---|
| Mon 6/2 | 总体数据复盘：当前 PV vs 600 commit / 1000 stretch；采集 5 prompt |
| Tue 6/3 | **6/3 数据决策点**: Week 3 < 650 PV/d → 调整 1000 → 800 stretch / 600 commit |
| Wed 6/4 | 找 1-2 个 stretch keyword 做深度优化；采集 5 prompt |
| Thu 6/5 | 若距 1000 还有 100+，考虑 Reddit r/Japan or r/StableDiffusion 引流 |
| Fri 6/6 | 临门一脚：薄弱页改善 + 内链补强；采集 5 prompt |
| Sat-Sun | 数据观察 |

**Week 4 KPI**: 15 prompt / 总评估 / 最终 PV 数

### Day 30（6/11）— 总结

跑最终 daily-report，对比：
- Commit 600？✅/❌
- Stretch 1000？✅/❌  
- Monitor 800 inflection？✅/❌

写 `docs/sprint-1000pv-may-postmortem.md` 总结成败 + 通道 ROI 实测 + 下个 sprint 改进点。

---

## 3. 决策点（强制 checkpoints）

| 日期 | 阈值 | 如果未达成 |
|---|---|---|
| **5/20** | Week 1 ≥ 380 PV/d | → 暂停采集，转 GEO + 外链 |
| **5/27** | Week 2 ≥ 480 PV/d | → 暂停 SEO 重写，集中工具页突破 |
| **6/3** | Week 3 ≥ 650 PV/d | → 1000 目标降级；专注 600 commit |
| **6/11** | ≥ 600 (commit) | 如果 < 600，写 postmortem 找 systemic 问题 |

---

## 4. 每周复盘模板（周三跑）

```bash
# 命令
npx tsx src/scripts/data-analys/ga-query.ts --mode=traffic-report --days=7 --dimension=source
npx tsx src/scripts/data-analys/gsc-query.ts --mode=top-queries --days=7 --limit=10
npx tsx src/scripts/data-analys/gsc-query.ts --mode=top-pages --days=7 --limit=10
npx tsx src/scripts/data-analys/db-query.ts --mode=tool-usage --days=7
npx tsx src/scripts/data-analys/db-query.ts --mode=paywall-hits --days=7
```

填表：

| 指标 | 当周 | 上周 | Δ | vs 目标 |
|---|---:|---:|---:|---|
| 日 PV 均值 | | | | / 目标 |
| GSC 点击 | | | | |
| GSC 平均排名 | | | | |
| chatgpt.com referral | | | | |
| NB2 撞墙→付费转化 | | | | 目标 1:5 |
| 新 prompt 入库数 | | | | / 周 KPI |

---

## 5. 关键词储备（采集时优先用）

按 ROI 排序（来自 `seo/photo-edit-keywords-2026-05-supplement.md`）：

### 已部分覆盖，可深挖
- 髪 色 変える アプリ 3600/月 — hair-color-natural-simulation 已上线，可拓展 5 个变体
- 髪色シミュレーション 2400/月 — 同上
- 自分 に 似合う 髪 色 アプリ 720/月 — 单独 prompt

### 完全空白（高 ROI 加点）
- 白黒 写真 カラー 化 アプリ 無料 590/月
- 白黒 写真 カラー 化 サイト 140/月
- 部屋 配色 シミュレーション 30/月（已有 wall-color-change，可扩 bedroom / kitchen）

### 工具页突破候选（值得 1 个 prompt 单独做）
- 似合う 髪 色 診断 5400/月（已有 /tools/hair-color-diagnosis）
- パーソナル カラー 診断 写真 9900/月（已有 /tools/personal-color-analysis）

---

## 6. 已经做完不再重复的（避免浪费时间）

- ✅ 27 个 404 redirect
- ✅ Pagination canonical 改 base
- ✅ Card 5 个差异化徽章
- ✅ 14 个参数化 prompt 配置
- ✅ Theme B 5 个 prompts（壁紙/インテリア/外壁/髪色）
- ✅ photo-edit category SEO + intro
- ✅ Phase 0 积分模型 pivot
- ✅ Phase 1 /account dashboard
- ✅ Phase 2 GenerationOutput 持久化
- ✅ NB2 付费工具模型 + 新 prompt

下次复盘时**不要再做这些**，专注以上 4 周新事项。

---

## 7. 不做的事（资源保护）

- ❌ 大量 refactor（Phase 4 QuotaGate 抽 1-2 天 OK，不要超过）
- ❌ 调整 prompt-params 机制（Plan B 等 5/13 routine 输出后再说）
- ❌ 加新 freemium 工具（第 3 个工具上线前必抽 QuotaGate，参见 feedback memory）
- ❌ 改 schema 大动作（必须先在文档里走一遍设计）
- ❌ 重写 Stripe 流程（除非必要）

---

## 8. Session 重置后接续指南

下次会话启动，按以下顺序读：
1. `MEMORY.md` Quick Context — 自动加载
2. `docs/session-2026-05-11.md` — 5/11 完整背景
3. `docs/sprint-1000pv-may.md` — **本文档，按今天日期对照 Week X 的任务**
4. `seo/photo-edit-keywords-2026-05-supplement.md` — 关键词储备
5. `feedback_prompt_do_dont_split.md` + `reference_gemini_image_models.md` — Gemini 选型 / prompt 经验
