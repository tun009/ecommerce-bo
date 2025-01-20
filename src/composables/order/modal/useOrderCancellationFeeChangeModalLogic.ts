import { useModalConfirm, useModalNotification } from '@/composables'
import { ref } from 'vue'
import { OrderCancellationFeeChangeProps } from '@/models'

export const useOrderCancellationFeeChangeModalLogic = (props: OrderCancellationFeeChangeProps) => {
  const notificationModal = useModalNotification()
  const confirmModal = useModalConfirm()
  const changedFee = ref<number>()

  const handlerChangeFee = () => {
    if (!changedFee.value) {
      return emptyFeeNotify()
    } else if (changedFee.value > props.finalPaymentAmount) {
      return tooHighFeeNotify()
    }

    confirmModal.openModal({
      content: '취소수수료를 변경하시겠습니까?',
      onConfirm() {
        notificationModal.openModal({
          content: '취소수수료변경이 완료되었습니다.',
          onAccept() {
            props?.onCheck(changedFee.value ?? props.cancellationFee)
            confirmModal?.closeAllModal?.()
          }
        })
      }
    })
  }

  const emptyFeeNotify = () => {
    notificationModal.openModal({
      content: '변경 취소수수료를 입력해 주세요.'
    })
  }

  const tooHighFeeNotify = () => {
    notificationModal.openModal({
      content: '취소수수료는 최종결제금액보다 클 수 없습니다.\n' + '다시 확인해 주세요.\n'
    })
  }

  return {
    changedFee,
    handlerChangeFee
  }
}
