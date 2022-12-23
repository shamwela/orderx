import { createProduct } from './create'
import { readProduct } from './read'
import { readAllProducts } from './readAll'
import { updateProduct } from './update'
import { deleteProduct } from './delete'
import { Router } from 'express'
import { adminOnly } from '../middlewares/adminOnly'
import { rejectUnauthenticatedRequests } from '../middlewares/rejectUnauthenticatedRequests'

export const productRouter = Router()
productRouter.post('/create', adminOnly, createProduct)
productRouter.get('/read-all', rejectUnauthenticatedRequests, readAllProducts)
productRouter.get('/read', rejectUnauthenticatedRequests, readProduct)
productRouter.put('/update', adminOnly, updateProduct)
productRouter.delete('/delete', adminOnly, deleteProduct)
