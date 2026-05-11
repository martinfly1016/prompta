# 付费流程整体重设计（2026-05-11 设计稿）

> 目的：在加新付费 feature（如嵌入式 prompt 生成）之前，把现有付费流程拉直，让用户在「付费 → 用 → 找回 → 再买」的全生命周期都有可见性。
> 当前状态：2 个 freemium tool 上线，1 笔 ¥300 成交，4 笔 hair-color 付费消费。架构能跑但**用户视角的「我买了什么、还剩什么、之前生成了什么」完全不可见**。

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

## 5. 5 个阶段（推荐执行顺序）

| 阶段 | 工作量 | 内容 | 阻塞下游？ |
|---|---|---|---|
| **Phase 1** — `/account` MVP | 2-3 天 | 只读页面：balance + purchase history + usage history（无生成图） | 是（任何后续都需要这个着陆点） |
| **Phase 2** — GenerationOutput schema + 改造 2 个 tool | 2-3 天 | 加表 + migration + 改 hair-color/personal-color 的 generate endpoint 保存 output | 是（图片持久化是嵌入式生成前置） |
| **Phase 3** — `/account` 显示生成 grid + 单图详情页 | 1-2 天 | UI 上把 Phase 2 的数据展示出来 | 否 |
| **Phase 4** — 统一 QuotaGate 组件 | 2-3 天 | 抽现有 2 个 gate → 1 个通用；改 2 个 tool 用新 gate | 是（嵌入式生成需要它） |
| **Phase 5** — `/auth/recover` 统一 + `/checkout/success` + 邮件再营销 | 2-3 天 | 优化漏斗 | 否 |

**全部完成 ≈ 2 周专注工作**

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

1. **`/account` 是新认证墙后的功能** — 需要确保 Google/Email 两种登录都顺利绑定到 PaidCredits 的 emailHash
2. **历史数据无法回填** — 5/9 前的 4 笔 hair-color 付费消费没法显示生成结果。需要在 UI 上清楚说明「2026-05-12 から記録」
3. **隐私 / 删除请求** — 生成的 Blob 图片是用户数据，GDPR / APPI 角度需要支持「アカウント削除时一起删」
4. **Blob 存储成本** — 平均每张 1MB × 30 张/天（保守估计） × 90 天保留 = 2.7GB；Vercel Blob 免费层够，但要监控
5. **Stripe Dashboard 待办未完成** — Public name / Support / Terms / Privacy URL 还没填（`project_stripe_dashboard_pending.md`）。这次重设计期间可以一起做

---

## 8. 推荐下一步

1. **5/12 你 review 这份设计稿**：看 Phase 1-5 的范围 / GenerationOutput schema 字段是否合理 / 隐私保留期 90 天 OK 吗
2. **如果同意**：Week 2（5/19-5/25）开 Phase 1+2，Week 3 (5/26-6/1) 接 Phase 3+4
3. **配合 prompt 嵌入式付费生成构想**（`memory/project_per_prompt_paid_generation.md`）：Phase 4 QuotaGate 一抽好，MVP 就解锁。整体节奏：
   - **6/8 前**: 付费 UX 重设计完
   - **6/15 前**: 嵌入式 prompt 生成 MVP 上 1 个目标 prompt
   - **6/30 前**: 数据验证 → 决定是否扩到 5 个 prompt

整套时间线把「2026-07 之后」的嵌入式生成提到 **2026-06 中**——通过把基建（QuotaGate 抽象 / 持久化）做扎实，未来所有付费 feature 都更便宜。
