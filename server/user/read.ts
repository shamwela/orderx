import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'
import type { User } from '@prisma/client'

export const readUser: Handler = async (request, response) => {
  type Query = {
    id: string
  }
  const { id } = request.query as Query

  let user: User | null
  try {
    user = await prisma.user.findUnique({ where: { id } })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Database error.' })
  }
  if (!user) {
    return response
      .json(400)
      .json({ message: `User with the ID ${id} was not found.` })
  }
  return response.json(user)
}
