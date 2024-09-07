<script setup lang="ts" generic="T extends { id: number; [key: string]: any }">
import { router } from '@inertiajs/vue3'

import { computed, ref } from 'vue'

import { LoaderCircle } from 'lucide-vue-next'

import type { PaginatedMeta } from '#lib/types/pagination'

import { Pagination, PaginationList, PaginationListItem } from '~/components/base/pagination'

const props = defineProps<{
  data: T[]
  meta: PaginatedMeta
  url: string
  filters?: Record<string, Record<string, string>>
}>()

const internalData = computed(() => props.data)
const internalMeta = computed(() => props.meta)

const search = ref(internalMeta.value.qs?.q || '')

const loading = ref(false)

const handlePageChange = (page: number) => {
  const query: Record<string, string | number> = {
    page,
  }
  if (search.value) query.q = search.value
  router.get(props.url, query, {
    preserveState: true,
    onStart: () => (loading.value = true),
    onFinish: () => (loading.value = false),
  })
}

const handleSearch = () => {
  const query: Record<string, string> = {}
  if (search.value) query.q = search.value

  router.get(props.url, query, {
    preserveState: true,
    onStart: () => (loading.value = true),
    onFinish: () => (loading.value = false),
  })
}
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <!-- Toolbar -->
    <div class="mb-4 flex items-center gap-2">
      <slot name="toolbar">
        <Input
          placeholder="Search using name, passport or phone number"
          v-model="search"
          class="h-8 w-full lg:w-[350px]"
          @keydown.enter="handleSearch"
          @click:clear="handleSearch"
          clearable
        />
      </slot>
    </div>
    <div v-if="loading" class="flex flex-1 items-center justify-center">
      <LoaderCircle class="h-8 w-8 animate-spin" />
    </div>
    <div v-else-if="!internalData.length" class="flex flex-1 items-center justify-center">
      No data found
    </div>
    <div v-else class="flex-1 space-y-4">
      <!-- Data -->
      <slot name="data-container">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <slot
            name="data"
            v-for="(item, index) in internalData"
            :key="item.id"
            :data="{ item, index }"
          />
        </div>
      </slot>
      <!-- Foot with pagination -->
      <slot name="footer">
        <div class="flex justify-between gap-2">
          <div class="flex items-center text-sm text-muted-foreground">
            Showing {{ (internalMeta.currentPage - 1) * internalMeta.perPage + 1 }} to
            {{ Math.min(internalMeta.currentPage * internalMeta.perPage, internalMeta.total) }} of
            {{ internalMeta.total }}
          </div>
          <Pagination
            v-slot="{ page }"
            :total="internalMeta.total"
            :items-per-page="internalMeta.perPage"
            :sibling-count="1"
            show-edges
            :page="internalMeta.currentPage"
            @update:page="handlePageChange"
          >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrev />
              <template v-for="(item, index) in items">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
                  :value="item.value"
                  as-child
                >
                  <Button
                    class="h-9 w-9 p-0"
                    :variant="item.value === page ? 'default' : 'outline'"
                  >
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
              </template>
              <PaginationNext />
              <PaginationLast />
            </PaginationList>
          </Pagination>
        </div>
      </slot>
    </div>
  </div>
</template>
