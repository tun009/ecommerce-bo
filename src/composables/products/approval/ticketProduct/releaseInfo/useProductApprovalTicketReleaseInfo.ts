import { computed, ref } from 'vue'
import { useModalNotification, useModalConfirm, useModal } from '@/composables'
import { MAX_LIMIT_PRO_RELEASE_INFO, PRODUCT_APPROVAL_TICKET_PRODUCT_LIST } from '@/common'
import { ProductReasonRejectApprovalModal } from '@/views/products'
import { ModalNotification } from '@/components/widgets'
import { useRouter } from 'vue-router'

export const useProductApprovalTicketReleaseInfo = () => {
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { replaceModal, closeModalByPop: closeModalShowReason } = useModal()
  const router = useRouter()

  const defaultValueReturnPeriod = ref(
    '고객님의 단순변심으로 인한 교환/반품은 상품 유형에 따라 아래 기간 이내에 가능합니다. \n식품/보석 : 수령 당일로 부터 7일 (일부상품 제외) 의류,도서,잡화,컴퓨터,디지털기기 : 수령 당일로 부터 15일 기타 상품 : 수령 당일로 부터 30일. \n모바일상품권(e쿠폰) : 상품별 유효기간 내 환불가능 (미사용시). \n상품의 내용이 표시광고 내용과 다르거나 계약내용과 다르게 이행된 경우에는 상품을 수령한 날부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던. '
  )
  const defaultValueReturnInformation = ref(
    '마이페이지 혹은 고객센터(0000-0000)에서 문의/접수 가능합니다. \n교환/반품 접수 후 지정된 택배사에서 상품 수거를 위해 3-4일(토, 일, 공휴일 제외) 이내 방문 예-정이오니 기다려 주시기 바랍니다. \n상품불량 및 제품하자, 오배송의 이유로 반품하실 경우, 반품배송비는 홈쇼핑이 부담합니다. \n고객님의 단순변심으로 인한 교환/반품의 경우에 발생하는 배송비는 고객님께서 부담하셔야 하나, 청약철회를 이유로 위약금이나 손해배상을 청구하지 .'
  )
  const defaultValueReturn = ref(
    '반품/교환 가능기간을 초과한 경우. \n상품 및 구성품을 분실하였거나 취급부주의로 파손/고장/오염되어 상품의 가치가 훼손된 경우. \n상품을 개봉하였거나 상품 일부를 사용/세탁/수선/소비/섭취한 경우(단, 상품의 내용을 확인하기 위해 포장을 개봉한 경우 제외). \n고객님의 요청에 의해 상품사양이 변경(이니셜 상품, 사이즈 맞춤 상품 등)된 경우는 제작이 시작된 이후 취소 및 반품/교환이 불가합니다.'
  )
  const isPopupShowing = ref(false)

  const showPopupCheckLength = (value: any) => {
    if (value.length > MAX_LIMIT_PRO_RELEASE_INFO) {
      openModalNotification?.({
        content: '한글 기준 500자 이내로 입력 해주세요.',
        onAccept: () => {
          closeModalByPop?.()
          isPopupShowing.value = false
        }
      })
      isPopupShowing.value = true
      return value.slice(0, MAX_LIMIT_PRO_RELEASE_INFO)
    }
    return value
  }

  const validateReturnPeriod = () => {
    defaultValueReturnPeriod.value = showPopupCheckLength(defaultValueReturnPeriod.value)
  }
  const validateReturnInformation = () => {
    defaultValueReturnInformation.value = showPopupCheckLength(defaultValueReturnInformation.value)
  }
  const validateReturn = () => {
    defaultValueReturn.value = showPopupCheckLength(defaultValueReturn.value)
  }

  const openConfirmCancel = () => {
    openModalConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(PRODUCT_APPROVAL_TICKET_PRODUCT_LIST)
      }
    })
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
    if (defaultValueReturnPeriod.value === '' || defaultValueReturnInformation.value === '' || defaultValueReturn.value === '') {
      openModalNotification?.({
        content: '<p><span class="wf_text-sub-01">(*)</span>기본정보 입력이 완료되었습니다.</p>'
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
                closeModalByPop?.()
              }
            }
          })
        }
      }
    })
  }

  const isTextareaReadOnly = computed(() => isPopupShowing.value)

  return {
    defaultValueReturnPeriod,
    defaultValueReturnInformation,
    defaultValueReturn,
    isPopupShowing,
    isTextareaReadOnly,
    validateReturnPeriod,
    validateReturnInformation,
    validateReturn,
    //bottom action
    openConfirmCancel,
    openConfirmApproval,
    openConfirmApprovalReject
  }
}
