// One-off: text-to-image generation of 9 test source photos for style-test-live.
// Calls Gemini 2.5 Flash Image with text-only prompt → writes JPEGs to
// seo/style-test-samples/source/. Files are gitignored.
import * as fs from "node:fs";
import * as path from "node:path";

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const ROOT = process.cwd();
const OUT_DIR = path.resolve(ROOT, "seo/style-test-samples/source");

const TARGETS: Array<{ file: string; prompt: string }> = [
  {
    file: "portrait-default.jpg",
    prompt:
      "A photorealistic studio portrait photo of a Japanese woman in her late 20s, neutral expression, shoulder-length brown hair, plain off-white background, soft daylight, looking directly at camera, sharp focus on the eyes, 4:5 aspect ratio.",
  },
  {
    file: "vintage-bw.jpg",
    prompt:
      "A photorealistic vintage 1950s black-and-white portrait photo of a Japanese woman wearing a simple period blouse, hair styled in soft waves, slight grain, slight contrast loss typical of mid-century film, plain studio backdrop. Pure grayscale, no color tint.",
  },
  {
    file: "group-photo.jpg",
    prompt:
      "A candid photorealistic photo of three Japanese friends (two women, one man) standing at the entrance of a Kyoto temple courtyard, with two unrelated tourists clearly walking in the background. Daylight, photographic depth of field, the main three friends are sharp and centered.",
  },
  {
    file: "casual-portrait.jpg",
    prompt:
      "A photorealistic head-and-shoulders portrait photo of a Japanese man in his early 30s, short black hair, neutral expression, wearing a simple gray crew-neck t-shirt, plain neutral indoor wall in the background, even soft lighting, looking directly at the camera, suitable as a baseline for ID photo or LinkedIn headshot editing.",
  },
  {
    file: "portrait-cluttered-bg.jpg",
    prompt:
      "A photorealistic candid portrait photo of a Japanese woman standing in a cluttered home living room — visible bookshelves, plants, a couch, a TV, a hanging clothes rack — daylight from a window. The subject is sharp and centered, the background is busy and clearly identifiable.",
  },
  {
    file: "portrait-casual-outfit.jpg",
    prompt:
      "A photorealistic three-quarter portrait photo of a Japanese woman in her late 20s wearing a casual cream-colored hoodie and blue jeans, standing against a neutral light gray studio backdrop, soft even lighting, neutral expression, hands relaxed at sides.",
  },
  {
    file: "portrait-long-hair.jpg",
    prompt:
      "A photorealistic studio portrait photo of a Japanese woman with long straight black hair flowing past her shoulders to chest length, neutral expression, simple white t-shirt, plain light gray studio backdrop, soft frontal lighting, looking directly at the camera, hair clearly visible.",
  },
  {
    file: "portrait-neutral-face.jpg",
    prompt:
      "A photorealistic close-up portrait photo of a Japanese woman in her 20s with a completely neutral, relaxed face — no smile, lips closed and softly together, eyes open and looking at camera. Plain light beige studio backdrop, soft even lighting, sharp focus on the face.",
  },
  {
    file: "portrait-skin-detail.jpg",
    prompt:
      "A photorealistic close-up portrait photo of a Japanese woman in her 30s with realistic visible skin texture — fine pores, a few freckles across the cheeks, a small mole near the jaw, faint laugh lines around the eyes — neutral expression, no makeup, plain neutral studio backdrop, soft daylight, very sharp focus on the skin.",
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
    console.error("Missing GOOGLE_AI_API_KEY");
    process.exit(2);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const results: Array<{ file: string; status: string; bytes?: number; error?: string }> = [];
  for (const t of TARGETS) {
    const outPath = path.join(OUT_DIR, t.file);
    if (fs.existsSync(outPath)) {
      results.push({ file: t.file, status: "EXISTS_SKIP" });
      console.log(`[skip]  ${t.file} — already exists`);
      continue;
    }
    try {
      console.log(`[gen]   ${t.file}`);
      const buf = await generate(t.prompt, apiKey);
      fs.writeFileSync(outPath, buf);
      results.push({ file: t.file, status: "OK", bytes: buf.length });
      console.log(`[ok]    ${t.file} (${buf.length} bytes)`);
    } catch (e: any) {
      results.push({ file: t.file, status: "FAIL", error: String(e?.message ?? e) });
      console.log(`[fail]  ${t.file} — ${e?.message ?? e}`);
    }
  }
  console.log("\n" + JSON.stringify(results, null, 2));
})();
