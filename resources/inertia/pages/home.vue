<script lang="ts" setup>
import type { InferPageProps } from '@adonisjs/inertia/types'

import { Head } from '@inertiajs/vue3'

import type HomeController from '#controllers/home_controller'

import { Button } from '~/components/base/button'
import { Label } from '~/components/base/label'
import { Switch } from '~/components/base/switch'

defineProps<{ version: InferPageProps<HomeController, 'index'>['version'] }>()
</script>

<template>
  <Head title="Homepage" />

  <div class="flex h-screen flex-col items-center justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8">
    <div class="text-4xl font-bold tracking-tight sm:text-5xl">
      Malik Danial - AdonisJS {{ version }} x Inertia x Vue.js
    </div>
    <Button>Click me</Button>
    <div class="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label for="airplane-mode">Airplane Mode</Label>
    </div>
  </div>
</template>
