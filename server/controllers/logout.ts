import type { Handler } from 'express'

export const logout: Handler = (request, response) => {
  return response.clearCookie('jwt').clearCookie('role').json({ success: true })
}
