# Mail Agent + Freemium 付费机能 移植ガイド

prompta.jp で運用中の **AgentMail（メール送信） + Stripe（決済） + NextAuth（認証） + freemium quota** を別の Next.js プロジェクトに丸ごと移植するためのドキュメント。

> 想定読者：Next.js 14（App Router） + Prisma + PostgreSQL を使う別プロジェクトの開発者。Stripe アカウント / AgentMail アカウント / Google OAuth クライアントは事前に取得済み。

---

## 0. 全体構成（5 分で把握）

```
[ユーザー]
   │
   │  1. 無料試用（quota = 3 回 / anonId）
   ▼
[freemium ツール] ──── ToolUsage テーブル
   │  quota 切れ
   ▼
[購入モーダル] ── サインインへ ──→ NextAuth 認証
   │                          (Credentials / Google / Email magic link)
   │  サインイン完了
   ▼
[Stripe Checkout] ──→ Stripe ──→ Webhook ──→ PaidCredits.balance += 10
                                    │
                                    └──→ AgentMail でカスタム購入確認メール
                                         （Stripe 自動レシートとは別）
   │
   ▼
[ツール再利用] ── PaidCredits.balance > 0 → spendOneCredit → 利用可
```

**4 つの責任分割**：

| 役割 | ライブラリ | DB モデル |
|---|---|---|
| 認証 | `src/lib/auth.ts` (NextAuth) | User / Account / Session / VerificationToken |
| メール送信 | `src/lib/agentmail.ts` (AgentMail v0 API) | — |
| 決済 | `src/lib/stripe.ts` + checkout/webhook routes | StripePayment |
| クレジット管理 | `src/lib/paid-credits.ts` | PaidCredits |
| Quota | `src/lib/tool-quota.ts` | ToolUsage |

各レイヤーは疎結合。例えば AgentMail だけ移植して Stripe を使わないことも可能。

---

## 1. 必須環境変数

```bash
# ========== Database (Prisma + PostgreSQL) ==========
DATABASE_URL="postgresql://..."

# ========== NextAuth ==========
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="<openssl rand -hex 32>"  # 必須。HMAC キーにも使うので必ず設定

# ========== AgentMail (transactional email) ==========
AGENTMAIL_API_KEY="..."                              # https://agentmail.to/dashboard
AGENTMAIL_INBOX_ID="your-agent@agentmail.to"        # 任意。デフォルト prompta-agent@agentmail.to

# ========== Google OAuth (任意) ==========
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# ========== Stripe (live or test mode) ==========
STRIPE_SECRET_KEY="sk_live_..."             # or sk_test_...
STRIPE_PRICE_ID="price_..."                 # bootstrap スクリプトで取得
STRIPE_WEBHOOK_SECRET="whsec_..."           # bootstrap スクリプトで取得
```

**全部設定する必要は無い**。プロジェクトが必要な機能のみセット。コード側は`stripeEnabled` / `agentmailEnabled` / `googleEnabled` / `emailMagicLinkEnabled` でフェイルセーフ。

---

## 2. Prisma スキーマ（コピペ用）

`prisma/schema.prisma` に以下を追加（既存の User がある場合はマージ）：

```prisma
// ========== NextAuth 標準 4 モデル ==========
// PrismaAdapter が要求する形。フィールド名は変更不可。
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  passwordHash  String?   // CredentialsProvider 用、OAuth/magic-link なら null
  name          String?
  image         String?
  role          String    @default("MEMBER")  // MEMBER / ADMIN / EDITOR
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ========== Freemium quota ==========
model ToolUsage {
  id        String   @id @default(cuid())
  anonId    String                              // ブラウザ Cookie の uuid
  ipHash    String                              // sha256(ip + ua) の先頭 32 文字
  tool      String                              // ツール識別子（例: "personal-color"）
  type      String   @default("free")           // "free" or "paid"
  emailHash String?                             // type="paid" の場合のみセット
  createdAt DateTime @default(now())

  @@index([anonId, tool, createdAt])
  @@index([ipHash, tool, createdAt])
  @@index([emailHash, tool, createdAt])
}

// ========== Paid credits ==========
model PaidCredits {
  id           String   @id @default(cuid())
  emailHash    String   @unique                 // sha256(lowercase(email))
  email        String
  balance      Int      @default(0)
  totalEarned  Int      @default(0)
  totalUsed    Int      @default(0)
  lastPurchase DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model StripePayment {
  id             String   @id @default(cuid())
  sessionId      String   @unique               // Stripe checkout session.id（冪等性キー）
  paymentIntent  String?
  emailHash      String
  email          String
  amountJpy      Int
  creditsGranted Int
  status         String                          // "pending" / "paid" / "refunded"
  rawEventType   String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([emailHash])
  @@index([status])
}
```

`npx prisma migrate dev --name add_freemium_payments`

---

## 3. AgentMail 統合（最小単位）

**目的**：トランザクションメール（購入確認 / マジックリンク）を送る。

**ファイル**：`src/lib/agentmail.ts`（45 行）

```typescript
const AGENTMAIL_API = 'https://api.agentmail.to/v0'
const INBOX_ID = process.env.AGENTMAIL_INBOX_ID || 'your-agent@agentmail.to'

export const agentmailEnabled = Boolean(process.env.AGENTMAIL_API_KEY)

export async function sendEmail(p: {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.AGENTMAIL_API_KEY
  if (!key) return { ok: false, error: 'AGENTMAIL_API_KEY not set' }

  const url = `${AGENTMAIL_API}/inboxes/${encodeURIComponent(INBOX_ID)}/messages/send`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: p.to, subject: p.subject, text: p.text, html: p.html, reply_to: p.replyTo }),
    })
    if (!res.ok) return { ok: false, error: `AgentMail ${res.status}: ${(await res.text()).slice(0, 200)}` }
    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'fetch failed' }
  }
}
```

**そのままコピペで動く**。AgentMail 側で inbox を作成 → API key を取得 → env にセットするだけ。SMTP 設定不要、ドメイン認証不要、即座に送信開始可能。

**注意**：AgentMail は格安だが SLA は SendGrid ほど厳しくない。重要な決済確認メールは **Stripe の自動レシート（別経路、SLA 高い）と二重送信** が推奨。

### 3.1 メール送信の使用例

```typescript
// 購入確認メール（Webhook 内）
import { sendEmail } from '@/lib/agentmail'

await sendEmail({
  to: 'user@example.com',
  subject: '【your-site】ご購入ありがとうございます',
  text: 'プレーンテキスト版（必須）',
  html: '<div>...HTML 版（任意、推奨）...</div>',
})
```

HTML テンプレートのフル例は [`src/app/api/webhooks/stripe/route.ts`](../src/app/api/webhooks/stripe/route.ts) の `sendPurchaseEmail` 関数を参照。**メールクライアントによっては `<button>` や `<flex>` がレンダリングされない**ので table layout を使う（commit `58e3854` で得た教訓）。

---

## 4. NextAuth 三 provider 構成

**目的**：管理者用 Credentials（既存）+ end-user 用 Google + Email magic link（AgentMail 経由）の併用。

**ファイル**：`src/lib/auth.ts`（150 行）+ `src/app/api/auth/[...nextauth]/route.ts`（5 行）

### 4.1 [...nextauth] route

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### 4.2 src/lib/auth.ts のキー設計

```typescript
const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
const emailMagicLinkEnabled = Boolean(process.env.AGENTMAIL_API_KEY)

const providers: any[] = [
  CredentialsProvider({
    /* 管理者ログイン専用、bcrypt + DB User.passwordHash */
  }),
]

if (googleEnabled) providers.push(GoogleProvider({...}))
if (emailMagicLinkEnabled) {
  providers.push(EmailProvider({
    server: { host: 'unused', ... },              // ダミー、後段で上書き
    from: 'your-agent@agentmail.to',
    maxAge: 60 * 60,                              // リンク有効期限 1h
    async sendVerificationRequest({ identifier, url }) {
      // ここで AgentMail 経由で送信
      const r = await sendEmail({
        to: identifier,
        subject: '【your-site】サインインリンク',
        text: `リンク: ${url}`,
        html: `<a href="${url}">サインイン</a>`,
      })
      if (!r.ok) throw new Error(r.error ?? 'send failed')
    },
  }))
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,         // PrismaAdapter で User/Account/Session 永続化
  providers,
  session: { strategy: 'jwt' },                  // CredentialsProvider 互換のため JWT を維持
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) { /* role と email を JWT に焼き込む */ },
    async session({ session, token }) { /* JWT → session.user に展開 */ },
  },
  events: {
    async signIn({ user }) { /* lastLoginAt 更新 */ },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
```

### 4.3 ハマりポイント

1. **`session: { strategy: 'jwt' }` は必須**。CredentialsProvider と他 provider を共存させるための前提。Database session strategy だと CredentialsProvider が動かない。
2. **`PrismaAdapter(prisma) as any`** の `as any` キャスト。NextAuth 4.x と @auth/prisma-adapter の型不整合の暫定回避。
3. **GoogleProvider に `allowDangerousEmailAccountLinking: true`** をつけると、同じメールで先に Email magic link 登録 → 後で Google でログインしても自動リンクされる。商用 SaaS ではこれが UX 上必須。

---

## 5. Stripe 統合

### 5.1 ブートストラップ（一度だけ実行）

`src/scripts/_setup-stripe.ts` を `_setup-stripe-personal-color.ts` を参考にコピー。**冪等**：再実行しても同じ Product / Price / Webhook を返す。

```bash
STRIPE_SECRET_KEY=sk_live_xxx \
STRIPE_WEBHOOK_URL=https://your-domain.com/api/webhooks/stripe \
  npx tsx src/scripts/_setup-stripe.ts
```

出力：
```
✓ Product created: prod_XXX
✓ Price created:   price_YYY
✓ Webhook created: we_ZZZ
  Signing secret:  whsec_AAA  ← これを STRIPE_WEBHOOK_SECRET に入れる
```

スクリプトは：
1. Stripe Product 作成（同名があれば再利用）
2. Price 作成（unit_amount + currency を指定、JPY なら整数）
3. Webhook 作成（`checkout.session.completed` のみ購読）

**注意**: live モードと test モードで全リソース別物。先 test → 動作確認 → live で再 bootstrap が安全。

### 5.2 src/lib/stripe.ts

```typescript
import Stripe from 'stripe'
const SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''
export const stripeEnabled = Boolean(SECRET_KEY)
export const stripe = stripeEnabled ? new Stripe(SECRET_KEY) : null
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || ''
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''
export const CREDITS_PER_PACK = 10
export const PACK_PRICE_JPY = 300
```

### 5.3 Checkout route — `src/app/api/checkout/route.ts`

```typescript
export async function POST(req: NextRequest) {
  if (!stripeEnabled || !stripe || !STRIPE_PRICE_ID) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 })
  }

  const session = await getServerSession(authOptions).catch(() => null)
  const sessionEmail = session?.user?.email
  if (!sessionEmail) {
    return NextResponse.json({ error: 'auth_required', signInUrl: '/auth/signin' }, { status: 401 })
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    payment_method_types: ['card'],
    currency: 'jpy',
    customer_email: sessionEmail,                          // ★ Link/saved-wallet 対策（下記参照）
    success_url: `${SITE_URL}/tools/...?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${SITE_URL}/tools/...?purchase=cancelled`,
    payment_intent_data: { receipt_email: sessionEmail }, // Stripe 自動レシートも同メールへ
    metadata: {
      product: 'your-pack-name',
      credits: String(CREDITS_PER_PACK),
      sessionEmail,                                        // Webhook で照合用
    },
  })
  return NextResponse.json({ url: checkout.url })
}
```

### 5.4 重要な落とし穴：Stripe Link のメール置換

**問題**：サインイン中の user A（gmail）が Checkout を開いた時、Stripe Link が以前保存した別メール（byte-ad.com など）を自動入力してしまうケースがある（実発生：本番で credits が違う email に発行された）。

**対策**：`customer_email: sessionEmail` で固定 + `payment_intent_data: { receipt_email: sessionEmail }` で自動レシートも同じメールへ強制。これで Link/saved-wallet が上書きできなくなる。

未認証ユーザーには `customer_email` を渡さず Stripe に email 取得させる。

### 5.5 Webhook route — `src/app/api/webhooks/stripe/route.ts`

```typescript
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')
  const rawBody = await req.text()                         // ★ 必ず raw body（json() ダメ）

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)
  } catch (e) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const sessionId = session.id
    const email = session.customer_details?.email || session.customer_email
    const credits = Number(session.metadata?.credits ?? 10)
    const amountJpy = session.amount_total ?? 0

    // ★ 冪等性 — 同じ sessionId が 2 回来ても double-grant しない
    const existing = await prisma.stripePayment.findUnique({ where: { sessionId } })
    if (existing && existing.status === 'paid') {
      return NextResponse.json({ received: true, idempotent: true })
    }

    const eh = emailHash(email)
    await prisma.stripePayment.upsert({
      where: { sessionId },
      create: { sessionId, paymentIntent: session.payment_intent, emailHash: eh, email, amountJpy, creditsGranted: credits, status: 'paid', rawEventType: event.type },
      update: { status: 'paid', rawEventType: event.type },
    })

    const after = await grantCredits(email, credits)

    // ★ メール送信失敗は webhook を失敗させない（Stripe には必ず 200 を返す）
    try {
      await sendPurchaseEmail({ email, creditsGranted: credits, balance: after.balance, amountJpy, sessionId })
    } catch (e) {
      console.error('[stripe webhook] email failed:', e)
    }
  }

  return NextResponse.json({ received: true })
}
```

### 5.6 Webhook テスト

```bash
# Stripe CLI で local 転送
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 別 terminal で完了イベントを手動トリガー
stripe trigger checkout.session.completed
```

---

## 6. PaidCredits 管理 — `src/lib/paid-credits.ts`

```typescript
export function emailHash(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
}

// クレジット保有者を特定（NextAuth session 優先、レガシー cookie フォールバック）
export async function getOwnerEmailHash(): Promise<string | null> {
  const session = await getServerSession(authOptions).catch(() => null)
  const sessionEmail = session?.user?.email
  if (sessionEmail) return emailHash(sessionEmail)
  return readCreditsCookie()                              // 旧 user の cookie 互換
}

export async function getPaidBalance(eh: string | null): Promise<number> {
  if (!eh) return 0
  const row = await prisma.paidCredits.findUnique({ where: { emailHash: eh }, select: { balance: true } })
  return row?.balance ?? 0
}

// レース安全：balance > 0 のときだけ -1（updateMany の where で原子的に保護）
export async function spendOneCredit(eh: string): Promise<{ ok: boolean; balance: number }> {
  const result = await prisma.paidCredits.updateMany({
    where: { emailHash: eh, balance: { gt: 0 } },
    data: { balance: { decrement: 1 }, totalUsed: { increment: 1 } },
  })
  if (result.count === 0) return { ok: false, balance: 0 }
  const after = await prisma.paidCredits.findUnique({ where: { emailHash: eh }, select: { balance: true } })
  return { ok: true, balance: after?.balance ?? 0 }
}

export async function grantCredits(email: string, count: number): Promise<{ balance: number }> {
  const eh = emailHash(email)
  const row = await prisma.paidCredits.upsert({
    where: { emailHash: eh },
    create: { emailHash: eh, email, balance: count, totalEarned: count, lastPurchase: new Date() },
    update: { balance: { increment: count }, totalEarned: { increment: count }, lastPurchase: new Date() },
    select: { balance: true },
  })
  return { balance: row.balance }
}
```

**設計ポイント**：
- email を直接 DB に保存しつつ、内部参照は `emailHash` で行う（メアド変更耐性）
- `spendOneCredit` は `updateMany` の `where: { balance: { gt: 0 } }` で **DB 側の原子的保護** — レース安全
- `grantCredits` は `upsert` — 初購入と再購入を 1 クエリでハンドル

---

## 7. Quota 系統 — `src/lib/tool-quota.ts`

freemium 用 anonId / ipHash ベースの quota 制御。**rank-after-insert** モードで race を防ぐ（advisory lock や transaction はこの環境では効かないことを実測済み — 本ドキュメント末尾の落とし穴セクション参照）。

### 7.1 重要なフィールド

```typescript
export const FREE_LIMIT = 3           // anonId ごとの累計上限
export const FREE_IP_LIMIT = 5        // ipHash ごとの累計上限（NAT 共用配慮）
export const ANON_COOKIE = 'app_anon'

export function hashIp(ip: string, ua: string): string {
  return createHash('sha256').update(`${ip}|${ua}`).digest('hex').slice(0, 32)
}
```

### 7.2 atomic reserve — rank-after-insert

```typescript
export async function consumeFreeQuota(
  anonId: string, ipHash: string, tool: string,
): Promise<{ ok: true; id: string; state: QuotaState } | { ok: false; reason: string; state: QuotaState }> {
  // 1. INSERT 即 auto-commit（トランザクション無し）
  const created = await prisma.toolUsage.create({
    data: { anonId, ipHash, tool, type: 'free' },
    select: { id: true, createdAt: true },
  })

  // 2. ピア INSERT を含めた rank を計算
  const rankWhere = (filter) => ({
    ...filter, tool, type: 'free' as const,
    OR: [
      { createdAt: { lt: created.createdAt } },
      { createdAt: created.createdAt, id: { lte: created.id } },  // tie-break by id
    ],
  })
  const [anonRank, ipRank] = await Promise.all([
    prisma.toolUsage.count({ where: rankWhere({ anonId }) }),
    prisma.toolUsage.count({ where: rankWhere({ ipHash }) }),
  ])

  // 3. 超過なら自分を削除
  if (anonRank > FREE_LIMIT || ipRank > FREE_IP_LIMIT) {
    await prisma.toolUsage.delete({ where: { id: created.id } }).catch(() => {})
    return { ok: false, reason: anonRank > FREE_LIMIT ? 'free_exhausted' : 'ip_exhausted', state: ... }
  }

  return { ok: true, id: created.id, state: ... }
}
```

**Why rank-after-insert and NOT advisory lock**：

実測（2026-05-09 prompta 本番）：
- `prisma.$transaction(async (tx) => { await tx.$executeRaw\`SELECT pg_advisory_xact_lock(...)\`; ... })` は Prisma + Vercel Serverless + Railway PG 環境で**機能しない**（5 並列リクエストが直列化されず、4 行が race-bypass で生成）
- `Serializable` 隔離 + 再試行ループは serverless 短接続環境で複雑度が高い
- `INSERT 即 commit → SELECT count(rank) → 超過なら DELETE 自分` は無ロック・無トランザクションで動作し、本番で 5 並列 → 厳密に 3 ✓ + 2 × 429 を確認

### 7.3 API route での組み合わせ例

```typescript
const reservation = await consumeFreeQuota(anonId, ipHash, TOOL)
if (reservation.ok) {
  // free 利用 OK
  consumedType = 'free'
  consumedRecordId = reservation.id
} else {
  // free 切れ → paid フォールバック
  const eh = await getOwnerEmailHash()
  if (eh) {
    const r = await spendOneCredit(eh)
    if (r.ok) {
      const rec = await prisma.toolUsage.create({
        data: { anonId, ipHash, tool: TOOL, type: 'paid', emailHash: eh },
        select: { id: true },
      })
      consumedType = 'paid'
      consumedRecordId = rec.id
    }
  }
}

if (!consumedType) return NextResponse.json({ error: 'quota_exhausted' }, { status: 429 })

// 実際の作業 — Gemini API 呼び出しなど
try {
  const result = await callExpensiveAPI(...)
  return NextResponse.json({ ok: true, result })
} catch (e) {
  // 失敗時は refund — quota 行 / paid credit を戻す
  if (consumedRecordId) await prisma.toolUsage.delete({ where: { id: consumedRecordId } }).catch(() => {})
  if (consumedType === 'paid') await prisma.paidCredits.update({
    where: { emailHash: eh },
    data: { balance: { increment: 1 }, totalUsed: { decrement: 1 } },
  }).catch(() => {})
  return NextResponse.json({ error: 'failed', refunded: true }, { status: 500 })
}
```

---

## 8. クレジット復元（紛失アカウント救済）

別デバイスで購入後 cookie 消失 → サインインせずに残高を取り戻す経路：

### 8.1 1 時間有効リカバリトークン — `src/lib/credit-recovery.ts`

```typescript
const TTL_SECONDS = 60 * 60
const PURPOSE = 'credit-recovery'

export function signRecoveryToken(emailHash: string): string {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS
  const payload = `${emailHash}:${exp}`
  const sig = createHmac('sha256', NEXTAUTH_SECRET).update(`${PURPOSE}:${payload}`).digest('hex').slice(0, 32)
  return `${b64url(payload)}.${sig}`
}

export function verifyRecoveryToken(token: string): { ok: true; emailHash: string } | { ok: false; reason: string } {
  /* HMAC verify + 期限チェック */
}
```

**フロー**：
1. ユーザー `/auth/recover` で email を入力
2. サーバー：そのメアドに `https://your-domain.com/auth/recover?token=...` を送信（1h 有効）
3. ユーザーがリンククリック → トークン検証 → cookie に emailHash をセット → ツール画面へ

NextAuth Email magic link と並行に存在する理由：購入後すぐ「サインイン省略してそのまま使いたい」UX のため。サインイン強制でも実装可能、その場合 credit-recovery.ts は不要。

---

## 9. 移植チェックリスト

### Phase 1: スケルトン（半日）
- [ ] Prisma スキーマ追加 + `migrate dev`
- [ ] `src/lib/agentmail.ts` コピー
- [ ] AgentMail key を `.env` にセット → `sendEmail({to:'me@me.com', subject:'test', text:'hi'})` で動作確認
- [ ] `src/lib/auth.ts` + `[...nextauth]/route.ts` コピー、Credentials のみで `NEXTAUTH_SECRET` 設定 → `/api/auth/signin` 200 確認

### Phase 2: 認証（1 日）
- [ ] Google OAuth Client 作成 → 本番 redirect URI を `https://your-domain.com/api/auth/callback/google` で登録
- [ ] `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` を env に → サインインテスト
- [ ] AgentMail magic link テスト（自分の email で）

### Phase 3: 決済（1 日）
- [ ] Stripe アカウント作成 → test mode で `_setup-stripe.ts` 実行
- [ ] env に `STRIPE_SECRET_KEY` / `STRIPE_PRICE_ID` / `STRIPE_WEBHOOK_SECRET` セット
- [ ] `stripe listen --forward-to localhost:3000/api/webhooks/stripe` でローカル webhook
- [ ] `stripe trigger checkout.session.completed` で grant credits 動作確認
- [ ] Test カード `4242 4242 4242 4242` で実 checkout → DB の StripePayment + PaidCredits 確認 + AgentMail 受信確認

### Phase 4: 本番
- [ ] live mode の `_setup-stripe.ts` 再実行（リソースは別物）
- [ ] Vercel env vars に live キー反映
- [ ] Stripe Dashboard → Settings → Public details で **Support / Terms / Privacy URL** を本番 URL に設定（**特商法** が必要な日本サービスは tokushoho ページも作成必須）
- [ ] 100 円テスト購入 → 全フロー確認

### Phase 5: フリーミアム ツール統合（別途）
- [ ] `src/lib/tool-quota.ts` + `src/lib/paid-credits.ts` を該当ツール API に組み込み
- [ ] 並行 5 並列リクエストで race テスト → 3 + 2×429 になることを確認
- [ ] 失敗時 refund パスを意図的に発火（throw）させて quota 行 / credit が正しく戻ることを確認

---

## 10. 既知の落とし穴

### 10.1 prompta で実際に踏んだ bug（commit 履歴から）

| # | 症状 | 原因 | 修正 |
|---|---|---|---|
| 1 | Email が Twitter 等のクライアントで CTA ボタンが描画されない | `<flex>` 系 layout を使った | table layout に置換（`58e3854`） |
| 2 | 並列クリックで free quota を超える行が DB に作られる | `tx.$executeRaw\`SELECT pg_advisory_xact_lock(...)\`` が Prisma + serverless 環境で機能しない | rank-after-insert モードに置換（`5c8e847`） |
| 3 | Stripe Link が以前の保存メールを上書き → credit が違う email に発行 | `customer_email` 未指定 + `receipt_email` 未強制 | session.user.email で両方を pin（既コードに反映済み） |
| 4 | ToolUsage 行が `findFirst({orderBy: createdAt desc})` で他人の行を指す | INSERT した自分の行を直接取得していなかった | `consumeFreeQuota` の戻り値で id を直接渡す（`5c8e847`） |

### 10.2 NextAuth + PrismaAdapter

- **CredentialsProvider と Database session は両立しない**。`session: { strategy: 'jwt' }` を必ず指定。
- **`@auth/prisma-adapter` の型不整合**：`PrismaAdapter(prisma) as any` のキャストが必要（NextAuth 4.x 系）
- **同一メアドの provider 間 link**：`allowDangerousEmailAccountLinking: true` を Google / Email に付ける。デフォルト false だと「magic link で登録 → Google で再ログイン」で別 User が作られる。

### 10.3 Stripe webhook

- **必ず `req.text()` で raw body を取る**。`req.json()` は body を消費 + JSON 化するので signature verify 失敗。
- **冪等性キーは sessionId**。再送イベント / リトライで double-grant を防ぐ。
- **メール送信失敗を webhook 失敗にしない**。Stripe には必ず 200 を返す（じゃないと Stripe が無限リトライしてカード再請求の懸念）。

### 10.4 セキュリティ

- **`NEXTAUTH_SECRET` 漏洩 = 認証 / 復元 / cookie HMAC 全壊滅**。git に絶対コミットしない、Vercel env のみで管理、漏洩時は即時 rotate。
- **`STRIPE_WEBHOOK_SECRET` も同様**。これが漏れると外部から偽 grant_credits イベントを送れる。
- **email を直接 DB に保存することの責任**：購入確認メール送信 / Stripe 連携 / カスタマーサポート用。GDPR / 個人情報保護法対象。プライバシーポリシーへの明記必須。

---

## 11. 移植コスト見積

| ステージ | 工数（経験者） | 主な作業 |
|---|---|---|
| Phase 1 スケルトン | 0.5 day | コピペ + env + migrate |
| Phase 2 認証 | 1 day | Google Cloud Console + 動作確認 |
| Phase 3 決済（test） | 1 day | Stripe Dashboard + webhook テスト |
| Phase 4 本番化 | 0.5 day | live キー + 商業情報設定 |
| Phase 5 ツール統合 | 0.5–2 days | quota race テスト含む |
| **合計** | **3.5–5 days** | |

prompta では 2026-05-05 ~ 2026-05-09 で全部実装 + bug fix（race / Link / email layout）。同じスタック（Next.js 14 + Prisma + Vercel + Railway PG）なら本ドキュメントから一直線に組める。

---

## 12. 参考リソース

| | |
|---|---|
| AgentMail | https://docs.agentmail.to |
| Stripe Checkout | https://docs.stripe.com/checkout/quickstart |
| Stripe Webhooks | https://docs.stripe.com/webhooks |
| NextAuth.js | https://next-auth.js.org/ |
| Prisma | https://www.prisma.io/docs |
| 特定商取引法に基づく表記 | 例 → [`/legal/tokushoho`](../src/app/(marketing)/legal/tokushoho/page.tsx) |

---

**最終更新**: 2026-05-09  
**ベース実装**: prompta.jp (https://github.com/martinfly1016/prompta)  
**コミット参照**: `_setup-stripe-personal-color.ts`、`5c8e847`（quota race 修正）、`64c13a6`（特商法）、`3086dfb`（GEO）
