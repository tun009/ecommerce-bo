<!-- BO_C0202_030101 -->
<script setup lang="ts">
import { PRODUCT_PROMOTION_DETAIL } from '@/common'
import {
  ProductBottomButton,
  ProductCouponPromotion,
  ProductDiscountPromotion,
  ProductPricingInformation,
  ProductSalesInformation
} from '@/components/products'
import { useProductSalesTicketUpdate } from '@/composables'
const { contractMarginRate, query, discountPromotionData, couponPromotionData, onApprove, onSave, onCancel, onPreview, onTemporary } =
  useProductSalesTicketUpdate()
</script>
<template>
  <div>
    <div class="wf-space-y-30">
      <ProductSalesInformation
        v-model:tax="query.tax"
        v-model:adultCertified="query.adultCertified"
        v-model:startDate="query.startDate"
        v-model:endDate="query.endDate"
        v-model:unlimited="query.unlimited"
      />
      <ProductPricingInformation
        :contractMarginRate="contractMarginRate"
        :tax="query.tax"
        v-model:sellingPrice="query.sellingPrice"
        v-model:marginRate="query.marginRate"
      />
      <ProductDiscountPromotion :data="discountPromotionData" :discountDetailsLink="PRODUCT_PROMOTION_DETAIL">
        <template #row-id="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.id }}</router-link>
          </td>
        </template>
        <template #row-promotion-name="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.promotionName }}</router-link>
          </td>
        </template>
      </ProductDiscountPromotion>

      <ProductCouponPromotion :data="couponPromotionData" :couponDetailsLink="''">
        <template #row-id="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.id }}</router-link>
          </td>
        </template>
        <template #row-promotion-name="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.promotionName }}</router-link>
          </td>
        </template></ProductCouponPromotion
      >

      <ProductBottomButton
        :preview-disabled="true"
        :approval-disabled="true"
        @on-preview-click="onPreview"
        @on-cancel-click="onCancel"
        @on-temporary-click="onTemporary"
        @on-save-click="onSave"
        @on-approval-click="onApprove"
      />
    </div>
  </div>
</template>
