<!-- BO_C0102_060101 -->
<script setup lang="ts">
import {
  dataTableImageMock,
  dataTableVideoMock,
  headerRepresentative,
  headerRepresentativeVideo,
  notificationsImage,
  notificationsVideo
} from '@/assets'
import { ProductBottomButton, ProductDescription, ProductRepresentative } from '@/components/products'
import { reactive } from 'vue'
import { useProductTicketMoreInformation } from '@/composables/products'
import { PRODUCT_DELIVERY_PRODUCT_LIST } from '@/common'

const dataTableImage = reactive(dataTableImageMock)
const dataTableVideo = reactive(dataTableVideoMock)

const { values, toggleApprove, changeValueField, handleCancel, handleSave, handleTemporary, handleApproval, handlePreview } =
  useProductTicketMoreInformation(PRODUCT_DELIVERY_PRODUCT_LIST)
</script>

<template>
  <ProductRepresentative :data-table="dataTableImage" label="대표 이미지" :notifications="notificationsImage" :headers="headerRepresentative" />
  <ProductRepresentative
    :data-table="dataTableVideo"
    label="동영상 등록"
    :notifications="notificationsVideo"
    :headers="headerRepresentativeVideo"
    type-file="video"
  />
  <ProductDescription
    :description="values.description"
    :mobile-description="values.mobileDescription"
    :type="values.type"
    @change-value-description="(value) => changeValueField('description', value)"
    @change-value-mobile-description="(value) => changeValueField('mobileDescription', value)"
    @change-value-option="(value) => changeValueField('type', value)"
  />
  <ProductBottomButton
    preview-disabled
    :approval-disabled="toggleApprove"
    @on-cancel-click="handleCancel"
    @on-save-click="handleSave"
    @on-preview-click="handlePreview"
    @on-temporary-click="handleTemporary"
    @on-approval-click="handleApproval"
  />
</template>
