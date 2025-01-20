import {
  PRODUCT_DELIVERY_BASE_STORAGE_KEY,
  PRODUCT_DELIVERY_BASE_STORAGE_TEMPORARY_KEY,
  PRODUCT_TICKET_BASE_STORAGE_KEY,
  PRODUCT_TICKET_BASE_STORAGE_TEMPORARY_KEY,
  deepEqualObject,
  productApprovalStatus,
  productBaseInfoType
} from '@/common'
import { useStorage } from '@/composables/common'
import { useProductReasonApproval } from '@/composables/products/modal'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductSearchRecordModel, WelfareSelectOptionType } from '@/models'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductRedirectLink } from './useProductRedirectLink'

interface ProductBaseInfoForm {
  lastSavedTime: string
  lastApprovalFinishedTime: string
  lastChangeSavedTime: string
  externalIntegration?: string
  selectTypeProduct: WelfareSelectOptionType | undefined
  productName: string
  productNameI18?: string
  productCode: string
  productCodeSeller?: string
  seller: string
  brand: string
  nameModel?: string
  selectSeller: WelfareSelectOptionType | undefined
  selectStatusSell: WelfareSelectOptionType | undefined
  productStatus: string
  productKeywords: string[]

  // More info
  manufacturingCompany?: string
  origin?: string
  registerProductReview: boolean
  qaRegistration: boolean
  giveAGift: boolean
  minimumPurchaseQuantity: string
  isMinimumPurchaseQuantity: boolean
  maximumPurchaseQuantity: string
  isMaximumPurchaseQuantity: boolean

  // Customer Info
  customerRegistration?: boolean
  customerKeywords: string[]

  // Ticket product
  selectTypeTicket: WelfareSelectOptionType | undefined
  startTime: string
  endTime: string
}

const optionsSelectSeller: WelfareSelectOptionType[] = [
  { label: 'U1234(하위업체명)', value: '1' },
  { label: 'U4567(하위업체명)', value: '2' },
  { label: 'U4666(하위업체명)', value: '3' }
]

const optionsStatusSell: WelfareSelectOptionType[] = [
  { label: '판매중', value: '1' },
  { label: '판매일시중지', value: '2' },
  { label: '일시품절', value: '3' },
  { label: '품절', value: '4' }
]

const defaultProductKeywords = [
  '가나다라마바사아자차',
  '가나다라마바사아자차',
  '가나다라마바사아자차',
  '가나다라마바사아자차',
  '가나다라마바사아자차',
  '가나다라마바사아자차',
  '가나다라마바사아자차',
  '가나다라마바사아자차',
  '가나다라마바사아자차',
  '가나다라마바사아자차'
]

export const useProductBaseInfo = (type: string, optionsTypeProduct?: WelfareSelectOptionType[], optionsTypeTicket?: WelfareSelectOptionType[]) => {
  const router = useRouter()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openModalNotification } = useModalNotification()
  const { value: reasonText, onShowModal } = useProductReasonApproval()
  const { redirectSavedLink, redirectCancelLink } = useProductRedirectLink(type)

  const [savedValues, setSavedValues] = useStorage<ProductBaseInfoForm>(
    type == productBaseInfoType.delivery ? PRODUCT_DELIVERY_BASE_STORAGE_KEY : PRODUCT_TICKET_BASE_STORAGE_KEY
  )
  const [savedTemporaryValues, setSavedTemporaryValues] = useStorage<ProductBaseInfoForm>(
    type == productBaseInfoType.delivery ? PRODUCT_DELIVERY_BASE_STORAGE_TEMPORARY_KEY : PRODUCT_TICKET_BASE_STORAGE_TEMPORARY_KEY
  )

  const emptyForm: ProductBaseInfoForm = {
    lastSavedTime: '',
    lastApprovalFinishedTime: '',
    lastChangeSavedTime: '',
    externalIntegration: '-',
    selectTypeProduct: undefined,
    productCode: '-',
    productCodeSeller: '',
    productName: '',
    productNameI18: '',
    productStatus: '-',
    selectStatusSell: optionsStatusSell[0],
    seller: '',
    selectSeller: undefined,
    brand: '',
    productKeywords: defaultProductKeywords,

    registerProductReview: true,
    qaRegistration: true,
    giveAGift: true,
    minimumPurchaseQuantity: '',
    maximumPurchaseQuantity: '',
    isMinimumPurchaseQuantity: false,
    isMaximumPurchaseQuantity: false,
    manufacturingCompany: '',

    customerRegistration: true,
    customerKeywords: [],

    selectTypeTicket: undefined,
    startTime: '',
    endTime: ''
  }

  const approvalPreviewDate: ProductBaseInfoForm = {
    lastSavedTime: new Date().toString(),
    lastApprovalFinishedTime: new Date().toString(),
    lastChangeSavedTime: new Date().toString(),
    externalIntegration: '직접등록',
    selectTypeProduct: optionsTypeProduct?.[0],
    productCode: '1234567890123',
    productCodeSeller: '11111',
    productName: 'Car',
    productNameI18: 'Car',
    productStatus: productApprovalStatus.approvalCompleted,
    selectStatusSell: optionsStatusSell[0],
    seller: '새로 dsf 0 (S00251)',
    selectSeller: optionsSelectSeller[0],
    brand: '새로 sdf 0 (B00172)',
    productKeywords: defaultProductKeywords,

    registerProductReview: true,
    qaRegistration: true,
    giveAGift: true,
    minimumPurchaseQuantity: '',
    maximumPurchaseQuantity: '',
    isMinimumPurchaseQuantity: false,
    isMaximumPurchaseQuantity: false,

    customerRegistration: true,
    customerKeywords: [],

    selectTypeTicket: optionsTypeTicket?.[0],
    startTime: '',
    endTime: ''
  }

  const approvalAwaiting: ProductBaseInfoForm = {
    ...approvalPreviewDate,
    lastApprovalFinishedTime: '',
    lastChangeSavedTime: '',
    productStatus: productApprovalStatus.awaitingApproval
  }

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

  const { setFieldValue, values, setValues, resetForm } = useForm<ProductBaseInfoForm>({
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

  const handleChangeValueField = (field: keyof ProductBaseInfoForm, value: any) => {
    setFieldValue(field, value)
  }

  const handleResetForm = () => {
    resetForm()
  }

  const handleChangeIsMinimumMaximumPurchaseQuantity = (
    value: any,
    fieldBoolean: keyof ProductBaseInfoForm,
    fieldText: keyof ProductBaseInfoForm
  ) => {
    if (!value) {
      handleChangeValueField(fieldText, '')
    }
    handleChangeValueField(fieldBoolean, value)
  }

  /* Base info data */
  const keywordProductBase = ref('')
  const onChangeKeywordProductBase = (value: string) => {
    keywordProductBase.value = value
  }

  const handleAddTagKeywordBase = () => {
    if (keywordProductBase.value.trim().length > 0) {
      setFieldValue('productKeywords', [...values.productKeywords, keywordProductBase.value])
      keywordProductBase.value = ''
    }
  }

  const handleRemoveTagKeywordBase = (idx: number) => {
    const oldKeywords = [...values.productKeywords]
    oldKeywords.splice(idx, 1)
    setFieldValue('productKeywords', oldKeywords)
  }

  const onChangeBrandSearch = (value: ProductSearchRecordModel) => {
    setFieldValue('brand', `${value.name} (${value.code})`)
  }

  const onChangeSellerSearch = (value: ProductSearchRecordModel) => {
    setFieldValue('seller', `${value.name} (${value.code})`)
  }

  /* Customer information */
  const keywordCustomer = ref('')

  const changeKeywordCustomer = (value: ProductSearchRecordModel) => {
    keywordCustomer.value = `(${value.code}) ${value.name}`
  }

  const handleAddTagKeywordCustomer = () => {
    if (keywordCustomer.value.trim().length > 0) {
      setFieldValue('customerKeywords', [...values.customerKeywords, keywordCustomer.value])
      keywordCustomer.value = ''
    }
  }

  const handleRemoveTagKeywordCustomer = (idx: number) => {
    const oldKeywords = [...values.customerKeywords]
    oldKeywords.splice(idx, 1)
    setFieldValue('customerKeywords', oldKeywords)
  }

  /* Registration info data */

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

  const isDeliveryProductValid = () => {
    let isValid = true
    // validate
    if (!values.selectTypeProduct) isValid = false
    if (!values.productName) isValid = false
    if (!values.seller) isValid = false
    if (!values.selectSeller) isValid = false
    if (!values.brand) isValid = false
    // if (keywordsCustomer.value.length == 0) isValid = false
    if (!values.selectStatusSell) isValid = false
    if (values.isMinimumPurchaseQuantity && values.minimumPurchaseQuantity && values.minimumPurchaseQuantity.length == 0) isValid = false
    if (values.isMaximumPurchaseQuantity && values.maximumPurchaseQuantity && values.maximumPurchaseQuantity.length == 0) isValid = false

    return isValid
  }

  const isTicketProductValid = () => {
    let isValid = true
    // validate
    if (!values.selectTypeProduct) isValid = false
    if (!values.productName) isValid = false
    if (!values.seller) isValid = false
    if (!values.selectSeller) isValid = false
    if (!values.brand) isValid = false
    // if (keywordsCustomer.value.length == 0) isValid = false
    if (!values.selectStatusSell) isValid = false

    if (!values.startTime) isValid = false
    if (!values.endTime) isValid = false
    if (!values.selectTypeTicket) isValid = false

    return isValid
  }

  const openNotificationSave = () => {
    if (productApprovalStatusByRoute.value == productApprovalStatus.approvalCompleted) {
      if (!deepEqualObject({ ...values }, { ...savedValues?.value })) {
        openModalNotification({
          content: '승인완료 후 수정할 수 없는 항목입니다. [수정불가항목]'
        })
        setValues({ ...approvalPreviewDate })
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

    const isValid = type == productBaseInfoType.ticket ? isTicketProductValid() : isDeliveryProductValid()

    if (!isValid) {
      openModalNotification({
        content: '<p><span class="wf_text-sub-01">(*)</span>기본정보 입력이 완료되었습니다.</p>'
      })
    } else if (values.productStatus == productApprovalStatus.registration) {
      openModalNotification({
        content: '입력한 정보가 수정되었습니다.',
        onAccept: () => {
          router.push(redirectSavedLink.value)
        }
      })
      setFieldValue('lastChangeSavedTime', new Date().toString())
      setSavedValues({ ...values })
    } else {
      openModalNotification({
        content: '기본정보 입력이 완료되었습니다.',
        onAccept: () => {
          router.push(redirectSavedLink.value)
        }
      })
      setFieldValue('productCode', '1234567890123')
      setFieldValue('productStatus', productApprovalStatus.registration)
      setFieldValue('externalIntegration', '직접등록')
      setFieldValue('lastSavedTime', new Date().toString())
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
      if (values.productStatus == productApprovalStatus.registration && !!values.lastChangeSavedTime) {
        openModalNotification({
          content: '입력한 정보가 수정되었습니다.'
        })
      }
      setFieldValue('productStatus', productApprovalStatus.awaitingApproval)
      setSavedValues({ ...values })
    }
  }

  const openApprovalReject = () => {
    if (values.productStatus == productApprovalStatus.rejectedApproval) {
      openModalNotification({
        content: '이미 반려 처리되었습니다.'
      })
    } else {
      openModalConfirm({
        content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
        onConfirm: () => {
          // Show modal ProductReasonRejectApprovalModal
          closeModalByPop?.()
          onShowModal()
        }
      })
    }
  }

  watch(reasonText, (newText) => {
    if (newText && newText.length > 0) setFieldValue('productStatus', productApprovalStatus.rejectedApproval)
  })

  const openConfirmApproval = () => {
    if (values.productStatus == productApprovalStatus.approvalCompleted) {
      openModalNotification({
        content: '이미 승인완료되었습니다.'
      })
    } else {
      openModalConfirm({
        content: '선택한 상품을 승인 하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          setFieldValue('productStatus', productApprovalStatus.approvalCompleted)
          setFieldValue('lastApprovalFinishedTime', new Date().toString())
          showNotificationConfirmYesApproval()
        }
      })
    }
  }

  const showNotificationConfirmYesApproval = () => {
    openModalNotification({
      content: '선택한 상품이 승인완료 되었습니다.'
    })
  }

  return {
    values,
    setFieldValue,
    handleResetForm,
    handleChangeValueField,

    // Base Info
    optionsSelectSeller,
    keywordProductBase,
    onChangeKeywordProductBase,
    handleAddTagKeywordBase,
    handleRemoveTagKeywordBase,
    onChangeBrandSearch,
    onChangeSellerSearch,

    // Customer information
    changeKeywordCustomer,
    handleAddTagKeywordCustomer,
    handleRemoveTagKeywordCustomer,
    handleChangeIsMinimumMaximumPurchaseQuantity,

    // Registration info data
    optionsStatusSell,

    // Button Bottom
    openConfirmCancel,
    openNotificationSaveTemporary,
    openNotificationSave,
    openNotificationApproval,
    openApprovalReject,
    openConfirmApproval
  }
}
