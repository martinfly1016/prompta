// @ts-nocheck
// One-off: render Before/After for 5 newly-added photo-edit prompts
// (theme B — interior / exterior / hair color simulation, 2026-05-11).
//
// Pulls content from DB, fills in the `[SPECIFY ...]` / `[DESCRIBE ...]`
// placeholders with the resolved values listed below, then calls Gemini
// 2.5 Flash Image to produce an edited PNG per slug.
//
// Run:
//   npx tsx src/scripts/style-test-live/_render-theme-b.ts
//
// Output: seo/style-test-samples/output/{slug}.png
// Does NOT modify DB content (placeholders remain in DB so users can fill them).

import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { PrismaClient } from "@prisma/client";

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const ROOT = path.resolve(__dirname, "../../..");
const SOURCE_DIR = `${ROOT}/seo/style-test-samples/source`;
const OUT_DIR = `${ROOT}/seo/style-test-samples/output`;

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY / GEMINI_API_KEY");
  process.exit(2);
}

type Job = { slug: string; source: string; resolved: string; roofPart?: string };

const JOBS: Job[] = [
  {
    slug: "wallpaper-pattern-try-on",
    source: `${SOURCE_DIR}/room-interior-livingroom.jpg`,
    resolved: "Scandinavian botanical print in pale sage green",
  },
  {
    slug: "wall-color-change-living-room",
    source: `${SOURCE_DIR}/room-interior-livingroom.jpg`,
    resolved: "warm sage green (#A8B89A)",
  },
  {
    slug: "interior-color-coordination-palette",
    source: `${SOURCE_DIR}/room-interior-livingroom.jpg`,
    resolved:
      "warm Autumn earth tones (camel #C19A6B, terracotta #C97757, deep olive #6E7C3B, cream #F1E8D0)",
  },
  {
    slug: "house-exterior-paint-color-simulate",
    source: `${SOURCE_DIR}/house-exterior-suburb.jpg`,
    resolved: "warm beige (#C9B79C)",
    roofPart: "leave as-is",
  },
  {
    slug: "hair-color-natural-simulation",
    source: `${SOURCE_DIR}/portrait-long-hair.jpg`,
    resolved: "cool ash brown (#5C4A3F)",
  },
];

function mimeFromExt(p: string): string {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  throw new Error(`Unsupported extension: ${ext}`);
}

// Replace [SPECIFY ...] / [DESCRIBE ...] placeholders with the resolved value.
// For house-exterior we also have a second placeholder for roof — handled
// by collapsing the *second* bracketed placeholder if `roofPart` is provided.
function resolveContent(content: string, resolved: string, roofPart?: string): string {
  let i = 0;
  return content.replace(/\[(SPECIFY|DESCRIBE)[^\]]*\]/g, () => {
    i++;
    if (i === 1) return resolved;
    if (i === 2 && roofPart) return roofPart;
    return resolved;
  });
}

async function callGemini(prompt: string, sourcePath: string): Promise<Buffer> {
  const buf = fs.readFileSync(sourcePath);
  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          { inline_data: { mime_type: mimeFromExt(sourcePath), data: buf.toString("base64") } },
        ],
      },
    ],
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
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find((p: any) => p?.inline_data?.data || p?.inlineData?.data);
  const b64 = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data;
  if (!b64) {
    const t = parts.find((p: any) => p?.text)?.text ?? "";
    throw new Error(`No image returned. Text: ${t.slice(0, 300)}`);
  }
  return Buffer.from(b64, "base64");
}

async function main() {
  const prisma = new PrismaClient();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const results: Array<{ slug: string; ok: boolean; bytes?: number; reason?: string }> = [];

  for (const job of JOBS) {
    const outPath = `${OUT_DIR}/${job.slug}.png`;
    try {
      if (!fs.existsSync(job.source)) throw new Error(`Source missing: ${job.source}`);
      const row = await prisma.prompt.findUnique({
        where: { slug: job.slug },
        select: { content: true },
      });
      if (!row) throw new Error(`DB row missing for slug ${job.slug}`);
      const resolved = resolveContent(row.content, job.resolved, job.roofPart);
      // Quick sanity: ensure no remaining placeholder
      if (/\[(SPECIFY|DESCRIBE)/.test(resolved)) {
        console.warn(`[warn] ${job.slug} still has placeholder after resolve`);
      }
      console.log(`[render] ${job.slug}`);
      console.log(`         source: ${path.basename(job.source)}`);
      console.log(`         value : ${job.resolved}`);
      const buf = await callGemini(resolved, job.source);
      fs.writeFileSync(outPath, buf);
      console.log(`         out   : ${path.basename(outPath)} (${buf.length} bytes)`);
      results.push({ slug: job.slug, ok: true, bytes: buf.length });
    } catch (e: any) {
      console.log(`[fail]   ${job.slug}: ${e?.message ?? e}`);
      results.push({ slug: job.slug, ok: false, reason: e?.message ?? String(e) });
    }
  }

  await prisma.$disconnect();

  console.log(`\n[done] ${results.filter((r) => r.ok).length}/${results.length} rendered`);
  for (const r of results) {
    if (!r.ok) console.log(`  - FAIL ${r.slug}: ${r.reason}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
