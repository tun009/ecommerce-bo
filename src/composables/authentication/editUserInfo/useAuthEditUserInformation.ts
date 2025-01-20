import { ref } from 'vue'
import { useAuthUserInformation, useModalNotification } from '@/composables'
import { isValidPhoneNumberWithCharacter } from '@/common'
export const useAuthEditUserInformation = () => {
  const { userInfo } = useAuthUserInformation()
  const { openModal } = useModalNotification()
  // const inputValuePhone = ref('')
  // const inputValueEmail = ref('')
  const duplicatePhone = ref('010-12334-1242')
  const duplicateEmail = ref('hjmoon@mz.co.kr')
  const isSubmitPhone = ref<boolean>(false)
  const isSubmitEmail = ref<boolean>(false)

  const handleSubmitValue = () => {
    if (userInfo.value.phone === '' || userInfo.value.email === '') {
      openModal?.({
        content: '필수 입력 정보를 입력하셔야 합니다.'
      })
    } else {
      resetFormFields()
      openModal?.({
        content: '관리자 정보가 수정되었습니다.'
      })
    }
  }
  const handleSubmitPhone = () => {
    if (userInfo.value.phone === duplicatePhone.value) {
      openModal?.({
        content: '이미 사용중인 번호입니다.'
      })
    } else if (!isValidPhoneNumberWithCharacter(userInfo.value.phone)) {
      openModal?.({
        content: "숫자와 '-' 만 입력해주세요."
      })
    } else {
      openModal?.({
        content: '중복 확인이 완료되었습니다.'
      })
      isSubmitPhone.value = true
    }
  }
  const handleSubmitEmail = () => {
    if (userInfo.value.email === duplicateEmail.value) {
      openModal?.({
        content: '이미 사용중인 이메일 주소입니다.'
      })
    } else {
      openModal?.({
        content: '중복 확인이 완료되었습니다.'
      })
      isSubmitEmail.value = true
    }
  }
  const resetFormFields = () => {
    userInfo.value.phone = ''
    userInfo.value.email = ''
  }

  return {
    userInfo,
    // inputValuePhone,
    // inputValueEmail,
    isSubmitPhone,
    isSubmitEmail,
    duplicatePhone,
    duplicateEmail,
    handleSubmitValue,
    handleSubmitPhone,
    handleSubmitEmail
  }
}
