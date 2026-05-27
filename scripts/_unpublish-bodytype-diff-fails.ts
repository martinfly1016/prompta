// @ts-nocheck
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const FAILS = [
  'bodytype-diff-athlete-gym-training-couple',
  'bodytype-diff-bear-hug-large-male-tiny-female',
  'bodytype-diff-yuri-tall-curvy-petite-slim',
  'bodytype-diff-reverse-tall-athletic-female-shorter-slim-male',
  'bodytype-diff-bodybuilder-female-slim-male-extreme',
]
const p = new PrismaClient()
;(async () => {
  for (const slug of FAILS) {
    const r = await p.prompt.update({ where: { slug }, data: { isPublished: false } })
    console.log(`unpublished: ${r.slug} (id=${r.id})`)
  }
  await p.$disconnect()
})()
