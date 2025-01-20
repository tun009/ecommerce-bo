import { useModalConfirm, useModalNotification, useProductReasonApproval, useProductRedirectLink } from '@/composables'
import {
  ProductOptionsDeliveryInfo,
  productOptionsTypeRegisterConfig,
  ProductRegisterValueOptionType,
  ProductTypeRegisterOptionValue
} from '@/models/views/products'
import { computed, ComputedRef, reactive, ref } from 'vue'
import router from '@/router'

export const useProductDeliveryApprovalOptionDetail = (type: string) => {
  let idDefault = 1000
  const valueType = reactive<ProductOptionsDeliveryInfo[]>([])
  const valueOption = ref<ProductRegisterValueOptionType>(ProductRegisterValueOptionType.notUsed)
  const totalCount = ref<number | undefined>()
  const isSaveSuccess = ref<boolean>(false)
  const approvalValue = ref<boolean>(false)
  const dataMultipleValue = ref<boolean>(false)
  const { openModal: openConfirmModal } = useModalConfirm()
  const { openModal: openNotificationModal, closeModalByPop } = useModalNotification()
  const { onShowModal } = useProductReasonApproval()
  const { redirectCancelLink } = useProductRedirectLink(type)
  const updateValueType = (newValue: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean) => {
    dataMultipleValue.value = checkDataMultiple || false
    const updatedValue = newValue.map((item) => ({
      ...item,
      optionId: item.optionId || ++idDefault,
      salesStatus: item.salesStatus || productOptionsTypeRegisterConfig[0]
    }))
    valueType.splice(0, valueType.length, ...updatedValue)
  }

  const editValueType = (newValue: ProductOptionsDeliveryInfo, index: number) => {
    valueType[index] = newValue
  }

  const updateValueOption = (newValue: ProductRegisterValueOptionType) => {
    valueOption.value = newValue
    totalCount.value = undefined
  }

  const deleteValueType = (index: number) => {
    valueType.splice(index, 1)
  }

  const updateValueTotalCount = (value: number | undefined) => {
    totalCount.value = value
  }

  const openCancelModal = () => {
    openConfirmModal({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(redirectCancelLink.value)
      }
    })
  }

  const openTemporaryStorageModal = () => {
    openNotificationModal({
      content: '입력한 정보가 저장되었습니다.'
    })
  }

  const countTotalOption = () => {
    let totalCountValue = 0
    valueType.map((item) => {
      if (item.inventory && item.salesStatus?.value === '1') totalCountValue = totalCountValue + item.inventory
    })
    totalCount.value = totalCountValue
  }

  const openSaveModal = () => {
    let checkValue = true
    countTotalOption()
    if (!totalCount.value) {
      checkValue = false
    }
    if (valueOption.value === ProductRegisterValueOptionType.use) {
      if (
        !valueType.every(
          (item) => 'optionPrice' in item && item.optionPrice && (item.salesStatus?.value === '1' ? 'inventory' in item && item.inventory : true)
        )
      ) {
        checkValue = false
      }
    }
    if (checkValue) {
      openNotificationModal({
        content: '배송정보 입력이 완료되었습니다.'
      })
      isSaveSuccess.value = true
    } else {
      openConfirmModal({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
      })
    }
  }

  const onClickApproval = () => {
    approvalValue.value = true
  }

  const openApprovalReject = () => {
    openConfirmModal({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      onConfirm: () => {
        // Show modal ProductReasonRejectApprovalModal
        closeModalByPop?.()
        onShowModal()
      }
    })
  }

  const openConfirmApproval = () => {
    openConfirmModal({
      content: '선택한 상품을 승인 하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        showNotificationConfirmYesApproval()
      }
    })
  }
  const showNotificationConfirmYesApproval = () => {
    openNotificationModal({
      content: '선택한 상품이 승인완료 되었습니다.'
    })
  }

  const typeRegisterOption: ComputedRef<ProductTypeRegisterOptionValue> = computed(() => {
    if (!valueType.length) return undefined
    const isMultiple = valueType?.find((_) => _?.option1)
    if (isMultiple) return 'multiple'
    return 'single'
  })

  return {
    valueType,
    valueOption,
    isSaveSuccess,
    approvalValue,
    updateValueType,
    updateValueOption,
    editValueType,
    deleteValueType,
    totalCount,
    updateValueTotalCount,
    openCancelModal,
    openTemporaryStorageModal,
    openSaveModal,
    onClickApproval,
    typeRegisterOption,
    dataMultipleValue,
    openApprovalReject,
    openConfirmApproval,
    countTotalOption
  }
}
