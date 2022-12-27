<script setup lang="ts">
useTitle('Products')
const { error, data: products } = await useProducts()
if (error.value) {
  handleError(error)
}

async function deleteProduct(id: string) {
  if (!confirm('Are you sure you want to delete?')) {
    return
  }
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
  <div v-else class="flex flex-col gap-y-[inherit]">
    <h1>Products</h1>

    <NuxtLink to="/product/create" class="button">
      Create a new product
    </NuxtLink>

    <div
      v-for="{ id, name, price } in products"
      class="flex gap-x-8 items-center"
    >
      <span class="mr-auto">{{ name }}</span>
      <span>${{ price }}</span>
      <NuxtLink :to="'/product/update/' + id" class="button">Edit</NuxtLink>
      <button @click="deleteProduct(id)" class="danger">Delete</button>
    </div>
  </div>
</template>
