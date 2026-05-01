// @ts-nocheck
// One-off: apply 6 photo-edit prompt revisions from style-test audit (2026-05-01).
// Source of truth: seo/photo-edit-audit-report.md
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fixes: Array<{ slug: string; content: string; reason: string }> = [
  {
    slug: "outfit-swap-business-suit",
    reason: "+R5 reverse safeguard",
    content:
      "Swap the outfit of the person in this image to a tailored navy single-breasted business suit with a crisp white dress shirt and a thin burgundy tie. Preserve the original pose, body proportions, hairstyle, facial identity, and background completely. Match the existing lighting on the new fabric with realistic wrinkles and natural shadows at the lapels and cuffs. Output as a 4:5 portrait, photorealistic. Do not alter the facial features or invent accessories that are not requested.",
  },
  {
    slug: "expression-neutral-to-subtle-smile",
    reason: "+R3 output spec",
    content:
      "Change the expression of the person in the uploaded photo from neutral to a subtle, closed-mouth smile with a slight upward curve at the corners of the lips and gentle warmth around the eyes. Preserve the person's identity, facial proportions, hairstyle, and lighting completely. Avoid teeth showing and do not invent details around the mouth. Keep skin texture realistic and natural-looking. Output at the original resolution.",
  },
  {
    slug: "background-replace-studio-neutral",
    reason: "+R4 texture + R5 reverse safeguard",
    content:
      "Replace the background of the uploaded photo with a softly blurred professional photography studio backdrop in neutral light gray (#D8D8D8), with subtle vignetting toward the corners. Keep the person's pose, facial expression, hair flyaways, and clothing exactly as in the original. Match the existing key-light direction and 5500K color temperature on the subject so the composite looks natural. Output as a 1:1 square at 1024×1024 pixels. Photorealistic and natural-looking, with no white halo around the subject and no color cast on the skin from the new background.",
  },
  {
    slug: "colorize-vintage-photo-1950s",
    reason: "R1 align with whitelist (photograph → photo)",
    content:
      "Colorize the uploaded vintage black-and-white photo with historically plausible tones for the 1950s era: warm sepia-leaning skin tones, muted clothing colors appropriate to the period, and a softly desaturated background. Preserve the original composition, grain, and facial details exactly. Do not sharpen aggressively or invent details that are not visible in the source. Output at the original resolution, natural-looking and photorealistic.",
  },
  {
    slug: "hairstyle-change-french-bob",
    reason: "+R3 output spec",
    content:
      "Change the hairstyle of the person in the uploaded photo to a chin-length French bob with blunt-cut bangs that just touch the eyebrows. Keep the original hair color, facial identity, expression, clothing, and background unchanged. Match the lighting and shadow direction of the existing photo so the new hair blends naturally around the ears and neckline. Photorealistic, do not modify the facial structure. Output at the original resolution.",
  },
  {
    slug: "background-removal-transparent-png",
    reason: "+R4 texture anchor",
    content:
      "Remove the background from the uploaded photo and isolate the person cleanly along the hair edges and shoulders. Preserve the original skin tones, clothing colors, and facial details exactly as they are. Keep the cutout sharp focus and natural-looking around the hair edges. Output as a transparent PNG at the original resolution with anti-aliased edges and no white halo around the subject.",
  },
];

(async () => {
  const results: Array<{ slug: string; status: string; reason: string }> = [];
  for (const fix of fixes) {
    const existing = await prisma.prompt.findUnique({ where: { slug: fix.slug } });
    if (!existing) {
      results.push({ slug: fix.slug, status: "NOT_FOUND", reason: fix.reason });
      continue;
    }
    if (existing.content === fix.content) {
      results.push({ slug: fix.slug, status: "ALREADY_APPLIED", reason: fix.reason });
      continue;
    }
    await prisma.prompt.update({ where: { slug: fix.slug }, data: { content: fix.content } });
    results.push({ slug: fix.slug, status: "UPDATED", reason: fix.reason });
  }
  console.log(JSON.stringify(results, null, 2));
  await prisma.$disconnect();
})();
