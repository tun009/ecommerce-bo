import { useModal } from '@/composables/common'
import { ProductReasonRejectApprovalModal } from '@/views/products'
import { ref } from 'vue'

export const useProductReasonApproval = () => {
  const { showModal, closeModalByPop } = useModal()
  const valueRef = ref()

  const onShowModal = () => {
    showModal?.({
      component: ProductReasonRejectApprovalModal,
      events: {
        onClose: () => {
          closeModalByPop?.()
        },
        onSave: (value: string) => {
          valueRef.value = value
          closeModalByPop?.()
        }
      }
    })
  }

  return { value: valueRef, onShowModal, closeModalByPop }
}
