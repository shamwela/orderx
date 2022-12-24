import { createProduct } from './create'
import { readProduct } from './read'
import { readAllProducts } from './readAll'
import { updateProduct } from './update'
import { deleteProduct } from './delete'
import { Router } from 'express'
import { adminOnly } from '../middlewares/adminOnly'

export const productRouter = Router()
productRouter.post('/create', adminOnly, createProduct)
productRouter.get('/read-all', readAllProducts)
productRouter.get('/read', readProduct)
productRouter.put('/update', adminOnly, updateProduct)
productRouter.delete('/delete', adminOnly, deleteProduct)
