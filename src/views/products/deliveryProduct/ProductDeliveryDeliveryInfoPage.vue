<!-- BO_C0102_050101 -->
<script setup lang="ts">
import { ProductShippingInfoTable, ProductReturnInfoTable, ProductExchangeInfoTable, ProductBottomButton, ProductTitle } from '@/components/products'
import { useProductDeliveryInfo } from '@/composables/products/deliveryInfo'

const { openCancelModal, openTemporaryStorageModal, openSaveModal, onClickApproval, isSaveSuccess, approvalValue, deliveryInfoValue } =
  useProductDeliveryInfo()
</script>

<template>
  <div>
    <ProductTitle title="배송 정보" />
    <ProductShippingInfoTable :delivery-info-value="deliveryInfoValue" />
    <div class="wf-mt-30">
      <ProductTitle title="반품 정보" />
      <ProductReturnInfoTable :delivery-info-value="deliveryInfoValue" />
    </div>
    <div class="wf-mt-29">
      <ProductTitle title="교환 정보" />
      <ProductExchangeInfoTable :delivery-info-value="deliveryInfoValue" />
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
