<script setup lang="ts">
import { WelfareCloseIcon, WelfareInputText, WelfareMdButton } from '@/components/uikit'
import { useFormSearchAddress } from '@/composables'
import { FormAddressEmits, FormAddressProps } from '@/models'

const props = defineProps<FormAddressProps>()
const emits = defineEmits<FormAddressEmits>()

const {
  closeDaumPostcode,
  // detailAddressRef,
  wfDaumLayer,
  postcode,
  address,
  detailAddress,
  extraAddress,
  handleClickOutside,
  isDisplayIframe,
  handleExecDaumPostcode,
  // updateDetailAddress
} = useFormSearchAddress(props, emits)

const handleReset = () => {
  postcode.value = ''
  address.value = ''
  detailAddress.value = ''
  extraAddress.value = ''
}

defineExpose({
  handleReset
})
</script>

<template>
  <div class="wf-width-full wf-space-y-6">
    <div class="overlay" v-show="isDisplayIframe" @click="handleClickOutside">
      <div ref="wfDaumLayer" class="wf-search-address-modal">
        <div class="wf_flex wf_flex-row wf_items-center wf_search-address-header">
          <p>우편번호/주소 찾기</p>
          <WelfareCloseIcon @click="closeDaumPostcode" alt="닫기 버튼" class="wf_search-address-close" />
        </div>
      </div>
    </div>
    <div class="wf_flex wf-mb-9 " style="margin-top: 0px">
      <WelfareInputText :model-value="postcode" class="wf_w-180" size="small" @click="handleExecDaumPostcode" :disabled="true" />
      <WelfareMdButton @click="handleExecDaumPostcode" label="우편번호 찾기" class="wf_w-90 wf-ml-3" buttonSize="small" buttonType="liner" />
    </div>
    <WelfareInputText :model-value="extraAddress" :disabled="true" class="wf-width-full" size="small" />
    <div class="wf_flex wf-mb-9">
      <WelfareMdButton :disabled="true" label="지번 주소" class="wf_w-55_important wf_h-18 wf_b-f-s"  buttonType="liner" />
      <span class="wf-pl-8"> {{ detailAddress }}</span>
    </div>
    <WelfareInputText :model-value="address" class="wf-width-full wf-space-y-9"  size="small" />
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/form/welfare-form-address.css');
</style>
