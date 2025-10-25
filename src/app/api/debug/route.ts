import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const timestamp = new Date().toISOString()
    const dbUrl = process.env.DATABASE_URL
    const dbUrlSet = !!dbUrl
    const dbUrlPreview = dbUrl ? `${dbUrl.substring(0, 30)}...` : 'NOT SET'

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
        dbUrlPrefix: dbUrlPreview,
        dbUrlLength: dbUrl?.length || 0,
      },
      auth: {
        hasAuthSecret: !!process.env.NEXTAUTH_SECRET,
        authSecretLength: process.env.NEXTAUTH_SECRET?.length || 0,
        hasAuthUrl: !!process.env.NEXTAUTH_URL,
        authUrl: process.env.NEXTAUTH_URL || 'NOT SET',
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
