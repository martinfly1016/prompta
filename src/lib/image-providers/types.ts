/**
 * Image / text generation provider abstraction.
 *
 * Used by /api/prompt/execute and <PromptExecutor> to dispatch a prompt
 * to one of several backend providers (Gemini, OpenAI, future: SD, Fal).
 *
 * Add a new provider by:
 *   1. Drop a file `src/lib/image-providers/<id>.ts` exporting `provider: ImageProvider`.
 *   2. Register in `registry.ts`.
 * Every provider charges POINTS_PER_RUN (see credit-costs.ts).
 */

export type ProviderId = 'gemini-image' | 'openai-image' | 'gemini-text' | 'fal-sdxl'

export type ExecuteMode = 'text' | 'image-gen' | 'image-edit'

export interface ProviderCallOpts {
  /** Final user-substituted prompt content (positive). */
  prompt: string
  /** Negative prompt — only used by some providers. */
  negativePrompt?: string
  /** For image-edit mode only: base64 of the user-uploaded source photo. */
  sourceImage?: {
    base64: string
    mimeType: string
  }
  /**
   * Extra reference photos, sent after sourceImage in array order.
   * Used by the height-difference simulator (one or two character photos).
   */
  referenceImages?: Array<{
    base64: string
    mimeType: string
  }>
  /** Hint for output aspect — providers may ignore. */
  aspectRatio?: '1:1' | '4:3' | '3:4' | '16:9' | '9:16'
}

export interface ProviderResult {
  /** Text output for text-mode providers. */
  text?: string
  /** Image binary for image-mode providers. */
  image?: {
    base64: string
    mimeType: string
  }
}

export interface ImageProvider {
  id: ProviderId
  label: string
  /** Emoji fallback shown only when iconUrl fails to load. */
  icon: string
  /** Preferred icon — favicon URL of the underlying service. Use Google's
   *  S2 favicon service so any TLD works without bundling assets. */
  iconUrl?: string
  /** Supported execute modes. */
  modes: ExecuteMode[]
  /** Credit cost per call. Always POINTS_PER_RUN. */
  credits: number
  /** Approximate cost in USD per call (for daily-report margin tracking). */
  costUsd: number
  /** Provider-specific call. Throws on failure. */
  call: (opts: ProviderCallOpts) => Promise<ProviderResult>
}
