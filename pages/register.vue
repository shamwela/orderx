<script setup lang="ts">
const errorMessage = ref<string | null>(null)

async function registerAccount(event: Event) {
  const { elements } = event.currentTarget as any
  function getValue(name: string) {
    return elements.namedItem(name).value as string
  }
  const restaurantName = getValue('restaurantName')
  const email = getValue('email')
  const password = getValue('password')
  console.log({ restaurantName, email, password })
  return

  const { error } = await useFetch('/api/register', {
    method: 'post',
    body: {
      restaurantName,
      email,
      password,
    },
  })
  if (error) {
    errorMessage.value = error.value?.statusMessage || 'Unknown error.'
    return
  }
}
</script>

<template>
  <h1>OrderX Register</h1>
  <form @submit.prevent="registerAccount">
    <label for="restaurantName">Restaurant name</label>
    <input
      name="Restaurant name"
      id="restaurantName"
      type="text"
      max="20"
      required
    />

    <label for="email">Email</label>
    <input name="email" id="email" type="email" max="254" required />

    <label for="password">Password</label>
    <input
      name="password"
      id="password"
      type="password"
      min="8"
      max="100"
      required
    />

    <button type="submit">Register</button>
  </form>
  <span v-if="errorMessage">{{ errorMessage }}</span>
</template>
