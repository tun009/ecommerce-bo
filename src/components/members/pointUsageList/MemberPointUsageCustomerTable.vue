<script setup lang="ts">
import { ImgLoader } from '@/assets'
import { formatNumberDot } from '@/common'
import { WelfarePagination, WelfareSelect } from '@/components'
import { useBaseTable } from '@/composables'
import { WelfareDataTableEmits, WelfareDataTableExpose, WelfareDataTableProps, WelfareDataTableSlots, defaultDataTablePropsConfig } from '@/models'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable, { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import Row from 'primevue/row'
import { computed } from 'vue'

export interface MemberPointUsageCustomerProps extends WelfareDataTableProps {
  headerTable: any[]
  totalItem: number | undefined
}

const props = withDefaults(defineProps<MemberPointUsageCustomerProps>(), defaultDataTablePropsConfig)

const emit = defineEmits<WelfareDataTableEmits>()

defineSlots<WelfareDataTableSlots>()

const eventEmit = {
  rowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event)
  },
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onDropdownChange: (select: any) => {
    emit('drop-down-change', select)
  }
}

const params = {
  ...props,
  onPageChange: eventEmit.onPageChange
}

const { selectRows, eventFirst, scrollToTop, parentRef } = useBaseTable(params)

defineExpose<WelfareDataTableExpose>({
  scrollToTop: scrollToTop
})

const rowsComputed = computed(() => {
  return selectRows?.value ? selectRows.value.value : props.rows
})

const onSelectChange = (value: any) => {
  eventEmit.onDropdownChange(value)
}
</script>

<template>
  <div ref="parentRef" class="wf-base-table-wrap">
    <div v-if="props.loading" class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
      <img class="wf-loading-table" alt="" :src="ImgLoader" />
    </div>
    <div class="wf_flex wf_items-center wf_justify-between wf-mb-16">
      <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ formatNumberDot(totalItem) }} 건</h6>
      <div class="wf-space-x-6 wf_flex">
        <slot name="buttons"></slot>
        <WelfareSelect
          v-if="selectRows && !props.isSelectInvisible"
          v-model="selectRows"
          placeholder="개씩"
          optionLabel="label"
          class="wf_w-100"
          v-bind="props.selectProps"
          v-on:update:model-value="onSelectChange"
        />
      </div>
    </div>
    <DataTable ref="tableRef" v-bind="props" lazy :dataKey="props.dataKey" :loading="false" @row-click="eventEmit.rowClick">
      <ColumnGroup type="header">
        <Row>
          <Column :rowspan="2" v-for="(item, index) in headerTable.slice(0, 3)" :key="index" :class="item.class" :header="item.header" />
          <Column header="포인트 현황" :colspan="4" />
          <Column header="등록회원 수" :colspan="2" />
          <Column :rowspan="2" v-for="(item, index) in headerTable.slice(9)" :key="index" :class="item.class" :header="item.header" />
        </Row>
        <Row>
          <Column v-for="(item, index) in headerTable.slice(3, 7)" :key="index" :class="item.class" :header="item.header" />
          <Column v-for="(item, index) in headerTable.slice(7, 9)" :key="index" :class="item.class" :header="item.header" />
          <Column :rowspan="2" v-for="(item, index) in headerTable.slice(9)" :key="index" :class="item.class" />
        </Row>
      </ColumnGroup>
      <Column v-for="(item, index) in headerTable" :key="index" :field="item.field" :class="item.class">
        <template #body="slotProps">
          <span>{{ slotProps.data[item.field] }}</span>
        </template>
      </Column>
      <template #empty>
        <p v-if="!props.loading" class="wf-data-table-empty-data wf_text-n-33 wf-body_02-reg">{{ props.noDataLabel }}</p>
      </template>
    </DataTable>
    <WelfarePagination
      :rows="rowsComputed"
      :pageLinkSize="props.pageLinkSize"
      :totalRecords="props.totalRecords"
      @page="eventEmit.onPageChange"
      @update:first="eventFirst"
    />
  </div>
</template>
