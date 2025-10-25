import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL
    const nextAuthSecret = process.env.NEXTAUTH_SECRET
    const nextAuthUrl = process.env.NEXTAUTH_URL
    const nodeEnv = process.env.NODE_ENV
    const vercelEnv = process.env.VERCEL_ENV

    console.log('=== DEBUG: Environment Variables ===')
    console.log('DATABASE_URL:', dbUrl ? '✅ SET' : '❌ NOT SET')
    console.log('NEXTAUTH_SECRET:', nextAuthSecret ? '✅ SET' : '❌ NOT SET')
    console.log('NEXTAUTH_URL:', nextAuthUrl ? `✅ SET (${nextAuthUrl})` : '❌ NOT SET')
    console.log('NODE_ENV:', nodeEnv)
    console.log('VERCEL_ENV:', vercelEnv)

    return NextResponse.json({
      debug: {
        DATABASE_URL_SET: !!dbUrl,
        DATABASE_URL_PREVIEW: dbUrl
          ? `${dbUrl.substring(0, 30)}...${dbUrl.substring(dbUrl.length - 10)}`
          : 'NOT SET',
        NEXTAUTH_SECRET_SET: !!nextAuthSecret,
        NEXTAUTH_URL: nextAuthUrl,
        NODE_ENV: nodeEnv,
        VERCEL_ENV: vercelEnv,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: String(error), timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}
