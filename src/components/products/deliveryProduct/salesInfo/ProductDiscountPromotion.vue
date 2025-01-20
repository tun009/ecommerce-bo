<script setup lang="ts">
import { ProductTitle } from '@/components/products'
import { ProductSalesDiscountPromotionData } from '@/models'
export interface ProductDiscountPromotionProps {
  data?: ProductSalesDiscountPromotionData[]
  discountDetailsLink?: string
}
defineProps<ProductDiscountPromotionProps>()
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="할인 프로모션" />

    <div>
      <table class="wf_table wf_br-6">
        <caption></caption>
        <thead class="wf-body_02-semi wf_text-n-33 wf_bg-bg-gray wf_br-tl--6 wf_br-tr--6">
          <tr class="wf_h-44 wf_border-n-33">
            <th class="wf_col-grow">프로모션 ID</th>
            <th class="wf_col-grow">프로모션명</th>
            <th class="wf_col-grow">판매가</th>
            <th class="wf_col-grow">프로모션 할인가</th>
            <th class="wf_col-grow">할인율 (%)</th>
          </tr>
        </thead>
        <tbody class="wf-body_03-reg wf_text-n-33">
          <template v-for="row in $props.data" :key="row">
            <tr class="wf_h-43">
              <slot name="row-id" :id="row.id" :link="$props.discountDetailsLink">
                <td class="wf_col-grow wf_justify-center wf_text-underline">{{ row.id }}</td>
              </slot>
              <slot name="row-promotion-name" :id="row.id" :promotionName="row.name" :link="$props.discountDetailsLink">
                <td class="wf_col-grow wf_justify-center">{{ row.name }}</td>
              </slot>
              <td class="wf_col-grow wf_justify-end">{{ row.price }}</td>
              <td class="wf_col-grow wf_justify-end">{{ row.discountPrice }}</td>
              <td class="wf_col-grow wf_justify-end">{{ row.discountRate }}</td>
            </tr>
          </template>
          <tr v-show="!$props.data?.length" class="wf_h-43">
            <td class="wf_col-grow wf_justify-center wf-body_03-semi">등록된 할인 프로모션이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
