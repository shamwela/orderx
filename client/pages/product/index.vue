<script setup lang="ts">
const { error, data: products } = await useProducts()
if (error.value) {
  handleError(error)
}

async function deleteProduct(id: string) {
  const { error } = await useMyFetch('/product', {
    method: 'delete',
    body: { id },
  })
  if (error.value) {
    handleError(error)
    return
  }
  location.reload()
}
</script>

<template>
  <span v-if="error">Couldn't fetch the products.</span>
  <div v-else>
    <h1>Products</h1>

    <NuxtLink to="/product/create" class="button">
      Create a new product
    </NuxtLink>

    <div
      v-for="{ id, name, price } in products"
      class="flex gap-x-4 items-center"
    >
      <span>{{ name }}</span>
      <span>${{ price }}</span>
      <NuxtLink :to="'/product/update/' + id">Edit</NuxtLink>
      <button @click="deleteProduct(id)">Delete</button>
    </div>
  </div>
</template>
