<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'

import { Ellipsis } from 'lucide-vue-next'
import { PaginationEllipsis, type PaginationEllipsisProps } from 'radix-vue'

import { cn } from '#lib/utils'

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationEllipsis
    v-bind="delegatedProps"
    :class="cn('flex h-9 w-9 items-center justify-center', props.class)"
  >
    <slot>
      <Ellipsis />
    </slot>
  </PaginationEllipsis>
</template>
