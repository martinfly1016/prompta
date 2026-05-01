// One-off: regenerate the skin-retouching Before/After with a phone-camera-style
// source that has visible skin imperfections (oily skin, redness, acne, larger
// pores), so the retouching effect is actually visible.
//
// Steps:
// 1. Generate seo/style-test-samples/source/phone-skin-issues.jpg (T2I)
// 2. Re-render seo/style-test-samples/output/natural-skin-retouching-gentle.png (I2I via render.ts)
// 3. Upload Before/After to Vercel Blob
// 4. Update DB sampleBeforeUrl / sampleAfterUrl

import * as fs from "node:fs";
import * as path from "node:path";
import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import { renderEdit } from "./render";

const ROOT = process.cwd();
const SOURCE_PATH = path.join(ROOT, "seo/style-test-samples/source/phone-skin-issues.jpg");
const OUTPUT_PATH = path.join(ROOT, "seo/style-test-samples/output/natural-skin-retouching-gentle.png");
const SLUG = "natural-skin-retouching-gentle";

const SOURCE_PROMPT =
  "A photorealistic close-up phone-camera selfie of a Japanese woman in her late 50s taken in indoor warm tungsten light, showing pronounced age-related skin changes: visible deep crow's feet around the eyes, nasolabial folds (smile lines from nose to mouth corners), forehead horizontal lines, marionette lines below the mouth, several brown age spots / sun spots on the cheeks and forehead, hyperpigmentation patches, uneven skin tone with mild redness, larger visible pores, slight skin sagging under the eyes and along the jawline, no makeup, gray hairs visible at the temples. Neutral expression, head and shoulders only. Slight ISO grain typical of a smartphone front camera. Background is a plain off-white wall. The image must look like a candid phone selfie of a real 50-something woman, not a studio shot.";

async function generateSource(apiKey: string): Promise<Buffer> {
  const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";
  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: SOURCE_PROMPT }] }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });
  if (!res.ok) throw new Error(`T2I ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json: any = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find((p: any) => p?.inline_data?.data || p?.inlineData?.data);
  const b64 = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data;
  if (!b64) throw new Error("No image in T2I response");
  return Buffer.from(b64, "base64");
}

(async () => {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!apiKey || !blobToken) {
    console.error("Missing GOOGLE_AI_API_KEY or BLOB_READ_WRITE_TOKEN");
    process.exit(2);
  }

  // Backup existing
  if (fs.existsSync(SOURCE_PATH)) {
    const bak = SOURCE_PATH.replace(".jpg", `_v1_${Date.now()}.jpg`);
    fs.copyFileSync(SOURCE_PATH, bak);
    console.log(`[bak] ${path.basename(bak)}`);
  }
  if (fs.existsSync(OUTPUT_PATH)) {
    const bak = OUTPUT_PATH.replace(".png", `_v3_${Date.now()}.png`);
    fs.copyFileSync(OUTPUT_PATH, bak);
    console.log(`[bak] ${path.basename(bak)}`);
  }

  // 1. Generate source
  console.log("[gen-src] phone-skin-issues.jpg");
  const srcBuf = await generateSource(apiKey);
  fs.writeFileSync(SOURCE_PATH, srcBuf);
  console.log(`[ok] source written, ${srcBuf.length} bytes`);

  // 2. Re-render with the prompt content from DB
  const prisma = new PrismaClient();
  const dbPrompt = await prisma.prompt.findUnique({ where: { slug: SLUG } });
  if (!dbPrompt) throw new Error(`Prompt not found: ${SLUG}`);

  console.log("[render] natural-skin-retouching-gentle ← phone-skin-issues.jpg");
  const r = await renderEdit({ source: SOURCE_PATH, prompt: dbPrompt.content, out: OUTPUT_PATH }, apiKey);
  console.log(`[ok] After written, ${r.bytes} bytes`);

  // 3. Upload Before + After
  const beforeBuf = fs.readFileSync(SOURCE_PATH);
  const afterBuf = fs.readFileSync(OUTPUT_PATH);
  const beforeBlob = await put(`samples/${SLUG}-before-v2.jpg`, beforeBuf, {
    access: "public",
    contentType: "image/jpeg",
    token: blobToken,
    addRandomSuffix: true,
  });
  const afterBlob = await put(`samples/${SLUG}-after-v2.png`, afterBuf, {
    access: "public",
    contentType: "image/png",
    token: blobToken,
    addRandomSuffix: true,
  });
  console.log(`[blob] before: ${beforeBlob.url}`);
  console.log(`[blob] after:  ${afterBlob.url}`);

  // 4. Update DB
  await prisma.prompt.update({
    where: { slug: SLUG },
    data: { sampleBeforeUrl: beforeBlob.url, sampleAfterUrl: afterBlob.url },
  });
  await prisma.$disconnect();
  console.log("[done] DB updated.");
})();
