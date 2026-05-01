// One-off: upload 3 PARTIAL Before/After pairs (colorize / outfit-swap / bystanders)
// to Vercel Blob and link via DB. Also append a Gemini-limitation note to
// background-removal-transparent-png's description (no sample for that one).
import * as fs from "node:fs";
import * as path from "node:path";
import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "seo/style-test-samples/source");
const OUT_DIR = path.join(ROOT, "seo/style-test-samples/output");

const PAIRS: Array<{ slug: string; before: string; after: string }> = [
  { slug: "colorize-vintage-photo-1950s",            before: "vintage-bw.jpg",                after: "colorize-vintage-photo-1950s.png" },
  { slug: "outfit-swap-business-suit",               before: "portrait-casual-outfit.jpg",    after: "outfit-swap-business-suit.png" },
  { slug: "remove-bystanders-temple-background",     before: "group-photo.jpg",               after: "remove-bystanders-temple-background.png" },
];

const BG_REMOVAL_NOTE =
  "※ Gemini 2.5 Flash Image はアルファ出力に未対応のため、透過 PNG の生成は別ツール（Photoroom / remove.bg / rembg）の利用を推奨します。";

(async () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("Missing BLOB_READ_WRITE_TOKEN");
    process.exit(2);
  }
  const prisma = new PrismaClient();

  for (const pair of PAIRS) {
    const beforeBuf = fs.readFileSync(path.join(SRC_DIR, pair.before));
    const afterBuf = fs.readFileSync(path.join(OUT_DIR, pair.after));
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
    console.log(`[ok]  ${pair.slug}`);
    console.log(`      before: ${beforeBlob.url}`);
    console.log(`      after:  ${afterBlob.url}`);
  }

  // bg-removal: append Gemini limitation note to description (idempotent)
  const bg = await prisma.prompt.findUnique({ where: { slug: "background-removal-transparent-png" } });
  if (bg) {
    const desc = bg.description ?? "";
    if (!desc.includes("アルファ出力に未対応")) {
      const newDesc = desc.endsWith("。") || desc.endsWith(".") ? desc + " " + BG_REMOVAL_NOTE : desc + " " + BG_REMOVAL_NOTE;
      await prisma.prompt.update({
        where: { slug: "background-removal-transparent-png" },
        data: { description: newDesc },
      });
      console.log("[ok]  background-removal-transparent-png — description note appended");
    } else {
      console.log("[skip] background-removal-transparent-png — note already present");
    }
  }

  await prisma.$disconnect();
  console.log("\n[done]");
})();
