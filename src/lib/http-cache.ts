import { NextResponse } from 'next/server'
import { PRIVATE_API_CACHE_CONTROL, PUBLIC_API_CACHE_CONTROL } from '@/lib/cache-policy'

/** Cache successful public reads at the Vercel edge. Errors stay uncached. */
export function withPublicCache(response: NextResponse) {
  if (response.ok) {
    response.headers.set('Cache-Control', PUBLIC_API_CACHE_CONTROL)
    response.headers.set('Vercel-CDN-Cache-Control', PUBLIC_API_CACHE_CONTROL)
  } else {
    response.headers.set('Cache-Control', PRIVATE_API_CACHE_CONTROL)
  }
  return response
}

export function withPrivateCache(response: NextResponse) {
  response.headers.set('Cache-Control', PRIVATE_API_CACHE_CONTROL)
  return response
}
