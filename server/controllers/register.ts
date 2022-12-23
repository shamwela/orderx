import type { Request, Response } from 'express'
import { prisma } from '../prisma/prismaClient'
import bcrypt from 'bcrypt'
import { JwtUserPayload } from '../types/JwtUserPayload'
import { generateJwt } from '../utilities/generateJwt'

export async function register(request: Request, response: Response) {
  type RegisterInput = {
    restaurantName: string
    email: string
    password: string
  }
  const { restaurantName, email, password }: RegisterInput = request.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (user) {
    return response.status(400).json({
      message:
        'You already have an account with that email. Please login instead.',
    })
  }
  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantName,
      },
    })
    const restaurantId = restaurant.id
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name: 'Admin',
        role: 'admin',
        email,
        restaurantId,
        password: hashedPassword,
      },
    })
    const { id, role } = user
    const jwtUserPayload: JwtUserPayload = {
      id,
      role,
      restaurantId,
    }
    const jwt = generateJwt(jwtUserPayload)
    return response.json(jwt)
  } catch (error) {
    return response.status(500).json({
      message: 'Database or Prisma error.',
    })
  }
}
