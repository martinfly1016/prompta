import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const timestamp = new Date().toISOString()
    const dbUrlSet = !!process.env.DATABASE_URL

    return NextResponse.json({
      status: 'ok',
      timestamp,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
        buildId: process.env.BUILD_ID,
        buildTimestamp: process.env.BUILD_TIMESTAMP,
      },
      database: {
        hasDbUrl: dbUrlSet,
      },
      auth: {
        hasAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasAuthUrl: !!process.env.NEXTAUTH_URL,
      },
      diagnostic: {
        allEnvVarsLoaded: !!(dbUrlSet && process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_URL),
        message: dbUrlSet ? 'DATABASE_URL is configured' : 'WARNING: DATABASE_URL is NOT configured',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
