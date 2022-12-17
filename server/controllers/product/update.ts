import type { Request, Response } from 'express'
import { prisma } from '../../prisma/prismaClient'

export async function updateProduct(request: Request, response: Response) {
  type Body = {
    id: string
    name: string
    price: number
  }
  const { id, name, price }: Body = request.body
  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
      },
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Database error.' })
  }
  return response.json({ success: true })
}
