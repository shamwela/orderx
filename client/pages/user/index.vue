<script setup lang="ts">
import { User } from '~~/types/User'

const { error, data: users } = await useMyFetch<User[]>('/user/read-all')
if (error.value) {
  handleError(error)
}

async function deleteUser(id: string) {
  const { error } = await useMyFetch('/user/delete', {
    method: 'delete',
    body: { id },
  })
  if (error.value) {
    handleError(error)
    return
  }
  await refreshNuxtData()
  alert('Delete successful.')
}
</script>

<template>
  <span v-if="error">Couldn't fetch the users' data.</span>
  <div v-else>
    <h1>Users</h1>

    <NuxtLink to="/user/create" class="button">Create a new user</NuxtLink>

    <div v-for="{ id, name, email } in users" class="flex gap-x-4 items-center">
      <span>{{ name }}</span>
      <span>{{ email }}</span>
      <NuxtLink :to="'/user/update/' + id">Edit</NuxtLink>
      <button @click="deleteUser(id)">Delete</button>
    </div>
  </div>
</template>
