<script setup lang="ts">
import { ProductBottomButton, ProductTableOptionsContent, ProductTableRowSelectOptions, ProductTableTotal, ProductTitle } from '@/components/products'
import { useProductDeliveryApprovalOptionDetail } from '@/composables'
import { ProductRegisterValueOptionType } from '@/models'
import { productBaseInfoType } from '@/common'

const {
  valueType,
  valueOption,
  isSaveSuccess,
  approvalValue,
  typeRegisterOption,
  dataMultipleValue,
  totalCount,
  updateValueType,
  updateValueOption,
  editValueType,
  deleteValueType,
  updateValueTotalCount,
  openCancelModal,
  openTemporaryStorageModal,
  openSaveModal,
  onClickApproval,
  openConfirmApproval,
  openApprovalReject,
  countTotalOption
} = useProductDeliveryApprovalOptionDetail(productBaseInfoType.approval_ticket)
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
      @on-approval-finished-click="openConfirmApproval"
      @on-approval-reject-click="openApprovalReject"
      :approval-visible="false"
      approval-finished
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-delivery-prod-register.css');
</style>
