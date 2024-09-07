<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'

import { ChevronsLeft } from 'lucide-vue-next'
import { PaginationFirst, type PaginationFirstProps } from 'radix-vue'

import { cn } from '#lib/utils'

import { Button } from '~/components/base/button'

const props = withDefaults(
  defineProps<PaginationFirstProps & { class?: HTMLAttributes['class'] }>(),
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
  <PaginationFirst v-bind="delegatedProps">
    <Button :class="cn('h-9 w-9 p-0', props.class)" variant="outline">
      <slot>
        <ChevronsLeft />
      </slot>
    </Button>
  </PaginationFirst>
</template>
