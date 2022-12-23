import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const readAllProducts: Handler = async (request, response) => {
  const products = await prisma.product.findMany()
  return response.status(200).json(products)
}
