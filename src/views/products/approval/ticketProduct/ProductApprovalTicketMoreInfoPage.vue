<!-- BO_C0304_060101 -->
<script setup lang="ts">
import {
  dataTableImageMock,
  dataTableVideoMock,
  headerRepresentative,
  headerRepresentativeVideo,
  notificationsImage,
  notificationsVideo
} from '@/assets'
import { PRODUCT_APPROVAL_TICKET_PRODUCT_LIST } from '@/common';
import { ProductBottomButton, ProductDescription, ProductRepresentative } from '@/components/products'
import { useProductTicketMoreInformation } from '@/composables'
import { reactive } from 'vue'

const dataTableImage = reactive(dataTableImageMock)
const dataTableVideo = reactive(dataTableVideoMock)
const {
  values,
  toggleApprove,
  changeValueField,
  handleCancel,
  handleSave,
  handleTemporary,
  handleApproval,
  handlePreview,
  openApprovalReject,
  openConfirmApproval
} = useProductTicketMoreInformation(PRODUCT_APPROVAL_TICKET_PRODUCT_LIST)
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
    approval-finished
    :approval-visible="false"
    @on-cancel-click="handleCancel"
    @on-save-click="handleSave"
    @on-preview-click="handlePreview"
    @on-temporary-click="handleTemporary"
    @on-approval-click="handleApproval"
    @on-approval-reject-click="openApprovalReject"
    @on-approval-finished-click="openConfirmApproval"
  />
</template>
