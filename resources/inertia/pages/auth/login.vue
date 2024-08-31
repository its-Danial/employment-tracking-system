<script lang="ts">
import AuthLayout from '~/layouts/auth_layout.vue'

export default {
  layout: AuthLayout,
}
</script>

<script setup lang="ts">
import { Button } from '~/components/base/button'
import { Input } from '~/components/base/input'
import { Label } from '~/components/base/label'
</script>

<template>
  <div class="mx-auto grid w-[350px] gap-6">
    <div class="grid gap-2 text-center">
      <h1 class="text-3xl font-bold">Login</h1>
      <p class="text-balance text-sm text-muted-foreground">
        Enter your email below to login to your account
      </p>
    </div>
    <div class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center">
          <Label for="password">Password</Label>
          <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" class="w-full"> Login </Button>
    </div>
    <div class="text-center text-sm">
      Don't have an account?
      <a href="#" class="underline"> Sign up </a>
    </div>
  </div>
</template>
