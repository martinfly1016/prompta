/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  skipMiddlewareUrlNormalize: true,
  staticPageGenerationTimeout: 120,
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
    BUILD_ID: Math.random().toString(36).substring(7),
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'rpvq9pdoasbva5wm.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'image.lexica.art' },
      { protocol: 'https', hostname: '*.mypinata.cloud' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [128, 256, 384],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
  poweredByHeader: false,
  // Redirects: non-www → www, plus 301s for dead URLs Google has indexed
  // (see seo/gsc-404-cleanup-2026-05-11.md for impressions data)
  async redirects() {
    return [
      // Non-www → www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'prompta.jp' }],
        destination: 'https://www.prompta.jp/:path*',
        permanent: true,
      },
      // Legacy route
      { source: '/all-prompts', destination: '/prompts', permanent: true },
      // High-impression dead slugs → closest live match
      { source: '/prompt/sailor-uniform-school-cosplay', destination: '/prompt/sailor-uniform-pleated-skirt', permanent: true },
      { source: '/prompt/elegant-dress-woman-nlds', destination: '/prompt/elegant-dress-woman', permanent: true },
      { source: '/prompt/red-cocktail-dress-elegant-c248', destination: '/prompt/red-cocktail-dress-elegant-n4mi', permanent: true },
      // Old DB-ID routes (cuid) → current slug
      { source: '/prompt/cmhzvpn7n0001121qnipsdo6d', destination: '/prompt/%E3%83%8F%E3%82%A4%E3%82%A8%E3%83%B3%E3%83%89%E3%81%AA%E9%9B%91%E8%AA%8C%E7%B4%9A%E3%83%95%E3%82%A1%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%88-psdo6d', permanent: true },
      { source: '/prompt/cmi45qa9q0006120dkmu4tn7v', destination: '/prompt/9%E3%82%B3%E3%83%9E%E3%83%BB%E3%83%95%E3%82%A9%E3%83%88%E3%83%96%E3%83%BC%E3%82%B9%E5%A4%A7%E9%A0%AD%E8%B2%BC33%E3%82%B0%E3%83%AA%E3%83%83%E3%83%89-u4tn7v', permanent: true },
      // Numerical-suffix variants → category page (Google will rediscover live alternatives via category)
      { source: '/prompt/gradient-hair-17', destination: '/prompts/hairstyle', permanent: true },
      { source: '/prompt/gradient-hair-18', destination: '/prompts/hairstyle', permanent: true },
      { source: '/prompt/gradient-hair-19', destination: '/prompts/hairstyle', permanent: true },
      { source: '/prompt/neon-cyberpunk-15', destination: '/prompt/neon-cyberpunk-1', permanent: true },
      { source: '/prompt/neon-cyberpunk-16', destination: '/prompt/neon-cyberpunk-1', permanent: true },
      { source: '/prompt/vibrant-palette-7', destination: '/prompts/color', permanent: true },
      { source: '/prompt/color-theme-12', destination: '/prompts/color', permanent: true },
      { source: '/prompt/elegant-lady-knight-armor', destination: '/prompts/costume', permanent: true },
      { source: '/prompt/elegant-fantasy-knight-lady', destination: '/prompts/costume', permanent: true },
      { source: '/prompt/knight-armor-fantasy-4', destination: '/prompts/costume', permanent: true },
      { source: '/prompt/blonde-angel-mech-cyberpunk-night', destination: '/prompts/costume', permanent: true },
      { source: '/prompt/studio-dance-scene-colorful-costume-actress', destination: '/prompts/costume', permanent: true },
      { source: '/prompt/jesus-church-unreal-cinematic', destination: '/prompts/creative', permanent: true },
      { source: '/prompt/stevie-witch-classical-art', destination: '/prompts/creative', permanent: true },
      { source: '/prompt/gold-necklace-vintage-10', destination: '/prompts/clothing', permanent: true },
      { source: '/prompt/anime-girl-red-13', destination: '/prompts/anime', permanent: true },
      { source: '/prompt/anime-girl-meadow-20', destination: '/prompts/anime', permanent: true },
      { source: '/prompt/anime-boy-pink-04', destination: '/prompts/anime', permanent: true },
      { source: '/prompt/anime-prompt-94dea3a7', destination: '/prompts/anime', permanent: true },
      { source: '/prompt/anime-prompt-2a7dec94', destination: '/prompts/anime', permanent: true },
      { source: '/prompt/anime-prompt-c1ed5e6e', destination: '/prompts/anime', permanent: true },
      { source: '/prompt/long-black-hair-2ed92766', destination: '/prompts/hairstyle', permanent: true },
      { source: '/prompt/chatgpt-base-r-programming', destination: '/prompts/programming', permanent: true },
      { source: '/prompt/dalle-funk-boy-1980s-film-style', destination: '/prompts/creative', permanent: true },
    ]
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
