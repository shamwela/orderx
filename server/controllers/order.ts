import type { Request, Response } from 'express'
import { prisma } from '../prisma/prismaClient'
import { getJwtUserPayload } from '../utilities/getJwtUserPayload'

export async function order(request: Request, response: Response) {
  const { id, role } = getJwtUserPayload(request)
  if (role !== 'cashier') {
    return response
      .status(403)
      .json({ message: 'Only cashiers are allowed to order.' })
  }
  const cashierId = id

  const order = await prisma.order.create({
    data: {
      cashierId,
      // Get the order type from the client later
      type: 'dine_in',
    },
  })
  const orderId = order.id

  type CartItem = {
    id: string
    name: string
    quantity: number
  }
  const cart: CartItem[] = request.body
  cart.forEach(async (cartItem) => {
    const { id, quantity } = cartItem
    await prisma.ordersOnProducts.create({
      data: {
        orderId,
        productId: id,
        quantity,
      },
    })
  })
  return response.status(200).json({ success: true })
}
