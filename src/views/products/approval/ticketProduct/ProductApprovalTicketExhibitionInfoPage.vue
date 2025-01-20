<!-- BO_C0304_020101 -->
<script setup lang="ts">
import { productBaseInfoType } from '@/common'
import { ProductBottomButton, ProductExhibitionInfo, ProductTitle } from '@/components/products'
import { useProductExhibitionInfo } from '@/composables'
import { WelfareSelectOptionType } from '@/models';

const optionsSelectFirst: WelfareSelectOptionType[] = [
  { label: '식품', value: '1' },
  { label: '생활/주방', value: '2' },
  { label: '패션', value: '3' },
  { label: '뷰티/잡화', value: '4' },
  { label: '가구', value: '5' },
  { label: '여행/E쿠폰/상품권', value: '6' }
]

const optionsSelectSecond: WelfareSelectOptionType[] = [
  { label: '여행/예약', value: '1' },
  { label: 'E쿠폰/모바일티켓', value: '2' },
  { label: '상품권', value: '3' }
]

const optionsSelectThird: WelfareSelectOptionType[] = [{ label: '모바일티켓', value: '1' }]


const {
  values,
  refExhibition,
  handleChangeValueField,
  optionsStatus,
  handelAddCategory,
  handelDeleteCategory,
  onChangeMDSearch,
  openConfirmCancel,
  openConfirmApproval,
  openConfirmApprovalReject
} = useProductExhibitionInfo(productBaseInfoType.approval_ticket)
</script>

<template>
  <div class="wf-space-y-30">
    <!-- 전시정보 - Exhibition information -->
    <div class="wf-mt--1">
      <ProductTitle title="전시정보" />
      <ProductExhibitionInfo
        ref="refExhibition"
        :radioGroupCategories="values.radioGroupCategories"
        :exhibitionStatus="values.exhibitionStatus"
        :devices="values.devices"
        :startTime="values.startTime"
        :endTime="values.endTime"
        :selectFirst="values.selectFirst"
        :selectSecond="values.selectSecond"
        :selectThird="values.selectThird"
        :exhibitionCategories="values.exhibitionCategories"
        :optionsStatus="optionsStatus"
        :optionsSelectFirst="optionsSelectFirst"
        :optionsSelectSecond="optionsSelectSecond"
        :optionsSelectThird="optionsSelectThird"
        :md="values.md"
        @onChangeRadioCategories="(value: number) => handleChangeValueField('radioGroupCategories', value)"
        @onChangeExhibitionStatus="(value) => handleChangeValueField('exhibitionStatus', value)"
        @onChangeSelectFirst="(value) => handleChangeValueField('selectFirst', value)"
        @onChangeSelectSecond="(value) => handleChangeValueField('selectSecond', value)"
        @onChangeSelectThird="(value) => handleChangeValueField('selectThird', value)"
        @handelAddCategory="handelAddCategory"
        @handelDeleteCategory="handelDeleteCategory"
        @onChangeStartTime="(value) => handleChangeValueField('startTime', value)"
        @onChangeEndTime="(value) => handleChangeValueField('endTime', value)"
        @onChangeDevices="(value) => handleChangeValueField('devices', value)"
        @onChangeMDSearch="onChangeMDSearch"
      />
    </div>

    <div class="">
      <ProductBottomButton
        @on-cancel-click="openConfirmCancel"
        @on-approval-finished-click="openConfirmApproval"
        @on-approval-reject-click="openConfirmApprovalReject"
        previewDisabled
        temporaryDisabled
        saveDisabled
        approvalFinished
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductTicketApprovalExhibitionInfoPage'
}
</script>
