import { z } from 'zod'
import { procedure } from '../trpc'
import { prisma } from '~~/prisma/prisma'

export const order = procedure
  .input(
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        quantity: z.number().min(1),
      })
    )
  )
  .mutation(async ({ input }) => {
    // Get real cashier ID from the client side later
    const cashierId = '1'

    const transaction = await prisma.transaction.create({
      data: {
        cashierId,
      },
    })
    const transactionId = transaction.id

    const cart = input
    cart.forEach(async (cartItem) => {
      const { id, quantity } = cartItem
      await prisma.transactionsOnProducts.create({
        data: {
          transactionId,
          productId: id,
          quantity,
        },
      })
    })
  })
