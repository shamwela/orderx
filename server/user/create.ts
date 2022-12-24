import type { Role } from '@prisma/client'
import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'
import { getJwtUserPayload } from '../utilities/getJwtUserPayload'

export const createUser: Handler = async (request, response) => {
  type UserData = {
    name: string
    email: string
    password: string
    role: Role
  }
  const userData: UserData = request.body
  const { restaurantId } = getJwtUserPayload(request)

  try {
    await prisma.user.create({
      data: {
        ...userData,
        restaurantId,
      },
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Database error.' })
  }
  return response.json({ success: true })
}
