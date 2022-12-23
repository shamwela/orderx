import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'
import { getJwtUserPayload } from '../utilities/getJwtUserPayload'
import type { OrderType } from '@prisma/client'

export const createOrder: Handler = async (request, response) => {
  const { id, role } = getJwtUserPayload(request)
  if (role !== 'cashier') {
    return response
      .status(403)
      .json({ message: 'Only cashiers are allowed to order.' })
  }
  const cashierId = id

  type CartItem = {
    id: string
    name: string
    quantity: number
  }
  type Body = {
    cart: CartItem[]
    orderType: OrderType
    tableNumber: number
  }
  const body: Body = request.body
  const { cart, orderType, tableNumber } = body
  const order = await prisma.order.create({
    data: {
      cashierId,
      type: orderType,
      tableNumber,
    },
  })
  const orderId = order.id

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
