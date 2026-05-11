// @ts-nocheck
// One-off: upload Before/After pairs for the 5 theme-b photo-edit prompts
// (interior / exterior / hair color simulation, 2026-05-11) to Vercel Blob
// and link via DB.Prompt.sampleBeforeUrl / sampleAfterUrl.
//
// Run:
//   npx tsx src/scripts/style-test-live/_upload-theme-b-samples.ts
//
// Idempotent re-runs create new blob suffixes (addRandomSuffix). Only re-run
// for slugs that failed mid-way.

import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "seo/style-test-samples/source");
const OUT_DIR = path.join(ROOT, "seo/style-test-samples/output");

const PAIRS: Array<{ slug: string; before: string; after: string }> = [
  {
    slug: "wallpaper-pattern-try-on",
    before: "room-interior-livingroom.jpg",
    after: "wallpaper-pattern-try-on.png",
  },
  {
    slug: "wall-color-change-living-room",
    before: "room-interior-livingroom.jpg",
    after: "wall-color-change-living-room.png",
  },
  {
    slug: "interior-color-coordination-palette",
    before: "room-interior-livingroom.jpg",
    after: "interior-color-coordination-palette.png",
  },
  {
    slug: "house-exterior-paint-color-simulate",
    before: "house-exterior-suburb.jpg",
    after: "house-exterior-paint-color-simulate.png",
  },
  {
    slug: "hair-color-natural-simulation",
    before: "portrait-long-hair.jpg",
    after: "hair-color-natural-simulation.png",
  },
];

(async () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("Missing BLOB_READ_WRITE_TOKEN");
    process.exit(2);
  }
  const prisma = new PrismaClient();

  let okCount = 0;
  const failed: Array<{ slug: string; reason: string }> = [];

  for (const pair of PAIRS) {
    try {
      const beforePath = path.join(SRC_DIR, pair.before);
      const afterPath = path.join(OUT_DIR, pair.after);
      if (!fs.existsSync(beforePath)) throw new Error(`Before missing on disk: ${pair.before}`);
      if (!fs.existsSync(afterPath)) throw new Error(`After missing on disk: ${pair.after}`);

      const dbRow = await prisma.prompt.findUnique({
        where: { slug: pair.slug },
        select: { id: true },
      });
      if (!dbRow) throw new Error(`DB row missing for slug: ${pair.slug}`);

      const beforeBuf = fs.readFileSync(beforePath);
      const afterBuf = fs.readFileSync(afterPath);

      const beforeBlob = await put(
        `samples/${pair.slug}-before${path.extname(pair.before)}`,
        beforeBuf,
        {
          access: "public",
          contentType: pair.before.endsWith(".png") ? "image/png" : "image/jpeg",
          token,
          addRandomSuffix: true,
        },
      );
      const afterBlob = await put(
        `samples/${pair.slug}-after${path.extname(pair.after)}`,
        afterBuf,
        {
          access: "public",
          contentType: pair.after.endsWith(".png") ? "image/png" : "image/jpeg",
          token,
          addRandomSuffix: true,
        },
      );
      await prisma.prompt.update({
        where: { slug: pair.slug },
        data: { sampleBeforeUrl: beforeBlob.url, sampleAfterUrl: afterBlob.url },
      });
      okCount++;
      console.log(`[ok]  ${pair.slug}`);
      console.log(`      before: ${beforeBlob.url}`);
      console.log(`      after:  ${afterBlob.url}`);
    } catch (e: any) {
      failed.push({ slug: pair.slug, reason: e?.message ?? String(e) });
      console.log(`[fail] ${pair.slug} — ${e?.message ?? e}`);
    }
  }

  await prisma.$disconnect();
  console.log(`\n[done] ${okCount}/${PAIRS.length} uploaded, ${failed.length} failed`);
  if (failed.length > 0) {
    console.log("Failed slugs:");
    for (const f of failed) console.log(`  - ${f.slug}: ${f.reason}`);
  }
})();
