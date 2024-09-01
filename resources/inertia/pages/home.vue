<script lang="ts" setup>
import type { InferPageProps } from '@adonisjs/inertia/types'

import { Head } from '@inertiajs/vue3'

import type HomeController from '#controllers/home_controller'

defineProps<{ version: InferPageProps<HomeController, 'index'>['version'] }>()
</script>

<template>
  <Head title="Homepage" />
  <div class="flex flex-col items-center justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8">
    <div class="text-4xl font-bold tracking-tight sm:text-5xl">
      Malik Danial - AdonisJS {{ version }} x Inertia x Vue.js
    </div>
  </div>
</template>
