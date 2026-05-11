# 增长可行性研究：30 日内日 PV 从 300 → 1000

> 起算日：2026-05-11
> 目标日：2026-06-11
> 当前基线：300 PV/天（近 7 日均值，28 日均值 226）
> 目标：1000 PV/天
> 增长倍数：**3.3x**

---

## 1. 结论先行

**1000 PV/天 在 30 天内是 stretch 目标，乐观情况下可达，但保守预测大约只能到 500-600**。

更诚实的目标设定：
- **30 天内合理目标**：500-600 PV/天（+67-100%）
- **60-90 天达 1000**：基于现有 SEO 资产的自然成长曲线
- **若坚持 30 天 1000**：必须命中至少 1 个「黑天鹅」（病毒内容 / 工具页排名突破 / 外部高权重引用）

**当前增长通道按 ROI 排序**（30 天内可见）：

| # | 通道 | 30d 现实提升（PV/day） | 投入 |
|---|---|---:|---|
| 🥇 1 | 排名上推：6 个高曝光 query 从 pos 6-9 → 3-5 | **+90** | 内容优化 / 内链强化 |
| 🥈 2 | CTR 重写：top 6 category 页（已部分做） | **+30** | title/description 改写 |
| 🥉 3 | chatgpt.com referral (GEO) 持续放大 | **+20** | FAQ schema + llms.txt 优化 |
| 4 | 工具页排名突破（5,400-36k/月 关键词） | **+50**（不稳定） | tool 页 SEO 深度 |
| 5 | Theme B 5 新 prompt 初次曝光 | **+10** | 已完成 |
| 6 | 内部漏斗（卡片徽章 5/18 后生效） | **+10** | 已完成 |
| 7 | 新内容采集（30 prompts/月） | **+10** | /collect-content 跑 2-3 次 |
| **合计** | **+220 PV/day → 520 PV/day** | |

---

## 2. 数据基线（2026-05-11 实测）

### 站点流量（GA4，28 日）
- PV: 6,338 / 28d = **226/day**
- Sessions: 3,660 / 28d = 131/day
- Users: 3,005 / 28d = 107/day
- **近 7 日加速到 335 PV/day**（近 28d 14% 增长）

### 流量来源分布
- Organic Search: 87%（绝对主力）
- Direct: 5.8%
- Referral: 2.2%（含 chatgpt.com / qiita.com）
- Other: 5%

### Top 10 高曝光 query（28 日）

| query | 28d impr | clicks | CTR | pos | 提升空间 |
|---|---:|---:|---:|---:|---|
| 体型 プロンプト | 1,497 | 41 | 2.7% | **6.22** | 排名 +3 → 3-5x clicks |
| セーラー服 プロンプト | 640 | 13 | 2.0% | **5.60** | 排名 +2 + CTR |
| 色 プロンプト | 590 | 9 | 1.5% | **6.41** | 排名 +3 + CTR |
| プロンプト 体型 | 451 | 12 | 2.7% | **6.51** | 排名 +2 |
| カメラアングル プロンプト | 432 | 8 | 1.9% | **7.99** | 排名 + CTR |
| 髪型 プロンプト 女性 | 327 | 9 | 2.8% | **7.51** | 排名 +3 |
| コスプレ プロンプト | 315 | 52 | 16.5% | 5.59 | 已强 |
| 画像生成ai プロンプト例 アニメ | 319 | 47 | 14.7% | 2.85 | 已强 |
| 身長差 プロンプト | 312 | 36 | 11.5% | 2.80 | 已强 |
| 体格差 プロンプト | 310 | 25 | 8.1% | 3.56 | 已强 |

**洞察**：高 CTR (>10%) 的 query 排名都已 ≤ 4，下层潜力在 **pos 5-10 的高曝光 query**。

### Top 6 低 CTR 页（28 日）

| page | impr | CTR | pos |
|---|---:|---:|---:|
| /prompts/hairstyle | **9,212** | 2.40% | 7.8 |
| /prompts/clothing | **6,860** | 3.27% | 8.0 |
| /prompts/camera | 3,165 | 1.86% | 7.9 |
| /prompts/color | 2,861 | 3.08% | 6.5 |
| /tools/gemini | 1,053 | 3.04% | **11.2** |
| /guides/stable-diffusion-prompt-guide | 1,045 | 1.63% | 8.0 |

---

## 3. 通道分析（5 大主线）

### 🥇 通道 1：排名上推（最大杠杆）

**机会**：6 个高曝光 query 在 pos 5-10，移动到 pos 3-5 可获 2-5x clicks。

**目标 query 矩阵**:

| query | 28d impr | 当前 pos | 目标 pos | 预计点击提升 | 30d PV |
|---|---:|---:|---:|---:|---:|
| 体型 プロンプト | 1,497 | 6.22 | 4.0 | 3x（41→125） | +30 |
| セーラー服 プロンプト | 640 | 5.60 | 3.5 | 4x（13→55） | +15 |
| 色 プロンプト | 590 | 6.41 | 4.0 | 3x（9→30） | +8 |
| プロンプト 体型 | 451 | 6.51 | 4.0 | 3x（12→36） | +8 |
| カメラアングル プロンプト | 432 | 7.99 | 4.5 | 4x（8→35） | +10 |
| 髪型 プロンプト 女性 | 327 | 7.51 | 5.0 | 2.5x（9→23） | +5 |
| **合计** | | | | | **+90 PV/day** |

**具体打法**:
1. **内链强化** — 在 categories/guides 页面里大量引用 prompt 详情页（每个 prompt 卡有专门的 incoming 链接）
2. **prompt 页 SEO 重写** — 让每页带 ≥ 150 字 description + tag 多元化
3. **加 long-tail variant 段** — 在 category intro 里加「具体应用例」section 覆盖更多变体词

**风险**：Google 排名变化是 4-12 周窗口，30 天内只能看到部分果实。

---

### 🥈 通道 2：CTR 重写（已部分做）

**机会**：top 6 低 CTR 页面如果 CTR 翻倍，多 30 PV/day。

| 页面 | impr | 当前 CTR | 目标 CTR | 30d 收益 |
|---|---:|---:|---:|---:|
| /prompts/hairstyle | 9,212/月 | 2.40% | 5.0% | +8 PV/day |
| /prompts/clothing | 6,860/月 | 3.27% | 6.0% | +6 PV/day |
| /prompts/camera | 3,165/月 | 1.86% | 4.0% | +2 PV/day |
| /prompts/color | 2,861/月 | 3.08% | 5.0% | +2 PV/day |
| /tools/gemini | 1,053/月 | 3.04% | 6.0% | +1 PV/day |
| /guides/stable-diffusion-prompt-guide | 1,045/月 | 1.63% | 4.0% | +1 PV/day |

**当前进度**：
- ✅ clothing/hairstyle/color batch 1（5/9，5/23 回查）
- ✅ camera/body-type-guide/sd-guide batch 2（5/10，5/24 回查）
- ⏳ /tools/gemini（待做）
- ⏳ /guides/stable-diffusion-prompt-guide（待做）

**新打法**：
1. **加「【コピペOK】」「N選」「2026年版」** 数字符号到 title — 已在用，但要检验是否够吸引
2. **OG 图差异化** — 当前 /api/og 自动生成是文字 hero，可考虑加图片元素
3. **schema.org BreadcrumbList + ItemList** — rich result 提升 visibility

---

### 🥉 通道 3：GEO（chatgpt.com referral 持续放大）

**当前**：chatgpt.com referral 5/5-5/11 为 15 sessions（4/28-5/4 为 1）= W/W +1400%。

**潜力**：
- 中国/日本市场 ChatGPT 使用渗透率高
- llms.txt 已上线（5/9）
- 但缺 FAQ schema 和 summary-first 段落

**30 天目标**：从 15/week → 60/week（持续 4x 增长）= +6 sessions/day = **+10 PV/day**

**打法**:
1. 给 top 6 category 页加 FAQ schema（5 个常见问题对应）
2. 给 top 10 prompt 详情页加 summary-first 段（开头 2-3 句话总结整个 prompt 的用途）
3. perplexity.ai / phind.com 等 LLM 来源也要监控（目前 0）

---

### 通道 4：工具页排名突破（最大不确定性）

**当前**：
- /tools/personal-color-analysis 目标 36k/月 系（パーソナルカラー診断 9,900 / 9,900 / 8,100 / 5,400 等）
- /tools/hair-color-diagnosis 目标 5,400/月（似合う 髪 色 診断）
- 都已索引，但 GSC 数据显示这两个 URL 当前不在 top queries — 说明排名 > 10

**潜力**：
- 如果 personal-color tool 拿到 1 个 9.9k/月 keyword 的 pos 5：500 impr/day × 5% CTR = 25 clicks/day
- 拿到 pos 3：500 × 12% = 60 clicks/day
- 拿到 pos 1-2：500 × 25% = 125 clicks/day
- 30 天能拿到 pos 5 不容易（KD 28-39，竞争中等）

**realistic 30d**：+30-50 PV/day（如果拿到一个关键词 pos 5-7）

**打法**:
1. **加更多锚文本** — guides/personal-color-guide 页面（新增）反向链接到 tool 页
2. **加 use case schema** — HowTo + FAQ
3. **加日文 Q&A 内容** — 给 tool 页底部加 1000 字「パーソナルカラー診断とは？」「写真診断と対面診断の違い」类常见问题
4. **加 backlink** — Qiita / 自媒体 / X 内容里硬性链回

---

### 通道 5：新内容采集（持续供给）

**当前**：5/4-5/11 新增 15+ 条（多为 5/9 photo-edit batch + 今天 5 个 Theme B）。

**未来 4 周计划**：每周采集 20-30 条，30 天累计 80-120 条新 prompt。

**预计影响**：
- 30 天内新 prompt 大多还没索引或排名
- 但增加内链密度 + 给老 prompt 更多 inbound links，间接提升老页排名
- 直接 PV 贡献：~+10 PV/day（保守）

**优先方向**:
- Theme A 髪色 (Theme B 已做)：髪色 アプリ 系剩余 keyword
- Theme C 白黒カラー化：已做但还能扩
- 新分类探索：プロンプト 検索 / プロンプト 比較 / プロンプト 共有

---

## 4. 4 周执行计划

### Week 1（5/12-5/18）— 启动期
- **5/12**: GA4 自定义维度 24-48h 已过，跑首次 paywall_view 漏斗切片
- **5/13**: prompt-params routine 输出 → 决定 Plan B
- **5/13**: 给 /tools/gemini + /guides/stable-diffusion-prompt-guide SEO 重写（CTR 优化）
- **5/14**: 给 top 6 category 页加 FAQ schema
- **5/15-5/16**: 采集 20 prompts（高需求 keyword: 髪色 アプリ / モノクロ写真 拡張）
- **5/17**: tool 页底部加 Q&A 1000 字（personal-color / hair-color）
- **5/18**: GSC 重爬窗口启动，回查 404 / canonical 改善

**Week 1 目标**: 400 PV/day（+33%）

### Week 2（5/19-5/25）— SEO 重写收果实
- **5/23**: 批次 1 SEO CTR 回查（clothing/hairstyle/color）
- **5/24**: 批次 2 SEO CTR 回查（camera/body-type/sd-guide）
- **5/19-5/22**: 加 6 个 prompt 详情页的 summary-first 段（GEO 优化）
- **5/20-5/21**: 内链强化 — 在 category intro 里嵌入 5-10 个 prompt 链接
- **5/22**: Tag backlog R2 清理（批准 ~30 高价值 tag）

**Week 2 目标**: 500 PV/day（+67%）

### Week 3（5/26-6/1）— GEO + 工具页推
- **5/26-5/31**: 批次 3 SEO CTR 回查（photo-edit）
- **5/26-5/27**: 给 /tools/personal-color-analysis + /tools/hair-color-diagnosis 加 1000 字 Q&A
- **5/28**: 写 1-2 篇 Qiita 文章引流（パーソナルカラー / 髪色 主题）
- **5/29**: X 自动推 5 个 photo-edit Before/After 样片（prompt-ad-copywriter skill）
- **5/30-6/1**: 采集 20 prompts（Theme A + Theme C 收尾）

**Week 3 目标**: 700 PV/day（+133%）

### Week 4（6/2-6/8）— 数据闭环 + iterate
- **6/2**: 回查 chatgpt.com referral 是否持续 +50% W/W
- **6/3**: 看 Theme B 5 prompt 是否产生 GSC 曝光
- **6/4**: 找 1-2 个 stretch keyword 做深度优化
- **6/5-6/8**: 调整策略 / 加内容 / 增长复盘

**Week 4 目标**: 900 PV/day（+200%，距 1000 还差 100）

### Week 5（6/9-6/11）— 冲刺
- 视 Week 4 数据调整。若距 1000 还有 100+，考虑：
  - 加 Reddit / HackerNews 发文
  - X 付费推送 1 万円
  - 找 1 个日本博主合作

**目标日 6/11**: **测达 1000 PV/day**（乐观）/ **实达 700 PV/day**（现实）

---

## 5. 风险与监控

### 关键风险
1. **Google 算法变动** — 30 天内任何核心更新可能让 SEO 排名波动 ±30%
2. **新页面索引延迟** — 5 个 Theme B prompt 可能要 4-6 周才有曝光
3. **内容质量下降** — 急于加 prompt 数量可能导致 Crawled-not-indexed 比例上升
4. **GEO 通道脆弱** — chatgpt.com referral 完全依赖 ChatGPT 的爬取逻辑变化

### 监控仪表盘（每日 / 每周）

| 指标 | 频率 | 阈值（红线） |
|---|---|---|
| Daily PV | 每日 | < 上周 -10% → 排查 |
| GSC 总点击 | 每周 | < 上周 -15% → 排查 |
| chatgpt.com sessions | 每周 | < 上周 -30% → 排查 GEO |
| Crawled-not-indexed | 每周 | > 30 → 不再加新内容直到清完 |
| Top 10 query 排名平均 | 每周 | 任一掉 ≥ 2 位 → 复查该 page |

### 主动决策点
- **5/20**：若 Week 1 < 380 PV/day，调整策略往 GEO / 外链倾斜
- **5/27**：若 Week 2 < 480 PV/day，考虑暂停 SEO 工作转向工具页突破
- **6/3**：若 Week 3 < 650 PV/day，1000 目标改为 800 stretch / 600 commit

---

## 6. 关于「1000」的诚实评估

| 场景 | 概率 | 30d 结果 | 说明 |
|---|---:|---:|---|
| 乐观 | 20% | 1,000+ PV/day | 工具页排名突破 + GEO 持续放大 + SEO 重写全部生效 |
| 现实 | 50% | 500-700 PV/day | 排名上推 50% 生效 + GEO +50% + 内部漏斗 |
| 保守 | 25% | 350-450 PV/day | 仅自然增长 + 部分 SEO 重写生效 |
| 悲观 | 5% | 300 持平或微降 | 算法变动 / 重大技术故障 |

**建议向团队/自己设的目标**：
- 软目标 **commit**: 600 PV/day（50% 概率达成）
- 硬目标 **stretch**: 1000 PV/day（20% 概率达成）
- 拐点 **monitor**: 800 PV/day → 此时基本可断言「数据走起来了」

如果 30 天达不到 1000 但稳定在 500-700，说明**基础结构 OK 但需要 60-90 天累积**。这比硬冲 1000 然后失望更健康。
