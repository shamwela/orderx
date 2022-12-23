import { sign } from 'jsonwebtoken'
import type { JwtUserPayload } from '../types/JwtUserPayload'

export function generateJwt(jwtUserPayload: JwtUserPayload) {
  const jwtSecret = process.env.JWT_SECRET as string
  const jwt = sign(jwtUserPayload, jwtSecret)
  return jwt
}
