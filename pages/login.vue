<script setup lang="ts">
import type { TRPCError } from '@trpc/server'

const pending = ref(false)
const errorMessage = ref<string | null>(null)

async function login(event: Event) {
  pending.value = true

  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')
  const { $client } = useNuxtApp()
  try {
    await $client.login.mutate({
      email,
      password,
    })
  } catch (error) {
    const { message } = error as TRPCError
    errorMessage.value = message
    pending.value = false
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
