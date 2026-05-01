// One-off: upload 6 PASS Before/After pairs to Vercel Blob and write URLs to DB.
// Run after `prisma db push` so sampleBeforeUrl / sampleAfterUrl columns exist.
import * as fs from "node:fs";
import * as path from "node:path";
import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "seo/style-test-samples/source");
const OUT_DIR = path.join(ROOT, "seo/style-test-samples/output");

const PAIRS: Array<{ slug: string; before: string; after: string }> = [
  { slug: "background-replace-studio-neutral",   before: "portrait-cluttered-bg.jpg",   after: "background-replace-studio-neutral.png" },
  { slug: "natural-skin-retouching-gentle",      before: "portrait-skin-detail.jpg",    after: "natural-skin-retouching-gentle.png" },
  { slug: "linkedin-professional-headshot",      before: "casual-portrait.jpg",         after: "linkedin-professional-headshot.png" },
  { slug: "hairstyle-change-french-bob",         before: "portrait-long-hair.jpg",      after: "hairstyle-change-french-bob.png" },
  { slug: "expression-neutral-to-subtle-smile",  before: "portrait-neutral-face.jpg",   after: "expression-neutral-to-subtle-smile.png" },
  { slug: "passport-id-photo-icao-compliant",    before: "casual-portrait.jpg",         after: "passport-id-photo-icao-compliant.png" },
];

(async () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("Missing BLOB_READ_WRITE_TOKEN");
    process.exit(2);
  }

  const prisma = new PrismaClient();
  const results: Array<{ slug: string; beforeUrl?: string; afterUrl?: string; error?: string }> = [];

  for (const pair of PAIRS) {
    const beforePath = path.join(SRC_DIR, pair.before);
    const afterPath = path.join(OUT_DIR, pair.after);

    try {
      const beforeBuf = fs.readFileSync(beforePath);
      const afterBuf = fs.readFileSync(afterPath);
      const beforeMime = pair.before.endsWith(".png") ? "image/png" : "image/jpeg";
      const afterMime = pair.after.endsWith(".png") ? "image/png" : "image/jpeg";

      const beforeBlob = await put(`samples/${pair.slug}-before${path.extname(pair.before)}`, beforeBuf, {
        access: "public",
        contentType: beforeMime,
        token,
        addRandomSuffix: true,
      });
      const afterBlob = await put(`samples/${pair.slug}-after${path.extname(pair.after)}`, afterBuf, {
        access: "public",
        contentType: afterMime,
        token,
        addRandomSuffix: true,
      });

      await prisma.prompt.update({
        where: { slug: pair.slug },
        data: { sampleBeforeUrl: beforeBlob.url, sampleAfterUrl: afterBlob.url },
      });

      results.push({ slug: pair.slug, beforeUrl: beforeBlob.url, afterUrl: afterBlob.url });
      console.log(`[ok]  ${pair.slug}`);
      console.log(`      before: ${beforeBlob.url}`);
      console.log(`      after:  ${afterBlob.url}`);
    } catch (e: any) {
      results.push({ slug: pair.slug, error: String(e?.message ?? e) });
      console.log(`[fail] ${pair.slug} — ${e?.message ?? e}`);
    }
  }

  await prisma.$disconnect();
  console.log("\n" + JSON.stringify(results, null, 2));
})();
