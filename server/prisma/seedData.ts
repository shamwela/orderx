import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'

export const restaurants: Prisma.RestaurantCreateManyInput[] = [
  {
    id: '1',
    name: 'Mya Sabei',
  },
  {
    id: '2',
    name: 'Yadanar',
  },
]

export let users: Prisma.UserCreateManyInput[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'myasabei@gmail.com',
    // Will add hashed password below
    password: '',
    role: 'admin',
    restaurantId: '1',
  },
  {
    id: '2',
    name: 'Aung Aung',
    email: 'aungaung@gmail.com',
    password: '',
    role: 'cashier',
    restaurantId: '1',
  },
]
const saltRounds = 10
bcrypt.hash('password123', saltRounds, function (error, hashedPassword) {
  if (error.value) {
    console.error(error)
    return
  }
  // For all user, add hashed passwords
  users.forEach((user) => (user.password = hashedPassword))
})

export const products: Prisma.ProductCreateManyInput[] = [
  {
    id: '1',
    name: 'Tea',
    cost: 0.5,
    price: 1,
    restaurantId: '1',
  },
  {
    id: '2',
    name: 'Fried rice',
    cost: 1,
    price: 2,
    restaurantId: '1',
  },
]
