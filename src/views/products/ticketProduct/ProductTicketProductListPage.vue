<!-- BO_C0201_010101 -->

<script setup lang="ts">
import { WelfareSelect, FormGroup, FormButtonHandleForm, FormGroupTimeLinesFilterForm } from '@/components'
import { useProductTicketList } from '@/composables'
import { ProductDataHeaderTicketProductTableModalConfig } from '@/models'
import {
  ProductSearchModalWrapper,
  ProductGroupCheckBoxForm,
  ProductGroupControlFilterForm,
  ProductTableDataDeliveryList,
  ProductGroupInputCompanyForm
} from '@/components/products'
import { PRODUCT_TICKET_PRODUCT_EDIT, PRODUCT_TICKET_REGISTRATION } from '@/common'

const {
  currentFilterDate,
  handleChangeFilterForm,
  handleChangeValueSelect,
  handleCheckBoxChange,
  getIsCheckBox,
  listCheckBoxDevices,
  listCheckBoxTypes,
  listFormSelectProduct,
  listInputFindProduct,
  values,
  isDisabledFilter,
  optionsProductListFilter,
  formFilter,
  optionProductDate,
  handleResetFilter,
  handleChangeCountDate,
  listCheckBoxExternalIntegration,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  isLoading,
  items,
  totalItems,
  handleClickStopSell,
  handleStopOnlySeller,
  handleDownloadFileClick,
  handleShowInfoSeller,
  refTable,
  componentSearch,
  mdSearch,
  listCompanyChild,
  setFieldValue,
  refreshData,
  selectOptionCategoryDepth1,
  selectOptionCategoryDepth2,
  selectOptionCategoryDepth3
} = useProductTicketList()
</script>
<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <FormGroup label="카테고리" customClass="wf-space-x-4" :isRoundedTop="true">
                <div v-for="(_item, _index) in listFormSelectProduct" :key="_index" :class="_item.class">
                  <WelfareSelect
                    :disabled="isDisabledFilter"
                    :modelValue="values?.[_item.field]"
                    @update:modelValue="(value) => handleChangeValueSelect(_item.field, value)"
                    class="wf_w-180"
                    :placeholder="_item.placeholder"
                    optionLabel="label"
                    :options="_item.options"
                    small
                  />
                </div>
                <WelfareSelect
                  :disabled="isDisabledFilter"
                  :modelValue="values.primaryClassificationSelect"
                  @update:modelValue="(item) => handleChangeValueSelect('primaryClassificationSelect', item.value)"
                  class="wf_w-180"
                  placeholder="1차 분류"
                  optionLabel="label"
                  :options="selectOptionCategoryDepth1"
                  small
                />
                <WelfareSelect
                  :disabled="isDisabledFilter"
                  :modelValue="values.primaryClassificationSelect"
                  @update:modelValue="(item) => handleChangeValueSelect('secondaryClassificationSelect', item)"
                  class="wf_w-180"
                  placeholder="2차 분류"
                  optionLabel="label"
                  :options="selectOptionCategoryDepth2"
                  small
                />
                <WelfareSelect
                  :disabled="isDisabledFilter"
                  :modelValue="values.primaryClassificationSelect"
                  @update:modelValue="(item) => handleChangeValueSelect('tertiaryClassificationSelect', item.value)"
                  class="wf_w-180"
                  placeholder="3차 분류"
                  optionLabel="label"
                  :options="selectOptionCategoryDepth3"
                  small
                />
              </FormGroup>
              <div class="wf_flex wf_items-center">
                <div class="wf_flex-1">
                  <ProductGroupInputCompanyForm
                    :data-field="listInputFindProduct[0]"
                    :company-child="values.companyChild"
                    :disabled="isDisabledFilter"
                    :list-company-child="listCompanyChild"
                    :curren-value-input="values[listInputFindProduct[0].field]"
                    @input-value="(value) => setFieldValue(listInputFindProduct[0].field, value)"
                    @select-value="(value) => handleChangeValueSelect('companyChild', value)"
                    ref="componentSearch"
                  />
                </div>
                <div class="wf_flex-1">
                  <FormGroup customClass="wf_flex wf-space-x-4 wf_items-center" :label="listInputFindProduct[1].title" is-border-left>
                    <ProductSearchModalWrapper
                      class="wf_w-228"
                      v-if="listInputFindProduct[1].type"
                      :type="listInputFindProduct[1].type"
                      :label-button="listInputFindProduct[1].labelButton"
                      :disabled="isDisabledFilter"
                      ref="mdSearch"
                    />
                  </FormGroup>
                </div>
              </div>
              <div class="wf_flex-1">
                <ProductGroupCheckBoxForm
                  :list-group-check-box="[listCheckBoxExternalIntegration]"
                  :get-is-check-box="getIsCheckBox"
                  :change-check-box="handleCheckBoxChange"
                  :disabled="isDisabledFilter"
                />
              </div>
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
              <ProductGroupCheckBoxForm
                v-for="(list, index) in [listCheckBoxTypes, listCheckBoxDevices]"
                :key="index"
                :list-group-check-box="list"
                :get-is-check-box="getIsCheckBox"
                :change-check-box="handleCheckBoxChange"
                :disabled="isDisabledFilter"
              />
            </form>
            <ProductGroupControlFilterForm
              :disabled="isDisabledFilter"
              :list-filters="optionsProductListFilter"
              @on-change-filter="handleChangeFilterForm"
              :current-filter="formFilter"
            />
          </div>
          <FormButtonHandleForm @on-reset="handleResetFilter" @on-submit="refreshData" />
        </div>
      </div>
      <div class="wf-table-wrapper" data-rows="50">
        <ProductTableDataDeliveryList
          ref="refTable"
          :data="items"
          :loading="isLoading"
          :total-element="totalItems"
          @page-change="onPageChange"
          @row-checked-change="onRowSelected"
          @select-all-change="onSelectAllChange"
          @on-stop-all-sell="handleClickStopSell"
          @download-file="handleDownloadFileClick"
          @show-info-seller="handleShowInfoSeller"
          @stop-seller-by-id="handleStopOnlySeller"
          :data-header-table-modal="ProductDataHeaderTicketProductTableModalConfig"
          :link-edit="PRODUCT_TICKET_PRODUCT_EDIT"
          :link-register="PRODUCT_TICKET_REGISTRATION"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/product-delivery-product-list.css');
</style>

<script lang="ts">
export default {
  name: 'ProductTicketProductListPage'
}
</script>
