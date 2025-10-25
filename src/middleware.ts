import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // This function is called after authentication succeeds
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login',
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
