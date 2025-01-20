<script setup lang="ts">
import { WelfareMdButton } from '@/components/uikit'
import Column from 'primevue/column'
import DataTable, { DataTableRowClickEvent } from 'primevue/datatable'

interface ProductDataTableProps {
  data?: any[]
}

interface ProductDataTableEmits {
  (e: 'row-click', event: DataTableRowClickEvent): void
  (e: 'on-delete-record', id: string): void
}

defineProps<ProductDataTableProps>()
const emit = defineEmits<ProductDataTableEmits>()
const eventEmit = {
  rowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event)
  },
  onDeleteRecord: (id: string) => {
    emit('on-delete-record', id)
  }
}
</script>

<template>
  <DataTable :value="data" @row-click="eventEmit.rowClick">
    <Column field="code" header="상품코드" class="column" />
    <Column field="name" header="상품명" class="column" />
    <Column field="price" header="판매가(VAT포함)" class="column" />

    <slot name="discountAmount" />

    <Column field="salesStatus" header="판매상태" class="column" />

    <slot name="instantDiscountedPrice" />

    <Column field="registrant" header="등록자" class="column" />
    <Column field="registrationDate" header="등록일시" class="column" />
    <Column header="수정">
      <template #body="slotProps">
        <WelfareMdButton @click="eventEmit.onDeleteRecord(slotProps.data.id)" label="삭제" buttonType="liner" buttonSize="small" />
      </template>
    </Column>
    <template #empty>
      <p class="wf-data-table-empty-data wf_text-n-33 wf-body_02-reg">등록된 상품이 없습니다.</p>
    </template>
  </DataTable>
</template>

<style scoped>
@import url('@/assets/css/view/product/promotion/product-promotion-data-table.css');
</style>
