import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  emailHash,
  getPaidBalance,
  setCreditsCookie,
} from '@/lib/paid-credits'

// Called by the client right after sign-in. Looks up the signed-in user's
// email, hashes it, and sets the credits cookie so the existing
// PaidCredits-by-emailHash architecture takes over without any data
// migration.
export async function POST() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) return NextResponse.json({ ok: false }, { status: 401 })
  const eh = emailHash(email)
  await setCreditsCookie(eh)
  const balance = await getPaidBalance(eh)
  return NextResponse.json({ ok: true, balance })
}
