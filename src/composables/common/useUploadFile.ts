import { useLoading, useModalNotification } from '@/composables'
import {
  _5MB,
  TYPE_IMAGE_FILE,
  ERROR_TYPE,
  isValidImage,
  _250MB,
  TYPE_VIDEO_FILE,
  isValidVideo,
  isValidDocument,
  _10MB,
  TYPE_DOCUMENT_FILE
} from '@/common'
import { ProductImageType } from '@/models'
export const useUploadFile = () => {
  const { setLoading } = useLoading()
  const { openModal, closeModalByPop } = useModalNotification()
  const handleFileChange = (type: any, callback: any) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = type === 'image' ? TYPE_IMAGE_FILE : type === 'video' ? TYPE_VIDEO_FILE : TYPE_DOCUMENT_FILE
    input.addEventListener('change', () => {
      const file = input.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        setLoading?.(true)
        reader.onload = function () {
          if (reader.DONE) {
            setLoading?.(false)
          }
          callback({ file, url: reader.result })
          input.remove()
        }
      }
    })
    input.click()
  }

  const handleValidFile = (file: any, type: string, checkTypeImage: ProductImageType, callback: any) => {
    if (!file) return false
    if (type === 'image') {
      const image = new Image()
      image.src = URL.createObjectURL(file)

      image.onload = (e: any) => {
        const imageWidth = e.target.width
        const imageHeight = e.target.height
        if (isValidImage(file.type)) {
          openModal?.({
            content: '지원하지 않는 파일형식입니다.이미지(jpg, gif, png) 파일만 등록 할 수 있습니다.'
          })
          callback(ERROR_TYPE)
          return
        }

        if (checkTypeImage === 'square' && imageWidth !== imageHeight) {
          openModal?.({
            content: '이미지는 0000x0000px로 등록 해주세요.'
          })
          callback(ERROR_TYPE)
          return
        }
        if (checkTypeImage === 'pcBanner' && imageWidth !== 1200) {
          openModal?.({
            content: '이미지는 1200x0000px로 등록 해주세요.'
          })
          callback(ERROR_TYPE)
          return
        }

        if (file.size > _5MB) {
          openModal?.({
            content: '이미지는 5MB 이하만 등록 가능합니다.'
          })
          callback(ERROR_TYPE)
          return
        }
        openModal?.({
          content: '이미지가 등록 되었습니다.',
          onAccept: () => {
            closeModalByPop?.()
            callback({ file, url: URL.createObjectURL(file) })
          }
        })
      }
      image.onerror = () => {
        openModal?.({
          content: '지원하지 않는 파일형식입니다.이미지(jpg, gif, png) 파일만 등록 할 수 있습니다.'
        })
        callback(ERROR_TYPE)
        return
      }
    }

    if (type === 'video') {
      if (isValidVideo(file.type)) {
        openModal?.({
          content: '지원하지 않는 파일 형식입니다. MP4 파일만 등록 할 수 있습니다.'
        })
        callback(ERROR_TYPE)
        return
      }
      if (file.size > _250MB) {
        openModal?.({
          content: '동영상은 250MB 이하만 등록 가능합니다.'
        })
        callback(ERROR_TYPE)
        return
      }
      openModal?.({
        content: '동영상이 등록 되었습니다.',
        onAccept: () => {
          closeModalByPop?.()
          callback({ file, url: URL.createObjectURL(file) })
        }
      })
    }

    if (type === 'document') {
      if (isValidDocument(file.type)) {
        openModal?.({
          content: '지원하지 않는 파일 형식입니다.이미지(jpg, pdf, png) 파일만 등록 할 수 있습니다.'
        })
        callback(ERROR_TYPE)
        return
      }
      if (file.size > _10MB) {
        openModal?.({
          content: '동영상은 10MB 이하만 등록 가능합니다.'
        })
        callback(ERROR_TYPE)
        return
      }
      callback({ file, url: URL.createObjectURL(file) })
    }
  }

  return {
    handleFileChange,
    handleValidFile
  }
}
