<!-- BO_B0101_020401 -->
<script setup lang="ts">
import { DataTableContainer, WelfareMdButton } from '@/components'
import { useMemberListCouponDetail } from '@/composables'
import { MemberDetailBaseTabProps, memberHeaderFieldTableMemberListCouponDetailConfig } from '@/models'
defineProps<MemberDetailBaseTabProps>()

const { items, totalItems, isLoading, onPageChange, tableRef, onDownLoad } = useMemberListCouponDetail()
</script>
<template>
  <div>
    <DataTableContainer
      ref="tableRef"
      :value="items"
      :loading="isLoading"
      :total-records="totalItems"
      :column-configs="memberHeaderFieldTableMemberListCouponDetailConfig"
      @page-change="onPageChange"
      no-data-label="리스트가 없습니다"
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItems }} 건</h6>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton label="엑셀 다운로드" @click="onDownLoad" class="wf_w-96" buttonType="liner" />
        </div>
      </template>
    </DataTableContainer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberListCouponDetailPage'
}
</script>
