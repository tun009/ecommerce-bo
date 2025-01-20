<!-- BO_B0203_010101 -->

<script setup lang="ts">
import { MemberCustomerInfoTable, MemberPointUsageListTable, MemberSearchWithTableWrapperModal } from '@/components/members'
import { ProductSearchModalWithTableWrapper } from '@/components/products'
import { WelfareInputText, WelfareSelect } from '@/components/uikit'
import { FormButtonHandleForm, FormGroup, FormGroupTimeLinesFilterForm } from '@/components/widgets'
import { useMemberPointUsageList } from '@/composables/members'
import { ProductSearchType } from '@/models'
const {
  values,
  setFieldValue,
  handleResetFormFilter,
  currentFilterDate,
  handleChangeCountDate,
  memberListSelectDateOptions,
  memberListSelectWelfarePointOptions,
  items,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  totalItems,
  refTable,
  onShowMemberWelfarePointUsageDetailsModal,
  memberListButtonDateFilter,
  handlesSubmitForm,
  searchCompanyCoderRef,
  searchMemberNameRef,
  customerInformationData,
  onDownLoadExcel,
  handleOpenPopupSearchMember
} = useMemberPointUsageList()
</script>

<template>
  <div class="wf-body-wrap-content">
    <form class="wf-space-y-30 wf_flex wf_flex-col wf-mt-0 wf-px-30 wf-pb-28 wf-mx--30 wf-btn-border-b--ncc">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" is-rounded-top label="고객사(고객사 코드)" required>
            <ProductSearchModalWithTableWrapper
              ref="searchCompanyCoderRef"
              @selectValue="
                (value) => {
                  setFieldValue('companyCode', value)
                }
              "
              class="wf-product-base-info-search"
              :type="ProductSearchType.CUSTOMER"
              placeholder-input="선택"
              label-button="조회"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" is-border-left label="회원 명">
            <MemberSearchWithTableWrapperModal 
              ref="searchMemberNameRef"
              @selectValue="
                (value) => {
                  setFieldValue('memberName', value)
                }
              "
              class="wf-product-base-info-search"
              placeholder-input="회원명 조회"
              label-button="조회"
              @on-open-popup-search-member="handleOpenPopupSearchMember"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="복지포인트">
            <div class="wf_flex wf_items-center wf-space-x-4">
              <WelfareSelect
                :model-value="values.pointSelect"
                @update:model-value="(value) => setFieldValue('pointSelect', value)"
                class="wf_w-180"
                :placeholder="'회원 보유 복지포인트'"
                optionLabel="label"
                :options="memberListSelectWelfarePointOptions"
                small
              />
              <WelfareInputText
                :model-value="`${values.minPoint}`"
                @update:model-value="(value) => setFieldValue('minPoint', value)"
                class="wf_w-176"
                placeholder="최소"
                size="small"
                inputType="number"
              />
              <span class="wf-date_picker-double-text wf_text-n-33">~</span>
              <WelfareInputText
                :model-value="`${values.maxPoint}`"
                @update:model-value="(value) => setFieldValue('maxPoint', value)"
                class="wf_w-176"
                placeholder="최대"
                size="small"
                inputType="number"
              />
            </div>
          </FormGroup>
        </div>
        <FormGroupTimeLinesFilterForm
          class=""
          customClass="wf-pb-1"
          :is-border-bottom="false"
          is-rounded-bottom
          label="기간"
          :current-active-date="currentFilterDate"
          @on-change-filter-date="handleChangeCountDate"
          :from-date="values.fromDate"
          :to-date="values.toDate"
          @on-change-date-from="(value) => setFieldValue('fromDate', value)"
          @on-change-date-to="(value) => setFieldValue('toDate', value)"
          :current-type-date-product-select="values.dateSelect"
          @on-select-type="(value) => setFieldValue('dateSelect', value)"
          :options-product-type-date="memberListSelectDateOptions"
          :option-date-button="memberListButtonDateFilter"
        />
      </div>
      <FormButtonHandleForm @on-reset="handleResetFormFilter" @on-submit="handlesSubmitForm" />
    </form>

    <!-- DataTable -->
    <div class="wf-pt-30 wf-w-full wf_flex wf_flex-col">
      <MemberCustomerInfoTable :items="customerInformationData" @on-download-excel="onDownLoadExcel" />
      <MemberPointUsageListTable
        ref="refTable"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        @page-change="onPageChange"
        @row-checked-change="onRowSelected"
        @select-all-change="onSelectAllChange"
        @show-modal-detail="onShowMemberWelfarePointUsageDetailsModal"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-usage-list.css');
</style>

<script lang="ts">
export default {
  name: 'MemberPointUsageListPage'
}
</script>
