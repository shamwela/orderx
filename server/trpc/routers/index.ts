import { router } from '../trpc'
import { register } from '../procedures/register'
import { login } from '../procedures/login'

export const appRouter = router({
  register,
  login
})

export type AppRouter = typeof appRouter
