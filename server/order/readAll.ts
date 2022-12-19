import type { Request, Response } from 'express'
import { prisma } from '../prisma/prismaClient'

export async function readAllOrders(request: Request, response: Response) {
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
