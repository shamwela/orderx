import { createProduct } from '../controllers/product/create'
import { readProduct } from '../controllers/product/read'
import { readAllProducts } from '../controllers/product/readAll'
import { updateProduct } from '../controllers/product/update'
import { deleteProduct } from '../controllers/product/delete'
import express from 'express'
import { adminOnly } from '../middlewares/adminOnly'

export const productRouter = express.Router()
productRouter.post('/create', adminOnly, createProduct)
productRouter.get('/read-all', readAllProducts)
productRouter.get('/read', readProduct)
productRouter.put('/update', adminOnly, updateProduct)
productRouter.delete('/delete', adminOnly, deleteProduct)
