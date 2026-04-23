/**
 * Shared config for data-analys scripts.
 *
 * Required env vars (in .env):
 *   GOOGLE_SERVICE_ACCOUNT_JSON — path to JSON key file OR inline JSON string
 *   GA4_PROPERTY_ID             — GA4 property ID (numeric, e.g. "123456789")
 *   GSC_SITE_URL                — defaults to "https://www.prompta.jp"
 *   SEMRUSH_API_KEY             — SEMrush API key
 */

import * as fs from 'node:fs'

export const SITE_URL = process.env.GSC_SITE_URL || 'https://www.prompta.jp'
export const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || ''
export const SEMRUSH_API_KEY = process.env.SEMRUSH_API_KEY || ''

/**
 * Load Google Service Account credentials.
 * Supports both file path and inline JSON string.
 */
export function loadGoogleCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_JSON not set. Provide a path to the JSON key file or inline JSON in .env',
    )
  }
  try {
    // Try as inline JSON first
    return JSON.parse(raw)
  } catch {
    // Fall back to file path
    if (!fs.existsSync(raw)) {
      throw new Error(`GOOGLE_SERVICE_ACCOUNT_JSON file not found: ${raw}`)
    }
    return JSON.parse(fs.readFileSync(raw, 'utf8'))
  }
}

/**
 * Parse CLI args into a simple key-value map.
 * Supports --key=value and --flag (boolean true).
 */
export function parseArgs(argv: string[] = process.argv.slice(2)): Record<string, string> {
  const args: Record<string, string> = {}
  for (const arg of argv) {
    const m = arg.match(/^--(\w[\w-]*)(?:=(.*))?$/)
    if (m) args[m[1]] = m[2] ?? 'true'
  }
  return args
}

/**
 * Preflight check: ensure required env vars exist.
 */
export function checkEnv(required: string[]) {
  const missing = required.filter(k => !process.env[k])
  if (missing.length > 0) {
    console.error(`[data-analys] Missing env vars: ${missing.join(', ')}`)
    console.error('Configure them in .env before running data-analys scripts.')
    process.exit(1)
  }
}
