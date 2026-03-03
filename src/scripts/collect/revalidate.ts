import { log, fetchWithRetry } from './utils'
import { REVALIDATION_PATHS } from './config'

async function main() {
  const baseUrl = process.argv[2] || 'http://localhost:3000'
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    log('Error: REVALIDATE_SECRET is not set')
    process.exit(1)
  }

  const url = `${baseUrl}/api/revalidate`
  const paths = [...REVALIDATION_PATHS]

  log(`Revalidating ${paths.length} paths at ${url}...`)

  const response = await fetchWithRetry(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-revalidate-secret': secret,
    },
    body: JSON.stringify({ paths }),
  })

  if (!response.ok) {
    const text = await response.text()
    log(`Revalidation failed: ${response.status} ${text}`)
    process.exit(1)
  }

  const result = await response.json()
  log('Revalidation result:', JSON.stringify(result, null, 2))
}

main().catch(error => {
  log('Fatal error:', error)
  process.exit(1)
})
