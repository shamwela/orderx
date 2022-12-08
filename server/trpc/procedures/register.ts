import { z } from 'zod'
import { procedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { prisma } from '~~/prisma/prisma'
import { emailSchema } from '~~/utilities/emailSchema'
import { passwordSchema } from '~~/utilities/passwordSchema'
import bcrypt from 'bcrypt'

export const register = procedure
  .input(
    z.object({
      restaurantName: z.string().max(20).trim(),
      email: emailSchema,
      password: passwordSchema,
    })
  )
  .mutation(async ({ input }) => {
    const { restaurantName, email, password } = input
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      throw new TRPCError({
        message: 'Email already registered.',
        code: 'BAD_REQUEST',
      })
    }
    try {
      const restaurant = await prisma.restaurant.create({
        data: {
          name: restaurantName,
        },
      })
      const hashedPassword = await bcrypt.hash(password, 10)
      const restaurantId = restaurant.id
      await prisma.user.create({
        data: {
          id: 'admin',
          name: 'Admin',
          role: 'admin',
          email,
          restaurantId,
          password: hashedPassword,
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
