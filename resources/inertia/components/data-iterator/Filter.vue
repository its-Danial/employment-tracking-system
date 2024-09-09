<script setup lang="ts">
import { ref, watch } from 'vue'

import { CheckIcon, PlusCircle } from 'lucide-vue-next'

import type { DataIteratorFilter } from '#lib/types/filter'
import { cn } from '#lib/utils'

defineProps<DataIteratorFilter>()

const model = defineModel<string>()

// Managing selected filter values as reactive data
const selectedValues = ref(new Set<string>(!model.value ? [] : model.value.split(',')))

const handleFilterChange = (value: string) => {
  if (selectedValues.value.has(value)) {
    selectedValues.value.delete(value)
  } else {
    selectedValues.value.add(value)
  }
}

watch(
  selectedValues,
  () => (model.value = Array.from(selectedValues.value).join(',')),
  { deep: true } // need for Set data type
)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <PlusCircle class="mr-2 h-4 w-4" />
        {{ label }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options.filter((option) => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <!-- TODO: add search input -->
        <CommandInput aria-hidden="false" :placeholder="`Search ${label}`" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="handleFilterChange(option.value)"
            >
              <div
                :class="
                  cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )
                "
              >
                <CheckIcon :class="cn('h-4 w-4')" />
              </div>
              <!-- <component
                :is="option.icon"
                v-if="option.icon"
                class="mr-2 h-4 w-4 text-muted-foreground"
              /> -->
              <span>{{ option.label }}</span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="() => selectedValues.clear()"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
