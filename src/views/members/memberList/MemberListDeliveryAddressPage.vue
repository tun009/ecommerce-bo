<!-- BO_B0101_020201 -->
<script setup lang="ts">
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { useMemberListDeliveryAddress } from '@/composables'
import { MemberDetailBaseTabProps } from '@/models'
import Column from 'primevue/column'
const props = defineProps<MemberDetailBaseTabProps>()

const { tableRef, isLoading, items, checkedItems, onPageChange, onSelectAllChange, onRowCheckedChange, onDelete } =
  useMemberListDeliveryAddress(props)
</script>
<template>
  <div>
    <DataTablePaginationWithCheckbox
      :value="items"
      :loading="isLoading"
      is-select-invisible
      v-on:page-change="onPageChange"
      v-on:select-all-change="onSelectAllChange"
      v-on:row-checked-change="onRowCheckedChange"
      ref="tableRef"
      no-data-label="리스트가 없습니다."
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{items?.length ?? 0}}건)</h6>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton class="wf_w-69" label="선택 삭제" buttonType="liner" :disabled="!checkedItems.length" @on-click="onDelete" />
        </div>
      </template>
      <template #columns>
        <Column field="id" header="No." class="wf_col-50" />
        <Column field="deliveryAddressCode" header="배송지 구분" class="wf_col-200" />
        <Column field="deliveryLoadNameAddress" header="도로명" class="wf_col-250" />
        <Column field="deliveryLoadLotBasedAddress" header="지번" class="wf_col-250" />
        <Column field="deliveryDetailedAddress" header="상세주소" class="wf_col-200" />
        <Column field="deliveryTelNumber" header="휴대폰번호" class="wf_col-200" />
        <Column field="deliveryCellphoneNumber" header="전화번호" class="wf_col-200" />
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberListDeliveryAddressPage'
}
</script>
