<script setup lang="ts">
const pending = ref(false)

async function login(event: Event) {
  pending.value = true

  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')

  const { error } = await useMyFetch('/login', {
    method: 'post',
    body: {
      email,
      password,
    },
  })
  pending.value = false

  if (error.value) {
    handleError(error)
    return
  }

  await navigateAccordingToRole()
}
</script>

<template>
  <h1>OrderX Login</h1>
  <form @submit.prevent="login" class="flex flex-col gap-y-4">
    <EmailInputGroup />
    <PasswordInputGroup />
    <button type="submit">
      <span v-if="pending">Logging in...</span>
      <span v-else>Login</span>
    </button>
  </form>
  <NuxtLink to="register">Register</NuxtLink>
</template>
