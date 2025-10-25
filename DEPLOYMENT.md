# Prompta デプロイメント ガイド

このガイドでは、PropmtaアプリケーションをVercelにデプロイする手順を説明します。

## 前提条件

- GitHub アカウント
- Vercel アカウント
- プロジェクトがGitHubにpushされていること

## ステップ1: Gitでプッシュ

ローカルの変更をGitHubにpushしてください：

```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

## ステップ2: Vercelにログイン

1. [Vercel](https://vercel.com) にアクセス
2. GitHubアカウントでサインイン

## ステップ3: プロジェクトのインポート

1. ダッシュボードで「Add New」→「Project」をクリック
2. GitHubリポジトリを検索して選択
3. 「Import」をクリック

## ステップ4: 環境変数の設定

プロジェクト設定ページで、以下の環境変数を設定してください：

### 必須変数
```
NEXTAUTH_SECRET=<生成した秘密鍵>
NEXTAUTH_URL=https://your-domain.vercel.app
DATABASE_URL=<PostgreSQL接続文字列>
```

### 秘密鍵の生成
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## ステップ5: データベースの設定

### Vercel PostgreSQL を使用する場合

1. Vercel ダッシュボードで「Storage」タブを開く
2. 「Create」→「Postgres」をクリック
3. 新しいデータベースを作成
4. 接続文字列を `DATABASE_URL` にコピー

### 外部PostgreSQLを使用する場合

例: Neon, Railway, Supabase など

## ステップ6: データベースマイグレーション

デプロイ後、以下のコマンドでマイグレーションを実行：

```bash
npx prisma migrate deploy
```

または、Vercelダッシュボードで「Environment」設定内に以下を追加：

```
Build command: npm run build && npx prisma migrate deploy
```

## ステップ7: シードデータの投入

オプション: 初期データを投入する場合

```bash
npx prisma db seed
```

## ステップ8: デプロイ

1. すべての環境変数が設定されていることを確認
2. 「Deploy」ボタンをクリック
3. ビルド完了を待つ

## 本番環境チェックリスト

- [ ] `NEXTAUTH_SECRET` が安全な値に設定されている
- [ ] `NEXTAUTH_URL` が正しいドメインに設定されている
- [ ] PostgreSQL データベースが設定されている
- [ ] Prismaマイグレーションが実行済み
- [ ] 管理者アカウントが作成済み
- [ ] HTTPS が有効化されている
- [ ] ドメイン名が設定されている（カスタムドメイン）

## ドメイン名の設定（オプション）

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Domains」
3. カスタムドメインを追加
4. DNS設定を完了

## トラブルシューティング

### ビルドエラー

```
Error: Cannot find module '@prisma/client'
```

**解決法**: Vercelで自動的に `prisma generate` が実行されるよう、`package.json` の `postinstall` スクリプトを確認:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### データベース接続エラー

- `DATABASE_URL` が正しく設定されているか確認
- Prisma Studioで接続テスト: `npx prisma studio`

### NextAuth エラー

- `NEXTAUTH_SECRET` が設定されているか確認
- `NEXTAUTH_URL` が現在のドメインと一致しているか確認

## パフォーマンス最適化

1. **画像最適化**: Next.js Image コンポーネントを使用
2. **キャッシング**: Next.js の ISR（増分静的再生成）を活用
3. **データベース**: インデックスとクエリの最適化

## モニタリング

### Vertel Analytics
- ダッシュボードの「Analytics」タブで、Core Web Vitals を確認

### ロギング
- `console.log()` でサーバーログを確認
- 本番環境ではログサービス（例: Datadog, LogRocket）の使用を検討

## セキュリティ対策

1. **定期的な更新**: パッケージを定期的に更新
   ```bash
   npm update
   npm audit fix
   ```

2. **環境変数管理**: 秘密情報を `.env` に保存しない

3. **CORS設定**: 必要に応じてCORS設定を追加

## バックアップ

定期的なバックアップを設定：

```bash
# ローカルでバックアップ
npx prisma db dump
```

## ロールバック

デプロイに問題がある場合：

1. Vercel ダッシュボードで「Deployments」を確認
2. 前のバージョンに「Promote to Production」をクリック

## サポートリソース

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/concepts/components/prisma-client/deployment)

---

**デプロイ完了後、以下をテストしてください:**
- [ ] ホームページが正常に表示される
- [ ] 管理画面にログイン可能
- [ ] プロンプトの作成・編集・削除が可能
- [ ] 検索機能が正常に動作
- [ ] SEO メタタグが正しく設定されている
