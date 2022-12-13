import type { Request, Response } from 'express'
import { prisma } from '../prisma/prismaClient'

export async function order(request: Request, response: Response) {
  // Get real cashier ID from the client side later
  const cashierId = '1'

  const transaction = await prisma.transaction.create({
    data: {
      cashierId,
    },
  })
  const transactionId = transaction.id

  type CartItem = {
    id: string
    name: string
    quantity: number
  }
  const cart: CartItem[] = request.body
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
  return response.status(200).json({ success: true })
}
