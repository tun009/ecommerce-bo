import { useModal } from '@/composables'
import { OrderCancellationFeeChangeModal } from '@/views'
import { OrderCancellationFeeChangeProps } from '@/models'

export const useOrderCancellationFeeChangeModal = () => {
  const modalTable = useModal()

  const onShowModal = (params: OrderCancellationFeeChangeProps) => {
    modalTable.showModal?.({
      component: OrderCancellationFeeChangeModal,
      props: {
        cancellationFee: params.finalPaymentAmount,
        finalPaymentAmount: params.finalPaymentAmount,
        onCancel: modalTable?.closeModalByPop,
        onCheck: params.onCheck
      }
    })
  }

  return { onShowModal }
}
