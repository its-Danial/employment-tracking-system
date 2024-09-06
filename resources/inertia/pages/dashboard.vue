<script lang="ts" setup>
import type { SharedProps } from '@adonisjs/inertia/types'
import { Head, usePage } from '@inertiajs/vue3'

import { computed } from 'vue'

const page = usePage<SharedProps>()

const user = computed(() => page.props.user)
</script>

<template>
  <Head title="Dashboard" />
  <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Dashboard</h1>
    </div>
    <div
      class="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div class="font-bold tracking-tight">User email: {{ user.email }}</div>
      <div class="font-bold tracking-tight">User email: {{ user.firstName }}</div>
      <Button>Hello</Button>
    </div>
  </main>
</template>
