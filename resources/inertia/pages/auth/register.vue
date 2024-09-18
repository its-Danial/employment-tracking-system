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
        <FormInput
          required="true"
          id="first-name"
          label="First name"
          placeholder="Max"
          type="text"
          v-model="form.firstName"
          :error="form.errors.firstName"
        />
        <FormInput
          required="true"
          id="last-name"
          label="Last name"
          placeholder="Robinson"
          type="text"
          v-model="form.lastName"
          :error="form.errors.lastName"
        />
      </div>
      <FormInput
        required="true"
        id="email"
        label="Email"
        placeholder="m@example.com"
        type="email"
        v-model="form.email"
        :error="form.errors.email"
      />
      <FormInput
        required="true"
        id="password"
        label="Password"
        type="password"
        v-model="form.password"
        :error="form.errors.password"
      />
      <Button type="submit" class="w-full" :loading> Create an account </Button>
    </form>
    <div class="text-center text-sm">
      Already have an account?
      <Link href="/login" class="underline"> Sign in </Link>
    </div>
  </div>
</template>
