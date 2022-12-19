import type { Request, Response } from 'express'

export async function logout(request: Request, response: Response) {
  return response.clearCookie('jwt').clearCookie('role').json({ success: true })
}
