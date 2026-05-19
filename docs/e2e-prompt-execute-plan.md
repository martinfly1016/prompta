# PromptExecutor E2E 测试计划

**目标**: 验证 `<PromptExecutor>` + `/api/prompt/execute` 全链路（5/19 ship 后未真实跑过）
**测试账号**: `e2e-test+pe1@prompta.jp` (image 测试) / `e2e-test+pe2@prompta.jp` (text 测试)
**前置条件**: `ENABLE_TEST_AUTH=true` env var

## 测试 case 覆盖

### Group A — Auth + 鉴权（无副作用，可在 prod ENABLE_TEST_AUTH=false 跑）

| ID | 名称 | 操作 | 期待 |
|---|---|---|---|
| A1 | 未登录拒绝 | POST `/api/prompt/execute` 无 cookie | 401 `login_required` |
| A2 | 余额查询未登录 | GET `/api/tools/balance` 无 cookie | 200 `{balance:0, signedIn:false}` |
| A3 | 详情页渲染 | GET `/prompt/mandala-floral-coloring-page-adults` | 200 + HTML 含「ここで試す」|

### Group B — 扣费正确性（需要 ENABLE_TEST_AUTH=true）

| ID | 名称 | 操作 | 期待 |
|---|---|---|---|
| B1 | 文字 1 credit | seed 10 → execute text prompt → balance | 余额 9, ToolUsage.creditsConsumed=1 |
| B2 | 图片 5 credit (Gemini) | seed 10 → execute Gemini image → balance | 余额 5, creditsConsumed=5, imageUrl 非空 |
| B3 | 图片 5 credit (OpenAI) | seed 10 → execute OpenAI image → balance | 余额 5, creditsConsumed=5, imageUrl 非空 |
| B4 | 余额不足拒绝 | seed 3 → execute image (need 5) → 余额 | 402 `credits_exhausted`, 余额 = 3（不扣）|
| B5 | 文字够但图片不够 | seed 4 → execute image | 402, 余额 4 |
| B6 | 文字够 → 跑 | seed 4 → execute text | 200, 余额 3 |

### Group C — 失败 + 退款（需要 ENABLE_TEST_AUTH=true）

| ID | 名称 | 操作 | 期待 |
|---|---|---|---|
| C1 | Bad provider id → 400 | seed 10 → execute providerId=invalid | 400, 余额 10（不扣）|
| C2 | 空 content → 400 | seed 10 → execute content='' | 400, 余额 10 |
| C3 | Provider 失败退款 | seed 10 → execute 触发 Gemini safety filter | 500, 余额 10（自动退款）|

### Group D — 缓存 + 限流（需要 ENABLE_TEST_AUTH=true）

| ID | 名称 | 操作 | 期待 |
|---|---|---|---|
| D1 | 60s 缓存命中 | seed 20 → 同 prompt+provider 跑 2 次 | 第 2 次 200 + `cached:true` + 余额 15（不扣第 2 次）|
| D2 | Rate limit | 5 req / 5 sec | 第 6 次 429 `rate_limited` |

### Group E — Provider 自动 dispatch（需要 ENABLE_TEST_AUTH=true）

| ID | 名称 | 操作 | 期待 |
|---|---|---|---|
| E1 | photo-edit 模式 | seed 10 → execute photo-edit 类 prompt + sourceImage | 200, image返回 |
| E2 | 不带 sourceImage 调 image-edit | seed 10 → execute photo-edit slug 但无 sourceImage | 跑 default 模式（image-gen 模式 fallback） |

### Group F — 历史记录（需要 ENABLE_TEST_AUTH=true）

| ID | 名称 | 操作 | 期待 |
|---|---|---|---|
| F1 | 用量记录 | 跑 1 image + 1 text → `/account` (服务端 query DB) | ToolUsage 2 条：creditsConsumed=5 + 1 |

## 执行环境对比

| 环境 | ENABLE_TEST_AUTH | 安全 | 完整性 |
|---|---|---|---|
| Local dev (npm run dev) | 可设 true | 100% 安全（隔离）| 与 prod 行为可能微差（next.js mode 不同）|
| Vercel preview branch | 可设 true on preview env | 高（独立 DB？）| 几乎与 prod 一致 |
| **Prod 临时开** | true 5-10 分钟窗口 | 中（窗口期任何人能登 e2e-test+\*）| 100% 真实 |

## 推荐执行流程

### 阶段 1：Local 验证（你机器跑 5 分钟）
1. `npm run dev` + `.env.local` 加 `ENABLE_TEST_AUTH=true`
2. `npx tsx src/scripts/e2e/run-prompt-execute.ts http://localhost:3000`
3. 全部通过 → 阶段 2

### 阶段 2：Prod E2E（10 分钟窗口期）
1. `vercel env add ENABLE_TEST_AUTH production` 输入 `true`
2. Empty commit push → 等 Vercel deploy ~2 min
3. `npx tsx src/scripts/e2e/run-prompt-execute.ts https://www.prompta.jp`
4. 全部通过 → 跑 `/api/test/reset` 清测试账号
5. `vercel env rm ENABLE_TEST_AUTH production` + empty commit push 再次 deploy
6. Smoke: `curl -X POST https://www.prompta.jp/api/test/login` 应返回 404（确认关闭）

## 失败处理

- 任何 case fail → 立即停止 + 报告
- 余额泄露给真实用户的可能性 = 0（safety_check_failed 防护：seed-credits 拒绝 email 不含 'e2e-test' 的请求）
- 若 prod E2E 期间真实用户登录 prompta：他们不会受影响（auth flow 没改），只是 `/api/test/*` 在窗口期可用

## 数据清理

⚠️ **绝对不要在 prod 跑 `/api/test/reset`** — 它 `TRUNCATE` 全表，会清空真实付费用户的余额。

正确的清理方式（仅影响测试 email）：
```bash
# 把测试账号余额置 0（不影响其他用户）
curl -X POST https://www.prompta.jp/api/test/seed-credits \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-test+pe1@prompta.jp","balance":0}'
curl -X POST https://www.prompta.jp/api/test/seed-credits \
  -H "Content-Type: application/json" \
  -d '{"email":"e2e-test+pe2@prompta.jp","balance":0}'
```

ToolUsage 历史记录留着无害（标记为 e2e-test 邮箱）。如果想清，需要写一个新的 safety-gated endpoint 只 DELETE 该 email 的行。
