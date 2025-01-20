import { useModal } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductSalesTestCase } from '@/models'
import { ProductReasonRejectApprovalModal } from '@/views'
import { productCouponPromotionItem, productDiscountPromotionItem } from '@/assets'
import { ProductSalesTax, ProductSalesCouponPromotionData, ProductSalesDiscountPromotionData } from '@/models/views'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useProductApprovalSalesInformationBase = () => {
  const { replaceModal, closeModalByPop: closeModalShowReason } = useModal()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const route = useRoute()

  const contractMarginRate = 15
  const query = reactive({
    tax: ProductSalesTax.TAXATION,
    adultCertified: false,
    startDate: '',
    endDate: '',
    unlimited: false,
    sellingPrice: '10000',
    marginRate: '10'
  })
  const discountPromotionData = ref<ProductSalesDiscountPromotionData[]>([])
  const couponPromotionData = ref<ProductSalesCouponPromotionData[]>([])

  onMounted(() => {
    if (route.query.testCase === ProductSalesTestCase.EMPTY_DATA) {
      couponPromotionData.value = []
      discountPromotionData.value = []
    } else {
      const tempCoupon = []
      const tempDiscount = []
      for (let i = 0; i < 10; i++) {
        tempCoupon.push(productCouponPromotionItem)
        tempDiscount.push(productDiscountPromotionItem)
      }
      couponPromotionData.value = tempCoupon
      discountPromotionData.value = tempDiscount
    }
  })

  const onCancel = () => {
    openConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        // router.push({
        //   query: {
        //     tab: ''
        //   }
        // })
      }
    })
  }

  const onPreview = () => {
    return
  }

  const onTemporary = () => {
    openNotification({
      content: '입력한 정보가 저장되었습니다.'
    })
  }

  const onSave = () => {
    // check required
    if (!(query.unlimited || (query.startDate && query.endDate))) {
      openNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span> 표시는 필수입력항목입니다.</p>'
      })
      return
    }

    // case: update success
    if (!route.query.testCase || route.query.testCase === ProductSalesTestCase.UPDATE) {
      openNotification({
        content: '입력한 정보가 수정되었습니다.'
      })
      return
    }

    // case: wait approve
    if (route.query.testCase === ProductSalesTestCase.WAIT_APPROVE) {
      openNotification({
        content: '현재 승인 대기중인 상품이 존재합니다.'
      })
      return
    }

    // case: has field cant be modified after approval
    if (route.query.testCase === ProductSalesTestCase.CANT_BE_MODIFIED) {
      openNotification({
        content: '승인완료 후 수정할 수 없는 항목입니다. [판매가, 상품마진율]'
      })
      return
    }
  }

  const onApprove = () => {
    // case: save after editing (before)
    if (!route.query.testCase || route.query.testCase === ProductSalesTestCase.EDIT_BEFORE) {
      openNotification({
        content: '입력한 정보를 저장 완료한 후 승인요청 해주세요.'
      })
      return
    }

    // case: Save after editing (complete)
    if (route.query.testCase === ProductSalesTestCase.EDIT_COMPLETE) {
      openNotification({
        content: '입력한 정보가 수정되었습니다.'
      })
      return
    }
  }

  const onReject = () => {
    openConfirm({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      onConfirm: handleShowPopupReason
    })
  }

  const onApproveFinished = () => {
    openConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        // case: approve.
        openNotification({
          content: '선택한 상품이 승인완료 되었습니다.'
        })

        // case: Already approved.
        // openNotification({
        //   content: '이미 승인완료되었습니다.'
        // })
      }
    })
  }

  const handleShowPopupReason = () => {
    replaceModal?.({
      component: ProductReasonRejectApprovalModal,
      events: {
        onClose: closeModalShowReason,
        onSave: (value: string) => {
          if (!value.trim()) {
            openNotification({
              content: '반려 사유를 입력 해주세요.'
            })
            return
          }
          closeModalByPop?.()
          openNotification({
            content: '이미 반려 처리되었습니다.'
          })
        }
      }
    })
  }

  return {
    query,
    contractMarginRate,
    discountPromotionData,
    couponPromotionData,
    onApprove,
    onSave,
    onCancel,
    onPreview,
    onTemporary,
    onReject,
    onApproveFinished
  }
}
