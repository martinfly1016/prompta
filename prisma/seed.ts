import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create default categories
  const categories = [
    {
      name: 'ライティング',
      slug: 'writing',
      description: 'テキスト作成とライティングに関するプロンプト',
      icon: '✍️',
    },
    {
      name: 'プログラミング',
      slug: 'programming',
      description: 'コード生成とプログラミング支援',
      icon: '💻',
    },
    {
      name: 'ビジネス',
      slug: 'business',
      description: 'ビジネスと企画に関するプロンプト',
      icon: '💼',
    },
    {
      name: '教育',
      slug: 'education',
      description: '学習と教育サポート',
      icon: '📚',
    },
    {
      name: 'クリエイティブ',
      slug: 'creative',
      description: '創造的な思考と表現',
      icon: '🎨',
    },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
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
    console.log(`✅ Created admin user: ${adminEmail}`)
  } else {
    console.log(`⏭️  Admin user already exists: ${adminEmail}`)
  }

  console.log('✅ Seeding completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
