import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const TOOLS = [
  { slug: 'stable-diffusion', name: 'Stable Diffusion', nameJa: 'ステーブルディフュージョン', icon: '🎨', color: '#7c3aed', order: 0 },
  { slug: 'midjourney', name: 'Midjourney', nameJa: 'ミッドジャーニー', icon: '🖼️', color: '#2563eb', order: 1 },
  { slug: 'chatgpt', name: 'ChatGPT', nameJa: 'チャットジーピーティー', icon: '💬', color: '#10a37f', order: 2 },
  { slug: 'claude', name: 'Claude', nameJa: 'クロード', icon: '🤖', color: '#d97706', order: 3 },
  { slug: 'dall-e', name: 'DALL-E', nameJa: 'ダリ', icon: '🎯', color: '#ef4444', order: 4 },
]

const CATEGORIES = [
  { name: 'ライティング', slug: 'writing', description: 'テキスト作成とライティングに関するプロンプト', icon: '✍️', order: 0 },
  { name: 'プログラミング', slug: 'programming', description: 'コード生成とプログラミング支援', icon: '💻', order: 1 },
  { name: 'ビジネス', slug: 'business', description: 'ビジネスと企画に関するプロンプト', icon: '💼', order: 2 },
  { name: '教育', slug: 'education', description: '学習と教育サポート', icon: '📚', order: 3 },
  { name: 'クリエイティブ', slug: 'creative', description: '創造的な思考と表現', icon: '🎨', order: 4 },
  { name: '髪型', slug: 'hairstyle', nameEn: 'Hairstyle', icon: '💇', order: 5 },
  { name: '服装', slug: 'clothing', nameEn: 'Clothing', icon: '👗', order: 6 },
  { name: 'コスプレ', slug: 'cosplay', nameEn: 'Cosplay', icon: '🎭', order: 7 },
  { name: 'アニメ', slug: 'anime', nameEn: 'Anime', icon: '🎌', order: 8 },
  { name: '色・カラー', slug: 'color', nameEn: 'Color', icon: '🎨', order: 9 },
  { name: '衣装・装飾', slug: 'costume', nameEn: 'Costume', icon: '👑', order: 10 },
  { name: '体型', slug: 'body-type', nameEn: 'Body Type', icon: '🧍', order: 11 },
  { name: 'カメラ・アングル', slug: 'camera', nameEn: 'Camera', icon: '📷', order: 12 },
]

async function main() {
  // Seed tools
  console.log('Seeding tools...')
  for (const tool of TOOLS) {
    await prisma.tool.upsert({
      where: { slug: tool.slug },
      create: tool,
      update: { name: tool.name, nameJa: tool.nameJa, icon: tool.icon, color: tool.color, order: tool.order },
    })
    console.log(`  Tool: ${tool.slug}`)
  }

  // Seed categories (old + new)
  console.log('Seeding categories...')
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: { name: cat.name, icon: cat.icon, order: cat.order },
    })
    console.log(`  Category: ${cat.slug}`)
  }

  // Create default admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme'

  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        name: 'Administrator',
        role: 'ADMIN',
        isActive: true,
      },
    })
    console.log(`Created admin user: ${adminEmail}`)
  } else {
    console.log(`Admin user already exists: ${adminEmail}`)
  }

  console.log('Seeding completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
