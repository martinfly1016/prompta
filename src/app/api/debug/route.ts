import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return NextResponse.json({
    hasDbUrl: !!process.env.DATABASE_URL,
    dbUrlLength: process.env.DATABASE_URL?.length || 0,
    dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) || 'NOT SET',
    hasAuthSecret: !!process.env.NEXTAUTH_SECRET,
    authSecretLength: process.env.NEXTAUTH_SECRET?.length || 0,
    hasAuthUrl: !!process.env.NEXTAUTH_URL,
    authUrl: process.env.NEXTAUTH_URL || 'NOT SET',
    nodeEnv: process.env.NODE_ENV,
  })
}
