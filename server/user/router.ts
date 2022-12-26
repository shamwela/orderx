import { createUser } from './create'
import { readUser } from './read'
import { updateUser } from './update'
import { deleteUser } from './delete'
import { Router } from 'express'
import { adminOnly } from '../middlewares/adminOnly'

export const userRouter = Router()
userRouter.use(adminOnly)
userRouter.post('/', createUser)
userRouter.get('/', readUser)
userRouter.put('/', updateUser)
userRouter.delete('/', deleteUser)
