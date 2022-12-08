import { TRPCClientError } from '@trpc/client'
import type { AppRouter } from 'server/trpc/routers'

export type ErrorOutput = TRPCClientError<AppRouter>
