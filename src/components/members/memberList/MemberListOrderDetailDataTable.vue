<script setup lang="ts">
import { fileDocumentNames, handleDownloadFile } from '@/common'
import { WelfareMdButton, WelfarePagination, WelfareSelect } from '@/components'
import { useBaseTable } from '@/composables'
import {
  WelfareDataTableEmits,
  WelfareDataTableProps,
  WelfareDataTableWithCheckBoxExpose,
  defaultDataTablePropsConfig,
  memberHeaderFieldTableMemberListOrderDetailConfig
} from '@/models'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import Row from 'primevue/row'
import { computed } from 'vue'
export interface ProductTableDataDeliveryProps extends WelfareDataTableProps {
  data: any[] | undefined
  loading: boolean
  totalElement: number | undefined
}

interface ProductTableDataDeliveryEmits extends WelfareDataTableEmits {
  (e: 'page-change', params: PageState): void
  (e: 'select-all-change', checked: boolean): void
  (e: 'row-checked-change', item: any): void
}

const props = withDefaults(defineProps<ProductTableDataDeliveryProps>(), defaultDataTablePropsConfig)
const emit = defineEmits<ProductTableDataDeliveryEmits>()

const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onDropdownChange: (value: any) => {
    emit('drop-down-change', value)
  }
}

const params = {
  ...props,
  onPageChange: eventEmit.onPageChange
}

const data = computed(() => {
  return props.data
})

const { selectRows, eventFirst, scrollToTop, parentRef } = useBaseTable(params)

const onPageChange = (data: PageState) => {
  eventEmit.onPageChange(data)
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop
})
</script>
<template>
  <div ref="parentRef">
    <div class="wf_flex wf_items-center wf_justify-between wf-mb-16">
      <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalElement }} 건</h6>
      <div class="wf-space-x-6 wf_flex">
        <WelfareMdButton
          label="엑셀 다운로드"
          @click="handleDownloadFile(fileDocumentNames.memberList.url, fileDocumentNames.memberList.name)"
          class="wf_w-93"
          buttonType="liner"
        />
        <WelfareSelect
          placeholder="개씩"
          v-if="selectRows && !props.isSelectInvisible"
          v-model="selectRows"
          optionLabel="label"
          class="wf_w-100"
          v-bind="props.selectProps"
        />
      </div>
    </div>
    <DataTable :value="data" :loading="loading">
      <ColumnGroup type="header">
        <Row>
          <Column
            :rowspan="2"
            v-for="(header, index) in memberHeaderFieldTableMemberListOrderDetailConfig[0]"
            :key="index"
            :class="header.class"
            :header="header.header"
          />
          <Column header="상품정보" :colspan="6" />
          <Column header="주문정보" :colspan="8" />
          <Column header="클레임정보" :colspan="5" />
        </Row>
        <Row>
          <Column
            v-for="(header, index) in memberHeaderFieldTableMemberListOrderDetailConfig[1]"
            :key="index"
            :class="header.class"
            :header="header.header"
          />
          <Column
            v-for="(header, index) in memberHeaderFieldTableMemberListOrderDetailConfig[2]"
            :key="index"
            :class="header.class"
            :header="header.header"
          />
          <Column
            v-for="(header, index) in memberHeaderFieldTableMemberListOrderDetailConfig[3]"
            :key="index"
            :class="header.class"
            :header="header.header"
          />
        </Row>
      </ColumnGroup>
      <Column
        v-for="(body, index) in [
          ...memberHeaderFieldTableMemberListOrderDetailConfig[0],
          ...memberHeaderFieldTableMemberListOrderDetailConfig[1],
          ...memberHeaderFieldTableMemberListOrderDetailConfig[2],
          ...memberHeaderFieldTableMemberListOrderDetailConfig[3]
        ]"
        :key="index"
        :field="body.field"
        :class="body.class"
      >
        <template #body="slotProps"> {{ slotProps.data[body.field] }}</template>
      </Column>
      <template #empty>
        <p v-if="!props.loading" class="wf-data-table-empty-data wf_text-n-33 wf-body_02-reg">{{ props.noDataLabel }}</p>
      </template>
    </DataTable>
    <WelfarePagination :rows="50" :pageLinkSize="10" :totalRecords="totalElement" @page="onPageChange" @update:first="eventFirst" />
  </div>
</template>
