<!-- BO_E0201_010101 -->
<script setup lang="ts">
import { DeliveryBaseTable, MemberSearchWithTableWrapperModal, WelfareBigButton, WelfareInputText, WelfareInputTextWithValidation, WelfareMdButton, WelfareSelect } from '@/components'
import { ProductSearchModalWithTableWrapper } from '@/components/products'
import { FormGroup, FormGroupTimeLinesFilterForm } from '@/components/widgets'
import { useDeliveryTicketProductOrderManagement } from '@/composables'
import {
ProductSearchType,
deliveryKeywordSearchOptions,
deliveryListSelectDateOptionsConfig,
deliveryOrderChannelOptions,
deliveryPaymentMethodOptions,
deliveryTicketProductListOrderStatusHeaderTableConfig
} from '@/models'

const {
  values,
  setFieldValue,
  resetForm,
  onPageChange,
  listChecked,
  onRowSelected,
  onSelectAllChange,
  items,
  isLoading,
  refTable,
  currentFilterDate,
  handleChangeCountDate,
  onSubmit,
  onDownload,
  searchCustomerKeyRef,
  searchOrderMemberKeyRef,
  handleOpenPopupSearchMember
} = useDeliveryTicketProductOrderManagement()
</script>

<template>
  <div>
    <div class="wf-p-30 wf-space-y-30">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="주문코드">
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder="주문코드 조회"
              :disabled="!!values.keywordSearchType"
              :model-value="values.orderKey"
              @update:model-value="(value) => setFieldValue('orderKey', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="고객사">
            <ProductSearchModalWithTableWrapper
              ref="searchCustomerKeyRef"
              @selectValue="
                (value) => {
                  setFieldValue('customerKey', value.code)
                }
              "
              class="wf-product-base-info-search"
              :type="ProductSearchType.CUSTOMER"
              placeholder-input="선택"
              label-button="조회"
              :disabled="!!values.keywordSearchType"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-form-group-small" custom-class="wf-pb-1 wf-pl-11" label="주문회원">
            <MemberSearchWithTableWrapperModal
              ref="searchOrderMemberKeyRef"
              @selectValue="
                (value) => {
                  setFieldValue('orderMemberKey', value.memberKey)
                }
              "
              class="wf-product-base-info-search"
              placeholder-input="선택"
              label-button="조회"
              :disabled="!!values.keywordSearchType"
              @on-open-popup-search-member="handleOpenPopupSearchMember"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-9" is-border-left label="주문자">
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder="주문자명 조회"
              :disabled="!!values.keywordSearchType"
              :model-value="values.ordererName"
              @update:model-value="(value) => setFieldValue('ordererName', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-10" is-border-left label="수령자">
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder="수령자명 조회"
              :disabled="!!values.keywordSearchType"
              :model-value="values.receiverName"
              @update:model-value="(value) => setFieldValue('receiverName', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-10" is-border-left label="수령자 휴대폰">
            <WelfareInputTextWithValidation
              class="wf_w-180"
              size="small"
              inputType='number'
              placeholder="수령자 휴대폰 번호 조회"
              :disabled="!!values.keywordSearchType"
              name='receiverPhone'
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="결제수단">
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              small
              placeholder="전체"
              :disabled="!!values.keywordSearchType"
              :options="deliveryPaymentMethodOptions"
              :model-value="values.paymentMethod"
              @update:model-value="(value) => setFieldValue('paymentMethod', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12 wf-pr-9" is-border-left label="주문채널">
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              small
              placeholder="전체"
              :disabled="!!values.keywordSearchType"
              :options="deliveryOrderChannelOptions"
              :model-value="values.orderChannel"
              @update:model-value="(value) => setFieldValue('orderChannel', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroupTimeLinesFilterForm
            class="wf_h-42 wf-pl-"
            is-border-bottom
            is-rounded-bottom
            label="기간"
            ref="refTable"
            disabled-select-option
            :disabled="!!values.keywordSearchType"
            select-placeholder="결제일"
            :current-active-date="currentFilterDate"
            @on-change-filter-date="handleChangeCountDate"
            :from-date="values.fromDate"
            :to-date="values.toDate"
            @on-change-date-from="(value) => setFieldValue('fromDate', value)"
            @on-change-date-to="(value) => setFieldValue('toDate', value)"
            :current-type-date-product-select="values.dateSelect"
            @on-select-type="(value) => setFieldValue('dateSelect', value)"
            :options-product-type-date="deliveryListSelectDateOptionsConfig"
          />
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="검색어" :isBorderBottom="false" isRoundedBottom>
            <WelfareSelect
              class="wf_w-180 wf-mr-6"
              optionLabel="label"
              option-value="value"
              small
              placeholder="사용안함"
              :options="deliveryKeywordSearchOptions"
              :model-value="values.keywordSearchType"
              @update:model-value="(value) => setFieldValue('keywordSearchType', value)"
            />
            <WelfareInputText
              class="w-full"
              size="small"
              placeholder="최대 50개 까지 입력 가능"
              :disabled="!values.keywordSearchType"
              :model-value="values.keyword"
              @update:model-value="(value) => setFieldValue('keyword', value)"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_justify-center wf-gap-x-20">
        <WelfareBigButton label="초기화" button-type="neatral" @on-click="() => resetForm()" />
        <WelfareBigButton label="조회" button-type="default" @on-click="() => onSubmit()" />
      </div>
    </div>
    <div class="wf-line"></div>
    <div class="wf-p-30">
      <DeliveryBaseTable
        :show-selection="false"
        :column-configs="deliveryTicketProductListOrderStatusHeaderTableConfig"
        :total-items="items?.length"
        :items="items"
        :list-checked="listChecked"
        :is-loading="isLoading"
        @page-change="onPageChange"
        @row-selected="onRowSelected"
        @select-all-change="onSelectAllChange"
      >
        <template #buttons>
          <WelfareMdButton label="엑셀다운로드" class="wf_w-93" buttonType="liner" @on-click="() => onDownload()" />
        </template>
      </DeliveryBaseTable>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DeliveryTicketProductListOrderStatusPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/delivery/delivery-ticket-product-list-order-status.css');
</style>
