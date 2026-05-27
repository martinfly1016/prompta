// @ts-nocheck
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const PASS = [
  'bodytype-diff-bear-hug-large-male-tiny-female',
  'bodytype-diff-athlete-gym-training-couple',
]
const p = new PrismaClient()
;(async () => {
  for (const slug of PASS) {
    const r = await p.prompt.update({ where: { slug }, data: { isPublished: true } })
    console.log(`republished: ${r.slug}`)
  }
  await p.$disconnect()
})()
