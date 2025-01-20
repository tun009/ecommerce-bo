<!-- BO_C0401_020101 -->

<script setup lang="ts">
import { TextInputNumber, WelfareRadioGroup } from '@/components'
import { ProductBorderBottomTitle, ProductBottomButton, ProductDataTable, ProductSearchModalWithTableWrapper } from '@/components/products'
import { WelfareDateTimePicker, WelfareMdButton } from '@/components/uikit'
import { TextInputMaxLengthValidation } from '@/components/widgets'
import { useProductPromotionRegister } from '@/composables'
import { ProductPromotionRegisterConfig, ProductSearchType } from '@/models'
import Column from 'primevue/column'

const {
  values,
  handleChangeValueField,
  handleOpenModal,
  setFieldValue,
  handleCancel,
  handleCancelInBulk,
  handleSave,
  handleDateChange,
  handleAddMultipleDiscount,
  handleDeleteRecord,
  handleDeleteRecordDiscount
} = useProductPromotionRegister()
</script>

<template>
  <div class="wf-product-menu-wrap wf-mt--1 wf-ml--1 wf-mr--1">
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mb-20">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          할인 구분
        </div>
        <div class="wf_flex wf_h-42 wf-body_03-reg wf-pl-11 wf_text--14 wf-w-550">
          <WelfareRadioGroup
            :options="ProductPromotionRegisterConfig.discountCatOptions"
            :model-value="values.discountCat"
            size="sm"
            @update:model-value="(value) => handleChangeValueField('discountCat', value)"
          />
        </div>
      </div>
    </div>

    <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10">할인 프로모션 설정</ProductBorderBottomTitle>

    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf-mb-20 wf_br-6">
      <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-b--ncc wf-btn-border-r--ncc wf_br-tl--6 wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            판매사&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-body_03-reg wf_text--14 wf-w-550 gap-4">
            <ProductSearchModalWithTableWrapper @selectValue="(value) => setFieldValue('seller', value)" :type="ProductSearchType.SELLER" />
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-b--ncc wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-151 wf_bg-bg-gray"
          >
            프로모션 기간&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pb-2 wf-body_03-reg wf_text--14">
            <WelfareDateTimePicker
              :model-value="values.discountPeriodBegin"
              size="small"
              format="YYYY.MM.DD hh:mm:ss"
              @update:model-value="(date) => handleDateChange(date, values.discountPeriodEnd)"
            />&nbsp;~&nbsp;&nbsp;
            <WelfareDateTimePicker
              :model-value="values.discountPeriodEnd"
              size="small"
              format="YYYY.MM.DD hh:mm:ss"
              @update:model-value="(date) => handleDateChange(values.discountPeriodBegin, date)"
            />
          </div>
        </div>
      </div>
      <div class="wf_flex">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            프로모션 명&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-body_03-reg wf_text--14 wf-w-550">
            <TextInputMaxLengthValidation
              :max-length="30"
              name=""
              size="small"
              placeholder="한글기준 30자 이내로 입력"
              class="wf_flex-1"
              :model-value="values.promotionName"
              @update:model-value="(val) => setFieldValue('promotionName', val)"
            />
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-151 wf_bg-bg-gray"
          >
            프로모션코드
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-pt-1 wf-body_03-reg wf_text--14">
            {{ values.promotionCode }}
          </div>
        </div>
      </div>
    </div>

    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mb-10">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          대상 상품&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-body_03-reg wf_text--14 wf-w-550">
          <!-- search product -->
          <WelfareMdButton button-type="liner" button-size="small" label="대상상품 등록" @on-click="handleOpenModal" />
          <!-- search product -->
        </div>
      </div>
    </div>

    <ProductDataTable class="wf-mt-5 wf-mb-20 product-table" :data="values.product" @on-delete-record="handleDeleteRecord" />

    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6">
      <div class="wf_flex wf_h-42">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            쿠폰 적용 여부&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-body_03-reg wf_text--14 wf-w-550">
            <WelfareRadioGroup
              :options="ProductPromotionRegisterConfig.couponAppliesOptions"
              :model-value="values.couponApplies"
              size="sm"
              @update:model-value="(value) => handleChangeValueField('couponApplies', value)"
            />
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-w-187 wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_bg-bg-gray"
          >
            할인 금액&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf-width-full wf_justify-between wf_items-center wf_h-42 wf-pl-12 wf-pr-11 wf-body_03-reg wf_text--14 wf-ml--1">
            <div class="wf_flex wf_items-center">
              <TextInputNumber
                placeholder="- 없이 숫자만 입력 해주세요."
                class="text-align-right"
                format-value
                should-check-press-key
                size="small"
                :modelValue="values.discountAmount"
                @update:model-value="(value) => setFieldValue('discountAmount', value)"
              />
              &nbsp;&nbsp;<span>원</span>
            </div>
            <WelfareMdButton button-type="liner" button-size="small" label="대상상품 적용" @click="handleAddMultipleDiscount" />
          </div>
        </div>
      </div>
    </div>

    <div class="alert-txt wf-mt-10">※프로모션 기간만료 및 중지 후 재진행은 신규 프로모션을 등록 해주세요.</div>

    <ProductDataTable :value="values.productDiscounted" class="wf-mt-8 wf-mb-21" @on-delete-record="handleDeleteRecordDiscount">
      <template #discountAmount>
        <Column field="discount" header="할인 금액" class="column wf_text-sub-01" />
      </template>

      <template #instantDiscountedPrice>
        <Column field="priceAfterDiscount" header="즉시 할인가" class="column wf_text-sub-01" />
      </template>
    </ProductDataTable>

    <ProductBorderBottomTitle class="wf-pb-9">등록정보</ProductBorderBottomTitle>

    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-21 wf-mb-30">
      <div class="wf_flex">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            등록자
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-pb-2 wf-body_03-reg wf_text--14 wf-w-550">
            Jefuyellow_1 (강*띠)
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-151 wf_bg-bg-gray"
          >
            등록 일시
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-pt-1 wf-body_03-reg wf_text--14">
            2023. 06. 14 00:00:00
          </div>
        </div>
      </div>
    </div>

    <ProductBottomButton
      temporary-label="일괄중지"
      class="action-btn"
      @on-cancel-click="handleCancel"
      @on-temporary-click="handleCancelInBulk"
      @on-save-click="handleSave"
      preview-visible
      approval-visible
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/promotion/product-promotion-register-discount.css');
</style>
