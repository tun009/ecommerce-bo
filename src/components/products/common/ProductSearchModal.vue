<script setup lang="ts">
import { IconCloseRounded, WelfareInputText, WelfareMdButton } from '@/components'
import { ProductSearchModalProps } from '@/models'
import { useProductModalSearchLogic } from '@/composables'

const props = defineProps<ProductSearchModalProps>()

const { searchInp, searchResults, selectValue, handleSearch, handleSelectRow, handleSelectValue, modalSearchMetaInfo } =
  useProductModalSearchLogic(props)
</script>

<template>
  <div class="wf-modal-wrapper--content wf-modal-wrapper--grow">
    <div class="wf-modal-header">
      <p class="wf-sub_tit_01 wf_text-n-33">{{ modalSearchMetaInfo.searchTitle }}</p>
      <IconCloseRounded @click="$props.onCancel" />
    </div>
    <div class="wf-modal-body wf-body_04-mid">
      <div class="wf-search-tips wf-mb-26">
        <p class="wf-list-style wf_text-n-33">{{ modalSearchMetaInfo.searchInfo }}</p>
      </div>
      <div class="wf_flex wf_flex-row wf-space-x-6">
        <WelfareInputText
          size="large"
          inputType="text"
          class="wrap-input wf_w-full"
          :placeholder="modalSearchMetaInfo.placeholderInput"
          v-model="searchInp"
        />
        <WelfareMdButton label="조회" buttonType="liner" class="wf-btn--w-45" @onClick="handleSearch(searchInp)" />
      </div>

      <div class="wf-modal-table wf-modal-table--grow wf-mt-10">
        <div class="wf-modal-table__header">
          <span
            class="wf-body_02-semi wf_text-n-33 wf-modal-table__cell wf_h-45 wf_justify-center wf-modal-table__cell--border-r wf-modal-table__cell--w-100 wf-modal-table__cell--border-b"
          >
            <span class="wf-ml--1">{{ modalSearchMetaInfo.tableCodeTitle }}</span>
          </span>
          <span class="wf-body_02-semi wf_text-n-33 wf_h-45 wf_justify-center wf_flex-grow-1 wf-modal-table__cell wf-modal-table__cell--border-b">
            {{ modalSearchMetaInfo.tableNameTitle }}
          </span>
        </div>

        <div id="wf-modal-search-table__body--common" class="wf-modal-table__body wf-body_03-reg wf_text-n-33">
          <template v-if="searchResults && searchResults.length > 0">
            <div
              v-for="(res, idx) in searchResults"
              :key="idx"
              @click="handleSelectRow(res)"
              :class="selectValue && selectValue.code === res.code ? 'wf_bg-f4 wf_text-sub-02' : ''"
              class="wf-modal-table__row wf_h-44 wf-modal-table__row--border-b wf-text-hover-bg--sub-color-blue wf-pointer"
            >
              <span class="wf-modal-table__cell wf-modal-table__cell--border-r wf-modal-table__cell--w-100">{{ res?.code }}</span>
              <span class="wf_flex-grow-1 wf-modal-table__cell">{{ res?.name }}</span>
            </div>
          </template>
          <template v-else-if="searchResults && searchResults.length === 0">
            <div class="wf-modal-table__row wf_h-44 wf-modal-table__row--border-b">
              <div class="wf-modal-table__row wf-modal-table__cell wf_text-600 wf_justify-center wf_w-full wf_text-n-33">검색 결과가 없습니다.</div>
            </div>
          </template>
          <template v-else>
            <div class="wf-modal-table__row wf_h-44 wf-modal-table__row--border-b">
              <div class="wf-modal-table__row wf-modal-table__cell wf_justify-center wf_w-full wf_text-n-33"></div>
            </div>
          </template>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf-mt-20 wf_flex-grow wf_w-full">
        <WelfareMdButton class="wf_w-120" :label="'취소'" buttonType="cancel" @onClick="props.onCancel" />
        <WelfareMdButton class="wf_w-120" :label="'확인'" buttonType="default" @onClick="handleSelectValue" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/product-search-modal.css');
</style>
