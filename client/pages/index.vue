<script setup lang="ts">
async function logout() {
  await useMyFetch('logout', { credentials: 'include' })
}
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <h1>OrderX</h1>
    <NuxtLink to="/register">Register</NuxtLink>
    <NuxtLink to="/login">Login</NuxtLink>
    <button @click="logout">Logout</button>
  </div>
</template>
