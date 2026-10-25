import { NextResponse } from 'next/server'
import { z } from 'zod'
import { CONTACT_EMAIL, emailEnabled, sendEmail } from '@/lib/email'

const bodySchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200).optional(),
})

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: '入力内容を確認してください。' },
      { status: 400 },
    )
  }

  // Honeypot. Pretend success so simple bots do not retry.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  if (!emailEnabled) {
    return NextResponse.json(
      { ok: false, error: 'フォーム送信の準備ができていません。メールでご連絡ください。' },
      { status: 503 },
    )
  }

  const result = await sendEmail({
    to: CONTACT_EMAIL,
    replyTo: parsed.data.email,
    subject: `[Prompta お問い合わせ] ${parsed.data.name}`,
    text: [
      `名前: ${parsed.data.name}`,
      `メール: ${parsed.data.email}`,
      '',
      parsed.data.message,
    ].join('\n'),
  })

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
