import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | null = null

export function getPrisma() {
  if (!prismaInstance) {
    try {
      prismaInstance = global.prisma || new PrismaClient()
      if (process.env.NODE_ENV !== 'production') {
        global.prisma = prismaInstance
      }
    } catch (error) {
      console.error('Failed to initialize Prisma client:', error)
      throw error
    }
  }
  return prismaInstance
}

// For backwards compatibility
export const prisma = new Proxy({} as PrismaClient, {
  get: (_target, prop) => {
    return getPrisma()[prop as keyof PrismaClient]
  },
})

export default prisma
