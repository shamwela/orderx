import type { Request, Response } from 'express'
import { prisma } from '../prisma/prismaClient'
import { loggedIn } from '../utilities/loggedIn'

export async function getAllProducts(request: Request, response: Response) {
  if (!loggedIn(request)) {
    return response.status(401).json({ message: 'Please login first.' })
  }
  const products = await prisma.product.findMany()
  return response.status(200).json(products)
}
