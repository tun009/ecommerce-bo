<script setup lang="ts">
import { MemberPointAdjustmentTableUpdateConfig } from '@/models'
import { DataTableContainer, FormGroup, WelfareInputNumber, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import { ProductBorderBottomTitle } from '@/components/products'
import { useMemberPointAdjustmentTable } from '@/composables'
import { ItemEditPointAdjustment } from '@/components/members'

const { items, values, isLoading, totalItems, onPageChange, setFieldValue, handleResetFormFilter, selectRow1, selectRow2, inputRow1, inputRow2 } =
  useMemberPointAdjustmentTable()
</script>

<template>
  <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10 wf-mt-30">할인 프로모션 설정</ProductBorderBottomTitle>
  <div class="wf-group-filter">
    <div class="wf_flex wf_flex-col">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex wf-width-full" is-rounded-top label="등록자" is-rounded-bottom :isBorderBottom="false">
          <div>
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              small
              :model-value="values[selectRow1.field]"
              @update:model-value="(value) => setFieldValue(selectRow1.field, value)"
              :options="selectRow1.optionsNormal"
            />
          </div>
          <WelfareInputText
            size="small"
            class="wf_flex wf-width-full wf-ml-6"
            placeholder="쉼표(,)구분하여 검색어 입력"
            :model-value="values[inputRow1.field]"
            @update:model-value="(value) => setFieldValue(inputRow1.field, value)"
          />
        </FormGroup>
      </div>
    </div>
  </div>
  <DataTableContainer
    :value="items"
    @page-change="onPageChange"
    :total-records="totalItems"
    :loading="isLoading"
    :column-configs="MemberPointAdjustmentTableUpdateConfig"
    ref="tableRef"
  >
    <template #title>
      <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItems }} 건</h6>
    </template>
    <template #body-individualAdjustmentPoints>
      <ItemEditPointAdjustment />
    </template>
    <template #body-adjustmentNotes>
      <WelfareInputNumber size="small" class="wf_flex wf-width-full wf-ml-6" placeholder="메모 입력" />
    </template>
    <template #buttons>
      <div class="wf-space-x-6 wf_flex wf_justify-center wf_items-center">
        <WelfareSelect
          class="wf_w-180"
          optionLabel="label"
          :model-value="values[selectRow2.field]"
          @update:model-value="(value) => setFieldValue(selectRow2.field, value)"
          :options="selectRow2.optionsNormal"
        />
        <WelfareInputText
          class="wf_w-input--180 wf--h-input-40 text-input-right"
          :disabled="values[selectRow2.field].value === selectRow2.optionsNormal[0].value"
          placeholder="숫자만 입력"
          :model-value="values[inputRow2.field]"
          @update:model-value="(value) => setFieldValue(inputRow2.field, value)"
        />
        <WelfareMdButton @on-click="handleResetFormFilter" label="초기화" class="wf_w-57" buttonType="liner" />
        <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" />
      </div>
    </template>
  </DataTableContainer>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-adjustment-registration.css');
</style>