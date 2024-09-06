<script lang="ts">
import AuthLayout from '~/layouts/auth_layout.vue'

export default {
  layout: AuthLayout,
}
</script>

<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

const form = useForm('CreateUser', {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const loading = ref(false)

const handleSubmit = () => {
  form.post('/register', {
    onStart: () => (loading.value = true),
    onFinish: () => (loading.value = false),
  })
}
</script>

<template>
  <div class="mx-auto grid w-[350px] gap-6">
    <div class="grid gap-2 text-center">
      <h1 class="text-3xl font-bold">Register</h1>
      <p class="text-balance text-sm text-muted-foreground">
        Enter your information to create an account
      </p>
    </div>
    <form @submit.prevent="handleSubmit" class="grid gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="first-name" :error="form.errors.firstName">First name</Label>
          <Input
            id="first-name"
            placeholder="Max"
            required
            v-model="form.firstName"
            :error="form.errors.firstName"
          />
        </div>
        <div class="grid gap-2">
          <Label for="last-name" :error="form.errors.lastName">Last name</Label>
          <Input
            id="last-name"
            placeholder="Robinson"
            required
            v-model="form.lastName"
            :error="form.errors.lastName"
          />
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="email" :error="form.errors.email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          v-model="form.email"
          :error="form.errors.email"
        />
      </div>
      <div class="grid gap-2">
        <Label for="password" :error="form.errors.password">Password</Label>
        <Input
          id="password"
          type="password"
          v-model="form.password"
          :error="form.errors.password"
        />
      </div>
      <Button type="submit" class="w-full" :loading> Create an account </Button>
    </form>
    <div class="text-center text-sm">
      Already have an account?
      <Link href="/login" class="underline"> Sign in </Link>
    </div>
  </div>
</template>
