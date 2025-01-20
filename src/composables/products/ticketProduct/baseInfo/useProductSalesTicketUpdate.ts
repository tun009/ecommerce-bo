import { productCouponPromotionItem, productDiscountPromotionItem } from '@/assets'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductTab, ProductSalesTestCase, ProductSalesTax, ProductSalesCouponPromotionData, ProductSalesDiscountPromotionData } from '@/models/views'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const prepareQuery = {
  tax: ProductSalesTax.TAXATION,
  adultCertified: false,
  startDate: '',
  endDate: '',
  unlimited: false,
  sellingPrice: '0',
  marginRate: '0'
}

export const useProductSalesTicketUpdate = () => {
  const contractMarginRate = 15
  const route = useRoute()
  const router = useRouter()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const query = reactive(prepareQuery)
  const couponPromotionData = ref<ProductSalesCouponPromotionData[]>([])
  const discountPromotionData = ref<ProductSalesDiscountPromotionData[]>([])
  // update onApprove, onSave, onTemporary, onPreview fn when api is ready
  // mock data
  onMounted(() => {
    if (route.query.testCase === ProductSalesTestCase.EMPTY_DATA) {
      couponPromotionData.value = []
      discountPromotionData.value = []
    } else {
      const tempCoupon = []
      const tempDiscount = []
      for (let i = 0; i < 3; i++) {
        tempCoupon.push(productCouponPromotionItem)
        tempDiscount.push(productDiscountPromotionItem)
      }
      couponPromotionData.value = tempCoupon
      discountPromotionData.value = tempDiscount
    }
  })
  //   end mock data
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
    // handle temporary save
  }
  const onSave = () => {
    // check required
    if (!(query.unlimited || (query.startDate && query.endDate))) {
      openNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span> 표시는 필수입력항목입니다.</p>'
      })
      return
    }
    // case: regis success
    if (!route.query.testCase || route.query.testCase === ProductSalesTestCase.SUCCESS) {
      openNotification({
        content: '판매정보 입력이 완료되었습니다.',
        onAccept: () => {
          closeModalByPop?.()
          router.push({
            query: {
              tab: ProductTab.OPTIONS_STOCK
            }
          })
        }
      })
      return
    }
    // case: update success
    if (route.query.testCase === ProductSalesTestCase.UPDATE) {
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
    if (route.query.testCase === ProductSalesTestCase.EDIT_BEFORE) {
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
  return {
    contractMarginRate,
    query,
    discountPromotionData,
    couponPromotionData,
    onApprove,
    onSave,
    onCancel,
    onPreview,
    onTemporary
  }
}
