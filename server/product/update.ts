import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const updateProduct: Handler = async (request, response) => {
  type Body = {
    id: string
    name: string
    price: string
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
