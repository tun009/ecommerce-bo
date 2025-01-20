<!-- BO_C0202_040101 -->
<script setup lang="ts">
import { ProductBottomButton, ProductTableOptionsContent, ProductTableRowSelectOptions, ProductTableTotal, ProductTitle } from '@/components/products'
import { ProductRegisterValueOptionType } from '@/models'
import { useProductDeliveryProdRegister } from '@/composables/products/deliveryProdRegister'
import { productBaseInfoType } from '@/common'

const {
  valueType,
  valueOption,
  isSaveSuccess,
  approvalValue,
  updateValueType,
  updateValueOption,
  editValueType,
  deleteValueType,
  totalCount,
  updateValueTotalCount,
  openCancelModal,
  openTemporaryStorageModal,
  openSaveModal,
  onClickApproval,
  typeRegisterOption,
  dataMultipleValue,
  countTotalOption,
} = useProductDeliveryProdRegister(productBaseInfoType.ticket)
</script>

<template>
  <div>
    <div>
      <ProductTitle title="옵션/재고정보" />
      <ProductTableRowSelectOptions
        isShowOption
        :value-option="valueOption"
        @update-value-type="updateValueType"
        @update-value-option="updateValueOption"
        :type-register-option="typeRegisterOption"
        :value-type="valueType"
        :data-multiple-value="dataMultipleValue"
        :base-info-type="productBaseInfoType.ticket"
      />
      <ProductTableOptionsContent
        :value-type="valueType"
        v-if="valueOption === ProductRegisterValueOptionType.use"
        @edit-value-type="editValueType"
        @delete-value-type="deleteValueType"
        @update-value-total="countTotalOption"
      />
      <ProductTableTotal
        :disabled="valueOption === ProductRegisterValueOptionType.use"
        :total-count="totalCount"
        @update-value-total="updateValueTotalCount"
      />
    </div>
    <ProductBottomButton
      @on-cancel-click="openCancelModal"
      @on-temporary-click="openTemporaryStorageModal"
      @on-save-click="openSaveModal"
      @on-approval-click="onClickApproval"
      :approval-disabled="!isSaveSuccess"
      :preview-disabled="!approvalValue"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-delivery-prod-register.css');
</style>
