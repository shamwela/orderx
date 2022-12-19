import { Router } from 'express'
import { rejectUnauthenticatedRequests } from '../middlewares/rejectUnauthenticatedRequests'
import { createOrder } from './create'
import { readAllOrders } from './readAll'

export const orderRouter = Router()
orderRouter.post('/create', rejectUnauthenticatedRequests, createOrder)
orderRouter.get('/read-all', readAllOrders)
