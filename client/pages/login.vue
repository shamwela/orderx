<script setup lang="ts">
const pending = ref(false)

async function login(event: Event) {
  pending.value = true

  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')
  try {
    await useMyFetch('login', {
      body: {
        email,
        password,
      },
      credentials: 'include'
    })
  } catch (error) {
    pending.value = false
    const message = getErrorMessage(error)
    alert(message)
    console.error(error)
    return
  }

  pending.value = false
  alert('Login success.')
}
</script>

<template>
  <h1>OrderX Login</h1>
  <form @submit.prevent="login">
    <EmailInputGroup />
    <PasswordInputGroup />
    <button type="submit">
      <span v-if="pending">Logging in...</span>
      <span v-else>Login</span>
    </button>
  </form>
  <NuxtLink to="register">Register</NuxtLink>
</template>
