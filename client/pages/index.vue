<script setup lang="ts">
useTitle('OrderX')
const jwt = localStorage.getItem('jwt')

function logout() {
  localStorage.removeItem('jwt')
  localStorage.removeItem('role')
  window.location.reload()
}
</script>

<template>
  <main class="flex justify-center">
    <div class="flex flex-col gap-y-4 items-center">
      <h1>OrderX</h1>
      <button v-if="jwt" @click="logout" class="danger">Logout</button>
      <div v-else class="flex flex-col gap-y-[inherit] items-center">
        <NuxtLink to="/login" class="button">Login</NuxtLink>
        <NuxtLink to="/register" class="button">Register</NuxtLink>
      </div>
    </div>
  </main>
</template>
