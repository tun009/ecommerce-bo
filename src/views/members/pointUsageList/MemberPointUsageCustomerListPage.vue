<!-- BO_B0203_020101 -->

<script setup lang="ts">
import { MemberCustomerCompanyTotalTable, MemberPointUsageCustomerTable } from '@/components/members'
import { WelfareInputText, WelfareSelect } from '@/components/uikit'
import { FormButtonHandleForm, FormGroup, FormGroupTimeLinesFilterForm } from '@/components/widgets'
import { useMemberPointUsageCustomerList } from '@/composables/members'
import { memberPUCustomerListHeaderTableConfig } from '@/models/views'

const {
  values,
  setFieldValue,
  handleResetFormFilter,
  currentFilterDate,
  handleChangeCountDate,
  memberPointUsageCustomerListSelectDateOptions,
  memberPointUsageCustomerTotalPointOptions,
  memberPointUsageCustomerSearchOptions,
  items,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  totalItems,
  refTable,
  handleSubmitForm,
  dataExport
} = useMemberPointUsageCustomerList()
</script>
<template>
  <div class="wf-body-wrap-content">
    <form class="wf-space-y-30 wf_flex wf_flex-col wf-mt-0 wf-px-30 wf-pb-28 wf-mx--30 wf-btn-border-b--ncc">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" is-rounded-top label="복지포인트">
            <div class="wf_flex wf_items-center wf-space-x-4">
              <WelfareSelect
                :model-value="values.memberPoint"
                @update:model-value="(value) => setFieldValue('memberPoint', value.value)"
                class="wf_w-180"
                :placeholder="'총 보유포인트'"
                optionLabel="label"
                :options="memberPointUsageCustomerTotalPointOptions"
                small
              />
              <WelfareInputText
                :model-value="`${values.minimumPoint}`"
                @update:model-value="(value) => setFieldValue('minimumPoint', value)"
                class="wf_w-full"
                placeholder="최소"
                size="small"
                input-type="number"
              />

              <span class="wf-date_picker-double-text wf_text-n-33">~</span>

              <WelfareInputText
                :model-value="`${values.maximumPoint}`"
                @update:model-value="(value) => setFieldValue('maximumPoint', value)"
                class="wf_w-full"
                placeholder="최대"
                size="small"
                input-type="number"
              />
            </div>
          </FormGroup>
        </div>
        <FormGroupTimeLinesFilterForm
          class=""
          customClass="wf-pb-1"
          :is-border-bottom="true"
          :is-rounded-bottom="false"
          label="기간"
          :current-active-date="currentFilterDate"
          @on-change-filter-date="handleChangeCountDate"
          :from-date="values.fromDate"
          :to-date="values.toDate"
          @on-change-date-from="(value) => setFieldValue('fromDate', value)"
          @on-change-date-to="(value) => setFieldValue('toDate', value)"
          :current-type-date-product-select="values.dateSelect"
          @on-select-type="(value) => setFieldValue('dateSelect', value)"
          :options-product-type-date="memberPointUsageCustomerListSelectDateOptions"
        />
        <div class="wf_flex wf_items-center wf_w-full">
          <FormGroup class="wf_flex-1 wf_w-full" is-rounded-bottom :is-border-bottom="false" label="검색어">
            <div class="wf_flex wf_items-center wf-space-x-4 wf_w-full">
              <WelfareSelect
                :model-value="values.customer"
                @update:model-value="(value) => setFieldValue('customer', value.value)"
                class="wf_w-180"
                :placeholder="'회원 보유 복지포인트'"
                optionLabel="label"
                :options="memberPointUsageCustomerSearchOptions"
                small
              />
              <WelfareInputText
                :model-value="values.keyword"
                @update:model-value="(value) => setFieldValue('keyword', value.value)"
                class="wf_w-full"
                placeholder="검색어 입력"
                size="small"
                :max-length="50"
              />
            </div>
          </FormGroup>
        </div>
      </div>

      <FormButtonHandleForm @on-reset="handleResetFormFilter" @on-submit="handleSubmitForm" />
    </form>

    <!-- DataTable -->
    <div class="wf-pt-30 wf-w-full wf_flex wf_flex-col wf-space-y-2">
      <MemberCustomerCompanyTotalTable :items="[]" :data-download="dataExport" />
      <MemberPointUsageCustomerTable
        class="wf-member-point-usage-list"
        ref="refTable"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        @page-change="onPageChange"
        @row-checked-change="onRowSelected"
        @select-all-change="onSelectAllChange"
        noDataLabel="복지포인트 리스트가 없습니다."
        :headerTable="memberPUCustomerListHeaderTableConfig"
        :totalItem="totalItems"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-usage-list.css');
</style>

<script lang="ts">
export default {
  name: 'MemberPointUsageCustomerListPage'
}
</script>
