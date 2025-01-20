import { PRODUCT_TICKET_PRODUCT_LIST } from '@/common/router'
import { PRODUCT_TICKET_PROVISION_STORAGE_KEY } from '@/common/storage'
import { useStorage, useTableScroll } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { WelfareSelectOptionType } from '@/models/uikit'
import {
  ProductDeliveryDetailsDataRow,
  ProductDeliveryDetailDataSource,
  productDeliveryDetailsMockDataRow,
  productDeliveryDetailsMockEmptyDataRow
} from '@/models/views'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { array, number, object, string } from 'yup'
interface ProductTicketProvisionBaseInitValue {
  dataList: ProductDeliveryDetailsDataRow[]
  radioSelectInputDataOption: ProductDeliveryDetailDataSource
  selectedCategory: WelfareSelectOptionType
}
export const useProductTicketProvisionInformation = () => {
  const { openModal: openConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()

  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  // Storage temporary
  const [valueStore, setValueStore] = useStorage<ProductTicketProvisionBaseInitValue>(PRODUCT_TICKET_PROVISION_STORAGE_KEY)

  const productApprovalTableRef = ref()

  const maxVisibleItem = 10

  const isDisableApproval = ref(true)
  const router = useRouter()

  const getMockData = () => {
    const initialData = [{ ...productDeliveryDetailsMockDataRow }]
    for (let i = 1; i < 5; i++) {
      initialData.push({ ...productDeliveryDetailsMockDataRow, order: i })
    }
    return initialData
  }

  const initialData = getMockData()

  const baseInitValue = {
    dataList: initialData.map((item: ProductDeliveryDetailsDataRow) => ({ ...item })),
    radioSelectInputDataOption: ProductDeliveryDetailDataSource.external,
    selectedCategory: {
      label: '가공식품',
      value: '10'
    }
  }

  const schema = object().shape({
    dataList: array()
      .of(
        object().shape({
          order: number(),
          item: string().max(30).required(),
          description: string().max(500).required()
        })
      )
      .strict(),
    radioSelectInputDataOption: string().required(),
    selectedCategory: object().shape({
      label: string().required(),
      value: string().required()
    })
  })

  const initValue = computed(() => {
    return valueStore?.value ? valueStore.value : baseInitValue
  })

  const { values, setFieldValue, resetForm, validate } = useForm<ProductTicketProvisionBaseInitValue>({
    validationSchema: schema,
    initialValues: initValue.value
  })

  const onIncreaseItem = () => {
    const newData = [...values.dataList, { ...productDeliveryDetailsMockEmptyDataRow }]
    setFieldValue('dataList', newData)
  }

  const setFormData = (index: number, field: keyof ProductDeliveryDetailsDataRow, value: string) => {
    setFieldValue(`dataList.${index}.${field}`, value)
  }

  const onDeleteItem = (index: number) => {
    const newData = [...values.dataList]
    newData.splice(index, 1)
    setFieldValue('dataList', newData)
  }

  const onPreviewClick = () => {}

  const openConfirmCancel = () => {
    openConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        closeModalConfirm?.()
        router.push(PRODUCT_TICKET_PRODUCT_LIST)
      }
    })
  }

  const onTemporarySaveClick = () => {
    openModalNotification({
      content: '입력한 정보가 저장되었습니다.',
      onAccept: () => {
        setValueStore({ ...values })
        closeModalByPop?.()
      }
    })
  }

  const onSaveClick = async () => {
    const { errors: e } = await validate()
    if (Object.keys(e).length !== 0) {
      openModalNotification?.({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.',
        buttonLabel: '확인'
      })
    } else {
      openModalNotification?.({
        content: '상품정보제공고시 정보 입력이 완료되었습니다.',
        onAccept: () => {
          isDisableApproval.value = false
          closeModalByPop?.()
        }
      })
    }
  }

  const onApprovalClick = () => {
    openConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      onConfirm: () => {
        closeModalConfirm?.()
        openModalNotification({
          content: '선택한 상품이 승인완료 되었습니다.',
          buttonLabel: '확인'
        })
      }
    })
  }

  const resetFormEmpty = () => {
    resetForm({
      values: {
        dataList: [{ ...productDeliveryDetailsMockEmptyDataRow }],
        radioSelectInputDataOption: ProductDeliveryDetailDataSource.manual,
        selectedCategory: {
          label: '가공식품',
          value: '10'
        }
      }
    })
  }
  // Check scroll

  const dataLength = computed(() => values.dataList.length)

  useTableScroll({ tableRef: productApprovalTableRef, maxVisibleItem: maxVisibleItem, currentDataLength: dataLength })

  // When change option
  watch(
    () => values.radioSelectInputDataOption,
    (newCategory) => {
      if (newCategory === ProductDeliveryDetailDataSource.manual) {
        resetFormEmpty()
      } else {
        resetForm({
          values: {
            dataList: initialData.map((item: ProductDeliveryDetailsDataRow) => ({ ...item })),
            radioSelectInputDataOption: ProductDeliveryDetailDataSource.external,
            selectedCategory: {
              label: '가공식품',
              value: '10'
            }
          }
        })
      }
    }
  )

  // When change category
  watch(
    () => values.selectedCategory,
    (newCategory, oldCategory) => {
      if (newCategory.value !== oldCategory.value && values.radioSelectInputDataOption === ProductDeliveryDetailDataSource.external) {
        openConfirm({
          content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
          onConfirm: () => {
            closeModalByPop?.()
            resetForm({
              values: {
                ...baseInitValue,
                selectedCategory: { ...newCategory }
              }
            })
          }
        })
      }
    }
  )

  return {
    onIncreaseItem,
    onDeleteItem,
    openConfirmCancel,
    onApprovalClick,
    values,
    setFormData,
    onSaveClick,
    onTemporarySaveClick,
    onPreviewClick,
    setFieldValue,
    isDisableApproval,
    productApprovalTableRef
  }
}
