import { notFound, permanentRedirect } from 'next/navigation'

/** Path pagination: page 1 lives on the canonical URL, later pages on /page/N. */
export function resolveListPage(raw: string, canonicalPath: string): number {
  if (!/^\d+$/.test(raw)) notFound()
  const page = Number(raw)
  if (page < 1) notFound()
  if (page === 1) permanentRedirect(canonicalPath)
  return page
}
