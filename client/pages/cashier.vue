<script setup lang="ts">
import type { CartItem } from '~~/types/CartItem'

const { $client } = useNuxtApp()
const products = await $client.getAllProducts.query()

const cart = ref<CartItem[]>([])
const ordering = ref(false)

function addToCart(newCartItem: CartItem) {
  cart.value.push(newCartItem)
}

async function order() {
  ordering.value = true
  try {
    await $client.order.mutate(cart.value)
  } catch (error) {
    ordering.value = false
    console.error(error)
    alert('An error happened. Please contact your admin.')
    return
  }
  ordering.value = false
  cart.value = []
  alert('Order successful.')
}
</script>

<template>
  <div>
    <!-- Products -->
    <div v-for="{ id, name } in products" class="flex gap-x-4">
      <Product :id="id" :name="name" :addToCart="addToCart" />
    </div>
    <hr />
    <!-- Cart -->
    <span v-if="cart.length === 0">Cart is empty.</span>
    <div v-else>
      <h1>Cart</h1>
      <div v-for="{ name, quantity } in cart" class="flex gap-x-4">
        <span>{{ name }}</span>
        <span>{{ quantity }}</span>
      </div>
      <button @click="order">
        <span v-if="ordering">Ordering...</span>
        <span v-else>Order</span>
      </button>
    </div>
  </div>
</template>
