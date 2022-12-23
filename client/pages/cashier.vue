<script setup lang="ts">
import type { CartItem } from '~~/types/CartItem'
import type { Product } from '~~/types/Product'

const {
  error,
  pending,
  data: products,
} = await useMyFetch<Product[]>('/product/read-all')
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
const ordering = ref(false)

function addToCart(newCartItem: CartItem) {
  cart.value.push(newCartItem)
}

async function order(event: Event) {
  ordering.value = true
  const orderType = getValueFromEvent(event, 'orderType')
  const tableNumber = Number(getValueFromEvent(event, 'tableNumber'))
  const { error } = await useMyFetch('/order/create', {
    method: 'post',
    body: {
      cart: cart.value,
      orderType,
      tableNumber,
    },
  })
  ordering.value = false
  if (error.value) {
    handleError(error)
    return
  }
  cart.value = []
  alert('Order successful.')
}
</script>

<template>
  <span v-if="error">Couldn't fetch the products.</span>
  <span v-else-if="pending">Fetching the products...</span>
  <div v-else class="flex flex-col gap-y-4">
    <h1>Products</h1>
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

    <h1>Cart</h1>
    <div v-for="{ name, quantity } in cart">
      <span>{{ name }}</span> x <span>{{ quantity }}</span>
    </div>

    <h2>Total = ${{ total }}</h2>

    <form @submit.prevent="order" class="flex flex-col gap-y-[inherit]">
      <div class="flex flex-col gap-y-2">
        <strong>Order type</strong>
        <div class="flex gap-x-2">
          <input
            type="radio"
            name="orderType"
            id="dine_in"
            value="dine_in"
            checked
          />
          <label for="dine_in">Dine-in</label>
        </div>
        <div class="flex gap-x-2">
          <input type="radio" name="orderType" id="take_out" value="take_out" />
          <label for="take_out">Take-out</label>
        </div>
      </div>

      <label for="tableNumber">Table number</label>
      <input
        id="tableNumber"
        name="tableNumber"
        type="number"
        min="1"
        step="1"
        required
        class="w-20"
      />

      <button :disabled="ordering" type="submit">
        <span v-if="ordering">Ordering...</span>
        <span v-else>Order</span>
      </button>
    </form>
  </div>
</template>
