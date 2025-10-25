import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | null = null

export function getPrisma() {
  if (!prismaInstance) {
    prismaInstance = global.prisma || new PrismaClient()
    if (process.env.NODE_ENV !== 'production') {
      global.prisma = prismaInstance
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
