import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emailHash } from '@/lib/paid-credits'
import { signRecoveryToken } from '@/lib/credit-recovery'
import { sendEmail } from '@/lib/agentmail'
import { SITE_CONFIG } from '@/lib/constants'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Same neutral-response pattern as personal-color recover/request, but the
// recovery link points to /tools/hair-color-diagnosis instead.
export async function POST(req: NextRequest) {
  let email = ''
  try {
    const body = await req.json()
    email = String(body?.email ?? '').trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const eh = emailHash(email)
  const account = await prisma.paidCredits.findUnique({
    where: { emailHash: eh },
    select: { balance: true },
  })

  if (account && account.balance > 0) {
    const token = signRecoveryToken(eh)
    const link = `${SITE_CONFIG.url}/tools/hair-color-diagnosis?recover=${encodeURIComponent(token)}`
    const subject = '【prompta.jp】似合う髪色診断クレジットの復元リンク'
    const text = `prompta.jp 似合う髪色診断ツールをご利用いただきありがとうございます。

以下のリンクから、ご購入いただいたクレジット（残り ${account.balance} 回）をこのブラウザに復元できます：

${link}

※ このリンクは 1 時間有効です。期限が切れた場合は再度フォームから送信してください。
※ クレジットはパーソナルカラー診断ツールと共通でご利用いただけます。
※ お心当たりがない場合は、このメールを無視してください。

prompta.jp
${SITE_CONFIG.url}
`
    const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1f2937">
  <h2 style="color:#0284c7;margin:0 0 16px">クレジット復元リンク</h2>
  <p>prompta.jp 似合う髪色診断ツールをご利用いただきありがとうございます。</p>
  <p>下のボタンを押すと、ご購入いただいたクレジット（残り <strong>${account.balance}</strong> 回）をこのブラウザに復元できます。</p>
  <p style="margin:24px 0;text-align:center">
    <a href="${link}" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">クレジットを復元する</a>
  </p>
  <p style="font-size:12px;color:#6b7280">リンクが開けない場合は以下を直接コピー：<br><span style="word-break:break-all">${link}</span></p>
  <p style="font-size:12px;color:#6b7280">※ クレジットはパーソナルカラー診断ツールと共通でご利用いただけます。</p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
  <p style="font-size:12px;color:#9ca3af">このリンクは 1 時間有効です。<br>お心当たりがない場合はこのメールを無視してください。</p>
  <p style="font-size:12px;color:#9ca3af"><a href="${SITE_CONFIG.url}" style="color:#9ca3af">prompta.jp</a></p>
</div>`
    await sendEmail({ to: email, subject, text, html }).catch(() => {})
  }

  return NextResponse.json({
    ok: true,
    message: '指定のメールアドレスにクレジットが紐づいている場合、復元リンクを送信しました。',
  })
}
