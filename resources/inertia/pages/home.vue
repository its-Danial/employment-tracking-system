<script lang="ts" setup>
import type { InferPageProps } from '@adonisjs/inertia/types'

import { Head } from '@inertiajs/vue3'

import type HomeController from '#controllers/home_controller'

defineProps<{ version: InferPageProps<HomeController, 'index'>['version'] }>()
</script>

<template>
  <Head title="Homepage" />
  <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Dashboard</h1>
    </div>
    <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div class="h-screen text-4xl font-bold tracking-tight sm:text-5xl">
        Malik Danial - AdonisJS {{ version }} x Inertia x Vue.js
      </div>
    </div>
  </main>
</template>
