import { useModal } from '@/composables/common'
import { ProductRegisterImageCoverModal } from '@/views/products'

export interface OnShowModalArgModel {
  name: string
  events?: any
}

export const useProductModalChangeImage = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = ({ name, events = {} }: OnShowModalArgModel) => {
    showModal?.({
      component: ProductRegisterImageCoverModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        name
      },
      events
    })
  }

  return { onShowModal, closeModalByPop }
}
