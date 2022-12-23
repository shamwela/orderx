import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'
import { getJwtUserPayload } from '../utilities/getJwtUserPayload'

export const createProduct: Handler = async (request, response) => {
  type ProductInput = {
    name: string
    price: number
  }
  const productInput: ProductInput = request.body
  const { restaurantId } = getJwtUserPayload(request)

  try {
    await prisma.product.create({
      data: {
        ...productInput,
        restaurantId,
      },
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Database error.' })
  }
  return response.json({ success: true })
}
