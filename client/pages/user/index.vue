<script setup lang="ts">
import { User } from '~~/types/User'
useTitle('Users')

const { error, data: users } = await useMyFetch<User[]>('/user')
if (error.value) {
  handleError(error)
}

async function deleteUser(id: string) {
  if (!confirm('Are you sure you want to delete?')) {
    return
  }
  const { error } = await useMyFetch('/user', {
    method: 'delete',
    body: { id },
  })
  if (error.value) {
    handleError(error)
    return
  }
  location.reload()
}
</script>

<template>
  <span v-if="error">Couldn't fetch the users' data.</span>
  <div v-else class="flex flex-col gap-y-[inherit]">
    <h1>Users</h1>

    <NuxtLink to="/user/create" class="button">Create a new user</NuxtLink>

    <div v-for="{ id, name, email } in users" class="flex gap-x-8 items-center">
      <span>{{ name }}</span>
      <span>{{ email }}</span>
      <NuxtLink :to="'/user/update/' + id">Edit</NuxtLink>
      <button @click="deleteUser(id)" class="danger">Delete</button>
    </div>
  </div>
</template>
