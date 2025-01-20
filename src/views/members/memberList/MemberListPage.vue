<!-- BO_B0101_010101 -->
<script lang="ts" setup>
import { WelfareInputText, WelfareMdButton, WelfareSelect, WelfareRadio, FormGroupTimeLinesFilterForm, MemberListDataTable } from '@/components'
import { FormButtonHandleForm, FormGroup } from '@/components/widgets'
import { useMemberList } from '@/composables'

const {
  values,
  setFieldValue,
  handleChangeCountDate,
  currentFilterDate,
  listInputRow1,
  listInputRow2,
  listRadioLevelMember,
  listSelectDate,
  listSelectRow2,
  handleResetFormFilter,
  handleSubmitFormFilter,
  items,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  totalItems,
  isListCheckedEmpty,
  refTable,
  onDownload
} = useMemberList()
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" is-rounded-top label="고객사(고객사코드)">
                  <div class="wf_flex wf-space-x-6 wf_items-center">
                    <WelfareInputText
                      :model-value="values.codeCustomer"
                      @update:model-value="(value) => setFieldValue('codeCustomer', value)"
                      name="abc"
                      placeholder="고객사 조회"
                      size="small"
                    />
                    <WelfareMdButton buttonSize="small" label="조회" buttonType="liner" class="wf-btn--w-45" />
                  </div>
                </FormGroup>
                <FormGroup is-border-left class="wf_flex-1" v-for="(input, index) in listInputRow1" :key="index" :label="input.label">
                  <WelfareInputText
                    :placeholder="input.placeholder"
                    :model-value="values[input.field]"
                    @update:model-value="(value) => setFieldValue(input.field, value)"
                    size="small"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" v-for="(input, index) in listInputRow2" :key="index" :is-border-left="index !== 0" :label="input.label">
                  <WelfareInputText
                    :placeholder="input.placeholder"
                    :model-value="values[input.field]"
                    @update:model-value="(value) => setFieldValue(input.field, value)"
                    size="small"
                  />
                </FormGroup>
                <FormGroup class="wf_flex-1" v-for="(select, index) in listSelectRow2" :key="index" is-border-left :label="select.label">
                  <WelfareSelect
                    class="wf_width-full"
                    optionLabel="label"
                    :model-value="values[select.field]"
                    @update:model-value="(value) => setFieldValue(select.field, value)"
                    :options="select.options"
                    small
                  />
                </FormGroup>
              </div>
              <FormGroup :label="listRadioLevelMember.label" customClass="wf-space-x-20">
                <WelfareRadio
                  v-for="(radio, index) in listRadioLevelMember.options"
                  :key="index"
                  :model-value="values[listRadioLevelMember.field]"
                  @update:model-value="(value) => setFieldValue(listRadioLevelMember.field, value)"
                  :value="radio.value"
                  :label="radio.label"
                  :name="listRadioLevelMember.field"
                  size="sm"
                />
              </FormGroup>
              <FormGroupTimeLinesFilterForm
                class="wf_h-42"
                :is-border-bottom="false"
                :is-rounded-bottom="true"
                label="조회기간"
                :current-active-date="currentFilterDate"
                @on-change-filter-date="handleChangeCountDate"
                :from-date="values.fromDate"
                :to-date="values.toDate"
                @on-change-date-from="(value) => setFieldValue('fromDate', value)"
                @on-change-date-to="(value) => setFieldValue('toDate', value)"
                :current-type-date-product-select="values.dateSelect"
                @on-select-type="(value) => setFieldValue('dateSelect', value)"
                :options-product-type-date="listSelectDate.options"
              />
            </form>
          </div>
          <FormButtonHandleForm @on-reset="handleResetFormFilter" @on-submit="handleSubmitFormFilter()" />
        </div>
      </div>
      <MemberListDataTable
        ref="refTable"
        :data="items"
        @row-checked-change="onRowSelected"
        @select-all-change="onSelectAllChange"
        :total-element="totalItems"
        @page-change="onPageChange"
        :loading="isLoading"
        :isListCheckedEmpty="isListCheckedEmpty"
        @downloadFile="onDownload"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-list.css');
</style>

<script lang="ts">
export default {
  name: 'MemberListPage'
}
</script>
