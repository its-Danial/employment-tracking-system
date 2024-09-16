<script setup lang="ts">
import { type HTMLAttributes, computed, ref } from 'vue'

import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from 'radix-vue'

import { cn } from '#lib/utils'

const props = defineProps<{
  items: { label: string; value: string }[]
  id: string
  label: string
  error?: string | undefined
  wrapperClass?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  placeholder?: string
}>()

defineOptions({ inheritAttrs: false })

const model = defineModel<string[]>()

const open = ref(false)
const searchTerm = ref('')

const filteredItems = computed(() => props.items.filter((i) => !model.value!.includes(i.label)))

// Function to open the menu when input is focused or clicked
const handleInputFocus = () => {
  open.value = true
}
</script>

<template>
  <div class="grid w-full gap-2" :class="cn(props.wrapperClass)">
    <Label :for="id" :class="cn(props.labelClass)" :error @click.prevent>
      <slot name="label">
        {{ label }}
        <span v-if="$attrs.required" class="text-destructive"> *</span>
      </slot>
    </Label>

    <TagsInput :id class="w-full gap-0 px-0" :model-value="model" v-bind="$attrs">
      <div class="flex flex-wrap items-center gap-2 px-3">
        <TagsInputItem v-for="item in model" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>
      </div>

      <ComboboxRoot
        v-model="model"
        v-model:open="open"
        v-model:searchTerm="searchTerm"
        class="w-full"
      >
        <ComboboxAnchor as-child>
          <ComboboxInput :placeholder as-child>
            <TagsInputInput
              class="w-full px-3"
              :class="model!.length > 0 ? 'mt-2' : ''"
              @keydown.enter.prevent
              @focus="handleInputFocus"
              @click="handleInputFocus"
            />
          </ComboboxInput>
        </ComboboxAnchor>

        <ComboboxPortal>
          <ComboboxContent>
            <CommandList
              position="popper"
              class="z-[100] mt-2 w-[--radix-popper-anchor-width] rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            >
              <CommandEmpty />
              <CommandGroup>
                <CommandItem
                  v-for="item in filteredItems"
                  :key="item.value"
                  :value="item.label"
                  @select.prevent="
                    (ev) => {
                      if (typeof ev.detail.value === 'string') {
                        searchTerm = ''
                        model!.push(ev.detail.value)
                      }

                      if (filteredItems.length === 0) {
                        open = false
                      }
                    }
                  "
                >
                  {{ item.label }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </ComboboxContent>
        </ComboboxPortal>
      </ComboboxRoot>
    </TagsInput>
    <small v-if="error" class="text-destructive">{{ error }}</small>
  </div>
</template>
