// @ts-nocheck
// One-off (kept as template for future batches): upload Before/After pairs from
// seo/style-test-samples/{source,output} to Vercel Blob and link via DB.
//
// Run:
//   npx tsx src/scripts/style-test-live/_upload-batch3-samples.ts
//
// Idempotent re-runs will create new blob suffixes — only re-run for slugs that
// failed mid-way; otherwise prefer surgical edits to PAIRS.
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "seo/style-test-samples/source");
const OUT_DIR = path.join(ROOT, "seo/style-test-samples/output");

// 17 successful Before/After pairs from batch3 (2026-05-10).
const PAIRS: Array<{ slug: string; before: string; after: string }> = [
  { slug: "id-photo-chatgpt-japan-license",   before: "portrait-default.jpg",       after: "id-photo-chatgpt-japan-license.png" },
  { slug: "uniform-medical-doctor-white-coat", before: "portrait-default.jpg",      after: "uniform-medical-doctor-white-coat.png" },
  { slug: "remove-mole-natural-keep",          before: "portrait-default.jpg",      after: "remove-mole-natural-keep.png" },
  { slug: "wedding-shiromuku-japanese",        before: "portrait-default.jpg",      after: "wedding-shiromuku-japanese.png" },
  { slug: "seijinshiki-furisode-japan",        before: "portrait-default.jpg",      after: "seijinshiki-furisode-japan.png" },
  { slug: "watercolor-loose-portrait",         before: "portrait-default.jpg",      after: "watercolor-loose-portrait.png" },
  { slug: "anime-style-ghibli-soft",           before: "portrait-default.jpg",      after: "anime-style-ghibli-soft.png" },
  { slug: "weather-rainy-overcast-mood",       before: "portrait-default.jpg",      after: "weather-rainy-overcast-mood.png" },
  { slug: "season-winter-outfit-swap",         before: "portrait-casual-outfit.jpg", after: "season-winter-outfit-swap.png" },
  { slug: "age-progression-elderly-50years",   before: "portrait-default.jpg",      after: "age-progression-elderly-50years.png" },
  { slug: "era-transform-1970s-classic",       before: "portrait-default.jpg",      after: "era-transform-1970s-classic.png" },
  { slug: "id-photo-asia-2-inch-blue",         before: "casual-portrait.jpg",       after: "id-photo-asia-2-inch-blue.png" },
  { slug: "virtual-makeup-reference-look",     before: "portrait-default.jpg",      after: "virtual-makeup-reference-look.png" },
  { slug: "pose-correct-face-forward",         before: "portrait-casual-outfit.jpg", after: "pose-correct-face-forward.png" },
  { slug: "outfit-swap-reference-image",       before: "portrait-casual-outfit.jpg", after: "outfit-swap-reference-image.png" },
  { slug: "hairstyle-grid-9-variations",       before: "portrait-long-hair.jpg",    after: "hairstyle-grid-9-variations.png" },
  { slug: "photo-auto-enhance-vivid",          before: "portrait-default.jpg",      after: "photo-auto-enhance-vivid.png" },
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

      const dbRow = await prisma.prompt.findUnique({ where: { slug: pair.slug }, select: { id: true } });
      if (!dbRow) throw new Error(`DB row missing for slug: ${pair.slug}`);

      const beforeBuf = fs.readFileSync(beforePath);
      const afterBuf = fs.readFileSync(afterPath);

      const beforeBlob = await put(`samples/${pair.slug}-before${path.extname(pair.before)}`, beforeBuf, {
        access: "public",
        contentType: pair.before.endsWith(".png") ? "image/png" : "image/jpeg",
        token,
        addRandomSuffix: true,
      });
      const afterBlob = await put(`samples/${pair.slug}-after${path.extname(pair.after)}`, afterBuf, {
        access: "public",
        contentType: pair.after.endsWith(".png") ? "image/png" : "image/jpeg",
        token,
        addRandomSuffix: true,
      });
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
