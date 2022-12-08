<script setup lang="ts">
import type { RouterOutput } from '~~/types/RouterOutput'
import type { ErrorOutput } from '~~/types/ErrorOutput'

const pending = ref(false)
const errorMessage = ref<string | null>(null)

async function registerAccount(event: Event) {
  pending.value = true
  const { elements } = event.currentTarget as any
  function getValue(name: string) {
    return elements.namedItem(name).value as string
  }
  const restaurantName = getValue('restaurantName')
  const email = getValue('email')
  const password = getValue('password')

  type RegisterOutput = RouterOutput['register']
  const { $client } = useNuxtApp()

  const { data, error } = await useAsyncData<RegisterOutput, ErrorOutput>(() =>
    $client.register.mutate({
      restaurantName,
      email,
      password,
    })
  )
  if (data || error) {
    pending.value = false
  }

  if (error) {
    errorMessage.value = error.value?.message || 'Unknown error.'
    return
  }

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
    <Email />

    <label for="password">Password</label>
    <input
      name="password"
      id="password"
      type="password"
      minlength="8"
      maxlength="100"
      required
    />

    <button type="submit">
      <span v-if="pending">Registering...</span>
      <span v-else>Register</span>
    </button>
  </form>
  <span v-if="errorMessage">{{ errorMessage }}</span>
</template>
