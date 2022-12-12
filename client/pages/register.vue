<script setup lang="ts">
import type { TRPCError } from '@trpc/server'

const pending = ref(false)

async function registerAccount(event: Event) {
  pending.value = true

  const restaurantName = getValueFromEvent(event, 'restaurantName')
  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')
  const { $client } = useNuxtApp()
  try {
    await $client.register.mutate({
      restaurantName,
      email,
      password,
    })
  } catch (error) {
    pending.value = false
    console.error(error)
    const { message } = error as TRPCError
    alert(message)
    return
  }
  pending.value = false
  alert('Register success.')
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
