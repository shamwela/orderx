import { router } from '../trpc'
import { register } from '../procedures/register'
import { login } from '../procedures/login'
import { getAllProducts } from '../procedures/product'
import { order } from '../procedures/order'

export const appRouter = router({
  register,
  login,
  getAllProducts,
  order,
})

export type AppRouter = typeof appRouter
