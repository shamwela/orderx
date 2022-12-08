import { z } from 'zod'
import { procedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { prisma } from '@/prisma/prisma'

export const register = procedure
  .input(
    z.object({
      restaurantName: z.string().max(20).trim(),
      email: z.string().min(3).max(254).trim(),
      password: z.string().min(8).max(100),
    })
  )
  .mutation(async ({ input }) => {
    const { restaurantName, email, password } = input
    const emailCount = await prisma.restaurant.count({
      where: {
        email,
      },
    })
    if (emailCount === 1) {
      throw new TRPCError({
        message: 'Email already registered.',
        code: 'BAD_REQUEST',
      })
    }
    try {
      const restaurant = await prisma.restaurant.create({
        data: {
          name: restaurantName,
          email,
        },
      })
      const restaurantId = restaurant.id
      await prisma.user.create({
        data: {
          id: 'admin',
          name: 'Admin',
          role: 'admin',
          restaurantId,
          password,
        },
      })
    } catch (error) {
      throw new TRPCError({
        message: 'Database or Prisma error',
        code: 'INTERNAL_SERVER_ERROR',
      })
    }
    return { success: true }
  })
