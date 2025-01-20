import { computed, ref } from 'vue'
import { ProductTab, ProductSearchRecordModel, WelfareSelectOptionType } from '@/models'
import { useForm } from 'vee-validate'
import { useModal, useModalConfirm, useModalNotification, useProductReasonApproval, useStorage } from '@/composables'
import { useProductRedirectLink } from '@/composables/products'
import {
  deepEqualObject,
  PRODUCT_DELIVERY_EXHIBITION_STORAGE_KEY,
  PRODUCT_DELIVERY_EXHIBITION_STORAGE_TEMPORARY_KEY,
  PRODUCT_TICKET_EXHIBITION_STORAGE_KEY,
  PRODUCT_TICKET_EXHIBITION_STORAGE_TEMPORARY_KEY,
  productApprovalStatus,
  productBaseInfoType
} from '@/common'
import { ProductReasonRejectApprovalModal } from '@/views/products'
import { ModalNotification } from '@/components/widgets'
import { useRoute, useRouter } from 'vue-router'

const optionsStatus = [
  { label: '전시', value: true },
  { label: '비전시', value: false }
]

interface ProductExhibitionInfoForm {
  productStatus: string
  exhibitionStatus: boolean
  devices: string[]
  startTime: string
  endTime: string
  selectFirst?: WelfareSelectOptionType | undefined
  selectSecond?: WelfareSelectOptionType | undefined
  selectThird?: WelfareSelectOptionType | undefined
  exhibitionCategories: string[]
  radioGroupCategories: number
  md: string
}

const emptyForm: ProductExhibitionInfoForm = {
  productStatus: '',
  exhibitionStatus: true,
  devices: [],
  startTime: '',
  endTime: '',
  exhibitionCategories: [
    '식품 > 건강식품 > 영양제',
    '1차 표준 카테고리 > 2차 표준 카테고리 > 3차 표준 카테고리',
    '1차 분류 > 2차 분류 >  3차 분류',
    '1차 표준 카테고리 > 2차 표준 카테고리 > 3차 표준 카테고리',
    '1차 표준 카테고리 > 2차 표준 카테고리 > 3차 표준 카테고리'
  ],
  radioGroupCategories: -1,
  md: ''
}

const approvalPreviewDate: ProductExhibitionInfoForm = {
  productStatus: productApprovalStatus.approvalCompleted,
  exhibitionStatus: true,
  devices: ['pc', 'mobile'],
  startTime: '2023.11.08',
  endTime: '2023.11.09',
  exhibitionCategories: [
    '식품 > 건강식품 > 영양제',
    '1차 표준 카테고리 > 2차 표준 카테고리 > 3차 표준 카테고리',
    '1차 분류 > 2차 분류 >  3차 분류',
    '1차 표준 카테고리 > 2차 표준 카테고리 > 3차 표준 카테고리',
    '1차 표준 카테고리 > 2차 표준 카테고리 > 3차 표준 카테고리'
  ],
  radioGroupCategories: 2,
  md: '새로 123 (M00891)'
}

const approvalAwaiting: ProductExhibitionInfoForm = {
  ...approvalPreviewDate,
  productStatus: productApprovalStatus.awaitingApproval
}
export const useProductExhibitionInfo = (type: string) => {
  const refExhibition = ref()
  const router = useRouter()
  const { onShowModal } = useProductReasonApproval()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop: closeModalNotification } = useModalNotification()
  const { replaceModal, closeModalByPop: closeModalShowReason } = useModal()
  const { redirectSavedLink, redirectCancelLink } = useProductRedirectLink(type, ProductTab.SALES)

  const [savedValues, setSavedValues] = useStorage<ProductExhibitionInfoForm>(
    type == productBaseInfoType.delivery ? PRODUCT_DELIVERY_EXHIBITION_STORAGE_KEY : PRODUCT_TICKET_EXHIBITION_STORAGE_KEY
  )
  const [savedTemporaryValues, setSavedTemporaryValues] = useStorage<ProductExhibitionInfoForm>(
    type == productBaseInfoType.delivery ? PRODUCT_DELIVERY_EXHIBITION_STORAGE_TEMPORARY_KEY : PRODUCT_TICKET_EXHIBITION_STORAGE_TEMPORARY_KEY
  )
  const route = useRoute()
  const productApprovalStatusByRoute = computed(() => {
    if ((route.query.status as string) == productApprovalStatus.approvalCompleted) {
      setSavedValues({ ...approvalPreviewDate })
      return productApprovalStatus.approvalCompleted
    }

    if (route.params.id) {
      setSavedValues({ ...approvalAwaiting })
      return productApprovalStatus.awaitingApproval
    }

    return ''
  })

  const { setFieldValue, values, setValues, resetForm } = useForm<ProductExhibitionInfoForm>({
    initialValues:
      productApprovalStatusByRoute.value == productApprovalStatus.approvalCompleted
        ? approvalPreviewDate
        : productApprovalStatusByRoute.value == productApprovalStatus.awaitingApproval
        ? approvalAwaiting
        : savedValues && savedValues.value
        ? savedValues.value
        : savedTemporaryValues && savedTemporaryValues.value
        ? savedTemporaryValues.value
        : emptyForm
  })

  const handleChangeValueField = (field: keyof ProductExhibitionInfoForm, value: any) => {
    setFieldValue(field, value)
  }

  const handleResetForm = () => {
    resetForm()
  }

  const handelAddCategory = () => {
    if (values.selectFirst && values.selectSecond && values.selectThird) {
      const category = `${values.selectFirst.label} > ${values.selectSecond.label} > ${values.selectThird.label}`
      setFieldValue('exhibitionCategories', [...values.exhibitionCategories, category])
      setFieldValue('selectFirst', undefined)
      setFieldValue('selectSecond', undefined)
      setFieldValue('selectThird', undefined)
    }
  }

  const handelDeleteCategory = (idx: number) => {
    const categories = [...values.exhibitionCategories]
    categories.splice(idx, 1)
    if (categories.length == 0 || idx == values.radioGroupCategories) {
      setFieldValue('radioGroupCategories', -1)
    } else {
      setFieldValue('radioGroupCategories', values.radioGroupCategories - 1)
    }
    setFieldValue('exhibitionCategories', categories)
  }

  const onChangeMDSearch = (value: ProductSearchRecordModel) => {
    setFieldValue('md', `${value.name} (${value.code})`)
  }

  /* Button bottom */
  const openConfirmCancel = () => {
    openModalConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        router.push(redirectCancelLink.value)
      }
    })
  }

  const openNotificationSaveTemporary = () => {
    openModalNotification({
      content: '입력한 정보가 저장되었습니다.'
    })
    setSavedTemporaryValues({ ...values })
  }

  const isProductExhibitionValid = () => {
    let isValid = true
    // validate
    if (values.devices.length === 0) isValid = false
    if (!values.startTime) isValid = false
    if (!values.endTime) isValid = false
    if (values.exhibitionCategories.length === 0) isValid = false
    if (values.radioGroupCategories == -1) isValid = false
    if (values.md.length == 0) isValid = false

    return isValid
  }

  const openNotificationSave = () => {
    if (productApprovalStatusByRoute.value == productApprovalStatus.approvalCompleted) {
      if (!deepEqualObject({ ...values }, { ...savedValues?.value })) {
        openModalNotification({
          content: '승인완료 후 수정할 수 없는 항목입니다. [수정불가항목]'
        })
        setValues({ ...approvalPreviewDate })
        refExhibition.value.handleResetDevices(approvalPreviewDate.devices)
      }
      return
    }

    if (values.productStatus == productApprovalStatus.awaitingApproval) {
      openModalNotification({
        content: '현재 승인 대기중인 상품이 존재합니다.'
      })
      setValues({ ...savedValues?.value })
      return
    }

    if (!isProductExhibitionValid()) {
      openModalNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span>표시는 필수입력항목입니다.</p>'
      })
    } else if (values.productStatus == productApprovalStatus.registration) {
      openModalNotification({
        content: '입력한 정보가 수정되었습니다.',
        onAccept: () => {
          router.push(redirectSavedLink.value)
        }
      })
      setSavedValues({ ...values })
    } else {
      openModalNotification({
        content: '전시정보 입력이 완료되었습니다.',
        onAccept: () => {
          router.push(redirectSavedLink.value)
        }
      })
      setFieldValue('productStatus', productApprovalStatus.registration)
      setSavedValues({ ...values })
    }
  }

  const openNotificationApproval = () => {
    let isValid = true
    if (!deepEqualObject({ ...values }, { ...savedValues?.value })) isValid = false

    if (!isValid) {
      openModalNotification({
        content: '입력한 정보를 저장 완료한 후 승인요청 해주세요.'
      })
    } else {
      if (values.productStatus == productApprovalStatus.registration) {
        openModalNotification({
          content: '입력한 정보가 수정되었습니다.'
        })
      }
      setFieldValue('productStatus', productApprovalStatus.awaitingApproval)
      setSavedValues({ ...values })
    }
  }

  const openConfirmApprovalReject = () => {
    openModalConfirm({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleShowPopupReason()
      }
    })
  }

  const openConfirmApproval = () => {
    if (!isProductExhibitionValid()) {
      openModalNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span>표시는 필수입력항목입니다.</p>'
      })
    } else {
      openModalConfirm({
        content: '선택한 상품을 승인 하시겠습니까?',
        onCancel() {
          closeModalConfirm?.()
        },
        onConfirm() {
          closeModalConfirm?.()
          openModalNotification?.({
            content: '선택한 상품이 승인완료 되었습니다.'
          })
        }
      })
    }
  }

  const handleShowPopupReason = () => {
    replaceModal?.({
      component: ProductReasonRejectApprovalModal,
      events: {
        onClose: closeModalShowReason,
        onSave: (value: string) => {
          if (!value.trim()) {
            openModalNotification({
              content: '반려 사유를 입력 해주세요.',
              buttonLabel: '확인'
            })
            return
          }
          replaceModal?.({
            component: ModalNotification,
            props: {
              content: '선택한 상품이 반려 되었습니다.',
              buttonLabel: '확인',
              onAccept: () => {
                closeModalNotification?.()
              }
            }
          })
        }
      }
    })
  }

  const handleApproval = () => {
    openModalConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      onCancel() {
        closeModalConfirm?.()
      },
      onConfirm() {
        closeModalConfirm?.()
        openModalNotification?.({
          content: '선택한 상품이 승인완료 되었습니다.'
        })
      }
    })
  }

  const handleReject = () => {
    openModalConfirm({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      onCancel() {
        closeModalConfirm?.()
      },
      onConfirm() {
        closeModalConfirm?.()
        onShowModal()
      }
    })
  }

  return {
    values,
    refExhibition,
    handleChangeValueField,
    handleResetForm,

    optionsStatus,
    handelAddCategory,
    handelDeleteCategory,
    onChangeMDSearch,

    // Button Bottom
    openConfirmCancel,
    openNotificationSaveTemporary,
    openNotificationSave,
    openNotificationApproval,
    openConfirmApproval,
    openConfirmApprovalReject,
    handleApproval,
    handleReject
  }
}
