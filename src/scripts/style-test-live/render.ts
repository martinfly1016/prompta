// Single-image edit via the shared Gemini image provider (Nano Banana 2.1).
// Usage:
//   npx tsx src/scripts/style-test-live/render.ts \
//     --source=path/to/input.jpg \
//     --prompt="Replace the background ..." \
//     --out=path/to/output.png
//
// Env: GOOGLE_AI_API_KEY (or GEMINI_API_KEY) required.
// Model: GEMINI_PAID_IMAGE_MODEL || GEMINI_IMAGE_MODEL || gemini-nano-banana-2.1

import * as fs from "node:fs";
import * as path from "node:path";
import { generateGeminiImage } from "../../lib/image-providers/gemini-image";

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
  if (!apiKey) throw new Error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) env var.");
  const buf = fs.readFileSync(args.source);
  const out = await generateGeminiImage({
    prompt: args.prompt,
    sourceImage: { base64: buf.toString("base64"), mimeType: mimeFromExt(args.source) },
  });
  const b64 = out.image?.base64;
  if (!b64) throw new Error("No image returned.");
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
