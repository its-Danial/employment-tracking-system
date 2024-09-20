<script setup lang="ts">
import { type HTMLAttributes, computed, ref, watch } from 'vue'

import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from 'radix-vue'

import { cn } from '#lib/utils'

interface Item {
  label: string
  value: string
}

const props = defineProps<{
  items: Item[]
  id: string
  label: string
  error?: string | undefined
  wrapperClass?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  placeholder?: string
}>()

defineOptions({ inheritAttrs: false })

const model = defineModel<string[]>({
  required: true,
})

const selectedItems = ref<Item[]>([])

// Sync internal selectedItems with model when model changes
watch(
  () => model.value,
  (newModel) => {
    // model value items need to be strings
    selectedItems.value = props.items.filter((i) => newModel.includes(i.value))
  },
  { deep: true, immediate: true }
)

// Sync model when selectedItems changes
watch(
  () => selectedItems.value,
  (newSelectedItems) => {
    const newValues = newSelectedItems.map((i) => i.value)
    // Update model only if the new values are different
    if (model.value.toString() !== newValues.toString()) {
      model.value = newValues
    }
  },
  { deep: true }
)

const open = ref(false)
const searchTerm = ref('')

const filteredItems = computed(() =>
  props.items.filter((i) => !selectedItems.value.find((s) => s.label === i.label))
)

const removeItem = (item: Item) => {
  selectedItems.value = selectedItems.value.filter((i) => i.label !== item.label)
}

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
        <TagsInputItem v-for="item in selectedItems" :key="item.value" :value="item.label">
          <TagsInputItemText />
          <TagsInputItemDelete @click.stop.prevent="removeItem(item)" />
        </TagsInputItem>
      </div>

      <ComboboxRoot
        v-model="selectedItems"
        v-model:open="open"
        v-model:searchTerm="searchTerm"
        class="w-full"
      >
        <ComboboxAnchor as-child>
          <ComboboxInput :placeholder as-child>
            <TagsInputInput
              class="w-full px-3"
              :class="selectedItems!.length > 0 ? 'mt-2' : ''"
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
                  :value="item"
                  @select.prevent="
                    (ev) => {
                      searchTerm = ''
                      selectedItems.push(ev.detail.value as Item)

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
