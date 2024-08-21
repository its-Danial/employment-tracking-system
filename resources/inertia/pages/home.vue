<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'

defineProps<{ version: number }>()

function toggleDarkMode() {
  const element = document.querySelector('html')
  element?.classList.toggle('app-dark')
}
</script>

<template>
  <Head title="Homepage" />

  <div class="flex h-screen flex-col items-center justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8">
    <div class="text-4xl font-bold tracking-tight sm:text-5xl">
      Malik Danial - AdonisJS {{ version }} x Inertia x Vue.js
    </div>
    <Button label="Submit" type="button" @click="toggleDarkMode" />
  </div>
</template>
