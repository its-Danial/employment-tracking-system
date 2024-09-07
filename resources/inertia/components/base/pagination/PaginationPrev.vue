<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'

import { ChevronLeft } from 'lucide-vue-next'
import { PaginationPrev, type PaginationPrevProps } from 'radix-vue'

import { cn } from '#lib/utils'

import { Button } from '~/components/base/button'

const props = withDefaults(
  defineProps<PaginationPrevProps & { class?: HTMLAttributes['class'] }>(),
  {
    asChild: true,
  }
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationPrev v-bind="delegatedProps">
    <Button :class="cn('h-9 w-9 p-0', props.class)" variant="outline">
      <slot>
        <ChevronLeft />
      </slot>
    </Button>
  </PaginationPrev>
</template>
