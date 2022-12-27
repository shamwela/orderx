<script setup lang="ts">
import type { Role } from '~~/types/Role'

useTitle('OrderX login')
const pending = ref(false)

async function login(event: Event) {
  pending.value = true

  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')

  const { error, data } = await useMyFetch('/login', {
    method: 'post',
    body: {
      email,
      password,
    },
  })
  pending.value = false
  const { jwt, role } = data.value as {
    jwt: string
    role: Role
  }
  if (error.value) {
    handleError(error)
    return
  }
  localStorage.setItem('jwt', jwt)
  localStorage.setItem('role', role)
  await navigateAccordingToRole()
}
</script>

<template>
  <h1>OrderX login</h1>
  <form @submit.prevent="login" class="flex flex-col gap-y-4">
    <EmailInputGroup />
    <PasswordInputGroup />
    <button type="submit">
      <span v-if="pending">Logging in...</span>
      <span v-else>Login</span>
    </button>
  </form>
</template>
