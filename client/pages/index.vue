<script setup lang="ts">
async function logout() {
  await useMyFetch('/logout')
}
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <h1>OrderX</h1>
    <button v-if="role" @click="logout">Logout</button>
    <div v-else class="flex flex-col gap-y-[inherit]">
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/register">Register</NuxtLink>
    </div>
  </div>
</template>
