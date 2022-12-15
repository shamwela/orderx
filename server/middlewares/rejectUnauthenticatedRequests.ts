import type { Request, Response, NextFunction } from 'express'
import jwtLibrary from 'jsonwebtoken'

export function rejectUnauthenticatedRequests(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const jwt = request.cookies?.jwt
  const message = 'Please log in first.'
  if (typeof jwt !== 'string' || jwt === '') {
    return response.status(401).json({ message })
  }

  const jwtSecret = process.env.JWT_SECRET as string
  try {
    jwtLibrary.verify(jwt, jwtSecret)
  } catch (error) {
    // Invalid JWT token
    console.error(error)
    return response.status(401).json({ message })
  }
  next()
}
