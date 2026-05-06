import { NextRequest, NextResponse } from 'next/server'
import { stripe, stripeEnabled, STRIPE_WEBHOOK_SECRET, CREDITS_PER_PACK } from '@/lib/stripe'
import { grantCredits, emailHash } from '@/lib/paid-credits'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/agentmail'
import { SITE_CONFIG } from '@/lib/constants'
import type Stripe from 'stripe'

// Stripe webhook — handles checkout.session.completed → grants credits.
// Idempotent: same sessionId processed twice will not double-grant.
export async function POST(req: NextRequest) {
  if (!stripeEnabled || !stripe || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)
  } catch (e: any) {
    console.error('[stripe webhook] signature verify failed:', e?.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const sessionId = session.id
    const email = session.customer_details?.email || session.customer_email || null
    const credits = Number(session.metadata?.credits ?? CREDITS_PER_PACK) || CREDITS_PER_PACK
    const amountJpy = session.amount_total ?? 0

    if (!email) {
      console.error('[stripe webhook] no email on session', sessionId)
      return NextResponse.json({ received: true, error: 'no email' })
    }

    // Idempotency: skip if we already processed this session
    const existing = await prisma.stripePayment.findUnique({ where: { sessionId } })
    if (existing && existing.status === 'paid') {
      return NextResponse.json({ received: true, idempotent: true })
    }

    const eh = emailHash(email)
    await prisma.stripePayment.upsert({
      where: { sessionId },
      create: {
        sessionId,
        paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        emailHash: eh,
        email,
        amountJpy,
        creditsGranted: credits,
        status: 'paid',
        rawEventType: event.type,
      },
      update: {
        status: 'paid',
        rawEventType: event.type,
        paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      },
    })

    const after = await grantCredits(email, credits)
    console.log(`[stripe webhook] granted ${credits} credits to ${email}`)

    // Send our own purchase confirmation email (separate from Stripe's
    // automatic receipt). Failure is logged but never fails the webhook —
    // Stripe must get a 200 back even if our email service hiccups.
    try {
      await sendPurchaseEmail({
        email,
        creditsGranted: credits,
        balance: after.balance,
        amountJpy,
        sessionId,
      })
    } catch (e: any) {
      console.error('[stripe webhook] welcome email failed:', e?.message)
    }
  }

  return NextResponse.json({ received: true })
}

async function sendPurchaseEmail(p: {
  email: string
  creditsGranted: number
  balance: number
  amountJpy: number
  sessionId: string
}) {
  const personalColorUrl = `${SITE_CONFIG.url}/tools/personal-color-analysis`
  const hairColorUrl = `${SITE_CONFIG.url}/tools/hair-color-diagnosis`
  const signinUrl = `${SITE_CONFIG.url}/auth/signin`
  const subject = `【prompta.jp】ご購入ありがとうございます — クレジット ${p.creditsGranted} 回追加`
  const text = `prompta.jp をご利用いただきありがとうございます。

ご購入が完了しました：
  - 商品: AI 診断ツール共通 10 回パック
  - 金額: ¥${p.amountJpy.toLocaleString()}
  - 追加クレジット: ${p.creditsGranted} 回
  - 現在の残高: ${p.balance} 回
  - 注文 ID: ${p.sessionId}

クレジットは以下のツールで共通でご利用いただけます：

▼ パーソナルカラー診断 AI（4 シーズン + 16 色パレット）
${personalColorUrl}

▼ 似合う髪色診断 AI（5 候補 + Before/After シミュレーション）
${hairColorUrl}

▼ 別のデバイスで使う場合
このメールアドレス（${p.email}）でサインインすると、クレジットが自動的に同期されます：
${signinUrl}

万が一サインインできない場合は、各ツールページのモーダル下部「以前購入したクレジットがある場合 →」からこのメールアドレスを入力していただくと復元リンクをお送りします。

※ このメールは受領証ではありません。Stripe からの正式な領収書（PDF 添付）は別途送信されます。

prompta.jp
${SITE_CONFIG.url}
`
  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1f2937">
  <h2 style="color:#0284c7;margin:0 0 8px;font-size:22px">ご購入ありがとうございます 🎉</h2>
  <p style="margin:0 0 24px;color:#6b7280;font-size:14px">prompta.jp をご利用いただきありがとうございます。</p>

  <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:20px;margin-bottom:20px">
    <p style="margin:0 0 4px;font-size:12px;color:#0369a1;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">ご注文内容</p>
    <p style="margin:0 0 4px;font-size:18px;font-weight:700;color:#0c4a6e">AI 診断ツール共通 10 回パック</p>
    <p style="margin:0 0 16px;font-size:12px;color:#0369a1">パーソナルカラー診断 / 似合う髪色診断 で共通利用可</p>
    <table style="width:100%;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:6px 0;color:#6b7280">金額</td><td style="padding:6px 0;text-align:right;font-weight:600">¥${p.amountJpy.toLocaleString()}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280">追加クレジット</td><td style="padding:6px 0;text-align:right;font-weight:600">+${p.creditsGranted} 回</td></tr>
      <tr style="border-top:1px solid #e0f2fe"><td style="padding:6px 0;color:#6b7280">現在の残高</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#0284c7">💎 ${p.balance} 回</td></tr>
    </table>
  </div>

  <div style="display:flex;gap:8px;margin:20px 0;flex-wrap:wrap">
    <a href="${personalColorUrl}" style="flex:1 1 200px;display:block;background:#0284c7;color:#fff;padding:14px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;text-align:center;line-height:1.4">
      🎨 パーソナルカラー診断<br><span style="font-size:11px;opacity:0.85;font-weight:400">4 シーズン + 16 色パレット</span>
    </a>
    <a href="${hairColorUrl}" style="flex:1 1 200px;display:block;background:#7c3aed;color:#fff;padding:14px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;text-align:center;line-height:1.4">
      💇 似合う髪色診断<br><span style="font-size:11px;opacity:0.85;font-weight:400">5 候補 + Before/After</span>
    </a>
  </div>

  <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:14px 16px;margin:24px 0">
    <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#92400e">📌 重要：クレジットの紐付け</p>
    <p style="margin:0;font-size:13px;color:#78350f;line-height:1.6">
      クレジットは <strong>${p.email}</strong> に紐付けられています。
      別のデバイスから利用する場合、このメールアドレスでサインインしてください。
    </p>
    <p style="margin:8px 0 0">
      <a href="${signinUrl}" style="font-size:12px;color:#0284c7;text-decoration:underline">サインインページへ →</a>
    </p>
  </div>

  <p style="margin:16px 0;font-size:12px;color:#9ca3af;line-height:1.6">
    クレジットが見つからない場合は、各ツールページのモーダル下部「以前購入したクレジットがある場合 →」からこのメールアドレスを入力すると復元リンクをお送りします。
  </p>

  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">

  <p style="margin:0 0 4px;font-size:11px;color:#9ca3af">注文 ID: ${p.sessionId}</p>
  <p style="margin:0 0 8px;font-size:11px;color:#9ca3af">Stripe からの正式な領収書（PDF）は別途送信されます。</p>
  <p style="margin:0;font-size:12px;color:#9ca3af"><a href="${SITE_CONFIG.url}" style="color:#9ca3af">prompta.jp</a></p>
</div>`
  await sendEmail({ to: p.email, subject, text, html })
}
