<!-- BO_B0203_010201_P -->
<script setup lang='ts'>
import { BaseDataTablePagination, WelfareMdButton } from '@/components/uikit'
import { FormGroup, HeaderModal } from '@/components/widgets'
import { useMemberWelfarePointUsageDetail } from '@/composables/members'
import { memberPointUsageDetailsHeaderTableConfig } from '@/models'
import Column from 'primevue/column'
import { DEFAULT_TABLE_SELECT_OPTIONS_TWO } from '@/common'

const props = defineProps(['onClose'])

const { items, isLoading, onPageChange, totalItems, refTable, onDownLoad } = useMemberWelfarePointUsageDetail()
</script>
<template>
  <div class='member-container-modal'>
    <HeaderModal title='복지포인트 이용상세' @close-modal='props.onClose' />
    <div class='member-container-modal-content wf_flex wf_flex-col wf-space-y-20'>
      <div class='wf-btn-border--bg-color-line-gray wf_br-6'>
        <div class='wf_flex wf_items-center'>
          <FormGroup class='wf_flex-1 wf-administrator-notes' isRoundedTop isRoundedBottom label='고객사'
                     custom-class='wf-body_03-reg wf-mt--3 wf_text-n-33'>
            메가존
          </FormGroup>
          <FormGroup class='wf_flex-1 wf-administrator-notes' isBorderLeft label='고객사 코드'
                     custom-class='wf-body_03-reg  wf-mt--3 wf_text-n-33'>
            0000
          </FormGroup>
          <FormGroup class='wf_flex-1 wf-administrator-notes' isBorderLeft label='회원명'
                     custom-class='wf-body_03-reg  wf-mt--3 wf_text-n-33'> 홍길동
          </FormGroup>
        </div>
        <div class='wf_flex wf_items-center'>
          <FormGroup class='wf_flex-1 wf-administrator-notes' label='회원 코드'
                     custom-class='wf-body_03-reg  wf-mt--3 wf_text-n-33'> 0000
          </FormGroup>
          <FormGroup class='wf_flex-1 wf-administrator-notes' isBorderLeft label='회원 등록일'
                     custom-class='wf-body_03-reg wf_text-n-33 wf-mt--3'>
            YYYY.MM.DD HH:MM:SS
          </FormGroup>
          <FormGroup class='wf_flex-1 wf-administrator-notes' isBorderLeft label='재직 상태'
                     custom-class='wf-body_03-reg wf_text-n-33 wf-mt--3'>
            재직
          </FormGroup>
        </div>
        <div class='wf_flex wf_items-center'>
          <FormGroup class='wf_flex-1 wf-administrator-notes' label='보유 포인트' custom-class='wf-body_03-reg wf_text-n-33'>
            N,NNN
          </FormGroup>
          <FormGroup class='wf_flex-1 wf-administrator-notes' isBorderLeft label='사용 포인트'
                     custom-class='wf-body_03-reg wf-mt--3 wf_text-n-33'> N,NNN
          </FormGroup>
          <FormGroup class='wf_flex-1 wf-administrator-notes' isBorderLeft label='차감 포인트'
                     custom-class='wf-body_03-reg wf-mt--3 wf_text-n-33'> N,NNN
          </FormGroup>
        </div>
        <div class='wf_flex wf_items-center'>
          <FormGroup
            class='wf_flex-1 wf-administrator-notes wf-h-42'
            isRoundedBottom
            :isBorderBottom='false'
            label='총 누적 포인트'
            custom-class='wf-body_03-reg wf-mt--3 wf_text-n-33'
          >
            N,NNN
          </FormGroup>
          <FormGroup
            class='wf_flex-2 wf-administrator-notes wf-h-42'
            isBorderLeft
            :isBorderBottom='false'
            label='최근 업데이트 일시'
            custom-class='wf-body_03-reg wf-mt--3 wf_text-n-33'
          >
            YYYY.MM.DD HH:MM:SS
          </FormGroup>
        </div>
      </div>
      <BaseDataTablePagination
        ref='refTable'
        :value='items'
        :loading='isLoading'
        :total-records='totalItems'
        noDataLabel='복지포인트 리스트가 없습니다.'
        @page-change='onPageChange'
        select-class='wf-page-item'
        :select-props='{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS_TWO }'
      >
        <template #title>
          <h6 class='wf_table_title wf-mt-1 wf_text-n-33'>복지포인트 상세 내역</h6>
        </template>
        <template #buttons>
          <div class='wf-space-x-6 wf_flex'>
            <WelfareMdButton label='엑셀 다운로드' class='wf_w-91 dl-excel' buttonType='liner' button-size='small'
                             @click='onDownLoad' />
          </div>
        </template>
        <template #columns>
          <Column
            v-for='(item, index) in memberPointUsageDetailsHeaderTableConfig'
            :key='index'
            :field='item.field'
            :header='item.header'
            :class='item.class'
          >
            <template #body='slotProps'>
              <span>{{ slotProps.data[item.field] }}</span>
            </template>
          </Column>
        </template>
      </BaseDataTablePagination>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'MemberPointUsageDetail'
}
</script>

<style scoped>
@import url('@/assets/css/view/member/member-base-table-popup.css');
</style>