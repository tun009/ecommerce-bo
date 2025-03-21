<!-- BO_E0201_010101 -->
<script setup lang="ts">
import { DeliveryBaseTable, WelfareBigButton, WelfareCheckbox, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import { FormGroup, FormGroupTimeLinesFilterForm } from '@/components/widgets'
import { useDeliveryTicketProductOrderStatusProduct } from '@/composables'
import {
  deliveryCategoryTypeOptions,
  deliveryKeywordSearchOptions,
  deliveryProductTypeOptions,
  deliveryRankingByOptions,
  deliveryRankingRangeOptions,
  deliveryTargetCompanyTypeOptions,
  deliveryTicketProductOrderStatusProductHeaderTableConfig,
  deliveryListSelectDateOptionsConfig
} from '@/models'

const {
  values,
  setFieldValue,
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
  getIsCheckBox,
  handleCheckBoxChange,
  categoryDepth1,
  categoryDepth2,
  categoryDepth3,
  handleResetForm
} = useDeliveryTicketProductOrderStatusProduct()
</script>

<template>
  <div>
    <div class="wf-p-30 wf-space-y-29">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="카테고리">
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              small
              disabled
              placeholder="표준카테고리"
              :options="deliveryCategoryTypeOptions"
              :model-value="values.categoryType"
              @update:model-value="(value) => setFieldValue('categoryType', value)"
            />
            <WelfareSelect
              class="wf_w-180 wf-ml-6"
              optionLabel="label"
              option-value="value"
              small
              placeholder="1차 분류"
              :disabled="!!values.keywordSearchType"
              :options="categoryDepth1"
              :model-value="values.categoryDepthId1"
              @update:model-value="(value) => setFieldValue('categoryDepthId1', value)"
            />
            <WelfareSelect
              class="wf_w-180 wf-ml-4"
              optionLabel="label"
              option-value="value"
              small
              placeholder="2차 분류"
              :disabled="!values.categoryDepthId1 ?? !!values.keywordSearchType"
              :options="categoryDepth2"
              :model-value="values.categoryDepthId2"
              @update:model-value="(value) => setFieldValue('categoryDepthId2', value)"
            />
            <WelfareSelect
              class="wf_w-180 wf-ml-4"
              optionLabel="label"
              option-value="value"
              small
              :disabled="!values.categoryDepthId2 ?? !!values.keywordSearchType"
              placeholder="3차 분류"
              :options="categoryDepth3"
              :model-value="values.categoryDepthId3"
              @update:model-value="(value) => setFieldValue('categoryDepthId3', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="상품">
            <WelfareInputText class="wf_w-180" size="small" placeholder="회원조회" disabled />
            <WelfareMdButton label="조회" class="wf_w-44 wf-ml-4" buttonType="liner" button-size="small" :disabled="!!values.keywordSearchType" />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="판매사" is-border-left>
            <WelfareInputText class="wf_w-180" size="small" placeholder="회원조회" disabled />
            <WelfareMdButton label="조회" class="wf_w-44 wf-ml-4" buttonType="liner" button-size="small" :disabled="!!values.keywordSearchType" />
            <WelfareSelect
              class="wf_w-180 wf-ml-6"
              optionLabel="label"
              option-value="value"
              small
              disabled
              placeholder="하위업체 전체"
              :options="deliveryTargetCompanyTypeOptions"
              :model-value="values.periodSearchType"
              @update:model-value="(value) => setFieldValue('periodSearchType', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="상품 유형">
            <div class="wf-approval-body-filter-group-checkbox wf-space-x-21 wf_flex">
              <div v-for="(_item, _index) in deliveryProductTypeOptions.list" :key="_index">
                <WelfareCheckbox
                  size="sm"
                  :model-value="getIsCheckBox('productType', _item.id)"
                  :label="_item.label"
                  :disabled="!!values.keywordSearchType"
                  @update:model-value="(value) => handleCheckBoxChange('productType', value, _item.id)"
                />
              </div>
            </div>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12 wf-pr-9" is-border-left label="MD">
            <WelfareInputText class="wf_w-180" size="small" placeholder="회원조회" disabled />
            <WelfareMdButton label="조회" class="wf_w-44 wf-ml-4" buttonType="liner" button-size="small" :disabled="!!values.keywordSearchType" />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="기준">
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              small
              placeholder="순주문금액순"
              :disabled="!!values.keywordSearchType"
              :options="deliveryRankingByOptions"
              :model-value="values.rankingBy"
              @update:model-value="(value) => setFieldValue('rankingBy', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="순위" is-border-left>
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              small
              placeholder="50위까지"
              :disabled="!!values.keywordSearchType"
              :options="deliveryRankingRangeOptions"
              :model-value="values.rankingRange"
              @update:model-value="(value) => setFieldValue('rankingRange', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroupTimeLinesFilterForm
            class="wf_h-44 wf-pl-"
            label="기간"
            ref="refTable"
            is-border-bottom
            is-rounded-bottom
            disabled-select-option
            select-placeholder="결제일"
            :disabled="!!values.keywordSearchType"
            :current-active-date="currentFilterDate"
            :from-date="values.fromDate"
            :to-date="values.toDate"
            :options-product-type-date="deliveryListSelectDateOptionsConfig"
            @on-change-date-from="(value) => setFieldValue('fromDate', value)"
            @on-change-date-to="(value) => setFieldValue('toDate', value)"
            @on-select-type="(value) => setFieldValue('dateSelect', value)"
            @on-change-filter-date="handleChangeCountDate"
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
        <WelfareBigButton label="초기화" button-type="neatral" @on-click="() => handleResetForm()" />
        <WelfareBigButton label="조회" button-type="default" @on-click="() => onSubmit()" />
      </div>
    </div>
    <div class="wf-line"></div>
    <div class="wf-p-30">
      <DeliveryBaseTable
        :show-selection="false"
        :column-configs="deliveryTicketProductOrderStatusProductHeaderTableConfig"
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
  name: 'DeliveryTicketProductListOrderStatusProductPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/delivery/delivery-ticket-product-list-order-status.css');
</style>
