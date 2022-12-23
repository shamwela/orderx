import type { Request } from 'express'
import { verify } from 'jsonwebtoken'
import type { JwtUserPayload } from '../types/JwtUserPayload'

export function getJwtUserPayload(request: Request) {
  const jwt = request.headers?.jwt as string
  const jwtSecret = process.env.JWT_SECRET as string
  const jwtUserPayload = verify(jwt, jwtSecret) as JwtUserPayload
  return jwtUserPayload
}
