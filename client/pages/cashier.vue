<script setup lang="ts">
import type { CartItem } from '~~/types/CartItem'
import type { Product } from '~~/types/Product'

const { error, data: products } = await useMyFetch<Product[]>(
  '/product/read-all'
)
if (error.value) {
  handleError(error)
}

const cart = ref<CartItem[]>([])
const total = computed(() =>
  cart.value.reduce((previousTotal, item) => {
    const { price, quantity } = item
    const currentTotal = price * quantity
    const finalTotal = currentTotal + previousTotal
    return finalTotal
  }, 0)
)
const pending = ref(false)

function addToCart(newCartItem: CartItem) {
  cart.value.push(newCartItem)
}

async function order(event: Event) {
  pending.value = true
  const orderType = getValueFromEvent(event, 'orderType')
  const { error } = await useMyFetch('/order', {
    method: 'post',
    body: { cart: cart.value, orderType },
  })
  pending.value = false
  if (error.value) {
    handleError(error)
    return
  }
  cart.value = []
  alert('Order successful.')
}
</script>

<template>
  <span v-if="error">Couldn't fetch product data.</span>
  <div v-else>
    <div
      v-for="{ id, name, price } in products"
      class="flex gap-x-4 items-center"
    >
      <Product
        :id="id"
        :name="name"
        :price="Number(price)"
        :addToCart="addToCart"
      />
    </div>
    <hr />

    <span v-if="cart.length === 0">Cart is empty.</span>
    <div v-else>
      <h1>Cart</h1>
      <div v-for="{ name, quantity } in cart" class="flex gap-x-4">
        <span>{{ name }}</span>
        <span>{{ quantity }}</span>
      </div>

      <h2>Total = ${{ total }}</h2>

      <form @submit.prevent="order" class="flex flex-col gap-y-[inherit]">
        <!-- Order Type -->
        <div>
          <input
            type="radio"
            name="orderType"
            id="dine_in"
            value="dine_in"
            checked
          />
          <label for="dine_in">Dine-in</label>
        </div>

        <div>
          <input type="radio" name="orderType" id="take_out" value="take_out" />
          <label for="take_out">Take-out</label>
        </div>

        <button :disabled="pending" type="submit">
          <span v-if="pending">Ordering...</span>
          <span v-else>Order</span>
        </button>
      </form>
    </div>
  </div>
</template>
