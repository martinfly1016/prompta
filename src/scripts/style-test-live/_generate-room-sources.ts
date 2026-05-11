// @ts-nocheck
// One-off: text-to-image generation of 2 room/exterior source photos for
// the Theme B (wall/room color) prompts shipped 2026-05-11.
// Writes JPEGs to seo/style-test-samples/source/.
import * as fs from "node:fs";
import * as path from "node:path";

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const ROOT = process.cwd();
const OUT_DIR = path.resolve(ROOT, "seo/style-test-samples/source");

const TARGETS: Array<{ file: string; prompt: string }> = [
  {
    file: "room-interior-livingroom.jpg",
    prompt:
      "A photorealistic interior photo of a clean, modern Japanese living room with off-white plain matte walls, a light oak wood floor, a simple gray three-seater fabric sofa, a small wooden coffee table, a single framed art print on the wall, a tall floor lamp, soft natural daylight from a window on the left, neutral color palette. The walls should be a single uniform off-white color clearly visible. Shot from a standard eye-level perspective, sharp focus, photorealistic, no people.",
  },
  {
    file: "house-exterior-suburb.jpg",
    prompt:
      "A photorealistic exterior photo of a typical Japanese suburban two-story detached house, plain cream-beige stucco walls (single uniform color, clearly visible), gray tiled roof, a simple front entrance with double-pane windows on both floors, a small front garden with low hedges and one small tree, a paved driveway, blue daytime sky with light clouds, soft mid-day natural light, taken from the street at a slight three-quarter angle so two wall surfaces are visible. No people, no cars in foreground. Sharp focus, residential photography style.",
  },
];

async function generate(prompt: string, apiKey: string): Promise<Buffer> {
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };
  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API ${res.status}: ${txt.slice(0, 400)}`);
  }
  const json: any = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find((p: any) => p?.inline_data?.data || p?.inlineData?.data);
  const b64: string | undefined = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data;
  if (!b64) {
    const textPart = parts.find((p: any) => p?.text)?.text ?? "";
    throw new Error(`No image returned. Text: ${textPart.slice(0, 200)}`);
  }
  return Buffer.from(b64, "base64");
}

(async () => {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY)");
    process.exit(2);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const t of TARGETS) {
    const outPath = path.join(OUT_DIR, t.file);
    if (fs.existsSync(outPath)) {
      console.log(`[skip] ${t.file} already exists`);
      continue;
    }
    try {
      console.log(`[gen]  ${t.file} ...`);
      const buf = await generate(t.prompt, apiKey);
      fs.writeFileSync(outPath, buf);
      console.log(`[ok]   ${t.file} (${buf.length} bytes)`);
    } catch (e) {
      console.error(`[fail] ${t.file}: ${(e as Error).message}`);
    }
  }
})();
