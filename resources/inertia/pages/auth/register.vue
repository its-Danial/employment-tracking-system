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
      <h1 class="text-3xl font-bold">Register</h1>
      <p class="text-balance text-sm text-muted-foreground">
        Enter your information to create an account
      </p>
    </div>
    <div class="grid gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="first-name">First name</Label>
          <Input id="first-name" placeholder="Max" required />
        </div>
        <div class="grid gap-2">
          <Label for="last-name">Last name</Label>
          <Input id="last-name" placeholder="Robinson" required />
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button type="submit" class="w-full"> Create an account </Button>
    </div>
    <div class="text-center text-sm">
      Already have an account?
      <a href="#" class="underline"> Sign in </a>
    </div>
  </div>
</template>
