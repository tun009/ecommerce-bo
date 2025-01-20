import { contentHandleFileMoreInfo } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductTicketFileType } from '@/models'

export const useProductDeleteFileModal = (callback: () => void) => {
  const { openModal: openModalNotification, closeModalByPop: closeModalByPopNotification } = useModalNotification()
  const { openModal, closeModalByPop } = useModalConfirm()

  const handleAccept = () => {
    closeModalByPopNotification?.()
    callback()
  }

  const handleConfirmDelete = (type: ProductTicketFileType) => {
    closeModalByPop?.()
    openModalNotification?.({
      content: type === 'img' ? contentHandleFileMoreInfo.notificationImage : contentHandleFileMoreInfo.notificationVideo,
      onAccept: handleAccept
    })
  }
  const onShowModalDelete = (type: ProductTicketFileType) => {
    openModal({
      content: type === 'img' ? contentHandleFileMoreInfo.deleteImage : contentHandleFileMoreInfo.deleteVideo,
      onConfirm: () => handleConfirmDelete(type)
    })
  }
  return { onShowModalDelete, handleConfirmDelete }
}
