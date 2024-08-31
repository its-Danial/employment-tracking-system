<script lang="ts">
import AuthLayout from '~/layouts/auth_layout.vue'

export default {
  layout: AuthLayout,
}
</script>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { Button } from '~/components/base/button'
import { Checkbox } from '~/components/base/checkbox'
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
          <Link href="/forgot-password" class="ml-auto inline-block text-sm underline">
            Forgot your password?
          </Link>
        </div>
        <Input id="password" type="password" required />
      </div>
      <div class="flex items-center space-x-2">
        <Checkbox id="remember-me" />
        <label
          for="remember-me"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>
      <Button type="submit" class="w-full"> Login </Button>
    </div>
    <div class="text-center text-sm">
      Don't have an account?
      <Link href="/register" class="underline"> Register </Link>
    </div>
  </div>
</template>
