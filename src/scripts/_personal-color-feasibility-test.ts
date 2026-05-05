// @ts-nocheck
import "dotenv/config";
// Day-0 feasibility test for パーソナルカラー診断 tool.
// Runs each test photo through Gemini 2.5 Flash 3 times → measures:
//   1. Stability: same photo → same season label (3 runs)
//   2. Differentiation: different photos → different labels
//   3. Confidence + structural validity of JSON output
//
// Output: /tmp/personal-color-feasibility.json + console summary

import * as fs from "node:fs";
import * as path from "node:path";

// Use Gemini 2.5 Flash (text-only output for structured analysis, not image generation)
const MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY");
  process.exit(2);
}

const ROOT = path.resolve(__dirname, "../..");
const SOURCE_DIR = `${ROOT}/seo/style-test-samples/source`;

const TEST_PHOTOS = [
  "portrait-default.jpg",
  "casual-portrait.jpg",
  "portrait-long-hair.jpg",
  "portrait-neutral-face.jpg",
  "portrait-skin-detail.jpg",
];

const RUNS_PER_PHOTO = 3;

// Strict structured prompt with JSON schema enforcement
const ANALYSIS_PROMPT = `You are a professional Japanese personal color analyst (パーソナルカラリスト) trained in the 4-season + 12-type system used in Japan and Korea.

Analyze the uploaded portrait photo and classify the person into one of the 12 types based on:
- Skin undertone (warm yellow / cool pink / neutral)
- Hair color depth and tone
- Eye color and contrast
- Overall feature contrast level (the contrast between hair, skin, and eyes)

The 12 types are:
- Spring (warm + bright): spring-warm-bright, spring-warm-light, spring-warm-vivid
- Summer (cool + soft): summer-cool-light, summer-cool-soft, summer-cool-mute
- Autumn (warm + deep): autumn-warm-deep, autumn-warm-mute, autumn-warm-strong
- Winter (cool + clear): winter-cool-clear, winter-cool-deep, winter-cool-bright

Output ONLY a single JSON object with this exact schema, no surrounding text or markdown:

{
  "season_12": "<one of the 12 types above>",
  "season_4": "spring" | "summer" | "autumn" | "winter",
  "undertone": "warm" | "cool" | "neutral",
  "contrast": "high" | "medium" | "low",
  "skin_features_ja": "<1-2 sentence Japanese description of skin tone, hair, and eyes>",
  "recommended_colors": [
    { "hex": "#XXXXXX", "name_ja": "<Japanese color name>", "role": "clothing" | "lipstick" | "hair" | "accessory" }
  ],
  "avoid_colors": [
    { "hex": "#XXXXXX", "reason_ja": "<short Japanese reason>" }
  ],
  "confidence": <0.0 to 1.0>
}

Rules:
- recommended_colors: exactly 12 entries, mix of all 4 roles (3 each)
- avoid_colors: exactly 3 entries
- All hex codes must be valid 6-digit hex
- confidence is your honest self-rating of how clearly the photo allows classification (lighting, angle, makeup absence)
- Be deterministic: do not introduce randomness; if the photo is borderline, pick the more likely type and lower confidence`;

function mimeFromExt(p: string): string {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  throw new Error(`Unsupported: ${ext}`);
}

async function analyze(photoPath: string): Promise<{ raw: string; parsed: any | null; error?: string; latencyMs: number }> {
  const start = Date.now();
  const buf = fs.readFileSync(photoPath);
  const body = {
    contents: [
      {
        parts: [
          { text: ANALYSIS_PROMPT },
          { inline_data: { mime_type: mimeFromExt(photoPath), data: buf.toString("base64") } },
        ],
      },
    ],
    generationConfig: {
      temperature: 0,
      topP: 0.95,
      responseMimeType: "application/json",
    },
  };

  try {
    const res = await fetch(`${ENDPOINT}?key=${KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const latencyMs = Date.now() - start;
    if (!res.ok) {
      const txt = await res.text();
      return { raw: txt.slice(0, 500), parsed: null, error: `HTTP ${res.status}`, latencyMs };
    }
    const json: any = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.find((p: any) => p?.text)?.text ?? "";
    let parsed: any = null;
    try {
      parsed = JSON.parse(text);
    } catch (e: any) {
      return { raw: text.slice(0, 500), parsed: null, error: `parse: ${e.message}`, latencyMs };
    }
    return { raw: text, parsed, latencyMs };
  } catch (e: any) {
    return { raw: "", parsed: null, error: e?.message ?? String(e), latencyMs: Date.now() - start };
  }
}

async function main() {
  console.log(`Model: ${MODEL}`);
  console.log(`Test photos: ${TEST_PHOTOS.length}, runs each: ${RUNS_PER_PHOTO}`);
  console.log(`Total API calls: ${TEST_PHOTOS.length * RUNS_PER_PHOTO}\n`);

  const results: any[] = [];

  for (const photo of TEST_PHOTOS) {
    const photoPath = `${SOURCE_DIR}/${photo}`;
    if (!fs.existsSync(photoPath)) {
      console.log(`[skip] ${photo} not found`);
      continue;
    }
    const photoRuns: any[] = [];
    for (let i = 1; i <= RUNS_PER_PHOTO; i++) {
      process.stdout.write(`[${photo}] run ${i}/${RUNS_PER_PHOTO} ... `);
      const r = await analyze(photoPath);
      const summary = r.parsed
        ? `${r.parsed.season_12} (${r.parsed.season_4}/${r.parsed.undertone}/${r.parsed.contrast}, conf=${r.parsed.confidence}, ${r.parsed.recommended_colors?.length || 0} colors) ${r.latencyMs}ms`
        : `ERROR: ${r.error}`;
      console.log(summary);
      photoRuns.push(r);
    }
    results.push({ photo, runs: photoRuns });
  }

  // ===== Stability analysis =====
  console.log("\n=== STABILITY (same photo across 3 runs) ===");
  const stabilitySummary: any[] = [];
  for (const { photo, runs } of results) {
    const seasons12 = runs.map((r: any) => r.parsed?.season_12).filter(Boolean);
    const seasons4 = runs.map((r: any) => r.parsed?.season_4).filter(Boolean);
    const undertones = runs.map((r: any) => r.parsed?.undertone).filter(Boolean);
    const u12 = new Set(seasons12);
    const u4 = new Set(seasons4);
    const ut = new Set(undertones);
    const stability12 = seasons12.length === 0 ? "NO_DATA" : u12.size === 1 ? "STABLE" : `DRIFT(${[...u12].join("|")})`;
    const stability4 = u4.size === 1 ? "STABLE" : `DRIFT(${[...u4].join("|")})`;
    const stabilityUT = ut.size === 1 ? "STABLE" : `DRIFT(${[...ut].join("|")})`;
    console.log(`  ${photo.padEnd(35)} 12-type=${stability12.padEnd(20)} 4-season=${stability4.padEnd(15)} undertone=${stabilityUT}`);
    stabilitySummary.push({ photo, stability12, stability4, stabilityUT, seasons12, seasons4, undertones });
  }

  // ===== Differentiation =====
  console.log("\n=== DIFFERENTIATION (across photos, run 1 only) ===");
  const firstRunSeasons = results.map((r) => ({ photo: r.photo, season: r.runs[0].parsed?.season_12, undertone: r.runs[0].parsed?.undertone }));
  for (const { photo, season, undertone } of firstRunSeasons) {
    console.log(`  ${photo.padEnd(35)} ${season || "ERR"} (${undertone || "?"})`);
  }
  const distinctSeasons = new Set(firstRunSeasons.map((s) => s.season).filter(Boolean));
  console.log(`  → distinct 12-types: ${distinctSeasons.size}/${firstRunSeasons.length}`);

  // ===== Schema validity =====
  let totalRuns = 0,
    validJson = 0,
    validSchema = 0;
  for (const { runs } of results) {
    for (const r of runs) {
      totalRuns++;
      if (r.parsed) {
        validJson++;
        const p = r.parsed;
        if (
          p.season_12 &&
          p.season_4 &&
          p.undertone &&
          Array.isArray(p.recommended_colors) &&
          p.recommended_colors.length >= 10 &&
          typeof p.confidence === "number"
        ) {
          validSchema++;
        }
      }
    }
  }
  console.log(`\n=== SCHEMA VALIDITY ===`);
  console.log(`  JSON parse: ${validJson}/${totalRuns}`);
  console.log(`  Schema complete: ${validSchema}/${totalRuns}`);

  // ===== Verdict =====
  const stableCount = stabilitySummary.filter((s) => s.stability12 === "STABLE").length;
  const stableMajor = stabilitySummary.filter((s) => s.stability4 === "STABLE").length;
  console.log(`\n=== VERDICT ===`);
  console.log(`  12-type stability: ${stableCount}/${stabilitySummary.length}`);
  console.log(`  4-season stability: ${stableMajor}/${stabilitySummary.length}`);
  console.log(`  Differentiation: ${distinctSeasons.size} distinct types across ${firstRunSeasons.length} photos`);
  console.log(`  Schema valid: ${validSchema}/${totalRuns}`);
  let verdict: string;
  if (stableMajor >= 4 && validSchema >= totalRuns * 0.9) {
    verdict = "✅ GO — 4-season stability ≥ 4/5, schema reliable. 12-type drift acceptable (use 4-season as primary, 12-type as guidance)";
  } else if (stableMajor >= 3) {
    verdict = "⚠️ MAYBE — partial stability. Consider switching to Pro model or simplifying to 4-season only";
  } else {
    verdict = "❌ NO-GO — too unstable for production tool";
  }
  console.log(`\n  ${verdict}`);

  fs.writeFileSync(
    "/tmp/personal-color-feasibility.json",
    JSON.stringify({ model: MODEL, stabilitySummary, firstRunSeasons, totalRuns, validJson, validSchema, verdict, results }, null, 2),
  );
  console.log(`\nFull data: /tmp/personal-color-feasibility.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
