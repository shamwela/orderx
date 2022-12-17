<script setup lang="ts">
import { Product } from '~~/types/Product'

const { error, data: products } = await useMyFetch<Product[]>(
  '/product/read-all'
)
if (error.value) {
  handleError(error)
}

async function deleteProduct(id: string) {
  const { error } = await useMyFetch('/product/delete', {
    method: 'delete',
    body: { id },
  })
  if (error.value) {
    handleError(error)
    return
  }
  await refreshNuxtData()
  alert('Delete successful.')
}
</script>

<template>
  <span v-if="error">Couldn't fetch the products.</span>
  <div v-else>
    <h1>Products</h1>

    <NuxtLink to="/product/create">Create a new product</NuxtLink>
    <hr />

    <div
      v-for="{ id, name, price } in products"
      class="flex gap-x-4 items-center"
    >
      <span>{{ name }}</span>
      <span>${{ price }}</span>
      <NuxtLink :to="'/product/edit/' + id">Edit</NuxtLink>
      <button @click="deleteProduct(id)">Delete</button>
    </div>
  </div>
</template>
