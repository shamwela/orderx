import { inferRouterOutputs, TRPCError } from '@trpc/server'
import type { AppRouter } from 'server/trpc/routers'

export type RouterOutput = inferRouterOutputs<AppRouter>