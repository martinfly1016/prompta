#!/usr/bin/env tsx
// Validates every registered ParamConfig against live DB content:
//   - The slug exists & isPublished
//   - Each param.match string occurs at least once in prompt.content
//   - Warns if it occurs more than once (ambiguous substitution)
import { PrismaClient } from '@prisma/client'
import { ALL_CONFIGS } from '../../src/lib/prompt-params/configs.generated'

const db = new PrismaClient()

async function main() {
  const slugs = Object.keys(ALL_CONFIGS)
  let problems = 0
  let warnings = 0

  for (const slug of slugs) {
    const cfg = ALL_CONFIGS[slug]
    const prompt = await db.prompt.findFirst({
      where: { slug, isPublished: true },
      select: { content: true },
    })
    if (!prompt) {
      console.log(`✗ ${slug}: NOT FOUND or unpublished`)
      problems++
      continue
    }

    const issues: string[] = []
    for (const p of cfg.params) {
      const occurrences = prompt.content.split(p.match).length - 1
      if (occurrences === 0) {
        issues.push(`  ✗ "${p.id}" match="${p.match}" not found`)
        problems++
      } else if (occurrences > 1) {
        issues.push(`  ! "${p.id}" match="${p.match}" appears ${occurrences} times`)
        warnings++
      }
    }
    if (issues.length === 0) console.log(`✓ ${slug} (${cfg.params.length} params)`)
    else {
      console.log(`✗ ${slug}`)
      issues.forEach(i => console.log(i))
    }
  }

  console.log(`\n${slugs.length} configs / ${problems} problems / ${warnings} warnings`)
  await db.$disconnect()
  process.exit(problems === 0 ? 0 : 1)
}

main()
