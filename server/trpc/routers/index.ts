import { router } from '../trpc'
import { register } from '../procedures/register'

export const appRouter = router({
  register,
})

export type AppRouter = typeof appRouter
