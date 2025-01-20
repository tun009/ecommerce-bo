<!-- BO_C0401_010101 -->

<script setup lang="ts">
import { DataTableContainer, WelfareRadio, WelfareMdButton, FormGroup, FormButtonHandleForm, FormGroupTimeLinesFilterForm } from '@/components'
import { useProductDiscountPromotionList } from '@/composables'
import { ProductSearchModalWithTableWrapper, ProductGroupCheckBoxForm, ProductGroupControlFilterForm } from '@/components/products'
import { DataHeaderPromotionProductTableModalConfig } from '@/models'
import { PRODUCT_PROMOTION_PRODUCT_DETAIL, handleRedirectLink } from '@/common'

const {
  currentFilterDate,
  handleChangeFilterForm,
  handleChangeValueSelect,
  handleCheckBoxChange,
  getIsCheckBox,
  listCheckBoxTypes,
  listInputFindProduct,
  values,
  isDisabledFilter,
  optionsProductListFilter,
  formFilter,
  optionProductDate,
  setFieldValue,
  handleResetFilter,
  handleChangeCountDate,
  componentSearch,
  listRadio,
  items,
  totalItems,
  isLoading,
  onPageChange,
  refTable
} = useProductDiscountPromotionList()
</script>
<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <div class="wf_flex wf_items-center">
                <FormGroup customClass="wf-space-x-20" label="할인 구분">
                  <WelfareRadio
                    v-for="(item, index) in listRadio"
                    :key="index"
                    :disabled="isDisabledFilter"
                    :model-value="values.discountCategory"
                    :value="item.value"
                    :label="item.title"
                    name="discountCategory"
                    @update:model-value="(value) => setFieldValue('discountCategory', value)"
                    size="sm"
                  />
                </FormGroup>

                <FormGroup customClass="wf_flex wf-space-x-4 wf_w-253 wf_items-center" is-border-left :label="listInputFindProduct[0].title">
                  <ProductSearchModalWithTableWrapper
                    v-if="listInputFindProduct[0].type"
                    :type="listInputFindProduct[0].type"
                    :placeholder-input="listInputFindProduct[0].placeholder"
                    :label-button="listInputFindProduct[0].labelButton"
                    @select-value="(value) => setFieldValue(listInputFindProduct[0].field, value)"
                    ref="componentSearch"
                    :disabled="isDisabledFilter"
                  />
                </FormGroup>
              </div>
              <ProductGroupCheckBoxForm
                v-for="(list, index) in [listCheckBoxTypes]"
                :key="index"
                :list-group-check-box="list"
                :get-is-check-box="getIsCheckBox"
                :change-check-box="handleCheckBoxChange"
                :disabled="isDisabledFilter"
              />
              <FormGroupTimeLinesFilterForm
                label="기간"
                :disabled="isDisabledFilter"
                :current-active-date="currentFilterDate"
                @on-change-filter-date="handleChangeCountDate"
                :from-date="values.fromDate"
                :to-date="values.toDate"
                @on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
                @on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
                :current-type-date-product-select="values.productDateSelect"
                @on-select-type="(value) => handleChangeValueSelect('productDateSelect', value)"
                :options-product-type-date="optionProductDate"
              />
            </form>
            <ProductGroupControlFilterForm
              :disabled="isDisabledFilter"
              :list-filters="optionsProductListFilter"
              @on-change-filter="handleChangeFilterForm"
              :current-filter="formFilter"
            />
          </div>
          <FormButtonHandleForm @on-reset="handleResetFilter" />
        </div>
      </div>
      <div class="wf-table-wrapper" data-rows="50">
        <DataTableContainer
          :value="items"
          @page-change="onPageChange"
          :total-records="totalItems"
          :loading="isLoading"
          :column-configs="DataHeaderPromotionProductTableModalConfig"
          ref="refTable"
        >
          <template #title>
            <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItems }} 건</h6>
          </template>
          <template #body-id="{ props }">
            <router-link target="_blank" :to="`${PRODUCT_PROMOTION_PRODUCT_DETAIL}/${props.data.id}`">{{ props.data.id }}</router-link>
          </template>
          <template #body-promotion_name="{ props }">
            <router-link target="_blank" :to="`${PRODUCT_PROMOTION_PRODUCT_DETAIL}/${props.data.id}`">{{ props.data.promotion_name }}</router-link>
          </template>
          <template #body-view="{ props }">
            <WelfareMdButton
              @click="handleRedirectLink(`${PRODUCT_PROMOTION_PRODUCT_DETAIL}/${props.data.id}`)"
              label="보기"
              buttonType="liner"
              buttonSize="small"
            />
          </template>
        </DataTableContainer>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/product-delivery-product-list.css');
</style>

<script lang="ts">
export default {
  name: 'ProductDiscountPromotionListPage'
}
</script>
