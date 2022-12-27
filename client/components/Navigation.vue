<script setup lang="ts">
const jwt = localStorage.getItem('jwt')
async function logout() {
  localStorage.removeItem('jwt')
  localStorage.removeItem('role')
  await navigateTo('/')
  window.location.reload()
}
</script>

<template>
  <nav class="flex gap-x-8 justify-center items-center p-4">
    <NuxtLink to="/product">Products</NuxtLink>
    <NuxtLink to="/user">User</NuxtLink>
    <NuxtLink to="/cashier">Cashier page</NuxtLink>
    <NuxtLink to="/cook">Cook page</NuxtLink>
    <button v-if="jwt" @click="logout" class="danger">Logout</button>
  </nav>
</template>
