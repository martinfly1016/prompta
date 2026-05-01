// Single-image edit via Google Gemini 2.5 Flash Image (Nano Banana).
// Usage:
//   npx tsx src/scripts/style-test-live/render.ts \
//     --source=path/to/input.jpg \
//     --prompt="Replace the background ..." \
//     --out=path/to/output.png
//
// Env: GOOGLE_AI_API_KEY (or GEMINI_API_KEY) required.

import * as fs from "node:fs";
import * as path from "node:path";

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type Args = { source: string; prompt: string; out: string };

function parseArgs(): Args {
  const map: Record<string, string> = {};
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) map[m[1]] = m[2];
  }
  if (!map.source || !map.prompt || !map.out) {
    throw new Error("Required: --source=<path> --prompt=<text> --out=<path>");
  }
  return { source: map.source, prompt: map.prompt, out: map.out };
}

function mimeFromExt(p: string): string {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  throw new Error(`Unsupported source extension: ${ext}`);
}

export async function renderEdit(args: Args, apiKey: string): Promise<{ outPath: string; bytes: number }> {
  const buf = fs.readFileSync(args.source);
  const body = {
    contents: [
      {
        parts: [
          { text: args.prompt },
          { inline_data: { mime_type: mimeFromExt(args.source), data: buf.toString("base64") } },
        ],
      },
    ],
    generationConfig: { responseModalities: ["IMAGE"] },
  };

  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini API ${res.status}: ${txt.slice(0, 500)}`);
  }

  const json: any = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find((p: any) => p?.inline_data?.data || p?.inlineData?.data);
  const b64: string | undefined = imgPart?.inline_data?.data ?? imgPart?.inlineData?.data;
  if (!b64) {
    const textPart = parts.find((p: any) => p?.text)?.text ?? "";
    throw new Error(`No image returned. Text: ${textPart.slice(0, 300)}`);
  }
  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  const outBuf = Buffer.from(b64, "base64");
  fs.writeFileSync(args.out, outBuf);
  return { outPath: args.out, bytes: outBuf.length };
}

if (require.main === module) {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) env var.");
    process.exit(2);
  }
  const args = parseArgs();
  renderEdit(args, apiKey)
    .then((r) => {
      console.log(JSON.stringify({ ok: true, ...r }));
    })
    .catch((e) => {
      console.error(JSON.stringify({ ok: false, error: String(e?.message ?? e) }));
      process.exit(1);
    });
}
