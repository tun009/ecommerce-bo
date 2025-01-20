<script setup lang="ts">
import { ProductTitle } from '@/components/products'
import { WelfareCheckbox, WelfareInputText } from '@/components/uikit'
import { useProductPricingInformation } from '@/composables'
import { ProductPricingInformationEmits, ProductPricingInformationProps } from '@/models'

const props = defineProps<ProductPricingInformationProps>()

defineEmits<ProductPricingInformationEmits>()

const { marginRateEnabled, acceptNumber, compute, acceptMaxMarginRate } = useProductPricingInformation(props)
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="가격정보" />

    <div>
      <table class="wf_table wf_br-6">
        <caption></caption>
        <thead class="wf-body_02-semi wf_text-n-33 wf_bg-bg-gray wf_br-tl--6 wf_br-tr--6">
          <tr class="wf_h-44 wf_border-n-33">
            <th class="wf_col-grow">
              <p>판매가(VAT 포함) <span class="wf_text-sub-01">*</span></p>
            </th>
            <th class="wf_col-grow wf-space-x-6">
              <WelfareCheckbox v-model="marginRateEnabled" size="sm" />
              <span>상품 마진율 (%)</span>
            </th>
            <th class="wf_col-grow">상품마진</th>
            <th class="wf_col-grow">계약 마진율 (%)</th>
            <th class="wf_col-grow">계약 마진</th>
          </tr>
        </thead>
        <tbody class="wf-body_03-reg wf_text-n-33">
          <tr class="wf_h-43">
            <td class="wf_col-grow wf_justify-center">
              <div class="wf_w-180">
                <WelfareInputText
                  :model-value="props?.sellingPrice"
                  @update:model-value="(value) => $emit('update:sellingPrice', value)"
                  @keypress="acceptNumber"
                  text-align="right"
                  size="small"
                />
              </div>
            </td>
            <td class="wf_col-grow wf_justify-center">
              <div class="wf_w-180">
                <WelfareInputText
                  :model-value="props?.marginRate"
                  @update:model-value="(value) => $emit('update:marginRate', value)"
                  @keypress="
                    (event) => {
                      acceptNumber(event)
                      acceptMaxMarginRate(event)
                    }
                  "
                  :disabled="!marginRateEnabled"
                  text-align="right"
                  size="small"
                />
              </div>
            </td>
            <td class="wf_col-grow wf_justify-end">{{ compute.productMargin }}</td>
            <td class="wf_col-grow wf_justify-end">{{ props?.contractMarginRate }}</td>
            <td class="wf_col-grow wf_justify-end">{{ compute.contractMargin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
