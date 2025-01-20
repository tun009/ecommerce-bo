<!-- BO_B0202_020101 -->

<script setup lang="ts">
import { FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm, XLS_ACCEPTED_TYPE } from '@/common'
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  MemberRegistrationBulk,
  MemberSpecifyInBulkTable,
  TextInputMaxLengthValidation,
  TextareaMaxLength,
  WelfareBigButton,
  WelfareCloseIcon,
  WelfareDateTimePicker,
  WelfareInputText,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import { useMemberPointDeductionRegistration } from '@/composables'
import { MemberBenefitPointAllocationTargetModel } from '@/models'

const {
  tabPanelProps,
  classificationOptions,
  optionsPointType,
  allocationTargetOptions,
  isAllAllocationTarget,
  isSaved,
  values,
  listChecked,
  currentActive,
  isLoadingSuccess,
  isLoadingFail,
  totalSuccessItems,
  totalFailItems,
  pageItemsFail,
  pageItemsSuccess,
  inputFileEl,
  inputFileName,
  resetFile,
  setFieldValue,
  onRegisterRecords,
  onDeleteRecords,
  onRowSelected,
  onSelectAllChange,
  onPageChange,
  handleTabChange,
  onDownload,
  downloadSampleFile,
  resetForm,
  openFileInput,
  onSave,
  handleFileUpload,
  handleRegisterMember
} = useMemberPointDeductionRegistration()
</script>

<template>
  <div class="wf_border-page wf-px-30 wf-py-30">
    <CommonTable>
      <CommonTableRow height="43">
        <CommonTableTitleCell title="복지포인트 코드" is-first-col />
        <CommonTableContentCell></CommonTableContentCell>
        <CommonTableTitleCell title="등록상태" />
        <CommonTableContentCell :text="`작성중`" />
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="복지포인트 구분" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            name="pointClassification"
            :options="classificationOptions"
            :model-value="values.pointClassification"
            @update:model-value="(value) => setFieldValue('pointClassification', value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="복지포인트 유형" required />
        <CommonTableContentCell>
          <WelfareSelect
            class="wf_w-180"
            small
            placeholder="선택"
            :options="optionsPointType"
            option-label="label"
            option-value="value"
            :model-value="values.pointType"
            @update:model-value="(value) => setFieldValue('pointType', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="복지포인트 차감명" is-first-col required />
        <CommonTableContentCell>
          <TextInputMaxLengthValidation
            class="wf_w-full"
            placeholder="복지포인트명 입력"
            size="small"
            hidden-warning
            :max-length="40"
            :model-value="values.pointName"
            @update:model-value="(value) => setFieldValue('pointName', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="차감 일시" is-first-col required />
        <CommonTableContentCell>
          <WelfareDateTimePicker
            class="wf_w-180"
            size="small"
            :format="FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm"
            :model-value="values.timeStart"
            @update:model-value="(value) => setFieldValue('timeStart', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="차감 복지포인트" is-first-col required />
        <CommonTableContentCell>
          <span class="wf-body_03-reg wf_text-n-33">인당</span>
          <WelfareInputText
            class="wf-ml-20 wf_w-180"
            size="small"
            placeholder="숫자만 입력"
            text-align="right"
            :model-value="values.pointNumber"
            @update:model-value="(value) => setFieldValue('pointNumber', value)"
          />
          <span class="wf-ml-6 wf-body_03-reg wf_text-n-33">포인트</span>
        </CommonTableContentCell>
        <CommonTableTitleCell title="총 차감 복지포인트" />
        <CommonTableContentCell :text="`0,000,000 포인트`" />
      </CommonTableRow>
      <CommonTableRow height="154">
        <CommonTableTitleCell title="관리자 메모" is-first-col />
        <CommonTableContentCell>
          <TextareaMaxLength
            class="wf_w-full wf_i-h-120"
            placeholder="내용 입력"
            size="small"
            hidden-warning
            :max-length="100"
            :label-bottom-right="`${values.notes.length}/100 bytes`"
            :model-value="values.notes"
            @update:model-value="(value) => setFieldValue('notes', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="150">
        <CommonTableTitleCell title="차감 사유 입력" is-first-col required />
        <CommonTableContentCell>
          <TextareaMaxLength
            class="wf_w-full wf_i-h-120"
            placeholder="내용 입력"
            size="small"
            hidden-warning
            :max-length="100"
            :label-bottom-right="`${values?.reason?.length}/100 bytes`"
            :model-value="values.reason"
            @update:model-value="(value) => setFieldValue('reason', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44" :is-last-row="!isAllAllocationTarget">
        <CommonTableTitleCell title="복지포인트 배정 대상" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            name="allocationTarget"
            :options="allocationTargetOptions"
            :model-value="values.allocationTarget"
            @update:model-value="(value) => setFieldValue('allocationTarget', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44" is-last-row v-if="isAllAllocationTarget">
        <CommonTableTitleCell title="제외 회원" is-first-col />
        <CommonTableContentCell>
          <WelfareMdButton label="회원선택" button-type="liner" button-size="small" />
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>

    <div class="wf-mt-12">
      <MemberRegistrationBulk
        is-not-container
        v-if="values.allocationTarget === MemberBenefitPointAllocationTargetModel.BULK"
        hidden-action
        :is-loading="currentActive ? isLoadingFail : isLoadingSuccess"
        :total-success-items="totalSuccessItems"
        :list-checked="listChecked"
        :items="currentActive ? pageItemsFail : pageItemsSuccess"
        :total-items="currentActive ? totalFailItems : totalSuccessItems"
        :total-fail-items="totalFailItems"
        :tab-panel-props="tabPanelProps"
        :current-active="currentActive"
        @delete-records="onDeleteRecords"
        @register-records="onRegisterRecords"
        @row-selected="onRowSelected"
        @select-all-change="onSelectAllChange"
        @page-change="onPageChange"
        @tab-change="handleTabChange"
        @downloadFile="onDownload"
      />

      <MemberSpecifyInBulkTable v-else hidden-title :hidden-pagination="isAllAllocationTarget" :is-select-invisible="isAllAllocationTarget">
        <template #buttons v-if="isAllAllocationTarget">
          <WelfareMdButton label="선택삭제" class="wf_w-72" buttonType="liner" />
        </template>
        <template #buttons v-else>
          <WelfareMdButton label="초기화" class="wf_w-57" buttonType="liner" />
          <WelfareMdButton label="선택삭제" class="wf_w-69" buttonType="liner" />
          <WelfareMdButton label="회원조회" class="wf_w-69" buttonType="liner" />
          <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" />
        </template>
      </MemberSpecifyInBulkTable>

      <CommonTable v-if="values.allocationTarget === MemberBenefitPointAllocationTargetModel.BULK">
        <CommonTableRow>
          <CommonTableTitleCell title="양식 다운로드" is-first-col />
          <CommonTableContentCell>
            <WelfareMdButton label="양식 다운로드" button-type="liner" button-size="small" @on-click="downloadSampleFile" />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="84" is-last-row>
          <CommonTableTitleCell title="엑셀파일 등록" is-first-col />
          <CommonTableContentCell>
            <div class="wf_flex wf_flex-col wf_w-full">
              <div class="wf_flex wf_flex-row wf_items-center wf-mb-10">
                <WelfareMdButton label="파일선택" buttonType="liner" class="wf_w-68" buttonSize="small" @on-click="openFileInput" />
                <span class="wf-body_04-reg wf_text-sub-01 wf-ml-10">*지원하는 파일 형식 : .xls</span>
              </div>
              <div class="wf_flex wf_flex-row wf_w-full">
                <div class="wf-search-input-wrapper wf_w-full">
                  <input type="file" ref="inputFileEl" hidden :accept="XLS_ACCEPTED_TYPE" @change="handleFileUpload" />
                  <WelfareInputText
                    inputType="text"
                    class="wf_w-full wrap-input wf_flex wf_flex-row"
                    placeholder="선택된 파일이 없습니다"
                    :model-value="inputFileName"
                    size="small"
                  >
                    <template v-if="inputFileName" #icon>
                      <button type="button" @click="resetFile" class="wf-icon-input-text wf_right-2 wf-py-4 wf-pointer">
                        <WelfareCloseIcon :width="10" :height="10" />
                      </button>
                    </template>
                  </WelfareInputText>
                  <div class="wf-inp-el-overlay_1" @click="openFileInput"></div>
                  <div class="wf-inp-el-overlay_2"></div>
                </div>
                <WelfareMdButton label="업로드" class="wf_w-55 wf-ml-6" buttonType="liner" button-size="small" @on-click="handleRegisterMember" />
              </div>
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>
    </div>

    <CommonTable class="wf-mt-12">
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="등록자" is-first-col />
        <CommonTableContentCell></CommonTableContentCell>
        <CommonTableTitleCell title="등록일자" />
        <CommonTableContentCell :text="`2023. 06. 14 00:00:00`" />
      </CommonTableRow>
    </CommonTable>
    <div class="wf-mt-30 wf-mx--1 wf-mt--1 wf_flex wf_justify-between">
      <WelfareBigButton class="wf_w-120" button-type="neatral" label="초기화" @on-click="() => resetForm()" />
      <WelfareBigButton class="wf_w-230" button-type="default" label="저장" @on-click="isSaved = true" />
      <WelfareBigButton class="wf_w-120" button-type="neatral" label="차감등록" :disabled="!isSaved" @on-click="onSave" />
    </div>
  </div>
</template>
