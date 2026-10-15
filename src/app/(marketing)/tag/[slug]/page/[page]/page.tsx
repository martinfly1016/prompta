import { REVALIDATE_LIST_SECONDS } from '@/lib/cache-policy'
import { getTagExtraPages } from '@/lib/data'
import { resolveListPage } from '@/lib/pagination'
import { TagListing, tagMetadata } from '../../page'

export const revalidate = REVALIDATE_LIST_SECONDS

export function generateStaticParams() {
  return getTagExtraPages()
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string }
}) {
  const page = Number(params.page)
  return tagMetadata(params.slug, Number.isFinite(page) ? page : 1)
}

export default function TagPageNumber({
  params,
}: {
  params: { slug: string; page: string }
}) {
  const page = resolveListPage(params.page, `/tag/${params.slug}`)
  return <TagListing slug={params.slug} page={page} />
}
