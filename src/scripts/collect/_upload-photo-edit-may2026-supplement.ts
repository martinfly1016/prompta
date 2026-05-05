// @ts-nocheck
// Upload Before/After for the 4 supplemental photo-edit prompts (May 2026 batch part 2).
// Inputs:
//   - era-transform-1970s-classic: Before = portrait-default.jpg
//   - outfit-swap-reference-image: Before = portrait-casual-outfit.jpg + ref-outfit-business-suit.png
//   - virtual-makeup-reference-look: Before = portrait-neutral-face.jpg + ref-makeup-bold-evening.png
//   - outpaint-restore-transparent: Before = portrait-default-with-transparent-strip.png

import { readFile } from "fs/promises";
import { resolve, basename } from "path";
import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";

const ROOT = resolve(__dirname, "../../..");
const RENDER_DIR = `${ROOT}/seo/style-test-samples/output/photo-edit-may-2026`;
const SOURCE_DIR = `${ROOT}/seo/style-test-samples/source`;

// slug → Before source path. For 2-input prompts, before is the PERSON image (not the reference).
const MAP: Record<string, { before: string; after: string }> = {
  "era-transform-1970s-classic": {
    before: `${SOURCE_DIR}/portrait-default.jpg`,
    after: `${RENDER_DIR}/era-transform-1970s-classic.png`,
  },
  "outfit-swap-reference-image": {
    before: `${SOURCE_DIR}/portrait-casual-outfit.jpg`,
    after: `${RENDER_DIR}/outfit-swap-reference-image.png`,
  },
  "virtual-makeup-reference-look": {
    before: `${SOURCE_DIR}/portrait-neutral-face.jpg`,
    after: `${RENDER_DIR}/virtual-makeup-reference-look.png`,
  },
  "outpaint-restore-transparent": {
    before: `${SOURCE_DIR}/portrait-default-with-transparent-strip.png`,
    after: `${RENDER_DIR}/outpaint-restore-transparent.png`,
  },
};

const prisma = new PrismaClient();

async function uploadFile(localPath: string, blobKey: string, mimeType: string) {
  const buf = await readFile(localPath);
  const blob = await put(blobKey, buf, {
    access: "public",
    contentType: mimeType,
    addRandomSuffix: true,
  });
  return { url: blob.url, blobKey: blob.pathname, fileSize: buf.length };
}

function mimeOf(p: string): string {
  if (p.endsWith(".png")) return "image/png";
  if (p.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

async function main() {
  for (const [slug, paths] of Object.entries(MAP)) {
    const prompt = await prisma.prompt.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!prompt) {
      console.error(`[${slug}] prompt not found`);
      continue;
    }

    const existing = await prisma.promptImage.count({ where: { promptId: prompt.id } });
    if (existing > 0) {
      console.log(`[${slug}] already has ${existing} images, skipping`);
      continue;
    }

    console.log(`[${slug}] uploading...`);

    const beforeUp = await uploadFile(
      paths.before,
      `prompts/${slug}-before.${paths.before.endsWith(".png") ? "png" : "jpg"}`,
      mimeOf(paths.before),
    );
    const afterUp = await uploadFile(paths.after, `prompts/${slug}-after.png`, "image/png");

    const original = await prisma.promptImage.create({
      data: {
        promptId: prompt.id,
        url: beforeUp.url,
        blobKey: beforeUp.blobKey,
        fileName: basename(paths.before),
        fileSize: beforeUp.fileSize,
        mimeType: mimeOf(paths.before),
        imageType: "original",
        order: 0,
        altText: `Before: ${slug} 編集前の元写真`,
      },
    });

    await prisma.promptImage.create({
      data: {
        promptId: prompt.id,
        url: afterUp.url,
        blobKey: afterUp.blobKey,
        fileName: `${slug}-after.png`,
        fileSize: afterUp.fileSize,
        mimeType: "image/png",
        imageType: "effect",
        order: 1,
        altText: `After: ${slug} Gemini 2.5 Flash Image AI 加工結果`,
        parentImageId: original.id,
      },
    });

    console.log(`[${slug}] OK`);
  }

  await prisma.$disconnect();
  console.log("Done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
