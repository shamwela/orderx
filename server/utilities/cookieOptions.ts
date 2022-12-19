import type { CookieOptions } from 'express'
import { clientDomain } from './clientDomain'

export const cookieOptions: CookieOptions = {
  domain: clientDomain,
  maxAge: 15778800000, // 6 months in milliseconds
  sameSite: 'none',
  secure: true,
}
