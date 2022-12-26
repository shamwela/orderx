<script setup lang="ts">
import { Role } from '~~/types/Role'

async function createUser(event: Event) {
  const name = getValueFromEvent(event, 'name')
  const email = getValueFromEvent(event, 'email')
  const password = getValueFromEvent(event, 'password')
  const role = getValueFromEvent(event, 'role') as Role
  const { error } = await useMyFetch('/user', {
    method: 'post',
    body: { name, email, password, role },
  })
  if (error.value) {
    handleError(error)
    return
  }
  alert('User created.')
}
</script>

<template>
  <h1>Create a new user</h1>

  <form @submit.prevent="createUser" class='flex flex-col gap-y-[inherit]'>
    <label for="name">Name</label>
    <input id="name" name="name" type="text" maxlength="50" required />

    <label for="email">Email</label>
    <input id="email" name="email" type="email" maxlength="254" required />

    <label for="password">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      minlength="8"
      maxlength="100"
      required
    />

    <strong>Role</strong>
    <div class="flex gap-x-2">
      <input type="radio" name="role" id="cashier" value="cashier" checked />
      <label for="cashier">Cashier</label>
    </div>
    <div class="flex gap-x-2">
      <input type="radio" name="role" id="cook" value="cook" />
      <label for="cook">Cook</label>
    </div>
    <div class="flex gap-x-2">
      <input type="radio" name="role" id="admin" value="admin" />
      <label for="admin">Admin</label>
    </div>

    <button type="submit">Create</button>
  </form>
</template>
