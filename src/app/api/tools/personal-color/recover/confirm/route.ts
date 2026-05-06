import { NextRequest, NextResponse } from 'next/server'

// Sunsetted (2026-05-06): recovery cookies were the previous credit
// visibility mechanism. Now credits visibility is gated by NextAuth
// session. Old links redirect to /auth/signin so the user can use the
// new flow (email link == sign-in).
export async function GET(req: NextRequest) {
  const target = new URL('/auth/signin', req.url)
  target.searchParams.set(
    'callbackUrl',
    '/tools/personal-color-analysis',
  )
  return NextResponse.redirect(target)
}
