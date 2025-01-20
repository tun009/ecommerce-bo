<!-- BO_C0610_010101_P -->
<script setup lang="ts">
import Column from 'primevue/column'
import {
  DataTablePaginationWithCheckbox,
  FormGroupDateFilter,
  FormGroupSelectInput,
  HeaderModal,
  WelfareInputText,
  WelfareMdButton,
  WelfareSelect
} from '@/components'

import { useProductSearchItemModalLogic } from '@/composables'
import { ProductSearchItemModalProps } from '@/models'

const props = defineProps<ProductSearchItemModalProps>()

const {
  query,
  groupDateRef,
  classificationOptions,
  salesStatusOptions,
  approvalStatusOptions,
  periodOptions,
  codeSearchOptions,
  codeSearchEnabled,
  tableRef,
  isLoading,
  items,
  totalItems,
  onPageChange,
  onSelectAllChange,
  onRowCheckedChange,
  handleReset,
  handleSearch,
  handleConfirm
} = useProductSearchItemModalLogic(props)
</script>

<template>
  <div class="wf_w-1200 wf_br-4 wf_bg-white">
    <HeaderModal title="상품 검색" @close-modal="$props.onCancel" />
    <div class="wf-px-20 wf-py-20">
      <div class="wf-btn-border--ncc wf_br-6">
        <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-tl--6 wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">상품 구분</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareSelect
                :disabled="codeSearchEnabled"
                v-model="query.classification"
                :options="classificationOptions"
                optionLabel="label"
                small
                placeholder=""
              />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">담당 MD</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareInputText :disabled="codeSearchEnabled" v-model="query.md" size="small" placeholder="" />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">상품명</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareInputText :disabled="codeSearchEnabled" v-model="query.name" size="small" placeholder="" />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">상품 코드</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareInputText :disabled="codeSearchEnabled" v-model="query.code" size="small" placeholder="" />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">판매 상태</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareSelect
                :disabled="codeSearchEnabled"
                v-model="query.salesStatus"
                :options="salesStatusOptions"
                optionLabel="label"
                small
                placeholder=""
              />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">승인 상태</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareSelect
                :disabled="codeSearchEnabled"
                v-model="query.approvalStatus"
                :options="approvalStatusOptions"
                optionLabel="label"
                small
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">기간</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1 wf_flex wf-space-x-6">
              <WelfareSelect
                :disabled="codeSearchEnabled"
                v-model="query.period"
                :options="periodOptions"
                optionLabel="label"
                class="wf_w-180"
                small
              />
              <FormGroupDateFilter
                ref="groupDateRef"
                v-model:start-date="query.startDate"
                v-model:end-date="query.endDate"
                :disabled="codeSearchEnabled"
              />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-42">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-bl--6 wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">검색어</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1">
              <FormGroupSelectInput
                v-model:select="query.codeSearch"
                :selectOptions="codeSearchOptions"
                optionLabel="label"
                select-placeholder="사용안함"
                :input-disabled="!codeSearchEnabled"
                v-model:input="query.codeQuery"
                input-placeholder="최대 50개 까지 입력 가능"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="wf-my-20 wf_flex wf_justify-center wf-space-x-4">
        <WelfareMdButton type="reset" class="wf_w-120" button-type="cancel" label="초기화" @onClick="handleReset" />
        <WelfareMdButton type="button" class="wf_w-120" button-type="default" label="조회" @onClick="handleSearch" />
      </div>

      <hr class="wf-my-20" />

      <!-- table -->
      <div class="wf_product-search-table">
        <DataTablePaginationWithCheckbox
          :value="items"
          :loading="isLoading"
          :totalRecords="totalItems"
          v-on:page-change="onPageChange"
          v-on:select-all-change="onSelectAllChange"
          v-on:row-checked-change="onRowCheckedChange"
          ref="tableRef"
        >
          <template #title>
            <h2 class="">조회 결과 총 N,NNN 건</h2>
          </template>
          <template #buttons> </template>
          <template #columns>
            <Column field="id" header="No." class="id-column" />
            <Column header="상품코드" class="code-column">
              <template #body="slotProps">
                <a target="_blank" href="#">
                  {{ slotProps.data.code }}
                </a>
              </template>
            </Column>
            <Column header="상품명" class="name-column">
              <template #body="slotProps">
                <a target="_blank" href="#">
                  {{ slotProps.data.name }}
                </a>
              </template>
            </Column>
            <Column field="classification" header="상품구분" class="classification-column" />
            <Column field="type" header="상품유형" class="type-column"></Column>
            <Column field="price" header="판매가" class="price-column"></Column>
            <Column field="salesStatus" header="판매상태" class="salesSatus-column"></Column>
            <Column field="approvalStatus" header="승인상태" class="approvalStatus-column"></Column>
            <Column field="md" header="담당MD" class="md-column"></Column>
            <Column field="registrant" header="등록자" class="registrant-column"></Column>
            <Column field="registrationDate" header="등록일" class="date-column"></Column>
            <Column field="modifier" header="수정자" class="modifier-column"></Column>
            <Column field="modificationDate" header="수정일" class="date-column"></Column>
          </template>
        </DataTablePaginationWithCheckbox>
      </div>

      <div class="wf-mt-20 wf_flex wf_justify-center wf-space-x-4">
        <WelfareMdButton class="wf_w-120" button-type="cancel" label="닫기" @on-click="$props.onCancel" />
        <WelfareMdButton class="wf_w-120" button-type="default" label="선택" @on-click="handleConfirm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/css/view/product/modal/searchModal/product-search-modal.css);
</style>
