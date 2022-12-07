import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  // to-do: trim values
  const { restaurantName, email, password } = await readBody(event)
  console.log({ restaurantName, email, password })

  if (typeof password !== 'string') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Password should be a string.',
    })
  }
  const prisma = new PrismaClient()
  const emailCount = await prisma.restaurant.count({
    where: {
      email,
    },
  })
  if (emailCount === 1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Email already registered.',
    })
  }
  return { success: true }
})
