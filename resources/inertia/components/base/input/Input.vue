<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { HTMLAttributes } from 'vue'

import { cn } from '#lib/utils'

import { type InputVariants, inputVariants } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  variant?: InputVariants['variant']
  error?: string
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-bind="$attrs"
    v-model="modelValue"
    :class="cn(inputVariants({ variant: error ? 'destructive' : variant }), props.class)"
  />
  <small v-if="error" class="text-destructive">{{ error }}</small>
</template>
