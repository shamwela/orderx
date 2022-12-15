import type { Role } from '@prisma/client'

export type JwtUserPayload = {
  id: string
  role: Role
}
