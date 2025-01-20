<!-- BO_B0101_020103_P -->
<!-- BO_E0207_080101_P -->
<script setup lang="ts">
import {
  DataTableContainer,
  FormGroup,
  HeaderModal,
  MemberRequestDataTable,
  WelfareDateTimePicker,
  WelfareInputText,
  WelfareMdButton,
  WelfareSelect
} from '@/components'
import { DEFAULT_DATE_FORMAT_DOT, DEFAULT_TABLE_SELECT_OPTIONS } from '@/common'
import { useMemberRequestModalLogic } from '@/composables'
import { MemberRequestModalProps, memberSearchTableHeaderConfig, MemberSearchType, ProductDataFieldFormApprovalProductListConfig } from '@/models'

const props = withDefaults(defineProps<MemberRequestModalProps>(), {
  searchType: MemberSearchType.REQUEST
})

const {
  setFieldValue,
  handleResetForm,
  onRowSelect,
  isLoading,
  handleSelectValue,
  handleSearch,
  memberRequestAccountStatusCode,
  searchResults,
  onPageChange,
  totalSearchItems,
  handleChangeCountDate,
  currentFilterDate,
  values,
  memberRequestMarketingAgreeYn,
  memberRequestGradeCode
} = useMemberRequestModalLogic(props)
</script>

<template>
  <div class="member-request-modal">
    <HeaderModal title="회원 조회" @close-modal="props.onCancel" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col wf-space-y-20">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="회원코드">
            <WelfareInputText
              :modelValue="values.memberKey"
              @update:modelValue="(value) => setFieldValue('memberKey', value)"
              placeholder="회원코드 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="회원명">
            <WelfareInputText
              :modelValue="values.memberName"
              @update:modelValue="(value) => setFieldValue('memberName', value)"
              placeholder="회원명 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="아이디">
            <WelfareInputText
              :modelValue="values.memberId"
              @update:modelValue="(value) => setFieldValue('memberId', value)"
              placeholder="아이디 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="고객사">
            <WelfareSelect placeholder="고객사 선택" small class="wf_w-180" />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="사번">
            <WelfareInputText
              :modelValue="values.employeeNumber"
              @update:modelValue="(value) => setFieldValue('employeeNumber', value)"
              placeholder="사번 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="휴대폰 번호">
            <WelfareInputText
              :modelValue="values.cellphoneNumber"
              @update:modelValue="(value) => setFieldValue('cellphoneNumber', value)"
              placeholder="휴대폰번호 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="회원등급">
            <WelfareSelect
              :modelValue="values.gradeCode"
              :options="memberRequestGradeCode"
              option-label="label"
              @update:modelValue="(value) => setFieldValue('gradeCode', value.value)"
              placeholder="전체"
              small
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="계정상태">
            <WelfareSelect
              :modelValue="values.accountStatusCode"
              :options="memberRequestAccountStatusCode"
              optionLabel="label"
              @update:modelValue="(value) => setFieldValue('accountStatusCode', value.value)"
              placeholder="전체"
              small
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="마케팅동의">
            <WelfareSelect
              :modelValue="values.marketingAgreeYn"
              :options="memberRequestMarketingAgreeYn"
              optionLabel="label"
              @update:modelValue="(value) => setFieldValue('marketingAgreeYn', value.value)"
              placeholder="전체"
              small
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_flex-row wf_h-42">
          <div
            class="wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-border-radius-bottom-left wf_product-min-w-150 wf_product-border-right-ncc"
          >
            회원등록일
          </div>
          <div class="wf_flex wf_items-center wf-space-x-4 wf-py-6 wf-pl-11">
            <WelfareDateTimePicker
              :modelValue="values.startDate"
              @update:model-value="(val) => setFieldValue('startDate', val)"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
            />
            <span class="wf-pl-2 wf-pr-1">~</span>
            <WelfareDateTimePicker
              :modelValue="values.endDate"
              @update:model-value="(val) => setFieldValue('endDate', val)"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
            />
          </div>
          <div class="wf_flex wf_items-center wf-space-x-4 wf-ml-6">
            <WelfareMdButton
              v-for="(item, index) in ProductDataFieldFormApprovalProductListConfig.listButtonDateFilter"
              :key="index"
              :label="item.label"
              class="wf_w-55"
              buttonType="neutral"
              buttonSize="small"
              :class="{ active: currentFilterDate === item.value }"
              @click="handleChangeCountDate(item.value)"
            />
          </div>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf_product-border-bottom-sub-gray wf-pb-20">
        <WelfareMdButton class="wf_w-120" :label="'초기화'" buttonType="cancel" @onClick="handleResetForm" />
        <WelfareMdButton class="wf_w-120" :label="'조회'" buttonType="default" @onClick="handleSearch" />
      </div>

      <!-- table -->
      <div class="wf_product-search-table" v-if="props.searchType === MemberSearchType.REQUEST">
        <MemberRequestDataTable
          class="wf-member-request-modal-table"
          :value="searchResults"
          :loading="isLoading"
          :total-records="totalSearchItems"
          @page-change="onPageChange"
          @row-click="onRowSelect"
          noDataLabel="조회 내용이 없습니다."
          row-hover
        >
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton
                label="선택 등록"
                buttonType="liner"
                buttonSize="small"
                class="w-66 wf-mr--2 wf_color-button--blue"
                @onClick="handleSelectValue"
              />
            </div>
          </template>
        </MemberRequestDataTable>
      </div>
      <div class="wf_product-search-table" v-else>
        <DataTableContainer
          :column-configs="memberSearchTableHeaderConfig"
          :value="searchResults"
          :loading="isLoading"
          :total-records="totalSearchItems"
          @page-change="onPageChange"
          @row-click="onRowSelect"
          no-data-label="조회내용이 없습니다."
          :select-props="{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS }"
          row-hover
        >
          <template #title>
            <p>
              <span class="wf-body_01-semi">조회 결과</span>&nbsp;
              <span class="wf-body_01-mid wf_text-n-8-f">(총 {{ totalSearchItems ?? 0 }}건)</span>
            </p>
          </template>
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton
                label="조회 결과"
                button-type="liner"
                buttonSize="small"
                class="w-66 wf-mr--2 wf_color-button--blue"
                @onClick="handleSelectValue"
              />
            </div>
          </template>
        </DataTableContainer>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/modal/memberRequest/member-request.css');
</style>
