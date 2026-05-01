// Batch runner: pull photo-edit prompts from DB, render against mapped source photos
// via Gemini 2.5 Flash Image, write Before/After to seo/style-test-samples/output/,
// emit a Markdown report.
//
// Usage:
//   npx tsx src/scripts/style-test-live/run-batch.ts \
//     [--manifest=seo/style-test-samples/source-manifest.json] \
//     [--slugs=slug1,slug2] \
//     [--out=seo/style-test-samples/output] \
//     [--report=seo/photo-edit-live-report.md]
//
// Manifest format (JSON):
// {
//   "default": "seo/style-test-samples/source/portrait-default.jpg",
//   "byUseCase": {
//     "colorize": "seo/style-test-samples/source/vintage-bw.jpg",
//     "removeBystanders": "seo/style-test-samples/source/group-photo.jpg",
//     "passport": "seo/style-test-samples/source/casual-portrait.jpg"
//   },
//   "bySlug": {
//     "background-removal-transparent-png": "seo/style-test-samples/source/portrait-cluttered-bg.jpg"
//   }
// }
//
// Resolution order: bySlug → byUseCase keyword match → default.

import * as fs from "node:fs";
import * as path from "node:path";
import { PrismaClient } from "@prisma/client";
import { renderEdit } from "./render";

const ROOT = process.cwd();

type Manifest = {
  default?: string;
  byUseCase?: Record<string, string>;
  bySlug?: Record<string, string>;
};

function parseArgs() {
  const map: Record<string, string> = {};
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) map[m[1]] = m[2];
  }
  return {
    manifest: map.manifest || "seo/style-test-samples/source-manifest.json",
    slugs: map.slugs ? map.slugs.split(",").map((s) => s.trim()).filter(Boolean) : null,
    out: map.out || "seo/style-test-samples/output",
    report: map.report || "seo/photo-edit-live-report.md",
  };
}

function pickSource(manifest: Manifest, slug: string): string | null {
  if (manifest.bySlug?.[slug]) return manifest.bySlug[slug];
  if (manifest.byUseCase) {
    for (const [keyword, p] of Object.entries(manifest.byUseCase)) {
      if (slug.toLowerCase().includes(keyword.toLowerCase())) return p;
    }
  }
  return manifest.default ?? null;
}

async function main() {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) env var.");
    process.exit(2);
  }

  const args = parseArgs();
  const manifestPath = path.resolve(ROOT, args.manifest);
  if (!fs.existsSync(manifestPath)) {
    console.error(`Manifest not found: ${manifestPath}`);
    console.error("Create one — see header of run-batch.ts for format.");
    process.exit(2);
  }
  const manifest: Manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  const prisma = new PrismaClient();
  const where: any = { category: { slug: "photo-edit" }, isPublished: true };
  if (args.slugs) where.slug = { in: args.slugs };
  const rawPrompts = await prisma.prompt.findMany({
    where,
    select: { slug: true, title: true, content: true, tool: { select: { slug: true } } },
    orderBy: { createdAt: "asc" },
  });
  const prompts = rawPrompts
    .filter((p) => !!p.slug)
    .map((p) => ({ slug: p.slug!, title: p.title, content: p.content, tool: { slug: p.tool?.slug ?? "unknown" } }));
  await prisma.$disconnect();

  if (prompts.length === 0) {
    console.error("No prompts matched. Check --slugs or DB content.");
    process.exit(2);
  }

  fs.mkdirSync(path.resolve(ROOT, args.out), { recursive: true });

  const results: Array<{
    slug: string;
    title: string;
    tool: string;
    source: string | null;
    output?: string;
    bytes?: number;
    error?: string;
    durationMs: number;
  }> = [];

  for (const p of prompts) {
    const sourceRel = pickSource(manifest, p.slug);
    const t0 = Date.now();
    if (!sourceRel) {
      results.push({
        slug: p.slug,
        title: p.title,
        tool: p.tool.slug,
        source: null,
        error: "No source photo mapped (manifest miss)",
        durationMs: 0,
      });
      console.log(`[skip] ${p.slug} — no source mapped`);
      continue;
    }
    const sourceAbs = path.resolve(ROOT, sourceRel);
    if (!fs.existsSync(sourceAbs)) {
      results.push({
        slug: p.slug,
        title: p.title,
        tool: p.tool.slug,
        source: sourceRel,
        error: `Source missing on disk: ${sourceRel}`,
        durationMs: 0,
      });
      console.log(`[skip] ${p.slug} — source missing: ${sourceRel}`);
      continue;
    }

    const outRel = path.join(args.out, `${p.slug}.png`);
    const outAbs = path.resolve(ROOT, outRel);
    try {
      console.log(`[render] ${p.slug} ← ${sourceRel}`);
      const r = await renderEdit({ source: sourceAbs, prompt: p.content, out: outAbs }, apiKey);
      results.push({
        slug: p.slug,
        title: p.title,
        tool: p.tool.slug,
        source: sourceRel,
        output: outRel,
        bytes: r.bytes,
        durationMs: Date.now() - t0,
      });
      console.log(`[ok]    ${p.slug} → ${outRel} (${r.bytes} bytes)`);
    } catch (e: any) {
      results.push({
        slug: p.slug,
        title: p.title,
        tool: p.tool.slug,
        source: sourceRel,
        error: String(e?.message ?? e),
        durationMs: Date.now() - t0,
      });
      console.log(`[fail]  ${p.slug} — ${e?.message ?? e}`);
    }
  }

  const md = renderReport(results, args);
  const reportAbs = path.resolve(ROOT, args.report);
  fs.mkdirSync(path.dirname(reportAbs), { recursive: true });
  fs.writeFileSync(reportAbs, md, "utf8");

  const ok = results.filter((r) => r.output).length;
  const fail = results.filter((r) => r.error).length;
  console.log(`\nDone: ${ok} rendered / ${fail} failed / ${results.length} total`);
  console.log(`Report: ${args.report}`);
}

function renderReport(
  results: Array<any>,
  args: { out: string; report: string }
): string {
  const lines: string[] = [];
  const today = new Date().toISOString().slice(0, 10);
  const ok = results.filter((r) => r.output);
  const fail = results.filter((r) => r.error);
  lines.push(`# Style-Test-Live 报告 — photo-edit 真实渲染`);
  lines.push("");
  lines.push(`> 渲染日期：${today}`);
  lines.push(`> 模型：${process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image"}`);
  lines.push(`> 输出目录：${args.out}`);
  lines.push(`> 渲染条数：${results.length}（成功 ${ok.length} / 失败 ${fail.length}）`);
  lines.push("");
  lines.push("## 渲染结果");
  lines.push("");
  lines.push("| Slug | 工具 | 源照片 | 输出 | 耗时 | 状态 |");
  lines.push("|---|---|---|---|---:|---|");
  for (const r of results) {
    const status = r.output ? "OK" : `FAIL: ${r.error}`;
    const outCell = r.output ? `[${path.basename(r.output)}](${path.relative(path.dirname(args.report), r.output)})` : "—";
    const srcCell = r.source ? `\`${r.source}\`` : "—";
    lines.push(`| \`${r.slug}\` | ${r.tool} | ${srcCell} | ${outCell} | ${r.durationMs}ms | ${status} |`);
  }
  lines.push("");
  lines.push("## Before / After 对照");
  lines.push("");
  for (const r of ok) {
    const beforeRel = path.relative(path.dirname(args.report), path.resolve(ROOT, r.source));
    const afterRel = path.relative(path.dirname(args.report), path.resolve(ROOT, r.output));
    lines.push(`### ${r.slug}`);
    lines.push("");
    lines.push(`**Title**：${r.title}`);
    lines.push("");
    lines.push(`| Before | After |`);
    lines.push(`|---|---|`);
    lines.push(`| ![before](${beforeRel}) | ![after](${afterRel}) |`);
    lines.push("");
  }
  if (fail.length > 0) {
    lines.push("## 失败明细");
    lines.push("");
    for (const r of fail) {
      lines.push(`- **${r.slug}** (${r.tool}): ${r.error}`);
    }
    lines.push("");
  }
  lines.push("## 下一步评估建议");
  lines.push("");
  lines.push("1. 人工对每张 After 评估「指令意图达成度」（保持身份、输出格式、质感、防呆是否生效）");
  lines.push("2. 通过的 Before/After 可挂到 `/prompt/{slug}` 详情页作「効果サンプル」");
  lines.push("3. 失败/低质条目需回 SKILL.md 补规则或调 prompt 文本，再重跑本 agent");
  return lines.join("\n");
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
