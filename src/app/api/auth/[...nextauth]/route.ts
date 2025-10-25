export const dynamic = 'force-dynamic'
export const revalidate = 0

let handler: any

try {
  const NextAuthModule = require('next-auth').default
  const { authOptions } = require('@/lib/auth')
  handler = NextAuthModule(authOptions)
} catch (error) {
  // Fallback during build if dependencies aren't available
  handler = async (_req: any, _res: any) => {
    return new Response('Auth handler not available', { status: 503 })
  }
}

export { handler as GET, handler as POST }
