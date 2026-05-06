import { NextResponse } from 'next/server'

// Sunsetted (2026-05-06): paid credit visibility now relies on NextAuth
// session, not a signed cookie. The webhook still grants credits to the
// purchase email; clients no longer "claim" — signing in with that email
// reveals the balance immediately.
export async function POST() {
  return NextResponse.json(
    {
      ok: true,
      sunset: true,
      message:
        'Claim endpoint sunsetted. Sign in with the purchase email to access credits.',
    },
    { status: 410 },
  )
}
