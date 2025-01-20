<!-- BO_C0102_040101 -->
<script setup lang="ts">
import { ProductTableRowSelectOptions, ProductTableOptionsContent, ProductTableTotal, ProductTitle, ProductBottomButton } from '@/components/products'
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
  countTotalOption
} = useProductDeliveryProdRegister(productBaseInfoType.delivery)
</script>

<template>
  <div>
    <div>
      <ProductTitle title="옵션/재고정보" />
      <ProductTableRowSelectOptions
        :value-option="valueOption"
        @update-value-type="updateValueType"
        @update-value-option="updateValueOption"
        :typeRegisterOption="typeRegisterOption"
        :value-type="valueType"
        :data-multiple-value="dataMultipleValue"
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
