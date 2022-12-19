import jwtLibrary from 'jsonwebtoken'
import type { Response } from 'express'
import type { JwtUserPayload } from '../types/JwtUserPayload'
import { setCookie } from './setCookie'

export function setJwtCookie(
  jwtUserPayload: JwtUserPayload,
  response: Response
) {
  const jwtSecret = process.env.JWT_SECRET as string
  const jwt = jwtLibrary.sign(jwtUserPayload, jwtSecret)
  setCookie('jwt', jwt, response)
}
