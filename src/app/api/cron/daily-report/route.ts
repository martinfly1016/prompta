/**
 * Daily report cron — runs at 00:00 UTC (= 09:00 JST) daily via Vercel
 * cron config in vercel.json. Pulls 7d-vs-7d data and emails a compact
 * markdown summary to yuchao@byte-ad.com.
 *
 * Auth: Vercel cron sets `Authorization: Bearer ${CRON_SECRET}` header.
 * Manual triggering: curl with the same header.
 */
import { NextRequest, NextResponse } from 'next/server'
import { buildDailyReport } from '@/lib/daily-report'
import { sendEmail } from '@/lib/agentmail'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const TO_EMAIL = process.env.DAILY_REPORT_TO || 'yuchao@byte-ad.com'

function isAuthorized(req: NextRequest): boolean {
  // Vercel cron sets Authorization: Bearer <CRON_SECRET> automatically
  // when CRON_SECRET env var is configured.
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${secret}`
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const started = Date.now()
  try {
    const md = await buildDailyReport()
    const date = new Date().toISOString().slice(0, 10)
    const subject = `Prompta 日報 ${date}`

    const result = await sendEmail({
      to: TO_EMAIL,
      subject,
      text: md,
    })

    const elapsedMs = Date.now() - started
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error, elapsedMs },
        { status: 500 },
      )
    }
    return NextResponse.json({
      ok: true,
      to: TO_EMAIL,
      subject,
      elapsedMs,
      preview: md.slice(0, 300),
    })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'unknown error', stack: e?.stack?.slice(0, 500) },
      { status: 500 },
    )
  }
}
