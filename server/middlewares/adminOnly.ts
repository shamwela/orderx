import { JwtUserPayload } from './../types/JwtUserPayload'
import type { Request, Response, NextFunction } from 'express'
import jwtLibrary from 'jsonwebtoken'

export function adminOnly(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const jwt = request.cookies?.jwt
  const jwtSecret = process.env.JWT_SECRET as string
  let jwtUserPayload: JwtUserPayload
  try {
    jwtUserPayload = jwtLibrary.verify(jwt, jwtSecret) as JwtUserPayload
  } catch (error) {
    // Invalid JWT token
    console.error(error)
    return response.status(401).json({ message: 'Please log in first.' })
  }
  const { role } = jwtUserPayload
  if (role !== 'admin') {
    return response
      .status(403)
      .json({ message: 'Only admins are allowed to do this action.' })
  }
  next()
}
