<script setup lang="ts">
const jwt = localStorage.getItem('jwt')
const role = useRole()
async function logout() {
  localStorage.removeItem('jwt')
  localStorage.removeItem('role')
  await navigateTo('/')
  window.location.reload()
}
</script>

<template>
  <nav
    v-if="jwt"
    class="flex gap-x-8 justify-center items-center px-4 py-3 bg-gray-200"
  >
    <NuxtLink v-if="role === 'admin'" to="/product">Products</NuxtLink>
    <NuxtLink v-if="role === 'admin'" to="/user">User</NuxtLink>
    <NuxtLink v-if="role === 'cashier'" to="/cashier">Cashier page</NuxtLink>
    <NuxtLink v-if="role === 'cook'" to="/cook">Cook page</NuxtLink>
    <button @click="logout" class="danger">Logout</button>
  </nav>
</template>
