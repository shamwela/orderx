import { procedure } from '../trpc'
import { prisma } from '~~/prisma/prisma'

export const getAllProducts = procedure.query(() => prisma.product.findMany())
