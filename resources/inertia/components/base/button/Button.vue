<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { LoaderCircle } from 'lucide-vue-next'
import { Primitive, type PrimitiveProps } from 'radix-vue'

import { cn } from '#lib/utils'

import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false,
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="loading"
  >
    <template v-if="loading">
      <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </template>
    <slot v-else />
  </Primitive>
</template>
