<script setup lang="ts">
const pending = ref(false)

async function createProduct(event: Event) {
  pending.value = true
  const name = getValueFromEvent(event, 'name')
  const price = getValueFromEvent(event, 'price')
  const { error } = await useMyFetch('/product', {
    method: 'post',
    body: { name, price },
  })
  pending.value = false
  if (error.value) {
    handleError(error)
    return
  }
  alert('Product created.')
}
</script>

<template>
  <h1>Create a new product</h1>

  <form @submit.prevent="createProduct" class='flex flex-col gap-y-[inherit]'>
    <label for="name">Name</label>
    <input id="name" name="name" type="text" maxlength="50" required />

    <label for="price">Price</label>
    <input id="price" name="price" type="number" min="1" required />

    <button :disabled="pending" type="submit">
      <span v-if="pending">Creating...</span>
      <span v-else>Create</span>
    </button>
  </form>
</template>
