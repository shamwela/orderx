import type { Request, Response } from 'express'
import { prisma } from '../prisma/prismaClient'

export async function deleteProduct(request: Request, response: Response) {
  type RequestBody = {
    id: string
  }
  const body: RequestBody = request?.body
  const { id } = body
  try {
    await prisma.product.delete({ where: { id } })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Database error.' })
  }
  return response.json({ success: true })
}
