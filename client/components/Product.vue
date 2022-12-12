<script setup lang="ts">
import type { CartItem } from '~~/types/CartItem'

type AddToCartType = (newCartItem: CartItem) => void

type PropType = {
  id: string
  name: string
  addToCart: AddToCartType
}
const { id, name, addToCart } = defineProps<PropType>()

const quantity = ref(1)
const decrement = () => quantity.value--
const increment = () => quantity.value++
</script>

<template>
  <span>{{ name }}</span>

  <button @click="decrement">-</button>
  <span>{{ quantity }}</span>
  <button @click="increment">+</button>

  <button @click="addToCart({ id, name, quantity })">Add to cart</button>
</template>
