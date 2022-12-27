import { JwtUserPayload } from './../types/JwtUserPayload'
import type { Handler } from 'express'
import { prisma } from '../prisma/prismaClient'
import bcrypt from 'bcrypt'
import { generateJwt } from '../utilities/generateJwt'

export const login: Handler = async (request, response) => {
  type LoginInput = {
    email: string
    password: string
  }
  const { email, password }: LoginInput = request.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return response
      .status(400)
      .json({ message: `No account with the email ${email}.` })
  }
  const inputPassword = password
  const passwordInTheDatabase = user.password
  const passwordMatched = await bcrypt.compare(
    inputPassword,
    passwordInTheDatabase
  )
  if (!passwordMatched) {
    return response.status(401).json({ message: 'Wrong password.' })
  }
  const { id, role, restaurantId } = user
  const jwtUserPayload: JwtUserPayload = { id, role, restaurantId }
  const jwt = generateJwt(jwtUserPayload)

  return response.json({ jwt, role })
}
