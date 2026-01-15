/**
 * SEO utility functions for meta tag optimization
 */

interface PromptForMeta {
  title: string
  description: string
  category?: { name: string }
}

/**
 * Generate an optimized meta description for a prompt page
 * - Ensures minimum length for SEO value
 * - Truncates at sentence boundaries when too long
 * - Adds category context for short descriptions
 *
 * @param prompt - The prompt data
 * @param maxLength - Maximum characters (default 160 for Google)
 * @returns Optimized meta description
 */
export function generateMetaDescription(
  prompt: PromptForMeta,
  maxLength = 160
): string {
  let desc = prompt.description.trim()

  // If description is too short, add context
  if (desc.length < 80) {
    const suffix = prompt.category
      ? `${prompt.category.name}向けの高品質AIプロンプト。無料で使えます。`
      : '高品質なAIプロンプト。ChatGPT、Claude対応。無料で使えます。'

    // Only add suffix if it fits
    if ((desc + suffix).length <= maxLength) {
      desc = desc.endsWith('。') || desc.endsWith('！') || desc.endsWith('？')
        ? desc + suffix
        : desc + '。' + suffix
    }
  }

  // If still too short, prepend title context
  if (desc.length < 60) {
    const prefix = `「${prompt.title}」`
    if ((prefix + desc).length <= maxLength) {
      desc = prefix + desc
    }
  }

  // If description is too long, truncate at sentence boundary
  if (desc.length > maxLength) {
    // Japanese sentence endings
    const sentenceEndRegex = /[^。！？]+[。！？]/g
    const sentences = desc.match(sentenceEndRegex) || []

    let result = ''
    for (const sentence of sentences) {
      if ((result + sentence).length <= maxLength - 3) {
        result += sentence
      } else {
        break
      }
    }

    // If we couldn't fit any complete sentence, do a hard truncate
    if (result.length === 0) {
      // Find a good break point (space or punctuation)
      const truncated = desc.slice(0, maxLength - 3)
      const lastBreak = Math.max(
        truncated.lastIndexOf('。'),
        truncated.lastIndexOf('、'),
        truncated.lastIndexOf(' '),
        truncated.lastIndexOf('　')
      )

      result = lastBreak > maxLength / 2
        ? truncated.slice(0, lastBreak + 1) + '...'
        : truncated + '...'
    }

    desc = result
  }

  return desc
}

/**
 * Generate an optimized page title
 * - Ensures proper format: "Title | Site Name"
 * - Truncates title if too long (Google shows ~60 chars)
 *
 * @param title - The page title
 * @param siteName - The site name (default "Prompta")
 * @param maxLength - Maximum total length (default 60)
 * @returns Optimized page title
 */
export function generatePageTitle(
  title: string,
  siteName = 'Prompta',
  maxLength = 60
): string {
  const suffix = ` | ${siteName}`
  const maxTitleLength = maxLength - suffix.length

  if (title.length > maxTitleLength) {
    // Truncate at a word boundary if possible
    const truncated = title.slice(0, maxTitleLength - 3)
    const lastSpace = Math.max(
      truncated.lastIndexOf(' '),
      truncated.lastIndexOf('　'),
      truncated.lastIndexOf('、')
    )

    const finalTitle = lastSpace > maxTitleLength / 2
      ? truncated.slice(0, lastSpace) + '...'
      : truncated + '...'

    return finalTitle + suffix
  }

  return title + suffix
}
