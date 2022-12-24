import { createUser } from './create'
import { readUser } from './read'
import { readAllUsers } from './readAll'
import { updateUser } from './update'
import { deleteUser } from './delete'
import { Router } from 'express'
import { adminOnly } from '../middlewares/adminOnly'

export const userRouter = Router()
userRouter.use(adminOnly)
userRouter.post('/create', createUser)
userRouter.get('/read', readUser)
userRouter.get('/read-all', readAllUsers)
userRouter.put('/update', updateUser)
userRouter.delete('/delete', deleteUser)
