import {
  CONFIRM_PASSWORD_REQUIRED,
  CURRENT_PASSWORD_NOT_MATCH,
  NEW_PASSWORD_REQUIRED,
  PASSWORD_REQUIRED,
  getMessageByType,
  isConfirmPasswordValid,
  isNewPasswordValid,
  isPasswordValid
} from '@/common'
import { AUTH_USER_INFORMATION_ROUTER, HOMEPAGE_ROUTER } from '@/common/router'
import { WelfareModalOneButton } from '@/components'
import { useLoading, useModal } from '@/composables/common'
import { ErrorType } from '@/models'
import { API_RESPONSE_CODE, API_RESPONSE_STATUS, authApi } from '@/services'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { object } from 'yup'

const DEFAULT_VISIBLE_VALUE = {
  password: false,
  newPassword: false,
  confirmNewPassword: false
}

export const useAuthChangePassword = () => {
  const cancelMessage = '새로운 비밀번호로 변경해 주셔야 관리자 시스템을 이용할 수 있습니다.'

  const confirmMessage = '비밀번호가 변경되었습니다.'

  const inputError = ref('')

  const { closeModalByPop, showModal } = useModal()

  const router = useRouter()

  const { setLoading } = useLoading()

  const resetPasswordSchema = {
    password: isPasswordValid,
    newPassword: isNewPasswordValid,
    confirmNewPassword: isConfirmPasswordValid
  }

  const { errors, values, handleSubmit, meta, setFieldError } = useForm({
    /* initialErrors will trigger the watch function*/
    initialErrors: {
      password: PASSWORD_REQUIRED,
      newPassword: NEW_PASSWORD_REQUIRED,
      confirmNewPassword: CONFIRM_PASSWORD_REQUIRED
    },
    validationSchema: object().shape(resetPasswordSchema)
  })

  const redirectFrom = computed(() => router.options.history.state.back || '/')

  const visibility = ref({ ...DEFAULT_VISIBLE_VALUE })

  const handleChangeVisibility = (field: keyof typeof visibility.value) => {
    visibility.value[field] = !visibility.value[field]
  }

  const resetVisibility = () => {
    visibility.value = DEFAULT_VISIBLE_VALUE
  }

  watch([errors, values], ([errors, values]) => {
    if (meta.value.dirty) {
      if (errors.password) {
        inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, errors.password)
      } else if (errors.newPassword) {
        inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, errors.newPassword)
      } else if (errors.confirmNewPassword) {
        if (values.confirmNewPassword?.length === 0) {
          inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, CONFIRM_PASSWORD_REQUIRED)
        } else {
          inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, errors.confirmNewPassword)
        }
      } else {
        inputError.value = ''
      }
    }
  })

  const isInputInvalid = computed(() => (field: keyof typeof resetPasswordSchema): boolean => {
    if (field === 'password') {
      const isValid =
        !errors.value.password || !meta.value.dirty || (!values.password && !values.newPassword && !values.confirmNewPassword && meta.value.dirty)
          ? false
          : true
      return isValid
    }

    if (field === 'newPassword') {
      const isValid =
        (!errors.value.newPassword || errors.value.password || !meta.value.dirty) &&
        (!errors.value.confirmNewPassword || !values.confirmNewPassword || errors.value.password)
          ? false
          : true
      return isValid
    }

    if (field === 'confirmNewPassword') {
      const isValid =
        ((!errors.value.confirmNewPassword || errors.value.newPassword || !meta.value.dirty || (errors.value.password && errors.value.password)) &&
          (!errors.value.newPassword || !values.newPassword || (errors.value.password && errors.value.password))) ||
        (!values.confirmNewPassword && errors.value.newPassword)
          ? false
          : true
      return isValid
    }

    return false
  })

  const handleConfirm = () => {
    closeModalByPop?.()
    // can not get the route history yet, waiting for apis
    redirectFrom.value === AUTH_USER_INFORMATION_ROUTER ? router.push(redirectFrom.value) : router.push(AUTH_USER_INFORMATION_ROUTER)
    // typeof redirectFrom === 'string' && redirectFrom === AUTH_USER_INFORMATION_ROUTER ? router.push(AUTH_USER_INFORMATION_ROUTER) : router.push(AUTH_LOGIN_ROUTER)
  }
  const handleCancel = () => {
    closeModalByPop?.()
    // can not get the route history yet, waiting for apis
    typeof redirectFrom.value === 'string' ? router.push(AUTH_USER_INFORMATION_ROUTER) : router.push(HOMEPAGE_ROUTER)
    // typeof redirectFrom === 'string' && redirectFrom === AUTH_USER_INFORMATION_ROUTER && router.push(AUTH_USER_INFORMATION_ROUTER)
  }

  const toggleDialogCancel = () => {
    showModal?.({
      component: WelfareModalOneButton,
      props: { title: cancelMessage, onConfirm: handleCancel }
    })
  }

  const handleSubmitResetPassword = handleSubmit(async (values) => {
    resetVisibility()
    try {
      setLoading?.(true)
      await authApi.changePassword({
        currentPassword: values.password,
        newPassword: values.newPassword
      })
      setLoading?.(false)
      toggleDialogConfirm()
    } catch (error: any) {
      setLoading?.(false)
      if (error.status === API_RESPONSE_STATUS.BAD_REQUEST) {
        const { code } = error.data
        if (code === API_RESPONSE_CODE.CURRENT_PASSWORD_NOT_MATCH) {
          setFieldError('password', CURRENT_PASSWORD_NOT_MATCH)
        }
      }
    }
  })

  const toggleDialogConfirm = () => {
    showModal?.({ component: WelfareModalOneButton, props: { title: confirmMessage, onConfirm: handleConfirm } })
  }

  return {
    errors,
    isInputInvalid,
    toggleDialogCancel,
    handleChangeVisibility,
    handleSubmitResetPassword,
    inputError,
    visibility
  }
}
