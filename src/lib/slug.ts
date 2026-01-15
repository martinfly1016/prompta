/**
 * Slug generation utilities for SEO-friendly URLs
 */

/**
 * Generate a URL-friendly slug from a title
 * Supports Japanese characters (hiragana, katakana, kanji)
 *
 * @param title - The title to convert to a slug
 * @param existingId - Optional existing ID to append for uniqueness
 * @param maxLength - Maximum length of the base slug (default 50)
 * @returns A URL-friendly slug
 */
export function generateSlug(
  title: string,
  existingId?: string,
  maxLength = 50
): string {
  // Normalize and clean the title
  let base = title
    .toLowerCase()
    .trim()
    // Replace whitespace with hyphens
    .replace(/[\s　]+/g, '-')
    // Remove special characters but keep:
    // - alphanumeric (a-z, 0-9)
    // - hyphens
    // - Japanese characters (hiragana, katakana, kanji)
    .replace(/[^\w\-\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/g, '')
    // Remove consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-|-$/g, '')

  // Truncate to maxLength
  if (base.length > maxLength) {
    // Try to truncate at a word boundary (hyphen)
    const truncated = base.slice(0, maxLength)
    const lastHyphen = truncated.lastIndexOf('-')
    base = lastHyphen > maxLength / 2 ? truncated.slice(0, lastHyphen) : truncated
  }

  // Add short ID suffix for uniqueness
  // Use last 6 characters of the existing ID, or generate a random suffix
  const suffix = existingId
    ? existingId.slice(-6)
    : generateRandomSuffix(6)

  return `${base}-${suffix}`
}

/**
 * Generate a random alphanumeric suffix
 *
 * @param length - Length of the suffix
 * @returns Random alphanumeric string
 */
function generateRandomSuffix(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Check if a string looks like a CUID (used for legacy URL detection)
 * CUIDs are 25 characters starting with 'c'
 *
 * @param str - The string to check
 * @returns True if the string looks like a CUID
 */
export function isCuid(str: string): boolean {
  // CUID pattern: starts with 'c', 25 characters, alphanumeric
  return /^c[a-z0-9]{24}$/.test(str)
}

/**
 * Validate if a slug is well-formed
 *
 * @param slug - The slug to validate
 * @returns True if the slug is valid
 */
export function isValidSlug(slug: string): boolean {
  // Valid slug: lowercase alphanumeric, hyphens, Japanese characters
  // Must be at least 3 characters
  // Must not start or end with hyphen
  if (slug.length < 3) return false
  if (slug.startsWith('-') || slug.endsWith('-')) return false
  return /^[a-z0-9\-\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]+$/.test(slug)
}
