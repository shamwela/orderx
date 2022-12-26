import { Router } from 'express'
import { createOrder } from './create'
import { readOrders } from './read'

export const orderRouter = Router()
orderRouter.post('/', createOrder)
orderRouter.get('/', readOrders)
