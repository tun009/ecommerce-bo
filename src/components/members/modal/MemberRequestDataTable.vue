<script setup lang='ts'>
import { ImgLoader } from '@/assets'
import { WelfarePagination, WelfareSelect } from '@/components'
import { useBaseTable } from '@/composables'
import {
  defaultDataTablePropsConfig,
  memberRequestTableHeaderConfig,
  WelfareDataTableEmits,
  WelfareDataTableExpose,
  WelfareDataTableProps
} from '@/models'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable, { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import Row from 'primevue/row'
import { computed } from 'vue'

const props = withDefaults(defineProps<WelfareDataTableProps>(), defaultDataTablePropsConfig)

const emit = defineEmits<WelfareDataTableEmits>()

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
  <div ref='parentRef' class='wf-base-table-wrap'>
    <div v-if='props.loading' class='p-datatable-loading-overlay p-component-overlay' data-pc-section='loadingoverlay'>
      <img class='wf-loading-table' alt='' :src='ImgLoader' />
    </div>
    <div class='wf_flex wf_items-center wf_justify-between wf-mb-16'>
      <p>
        <span class='wf-body_01-semi'>조회 결과</span>&nbsp;
        <span class='wf-body_01-mid wf_text-n-8-f'>(총 {{ totalRecords ?? 0 }}건)</span>
      </p>
      <div class='wf-space-x-6 wf_flex'>
        <slot name='buttons'></slot>
        <WelfareSelect
          v-if='selectRows && !props.isSelectInvisible'
          v-model='selectRows'
          placeholder='개씩'
          optionLabel='label'
          class='wf_w-100'
          small
          v-bind='props.selectProps'
          v-on:update:model-value='onSelectChange'
        />
      </div>
    </div>
    <DataTable ref='tableRef' v-bind='props' lazy :dataKey='props.dataKey' :loading='false'
               @row-click='eventEmit.rowClick'>
      <ColumnGroup type='header'>
        <Row>
          <Column header='회원정보' :colspan='7' />
          <Column header='기업정보' :colspan='3' />
          <Column
            :rowspan='2'
            v-for='(header, index) in memberRequestTableHeaderConfig.slice(10)'
            :key='index'
            :class='header.class'
            :header='header.header'
          />
        </Row>
        <Row>
          <Column v-for='(header, index) in memberRequestTableHeaderConfig.slice(0, 7)' :key='index'
                  :class='header.class' :header='header.header' />
          <Column v-for='(header, index) in memberRequestTableHeaderConfig.slice(7, 10)' :key='index'
                  :class='header.class' :header='header.header' />
        </Row>
      </ColumnGroup>
      <Column
        v-for='(header, index) in memberRequestTableHeaderConfig'
        :key='index'
        :class='header.class'
        :header='header.header'
        :field='header.field'
      />
      <template #empty>
        <p v-if='!props.loading' class='wf-data-table-empty-data wf_text-n-33 wf-body_02-reg'>{{ props.noDataLabel
          }}</p>
      </template>
    </DataTable>
    <WelfarePagination
      :rows='rowsComputed'
      :pageLinkSize='props.pageLinkSize'
      :totalRecords='props.totalRecords'
      @page='eventEmit.onPageChange'
      @update:first='eventFirst'
    />
  </div>
</template>
