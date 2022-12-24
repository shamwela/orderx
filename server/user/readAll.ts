import { getJwtUserPayload } from './../utilities/getJwtUserPayload'
import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const readAllUsers: Handler = async (request, response) => {
  const { restaurantId } = getJwtUserPayload(request)
  const users = await prisma.user.findMany({ where: { restaurantId } })
  return response.json(users)
}
