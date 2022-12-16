<script setup lang="ts">
const loggedIn = useLoggedIn()
if (loggedIn) {
  // Later, redirect cashier, cook, admin accordingly
  await navigateTo('/cashier')
}
// async function logout() {
//   await useMyFetch('/logout')
// }
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <h1>OrderX</h1>
    <!-- <button v-if="loggedIn" @click="logout">Logout</button> -->
    <div class="flex flex-col gap-y-[inherit]">
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/register">Register</NuxtLink>
    </div>
  </div>
</template>
