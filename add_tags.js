const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Get the first prompt
    const prompt = await prisma.prompt.findFirst();
    if (!prompt) {
      console.log('No prompt found');
      return;
    }
    
    console.log('Found prompt:', prompt.id, prompt.title);
    
    // Create or get tags
    const tags = [
      { name: '文章作成', slug: 'writing', color: 'blue' },
      { name: 'クリエイティブ', slug: 'creative', color: 'purple' },
      { name: 'プロフェッショナル', slug: 'professional', color: 'green' },
    ];
    
    const tagIds = [];
    for (const tag of tags) {
      const t = await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: { name: tag.name, slug: tag.slug, color: tag.color }
      });
      tagIds.push(t.id);
      console.log('Created/found tag:', t.name);
    }
    
    // Connect tags to prompt
    const updated = await prisma.prompt.update({
      where: { id: prompt.id },
      data: {
        tags: {
          connect: tagIds.map(id => ({ id }))
        }
      },
      include: { tags: true }
    });
    
    console.log('Updated prompt with tags:', updated.tags.length, 'tags');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
