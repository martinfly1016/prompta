import { revalidatePath, revalidateTag } from 'next/cache'
import {
  CACHE_TAG_CATEGORIES,
  CACHE_TAG_PROMPTS,
  CACHE_TAG_TAGS,
} from '@/lib/cache-policy'

export interface PromptCacheTarget {
  slug?: string | null
  categorySlug?: string | null
  toolSlug?: string | null
  tagSlugs?: Array<string | null | undefined>
}

function unique(values: Array<string | null | undefined>): string[] {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))))
}

/**
 * Drop the full-route cache and the tagged data cache for public catalog pages.
 * Called after an admin create/update/delete so the next request regenerates
 * instead of waiting out the ISR window.
 */
export function revalidatePromptContent(targets: PromptCacheTarget | PromptCacheTarget[] = {}) {
  const list = Array.isArray(targets) ? targets : [targets]

  revalidateTag(CACHE_TAG_PROMPTS)
  revalidateTag(CACHE_TAG_TAGS)

  revalidatePath('/')
  revalidatePath('/prompts')
  revalidatePath('/tools')
  revalidatePath('/guides')
  revalidatePath('/sitemap.xml')
  revalidatePath('/feed.xml')
  revalidatePath('/prompts/page/[page]', 'page')
  revalidatePath('/guides/[slug]', 'page')

  const slugs = unique(list.map(target => target.slug))
  if (slugs.length === 0) {
    revalidatePath('/prompt/[slug]', 'page')
    revalidatePath('/embed/[slug]', 'page')
  } else {
    for (const slug of slugs) {
      revalidatePath(`/prompt/${slug}`)
      revalidatePath(`/embed/${slug}`)
    }
  }

  const categories = unique(list.map(target => target.categorySlug))
  if (categories.length === 0) {
    revalidatePath('/prompts/[category]', 'page')
    revalidatePath('/prompts/[category]/page/[page]', 'page')
  } else {
    for (const category of categories) {
      revalidatePath(`/prompts/${category}`)
      revalidatePath(`/prompts/${category}/page/[page]`, 'page')
    }
  }

  const tools = unique(list.map(target => target.toolSlug))
  if (tools.length === 0) {
    revalidatePath('/tools/[tool]', 'page')
    revalidatePath('/tools/[tool]/page/[page]', 'page')
  } else {
    for (const tool of tools) {
      revalidatePath(`/tools/${tool}`)
      revalidatePath(`/tools/${tool}/page/[page]`, 'page')
    }
  }

  const tags = unique(list.flatMap(target => target.tagSlugs ?? []))
  if (tags.length === 0) {
    revalidatePath('/tag/[slug]', 'page')
    revalidatePath('/tag/[slug]/page/[page]', 'page')
  } else {
    for (const tag of tags) {
      const encoded = encodeURIComponent(tag)
      revalidatePath(`/tag/${tag}`)
      revalidatePath(`/tag/${encoded}`)
      revalidatePath(`/tag/${tag}/page/[page]`, 'page')
      revalidatePath(`/tag/${encoded}/page/[page]`, 'page')
    }
  }
}

export function revalidateCategoryContent(categorySlug?: string | null) {
  revalidateTag(CACHE_TAG_CATEGORIES)
  revalidateTag(CACHE_TAG_PROMPTS)
  revalidatePath('/')
  revalidatePath('/prompts')
  revalidatePath('/tools')
  revalidatePath('/sitemap.xml')
  revalidatePath('/prompts/[category]', 'page')
  revalidatePath('/prompts/[category]/page/[page]', 'page')
  if (categorySlug) {
    revalidatePath(`/prompts/${categorySlug}`)
  }
}

export function revalidatePublicCatalogTags() {
  revalidateTag(CACHE_TAG_PROMPTS)
  revalidateTag(CACHE_TAG_CATEGORIES)
  revalidateTag(CACHE_TAG_TAGS)
}
