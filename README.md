# Prompta - AI Prompt Gallery

日文の高品質AIプロンプト共有プラットフォーム。ChatGPT、Claude、その他のAIツール向けのプロンプトを管理・共有できます。

## 🚀 機能

### 前台（ユーザー向け）
- **ホームページ**: カテゴリと最新プロンプトの表示
- **カテゴリ閲覧**: カテゴリごとのプロンプト表示
- **プロンプト詳細**: 詳細表示と一鍵コピー機能
- **検索機能**: キーワードでプロンプントを検索
- **レスポンシブデザイン**: モバイル・タブレット対応
- **ダークモード**: 浅色・濃色テーマ対応

### 後台（管理者向け）
- **認証システム**: NextAuth.js を使用した安全なログイン
- **プロンプト管理**: CRUD操作（作成・読取・更新・削除）
- **カテゴリ管理**: カテゴリの作成・編集・削除
- **ダッシュボード**: 統計情報の表示
- **公開/下書き管理**: プロンプトの状態を管理

## 🛠 技術スタック

### フロントエンド
- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **言語**: TypeScript
- **状態管理**: React Hooks

### バックエンド
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **認証**: NextAuth.js
- **ORM**: Prisma
- **データベース**: SQLite (開発)

### デプロイ
- **ホスティング**: Vercel
- **バージョン管理**: GitHub

## 📋 必要な環境

- Node.js 18+
- npm または yarn
- Git

## 🔧 セットアップ

### 1. クローン
```bash
git clone https://github.com/yourusername/prompta.git
cd prompta
```

### 2. 依存パッケージのインストール
```bash
npm install
```

### 3. 環境変数の設定
```bash
cp .env.example .env.local
```

`.env.local` を編集して、以下の情報を設定します：
```
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme
```

### 4. データベースのセットアップ
```bash
npx prisma migrate dev
npm run db:seed
```

### 5. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが起動します。

## 📖 使い方

### 管理画面へのアクセス
1. http://localhost:3000/admin/login にアクセス
2. デフォルトアカウントでログイン:
   - メール: `admin@example.com`
   - パスワード: `changeme`

### プロンプトの追加
1. 管理画面 > プロンプト管理 > 新規作成
2. タイトル、説明、内容を入力
3. カテゴリとタグを設定
4. 「公開する」をチェック
5. 保存

## 🗂 ディレクトリ構造

```
prompta/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # 管理画面
│   │   ├── api/                # API ルート
│   │   ├── category/           # カテゴリページ
│   │   ├── prompt/             # プロンプト詳細ページ
│   │   ├── search/             # 検索ページ
│   │   └── layout.tsx          # ルートレイアウト
│   ├── components/             # React コンポーネント
│   ├── lib/                    # ユーティリティ関数
│   │   ├── prisma.ts           # Prisma クライアント
│   │   ├── auth.ts             # NextAuth 設定
│   │   └── utils.ts            # ヘルパー関数
│   └── types/                  # TypeScript 型定義
├── prisma/
│   ├── schema.prisma           # データベーススキーマ
│   ├── seed.ts                 # シード スクリプト
│   └── migrations/             # マイグレーション
├── public/                     # 静的ファイル
├── .env.example                # 環境変数テンプレート
├── next.config.js              # Next.js 設定
├── tsconfig.json               # TypeScript 設定
└── package.json                # 依存パッケージ
```

## 🚀 デプロイ

### Vercel へのデプロイ

1. GitHub にリポジトリをプッシュ
2. [Vercel ダッシュボード](https://vercel.com) で新しいプロジェクトを作成
3. GitHub リポジトリを接続
4. 環境変数を設定:
   - `NEXTAUTH_SECRET`: ランダムな秘密鍵
   - `NEXTAUTH_URL`: デプロイ URL（例: https://prompta.vercel.app）
   - `DATABASE_URL`: PostgreSQL 接続文字列（本番環境用）

5. デプロイボタンをクリック

## 📝 API リファレンス

### Prompts
- `GET /api/prompts` - プロンプト一覧取得
- `POST /api/prompts` - プロンプト作成
- `GET /api/prompts/[id]` - プロンプト取得
- `PUT /api/prompts/[id]` - プロンプト更新
- `DELETE /api/prompts/[id]` - プロンプト削除
- `POST /api/prompts/[id]/view` - ビュー数インクリメント

### Categories
- `GET /api/categories` - カテゴリ一覧取得
- `POST /api/categories` - カテゴリ作成
- `DELETE /api/categories/[id]` - カテゴリ削除

## 🔒 セキュリティ

- NextAuth.js による認証
- CSRF 保護
- XSS 対策
- パスワードはbcryptでハッシュ化
- API ルートの認証チェック

## 📈 SEO 最適化

- 動的メタタグ
- Sitemap 自動生成
- robots.txt 設定
- Open Graph メタタグ
- JSON-LD スキーマ（準備中）

## 🐛 トラブルシューティング

### データベースエラー
```bash
# データベースをリセット
npx prisma migrate reset
npm run db:seed
```

### ビルドエラー
```bash
rm -rf .next
npm run build
```

### 認証エラー
- `.env.local` の `NEXTAUTH_SECRET` が設定されているか確認
- データベースに管理者ユーザーが存在するか確認

## 📄 ライセンス

MIT License

## 🤝 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を説明してください。

## 📧 サポート

質問や問題がある場合は、[GitHub Issues](https://github.com/yourusername/prompta/issues) を作成してください。

---

**Made with ❤️ for AI enthusiasts**
