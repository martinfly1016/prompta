/**
 * Watch keywords — the explicit list of keywords we want the daily
 * report to track week-over-week. Add / remove entries here and the
 * daily-report cron will pick them up automatically.
 *
 * Used by:
 *   - src/lib/daily-report.ts §6 (重点关键词追踪)
 *   - manual: npx tsx src/scripts/data-analys/_head_keyword_track.ts
 *
 * Maintenance policy:
 *   - When a keyword reaches stable top-3 for 4+ weeks, move it to the
 *     `top10Maintain` cluster (defense mode — only flag if it falls back)
 *   - When a new opportunity emerges from /data-analys keyword research
 *     (e.g. keyword-research-2026-05-17.md), add it here with a
 *     `discoveredAt` field so we can measure climb time
 *   - Cap at ~25 entries to keep the report scannable; rotate out the
 *     least-active 1-2 entries quarterly
 */

export type WatchCluster =
  | 'top10-defense'      // already top-10, watch for regression
  | 'head-ai'             // ai プロンプト / プロンプト 系（5/12 SEO ship 目标）
  | 'tools-hair'          // hair-color 工具长尾
  | 'tools-pc'            // personal-color 工具长尾
  | 'tools-pc-seasonal'   // パーソナルカラー 春/夏/秋/冬
  | 'photo-edit'          // AI 写真加工 cluster (chatgpt.com referral 受益)
  | 'new-tool-candidate'  // 高搜索量但无对应工具（候选 freemium 工具）
  | 'opportunity'         // 高曝光低排名机会词（per `_rank_opportunities.ts`）

export interface WatchKeyword {
  keyword: string
  cluster: WatchCluster
  /** Canonical landing page expected to rank for this keyword. Used for
   *  cannibalization detection: if GSC's top-page differs, flag it. */
  targetPage: string | null
  /** Monthly search volume estimate (from SEMrush research). Approximate. */
  monthlyVolume?: number
  /** Keyword Difficulty (0-100). Approximate. */
  kd?: number
  /** Date when first added to watch list (YYYY-MM-DD). */
  discoveredAt: string
  /** Notes for context. */
  notes?: string
}

export const WATCH_KEYWORDS: WatchKeyword[] = [
  // ============================================================
  // top10-defense: already top-10, monitor for regression
  // ============================================================
  { keyword: 'コスプレ プロンプト', cluster: 'top10-defense', targetPage: '/prompts/cosplay', discoveredAt: '2026-04-16' },
  { keyword: '体型 プロンプト', cluster: 'top10-defense', targetPage: '/prompts/body-type', discoveredAt: '2026-04-16' },
  { keyword: 'アニメキャラ プロンプト', cluster: 'top10-defense', targetPage: '/prompts/anime', discoveredAt: '2026-04-16' },
  { keyword: '身長差 プロンプト', cluster: 'top10-defense', targetPage: '/tag/身長差', discoveredAt: '2026-04-16' },
  { keyword: '体格差 プロンプト', cluster: 'top10-defense', targetPage: '/tag/体格差', discoveredAt: '2026-04-16' },
  { keyword: '画像生成ai プロンプト例 アニメ', cluster: 'top10-defense', targetPage: '/prompts/anime', discoveredAt: '2026-04-16' },

  // ============================================================
  // head-ai: 5/12 ship 优化目标（持续追踪）
  // ============================================================
  { keyword: 'プロンプト', cluster: 'head-ai', targetPage: '/guides/what-is-prompt', discoveredAt: '2026-05-12', notes: '5/12 ship d314307 目标词' },
  { keyword: 'プロンプトとは', cluster: 'head-ai', targetPage: '/guides/what-is-prompt', discoveredAt: '2026-05-12' },
  { keyword: '生成ai プロンプト', cluster: 'head-ai', targetPage: '/tools/gemini', discoveredAt: '2026-05-12', notes: '5/12 ship 后 -98 位巨幅改善' },
  { keyword: 'ai プロンプト', cluster: 'head-ai', targetPage: '/guides/what-is-prompt', discoveredAt: '2026-05-12' },
  { keyword: 'chatgpt プロンプト', cluster: 'head-ai', targetPage: '/tools/chatgpt', discoveredAt: '2026-05-12' },
  { keyword: 'gemini プロンプト', cluster: 'head-ai', targetPage: '/tools/gemini', monthlyVolume: 1000, kd: 38, discoveredAt: '2026-05-12', notes: '机会词 — 28d 64 imp / pos 38' },

  // ============================================================
  // tools-hair: 5/17 ship 扩内容目标（5/24 第 2 周回查）
  // ============================================================
  { keyword: '似合う 髪色 診断', cluster: 'tools-hair', targetPage: '/tools/hair-color-diagnosis', monthlyVolume: 2600, kd: 26, discoveredAt: '2026-05-17' },
  { keyword: '髪色 ai 診断', cluster: 'tools-hair', targetPage: '/tools/hair-color-diagnosis', monthlyVolume: 1800, kd: 24, discoveredAt: '2026-05-17' },
  { keyword: '自分 に 似合う 髪色', cluster: 'tools-hair', targetPage: '/tools/hair-color-diagnosis', monthlyVolume: 1200, kd: 20, discoveredAt: '2026-05-17' },
  { keyword: '髪色 シミュレーター', cluster: 'tools-hair', targetPage: '/tools/hair-color-diagnosis', monthlyVolume: 680, kd: 22, discoveredAt: '2026-05-17' },

  // ============================================================
  // tools-pc: personal-color 工具长尾（5/19 后扩内容目标）
  // ============================================================
  { keyword: 'パーソナルカラー ai', cluster: 'tools-pc', targetPage: '/tools/personal-color-analysis', monthlyVolume: 2100, kd: 28, discoveredAt: '2026-05-17' },
  { keyword: 'パーソナルカラー診断 方法', cluster: 'tools-pc', targetPage: '/tools/personal-color-analysis', monthlyVolume: 420, kd: 22, discoveredAt: '2026-05-17' },

  // ============================================================
  // tools-pc-seasonal: 4 season subpages (5/17 ship)
  // 月搜 ~600-900 each, KD 16-18 (lowest in the watch list)
  // ============================================================
  { keyword: 'パーソナルカラー 春', cluster: 'tools-pc-seasonal', targetPage: '/tools/personal-color-analysis/spring', monthlyVolume: 890, kd: 18, discoveredAt: '2026-05-17' },
  { keyword: 'パーソナルカラー 夏', cluster: 'tools-pc-seasonal', targetPage: '/tools/personal-color-analysis/summer', monthlyVolume: 780, kd: 16, discoveredAt: '2026-05-17' },
  { keyword: 'パーソナルカラー 秋', cluster: 'tools-pc-seasonal', targetPage: '/tools/personal-color-analysis/autumn', monthlyVolume: 720, kd: 17, discoveredAt: '2026-05-17' },
  { keyword: 'パーソナルカラー 冬', cluster: 'tools-pc-seasonal', targetPage: '/tools/personal-color-analysis/winter', monthlyVolume: 720, kd: 17, discoveredAt: '2026-05-17' },

  // ============================================================
  // photo-edit: AI 写真加工 cluster（chatgpt.com referral 受益区）
  // ============================================================
  { keyword: 'ai 写真 加工', cluster: 'photo-edit', targetPage: '/prompts/photo-edit', monthlyVolume: 890, kd: 24, discoveredAt: '2026-05-17' },
  { keyword: 'ai 背景削除', cluster: 'photo-edit', targetPage: '/prompts/photo-edit', monthlyVolume: 680, kd: 22, discoveredAt: '2026-05-17' },

  // ============================================================
  // new-tool-candidate: 高搜索量但无对应工具（决策候选）
  // ============================================================
  { keyword: 'ai 証明写真', cluster: 'new-tool-candidate', targetPage: null, monthlyVolume: 540, kd: 28, discoveredAt: '2026-05-17', notes: 'P1 新工具候选 — AI 証明写真生成器' },

  // ============================================================
  // opportunity: high-impression / mid-position keywords where existing
  // pages already have Google trust — title/H2/FAQ rewrite is the
  // fastest lever to push from page-2 to top-5. Tracking added
  // 2026-05-18 per seo-opportunity-analysis-2026-05-18.md §P0.
  // ============================================================
  { keyword: 'プロンプト 髪型', cluster: 'opportunity', targetPage: '/prompts/hairstyle', monthlyVolume: 2400, kd: 8, discoveredAt: '2026-05-18', notes: 'GSC 28d: 8801 imp / 2.20% CTR / pos 18 — title rewrite 5/18' },
  { keyword: 'プロンプト 服装', cluster: 'opportunity', targetPage: '/prompts/clothing', monthlyVolume: 1300, kd: 7, discoveredAt: '2026-05-18', notes: 'GSC 28d: 6706 imp / 3.37% CTR / pos 14 — title rewrite 5/18' },
  { keyword: 'プロンプト 色', cluster: 'opportunity', targetPage: '/prompts/color', monthlyVolume: 390, kd: 13, discoveredAt: '2026-05-18', notes: 'GSC 28d: 2957 imp / 2.87% CTR / pos 6.71 — meta rewrite 5/18' },
  { keyword: 'プロンプト カメラ', cluster: 'opportunity', targetPage: '/prompts/camera', monthlyVolume: 260, kd: 7, discoveredAt: '2026-05-18', notes: 'GSC 28d: 2916 imp / 1.78% CTR / pos 8.04 — added ライティング 5/18' },
  { keyword: 'midjourney プロンプト', cluster: 'opportunity', targetPage: '/guides/midjourney-prompt-guide', monthlyVolume: 1300, kd: 23, discoveredAt: '2026-05-18', notes: 'Semrush pos 33 — Hub upgrade pending' },
]

/** Default landing-page assumption when watch entry has no explicit target. */
export const DEFAULT_LANDING_FALLBACK = '/'

/** Helper: build the SEMrush-like priority score (volume / KD). Used for
 *  sorting "top opportunities" in reports. */
export function priorityScore(k: WatchKeyword): number {
  if (!k.monthlyVolume || !k.kd) return 0
  return k.monthlyVolume / k.kd
}
