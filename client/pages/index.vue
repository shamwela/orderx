<script setup lang="ts">
useTitle('OrderX')
</script>

<template>
  <main class="flex justify-center">
    <div class="flex flex-col gap-y-4 items-center">
      <h1>OrderX</h1>
      <p>Restaurant management app</p>
      <div class="flex flex-col gap-y-[inherit] items-center">
        <NuxtLink to="/register" class="button">Register</NuxtLink>
        <NuxtLink to="/login" class="button">Login</NuxtLink>
      </div>
    </div>
  </main>
</template>
