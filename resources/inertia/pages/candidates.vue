<script setup lang="ts">
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/vue3'

import { Ellipsis } from 'lucide-vue-next'
import { DateTime } from 'luxon'

import type CandidatesController from '#controllers/candidates_controller'

import { DataIterator } from '~/components/data-iterator'

defineProps<{
  paginatedCandidates: InferPageProps<CandidatesController, 'index'>['paginatedCandidates']
  filters: InferPageProps<CandidatesController, 'index'>['filters']
}>()
</script>

<template>
  <Head title="Candidates" />
  <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Candidates</h1>
    </div>
    <DataIterator
      :data="paginatedCandidates.data"
      :meta="paginatedCandidates.meta"
      :url="'/candidates'"
      :filters
    >
      <template #data="{ data }">
        <Card class="relative flex flex-col justify-between">
          <CardHeader class="w-[85%] pr-0">
            <CardTitle> {{ data.item.firstName }} {{ data.item.lastName }} </CardTitle>
            <CardDescription>Passport: {{ data.item.passportNumber }}</CardDescription>
          </CardHeader>
          <CardContent> Card Content </CardContent>
          <CardFooter class="flex flex-col gap-3 pb-4">
            <div class="flex w-full flex-wrap gap-2">
              <Badge v-for="skill in data.item.skills" :key="skill.id">
                {{ skill.name }}
              </Badge>
            </div>
            <div class="flex w-full flex-wrap justify-between gap-2 text-xs text-muted-foreground">
              <span>Created by: {{ data.item.createdByUser.name }}</span>
              <span>
                {{
                  DateTime.fromISO(data.item.createdAt!).toLocaleString({
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                }}
              </span>
            </div>
          </CardFooter>

          <!-- Dropdown menu -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                id="candidate-actions-menu"
                variant="ghost"
                class="absolute right-3 top-2 flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis class="h-4 w-4" />
                <span class="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-[160px]">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      </template>
    </DataIterator>
  </main>
</template>
