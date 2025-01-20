<!-- BO_B0101_020301 -->
<script setup lang="ts">
import { FormGroup } from '@/components/widgets'
import {
  WelfareSelect,
  WelfareBigButton,
  FormGroupSelectInput,
  FormGroupDateFilter,
  MemberListOrderDetailDataTable,
  WelfareInputNumber
} from '@/components'
import { useMemberListOrderDetail } from '@/composables'
import { MemberDetailBaseTabProps } from '@/models'
defineProps<MemberDetailBaseTabProps>()
const {
  query,
  groupDateRef,
  memberSearchMemberOrderStatusSearch,
  memberSearchMemberOrderPeriodOptions,
  memberSearchMemberOrderCodeSearchOptions,
  resetForm,
  submitForm,
  items,
  isLoading,
  onPageChange,
  totalItems,
  tableRef
} = useMemberListOrderDetail()
</script>
<template>
  <div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" is-rounded-top label="주문 상태">
          <WelfareSelect
            placeholder="전체"
            v-model="query.orderStatus"
            :options="memberSearchMemberOrderStatusSearch"
            option-label="label"
            small
            class="wf_w-180"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1" is-border-left label="송장번호">
          <WelfareInputNumber :v-model="query.invoiceNumber" placeholder="숫자만 입력" class="wf_w-180" size="small" />
        </FormGroup>
      </div>
      <FormGroup label="결제 기간">
        <div class="wf_flex wf-space-x-6">
          <WelfareSelect
            placeholder="전체"
            v-model="query.period"
            :options="memberSearchMemberOrderPeriodOptions"
            option-label="label"
            small
            class="wf_w-180"
          />
          <FormGroupDateFilter ref="groupDateRef" v-model:start-date="query.startDate" v-model:end-date="query.endDate" />
        </div>
      </FormGroup>
      <div>
        <FormGroup label="검색어" :is-border-bottom="false" is-rounded-bottom>
          <FormGroupSelectInput
            class="w-full"
            v-model:select="query.codeSearch"
            :selectOptions="memberSearchMemberOrderCodeSearchOptions"
            optionLabel="label"
            select-placeholder="전체"
            v-model:input="query.codeQuery"
            input-placeholder="최대 50개 까지 입력 가능"
            :max-length-input="50"
          />
        </FormGroup>
      </div>
    </div>
    <div class="wf-mt-26 wf_flex wf_justify-center wf-space-x-4">
      <div class="wf_flex wf_items-center wf_justify-center wf-space-x-20">
        <WelfareBigButton type="reset" label="초기화" buttonType="neatral" @onClick="resetForm" />
        <WelfareBigButton label="조회" buttonType="default" @on-click="submitForm()" />
      </div>
    </div>
    <hr class="wf_break-line-n33 wf-my-30" />
    <MemberListOrderDetailDataTable
      ref="tableRef"
      :data="items"
      :total-element="totalItems"
      @page-change="onPageChange"
      :loading="isLoading"
      no-data-label="리스트가 없습니다."
    />
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/member/member-list-order-detail.css');
</style>

<script lang="ts">
export default {
  name: 'MemberListOrderDetailPage'
}
</script>
