# Stripe 接入手順 — パーソナルカラー診断 10回パック

本ドキュメントは Phase 2 の Stripe Checkout を本番稼働させるための手順。コードはすでに上線済み。3 つの環境変数が揃った時点で自動的に「💳 購入」ボタンが活性化する（揃わないと「Stripe 接入中」のプレースホルダのまま）。

## 必要な環境変数（Vercel Production + 開発の `.env`）

| 変数 | 説明 | 例 |
|---|---|---|
| `STRIPE_SECRET_KEY` | Stripe API シークレットキー | `sk_live_...` (本番) / `sk_test_...` (テスト) |
| `STRIPE_PRICE_ID` | 10回パック商品の Price ID | `price_1ABC...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook 署名検証シークレット | `whsec_...` |

`NEXTAUTH_SECRET` は既存。クレジット用 Cookie の HMAC 鍵にも流用しているので変更不要。

## Stripe Dashboard 側の操作

### 1. アカウント設定（初回のみ）

- Stripe Dashboard にログイン → 右上「Activate payments」→ 事業情報 / 銀行口座を入力（日本法人なら国 = JP）
- 「Tax & fees」で 消費税の自動計算オプションを確認（任意）

### 2. 商品 + 価格作成

Dashboard → Products → **+ Add product**

- **Name**: `パーソナルカラー診断 10回パック`
- **Description**: `AI による写真パーソナルカラー診断ツールを 10 回使えるクレジットパック。有効期限なし。`
- **Pricing**:
  - **Pricing model**: `Standard pricing`
  - **Price**: `300`
  - **Currency**: `JPY` (日本円)
  - **Type**: `One time`（買い切り）

保存後 → 商品詳細ページ右上の **API ID（Pricing 項）** をコピー → これが `STRIPE_PRICE_ID`。

### 3. API キー取得

Dashboard → Developers → **API keys**
- **Secret key** を Reveal → コピー → `STRIPE_SECRET_KEY`
- 本番運用前は `sk_test_...` でテスト推奨

### 4. Webhook 設定

Dashboard → Developers → **Webhooks** → **+ Add endpoint**

- **Endpoint URL**: `https://www.prompta.jp/api/webhooks/stripe`
- **Events to send**: 以下 1 件のみで OK
  - `checkout.session.completed`
- 保存後 → endpoint 詳細 → **Signing secret** を Reveal → コピー → `STRIPE_WEBHOOK_SECRET`

> **注意**：本番デプロイ後に Webhook を追加すること。テスト環境用と本番用は別 endpoint。

### 5. Vercel 環境変数登録

Vercel Dashboard → プロジェクト `prompta` → Settings → Environment Variables → 上の 3 つを `Production` スコープで追加 → **Redeploy** すると有効化。

## 動作確認手順

### テストモード（推奨）

1. Stripe Dashboard 左下のトグルを **Test mode** に切り替え
2. テスト用 `sk_test_...` + `price_test_...` + `whsec_test_...` を Vercel Preview 環境にセット
3. プレビューデプロイで `/tools/personal-color-analysis` を開く
4. 4 回目のクリック → モーダル → 「💳 10 回パックを購入」をクリック
5. Stripe Checkout に遷移 → テストカード `4242 4242 4242 4242`（任意の将来日付 + 任意の 3 桁 CVC + 任意の郵便番号）で決済
6. リダイレクト後、ページ上部に「🎉 10 クレジットが追加されました！」のバナー
7. ステータスチップが「💎 保有クレジット：10 回」に変化
8. もう一度「📁 写真を選択して診断」→ 1 つ消費 → 「💎 保有クレジット：9 回」

### Webhook テスト

- Stripe Dashboard → Webhooks → endpoint → Send test webhook → `checkout.session.completed`
- 本番ログ（Vercel Logs）で `[stripe webhook] granted 10 credits to ...@...` を確認

## トラブルシューティング

| 症状 | 原因 | 対処 |
|---|---|---|
| モーダルの購入ボタンが Disabled | env 未登録 or stripeEnabled=false | 3 変数すべてセットされているか確認 |
| Checkout に遷移しない（503 返却） | `STRIPE_PRICE_ID` 未設定 | Vercel 環境変数を再確認 |
| 決済成功後クレジットが反映されない | Webhook 未届き or 署名失敗 | Stripe Dashboard → Webhook → Events で配信履歴確認、422/400 が出ていれば `STRIPE_WEBHOOK_SECRET` 不一致 |
| ブラウザ Cookie 削除後クレジット消失 | クレジット用 Cookie が消失（DB のクレジット自体は残存） | Phase 2.5 でメール復元フローを追加予定。現状は購入時メール宛 Stripe 領収メールを保管してもらう |

## 価格変更時

- Stripe Dashboard で新しい Price を作成 → 旧 Price を Archive → Vercel `STRIPE_PRICE_ID` を更新 → Redeploy
- 既存 Webhook は変更不要

## 補足：DB 上の付与レコード

- `PaidCredits`：emailHash ごとの残高（balance, totalEarned, totalUsed）
- `StripePayment`：sessionId ごとの購入記録（idempotency key）
- `ToolUsage`：消費イベント全部（free/paid type 別、emailHash 紐付け）

`prisma studio` で確認可能。
