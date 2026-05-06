import { NextResponse } from 'next/server'

// Sunsetted (2026-05-06): see personal-color recover/request route.
export async function POST() {
  return NextResponse.json({
    ok: true,
    sunset: true,
    message:
      'メールアドレスでサインインすることでクレジットにアクセスできます。/auth/signin にアクセスしてください。',
  })
}
