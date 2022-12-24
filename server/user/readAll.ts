import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const readAllUsers: Handler = async (request, response) => {
  const users = await prisma.user.findMany()
  return response.json(users)
}
