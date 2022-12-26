import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'
import type { Product } from '@prisma/client'
import { getJwtUserPayload } from './../utilities/getJwtUserPayload'

export const readProduct: Handler = async (request, response) => {
  type Query = {
    id: string
  }
  const { id } = request.query as Query

  // If a product ID is given, read only 1 product
  if (id) {
    let product: Product | null
    try {
      product = await prisma.product.findUnique({ where: { id } })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Database error.' })
    }
    if (!product) {
      return response
        .json(400)
        .json({ message: `Product with the ID ${id} was not found.` })
    }
    return response.json(product)
  }

  const { restaurantId } = getJwtUserPayload(request)
  const products = await prisma.product.findMany({ where: { restaurantId } })
  return response.status(200).json(products)
}
