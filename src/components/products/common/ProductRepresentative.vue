<script setup lang="ts">
import { ProductTableModal } from '@/components/products'
import { WelfareMdButton, WelfareRadio } from '@/components/uikit'
import {
  useProductRegisterHandleFile,
  useProductDeleteFileModal,
  useProductModalChangeImage,
  useProductModalChangeVideo,
  useProductRepresentative,
  useProductScaleImage
} from '@/composables/products'
import { ProductRepresentativeProps } from '@/models'
import { onMounted } from 'vue'
import ProductRepresentativeNotification from './ProductRepresentativeNotification.vue'

const props = withDefaults(defineProps<ProductRepresentativeProps>(), {
  typeFile: 'img'
})

onMounted(() => {
  useProductScaleImage()
})

const { deleteFile, indexChange, getFile } = useProductRegisterHandleFile(props)
const { onShowModal } = useProductModalChangeImage()
const { onShowModalVideo } = useProductModalChangeVideo()
const { onShowModalDelete } = useProductDeleteFileModal(deleteFile)
const { imageChecked, onDeleteFileModal, onRegisterFileModal, disabledDeleteBtn } = useProductRepresentative(
  props,
  onShowModal,
  onShowModalVideo,
  onShowModalDelete,
  indexChange,
  getFile
)
</script>

<template>
  <div class="wf_wrapper-product-representative">
    <div class="wf-re-product-group-title">
      <p class="wf-sub_tit_01 wf__text-color--33">{{ $props.label }}</p>
    </div>
    <div class="wf_line"></div>
    <div class="wf_flex wf_flex-col wf-re-product-group--filter">
      <div class="wf_flex wf_flex-col wf-space-y-10">
        <div class="wf_flex wf-space-x-20">
          <div class="wf-body-popup--item wf_flex wf_flex-1 wf_flex-col wf-space-y-12">
            <ProductRepresentativeNotification
              :notifications="notifications"
              :custom-class="props.typeFile === 'video' ? 'wf-pl-19 wf-pt-19' : 'wf-pl-24'"
            />
            <div class="wf_re-product-table-create">
              <ProductTableModal :headers="props.headers">
                <template #table-body>
                  <div class="wf_modal-popup-table-row wf_flex" v-for="(row, index) in dataTable" :key="index">
                    <span class="wf-body_03-reg wf-pl-9 wf-pt-1">{{ index + 1 }}</span>
                    <WelfareRadio
                      v-if="props.typeFile === 'img'"
                      name="avatar"
                      size="sm"
                      :value="index"
                      v-model="imageChecked"
                      :disabled="!row.url"
                    />
                    <span class="wf-body_03-reg wf_flex-1 wf_justify-start wf-pb-2 wf-pl-23 wf_underline">{{ row.name }}</span>
                    <div class="wf-space-x-4 wf-pt-1">
                      <WelfareMdButton label="등록" buttonType="liner" :button-size="'small'" @on-click="onRegisterFileModal(index)" />
                      <WelfareMdButton
                        label="삭제"
                        buttonType="liner"
                        :button-size="'small'"
                        :disabled="disabledDeleteBtn(index, row.url)"
                        @on-click="onDeleteFileModal(index, props.typeFile)"
                      />
                    </div>
                  </div>
                </template>
              </ProductTableModal>
            </div>
          </div>
          <div class="wf-body-popup--item wf_flex wf_flex-1 wf_flex-col wf-space-y-12">
            <div
              class="wf_width-full wf-re-product-h-image wf_flex wf_justify-center"
              :class="{ ' wf-re-product-h-video': props.typeFile === 'video' }"
            >
              <img
                v-if="props.typeFile === 'img'"
                class="wf-re-product-active-image image_hover image-scale"
                alt=""
                :src="dataTable[imageChecked].url"
              />
              <video v-else controls alt="" :src="dataTable[imageChecked].url" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/ticketProduct/baseInfo');
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
