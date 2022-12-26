import { createProduct } from './create'
import { readProduct } from './read'
import { updateProduct } from './update'
import { deleteProduct } from './delete'
import { Router } from 'express'
import { adminOnly } from '../middlewares/adminOnly'

export const productRouter = Router()
productRouter.post('/', adminOnly, createProduct)
productRouter.get('/', readProduct)
productRouter.put('/', adminOnly, updateProduct)
productRouter.delete('/', adminOnly, deleteProduct)
