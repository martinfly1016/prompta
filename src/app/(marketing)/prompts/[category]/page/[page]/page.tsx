import { REVALIDATE_LIST_SECONDS } from '@/lib/cache-policy'
import { getCategoryExtraPages } from '@/lib/data'
import { resolveListPage } from '@/lib/pagination'
import { CategoryListing, categoryMetadata } from '../../page'

export const revalidate = REVALIDATE_LIST_SECONDS

export function generateStaticParams() {
  return getCategoryExtraPages()
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; page: string }
}) {
  const page = Number(params.page)
  return categoryMetadata(params.category, Number.isFinite(page) ? page : 1)
}

export default function CategoryPageNumber({
  params,
}: {
  params: { category: string; page: string }
}) {
  const page = resolveListPage(params.page, `/prompts/${params.category}`)
  return <CategoryListing category={params.category} page={page} />
}
