# Google OAuth セットアップ手順 — prompta.jp

Phase 4 認証のうち、Google ログインを有効化するための Google Cloud Console 側の設定。コードと NextAuth 設定はすでに本番にデプロイ済み。`GOOGLE_CLIENT_ID` と `GOOGLE_CLIENT_SECRET` を Vercel に追加した時点で「Google でサインイン」ボタンが自動的にサインイン画面に表示される。

## ステップ

### 1. プロジェクト作成（既存があれば飛ばす）

https://console.cloud.google.com → 上部のプロジェクトピッカー → **新しいプロジェクト** → 名前: `prompta`

### 2. OAuth 同意画面の設定

左サイドメニュー → **API とサービス** → **OAuth 同意画面**

- **User Type**: External
- **アプリ名**: prompta
- **ユーザーサポートメール**: あなたのメール
- **アプリのロゴ**: 任意（あれば prompta.jp の favicon 推奨）
- **アプリのドメイン**:
  - アプリのホームページ: `https://www.prompta.jp`
  - プライバシーポリシー: `https://www.prompta.jp/legal/privacy`（未作成の場合は後回しで OK）
  - 利用規約: `https://www.prompta.jp/legal/terms`（同上）
- **承認済みドメイン**: `prompta.jp`
- **デベロッパーの連絡先**: あなたのメール

スコープ画面 → 「**Add or Remove Scopes**」→ 以下 3 つを追加：
- `.../auth/userinfo.email`
- `.../auth/userinfo.profile`
- `openid`

テストユーザー画面（External + 公開前は必須）：
- 自分のメールアドレスを追加
- 後で「公開ステータス → 本番」に切り替えれば誰でも利用可

### 3. OAuth クライアント ID 作成

左サイドメニュー → **API とサービス** → **認証情報** → **+ 認証情報を作成** → **OAuth クライアント ID**

- **アプリケーションの種類**: ウェブ アプリケーション
- **名前**: prompta-web
- **承認済みの JavaScript 生成元**:
  - `https://www.prompta.jp`
- **承認済みのリダイレクト URI**:
  - `https://www.prompta.jp/api/auth/callback/google`
  - （ローカル開発も使うなら追加）`http://localhost:3000/api/auth/callback/google`

作成 → ダイアログに **Client ID** と **Client Secret** が表示されるのでコピー。あとで再表示できる。

### 4. Vercel 環境変数に追加

```bash
echo "<your-client-id>" | vercel env add GOOGLE_CLIENT_ID production
echo "<your-client-secret>" | vercel env add GOOGLE_CLIENT_SECRET production
vercel deploy --prod --yes
```

または Vercel Dashboard → Settings → Environment Variables から手動で追加。

### 5. 動作確認

1. `https://www.prompta.jp/auth/signin` を開く
2. 「**Google でサインイン**」ボタンが表示されていれば成功
3. クリック → Google 同意画面 → 戻ってくる → ヘッダー右上に名前/アイコン表示

## 公開ステータスの切り替え（任意）

External + 「テスト中」状態だと、**追加したテストユーザー以外は使えない**（Google から「Access blocked」エラー）。

一般公開するには：
- OAuth 同意画面 → **公開ステータス: 本番** に切り替え
- 簡易な機密スコープのみなので、Google の verification は不要（要確認、変更されている場合あり）

## Magic Link メールサインインとの関係

両方とも有効化済み（環境変数があれば自動で表示）。ユーザーは好きな方を選べる：
- Google: 1 クリック、登録不要（最初の同意だけ）
- メール: メールアドレスのみ、リンクをクリックして 1 時間以内にサインイン

両方とも結果として同じ User レコードが作られる（メールが一致すれば自動マージ — `allowDangerousEmailAccountLinking: true`）。
