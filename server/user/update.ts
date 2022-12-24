import type { Role } from '@prisma/client'
import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'

export const updateUser: Handler = async (request, response) => {
  type Body = {
    id: string
    name: string
    email: string
    role: Role
  }
  const { id, name, email, role }: Body = request.body
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        role,
      },
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Database error.' })
  }
  return response.json({ success: true })
}
