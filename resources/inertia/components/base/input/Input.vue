<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { HTMLAttributes } from 'vue'

import { X } from 'lucide-vue-next'

import { cn } from '#lib/utils'

import { type InputVariants, inputVariants } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  variant?: InputVariants['variant']
  error?: string
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  clearable?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
  (e: 'click:clear'): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const resetValue = () => {
  emits('update:modelValue', props.defaultValue || '')
  emits('click:clear')
}
</script>

<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      v-model="modelValue"
      :class="cn(inputVariants({ variant: error ? 'destructive' : variant }), props.class)"
    />
    <X
      v-if="clearable && modelValue"
      @click="resetValue"
      class="absolute right-2 top-1/2 size-4 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary"
    />
  </div>
  <small v-if="error" class="text-destructive">{{ error }}</small>
</template>
