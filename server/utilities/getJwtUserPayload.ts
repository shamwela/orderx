import type { Request } from 'express'
import jwtLibrary from 'jsonwebtoken'
import type { JwtUserPayload } from '../types/JwtUserPayload'

export function getJwtUserPayload(request: Request) {
  const jwt = request.cookies?.jwt
  const jwtSecret = process.env.JWT_SECRET as string
  const jwtUserPayload = jwtLibrary.verify(jwt, jwtSecret) as JwtUserPayload
  return jwtUserPayload
}
