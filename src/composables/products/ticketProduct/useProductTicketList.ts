import { ID_CHECKBOX_ALL, PRODUCT_STATUS, fileDocumentNames, handleDownloadFile } from '@/common'
import { useCheckbox, useProductBaseList } from '@/composables'
import {
  ProductDataFieldFormTicketProductListlConfig,
  ProductSearchType,
  ProductTicketCategoryType,
  ProductTicketListForm,
  ProductTicketProductListModel,
  WelfareSelectOptionType
} from '@/models'
import { productTicketApi } from '@/services'
import { computed, ref, watch } from 'vue'

interface IListTypeForm {
  type?: ProductSearchType
  options?: WelfareSelectOptionType[]
  class?: string
  field: keyof ProductTicketListForm
  placeholder: string
  [key: string]: any
}

const listFormSelectProduct: IListTypeForm[] = ProductDataFieldFormTicketProductListlConfig.listSelectProductType as IListTypeForm[]
const listInputFindProduct: IListTypeForm[] = ProductDataFieldFormTicketProductListlConfig.listInputFindProduct as IListTypeForm[]
const listCheckBoxTypes = ProductDataFieldFormTicketProductListlConfig.listCheckBoxTypes
const listCheckBoxDevices = ProductDataFieldFormTicketProductListlConfig.listCheckBoxDevices
const optionProductDate = ProductDataFieldFormTicketProductListlConfig.optionProductDate
const optionsProductListFilter = ProductDataFieldFormTicketProductListlConfig.optionsProductListFilter
const listCheckBoxExternalIntegration = ProductDataFieldFormTicketProductListlConfig.listCheckBoxExternalIntegration
const selectOptionCategoryDepth1 = ref<WelfareSelectOptionType[]>([])
const selectOptionCategoryDepth2 = ref<WelfareSelectOptionType[]>([])
const selectOptionCategoryDepth3 = ref<WelfareSelectOptionType[]>([])
export const useProductTicketList = () => {
  const initialValues: ProductTicketListForm = {
    standardCategorySelect: listFormSelectProduct.find((item) => item.field === 'standardCategorySelect')!.options![0],
    companyChild: undefined,
    findSellerInput: '',
    findMdInput: '',
    productDateSelect: optionProductDate[0],
    fromDate: '',
    toDate: '',
    productType: [],
    salesStatus: [],
    exhibitionType: [],
    exposureChannel: []
  }

  const listIdCheckBoxType = computed(() => {
    return listCheckBoxTypes[0].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })

  const listIdCheckBoxTypes = computed(() => {
    return listCheckBoxTypes[1].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })
  const exhibitionIdTypeCheckBox = computed(() => {
    return listCheckBoxDevices[0].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })
  const exposureIdChannelCheckBox = computed(() => {
    return listCheckBoxDevices[1].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })

  const externalLinkageCheckbox = computed(() => {
    return listCheckBoxExternalIntegration.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const productTypeCheckBox = useCheckbox(listIdCheckBoxType)
  const salesStatusCheckBox = useCheckbox(listIdCheckBoxTypes)
  const exhibitionTypeCheckBox = useCheckbox(exhibitionIdTypeCheckBox)
  const exposureChannelCheckBox = useCheckbox(exposureIdChannelCheckBox)
  const externalIntegrationCheckBox = useCheckbox(externalLinkageCheckbox)

  const listActionCheckBox = computed(() => {
    return {
      productTypeCheckBox,
      salesStatusCheckBox,
      exhibitionTypeCheckBox,
      exposureChannelCheckBox,
      externalIntegrationCheckBox
    }
  })

  const fetchData = async (page: number, size: number) => {
    const resData = await productTicketApi.getDataTicketList(page, size, { ...values })
    return Promise.resolve({ totalItems: +resData.totalItems, data: resData.data })
  }

  const {
    items,
    totalItems,
    isLoading,
    setData,
    checkListChecked,
    handleShowInfoSeller,
    onPageChange,
    handleChangeCountDate,
    handleResetFilter,
    handleChangeFilterForm,
    handleCheckBoxChange,
    handleChangeValueSelect,
    getIsCheckBox,
    openModalConfirm,
    closeModalByPop,
    onRowSelected,
    onSelectAllChange,
    values,
    setFieldValue,
    refTable,
    componentSearch,
    mdSearch,
    currentFilterDate,
    formFilter,
    isDisabledFilter,
    handleResetForm,
    listChecked,
    openModal,
    clearChecked,
    refreshData
  } = useProductBaseList<ProductTicketProductListModel, ProductTicketListForm>({
    initialValuesForm: initialValues,
    defaultValueControlFilter: { ...optionsProductListFilter[0] },
    fetchDataCallback: fetchData,
    listActionCheckBox
  })

  const handleClickStopSell = () => {
    checkListChecked(() => {
      const isSoldOut = listChecked.value.some((i) => items.value?.find((item) => item.id === i)?.sales_status === PRODUCT_STATUS.sold_out)
      handleMessageStopSell(isSoldOut, listChecked.value)
    }, '판매 종료를 원하는 상품을 선택 후 버튼을 클릭해 주세요.')
  }

  const handleMessageStopSell = (iHas: boolean, listChecked: string[]) => {
    if (iHas) {
      openModal?.({
        buttonLabel: '확인',
        content: '선택한 상품 중 이미 판매 종료 처리된 상품이 포함되어 있습니다.'
      })
      return
    }
    openModalConfirm({
      content: '판매종료 처리 시 즉시 비전시되며 주문 불가합니다. 선택한 항목을 판매종료 처리 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleCompleteSell(listChecked)
      }
    })
  }

  const handleCompleteSell = (listChecked: string[]) => {
    const newItems = [...(items.value ?? [])]
    newItems.forEach((item) => {
      const isHas = listChecked.includes(item.id)
      if (isHas) {
        item.sales_status = PRODUCT_STATUS.sold_out
        item.isSelected = false
      }
    })
    refTable?.value?.clearCheckAll()
    clearChecked()
    setData(newItems)
    closeModalByPop?.()
  }

  const handleStopOnlySeller = (id: string) => {
    const isSoldOut = items.value?.find((item) => item.id === id)?.sales_status === PRODUCT_STATUS.sold_out
    handleMessageStopSell(isSoldOut, [id])
  }

  const handleDownloadFileClick = () => {
    openModalConfirm({
      content: '조회된 상품을 다운로드 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleDownloadFile(fileDocumentNames.ticketProductList.url, fileDocumentNames.ticketProductList.name)
        closeModalByPop?.()
      }
    })
  }

  watch(
    () => values.standardCategorySelect,
    async (newValue) => {
      if (newValue.value == ProductTicketCategoryType.DSP) {
        const depth = await productTicketApi.getDataTicketDspCategoryDepth1()

        selectOptionCategoryDepth1.value = depth?.data?.map((item) => ({
          label: item.displayCategoryName,
          value: item.displayCategoryId
        }))
      } else {
        // std
        selectOptionCategoryDepth1.value = []
        selectOptionCategoryDepth2.value = []
        selectOptionCategoryDepth3.value = []
      }
    }
  )

  watch(
    () => values.primaryClassificationSelect,
    async (newValue) => {
      const promises = [productTicketApi.getDataTicketDspCategoryDepth2(newValue), productTicketApi.getDataTicketDspCategoryDepth3(newValue)]
      Promise.all(promises)
        .then(([depth2, depth3]) => {
          if (depth2 || depth3) {
            selectOptionCategoryDepth2.value = depth2?.data?.map((item) => ({
              label: item.displayCategoryName,
              value: item.displayCategoryId
            }))

            selectOptionCategoryDepth3.value = depth3?.data?.map((item) => ({
              label: item.displayCategoryName,
              value: item.displayCategoryId
            }))
          }
        })
        .catch(() => {})
    }
  )
  return {
    values,
    handleChangeValueSelect,
    handleChangeFilterForm,
    handleResetForm,
    getIsCheckBox,
    handleCheckBoxChange,
    listFormSelectProduct,
    listInputFindProduct,
    listCheckBoxTypes,
    listCheckBoxDevices,
    optionProductDate,
    optionsProductListFilter,
    currentFilterDate,
    isDisabledFilter,
    formFilter,
    setFieldValue,
    handleResetFilter,
    handleChangeCountDate,
    listCheckBoxExternalIntegration,
    onRowSelected,
    onSelectAllChange,
    onPageChange,
    items,
    totalItems,
    isLoading,
    handleClickStopSell,
    handleStopOnlySeller,
    handleDownloadFileClick,
    handleShowInfoSeller,
    refTable,
    componentSearch,
    mdSearch,
    listCompanyChild: ProductDataFieldFormTicketProductListlConfig.listCompanyChild,
    refreshData,
    selectOptionCategoryDepth1,
    selectOptionCategoryDepth2,
    selectOptionCategoryDepth3
  }
}
