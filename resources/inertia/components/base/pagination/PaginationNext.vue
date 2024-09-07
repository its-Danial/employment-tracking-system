<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'

import { ChevronRight } from 'lucide-vue-next'
import { PaginationNext, type PaginationNextProps } from 'radix-vue'

import { cn } from '#lib/utils'

import { Button } from '~/components/base/button'

const props = withDefaults(
  defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(),
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
  <PaginationNext v-bind="delegatedProps">
    <Button :class="cn('h-9 w-9 p-0', props.class)" variant="outline">
      <slot>
        <ChevronRight />
      </slot>
    </Button>
  </PaginationNext>
</template>
