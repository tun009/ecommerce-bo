<script setup lang="ts">
import Paginator, { PageState } from 'primevue/paginator'
import { IconArrowLeft, IconArrowRight, IconArrowLeftDouble, IconArrowRightDouble } from '@/components/icons'
import { WelfarePaginationEmits, WelfarePaginationProps } from '@/models'

const props = defineProps<WelfarePaginationProps>()
const emit = defineEmits<WelfarePaginationEmits>()

const emitEvent = {
  updateFirst: (value: number) => {
    emit('update:first', value)
  },
  updateRows: (value: number) => {
    emit('update:rows', value)
  },
  page: (event: PageState) => {
    emit('page', event)
  }
}
</script>

<template>
  <Paginator v-bind="props" v-on:update:first="emitEvent.updateFirst" v-on:update:rows="emitEvent.updateRows" v-on:page="emitEvent.page">
    <template #firstpagelinkicon>
      <IconArrowLeftDouble />
    </template>
    <template #prevpagelinkicon>
      <IconArrowLeft />
    </template>
    <template #nextpagelinkicon>
      <IconArrowRight />
    </template>
    <template #lastpagelinkicon>
      <IconArrowRightDouble />
    </template>
  </Paginator>
</template>
