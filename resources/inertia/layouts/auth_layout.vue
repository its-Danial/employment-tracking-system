<script lang="ts" setup>
import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/vue3'

import { watch } from 'vue'

import Toaster from '~/components/base/toast/Toaster.vue'
import { toast } from '~/components/base/toast/use-toast'

const page = usePage<SharedProps>()

watch(
  () => page.props.exceptions,
  (newException) => {
    if (newException && newException['E_INVALID_CREDENTIALS']) {
      toast({ description: newException['E_INVALID_CREDENTIALS'], variant: 'destructive' })
    }
  }
)
</script>

<template>
  <Toaster />
  <div
    class="flex min-h-screen w-full items-center justify-center lg:grid lg:grid-cols-2 lg:items-stretch"
  >
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <slot />
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://www.shadcn-vue.com/placeholder.svg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
