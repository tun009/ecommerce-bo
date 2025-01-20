<script setup lang="ts">
import {
  BaseDataTablePagination,
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  HeaderModal,
  TextareaMaxLength,
  WelfareMdButton,
  WelfareSelect
} from '@/components'
import { useMemberDetailBlackMemberRegistrationModalLogic } from '@/composables'
import { MemberDetailBlackMemberRegistrationModalProps } from '@/models'
import Column from 'primevue/column'

const props = defineProps<MemberDetailBlackMemberRegistrationModalProps>()

const { reasonOptions, query, labelRightComputed, statusSaveButton, tableRef, items, isLoading, totalItems, onPageChange, onSave } =
  useMemberDetailBlackMemberRegistrationModalLogic(props)
</script>
<template>
  <div class="wf_w-800 wf_bg-white">
    <HeaderModal title="블랙회원 등록/관리" @close-modal="$emit('onClose')" />
    <div class="wf-px-20 wf-py-20">
      <CommonTable>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="선택 회원명" is-first-col />
          <CommonTableContentCell :text="`${$props?.member?.name}(${$props.member.id})`" />
          <CommonTableTitleCell title="사유 구분" required />
          <CommonTableContentCell>
            <WelfareSelect
              class="wf_w-180"
              small
              v-model="query.reason"
              :options="reasonOptions"
              option-label="label"
              option-value="value"
              placeholder="선택"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="150" is-last-row>
          <CommonTableTitleCell title="상세 사유" is-first-col required />
          <CommonTableContentCell>
            <TextareaMaxLength
              class="w-full wf_i-h-120"
              v-model="query.message"
              placeholder="상세 사유 입력"
              size="small"
              :max-length="200"
              :label-bottom-right="labelRightComputed"
            />
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

      <div class="wf-mt-20">
        <WelfareMdButton class="wf_w-120 wf-mx-auto" label="등록" button-type="liner" :disabled="statusSaveButton" @on-click="onSave" />
      </div>

      <hr class="wf-my-20 wf_break-line-gray" />
      <BaseDataTablePagination
        class="p-datatable-modal"
        :value="items"
        :loading="isLoading"
        :totalRecords="totalItems"
        is-select-invisible
        v-on:page-change="onPageChange"
        ref="tableRef"
        noDataLabel="리스트가 없습니다."
      >
        <template #title>
          <p class="wf-body_01-semi wf_text-n-33">블랙회원 등록 이력</p>
        </template>
        <template #columns>
          <Column field="id" header="No." class="wf_col-56" />
          <Column header="내용" class="wf_col-250">
            <template #body="slotProps">
              <p class="wf_w-full line-clamp wf-pointer wf_text-sub-02 wf-whitespace-prewrap wf-word-break">
                {{ slotProps.data.content }}
              </p>
            </template>
          </Column>
          <Column field="status" header="상태" class="wf_col-100" />
          <Column header="등록자" class="wf_col-160">
            <template #body="slotProps">
              <p class="wf_w-full line-clamp wf-pointer wf_text-n-33">
                {{ `${slotProps.data.registerName}(${slotProps.data.registerId})` }}
              </p>
            </template>
          </Column>
          <Column field="registrationDate" header="등록일시" />
        </template>
      </BaseDataTablePagination>
    </div>
  </div>
</template>
