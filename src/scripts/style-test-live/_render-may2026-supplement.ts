// @ts-nocheck
// One-shot: render the 4 photo-edit prompts skipped/failed in the May 2026 batch.
// 1. era-transform-1970s-classic — re-render with patched gender-locked prompt (single input)
// 2. outfit-swap-reference-image — 2-image render: person + outfit reference (gen text-to-image)
// 3. virtual-makeup-reference-look — 2-image render: person + makeup reference (gen text-to-image)
// 4. outpaint-restore-transparent — single PNG with transparent strip prepared via sharp

import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";
import { PrismaClient } from "@prisma/client";

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const ROOT = path.resolve(__dirname, "../../..");
const SOURCE_DIR = `${ROOT}/seo/style-test-samples/source`;
const OUT_DIR = `${ROOT}/seo/style-test-samples/output/photo-edit-may-2026`;

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY");
  process.exit(2);
}

function mimeFromExt(p: string): string {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  throw new Error(`Unsupported extension: ${ext}`);
}

async function callGemini(parts: any[]): Promise<Buffer> {
  const body = {
    contents: [{ parts }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };
  const res = await fetch(`${ENDPOINT}?key=${KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini ${res.status}: ${txt.slice(0, 500)}`);
  }
  const json: any = await res.json();
  const rparts = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = rparts.find((p: any) => p?.inline_data?.data || p?.inlineData?.data);
  const b64 = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data;
  if (!b64) {
    const t = rparts.find((p: any) => p?.text)?.text ?? "";
    throw new Error(`No image. Text: ${t.slice(0, 300)}`);
  }
  return Buffer.from(b64, "base64");
}

async function genTextToImage(prompt: string, outPath: string) {
  console.log(`[t2i] ${path.basename(outPath)}`);
  const buf = await callGemini([{ text: prompt }]);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  console.log(`  → ${buf.length} bytes`);
}

async function renderEdit(promptText: string, inputs: string[], outPath: string) {
  console.log(`[edit] ${path.basename(outPath)} ← ${inputs.length} input(s)`);
  const parts: any[] = [{ text: promptText }];
  for (const p of inputs) {
    const b = fs.readFileSync(p);
    parts.push({ inline_data: { mime_type: mimeFromExt(p), data: b.toString("base64") } });
  }
  const buf = await callGemini(parts);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  console.log(`  → ${buf.length} bytes`);
}

async function makeTransparentStripInput(inSource: string, outPath: string) {
  // Convert portrait-default.jpg to PNG with right 1/3 turned transparent (alpha 0).
  console.log(`[transparent] ${path.basename(outPath)}`);
  const meta = await sharp(inSource).metadata();
  const W = meta.width!;
  const H = meta.height!;
  const stripWidth = Math.floor(W / 3);
  // Build alpha mask: opaque left 2/3, transparent right 1/3.
  const mask = Buffer.alloc(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      mask[y * W + x] = x < W - stripWidth ? 255 : 0;
    }
  }
  await sharp(inSource)
    .ensureAlpha()
    .joinChannel(mask, { raw: { width: W, height: H, channels: 1 } })
    .png()
    .toFile(outPath);
  console.log(`  → ${W}×${H} with right ${stripWidth}px transparent`);
}

async function main() {
  const prisma = new PrismaClient();

  // ===== 1. era-transform-1970s-classic — re-render with patched content =====
  const eraPrompt = (
    await prisma.prompt.findUnique({
      where: { slug: "era-transform-1970s-classic" },
      select: { content: true },
    })
  )!.content;
  await renderEdit(
    eraPrompt,
    [`${SOURCE_DIR}/portrait-default.jpg`],
    `${OUT_DIR}/era-transform-1970s-classic.png`,
  );

  // ===== 2a. Generate outfit reference =====
  const refOutfitPath = `${SOURCE_DIR}/ref-outfit-business-suit.jpg`;
  if (!fs.existsSync(refOutfitPath)) {
    await genTextToImage(
      "A photorealistic flat-lay product photo of a women's tailored navy-blue business suit (blazer + matching trousers) and a white silk blouse, neatly arranged on a plain off-white background, soft even daylight, sharp focus on the fabric texture, no person visible. Studio catalog style, 4:5 aspect ratio.",
      refOutfitPath,
    );
    // gemini outputs png by default; rename if extension mismatches by sniffing
    const ext = sniffImageExt(fs.readFileSync(refOutfitPath));
    if (ext !== "jpg") {
      const newPath = `${SOURCE_DIR}/ref-outfit-business-suit.${ext}`;
      fs.renameSync(refOutfitPath, newPath);
      console.log(`  renamed to ${path.basename(newPath)}`);
    }
  }
  const refOutfitFinal = pickExisting(`${SOURCE_DIR}/ref-outfit-business-suit`, ["jpg", "png", "webp"])!;

  // ===== 2b. outfit-swap-reference-image =====
  const outfitPrompt = (
    await prisma.prompt.findUnique({
      where: { slug: "outfit-swap-reference-image" },
      select: { content: true },
    })
  )!.content;
  await renderEdit(
    outfitPrompt,
    [`${SOURCE_DIR}/portrait-casual-outfit.jpg`, refOutfitFinal],
    `${OUT_DIR}/outfit-swap-reference-image.png`,
  );

  // ===== 3a. Generate makeup reference =====
  const refMakeupPath = `${SOURCE_DIR}/ref-makeup-bold-evening.jpg`;
  if (!fs.existsSync(refMakeupPath) && !fs.existsSync(refMakeupPath.replace(".jpg", ".png"))) {
    await genTextToImage(
      "A photorealistic close-up beauty portrait photo of a Japanese woman wearing bold evening makeup: deep berry-red matte lipstick, smoky charcoal eyeshadow with subtle gold shimmer in the inner corner, sharp winged black eyeliner, defined eyebrows, peach blush on the apples of the cheeks, contoured cheekbones. Plain dark gray studio backdrop, soft beauty-dish lighting, sharp focus on the eyes and lips. Reference catalog style, 4:5 aspect ratio.",
      refMakeupPath,
    );
    const ext = sniffImageExt(fs.readFileSync(refMakeupPath));
    if (ext !== "jpg") {
      const newPath = `${SOURCE_DIR}/ref-makeup-bold-evening.${ext}`;
      fs.renameSync(refMakeupPath, newPath);
    }
  }
  const refMakeupFinal = pickExisting(`${SOURCE_DIR}/ref-makeup-bold-evening`, ["jpg", "png", "webp"])!;

  // ===== 3b. virtual-makeup-reference-look =====
  const makeupPrompt = (
    await prisma.prompt.findUnique({
      where: { slug: "virtual-makeup-reference-look" },
      select: { content: true },
    })
  )!.content;
  await renderEdit(
    makeupPrompt,
    [`${SOURCE_DIR}/portrait-neutral-face.jpg`, refMakeupFinal],
    `${OUT_DIR}/virtual-makeup-reference-look.png`,
  );

  // ===== 4a. Make transparent-strip input =====
  const transInput = `${SOURCE_DIR}/portrait-default-with-transparent-strip.png`;
  if (!fs.existsSync(transInput)) {
    await makeTransparentStripInput(`${SOURCE_DIR}/portrait-default.jpg`, transInput);
  }

  // ===== 4b. outpaint-restore-transparent =====
  const outpaintPrompt = (
    await prisma.prompt.findUnique({
      where: { slug: "outpaint-restore-transparent" },
      select: { content: true },
    })
  )!.content;
  await renderEdit(outpaintPrompt, [transInput], `${OUT_DIR}/outpaint-restore-transparent.png`);

  await prisma.$disconnect();
  console.log("All 4 supplements rendered");
}

function sniffImageExt(buf: Buffer): "jpg" | "png" | "webp" {
  if (buf[0] === 0xff && buf[1] === 0xd8) return "jpg";
  if (buf[0] === 0x89 && buf[1] === 0x50) return "png";
  if (buf.toString("ascii", 0, 4) === "RIFF") return "webp";
  return "png";
}

function pickExisting(base: string, exts: string[]): string | undefined {
  for (const e of exts) {
    const p = `${base}.${e}`;
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
