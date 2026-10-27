import { test as base, expect } from '@playwright/test'
import { BLOCKED_ANALYTICS_URL } from '../src/lib/ga-config'

// Abort Google tag / collect requests for every spec that imports `test`
// from this file. The app also refuses to inject gtag off production, but
// a leaked script tag must not be able to reach GA4 during E2E.
export const test = base.extend({
  context: async ({ context }, ready) => {
    await context.route(BLOCKED_ANALYTICS_URL, async (route) => {
      await route.abort('blockedbyclient')
    })
    await ready(context)
  },
})

export { expect }
