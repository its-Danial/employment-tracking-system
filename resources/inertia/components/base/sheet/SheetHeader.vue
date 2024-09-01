<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { DialogTitle } from 'radix-vue'

import { cn } from '#lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <DialogTitle :class="cn('flex flex-col gap-y-2 text-center sm:text-left', props.class)">
    <slot />
  </DialogTitle>
</template>
