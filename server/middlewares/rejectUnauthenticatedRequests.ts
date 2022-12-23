import type { Handler } from 'express'
import { verify } from 'jsonwebtoken'

export const rejectUnauthenticatedRequests: Handler = (
  request,
  response,
  next
) => {
  const jwt = request.headers?.jwt
  const message = 'Please log in first.'
  if (typeof jwt !== 'string') {
    console.error('Invalid JWT.')
    return response.status(401).json({ message })
  }
  const jwtSecret = process.env.JWT_SECRET as string
  try {
    verify(jwt, jwtSecret)
  } catch (error) {
    // Invalid JWT token
    console.error(error)
    return response.status(401).json({ message })
  }
  next()
}
