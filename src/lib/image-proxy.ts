export function getImageProxyUrl(originalUrl: string): string {
  if (!originalUrl) return ''

  // If it's a Vercel blob URL, use our proxy
  if (originalUrl.includes('public.blob.vercel-storage.com')) {
    return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`
  }

  // Otherwise return the original URL
  return originalUrl
}
