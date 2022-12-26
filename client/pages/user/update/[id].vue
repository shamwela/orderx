<script setup lang="ts">
import { User } from '~~/types/User'

const route = useRoute()
const { id } = route.params
const { error, data: user } = await useMyFetch<User>('/user', {
  params: { id },
})

if (error.value) {
  handleError(error)
}

const pending = ref(false)

async function updateUser(event: Event) {
  pending.value = true
  const name = getValueFromEvent(event, 'name')
  const email = getValueFromEvent(event, 'email')
  const role = getValueFromEvent(event, 'role')
  const { error } = await useMyFetch('/user', {
    method: 'put',
    body: {
      id,
      name,
      email,
      role,
    },
  })
  pending.value = false
  if (error.value) {
    handleError(error)
    return
  }
  await refreshNuxtData()
  alert('Updated.')
  await navigateTo('/user')
}
</script>

<template>
  <span v-if="error || !user">Couldn't fetch the user data.</span>
  <div v-else>
    <h1>Edit user data</h1>

    <form @submit.prevent="updateUser">
      <label for="name">Name</label>
      <input
        :value="user.name"
        id="name"
        name="name"
        type="text"
        maxlength="50"
        required
      />

      <label for="email">Email</label>
      <input
        :value="user.email"
        id="email"
        name="email"
        type="email"
        maxlength="254"
        required
      />

      <strong>Role</strong>
      <div class="flex gap-x-2">
        <input
          type="radio"
          name="role"
          id="cashier"
          value="cashier"
          :checked="user.role === 'cashier'"
        />
        <label for="cashier">Cashier</label>
      </div>
      <div class="flex gap-x-2">
        <input
          type="radio"
          name="role"
          id="cook"
          value="cook"
          :checked="user.role === 'cook'"
        />
        <label for="cook">Cook</label>
      </div>
      <div class="flex gap-x-2">
        <input
          type="radio"
          name="role"
          id="admin"
          value="admin"
          :checked="user.role === 'admin'"
        />
        <label for="admin">Admin</label>
      </div>

      <button :disabled="pending" type="submit">
        <span v-if="pending">Updating...</span>
        <span v-else>Update</span>
      </button>
    </form>
  </div>
</template>
