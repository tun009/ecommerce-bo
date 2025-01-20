import { PRODUCT_PROMOTION_LIST } from '@/common'
import { useModalConfirm, useModalNotification, useNotificationDatePeriod, useProductSearchItemModal } from '@/composables'
import { ProductPromotionRegisterModel } from '@/models'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { array, boolean, number, object, string } from 'yup'

export const useProductPromotionRegister = () => {
  const { openModal: openProductModal } = useProductSearchItemModal()
  const { openModal: openNotification, closeModalByPop } = useModalNotification()
  const { openModal: openConfirm } = useModalConfirm()

  const isPriceValid = ref(true)

  const router = useRouter()

  const validationSchema = {
    discountCat: string().required(),
    seller: object().required(),
    promotionName: string().required(),
    discountPeriodBegin: string().required(),
    discountPeriodEnd: string().required(),
    couponApplies: boolean().required(),
    discountAmount: number().required(),
    promotionCode: string(),
    product: array().required(),
    productDiscounted: array().required()
  }

  const { setFieldValue, values, validate } = useForm<ProductPromotionRegisterModel>({
    validationSchema: validationSchema,
    initialValues: {
      discountCat: 'platform',
      couponApplies: false
    }
  })

  const handleChangeValueField = (field: keyof ProductPromotionRegisterModel, value: any) => {
    setFieldValue(field, value)
  }

  const getProductFromModal = (items: any[]) => {
    handleChangeValueField('product', items)
  }

  const handleOpenModal = () => {
    openProductModal(getProductFromModal)
  }

  const { handleDateChange } = useNotificationDatePeriod<ProductPromotionRegisterModel>({
    emit: (date, field) => handleChangeValueField(field, date),
    beginDateField: 'discountPeriodBegin',
    endDateField: 'discountPeriodEnd'
  })

  const handleAddMultipleDiscount = () => {
    if (!values.product) {
      openNotification({
        content: '대상상품이 등록되지 않았습니다.'
      })
    }
    const productAfterDiscounted = values.product.map((it) => {
      if (parseInt(it.price) - values.discountAmount < 0) {
        isPriceValid.value = false
      }
      return {
        ...it,
        discount: values.discountAmount,
        priceAfterDiscount: parseInt(it.price) - values.discountAmount
      }
    })
    if (isPriceValid.value && values.discountAmount) {
      setFieldValue('productDiscounted', productAfterDiscounted)
    } else {
      openNotification({
        content: '할인 금액이 상품 가격보다 큽니다.'
      })
    }
  }

  const handleCancel = () => {
    openConfirm({
      content: '프로모션 등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        router.push(PRODUCT_PROMOTION_LIST)
      }
    })
  }
  const handleCancelInBulk = () => {
    openNotification({
      content: '진행중인 프로모션이 없습니다.'
    })
  }

  const handleSave = async () => {
    const { errors: e } = await validate()
    if (Object.keys(e).length !== 0) {
      openNotification?.({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.',
        buttonLabel: '확인'
      })
    } else {
      openConfirm({
        content: '저장 완료 시 할인 금액이 즉시 적용됩니다. 계속 하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          openNotification?.({
            content: '프로모션이 저장 되었습니다.'
          })
          setFieldValue('promotionCode', 'P1234')
        }
      })
    }
  }
  const handleDeleteRecord = (id: string) => {
    setFieldValue(
      'product',
      values.product.filter((it) => it.id !== id)
    )
  }
  const handleDeleteRecordDiscount = (id: string) => {
    setFieldValue(
      'productDiscounted',
      values.productDiscounted.filter((it) => it.id !== id)
    )
  }
  return {
    values,
    handleChangeValueField,
    handleOpenModal,
    setFieldValue,
    handleCancel,
    handleCancelInBulk,
    handleSave,
    handleDateChange,
    handleAddMultipleDiscount,
    handleDeleteRecord,
    handleDeleteRecordDiscount
  }
}
