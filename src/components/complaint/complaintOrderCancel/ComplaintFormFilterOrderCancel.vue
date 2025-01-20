<script setup lang="ts">
import { memberAllocationListDate, MemberPointListFormFieldModel, ProductDataFieldFormDeliveryProductListModel, ProductSearchType } from '@/models'
import { FormButtonHandleForm, FormGroup, WelfareInputText, WelfareSelect } from '@/components'
import { ProductSearchModalWithTableWrapper } from '@/components/products'
import { FormGroupTimeLinesFilterForm } from '@/components/widgets'

interface ComplaintFormFilterOrderCancelProps {
  values: any
  currentFilterDate: number
  inputRow1: MemberPointListFormFieldModel
  selectRow1: MemberPointListFormFieldModel
  listInputRow2: MemberPointListFormFieldModel[]
  listInputRow3: MemberPointListFormFieldModel[]
  listInputRow4: MemberPointListFormFieldModel[]
  inputRow4: MemberPointListFormFieldModel
  selectRow4: MemberPointListFormFieldModel
  listSelectDate: MemberPointListFormFieldModel
  listSelectSearchType: MemberPointListFormFieldModel
  querySearch: MemberPointListFormFieldModel
}

interface MemberFormFilterPointAllocationEmits {
  (e: 'setFieldValue', field: string, value: any): void

  (e: 'handleResetFormFilter'): void

  (e: 'handleChangeCountDate', value: number): void

  (e: 'handleSubmitForm'): void
}

defineProps<ComplaintFormFilterOrderCancelProps>()
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
</script>

<template>
  <div class="wf-approval-border">
    <div class="wf-form-filter">
      <div id="wf-group-filer" class="wf-group-filter">
        <div class="wf_flex wf_flex-col wf-mt-0">
          <div class="wf_flex wf_items-center wf_br-b">
            <FormGroup class="wf-w-1-2" is-rounded-top  :label="inputRow1.label" :isBorderBottom="false">
              <WelfareInputText
                class="wf_w-180"
                :max-length="20"
                :placeholder="inputRow1.placeholder"
                :model-value="values[inputRow1.field]"
                @update:model-value="(value) => eventEmit.setFieldValue(inputRow1.field, value)"
                size="small"
              />
            </FormGroup>
            <FormGroup is-border-left class="wf-w-1-2" custom-class="wf-pr-8" :isBorderBottom="false" :label="selectRow1.label">
              <WelfareSelect
                class="wf_w-180"
                optionLabel="label"
                :model-value="values[selectRow1.field]"
                @update:model-value="(value) => eventEmit.setFieldValue(selectRow1.field, value)"
                :options="selectRow1.options"
                small
              />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row">
            <div class="wf-w-1-2" v-for="(input, index) in listInputRow2" :key="index">
              <FormGroup :label="input.label"  :is-border-left="index !== 0">
                <div class="wf_flex wf-space-x-6 wf_items-center">
                  <ProductSearchModalWithTableWrapper
                    class="wf_m-w-228"
                    @selectValue="(value) => eventEmit.setFieldValue(input.field, value)"
                    placeholder-input="고객사 조회"
                    :type="ProductSearchType.CUSTOMER"
                  />
                </div>
              </FormGroup>
            </div>
          </div>
          <div class="wf_flex wf_flex-row wf-width-full">
            <FormGroup
              class="wf_flex-1"
              custom-class="wf-pr-8"
              v-for="(input, index) in listInputRow3"
              :key="index"
              :is-border-left="index !== 0"
              :label="input.label"
            >
              <WelfareInputText
                class="wf_w-180"
                :max-length="20"
                :placeholder="input.placeholder"
                :model-value="values[input.field]"
                @update:model-value="(value) => eventEmit.setFieldValue(input.field, value)"
                size="small"
              />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row">
            <div class="wf-w-1-2">
              <FormGroup :label="inputRow4.label">
                <div class="wf_flex wf-space-x-6 wf_items-center">
                  <ProductSearchModalWithTableWrapper
                    class="wf_m-w-228"
                    @selectValue="(value) => eventEmit.setFieldValue(inputRow4.field, value)"
                    :placeholder-input="inputRow4.placeholder"
                    :type="ProductSearchType.CUSTOMER"
                  />
                  <WelfareSelect
                    class="wf_w-180"
                    optionLabel="label"
                    :model-value="1"
                    @update:model-value="
                      (value) => {
                        eventEmit.setFieldValue(selectRow4.field, value)
                      }
                    "
                    :options="selectRow4.options"
                    small
                  />
                </div>
              </FormGroup>
            </div>
            <div class="wf_flex wf_flex-row wf-w-1-2">
              <FormGroup
                class="wf_flex-1"
                custom-class="wf-pr-8"
                v-for="(input, index) in listInputRow4"
                :key="index"
                is-border-left
                :label="input.label"
              >
                <div class="wf_flex wf-space-x-6 wf_items-center">
                  <ProductSearchModalWithTableWrapper
                    @selectValue="(value) => eventEmit.setFieldValue(input.field, value)"
                    placeholder-input="고객사 조회"
                    :type="ProductSearchType.CUSTOMER"
                  />
                </div>
              </FormGroup>
            </div>
          </div>
          <FormGroupTimeLinesFilterForm
            label="기간"
            class="wf_h-40"
            :is-border-bottom="true"
            :is-rounded-bottom="false"
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
          <div class="wf_flex wf_flex-row">
            <div class="wf-width-full wf_h-42">
              <FormGroup :label="listSelectSearchType.label" is-rounded-bottom :is-border-bottom="false">
                <div class="wf_flex wf-width-full wf-space-x-6 wf_items-center">
                  <div class="wf_w-180">
                    <WelfareSelect
                      class="wf_w-180"
                      optionLabel="label"
                      :model-value="values[listSelectSearchType.field]"
                      @update:model-value="
                        (value) => {
                          eventEmit.setFieldValue(listSelectSearchType.field, value)
                        }
                      "
                      :options="listSelectSearchType.options"
                      small
                    />
                  </div>
                  <WelfareInputText
                    class="wf-width-full"
                    :max-length="20"
                    :placeholder="querySearch.placeholder"
                    :model-value="values[querySearch.field]"
                    @update:model-value="(value) => eventEmit.setFieldValue(querySearch.field, value)"
                    size="small"
                    disabled
                  />
                </div>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
      <FormButtonHandleForm class="wf-mt--4" @on-reset="eventEmit.handleResetFormFilter" @on-submit="eventEmit.handleSubmitForm" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-list.css');
</style>