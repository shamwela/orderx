import { prisma } from './prisma'
import { restaurants, users, products } from './seedData'

async function main() {
  await prisma.restaurant.deleteMany()
  await prisma.user.deleteMany()
  await prisma.product.deleteMany()

  await prisma.restaurant.createMany({ data: restaurants })
  await prisma.user.createMany({ data: users })
  await prisma.product.createMany({ data: products })

  await prisma.$disconnect()
}
main()
