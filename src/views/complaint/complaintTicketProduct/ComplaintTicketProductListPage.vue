<!-- BO_F0201_010101 -->
<script setup lang="ts">
import {
  FormGroup,
  WelfareBigButton,
  FormGroupTimeLinesFilterForm,
  WelfareInputText,
  DataTableContainer,
  WelfareMdButton,
  WelfareSelect
} from '@/components'
import { ProductSearchModalWithTableWrapper, ProductGroupControlFilterForm } from '@/components/products'
import { ComplaintGroupCheckBoxForm } from '@/components/complaint'
import {
  ProductSearchType,
  complaintHeaderFieldTableTicketProductListConfig,
  complaintSelectDateOptionsConfig,
  complaintKeyWorkSearchOptionsConfig,
  memberAllocationListDate
} from '@/models'
import { useComplaintTicketProductList } from '@/composables'
const {
  values,
  refTable,
  claimType,
  getIsCheckBox,
  handleCheckBoxChange,
  isDisabledFilter,
  setFieldValue,
  items,
  totalItems,
  onPageChange,
  isLoading,
  currentFilterDate,
  handleChangeCountDate,
  handleChangeValueSelect,
  handleChangeFilterForm,
  formFilter,
  handleResetFilter,
  // listInputFindProduct,
  listCompanyChild,
  listButtonDate
} = useComplaintTicketProductList()
</script>
<template>
  <div class="wf_border-page">
    <div class="complaint-container-form">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1" is-rounded-top label="클레임 유형">
              <ComplaintGroupCheckBoxForm
                :data="claimType"
                field="claimType"
                :get-is-check-box="getIsCheckBox"
                @change-check-box="handleCheckBoxChange"
                :disabled="isDisabledFilter"
              />
            </FormGroup>
            <FormGroup class="wf_flex-1" is-border-left label="클레임 코드">
              <WelfareInputText :v-model="values.claimKey" placeholder="" class="wf_w-180" size="small" :disabled="isDisabledFilter" />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row wf_items-center">
            <div class="wf_flex wf_flex-row wf_flex-1">
              <FormGroup class="wf-complaint-w-input wf_flex-1" label="회원">
                <ProductSearchModalWithTableWrapper
                  ref="searchCustomerRef"
                  class="wf-product-base-info-search wf_w-full"
                  :type="ProductSearchType.CUSTOMER"
                  placeholder-input="(주)고객사 조회"
                  label-button="조회"
                  :disabled="isDisabledFilter"
                />
              </FormGroup>
              <FormGroup class="wf-complaint-w-input wf_flex-1" is-border-left label="고객사">
                <ProductSearchModalWithTableWrapper
                  ref="searchCustomerRef"
                  class="wf-product-base-info-search wf_w-full"
                  :type="ProductSearchType.CUSTOMER"
                  placeholder-input="(주)고객사 조회"
                  @selectValue="(value) => setFieldValue('customer', value.code)"
                  label-button="조회"
                  :disabled="isDisabledFilter"
                />
              </FormGroup>
            </div>
            <div class="wf_flex wf_flex-row wf_flex-1">
              <FormGroup custom-class="wf-pr-8" class="wf_flex-1" is-border-left label="주문 코드">
                <WelfareInputText :disabled="isDisabledFilter" :v-model="values.customerKey" placeholder="" class="wf_w-180" size="small" />
              </FormGroup>
              <FormGroup custom-class="wf-pr-8" class="wf_flex-1" is-border-left label="주문자명">
                <WelfareInputText :disabled="isDisabledFilter" :v-model="values.fromDate" placeholder="" class="wf_w-180" size="small" />
              </FormGroup>
            </div>
          </div>
          <!-- <ProductGroupInputCompanyForm
            :data-field="listInputFindProduct[0]"
            :company-child="values.companyChild"
            :disabled="isDisabledFilter"
            :list-company-child="listCompanyChild"
            :curren-value-input="values[listInputFindProduct[0].field]"
            @input-value="(value) => setFieldValue(listInputFindProduct[0].field, value)"
            @select-value="(value) => handleChangeValueSelect('companyChild', value)"
            ref="componentSearch"
          /> -->
          <FormGroup lass="wf_flex-1" label="판매사">
            <div class="wf_flex wf_flex-1 wf-space-x-6">
              <div class="wf_flex wf-space-x-4">
                <WelfareInputText disabled :v-model="values.customerKey" placeholder="전체" class="wf_w-180" size="small" />
                <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" />
              </div>
              <WelfareSelect
                disabled
                placeholder="전체"
                v-model="values.companyChild"
                :options="listCompanyChild"
                option-label="label"
                small
                class="wf_w-180"
              />
            </div>
          </FormGroup>
          <FormGroupTimeLinesFilterForm
            label="기간"
            :disabled="isDisabledFilter"
            :current-active-date="currentFilterDate"
            @on-change-filter-date="handleChangeCountDate"
            :from-date="values.fromDate"
            :to-date="values.toDate"
            :option-date-button="listButtonDate.concat(memberAllocationListDate)"
            @on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
            @on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
            :current-type-date-product-select="values.periodSearchType"
            @on-select-type="(value) => handleChangeValueSelect('periodSearchType', value)"
            :options-product-type-date="complaintSelectDateOptionsConfig"
          />
        </form>
        <ProductGroupControlFilterForm
          :disabled="isDisabledFilter"
          :list-filters="complaintKeyWorkSearchOptionsConfig"
          @on-change-filter="handleChangeFilterForm"
          :current-filter="formFilter"
        />
      </div>
      <div class="wf-mt-27">
        <div class="wf_flex wf_items-center wf_justify-center wf-space-x-20">
          <WelfareBigButton type="reset" label="초기화" buttonType="neatral" @on-click="handleResetFilter" />
          <WelfareBigButton label="조회" buttonType="default" />
        </div>
      </div>
    </div>
    <hr class="wf_break-line-gray" />
    <div class="wf-px-30 wf-py-30">
      <DataTableContainer
        ref="refTable"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        :column-configs="complaintHeaderFieldTableTicketProductListConfig"
        @page-change="onPageChange"
        no-data-label="리스트가 없습니다"
      >
        <template #title>
          <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{ totalItems ?? 0 }} 건)</h6>
        </template>
        <template #buttons>
          <div class="wf-space-x-6 wf_flex">
            <WelfareMdButton label="엑셀 다운로드" class="wf_w-93" buttonType="liner" />
          </div>
        </template>
      </DataTableContainer>
    </div>
  </div>
  <div class=""></div>
</template>
<script lang="ts">
export default {
  name: 'ComplaintTicketProductListPage'
}
</script>
<style scoped>
@import url('@/assets/css/view/complaint/complaint-ticket-prod-list.css');
</style>
