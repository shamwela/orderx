import { clientDomain } from './clientDomain'
import jwtLibrary from 'jsonwebtoken'
import type { User } from '@prisma/client'
import type { Response } from 'express'

export function setJwtCookie(user: User, response: Response) {
  const { id, role } = user
  const jwtSecret = process.env.JWT_SECRET as string
  const jwt = jwtLibrary.sign({ id, role }, jwtSecret)
  const sixMonthsInMilliseconds = 15778800000
  return response
    .status(200)
    .cookie('jwt', jwt, {
      domain: clientDomain,
      // To prevent cross site scripting attacks,
      // disallow accessing this cookie using JavaScript
      httpOnly: true,
      secure: true,
      maxAge: sixMonthsInMilliseconds,
    })
    .json({ success: true })
}
