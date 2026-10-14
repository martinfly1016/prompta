#!/usr/bin/env node
/**
 * Run a command with non-secret build defaults when env vars are unset.
 *
 * .env.production used to be committed with placeholders so `prisma generate`
 * and `next build` could run without real credentials. That file is no longer
 * tracked. Values already set in the environment (Vercel project settings, CI)
 * are left untouched.
 */
import { spawnSync } from 'node:child_process'

const defaults = {
  DATABASE_URL: 'postgresql://USER:PASSWORD@127.0.0.1:5432/prompta?connect_timeout=2',
  NEXTAUTH_SECRET: 'build-time-placeholder-not-a-secret',
  NEXTAUTH_URL: 'http://localhost:3000',
}

for (const [key, value] of Object.entries(defaults)) {
  if (!process.env[key]) process.env[key] = value
}

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('usage: node scripts/with-build-defaults.mjs <command> [args...]')
  process.exit(1)
}

const result = spawnSync(args[0], args.slice(1), {
  stdio: 'inherit',
  env: process.env,
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

process.exit(result.status ?? 1)
