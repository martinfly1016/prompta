# 付费流程整体重设计（2026-05-11 设计稿，2026-05-11 v2 更新）

> 目的：在加新付费 feature（如嵌入式 prompt 生成）之前，把现有付费流程拉直，让用户在「付费 → 用 → 找回 → 再买」的全生命周期都有可见性。
> 当前状态：2 个 freemium tool 上线，1 笔 ¥300 成交，4 笔 hair-color 付费消费。架构能跑但**用户视角的「我买了什么、还剩什么、之前生成了什么」完全不可见**。

## ⚡ v2 更新（2026-05-11）：积分模型根本性 pivot

**变更**：取消每工具 3 次匿名免费额度（`FREE_LIMIT = 3` per anonId per tool），改为**登录用户一次性赠送 3 credits，全站通用**。

**Why**：
- 统一计价单位：所有功能（hair-color / personal-color / 未来嵌入式 prompt 生成）都消耗同一个池子，不再有「免费配额 vs 付费配额」的双系统
- 强制登录 = 用户有 email = 可以做 re-marketing / 漏斗优化 / 数据归因
- 1 个心智模型「クレジット」取代 2 个「無料 + 有料」

**Trade-off / 必须承担的代价**：
1. **匿名转化率会下降**：当前可能 30-50% 的尝试是匿名用户（没数据精确，但 hair-color 9 anons / 4 个 ≥3 = 大部分都把 free quota 用完了）
2. **多账号薅 welcome bonus 风险**：Gmail 别名 / 多 Google 账号注册可重复领。Mitigation：(a) IP rate limit, (b) Google OAuth 比 Email magic link 更难刷, (c) 接受少量损失（每个赠送 credit 的 Gemini API 成本 ~$0.04）
3. **新用户 friction 提升**：进入工具页 → 必须先登录 → 才能用第一次。需要明确价值主张「ログインで 3 クレジット獲得（無料）」抵消友 friction
4. **现有 anonymous free-quota 数据失去意义**：5/4-5/11 测到的「8 撞墙 / 1 付费 = 25% 转化」基线作废，新数据要从 5/12 起重新积累

**新前端文案**：
- 之前: 「無料で 3 回お試し」「クレジット不足」
- 之后: 「ログインで 3 クレジット獲得」「クレジット残り N」（无 free/paid 区分）

---

## 1. 现状盘点

### 已经有的（✅）

| 组件 | 位置 | 状态 |
|---|---|---|
| Stripe checkout flow | `/api/checkout/{tool}` × 2 | ✅ 工作 |
| Stripe webhook → 写 PaidCredits + StripePayment | `/api/webhooks/stripe` | ✅ 工作 |
| Header 顶部 credit 余额 | `HeaderAuthMenu` | ✅ 登录后显示 |
| Per-tool QuotaGate | `HairColorQuotaGate` / `PersonalColorQuotaGate` | ⚠️ Copy-paste (5/10 feedback 已 flag 要抽象) |
| 邮件 recovery（找回积分）| `/api/tools/personal-color/recover/{request,confirm}` | ⚠️ Per-tool 实现，但实际是共享池 |
| 三 provider 登录 | NextAuth: Credentials / Google / Email | ✅ 工作 |
| Stripe 自动收据邮件 | Stripe 默认 | ✅ 但内容通用 |

### 缺的（❌）

| 缺口 | 影响 |
|---|---|
| **没有 `/account` 或 `/my` 页** | 用户登录后没地方看「我买过什么 / 还剩什么 / 用过什么」 |
| **购入履歴不可见** | 用户付完钱只看到 Stripe 收据邮件，回到站上后无法验证「我真的有 10 credit 了吗」 |
| **使用履歴不可见** | 用户消费了 4 个 credit 后没法看「我用在哪些图上」 |
| **生成结果不持久化** | personal-color/hair-color 跑完结果显示一次就丢，用户要自己截屏；下次想再看必须重新跑（再扣 credit） |
| **Credit 余额展示局限于 header** | 进入工具页后，header 余额可见但「这次我用 1 credit 还是 2」不清晰 |
| **Recovery flow per-tool** | 只在 personal-color 下有 recover route，hair-color 没有；但 PaidCredits 是共享 emailHash 索引 |
| **付费成功页 dumb redirect** | 付完只跳回工具页，没「成功 + 你现在有 X credits + 立即使用」明确 CTA |
| **没有「再买一次」CTA** | credit 用完后只有 paywall modal，没在 /account 主动推「补充 5 个？」 |
| **没邮件再营销** | 用完没邮件「谢谢使用，需要再补充吗」 |

---

## 2. 重设计目标（北极星）

**一句话**：让付费用户在任何时刻能在 1 次点击内回答「我买了什么、还剩多少、之前生成过什么、怎么再买」。

### 用户视角的关键页面（按重要性）

1. **`/account`** — 单一权威源
   - Hero: 当前 credit 余额 + 大「補充する」按钮
   - 购入履歴 table（最近 10 笔，含金额/日期/credits/状态/收据链接）
   - 使用履歴 table（最近 20 笔，含 tool/日期/扣分/生成结果链接）
   - 生成结果 grid（最近 12 张图片缩略图）
   - 账户管理（邮箱 / 登录方式 / 删除账户）
   - 法务链接（tokushoho / privacy / terms）

2. **`/tools/{tool}` 内 credit-aware banner**
   - 进入工具页就明确：「あなたの残り N クレジット / この機能は 1 クレジット消費します」
   - 0 credit 时引导到 paywall（已存在）
   - 1-2 credit 时显示 upsell banner「補充して安心」

3. **`/auth/recover`**（统一）
   - 取代 `/api/tools/personal-color/recover/*` per-tool 实现
   - 输入邮箱 → 收 magic link → 验证 → 视情况绑定到当前 NextAuth session

4. **`/checkout/success`**
   - 付款成功后停留 3 秒展示「ありがとう ¥300 で 10 クレジット追加されました」+ 大 CTA「{戻ったツール名} を使う」+ 副 CTA「アカウントを確認する」

---

## 3. 数据模型新增

### 现有

```prisma
model PaidCredits {
  emailHash      String   @unique
  balance        Int
  totalEarned    Int
  totalUsed      Int
  lastPurchase   DateTime?
}

model StripePayment {
  sessionId      String   @unique
  emailHash      String
  amountJpy      Int
  creditsGranted Int
  status         String   // pending | paid | refunded
}

model ToolUsage {
  anonId         String
  ipHash         String
  tool           String
  type           String   // free | paid
  emailHash      String?  // set when paid
  createdAt      DateTime
}
```

### v2 修改：PaidCredits → UserCredits（重命名 + 加字段）

```prisma
model UserCredits {
  // 改名 from PaidCredits — 这个表现在统一管理「赠送 + 购入」
  id                String    @id @default(cuid())
  emailHash         String    @unique
  email             String
  balance           Int       @default(0)      // 当前余额 = welcomeBonus + 已购 - 已用
  welcomeBonus     Int       @default(0)      // 一次性赠送（默认 3）
  welcomeBonusAt    DateTime?                  // 赠送时间，null = 还没领
  totalPurchased    Int       @default(0)      // 累计付费 credit（不含赠送）
  totalConsumed     Int       @default(0)      // 累计消耗
  lastPurchase      DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

**Migration 顺序**：
1. 加新表 `UserCredits`
2. 数据搬运：`PaidCredits` 每行 → `UserCredits` (balance/email 不变，welcomeBonus 设 0 因已经付费过)
3. 为所有现有 NextAuth 注册用户**一次性补发 welcomeBonus = 3**（一次脚本，设 welcomeBonusAt = now()）
4. 改所有 endpoint 从 PaidCredits 读改为 UserCredits 读
5. drop PaidCredits

**`ToolUsage.type` 字段语义变更**：
- 之前：`"free" | "paid"`（区分免费配额 vs 付费）
- 之后：保留字段但语义改为 `"gift" | "paid"`（区分这次消耗的是赠送 credit 还是购入 credit）
- 也可以彻底简化：直接去掉 type，所有消耗都一样
- **建议**：保留 type 字段且改为 `"gift" | "paid"`，方便统计「赠送→付费」漏斗

### 需要新增

```prisma
model GenerationOutput {
  id              String   @id @default(cuid())
  emailHash       String   // owner (post-login required for paid generation)
  tool            String   // "personal-color" | "hair-color" | "prompt:{slug}"
  promptSlug      String?  // for prompt-embedded generation
  inputParams     String?  @db.Text   // JSON of resolved params (for paid prompt-params)
  outputBlobUrl   String   // Vercel Blob URL of the generated image
  thumbnailUrl    String?  // optional smaller version for /account grid
  creditsUsed     Int      @default(1)
  status          String   @default("completed")  // completed | failed | refunded
  errorMessage    String?
  createdAt       DateTime @default(now())

  @@index([emailHash, createdAt])
  @@index([tool, createdAt])
}
```

**Migration impact**：
- 现有 personal-color / hair-color 当前是「生成 → 显示 → 丢」。改造后：每次调 Gemini → 上传 Blob → 写 GenerationOutput row → 返回 URL 给前端
- 现有 4 笔 hair-color 付费消费**没有 GenerationOutput 记录**——历史数据不可回填，只能从 5/12+ 开始有
- 隐私：保留期？建议 90 天后自动删除 outputBlobUrl + thumbnail（保留 metadata 供统计），或者用户可主动删除

---

## 4. 抽象到「ツール無関」的组件（5/10 feedback 应做）

| 当前实现 | 重构目标 |
|---|---|
| `HairColorQuotaGate.tsx` + `PersonalColorQuotaGate.tsx`（copy-paste）| `<QuotaGate tool="X" toolName="..." creditsRequired={1} />` 通用组件 |
| 邮件 recover 在 `/api/tools/personal-color/recover/*` | `/api/account/recover/*`（取代之，删除 per-tool） |
| 各 tool 自己处理 credit 检查 | 抽 hook `useCredits()` 返回 `{balance, loading, refresh}` |
| 各 tool 自己写 paywall_view 事件 | 抽到 QuotaGate 内部，统一 trigger 枚举 |

**前置依赖**：5/10 feedback memory `feedback_freemium_tool_unified.md` 明确这是「第 3 个 freemium 工具上线前必做」。**此次重设计就是兑现这点**。

---

## 5. 6 个阶段（v2，含积分模型 pivot）

| 阶段 | 工作量 | 内容 | 阻塞下游？ |
|---|---|---|---|
| **Phase 0** — 积分模型 pivot | 2-3 天 | UserCredits 表 + welcomeBonus 赠送逻辑 + 改 endpoint 不再 free-quota 校验 + 文案改「ログインで 3 クレジット獲得」 | **是（整个新流程的地基）** |
| **Phase 1** — `/account` MVP | 2-3 天 | 只读页面：balance + 赠送/购入历史 + 使用履歴（无生成图） | 是 |
| **Phase 2** — GenerationOutput schema + 改造 2 个 tool | 2-3 天 | 加表 + migration + hair-color/personal-color 持久化 output | 是 |
| **Phase 3** — `/account` 显示生成 grid + 单图详情页 | 1-2 天 | UI 上展示 Phase 2 数据 | 否 |
| **Phase 4** — 统一 QuotaGate 组件 | 2-3 天 | 抽现有 2 个 gate → 1 个通用；改 2 个 tool 用新 gate | 是（嵌入式生成需要它） |
| **Phase 5** — `/auth/recover` 统一 + `/checkout/success` + 邮件再营销 | 2-3 天 | 优化漏斗 | 否 |

**全部完成 ≈ 2.5-3 周专注工作**（多了 Phase 0 的积分 pivot）

完成后：
- 用户体验完整一致
- QuotaGate 已抽象 → **嵌入式 prompt 生成 MVP 解锁**（再加 1 周）
- 任何新付费功能（订阅 / 多档定价 / 团队套餐）都有清晰落地点

---

## 6. 与其他工作的优先级排序

如果 30 天目标是 PV 1000，重设计 vs 增长动作的 ROI 比较：

| 工作 | 工作量 | 30d PV 影响 | 长期价值 |
|---|---|---|---|
| Phase 1-3（/account + 持久化） | 5-7 天 | ❌ 几乎 0 | ✅ 高 — 解锁嵌入式生成 + 复购漏斗 |
| Phase 4-5（统一 + 漏斗优化）| 3-5 天 | ❌ 0 | ✅ 中 — 提升付费转化 25%→？% |
| SEO 重写 / 新 prompt 采集 | 持续 | ✅ +30-50/day | ✅ 中 |
| GEO（FAQ schema / summary-first）| 1-2 天 | ✅ +10-20/day | ✅ 中 |

**建议**：**Phase 1+2 优先**（5-7 天 = 第 2 周做），因为它解锁嵌入式生成 MVP，且不影响 PV 增长动作（可并行）。Phase 3-5 可以排到第 3-4 周。

---

## 7. 风险

1. **Phase 0 积分 pivot — 匿名转化漏斗短期下跌**：当前可能 30-50% trial 是 anonymous。强制登录后短期内 trial 量会跌。Mitigation: (a) 价值主张文案突出「ログインで 3 クレジット獲得」让用户觉得值得登录, (b) Google one-click 比传统注册友 friction 低，(c) 监控 5/15-5/22 数据，如果跌 >40% 考虑加「不登录可试 1 次」的过渡
2. **Phase 0 — Welcome bonus 多账号薅羊毛**：用户用 Gmail 别名（user+1@gmail.com / user+2@gmail.com）可绕过 emailHash 去重。Mitigation: (a) 归一化邮箱去 `.` 和 `+` 后缀（user.name+x@gmail.com → username@gmail.com），(b) IP rate limit（同 IP 24h 内只能领 1 次 welcome bonus），(c) Google OAuth 优先（每个 Google 账号独立验证邮箱更难刷），(d) **接受少量损失**（赠送 3 credit = ~$0.12 Gemini API 成本，可控）
3. **`/account` 是新认证墙后的功能** — Google/Email 两种登录都顺利绑定到 UserCredits 的 emailHash
4. **历史数据无法回填** — 5/9 前的 4 笔 hair-color 付费消费没生成图记录。UI 上清楚说明「2026-05-12 から記録」
5. **隐私 / 删除请求** — 生成的 Blob 图片是用户数据，GDPR / APPI 角度需要支持「アカウント削除时一起删」
6. **Blob 存储成本** — 平均每张 1MB × 30 张/天 × 90 天保留 = 2.7GB；Vercel Blob 免费层够，但要监控
7. **Stripe Dashboard 待办未完成** — Public name / Support / Terms / Privacy URL 还没填。这次重设计期间一起做
8. **TOS / tokushoho 文案需更新** — 积分赠送条款 / 不可转让 / 无现金价值 等说明

---

## 8. 推荐下一步

1. **5/12 你 review 这份设计稿**：
   - **重点**: Phase 0 积分 pivot 的 trade-off 你接受吗？匿名 funnel 短期会跌
   - GenerationOutput schema 字段是否合理
   - 隐私保留期 90 天 OK 吗
   - welcomeBonus 数额 3 OK 吗（vs 5 / vs 1）
2. **如果同意**：
   - Week 2 (5/19-25): Phase 0 + Phase 1
   - Week 3 (5/26-6/1): Phase 2 + Phase 3
   - Week 4 (6/2-8): Phase 4 + Phase 5
3. **配合嵌入式生成构想**：
   - **6/8 前**: 付费 UX 重设计完
   - **6/15 前**: 嵌入式 prompt 生成 MVP 上 1 个目标 prompt
   - **6/30 前**: 数据验证 → 决定是否扩到 5 个 prompt

整套时间线把「2026-07 之后」的嵌入式生成提到 **2026-06 中**——通过把基建（积分统一 / QuotaGate 抽象 / 持久化）做扎实，未来所有付费 feature 都更便宜。

## 9. 关于 Phase 0 积分 pivot 的更深入讨论

**单独的设计决策点**（v2 新增）：

### Q1: 取消匿名 trial 是否真的好？

**Pro（支持取消）**:
- 数据归因清晰：每个使用都关联 email，可做 cohort 分析、复购漏斗、邮件 re-marketing
- 统一计价：所有 feature 共享 credit 池，未来加新 paid feature 不用重新设计 trial 机制
- 削减 spam / 滥用：anonymous IP-based 配额容易被 VPN 绕过

**Con（保留匿名）**:
- 匿名 trial 让「**冷启动**」用户能秒体验，是当前 funnel 的关键入口
- Google OAuth 友 friction 比文章宣称的低，但**0 友 friction（直接用）始终更优**
- 失去「無料 3 回」的 SEO 价值（关键词「無料」是日本市场强转化信号）

**中间方案**：
- **保留 1 次匿名 trial**（per IP per 24h）作为「免登录预览」，然后引导登录拿剩余 2 credit
- 或：不强制登录但显示「ログインで 3 クレジット獲得」的 banner，让用户自己选

**我的判断**：你直接 pivot 到「必须登录」是大胆但合理的——日本用户对 Google 登录接受度高，且复购漏斗优化的长期 ROI 大于一次 trial 流失。但**前 4 周需要密切监控漏斗**，如果 trial 量跌超 40% 就回滚到中间方案。

### Q2: welcomeBonus 数额：3 / 5 / 1？

| 选项 | 用户体验 | 商业逻辑 |
|---|---|---|
| 1 credit | 不够测试，转化压力大 | 转化率高但流失率也高 |
| **3 credits** | 能测一次 personal-color + 一次 hair-color + 一次嵌入式生成（未来） | 平衡，覆盖主要 use cases |
| 5 credits | 体验充足 | 单用户成本 ~$0.20，可能不必要 |

**保持 3** 跟当前 anonymous free quota 一致，用户心智迁移成本低。

### Q3: 现有付费用户的 welcomeBonus

5/5 之后注册并付费的用户（目前仅 1 个）已经付了 ¥300，没有领过 welcomeBonus。如何处理？

**建议**：**所有现有 Email 注册用户一次性 retroactive 补发 3 credit**（包括已付费用户）。
- 总成本：现有 NextAuth 用户数（应该 < 20）× 3 = < 60 credits ≈ < $2.40 Gemini 成本
- 体现公平 + 测试新流程
- 设 `welcomeBonusAt = now()` 后 idempotent

### Q4: 何时启动 Phase 0

3 个选项：
- **A. Week 1 (5/12-18) 立刻启动** — 抢在 GSC 5/18+ 重爬前完成所有变更，新流量第一波就用新模型
- **B. Week 2 (5/19-25) 启动** — 等当前数据稳定再 pivot，避免数据搅乱
- **C. Week 3+ 启动** — 完成 30 天增长目标再说

**建议 B**：5/13 paywall_view 数据消化后启动，避免新旧机制混在同一周让漏斗数据混乱。
