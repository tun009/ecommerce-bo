<!-- BO_C0102_070101 -->

<script setup lang="ts">
import { TextareaMaxLength, TextInputNumber, WelfareMdButton, WelfareRadioGroup, WelfareSelect } from '@/components'
import { ProductBottomButton } from '@/components/products'
import { useProductTicketProvisionInformation } from '@/composables/products'
import { WelfareSelectOptionType } from '@/models/uikit'
import {
  productDeliveryDetailInputOptions,
  productDeliveryDetailSelectOptions,
  ProductDeliveryDetailsFormFields,
  productDeliveryDetailsFormFieldsHeaders
} from '@/models/views'

const {
  onIncreaseItem,
  onDeleteItem,
  values,
  setFormData,
  setFieldValue,
  openConfirmCancel,
  onSaveClick,
  onTemporarySaveClick,
  onPreviewClick,
  onApprovalClick,
  isDisableApproval,
  productApprovalTableRef
} = useProductTicketProvisionInformation()
</script>

<template>
  <div class="">
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf_mb-30">
      <div class="wf_flex wf_h-42">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            입력 방식&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-body_03-reg wf_text--14 wf-w-550">
            <WelfareRadioGroup
              :options="productDeliveryDetailInputOptions"
              :modelValue="values.radioSelectInputDataOption"
              @update:modelValue="(val) => setFieldValue('radioSelectInputDataOption', val)"
              size="sm"
            />
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
          >
            상품 분류&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-12 wf-pr-11 wf-body_03-reg wf_text--14">
            <WelfareSelect
              placeholder="가공식품"
              :modelValue="values.selectedCategory"
              @update:modelValue="(val: WelfareSelectOptionType) => setFieldValue('selectedCategory', val)"
              :options="productDeliveryDetailSelectOptions"
              class="wf_w-180"
              option-label="label"
              small
            />
          </div>
        </div>
      </div>
    </div>

    <div class="wf_product_border-b-3 wf-pb-10 wf-mb-19">
      <p class="wf-sub_tit_01 wf__text-color--33">상품정보제공고시<span class="wf_text-sub-01"> *</span></p>
    </div>

    <div class="wf_flex wf_flex-col wf_border-ncc-1">
      <div class="wf_flex wf_flex-row wf_product_border-b-2 wf_w-full wf_flex-grow-1 wf_bg-bg-gray wf_br-tl-6">
        <div v-for="(item, index) in productDeliveryDetailsFormFieldsHeaders" class="wrap-table-header" :key="index">
          <p class="wf_h-42 wf-py-14 wf-px-12 wf-body_02-semi wf_flex wf_justify-center">
            {{ item.label }} <span class="wf_text-sub-01" v-if="item.required">*&nbsp;</span>
          </p>
        </div>
      </div>

      <div class="wf_flex wf_flex-col wf_product-delivery-approved--table wf-custom-scrollbar" ref="productApprovalTableRef">
        <div class="wf_flex wf_flex-row wf_justify-center row-wrapper" v-for="(item, index) in values.dataList" :key="index">
          <TextInputNumber
            placeholder="00"
            format-value
            should-check-press-key
            :max-length="2"
            size="small"
            class="inp-number wf_justify-center"
            :modelValue="item.order"
            @update:modelValue="(val) => setFormData(index, ProductDeliveryDetailsFormFields.order, val)"
          />
          <TextareaMaxLength
            placeholder="한글 기준 30자 이내로 입력해 주세요."
            class="inp-content-cat"
            :modelValue="item.item"
            @update:modelValue="(val: any) => setFormData(index, ProductDeliveryDetailsFormFields.item, val)"
            should-check-press-key
            :max-length="30"
          />
          <TextareaMaxLength
            placeholder="한글 기준 500자 이내로 입력 해 주세요."
            class="inp-content-des"
            :modelValue="item.description"
            @update:modelValue="(val: any) => setFormData(index, ProductDeliveryDetailsFormFields.description, val)"
            should-check-press-key
            :max-length="500"
          />

          <div class="wf_flex wf_flex-row wf-space-x-4 action-btn wf_items-center product-delivery-approved-list">
            <WelfareMdButton label="추가" buttonType="neutral" button-size="small" @click="onIncreaseItem" />
            <WelfareMdButton
              label="삭제"
              buttonType="neutral"
              button-size="small"
              @click="onDeleteItem(index)"
              :disabled="values.dataList.length === 1"
            />
          </div>
        </div>
      </div>
    </div>
    <ProductBottomButton
      :preview-disabled="!$route.params.id"
      :approval-disabled="isDisableApproval"
      @on-preview-click="onPreviewClick"
      @on-cancel-click="openConfirmCancel"
      @on-temporary-click="onTemporarySaveClick"
      @on-save-click="onSaveClick"
      @on-approval-click="onApprovalClick"
    />
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-approval-list.css');
</style>
