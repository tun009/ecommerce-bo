import { MAX_LIMIT_PRO_RELEASE_INFO, PRODUCT_TICKET_PRODUCT_LIST } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables'
import { ProductTicketDetailIssuedInfoRequest, ProductTicketIssuedManageRequest } from '@/models/services'
import { ProductTab } from '@/models/views'
import { productTicketDetailInfoApi } from '@/services'
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

export const useProductReleaseInformation = () => {
  const state = reactive({
    defaultValueReturnPeriod: '',
    defaultValueReturnInformation: '',
    defaultValueReturn: '',
    isPopupShowing: false,
    isStatusPreview: false,
    isStatusApproval: false,
    ticketTypeName: '',
    productKey: 0,
    deliveryFeePolicyTypeName: ''
  })

  const { openModal, closeModalByPop } = useModalNotification()
  const { openModal: openModalConfirm } = useModalConfirm()
  const router = useRouter()

  const redirectOnSave = () => {
    router.push({
      query: {
        tab: ProductTab.MORE_INFORMATION
      }
    })
  }

  const showPopupCheckLength = (value: any) => {
    if (value.length > MAX_LIMIT_PRO_RELEASE_INFO) {
      openModal?.({
        content: '한글 기준 500자 이내로 입력 해주세요.',
        onAccept: () => {
          closeModalByPop?.()
          state.isPopupShowing = false
        }
      })
      state.isPopupShowing = true
      return value.slice(0, MAX_LIMIT_PRO_RELEASE_INFO)
    }
    return value
  }

  const validateReturnPeriod = () => {
    state.defaultValueReturnPeriod = showPopupCheckLength(state.defaultValueReturnPeriod)
  }
  const validateReturnInformation = () => {
    state.defaultValueReturnInformation = showPopupCheckLength(state.defaultValueReturnInformation)
  }
  const validateReturn = () => {
    state.defaultValueReturn = showPopupCheckLength(state.defaultValueReturn)
  }

  const isTextareaReadOnly = computed(() => state.isPopupShowing)

  const openConfirmCancel = () => {
    openModalConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(PRODUCT_TICKET_PRODUCT_LIST)
      }
    })
  }

  const openNotificationSaveTemporary = () => {
    openModal?.({
      content: '입력한 정보가 저장되었습니다.'
    })
  }

  const openNotificationSave = () => {
    if (state.isStatusApproval) {
      openModal?.({
        content: '현재 승인 대기중인 상품이 존재합니다.'
      })
    } else if (state.defaultValueReturnPeriod === '' || state.defaultValueReturnInformation === '' || state.defaultValueReturn === '') {
      openModal?.({
        content: '<p><span class="wf_text-sub-01">(*)</span>기본정보 입력이 완료되었습니다.</p>'
      })
    } else {
      updateIssuedManage()
    }
  }

  const changeStatusApproval = () => {
    state.isStatusPreview = false
    state.isStatusApproval = true
  }

  const getIssuedInfo = (productClassificationCode: string, productCode: string) => {
    const request: ProductTicketDetailIssuedInfoRequest = { productClassificationCode, productCode }
    productTicketDetailInfoApi.getIssuedInfo(request).then((res) => {
      const data = res.data
      state.productKey = data.productKey
      state.ticketTypeName = data.ticketTypeName
      state.deliveryFeePolicyTypeName = data.deliveryFeePolicyTypeName
      state.defaultValueReturnPeriod = data.exchangeReturnPeriodContents
      state.defaultValueReturnInformation = data.exchangeReturnWarningContents
      state.defaultValueReturn = data.exchangeReturnContents
    })
  }

  const updateIssuedManage = () => {
    const request: ProductTicketIssuedManageRequest = {
      exchangeReturnPeriodContents: state.defaultValueReturn,
      exchangeReturnContents: state.defaultValueReturn,
      exchangeReturnWarningContents: state.defaultValueReturnInformation,
      productKey: state.productKey
    }
    productTicketDetailInfoApi.updateIssuesInfo(request).then(() => {
      openModal?.({
        content: '배송정보 입력이 완료되었습니다.',
        onAccept: () => {
          closeModalByPop?.()
          redirectOnSave()
          state.isStatusPreview = true
        }
      })
    })
  }

  onMounted(() => {
    getIssuedInfo('01', '1000000000002')
  })

  return {
    state,
    isTextareaReadOnly,
    validateReturnPeriod,
    validateReturnInformation,
    validateReturn,
    openConfirmCancel,
    openNotificationSaveTemporary,
    openNotificationSave,
    changeStatusApproval
  }
}
