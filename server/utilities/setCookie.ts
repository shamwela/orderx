import type { Response } from 'express'
import { cookieOptions } from './cookieOptions'

export function setCookie(name: string, value: string, response: Response) {
  response.cookie(name, value, cookieOptions)
}
