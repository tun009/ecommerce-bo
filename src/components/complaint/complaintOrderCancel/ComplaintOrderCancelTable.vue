<script lang="ts" setup>
import {
  MemberPointAdjustmentListFormModel,
  MemberPointAllocationListFormModel,
  MemberPointAllocationListType,
  MemberWelfarePointAllocationTableConfig,
  WelfareDataTableEmits,
  WelfareDataTableProps,
  WelfareDataTableWithCheckBoxExpose
} from '@/models'
import { PageState } from 'primevue/paginator'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { ref } from 'vue'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { ImgLoader } from '@/assets'
import Column from 'primevue/column'

interface ProductTableDataDeliveryProps extends WelfareDataTableProps {
  data?: MemberPointAllocationListFormModel[] | MemberPointAdjustmentListFormModel[]
  loading: boolean
  totalElement: number
  typePointAllocation: MemberPointAllocationListType
  selectedMember: MemberPointAllocationListFormModel | MemberPointAdjustmentListFormModel
}

interface ProductTableDataDeliveryEmits extends WelfareDataTableEmits {
  (e: 'page-change', params: PageState): void

  (e: 'row-click', params: MemberPointAllocationListFormModel[] | MemberPointAdjustmentListFormModel[]): void

  (e: 'submit-registration'): void

  (e: 'on-edit-page'): void
}

const tableRef = ref()
const props = defineProps<ProductTableDataDeliveryProps>()
const emit = defineEmits<ProductTableDataDeliveryEmits>()

const allocationType = props.typePointAllocation === MemberPointAllocationListType.allocation

const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onRowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event.data)
  },
  onSubmitRegistration: () => {
    emit('submit-registration')
  },
  onEditPage: () => {
    emit('on-edit-page')
  }
}
const scrollToTop = () => {
  tableRef.value?.scrollToTop()
}
const onPageChange = (data: PageState) => {
  eventEmit.onPageChange(data)
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop
})
</script>

<template>
  <div class="wf-table-wrapper">
    <DataTablePaginationWithCheckbox
      :value="props.data"
      :loading="props.loading"
      :total-records="props.totalElement"
      @page-change="onPageChange"
      @row-checked-change="() => {}"
      @select-all-change="() => {}"
      ref="refTable"
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ props.totalElement }} 건</h6>
      </template>
      <template #loading>
        <div class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
          <img class="wf-loading-table" :src="ImgLoader" />
        </div>
      </template>
      <template #buttons>
        <WelfareMdButton v-if="allocationType" label="주문취소철회" class="wf_w-69" buttonType="liner" @on-click="eventEmit.onSubmitRegistration" />
        <WelfareMdButton @on-click="eventEmit.onEditPage" label="처리 재요청" class="wf_w-69" buttonType="liner" />
        <WelfareMdButton label="엑셀다운로드" class="wf_w-96" buttonType="liner" />
      </template>
      <template #columns>
        <Column v-for="column in MemberWelfarePointAllocationTableConfig" :key="column.field" class="wf-nowrap" :class="column?.class">
          <template #header>
            {{ column.header }}
          </template>
          <template #body="slotProps">
            {{ slotProps.data?.[column.field] }}
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/complaint/complaint-order-cancel-list.css');
</style>