<script setup lang="ts">
import { Product } from '~~/types/Product'

const route = useRoute()
const { id } = route.params
const { error, data: product } = await useMyFetch<Product>('/product', {
  params: { id },
})

if (error.value) {
  handleError(error)
}

const pending = ref(false)

async function updateProduct(event: Event) {
  pending.value = true
  const name = getValueFromEvent(event, 'name')
  const price = Number(getValueFromEvent(event, 'price'))
  const { error } = await useMyFetch('/product', {
    method: 'put',
    body: {
      id,
      name,
      price,
    },
  })
  pending.value = false
  if (error.value) {
    handleError(error)
    return
  }
  await refreshNuxtData()
  alert('Updated.')
  await navigateTo('/product')
}
</script>

<template>
  <span v-if="error || !product">Couldn't fetch the product data.</span>
  <div v-else>
    <h1>Edit product</h1>

    <form @submit.prevent="updateProduct">
      <label for="name">Name</label>
      <input
        :value="product.name"
        id="name"
        name="name"
        type="text"
        maxlength="50"
        required
      />

      <label for="price">Price</label>
      <input
        :value="product.price"
        id="price"
        name="price"
        type="number"
        min="1"
        required
      />

      <button :disabled="pending" type="submit">
        <span v-if="pending">Updating...</span>
        <span v-else>Update</span>
      </button>
    </form>
  </div>
</template>
