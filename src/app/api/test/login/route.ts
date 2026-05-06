import { NextRequest, NextResponse } from 'next/server'
import { encode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// Test-only login bypass for automated test suites. Skips the real
// NextAuth Google OAuth / Email magic link flow so test scripts can
// programmatically obtain a session cookie for any email.
//
// HARD-GATED: only responds when ENABLE_TEST_AUTH=true is set in env.
// On prod (Vercel), this var is absent → returns 404, indistinguishable
// from a non-existent route. Never enable in production.
//
// Usage:
//   curl -c cookies.txt -X POST http://localhost:3000/api/test/login \
//     -H 'Content-Type: application/json' \
//     -d '{"email":"test1@example.com"}'
//
//   curl -b cookies.txt http://localhost:3000/api/tools/hair-color/check
export async function POST(req: NextRequest) {
  if (process.env.ENABLE_TEST_AUTH !== 'true') {
    return new NextResponse(null, { status: 404 })
  }

  let email: string | null = null
  try {
    const body = await req.json()
    email = String(body?.email ?? '').trim().toLowerCase() || null
  } catch {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const user = await prisma.user.upsert({
    where: { email },
    create: { email, name: 'Test User', role: 'MEMBER', isActive: true },
    update: {},
    select: { id: true, email: true, role: true },
  })

  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'NEXTAUTH_SECRET missing' }, { status: 500 })
  }

  const token = await encode({
    token: {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    secret,
  })

  const store = await cookies()
  store.set('next-auth.session-token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } })
}

export async function DELETE() {
  if (process.env.ENABLE_TEST_AUTH !== 'true') {
    return new NextResponse(null, { status: 404 })
  }
  const store = await cookies()
  store.delete('next-auth.session-token')
  return NextResponse.json({ ok: true })
}
