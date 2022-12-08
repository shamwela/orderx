<script setup lang="ts">
import { TRPCClientError } from '@trpc/client'
import { inferRouterOutputs, TRPCError } from '@trpc/server'
import type { AppRouter } from '@/server/trpc/routers'

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

  type RouterOutput = inferRouterOutputs<AppRouter>
  type RegisterOutput = RouterOutput['register']
  type ErrorOutput = TRPCClientError<AppRouter>
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

  if (error instanceof TRPCError) {
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

    <label for="email">Email</label>
    <input
      name="email"
      id="email"
      type="email"
      minlength="3"
      maxlength="254"
      required
    />

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
