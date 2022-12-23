import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const readAllOrders: Handler = async (request, response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { pending: true },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })
    return response.json(orders)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Database error.' })
  }
}
