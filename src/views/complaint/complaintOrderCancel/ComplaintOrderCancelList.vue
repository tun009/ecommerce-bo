<!-- BO_F0202_010101 -->
<script lang="ts" setup>
import { useComplaintOrderCancelList } from '@/composables'
import { MemberPointAllocationListType } from '@/models'
import ComplaintFormFilterOrderCancel from '@/components/complaint/complaintOrderCancel/ComplaintFormFilterOrderCancel.vue'
import ComplaintOrderCancelTable from '@/components/complaint/complaintOrderCancel/ComplaintOrderCancelTable.vue'

const {
  values,

  setFieldValue,
  handleChangeCountDate,
  currentFilterDate,
  inputRow1,
  selectRow1,
  listInputRow2,
  listInputRow3,
  listInputRow4,
  inputRow4,
  selectRow4,
  listSelectDate,
  listSelectSearchType,
  querySearch,
  handleResetFormFilter,
  items,
  isLoading,
  onPageChange,
  totalItems,
  refTable,
  onSubmitForm,
  onRowSelect,
  selectedMember,
  submitRegistration,
  goToEditPage
} = useComplaintOrderCancelList(MemberPointAllocationListType.allocation)
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <ComplaintFormFilterOrderCancel
        :current-filter-date="currentFilterDate"
        :input-row1="inputRow1"
        :select-row1="selectRow1"
        :list-input-row2="listInputRow2"
        :list-input-row3="listInputRow3"
        :list-input-row4="listInputRow4"
        :input-row4="inputRow4"
        :select-row4="selectRow4"
        :list-select-date="listSelectDate"
        :list-select-search-type="listSelectSearchType"
        :query-search="querySearch"
        :values="values"
        :typePointAllocation="MemberPointAllocationListType.allocation"
        @set-field-value="setFieldValue"
        @handle-change-count-date="handleChangeCountDate"
        @handle-reset-form-filter="handleResetFormFilter"
        @handle-submit-form="onSubmitForm"
      />
      <ComplaintOrderCancelTable
        ref="refTable"
        :data="items"
        :total-element="totalItems"
        @page-change="onPageChange"
        :loading="isLoading"
        :typePointAllocation="MemberPointAllocationListType.allocation"
        :selected-member="selectedMember"
        @row-click="onRowSelect"
        @submit-registration="submitRegistration"
        @on-edit-page="goToEditPage"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/complaint-order-cancel-list.css');
</style>

<script lang="ts">
export default {
  name: 'ComplaintOrderCancelList'
}
</script>