import { getJwtUserPayload } from './../utilities/getJwtUserPayload'
import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const readAllProducts: Handler = async (request, response) => {
  const { restaurantId } = getJwtUserPayload(request)
  const products = await prisma.product.findMany({ where: { restaurantId } })
  return response.status(200).json(products)
}
