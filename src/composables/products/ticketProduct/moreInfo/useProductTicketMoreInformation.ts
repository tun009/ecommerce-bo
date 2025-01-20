import { useModalConfirm, useModalNotification, useProductReasonApproval, useStorage } from '@/composables'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { PRODUCT_TICKET_MORE_INFO_STORAGE_KEY, productApprovalStatus, strippedHtmlEditorRegex } from '@/common'
import { ProductTicketMoreInformationModel, productInitValueProductTicketMoreInformationModel } from '@/models/views/products'

export const useProductTicketMoreInformation = (pathCancelConfirm: string) => {
  const route = useRoute()
  const router = useRouter()
  const { value: reasonText, onShowModal } = useProductReasonApproval()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { openModal: openNotificationModal } = useModalNotification()
  const dynamicKeyProductMoreInformationStorage = computed(() => {
    return PRODUCT_TICKET_MORE_INFO_STORAGE_KEY + route.path
  })
  const [saveValue, setSaveValue] = useStorage<ProductTicketMoreInformationModel>(dynamicKeyProductMoreInformationStorage.value)
  const initialValue = computed(() => {
    return saveValue ? saveValue.value : productInitValueProductTicketMoreInformationModel
  })

  const { values, setFieldValue, resetForm } = useForm<ProductTicketMoreInformationModel>({
    initialValues: initialValue
  })

  const dataApprove = computed(() => {
    return { ...values }
  })

  const toggleApprove = ref(true)
  function handleCancel() {
    openConfirmModal?.({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(pathCancelConfirm)
        closeModalByPop?.()
        resetForm()
      },
      onCancel() {
        closeModalByPop?.()
      }
    })
  }

  function changeValueField(field: keyof ProductTicketMoreInformationModel, value: any) {
    setFieldValue(field, value)
  }

  const descriptionStripedHtml = computed(() => {
    if (!values?.description) return ''
    return values.description.replace(strippedHtmlEditorRegex, '')
  })

  const mobileDescriptionStripedHtml = computed(() => {
    if (!values?.mobileDescription) return ''
    return values?.mobileDescription?.replace(strippedHtmlEditorRegex, '')
  })

  function handleSave() {
    let isValid = true
    if (!descriptionStripedHtml.value && descriptionStripedHtml.value.length === 0) isValid = false
    if (values.type && !mobileDescriptionStripedHtml.value && mobileDescriptionStripedHtml.value?.length === 0) isValid = false
    if (!isValid) {
      openNotificationModal?.({
        content: '<p><span class="wf_text-sub-01">( * )</span>표시는 필수입력항목입니다.</p>'
      })
    } else {
      openNotificationModal?.({
        content: '상세정보 입력이 완료되었습니다.',
        onAccept: () => {
          toggleApprove.value = false
          closeModalByPop?.()
        }
      })
    }
  }

  watch(reasonText, (newText) => {
    if (newText && newText.length > 0) setFieldValue('productStatus', productApprovalStatus.rejectedApproval)
  })

  function handlePreview() {}
  function handleTemporary() {
    openNotificationModal?.({
      content: '입력한 정보가 저장되었습니다.',
      onAccept: () => {
        setSaveValue({ ...dataApprove.value })
        closeModalByPop?.()
      }
    })
  }
  function handleApproval() {
    openNotificationModal?.({
      content: '입력한 정보가 수정되었습니다.'
    })
  }

  const openApprovalReject = () => {
    if (values.productStatus == productApprovalStatus.rejectedApproval) {
      openNotificationModal({
        content: '이미 반려 처리되었습니다.'
      })
    } else {
      openConfirmModal({
        content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
        onConfirm: () => {
          // Show modal ProductReasonRejectApprovalModal
          closeModalByPop?.()
          onShowModal()
        }
      })
    }
  }

  const openConfirmApproval = () => {
    if (values.productStatus == productApprovalStatus.approvalCompleted) {
      openNotificationModal({
        content: '이미 승인완료되었습니다.'
      })
    } else {
      openConfirmModal({
        content: '선택한 상품을 승인 하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          showNotificationConfirmYesApproval()
        }
      })
    }
  }

  const showNotificationConfirmYesApproval = () => {
    openNotificationModal({
      content: '선택한 상품이 승인완료 되었습니다.'
    })
  }

  return {
    values,
    toggleApprove,
    changeValueField,
    handleCancel,
    handleSave,
    handleTemporary,
    handleApproval,
    handlePreview,
    openApprovalReject,
    openConfirmApproval
  }
}
