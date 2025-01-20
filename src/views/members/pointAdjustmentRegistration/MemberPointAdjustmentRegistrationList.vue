<script setup lang="ts">
import { MemberFormPointAdjustment } from '@/components/members'
import { useMemberPointAdjustmentRegistration } from '@/composables'
import { WelfareBigButton } from '@/components'

const {
  values,
  setFieldValue,
  currentFilterDate,
  listInputRow1,
  listSelectRow2,
  listInputRow3,
  listInputRow4,
  inputRow6,
  inputRow7,
  listSelectRow8,
  handleResetFormFilter,
  onSave,
  handleSave,
  handleRegister
} = useMemberPointAdjustmentRegistration()
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body wf-form-filter table-filter-br-0">
      <MemberFormPointAdjustment
        :current-filter-date="currentFilterDate"
        :input-row6="inputRow6"
        :input-row7="inputRow7"
        :list-input-row1="listInputRow1"
        :list-input-row3="listInputRow3"
        :list-input-row4="listInputRow4"
        :list-select-row2="listSelectRow2"
        :list-select-row8="listSelectRow8"
        :values="values"
        @handle-reset-form-filter="handleResetFormFilter"
        @set-field-value="setFieldValue"
      />
      <MemberPointAdjustmentTable />
      <div class="wf-mt-30 wf-mx--1 wf-mt--1 wf_flex wf_justify-between">
        <WelfareBigButton @on-click="handleResetFormFilter" class="wf_w-120" button-type="neatral" label="초기화" />
        <WelfareBigButton @on-click="handleSave" class="wf_w-230" button-type="default" label="저장" />
        <WelfareBigButton @on-click="handleRegister" class="wf_w-120" button-type="neatral" label="차감등록" :disabled="!onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-adjustment-registration.css');
</style>

<script lang="ts">
export default {
  name: 'MemberPointAdjustmentRegistrationList'
}
</script>
