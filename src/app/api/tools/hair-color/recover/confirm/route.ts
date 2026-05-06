import { NextRequest, NextResponse } from 'next/server'
import { verifyRecoveryToken } from '@/lib/credit-recovery'
import { setCreditsCookie, getPaidBalance } from '@/lib/paid-credits'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') ?? ''
  const verdict = verifyRecoveryToken(token)
  const target = new URL('/tools/hair-color-diagnosis', req.url)
  if (!verdict.ok) {
    target.searchParams.set('recovered', 'false')
    target.searchParams.set('reason', verdict.reason)
    return NextResponse.redirect(target)
  }
  await setCreditsCookie(verdict.emailHash)
  const balance = await getPaidBalance(verdict.emailHash)
  target.searchParams.set('recovered', 'true')
  target.searchParams.set('balance', String(balance))
  return NextResponse.redirect(target)
}
