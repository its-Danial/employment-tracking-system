<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'

import { ref } from 'vue'

import { CirclePlus, Ellipsis } from 'lucide-vue-next'
import { DateTime } from 'luxon'

import type { CandidatesControllerIndexProps } from '#controllers/candidates_controller'
import type Candidate from '#models/candidate'

import TagsCombobox from '~/components/base/form/FormTagsCombobox.vue'
import { DataIterator } from '~/components/data-iterator'

defineProps<CandidatesControllerIndexProps>()

const dialog = ref(false)
const selectedCandidateId = ref<number | null>(null)

const createEditForm = useForm({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  passportNumber: '',
  experience: '',
  currentOccupation: '',
  previousOccupation: '',
  education: '',
  desiredOccupation: '',
  skills: [] as string[],
})

const handleEditCandidateClick = async (candidate: ReturnType<Candidate['serialize']>) => {
  selectedCandidateId.value = candidate.id

  createEditForm.firstName = candidate.firstName
  createEditForm.lastName = candidate.lastName
  createEditForm.email = candidate.email ?? ''
  createEditForm.phoneNumber = candidate.phoneNumber
  createEditForm.passportNumber = candidate.passportNumber
  createEditForm.experience = candidate.experience ?? ''
  createEditForm.currentOccupation = candidate.currentOccupation ?? ''
  createEditForm.previousOccupation = candidate.previousOccupation ?? ''
  createEditForm.education = candidate.education ?? ''
  createEditForm.desiredOccupation = candidate.desiredOccupation ?? ''
  createEditForm.skills = candidate.skills.map(({ id }) => String(id))

  dialog.value = true
}

const handleCreateCandidateClick = () => {
  selectedCandidateId.value = null
  createEditForm.reset()

  dialog.value = true
}

const handleCreateEditCandidateSubmit = () => {
  if (selectedCandidateId.value) {
    createEditForm.put(`/candidates/${selectedCandidateId.value}`, {
      onSuccess: () => {
        dialog.value = false
        createEditForm.reset()
      },
    })
  } else {
    createEditForm.post('/candidates', {
      onSuccess: () => {
        dialog.value = false
        createEditForm.reset()
      },
    })
  }
}
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
      <template #toolbar-actions>
        <Button @click="handleCreateCandidateClick">
          <CirclePlus class="mr-2 h-4 w-4" />
          Add Candidate
        </Button>
      </template>
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
              <DropdownMenuItem @click="handleEditCandidateClick(data.item)">Edit</DropdownMenuItem>
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

  <!-- create/edit dialog -->
  <Dialog v-model:open="dialog">
    <DialogContent as-child class="sm:max-w-[800px]">
      <form @submit.prevent="handleCreateEditCandidateSubmit">
        <DialogHeader>
          <DialogTitle>Create Candidate</DialogTitle>
        </DialogHeader>

        <div class="grid grid-cols-2 gap-4">
          <FormInput
            v-model="createEditForm.firstName"
            id="firstName"
            label="First Name"
            :error="createEditForm.errors.firstName"
            :required="true"
          />
          <FormInput
            v-model="createEditForm.lastName"
            id="lastName"
            label="Last Name"
            :error="createEditForm.errors.lastName"
            :required="true"
          />
          <FormInput
            v-model="createEditForm.email"
            id="email"
            label="Email"
            :error="createEditForm.errors.email"
            type="email"
          />
          <FormInput
            v-model="createEditForm.phoneNumber"
            id="phoneNumber"
            label="Phone Number"
            :error="createEditForm.errors.phoneNumber"
            :required="true"
          />
          <FormInput
            v-model="createEditForm.passportNumber"
            id="passportNumber"
            label="Passport Number"
            :error="createEditForm.errors.passportNumber"
            :required="true"
          />
          <FormInput
            v-model="createEditForm.experience"
            id="experience"
            label="Experience"
            :error="createEditForm.errors.experience"
          />
          <FormInput
            v-model="createEditForm.currentOccupation"
            id="currentOccupation"
            label="Current Occupation"
            :error="createEditForm.errors.currentOccupation"
          />
          <FormInput
            v-model="createEditForm.previousOccupation"
            id="previousOccupation"
            label="Previous Occupation"
            :error="createEditForm.errors.previousOccupation"
          />
          <FormInput
            v-model="createEditForm.education"
            id="education"
            label="Education"
            :error="createEditForm.errors.education"
          />
          <FormInput
            v-model="createEditForm.desiredOccupation"
            id="desiredOccupation"
            label="Desired Occupation"
            :error="createEditForm.errors.desiredOccupation"
          />
          <TagsCombobox
            id="skills"
            label="Skills"
            wrapper-class="col-span-2"
            :items="skills"
            v-model="createEditForm.skills"
            placeholder="Add skills"
            :error="createEditForm.errors.skills"
          />
        </div>
        <DialogFooter>
          <Button type="submit">create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
