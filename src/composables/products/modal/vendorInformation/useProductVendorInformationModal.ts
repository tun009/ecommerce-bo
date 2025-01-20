import { useModal } from '@/composables/common'
import { ProductVendorInformationModel } from '@/models'
import { ProductVendorInformationModal } from '@/views/products'

export const useProductVendorInformationModal = () => {
  const { showModal, closeModalByPop } = useModal()
  const onShowModal = (data?: ProductVendorInformationModel) => {
    showModal?.({
      component: ProductVendorInformationModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        data
      }
    })
  }

  return { onShowModal, closeModalByPop }
}
