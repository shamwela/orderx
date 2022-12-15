<script setup lang="ts">
import type { CartItem } from '~~/types/CartItem'

const { error, data: products } = await useMyFetch('products')
if (error) {
  handleError(error)
}

const cart = ref<CartItem[]>([])
const pending = ref(false)

function addToCart(newCartItem: CartItem) {
  cart.value.push(newCartItem)
}

async function order() {
  pending.value = true
  const { error } = await useMyFetch('order', { body: cart.value })
  pending.value = false
  if (error) {
    handleError(error)
    return
  }
  cart.value = []
  alert('Order successful.')
}
</script>

<template>
  <div>
    <div v-for="{ id, name } in products" class="flex gap-x-4">
      <Product :id="id" :name="name" :addToCart="addToCart" />
    </div>
    <hr />

    <span v-if="cart.length === 0">Cart is empty.</span>
    <div v-else>
      <h1>Cart</h1>
      <div v-for="{ name, quantity } in cart" class="flex gap-x-4">
        <span>{{ name }}</span>
        <span>{{ quantity }}</span>
      </div>
      <button @click="order">
        <span v-if="pending">Ordering...</span>
        <span v-else>Order</span>
      </button>
    </div>
  </div>
</template>
