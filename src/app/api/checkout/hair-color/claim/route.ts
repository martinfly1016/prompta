import { NextResponse } from 'next/server'

// Sunsetted (2026-05-06): see /api/checkout/personal-color/claim/route.ts.
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
