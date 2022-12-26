<script setup lang="ts">
useTitle('Cook')
const { error, data: orders } = await useMyFetch<any>('/order')
if (error.value) {
  handleError(error)
}
</script>

<template>
  <span v-if="error">
    Couldn't fetch the orders. Please contact your admin.
  </span>
  <div v-else class="flex flex-col gap-y-[inherit]">
    <h1>Cook</h1>
    <div v-for="{ tableNumber, type, products } in orders" class='flex flex-col gap-y-[inherit]'>
      <h2>Table number {{ tableNumber }}</h2>
      <span>Order type = {{ type }}</span>
      <div v-for="{ product, quantity } in products">
        {{ product.name }} x {{ quantity }}
      </div>
    </div>
  </div>
</template>
