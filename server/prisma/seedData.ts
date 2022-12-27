import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'

export const restaurants: Prisma.RestaurantCreateManyInput[] = [
  {
    id: '1',
    name: 'Mya Sabei',
  },
]

export let users: Prisma.UserCreateManyInput[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'myasabei-admin@gmail.com',
    // Will add hashed password below
    password: '',
    role: 'admin',
    restaurantId: '1',
  },
  {
    id: '2',
    name: 'Aung Aung',
    email: 'myasabei-cashier@gmail.com',
    password: '',
    role: 'cashier',
    restaurantId: '1',
  },
  {
    id: '3',
    name: 'Bo Bo',
    email: 'myasabei-cook@gmail.com',
    password: '',
    role: 'cook',
    restaurantId: '1',
  },
]
const saltRounds = 10
bcrypt.hash('password123', saltRounds, function (error, hashedPassword) {
  if (error) {
    console.error(error)
    return
  }
  // For all users, add hashed passwords
  users.forEach(({ password }) => (password = hashedPassword))
})

export const products: Prisma.ProductCreateManyInput[] = [
  {
    id: '1',
    name: 'Tea',
    // Prices are in US dollars
    price: 0.3,
    restaurantId: '1',
  },
  {
    id: '2',
    name: 'Coffee',
    price: 0.3,
    restaurantId: '1',
  },
  {
    id: '3',
    name: 'Egg Fried Rice',
    price: 0.7,
    restaurantId: '1',
  },
  {
    id: '4',
    name: 'Rice Salad',
    price: 0.6,
    restaurantId: '1',
  },
  {
    id: '5',
    name: 'Noodle Salad',
    price: 0.7,
    restaurantId: '1',
  },
  {
    id: '6',
    name: 'Nangyi Salad',
    price: 0.7,
    restaurantId: '1',
  },
  {
    id: '7',
    name: 'Nanpyar Salad',
    price: 0.7,
    restaurantId: '1',
  },
  {
    id: '8',
    name: 'Shwe Taung Noodle',
    price: 0.7,
    restaurantId: '1',
  },
  {
    id: '9',
    name: 'Shan Noodle',
    price: 0.8,
    restaurantId: '1',
  },
  {
    id: '10',
    name: 'Noodle Soup',
    price: 0.8,
    restaurantId: '1',
  },
]
