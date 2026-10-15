import { REVALIDATE_LIST_SECONDS } from '@/lib/cache-policy'
import { getToolExtraPages } from '@/lib/data'
import { resolveListPage } from '@/lib/pagination'
import { ToolListing, toolMetadata } from '../../page'

export const revalidate = REVALIDATE_LIST_SECONDS

export function generateStaticParams() {
  return getToolExtraPages()
}

export async function generateMetadata({
  params,
}: {
  params: { tool: string; page: string }
}) {
  const page = Number(params.page)
  return toolMetadata(params.tool, Number.isFinite(page) ? page : 1)
}

export default function ToolPageNumber({
  params,
}: {
  params: { tool: string; page: string }
}) {
  const page = resolveListPage(params.page, `/tools/${params.tool}`)
  return <ToolListing tool={params.tool} page={page} />
}
