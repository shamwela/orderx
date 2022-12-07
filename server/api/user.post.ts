export default defineEventHandler(async (event) => {
  const { restaurantId, password } = await readBody(event)
  if (typeof restaurantId !== 'string') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Restaurant ID should be a string.',
    })
  }
  if (typeof password !== 'string') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Password should be a string.',
    })
  }
  return { success: true }
})
