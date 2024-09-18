<script lang="ts">
import AuthLayout from '~/layouts/auth_layout.vue'

export default {
  layout: AuthLayout,
}
</script>

<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

const form = useForm('LoginUser', {
  email: '',
  password: '',
  rememberMe: false,
})

const loading = ref(false)

const handleSubmit = () => {
  form.post('/login', {
    onStart: () => (loading.value = true),
    onFinish: () => (loading.value = false),
  })
}
</script>

<template>
  <div class="mx-auto grid w-[350px] gap-6">
    <div class="grid gap-2 text-center">
      <h1 class="text-3xl font-bold">Login</h1>
      <p class="text-balance text-sm text-muted-foreground">
        Enter your email below to login to your account
      </p>
    </div>
    <form @submit.prevent="handleSubmit" class="grid gap-4">
      <div class="grid gap-2">
        <FormInput
          required="true"
          id="email"
          label="Email"
          placeholder="m@example.com"
          type="email"
          v-model="form.email"
          :error="form.errors.email"
        />
      </div>
      <div class="grid gap-2">
        <FormInput
          id="password"
          type="password"
          v-model="form.password"
          :error="form.errors.password"
        >
          <template #label>
            <div class="flex items-center justify-between">
              <div>
                Password
                <span class="text-destructive"> *</span>
              </div>
              <Link href="/forgot-password" class="text-sm underline"> Forgot your password? </Link>
            </div>
          </template>
        </FormInput>
      </div>
      <div class="flex items-center space-x-2">
        <Checkbox id="remember-me" v-model:checked="form.rememberMe" />
        <label
          for="remember-me"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>
      <Button :loading type="submit" class="w-full"> Login </Button>
    </form>
    <div class="text-center text-sm">
      Don't have an account?
      <Link href="/register" class="underline"> Register </Link>
    </div>
  </div>
</template>
