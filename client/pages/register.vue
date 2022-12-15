<script setup lang="ts">
const loggedIn = useLoggedIn()
if (loggedIn) {
  // Later, redirect cashier, cook, admin accordingly
  await navigateTo('/cashier')
}

const pending = ref(false)

async function registerAccount(event: Event) {
  pending.value = true

  const restaurantName = getValueFromEvent(event, 'restaurantName')
  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')
  const { error } = await useMyFetch('register', {
    body: { restaurantName, email, password },
  })
  pending.value = false
  if (error) {
    handleError(error)
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
