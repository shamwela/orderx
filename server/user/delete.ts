import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const deleteUser: Handler = async (request, response) => {
  type Body = {
    id: string
  }
  const body: Body = request?.body
  const { id } = body
  try {
    await prisma.user.delete({ where: { id } })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Database error.' })
  }
  return response.json({ success: true })
}
