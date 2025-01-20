<!-- BO_A0102_010101 -->
<script setup>
import { AuthenticationBaseWrapper, AuthenticationBoxWrapper } from '@/components'
import { useRouter } from 'vue-router'
import { AUTHENTICATION_FAIL, NAVIGATION_AFTER_AUTHENTICATION_FAIL_TIME } from '@/common'

const router = useRouter()

setTimeout(() => {
  router.push(AUTHENTICATION_FAIL)
}, NAVIGATION_AFTER_AUTHENTICATION_FAIL_TIME)
</script>

<template>
  <AuthenticationBaseWrapper :title='`Back Office 입니다.`' :sub-title='`메가존 플레이`' has-contact>
    <template #content>
      <AuthenticationBoxWrapper borderColor='primary' type='primary' class='wf-gap-12'>
        <template #title>
          <div class='wf-login-box-wrapper'>ID로 등록된 이메일 주소로<br />인증키가 발송되었습니다.</div>
        </template>
        <template #content>
          <span class='wf-content-custom'>이메일을 확인하여 인증을 완료해 주세요.<br />보내 드린 인증키는 5분간 유효합니다.</span>
        </template>
      </AuthenticationBoxWrapper>
    </template>
  </AuthenticationBaseWrapper>
</template>

<style scoped>
@import url('@/assets/css/view/authentication/auth-inform-completed.css');
</style>
