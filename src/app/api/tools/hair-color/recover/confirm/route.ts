import { NextRequest, NextResponse } from 'next/server'

// Sunsetted (2026-05-06): see personal-color recover/confirm route.
export async function GET(req: NextRequest) {
  const target = new URL('/auth/signin', req.url)
  target.searchParams.set('callbackUrl', '/tools/hair-color-diagnosis')
  return NextResponse.redirect(target)
}
