<script lang="ts" setup>
import {
  MemberPointAdjustmentListFormModel,
  MemberPointAllocationListFormModel,
  MemberPointAllocationListType,
  MemberWelfarePointAdjustmentTableConfig,
  MemberWelfarePointAllocationTableConfig,
  WelfareDataTableEmits,
  WelfareDataTableProps,
  WelfareDataTableWithCheckBoxExpose
} from '@/models'
import { PageState } from 'primevue/paginator'
import { DataTableContainer, WelfareMdButton } from '@/components'
import { ref } from 'vue'
import { MEMBER_DETAIL_INFO } from '@/common'
import { DataTableRowClickEvent } from 'primevue/datatable'

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
    <DataTableContainer
      :value="props.data"
      @page-change="onPageChange"
      :total-records="props.totalElement"
      :loading="props.loading"
      :column-configs="allocationType ? MemberWelfarePointAllocationTableConfig : MemberWelfarePointAdjustmentTableConfig"
      ref="tableRef"
      @row-click="eventEmit.onRowClick"
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ props.totalElement }} 건</h6>
      </template>
      <template v-if="!allocationType" #body-customerCode="{ props }">
        <router-link class="wf_text-sub-02" :to="`${MEMBER_DETAIL_INFO}`" target="_blank">
          {{ props.data.customerCode }}
        </router-link>
      </template>
      <template v-if="allocationType" #body-companyCode="{ props }">
        <router-link class="wf_text-sub-02" :to="`${MEMBER_DETAIL_INFO}`" target="_blank">
          {{ props.data.companyCode }}
        </router-link>
      </template>
      <template v-if="!allocationType" #body-pointDeductionCode="{ props }">
        <router-link class="wf_text-sub-02" :to="`${MEMBER_DETAIL_INFO}`" target="_blank">
          {{ props.data.pointDeductionCode }}
        </router-link>
      </template>
      <template v-if="allocationType" #body-pointAllocationCode="{ props }">
        <router-link class="wf_text-sub-02" :to="`${MEMBER_DETAIL_INFO}`" target="_blank">
          {{ props.data.pointAllocationCode }}
        </router-link>
      </template>
      <template #buttons>
        <WelfareMdButton v-if="allocationType" label="조정등록" class="wf_w-69" buttonType="liner"
                         @on-click="eventEmit.onSubmitRegistration" />
        <WelfareMdButton @on-click="eventEmit.onEditPage" :label="allocationType ? `배정등록` : `차감 등록`" class="wf_w-69"
                         buttonType="liner" />
        <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" />
      </template>
    </DataTableContainer>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-list.css');
</style>