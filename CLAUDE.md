# Prompta - AI Prompt Collection Site

## Project
Japanese-language AI prompt collection site at https://www.prompta.jp
Target audience: Japanese AI image generation users (Stable Diffusion, Midjourney, etc.)

## Tech Stack
- **Framework**: Next.js 14 (App Router, TypeScript, Tailwind CSS)
- **Database**: PostgreSQL on Railway via Prisma ORM
- **Storage**: Vercel Blob for prompt images
- **Deployment**: Vercel (auto-deploy on push to `main`)
- **Auth**: NextAuth with bcrypt

## Key Directories
- `src/app/(marketing)/` — Public pages (homepage, prompts, tools, tags, guides)
- `src/app/(admin)/` — Admin dashboard
- `src/app/api/` — API routes
- `src/lib/data/` — Data access layer (Prisma queries with React cache)
- `src/scripts/collect/` — Content collection pipeline (CivitAI → DB)
- `prisma/schema.prisma` — Database schema

## Content Pipeline
Scripts in `src/scripts/collect/` form a multi-source pipeline:

**Source scripts:**
- `fetch-civitai.ts` — Stable Diffusion prompts from CivitAI API
- `fetch-huggingface.ts` — Midjourney/DALL-E prompts from HuggingFace datasets
  - `--dataset=midjourneyDetailed` — MohamedRashad/midjourney-detailed-prompts (3K, recommended)
  - `--dataset=midjourney` — brivangl/midjourney-v6-llava (40K, low quality LLAVA captions)
  - `--dataset=dalle` — OpenDatasets/dalle-3-dataset (19K)

**Common pipeline:**
1. `check-duplicates.ts` — Dedup against existing DB
2. AI enrichment — Classify, translate, add SEO metadata (via /collect-content skill)
3. `download-images.ts` — Download + upload to Vercel Blob
4. `write-prompts.ts` — Write to PostgreSQL

## Database Schema (Key Models)
- `Prompt` — Main content (title, content, slug, category, tool, tags, images, SEO fields)
- `Category` — 13 categories (hairstyle, clothing, cosplay, anime, color, etc.)
- `Tool` — 5 tools (stable-diffusion, midjourney, chatgpt, claude, dall-e)
- `Tag` — Many-to-many with prompts, supports Japanese slugs
- `PromptImage` — Images stored in Vercel Blob
- `Guide` — Tutorial/guide articles (markdown)

## Skills
- `/collect-content [--source=civitai|midjourney|dalle|text] [--target=15] [--pages=3] [--cursor=STRING]` — 多源自动采集全流程
  - 8 阶段：预检 → 抓取 → 去重 → AI 分类 → AI 富化 → 图片下载 → DB 写入 → 线上验证
  - 数据源: CivitAI (SD), HuggingFace (Midjourney/DALL-E), AI生成 (text prompts)
  - 分类/翻译用 Haiku 子 agent（低成本），流程编排用主 agent（Opus）
  - SEO 优先级加权自动筛选（基于关键词搜索量和分类缺口）

## Important Notes
- All content pages use ISR with `revalidate = 60` (auto-refresh every 60s)
- CivitAI images API has NO tag/search filter — only sort/period/nsfw
- `REVALIDATE_SECRET` not yet configured — on-demand revalidation unavailable
- Communicate with user in Chinese; technical content in Japanese/English
