import type { Request, Response } from 'express'
import { prisma } from '../../prisma/prismaClient'
import { getJwtUserPayload } from '../../utilities/getJwtUserPayload'

export async function createProduct(request: Request, response: Response) {
  type ProductInput = {
    name: string
    price: number
  }
  const productInput: ProductInput | undefined = request.body
  if (!productInput) {
    return response
      .status(400)
      .json({ message: 'Provide the product input in the request body.' })
  }
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
