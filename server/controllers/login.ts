import type { Request, Response } from 'express'
import { prisma } from '../prisma/prismaClient'
import bcrypt from 'bcrypt'

export async function login(request: Request, response: Response) {
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
  const passwordInTheDatabase = user.password
  const passwordMatched = await bcrypt.compare(password, passwordInTheDatabase)
  if (!passwordMatched) {
    return response.status(401).json({ message: 'Wrong password.' })
  }
  return response.status(200).cookie('test', 123)
}
