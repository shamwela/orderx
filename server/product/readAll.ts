import type { Request, Response } from 'express'
import { prisma } from '../prisma/prismaClient'

export async function readAllProducts(request: Request, response: Response) {
  const products = await prisma.product.findMany()
  return response.status(200).json(products)
}
