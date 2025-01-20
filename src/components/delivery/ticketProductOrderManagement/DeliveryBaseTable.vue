<script setup lang="ts">
import { formatNumberDot } from '@/common'
import { DataTablePaginationWithCheckbox } from '@/components'
import { DataTableContainerConfigModel } from '@/models'
import Column from 'primevue/column'
import { PageState } from 'primevue/paginator'

export interface DeliveryBaseTableProps {
  hiddenTitle?: boolean
  hiddenPagination?: boolean
  isSelectInvisible?: boolean
  items: any[]
  isLoading: boolean
  totalItems: number
  listChecked: string[]
  columnConfigs?: DataTableContainerConfigModel[]
  showSelection?: boolean
}

interface DeliveryBaseTableEmits {
  (e: 'page-change', params: PageState): void
  (e: 'row-selected', item: any): void
  (e: 'select-all-change', checked: boolean): void
  (e: 'delete-records'): void
}

const emit = defineEmits<DeliveryBaseTableEmits>()

const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onSelectAllChange: (checked: boolean) => {
    emit('select-all-change', checked)
  },
  onRowCheckedChanged: (item: any) => {
    emit('row-selected', item)
  },
  onDeleteRecords: () => {
    emit('delete-records')
  }
}

withDefaults(defineProps<DeliveryBaseTableProps>(), {
  hiddenTitle: false,
  hiddenPagination: false,
  isSelectInvisible: false,
  isLoading: false,
  totalItems: 0,
  items: () => [],
  listChecked: () => [],
  columnConfigs: () => [],
  showSelection: true
})
</script>

<template>
  <div>
    <DataTablePaginationWithCheckbox
      :value="items"
      :loading="isLoading"
      :total-records="totalItems"
      @page-change="eventEmit.onPageChange"
      @row-checked-change="eventEmit.onRowCheckedChanged"
      @select-all-change="eventEmit.onSelectAllChange"
      ref="refTable"
      :hidden-pagination="hiddenPagination"
      :is-select-invisible="isSelectInvisible"
      :show-selection="showSelection"
    >
      <template #title>
        <slot name="title">
          <div>
            <div v-if="!hiddenTitle">
              <h6 class="wf-mr-4">조회 결과&nbsp; 총 {{ formatNumberDot(totalItems) }} 건</h6>
            </div>
          </div></slot
        >
      </template>
      <template #columns>
        <Column v-for="(item, index) in columnConfigs" :key="index" :field="item.field" :header="item.header" :class="item.class">
          <template #body="slotProps">
            <span>{{ slotProps.data[item.field] }}</span>
          </template>
        </Column>
      </template>
      <template #buttons>
        <slot name="buttons"></slot>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
