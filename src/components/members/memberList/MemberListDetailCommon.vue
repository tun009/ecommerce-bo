<script setup lang="ts">
import { CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell, WelfareInputText, WelfareMdButton } from '@/components'
import { MemberDetailBaseModel } from '@/models'

interface MemberListDetailCommonProps {
  data?: MemberDetailBaseModel
  name?: string
}
interface MemberListDetailCommonEmits {
  (e: 'update:name', value: string): void
  (e: 'onCheck'): void
  (e: 'onRegister'): void
  (e: 'onClear'): void
}
defineProps<MemberListDetailCommonProps>()
defineEmits<MemberListDetailCommonEmits>()
</script>
<template>
  <CommonTable>
    <CommonTableRow height="43">
      <CommonTableTitleCell title="회원명 (회원코드)" isFirstCol />
      <CommonTableContentCell>
        <div class="wf_flex wf-space-x-4 wf-ml--1">
          <WelfareInputText :model-value="$props.name" @update:model-value="(value) => $emit('update:name', value)" class="wf_w-180" size="small" />
          <WelfareMdButton button-size="small" button-type="liner" label="조회" @on-click="$emit('onCheck')" />
        </div>
      </CommonTableContentCell>
      <CommonTableTitleCell title="아이디 (이메일)" />
      <CommonTableContentCell :text="$props?.data?.id" />
      <CommonTableTitleCell title="회원 등급" />
      <CommonTableContentCell :text="$props?.data?.membershipLevel" />
    </CommonTableRow>
    <CommonTableRow height="44">
      <CommonTableTitleCell title="휴대폰번호" isFirstCol />
      <CommonTableContentCell :text="$props?.data?.phoneNumber" />
      <CommonTableTitleCell title="성별" />
      <CommonTableContentCell :text="$props?.data?.gender" />
      <CommonTableTitleCell title="사번" />
      <CommonTableContentCell :text="$props?.data?.cleanup" />
    </CommonTableRow>
    <CommonTableRow height="44">
      <CommonTableTitleCell title="직급" isFirstCol />
      <CommonTableContentCell :text="$props?.data?.rank" />
      <CommonTableTitleCell title="재직상태" />
      <CommonTableContentCell :text="$props?.data?.employmentStatus" />
      <CommonTableTitleCell title="계정상태" />
      <CommonTableContentCell :text="$props?.data?.accountStatus" />
    </CommonTableRow>
    <CommonTableRow height="42" isLastRow>
      <CommonTableTitleCell title="고객사코드" isFirstCol />
      <CommonTableContentCell :text="$props?.data?.companyCode" />
      <CommonTableTitleCell title="고객사" />
      <CommonTableContentCell :text="$props?.data?.customer" />
      <CommonTableTitleCell title="블랙회원" />
      <CommonTableContentCell>
        <WelfareMdButton
          v-if="$props.data?.membershipLevel != 'BLACK'"
          button-size="small"
          button-type="liner"
          label="등록"
          @on-click="$emit('onRegister')"
        />
        <WelfareMdButton v-else button-size="small" button-type="liner" label="해제" @on-click="$emit('onClear')" />
      </CommonTableContentCell>
    </CommonTableRow>
  </CommonTable>
</template>
