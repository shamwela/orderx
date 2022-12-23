<script setup lang="ts">
useTitle('OrderX register')
const pending = ref(false)

async function registerAccount(event: Event) {
  pending.value = true

  const restaurantName = getValueFromEvent(event, 'restaurantName')
  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')
  const { error, data: jwt } = await useMyFetch<string>('/register', {
    body: {
      restaurantName,
      email,
      password,
    },
  })
  pending.value = false
  if (error.value || typeof jwt.value !== 'string') {
    handleError(error)
    return
  }
  localStorage.setItem('jwt', jwt.value)
  // This app always register an admin account
  localStorage.setItem('role', 'admin')
  await navigateTo('/product')
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
      maxlength="20"
      required
    />
    <EmailInputGroup />
    <PasswordInputGroup />

    <button type="submit">
      <span v-if="pending">Registering...</span>
      <span v-else>Register</span>
    </button>
  </form>
  <NuxtLink to="login">Login</NuxtLink>
</template>
