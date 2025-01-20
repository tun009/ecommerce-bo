<script setup lang="ts">
import {
  memberAllocationListDate,
  MemberPointAllocationListType,
  MemberPointListFormFieldModel,
  ProductDataFieldFormDeliveryProductListModel,
  ProductSearchType
} from '@/models'
import { FormButtonHandleForm, FormGroup, WelfareInputText, WelfareRadio, WelfareSelect } from '@/components'
import { ProductSearchModalWithTableWrapper } from '@/components/products'
import { FormGroupTimeLinesFilterForm } from '@/components/widgets'
import { computed } from 'vue'

interface MemberFormFilterPointAllocationProps {
  listInputRow1: MemberPointListFormFieldModel[]
  listSelectRow2: MemberPointListFormFieldModel[]
  values: any
  listRadioLevelMember: MemberPointListFormFieldModel
  listSelectDate: MemberPointListFormFieldModel
  currentFilterDate: number
  typePointAllocation: MemberPointAllocationListType
}

interface MemberFormFilterPointAllocationEmits {
  (e: 'setFieldValue', field: string, value: any): void

  (e: 'handleResetFormFilter'): void

  (e: 'handleChangeCountDate', value: number): void

  (e: 'handleSubmitForm'): void
}

const props = defineProps<MemberFormFilterPointAllocationProps>()
const emit = defineEmits<MemberFormFilterPointAllocationEmits>()

const eventEmit = {
  setFieldValue: (field: string, value: any) => {
    emit('setFieldValue', field, value)
  },
  handleResetFormFilter: () => {
    emit('handleResetFormFilter')
  },
  handleChangeCountDate: (value: number) => {
    emit('handleChangeCountDate', value)
  },
  handleSubmitForm: () => {
    emit('handleSubmitForm')
  }
}
const listButtonDate = ProductDataFieldFormDeliveryProductListModel.listButtonDateFilter

const listSelected = computed(() => {
  switch (props.values[props.listRadioLevelMember.field]) {
    case props.listRadioLevelMember?.options?.[0]?.value:
      return props.listSelectRow2[0].options
    case props.listRadioLevelMember?.options?.[1]?.value:
      return props.listSelectRow2[0].optionsNormal
    case props.listRadioLevelMember?.options?.[2]?.value:
      return props.listSelectRow2[0].optionsSpecial
    default:
      return props.listSelectRow2[0].options
  }
}, props.values[props.listRadioLevelMember.field])
</script>

<template>
  <div class="wf-approval-border">
    <div class="wf-form-filter">
      <div id="wf-group-filer" class="wf-group-filter">
        <div class="wf_flex wf_flex-col wf-mt-0">
          <div class="wf_flex wf_items-center wf_br-b">
            <FormGroup class="wf-w-1-4" is-rounded-top required label="고객사(고객사코드)" :isBorderBottom="false">
              <div class="wf_flex wf-space-x-6 wf_items-center">
                <ProductSearchModalWithTableWrapper
                  @selectValue="(value) => eventEmit.setFieldValue('codeCustomer', value)"
                  placeholder-input="고객사 조회"
                  :type="ProductSearchType.CUSTOMER"
                />
              </div>
            </FormGroup>
            <FormGroup is-border-left class="wf-w-1-4" custom-class="wf-pr-8" :isBorderBottom="false" :label="listInputRow1[0].label">
              <WelfareInputText
                class="wf_w-180"
                :max-length="20"
                :placeholder="listInputRow1[0].placeholder"
                :model-value="values[listInputRow1[0].field]"
                @update:model-value="(value) => eventEmit.setFieldValue(listInputRow1[0].field, value)"
                size="small"
              />
            </FormGroup>
            <FormGroup
              is-border-left
              :isBorderBottom="false"
              custom-class="wf-pr-8"
              :class="typePointAllocation === MemberPointAllocationListType.deduction ? `wf-w-1-2` : `wf-w-1-4`"
              :label="listInputRow1[1].label"
            >
              <WelfareInputText
                class="wf_w-180"
                :placeholder="listInputRow1[1].placeholder"
                :model-value="values[listInputRow1[1].field]"
                @update:model-value="(value) => eventEmit.setFieldValue(listInputRow1[1].field, value)"
                size="small"
              />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row">
            <div class="wf-w-1-2">
              <FormGroup :label="listRadioLevelMember.label" customClass="wf-space-x-20">
                <WelfareRadio
                  v-for="(radio, index) in listRadioLevelMember.options"
                  :key="index"
                  :model-value="values[listRadioLevelMember.field]"
                  @update:model-value="(value) => eventEmit.setFieldValue(listRadioLevelMember.field, value)"
                  :value="radio.value"
                  :label="radio.label"
                  :name="listRadioLevelMember.field"
                  size="sm"
                />
              </FormGroup>
            </div>
            <div class="wf_flex wf_flex-row wf-w-1-2">
              <FormGroup
                class="wf_flex-1"
                custom-class="wf-pr-8"
                v-for="(select, index) in typePointAllocation === MemberPointAllocationListType.deduction
                  ? listSelectRow2.slice(0, 1)
                  : listSelectRow2"
                :key="index"
                is-border-left
                :label="select.label"
              >
                <WelfareSelect
                  class="wf_w-180"
                  optionLabel="label"
                  :model-value="values[select.field]"
                  @update:model-value="(value) => eventEmit.setFieldValue(select.field, value)"
                  :options="index === 0 ? listSelected : select.optionsNormal"
                  small
                />
              </FormGroup>
            </div>
          </div>
          <FormGroupTimeLinesFilterForm
            label="기간"
            class="wf_h-42"
            :is-border-bottom="false"
            :is-rounded-bottom="true"
            :current-active-date="currentFilterDate"
            :option-date-button="listButtonDate.concat(memberAllocationListDate)"
            :from-date="values.fromDate"
            :to-date="values.toDate"
            :current-type-date-product-select="values.dateSelect"
            :options-product-type-date="listSelectDate.options"
            @on-change-date-from="(value) => eventEmit.setFieldValue('fromDate', value)"
            @on-change-date-to="(value) => eventEmit.setFieldValue('toDate', value)"
            @on-select-type="(value) => eventEmit.setFieldValue('dateSelect', value)"
            @on-change-filter-date="eventEmit.handleChangeCountDate"
          />
        </div>
      </div>
      <FormButtonHandleForm @on-reset="eventEmit.handleResetFormFilter" @on-submit="eventEmit.handleSubmitForm" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-list.css');
</style>