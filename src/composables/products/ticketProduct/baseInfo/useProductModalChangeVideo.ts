import { useModal } from '@/composables/common'
import { ProductRegisterVideoModal } from '@/views/products'

interface OnShowModalArgModel {
  name: string
  events?: any
}

export const useProductModalChangeVideo = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModalVideo = ({ name, events = {} }: OnShowModalArgModel) => {
    showModal?.({
      component: ProductRegisterVideoModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        name
      },
      events
    })
  }

  return { onShowModalVideo, closeModalByPop }
}
