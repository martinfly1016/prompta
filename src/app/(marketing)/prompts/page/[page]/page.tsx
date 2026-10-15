import { REVALIDATE_LIST_SECONDS } from '@/lib/cache-policy'
import { getAllPromptsExtraPages } from '@/lib/data'
import { resolveListPage } from '@/lib/pagination'
import { AllPromptsListing, allPromptsMetadata } from '../../page'

export const revalidate = REVALIDATE_LIST_SECONDS

export async function generateStaticParams() {
  return getAllPromptsExtraPages()
}

export function generateMetadata({ params }: { params: { page: string } }) {
  const page = Number(params.page)
  return allPromptsMetadata(Number.isFinite(page) ? page : 1)
}

export default function PromptsPageNumber({ params }: { params: { page: string } }) {
  const page = resolveListPage(params.page, '/prompts')
  return <AllPromptsListing page={page} />
}
