import { z } from 'zod'
import { procedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { prisma } from '~~/prisma/prisma'
import { emailSchema } from '~~/utilities/emailSchema'
import { passwordSchema } from '~~/utilities/passwordSchema'
import bcrypt from 'bcrypt'

export const login = procedure
  .input(
    z.object({
      email: emailSchema,
      password: passwordSchema,
    })
  )
  .mutation(async ({ input }) => {
    const { email, password } = input
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new TRPCError({
        message: `No account with the email ${email}.`,
        code: 'BAD_REQUEST',
      })
    }
    const passwordInTheDatabase = user.password
    const passwordMatched = await bcrypt.compare(
      password,
      passwordInTheDatabase
    )
    if (!passwordMatched) {
      throw new TRPCError({
        message: 'Wrong password.',
        code: 'UNAUTHORIZED',
      })
    }
    return { success: true }
  })
