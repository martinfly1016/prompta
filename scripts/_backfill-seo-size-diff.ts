// @ts-nocheck
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

// Reuse the production processTag flow from _tag_seo_backfill.ts
import { processTag } from '../src/scripts/data-analys/_tag_seo_backfill'

const p = new PrismaClient()
;(async () => {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) { console.error('Missing GOOGLE_AI_API_KEY'); process.exit(1) }
  const r = await processTag(p, 'サイズ差', apiKey)
  console.log(r)
  await p.$disconnect()
})()
