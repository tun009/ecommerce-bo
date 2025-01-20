<script setup lang="ts">
import { ImgLoader } from '@/assets'
import { BaseDataTablePagination, WelfareCheckbox } from '@/components'
import { useDataTableWithCheckbox } from '@/composables'
import {
  WelfareDataTableSlots,
  WelfareDataTableWithCheckboxEmits,
  WelfareDataTableWithCheckBoxExpose,
  WelfareDataTableWithCheckboxProps
} from '@/models'
import Column from 'primevue/column'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import { computed } from 'vue'

const props = withDefaults(defineProps<WelfareDataTableWithCheckboxProps>(), {
  clearSelectedAllOnPageChange: true,
  showSelection: true
})

const emit = defineEmits<WelfareDataTableWithCheckboxEmits>()

const slots = defineSlots<WelfareDataTableSlots>()

const eventEmit = {
  rowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event)
  },
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onSelectAllChange: (checked: boolean) => {
    emit('select-all-change', checked)
  },
  onRowCheckedChanged: (item: any) => {
    emit('row-checked-change', item)
  },
  onDropdownChange: (select: any) => {
    emit('drop-down-change', select)
  }
}

const params = {
  ...props,
  onSelectAllChange: eventEmit.onSelectAllChange,
  onPageChange: eventEmit.onPageChange,
  onRowCheckedChange: eventEmit.onRowCheckedChanged
}

const data = computed(() => {
  return props.value
})

const { isSelectAll, onCheckboxValueChange, onSelectAllClick, clearSelectedAll, scrollToTop, dataTableRef } = useDataTableWithCheckbox(params, data)

const onDropdownChange = (value: any) => {
  clearSelectedAll()
  eventEmit.onDropdownChange(value)
}

const onChangePage = () => {
  props.clearSelectedAllOnPageChange && clearSelectedAll()
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop,
  clearCheckAll: clearSelectedAll
})
</script>

<template>
  <BaseDataTablePagination ref="dataTableRef" v-bind="props" v-on:page-change="onChangePage" v-on:drop-down-change="onDropdownChange">
    <template #columns>
      <Column columnKey="id" class="wf_m-w-44" v-if="showSelection">
        <template #header>
          <WelfareCheckbox id="select-all" v-model="isSelectAll" size="sm" v-on:click="onSelectAllClick" />
        </template>
        <template #body="slotProps">
          <WelfareCheckbox
            v-model="slotProps.data.isSelected"
            id="{{ slotProps.data.code }}"
            :key="slotProps.data.code"
            @update:modelValue="onCheckboxValueChange(slotProps.data)"
            size="sm"
          />
        </template>
      </Column>
      <slot name="columns"> </slot>
    </template>
    <template #title>
      <slot name="title"> </slot>
    </template>
    <template #buttons>
      <slot name="buttons"> </slot>
    </template>
    <template #loading>
      <div v-if="!slots.loading" class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
        <img class="wf-loading-table" :src="ImgLoader" alt="loading of table" />
      </div>
      <slot v-else name="loading"> </slot>
    </template>
  </BaseDataTablePagination>
</template>
