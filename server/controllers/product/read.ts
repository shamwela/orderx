import type { Request, Response } from 'express'
import { prisma } from '../../prisma/prismaClient'
import type { Product } from '@prisma/client'

export async function readProduct(request: Request, response: Response) {
  type Query = {
    id: string
  }
  const { id } = request.query as Query

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
