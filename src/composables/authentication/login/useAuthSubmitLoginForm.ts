/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ACCESS_TOKEN,
  ALL_MAIN_MESSAGES,
  AUTH_CHANGE_PASSWORD_ROUTER,
  HOMEPAGE_ROUTER,
  ID_OR_PASSWORD_NOT_MATCH,
  ID_REQUIRED,
  PASSWORD_LOGIN_REQUIRED,
  REFRESH_TOKEN,
  currentAccountId,
  getMessageByType,
  isEmpty
} from '@/common'
import { useLoading, useStorage } from '@/composables/common'
import { useModalNotification } from '@/composables/widgets'
import { ErrorType, LoginDataModelResponse } from '@/models'
import { AxiosOAuth2Service, authApi } from '@/services'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { object } from 'yup'

interface LoginDataModel {
  memberId: string
  password: string
}

export const useAuthSubmitLoginForm = () => {
  const { openModal, closeAllModal } = useModalNotification()

  const router = useRouter()
  const { setLoading } = useLoading()
  const isShowPassword = ref(false)
  const saveId = ref(false)
  const myForm = {
    memberId: isEmpty,
    password: isEmpty
  }
  const inputError = ref(getMessageByType(ErrorType.ALL_MAIN_MESSAGES, ID_REQUIRED))
  const [accountId, setAccountId] = useStorage<string>(currentAccountId)
  const [_accessToken, setAccessToken] = useStorage<string>(ACCESS_TOKEN)
  const [_refreshToken, setRefreshToken] = useStorage<string>(REFRESH_TOKEN)
  const onSaveAccountId = (id: string) => {
    setAccountId(id)
  }

  const handleOpenModal = (message: string = '') => {
    inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, message)
    openModal?.({ content: inputError.value, ...(isConfirmNavigate.value ? { onClick: goToChangePassword } : {}) })
  }

  const handleShowError = (values: LoginDataModel) => {
    const { memberId, password } = values
    if (!memberId) return handleOpenModal(ID_REQUIRED)
    if (!password) return handleOpenModal(PASSWORD_LOGIN_REQUIRED)
    onSubmit()
  }

  const goToChangePassword = () => {
    closeAllModal?.()
    router.push(AUTH_CHANGE_PASSWORD_ROUTER)
  }

  const isConfirmNavigate = computed(() => {
    return [ALL_MAIN_MESSAGES.TEMP_PASSWORD, ALL_MAIN_MESSAGES.PASSWORD_CHANGE_CYCLE].includes(inputError.value)
  })

  const { values, handleSubmit } = useForm({
    initialValues: {
      memberId: accountId?.value || '',
      password: ''
    },
    validationSchema: object(myForm)
  })

  const checkValidation = () => {
    if (saveId.value) {
      onSaveAccountId(values.memberId)
    }
    handleShowError(values)
  }

  const onSubmit = handleSubmit(async (values, { resetForm }) => {
    try {
      setLoading?.(true)
      const response = await authApi.login({
        ...values,
        autoLogin: true
      })
      const { data } = response
      saveAuthInfo(data)
      resetForm()
      router.push(HOMEPAGE_ROUTER)
    } catch (error: any) {
      if (error.status === 401) {
        handleOpenModal(ID_OR_PASSWORD_NOT_MATCH)
      }
    } finally {
      setLoading?.(false)
    }
  })

  const saveAuthInfo = (data: LoginDataModelResponse) => {
    const { accessToken, refreshToken } = data
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    AxiosOAuth2Service.attachHeaderToken({
      accessToken: accessToken
    })
  }

  return { inputError, values, onSubmit, checkValidation, isShowPassword, saveId }
}
