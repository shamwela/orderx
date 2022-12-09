import { Prisma } from '@prisma/client'

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

export const users: Prisma.UserCreateManyInput[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'myasabei@gmail.com',
    password: 'myasabei@gmail.com',
    role: 'admin',
    restaurantId: '1',
  },
  {
    id: '2',
    name: 'Aung Aung',
    email: 'aungaung@gmail.com',
    password: 'aungaung@gmail.com',
    role: 'cashier',
    restaurantId: '1',
  },
]

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
