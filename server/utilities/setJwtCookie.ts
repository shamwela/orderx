import { clientDomain } from './clientDomain'
import jwtLibrary from 'jsonwebtoken'
import type { User } from '@prisma/client'
import type { Response } from 'express'
import type { JwtUserPayload } from '../types/JwtUserPayload'

export function setJwtCookie(user: User, response: Response) {
  const { id, role } = user
  const jwtUserPayload: JwtUserPayload = { id, role }
  const jwtSecret = process.env.JWT_SECRET as string
  const jwt = jwtLibrary.sign(jwtUserPayload, jwtSecret)
  const sixMonthsInMilliseconds = 15778800000
  return response
    .status(200)
    .cookie('jwt', jwt, {
      domain: clientDomain,
      maxAge: sixMonthsInMilliseconds,
      sameSite: 'none',
      secure: true,
    })
    .json({ success: true })
}
