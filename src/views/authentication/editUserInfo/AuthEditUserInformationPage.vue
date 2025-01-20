<!-- BO_A0203_020101 -->
<script setup lang="ts">
import { AuthenticationBaseWrapper, WelfareBigButton, WelfareMdButton, WelfareInputText } from '@/components'
import { AUTH_USER_INFORMATION_ROUTER, isValidEmail } from '@/common'
import { useAuthEditUserInformation } from '@/composables'
const { userInfo, isSubmitPhone, isSubmitEmail, handleSubmitValue, handleSubmitPhone, handleSubmitEmail } = useAuthEditUserInformation()
</script>
<template>
  <AuthenticationBaseWrapper class="" :title="`관리자 정보`" :sub-title="`개인정보 변경시 정보를 수정하여 관리해 주세요.`" reverse-title hasContact>
    <template #title>
      <div class="wf_flex wf_flex-col wf_text-n-33 wf-space-y-12">
        <h2>관리자 정보</h2>
        <div class="wf_flex wf_flex-col wf-space-y-6">
          <p class="wf-sub_tit_02">메가존플레이 관리자시스템에 등록된 관리자 정보입니다.</p>
          <p class="wf-sub_tit_02">개인정보 변경 발생시 정보를 수정하여 관리할 수 있습니다.</p>
        </div>
      </div>
    </template>
    <template #content>
      <div class="round-md">
        <div class="wf-h-44 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-top-left">
            아이디&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center">{{ userInfo.managerId }}</div>
        </div>
        <div class="wf-h-44 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray">
            이름&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center">{{ userInfo.managerName }}</div>
        </div>
        <div class="wf-h-44 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray">
            휴대폰번호&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center wf-space-x-6">
            <WelfareInputText class="w-143" v-model="userInfo.phone" size="small" inputType="text" placeholder="'-' 숫자입력" />
            <WelfareMdButton
              class="w-66"
              label="중복확인"
              buttonType="liner"
              :disabled="!userInfo.phone"
              @on-click="handleSubmitPhone"
              buttonSize="small"
            />
          </div>
        </div>
        <div class="wf-h-44 flex-box text-normal bd_b">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray">
            이메일&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center wf-space-x-6">
            <WelfareInputText class="w-143" v-model="userInfo.email" size="small" inputType="text" placeholder="이메일을 입력" />
            <WelfareMdButton
              class="w-66"
              label="중복확인"
              :disabled="!isValidEmail(userInfo.email)"
              @on-click="handleSubmitEmail"
              buttonType="liner"
              buttonSize="small"
            />
          </div>
        </div>
        <div class="wf-h-42 flex-box text-normal">
          <div class="wf-row-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-bottom-left">소속 부서</div>
          <div class="wf-row-second-label wf_flex wf_justify-flex-start wf_items-center">
            <WelfareInputText class="w-215" size="small" v-model="userInfo.deptInfo" inputType="text" placeholder="소속부서를 입력해주세요." />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div>
        <div class="wf_flex wf-space-x-6">
          <RouterLink :to="AUTH_USER_INFORMATION_ROUTER" class="w-191r link-underline">
            <WelfareBigButton label="취소" buttonType="neatral" class="w-191r" />
          </RouterLink>
          <WelfareBigButton
            @on-click="handleSubmitValue"
            :disabled="!isSubmitPhone || !isSubmitEmail"
            label="수정"
            buttonType="default"
            class="w-191r"
          />
        </div>
      </div>
    </template>
  </AuthenticationBaseWrapper>
</template>
