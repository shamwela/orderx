<script setup lang="ts">
const restaurantId = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)

async function register() {
  const { error } = await useFetch('/api/user', {
    method: 'post',
    body: {
      restaurantId: 123,
      password: password.value,
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
  <form @submit.prevent="register">
    <label for="restaurantId">Restaurant ID</label>
    <input
      v-model="restaurantId"
      name="restaurantId"
      id="restaurantId"
      type="text"
      max="20"
      required
    />

    <label for="password">Password</label>
    <input
      v-model="password"
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
