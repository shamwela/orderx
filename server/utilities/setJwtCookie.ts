import { clientDomain } from './clientDomain'
import jwtLibrary from 'jsonwebtoken'
import type { Response } from 'express'
import type { JwtUserPayload } from '../types/JwtUserPayload'

export function setJwtCookie(
  jwtUserPayload: JwtUserPayload,
  response: Response
) {
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
