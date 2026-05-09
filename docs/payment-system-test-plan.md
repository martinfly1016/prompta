# 工具付費機能 — 全面テスト方案

prompta.jp の freemium / Stripe / NextAuth / AgentMail スタック対応の系統的テスト計画書。

**スタック**: Next.js 14 + Prisma + PostgreSQL + Stripe Checkout + NextAuth (Credentials/Google/Email) + AgentMail。

**現状（2026-05-09 最終）**: `tests/cases.sh` に 17 ケース実装済 → **6 ケース新規追加** で **23 自動化ケース**。さらに **5 ケース手動検証**で全 28 ケース計画。
- 旧 17 + 新 race × 2 (#18, #19) + email-pin × 2 (#23 lightweight + #26 full Stripe API) + webhook × 2 (#24 payment_status + #25 missing-email) = 23
- recovery-token 系 (#20-22) は credit-recovery.ts dead code 削除により **テスト不要**（移除 from matrix）
- #27 OAuth account linking は手動 M5 として実行（Playwright 工程量 > ROI と判断）
- **自動化カバレッジ 23/25 = 92%**（手動 M1-M5 を除く）

---

## 0. 5 分概览

```
全 29 ケース ──┬── 自動化済（17）          tests/run.sh で一括
              ├── 自動化新規（8）          本書 §3 に追加、tests/cases.sh に組込み
              └── 手動 only（4）            本書 §4 のチェックリストで人手確認
```

**既知の Race / Auth / Webhook 系の bug は全て本計画に含む**。本会話で実際に踏んだ 4 件（Link email 上書き / Race-bypass / advisory_xact_lock / findFirst dirty refund）は対応 case がカバー。

---

## 1. テスト構成と前提

### 1.1 ステージング環境（既存 `tests/run.sh`）

```
ローカル PG 5433 (test-isolated)
  + next dev (ENABLE_TEST_AUTH=true で /api/test/login が有効に)
  + stripe CLI listen (本番 Stripe には触れない、sk_test_*)
  + reset_db で各テスト前に DB クリア
```

### 1.2 環境ガード（守らないと本番事故）

| ガード | 場所 | 効果 |
|---|---|---|
| `STRIPE_SECRET_KEY=sk_live_*` 拒否 | `tests/run.sh` 冒頭 | 本番カードへの誤課金を防ぐ |
| `DATABASE_URL` を local PG 5433 にオーバーライド | `.env.local` | 本番 Railway を触らない |
| `STRIPE_WEBHOOK_SECRET` 専用 secret | `.env.local` の `whsec_test_*` | sk_test とペア |
| `ENABLE_TEST_AUTH=true` で `/api/test/login` を有効化 | `.env.local` | 本番では無効、test 専用 fast-path login |

### 1.3 実行コマンド

```bash
# 全 29 ケース
./tests/run.sh

# Gemini 課金テスト (Test #17) をスキップ
SKIP_E2E=1 ./tests/run.sh

# 部分実行
FILTER=race ./tests/run.sh        # name に race 含むだけ
FILTER=webhook ./tests/run.sh
```

---

## 2. 自動化済 17 ケース（既存）

| # | 名前 | カテゴリ | 主な検証点 |
|---|---|---|---|
| 1 | `test_free_quota_exhaustion` | 無料 quota | anon 3 OK / 4 番目 429 |
| 2 | `test_per_tool_isolation` | 無料 quota | hair-color 使い切り ≠ personal-color |
| 3 | `test_ip_cap_defense` | 無料 quota | 5 anon → 6 番目 IP cap で blocked |
| 4 | `test_free_refund_on_failure` | refund | validateImage 失敗で quota 不消費 |
| 5 | `test_anonymous_buy_blocked` | auth | 未ログインで /checkout → 401 + signInUrl |
| 6 | `test_signout_hides_balance` | auth | signOut 後 paidCredits=0 |
| 7 | `test_isolated_balances` | auth | userA / userB 残高独立 |
| 8 | `test_webhook_grants_credits` | webhook | session.completed → PaidCredits 行作成 |
| 9 | `test_webhook_idempotency` | webhook | 同 sessionId 2 回でも double-grant せず |
| 10 | `test_webhook_bad_signature` | webhook | 不正署名 → 400 |
| 11 | `test_purchase_email_triggered` | email | （fire-and-forget なのでスキップ、AgentMail Dashboard で確認）|
| 12 | `test_paid_path_after_free` | paid | 3 free → 4 番目から paid 消費 |
| 13 | `test_cross_tool_pool` | paid | hair-color で買って personal-color で使える |
| 14 | `test_paid_refund_on_failure` | refund | paid credit も validation 失敗で refund |
| 15 | `test_repeated_purchase_accumulates` | paid | 10 + 10 = 20 |
| 16 | `test_sunset_endpoints` | sunset | 旧 endpoint が 410/307 を返す |
| 17 | `test_real_gemini_e2e` | E2E | 実 Gemini 呼び出しで 5 候補 + Before/After |

---

## 3. 自動化新規 ケース

### 3.1 自動化追加（6 ケース、`tests/cases.sh` に実装済）

| # | 名前 | カテゴリ | 動機 |
|---|---|---|---|
| 18 | `test_race_free_quota_burst` | race | **2026-05-09 prod 事故**：5 並列 simulate で FREE_LIMIT=3 を超えて 4 行作成。rank-after-insert 修正後の regression 防止 |
| 19 | `test_race_paid_credit_burst` | race | balance=1 で 2 並列 spend → 1 つだけ成功すべき。`spendOneCredit` の `where:{balance:{gt:0}}` 原子性検証 |
| 23 | `test_checkout_email_pin` | checkout | body/query 注入で `customer_email` が変えられない**ことの軽量 lightweight 検証（Stripe API 呼ばない）** |
| 24 | `test_webhook_pending_does_not_grant` | webhook | webhook handler に `payment_status === 'paid'` ガード追加。card-only なので prod ではトリガーされないが future-proof |
| 25 | `test_webhook_missing_email` | webhook | email field 欠落 → 200 だが grant せず（無限リトライ防止） |
| 26 | `test_checkout_email_pin_full` | checkout | **Stripe API で session を実 retrieve**して `customer_email` および `metadata.sessionEmail` が victim と一致確認。#23 の強化版で full coverage |

詳細コードは [tests/cases.sh](../tests/cases.sh) を参照。`ALL_TESTS` 配列にも追加されているので `./tests/run.sh` だけで全部走る（17 → 23 ケース）。

### 3.2 Phase 2（残）

| # | 名前 | 状況 |
|---|---|---|
| ~~20–22~~ | ~~`test_recovery_token_*`~~ | **削除**: `src/lib/credit-recovery.ts` を 2026-05-09 削除（dead code）— 関連 endpoint は既に sunset 済で再有効化計画なし、テスト対象消失 |
| ~~24~~ | ~~`test_webhook_pending_does_not_grant`~~ | **完了 2026-05-09**: 上記 #24 として実装済 |
| ~~26~~ | ~~`test_checkout_email_pin_full`~~ | **完了 2026-05-09**: 上記 #26 として実装済 |
| **27** | `test_oauth_account_linking` | **手動 M5 へ移管** — Playwright + Google OAuth テストアカウント設定の工程量 > ROI と判断 |

---

## 4. 手動 only 4 ケース（自動化困難 / 高頻度ではない）

### M1. Stripe live mode 100 円リハーサル（本番 sandbox 確認）

**目的**: live キー + Vercel 本番デプロイの設定が想定通りか、test mode 通過後のリハーサル。

**手順**:
1. Stripe Dashboard を **live mode** に切替
2. テスト用 Vercel preview URL（本番ではない）でユーザー登録 + ログイン
3. ¥300 / 10 回パックを実カードで購入
4. 確認:
   - Stripe Dashboard で payment 完了
   - DB の `PaidCredits.balance = 10`
   - メール 2 通受信（Stripe 自動レシート + AgentMail カスタム）
   - 工具を 1 回使う → balance 9 に減少
5. Stripe Dashboard → 当該 payment → Refund を発火（テスト撤退）

**頻度**: 大きな変更後（webhook 改造 / 価格変更 / 認証 provider 追加など）に 1 回。

### M2. クロスデバイス同期

**目的**: 別デバイス（スマホ + PC）で同じ email でログイン → balance 同期。

**手順**:
1. PC: gmail でサインイン → 購入 → balance 10
2. スマホ: 別ブラウザで gmail にマジックリンクログイン
3. 確認: スマホの check API で paidCredits=10
4. スマホで 1 回使う → PC reload → balance 9

**頻度**: 認証 provider 改造後。

### M3. OAuth アカウント自動マージ

**目的**: 同 email で magic link 先 → Google で再ログイン → 自動マージ（`allowDangerousEmailAccountLinking: true`）。

**手順**:
1. Email magic link で `test@gmail.com` 登録 → User row 作成
2. ログアウト
3. 同 `test@gmail.com` で Google ログイン
4. 確認:
   - `User` row は 1 行（マージ）
   - `Account` row 2 行（provider=email + provider=google、同 userId）
5. 購入 → balance がどちらの provider でログインしても見える

**頻度**: NextAuth 設定変更後。

### M4. AgentMail 障害時の degradation

**目的**: AgentMail API key を invalidate しても webhook の grant は成功する。

**手順**:
1. ステージング環境で `AGENTMAIL_API_KEY=invalid_xxx` に書き換える
2. webhook 発火 → grant 成功確認
3. `next dev` ログで「welcome email failed」が出ているか確認
4. webhook 自体は 200 を返す（Stripe 側でリトライ発生しない）

**頻度**: 半年に 1 回 / メール送信プロバイダー切替後。

### M5. OAuth account auto-linking（Playwright 不要の手動版）

**目的**: `allowDangerousEmailAccountLinking: true` が機能している — 同 email で magic link 先 / Google 後でログインしても User row は 1 つに merge される。

**手順**:
1. ブラウザ A: `your-test@gmail.com` で **Email magic link** ログイン → クレジット ¥300 購入 → balance 10
2. 別ブラウザ B（Cookie 全消去）: 同 `your-test@gmail.com` で **Google OAuth** ログイン
3. 確認:
   - サインイン成功（OAuthAccountNotLinked エラーが出ない）
   - check API で `paidCredits=10`（balance が同じ User に紐付いていれば見える）
4. DB を直接確認（手動でも可）:
   ```sql
   SELECT id, email FROM "User" WHERE email='your-test@gmail.com';   -- 1 行
   SELECT provider, "providerAccountId", "userId" FROM "Account"
     WHERE "userId" = (上の id);                                       -- 2 行（email + google）
   ```

**頻度**: NextAuth 設定変更後 / Google OAuth client rotate 後。

**自動化されない理由**:
- Playwright + Google OAuth テストアカウント設定 + redirect URL 登録 = 半日工程
- prompta 規模では人手 5 分の方が ROI 高い。next-auth 自体の v4 リリース回ごとに NextAuth 公式が大量回帰テストを回しているので、本機能の regression 確率は低い

---

## 5. テスト優先度（CI / pre-deploy / 月次）

### 5.1 PR ごと（CI 必須） — Tier 1

毎 commit / PR で必ず通すべき。**新規 race ケースを含めるべき**。

```
1, 2, 3, 4         (free quota 基本)
8, 9, 10, 24, 25   (webhook 基本 + payment_status guard + missing-email edge)
18, 19             (race — bug regression 防止)
23                 (checkout email pin — Stripe Link 事故防止)
```

**実行時間**: ~3-5 分

### 5.2 deploy 前（main → prod 直前） — Tier 2

```
Tier 1 全部
+ 5, 6, 7          (auth 基本)
+ 12, 13, 14, 15   (paid 基本)
+ 16               (sunset endpoints)
```

**実行時間**: ~5-8 分

### 5.3 月次フル — Tier 3

```
Tier 1 + Tier 2 全部
+ 16, 17            (sunset + 実 Gemini)
+ M1, M2, M3, M4    (手動 4 件)
```

**実行時間**: 自動 ~10 分 + 手動 ~30 分

---

## 6. Race condition の原理と検証

**Why race ケースが必要**: 本会話 2026-05-09 の本番事故 — 5 並列 `/api/tools/hair-color/simulate` が `FREE_LIMIT=3` を超えて 4 行作成。原因は `tx.$executeRaw\`SELECT pg_advisory_xact_lock(...)\`` が Prisma + Vercel + Railway PG 環境で機能しないこと。

修正後（`5c8e847`）は **rank-after-insert** に変更：
1. INSERT 即 auto-commit
2. `count` で peer 含む rank を取る
3. `rank > LIMIT` なら自分削除 → ok=false 返す

#18 case はこの動作を CI で守る。

```bash
# 期待結果: 5 並列 → ちょうど 3 件 200 + 2 件 429
# 失敗パターン:
#   ・全部 200 → quota guard が動いていない（regression）
#   ・3 未満 200 → 過度に削除（一致性過剰、機会損失）
```

#19 case は paid credits 側を守る：

```bash
# balance=1 から並列 2 spend
# 期待: 1 件 ok=true / 1 件 ok=false
# 失敗パターン:
#   ・2 件 ok=true → balance が -1 まで行ける（DB constraint 漏れ）
#   ・2 件 ok=false → 確率的失敗（updateMany の where 句 race 失敗）
```

---

## 7. 既知の落とし穴（テスト時の罠）

### 7.1 Stripe CLI fixture が email を上書きする

`stripe trigger checkout.session.completed` は payment_page_confirm fixture を経由するため、`metadata.sessionEmail` などのオーバーライドを試みても fixture が `stripe@example.com` を強制してしまう。**回避策**：直接 webhook を叩く `tests/send-webhook.js` を使う（commit `0d00ea0`）。

### 7.2 `reset_db` のタイミング

各 test の冒頭で `reset_db` を呼ぶこと。前 test の残り行が次 test の数値を狂わせる。**race / paid 系は特に注意**。

### 7.3 sleep 1 の後

`tests/send-webhook.js` 後に `sleep 1` を入れているのは、webhook → DB 反映が非同期な場合の保険。**外す場合は polling に書き換え**。

### 7.4 並列 test の前提

```bash
# OK：単一 test の中で 5 並列リクエスト
# NG：test 間の並列実行（reset_db が干渉）
```

`tests/run.sh` は逐次実行なので問題ないが、Jest 風に並列化したい誘惑には抵抗。

### 7.5 staging Postgres でしか走らせない

`DATABASE_URL` が本番 Railway を指しているとテスト中 `reset_db` で本番データ消失。**`tests/run.sh` 冒頭で URL に `localhost:5433` が入っているか必ず assert** する（既存実装あり）。

---

## 8. メトリクス（テスト品質を測る）

| 指標 | 現状 | 目標 |
|---|---|---|
| 自動化カバレッジ | 17/29 = 58.6% | **23/25 = 92.0%（Phase 1 + 2 完了、recovery 系は dead code 削除で対象外、OAuth は M5 手動）** |
| 月次フル実行時間 | ~10 分 | < 15 分 |
| Bug 発見ラグ（prod 事故 → test 化） | 5/9 race-bypass: 0.5 日 | < 3 日 |
| Tier 1 (CI) 実行時間 | ~3-5 分 | < 7 分 |

---

## 9. 改善ロードマップ

### Phase 1（即時 — 本計画で完了済）

- [x] race × 2 / checkout email pin / webhook missing-email を `cases.sh` に追加
- [x] `tests/send-webhook.js` に `WEBHOOK_TEST_NO_EMAIL=1` フラグ追加
- [ ] `./tests/run.sh` 全グリーン確認（user 操作 — local Postgres + stripe CLI が必要）
- [ ] CI（GitHub Actions）に `tests/run.sh` を組込み

### Phase 2（2026-05-09 完了）

- [x] ~~**#24 webhook payment_status guard**~~ — handler 改修 + test 追加
- [x] ~~**#26 checkout email pin full**~~ — Stripe API retrieve で完全検証 + helper script
- [x] ~~**credit-recovery dead code 削除**~~ — `src/lib/credit-recovery.ts` 削除、#20-22 不要
- [→] **#27 OAuth account linking** — 手動 M5 へ移管（Playwright 工程量 > ROI）

### Phase 3（必要時、未着手）

- [ ] Stripe Webhook 「refund」「dispute」イベント受信 → `StripePayment.status` 更新の追加実装 + test
- [ ] Cross-tool quota の混在 race（hair-color simulate と personal-color analyze の同時実行）

### Phase 3（必要時）

- [ ] Playwright で UI 端 E2E（モーダル → サインイン → checkout → 戻り → balance 表示）
- [ ] 負荷テスト（k6 で 100 並列 simulate → 性能と quota 両方検証）
- [ ] AgentMail bounce / spam 通知 webhook 受信 → 後追い対応

---

## 10. 参考

- 既存テスト実装: [tests/run.sh](../tests/run.sh) / [tests/cases.sh](../tests/cases.sh) / [tests/_lib.sh](../tests/_lib.sh) / [tests/send-webhook.js](../tests/send-webhook.js)
- 移植ガイド: [payments-and-mail-agent-guide.md](payments-and-mail-agent-guide.md)
- 関連 commit:
  - `2270d03` — 17-case 初期実装
  - `0d00ea0` — Stripe CLI fixture 回避（直接 webhook 署名）
  - `5c8e847` — rank-after-insert race 修正
  - `64c13a6` — 特商法 page

---

**最終更新**: 2026-05-09  
**メンテナ**: 本会話の自動 agent  
**前提環境**: macOS / Node 20+ / postgresql@16 / stripe CLI 1.x
