<!-- BO_B0101_020402 -->
<script setup lang="ts">
import { DataTableContainer, WelfareMdButton } from '@/components'
import { useMemberListPointDetail } from '@/composables'
import {
  MemberDetailBaseTabProps,
  memberHeaderFieldTableMemberListPointPaymentDetailConfig,
  memberHeaderFieldTableMemberListPointUsageDetailConfig
} from '@/models'
defineProps<MemberDetailBaseTabProps>()
const {
  itemsPayment,
  totalItemsPayment,
  isLoadingPayment,
  onPageChangePayment,
  tablePaymentRef,
  itemsUsage,
  totalItemsUsage,
  isLoadingUsage,
  onPageChangeUsage,
  tableUsageRef,
  onDownLoadPayment,
  onDownLoadUsage
} = useMemberListPointDetail()
</script>
<template>
  <div>
    <DataTableContainer
      ref="tablePaymentRef"
      :value="itemsPayment"
      :loading="isLoadingPayment"
      :total-records="totalItemsPayment"
      :column-configs="memberHeaderFieldTableMemberListPointPaymentDetailConfig"
      @page-change="onPageChangePayment"
      no-data-label="리스트가 없습니다."
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItemsPayment }} 건</h6>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton label="엑셀 다운로드" @click="onDownLoadPayment" class="wf_w-96" buttonType="liner" />
        </div>
      </template>
    </DataTableContainer>
    <hr class="wf_break-line-gray wf-my-26" />
    <DataTableContainer
      ref="tableUsageRef"
      :value="itemsUsage"
      :loading="isLoadingUsage"
      :total-records="totalItemsUsage"
      :column-configs="memberHeaderFieldTableMemberListPointUsageDetailConfig"
      @page-change="onPageChangeUsage"
      no-data-label="리스트가 없습니다."
    >
      <template #title>
        <div class="wf_flex wf_justify-center wf_items-center wf-space-x-20">
          <h6 class="wf_text-n-33">지급 내역 &nbsp;총{{ totalItemsUsage }} 건</h6>
          <span class="wf-body_01-mid wf_flex">
            사용가능 포인트 &nbsp;
            <span class="wf_text-sub-01">{{ totalItemsUsage }}</span>
          </span>
        </div>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton label="엑셀 다운로드" @click="onDownLoadUsage" class="wf_w-96" buttonType="liner" />
        </div>
      </template>
    </DataTableContainer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberListPointDetailPage'
}
</script>
