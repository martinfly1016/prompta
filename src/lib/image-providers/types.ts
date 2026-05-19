/**
 * Image / text generation provider abstraction.
 *
 * Used by /api/prompt/execute and <PromptExecutor> to dispatch a prompt
 * to one of several backend providers (Gemini, OpenAI, future: SD, Fal).
 *
 * Add a new provider by:
 *   1. Drop a file `src/lib/image-providers/<id>.ts` exporting `provider: ImageProvider`.
 *   2. Register in `registry.ts`.
 * Per pricing baseline (2026-05-19), all Tier-1 image providers charge
 * 5 credits per generation; text providers charge 1 credit.
 */

export type ProviderId = 'gemini-image' | 'openai-image' | 'gemini-text'

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
  icon: string
  /** Supported execute modes. */
  modes: ExecuteMode[]
  /** Credit cost per call (1 for text, 5 for image, 10 for HD image). */
  credits: number
  /** Approximate cost in USD per call (for daily-report margin tracking). */
  costUsd: number
  /** Provider-specific call. Throws on failure. */
  call: (opts: ProviderCallOpts) => Promise<ProviderResult>
}
