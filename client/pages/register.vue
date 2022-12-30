<script setup lang="ts">
useTitle('OrderX register')
const pending = ref(false)

async function registerAccount(event: Event) {
  pending.value = true

  const restaurantName = getValueFromEvent(event, 'restaurantName')
  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')
  const { error, data: jwt } = await useMyFetch<string>('/register', {
    method: 'post',
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
  <h1>OrderX register</h1>
  <form @submit.prevent="registerAccount" class="flex flex-col gap-y-4">
    <input
      name="restaurantName"
      placeholder="Restaurant name"
      aria-label="Restaurant name"
      type="text"
      maxlength="20"
      required
    />
    <EmailInput />
    <PasswordInput />
    <button type="submit">
      <span v-if="pending">Registering...</span>
      <span v-else>Register</span>
    </button>
  </form>
</template>
