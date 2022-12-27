<script setup lang="ts">
import type { CartItem } from '~~/types/CartItem'

type AddToCartType = (newCartItem: CartItem) => void

type PropType = {
  id: string
  name: string
  price: number
  addToCart: AddToCartType
}
const { id, name, addToCart } = defineProps<PropType>()

const quantity = ref(1)
const decrement = () => quantity.value--
const increment = () => quantity.value++
</script>

<template>
  <span class="mr-auto">{{ name }}</span>

  <button @click="decrement" :disabled="quantity === 1">-</button>
  <span>{{ quantity }}</span>
  <button @click="increment">+</button>

  <button @click="addToCart({ id, name, price, quantity })">Add to cart</button>
</template>
