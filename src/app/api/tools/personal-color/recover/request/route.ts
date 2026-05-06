import { NextResponse } from 'next/server'

// Sunsetted (2026-05-06): credit recovery via email link is no longer
// needed — signing in with the purchase email IS the recovery. Returns
// neutral 200 so any old client that still calls this gets a graceful
// no-op instead of an error.
export async function POST() {
  return NextResponse.json({
    ok: true,
    sunset: true,
    message:
      'メールアドレスでサインインすることでクレジットにアクセスできます。/auth/signin にアクセスしてください。',
  })
}
