<!-- BO_B0202_010101 -->
<script lang="ts" setup>
import { useMemberWelfarePointAllocationList } from '@/composables'
import { MemberFormFilterPointAllocation, MemberPointAllocationTable } from '@/components/members'
import { MemberPointAllocationListType } from '@/models'

const {
  values,
  setFieldValue,
  handleChangeCountDate,
  currentFilterDate,
  listInputRow1,
  listRadioLevelMember,
  listSelectDate,
  listSelectRow2,
  handleResetFormFilter,
  items,
  isLoading,
  onPageChange,
  totalItems,
  refTable,
  onRowSelect,
  selectedMember,
  submitRegistration,
  onSubmitForm,
  goToEditPage
} = useMemberWelfarePointAllocationList(MemberPointAllocationListType.deduction)
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <MemberFormFilterPointAllocation
        :current-filter-date="currentFilterDate"
        :list-input-row1="listInputRow1"
        :list-radio-level-member="listRadioLevelMember"
        :list-select-date="listSelectDate"
        :list-select-row2="listSelectRow2"
        :values="values"
        @set-field-value="setFieldValue"
        @handle-change-count-date="handleChangeCountDate"
        @handle-reset-form-filter="handleResetFormFilter"
        @handle-submit-form="onSubmitForm"
        :typePointAllocation="MemberPointAllocationListType.deduction"
      />
      <MemberPointAllocationTable
        ref="refTable"
        :data="items"
        :total-element="totalItems"
        @page-change="onPageChange"
        :loading="isLoading"
        :typePointAllocation="MemberPointAllocationListType.deduction"
        @row-click="onRowSelect"
        :selected-member="selectedMember"
        @submit-registration="submitRegistration"
        @on-edit-page="goToEditPage"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-list.css');
</style>

<script lang="ts">
export default {
  name: 'MemberWelfarePointDeductionListPage'
}
</script>
