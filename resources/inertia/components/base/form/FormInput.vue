<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '#lib/utils'

const props = defineProps<{
  id: string
  label: string
  error?: string | undefined
  wrapperClass?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
}>()

defineOptions({
  inheritAttrs: false,
})

const model = defineModel<string | number>()
</script>

<template>
  <div class="grid gap-2" :class="cn(props.wrapperClass)">
    <Label :for="id" :class="cn(props.labelClass)" :error>
      <slot name="label">
        {{ label }}
        <span v-if="$attrs.required" class="text-destructive"> *</span>
      </slot>
    </Label>
    <Input :id v-model="model" :error v-bind="$attrs" />
  </div>
</template>
