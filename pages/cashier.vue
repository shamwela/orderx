<script setup lang="ts">
import type { CartItem } from '~~/types/CartItem'

const { $client } = useNuxtApp()
const products = await $client.getAllProducts.query()

const cart = ref<CartItem[]>([])

function addToCart(newCartItem: CartItem) {
  cart.value.push(newCartItem)
}

async function order() {
  try {
    await $client.order.mutate(cart.value)
  } catch (error) {
    console.error(error)
    alert('An error happened. Please contact your admin.')
  }
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
      <div v-for="{ name, quantity } in cart" class="flex gap-x-4">
        <span>{{ name }}</span>
        <span>{{ quantity }}</span>
      </div>
      <button @click="order">Order</button>
    </div>
  </div>
</template>
