<script setup lang="ts">
import { ProductTitle } from '@/components/products'
import { ProductSalesCouponPromotionData } from '@/models'
export interface ProductCouponPromotionProps {
  data?: ProductSalesCouponPromotionData[]
  couponDetailsLink?: string
}
defineProps<ProductCouponPromotionProps>()
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="쿠폰 프로모션" note="※쿠폰은 할인 프로모션 이후 적용됩니다." />

    <div>
      <table class="wf_table wf_br-6">
        <caption></caption>
        <thead class="wf-body_02-semi wf_text-n-33 wf_bg-bg-gray wf_br-tl--6 wf_br-tr--6">
          <tr class="wf_h-44 wf_border-n-33">
            <th class="wf_col-grow">쿠폰 ID</th>
            <th class="wf_col-grow">쿠폰명</th>
            <th class="wf_col-grow">정률 (%)</th>
            <th class="wf_col-grow">정액 (/)</th>
            <th class="wf_col-grow">쿠폰 할인가</th>
          </tr>
        </thead>
        <tbody class="wf-body_03-reg wf_text-n-33">
          <template v-for="row in $props.data" :key="row">
            <tr class="wf_h-43">
              <slot name="row-id" :id="row.id" :link="$props.couponDetailsLink">
                <td class="wf_col-grow wf_justify-center wf_text-underline">{{ row.id }}</td>
              </slot>
              <slot name="row-promotion-name" :id="row.id" :promotionName="row.name" :link="$props.couponDetailsLink">
                <td class="wf_col-grow wf_justify-center">{{ row.name }}</td>
              </slot>
              <td class="wf_col-grow wf_justify-end">{{ row.fixedRate }}</td>
              <td class="wf_col-grow wf_justify-end">{{ row.fixedAmount }}</td>
              <td class="wf_col-grow wf_justify-end">{{ row.discountPrice }}</td>
            </tr>
          </template>
          <tr v-show="!$props.data?.length" class="wf_h-43">
            <td class="wf_col-grow wf_justify-center wf-body_03-semi">등록된 쿠폰이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
