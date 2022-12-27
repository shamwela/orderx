import { getJwtUserPayload } from './../utilities/getJwtUserPayload'
import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const readOrders: Handler = async (request, response) => {
  const { restaurantId } = getJwtUserPayload(request)
  try {
    const orders = await prisma.order.findMany({
      where: {
        restaurantId,
        pending: true,
      },
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
