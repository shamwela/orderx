import { Router } from 'express'
import { createOrder } from './create'
import { readAllOrders } from './readAll'

export const orderRouter = Router()
orderRouter.post('/create',  createOrder)
orderRouter.get('/read-all', readAllOrders)
