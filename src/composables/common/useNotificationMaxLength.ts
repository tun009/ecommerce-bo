import { TEXT_MAX_NUMBER_30 } from '@/common'
import { useModalNotification } from '../widgets'
import { ref } from 'vue'

interface NotificationMaxLengthParams {
  emit: (value: any) => void
  length?: number
  message?: string
}

export function useNotificationMaxLength({ emit, length = TEXT_MAX_NUMBER_30, message }: NotificationMaxLengthParams) {
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()

  const isReadOnly = ref(false)

  const handelChange = (value: string) => {
    if (value.length > length) {
      openModalNotification?.({
        content: message ? message : `한글 기준 ${length}자 이내로 입력 해주세요.`,
        onAccept: () => {
          closeModalByPop?.()
          isReadOnly.value = false
        }
      })
      isReadOnly.value = true
    }
    emit(value.slice(0, length))
  }

  return {
    isReadOnly,
    handelChange
  }
}
