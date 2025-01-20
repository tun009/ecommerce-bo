import { ID_CHECKBOX_ALL, convertDateLocalDateTime, exportExcel } from '@/common'
import { useCheckbox } from '@/composables/common'
import { useBaseFormFilterTable } from '@/composables'
import {
  DeliveryCategoryTypeModel,
  DeliveryProductTypeModel,
  DeliveryTicketProductOrderStatusProductFormModel,
  DeliveryTicketProductOrderStatusProductModel,
  DeliveryProductCategoryDepthRank,
  DeliveryRankingRangeModel,
  SelectOptionModel,
  deliveryProductTypeOptions,
  deliveryTicketProductOrderStatusProductHeaders,
  deliveryTicketProductOrderStatusProductXlsxSheetName
} from '@/models'
import { deliveryListOrderStatusApi, productCategoryApi } from '@/services'
import { computed, onMounted, ref, watch } from 'vue'

export const useDeliveryTicketProductOrderStatusProduct = () => {
  const categoryDepth1 = ref<SelectOptionModel[]>([])
  const categoryDepth2 = ref<SelectOptionModel[]>([])
  const categoryDepth3 = ref<SelectOptionModel[]>([])

  const initialValuesForm: DeliveryTicketProductOrderStatusProductFormModel = {
    categoryType: DeliveryCategoryTypeModel.STANDARD,
    categoryId: '',
    categoryDepthId1: '',
    categoryDepthId2: '',
    categoryDepthId3: '',
    productKey: '',
    sellerKey: '',
    subcontractKey: '',
    productType: DeliveryProductTypeModel.ALL,
    mdKey: '',
    rankingBy: '',
    rankingRange: DeliveryRankingRangeModel.TOP_50,
    periodSearchType: '',
    fromDate: '',
    toDate: '',
    keywordSearchType: '',
    keyword: ''
  }

  const fetchDataCallback = async (pageNum: number, rowSize: number) => {
    const { categoryDepthId1, categoryDepthId2, categoryDepthId3, ...otherValues } = values
    const { keyword, keywordSearchType, fromDate = '', toDate = '' } = values
    const params = keywordSearchType
      ? {
          keywordSearchType,
          keyword
        }
      : {
          ...otherValues,
          fromDate: convertDateLocalDateTime(fromDate),
          toDate: convertDateLocalDateTime(toDate),
          categoryId: categoryDepthId3 ?? categoryDepthId2 ?? categoryDepthId1
        }
    const data = await deliveryListOrderStatusApi.getListByProduct({
      ...params,
      pageNum,
      rowSize
    })
    return data
  }

  const listIdCheckBoxType = computed(() => {
    return deliveryProductTypeOptions.list.filter((item) => item?.id.toLocaleLowerCase() !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const productType = useCheckbox(listIdCheckBoxType)

  const listActionCheckBox = computed(() => {
    return {
      productType
    }
  })

  const onGetCategory = async (rank: DeliveryProductCategoryDepthRank = DeliveryProductCategoryDepthRank.DEPTH_1, params: { upperDisplayCategoryId?: string } = {}) => {
    const { data } = await productCategoryApi.getCategoryDepth(rank, params)
    return data.map((item) => {
      return {
        label: item.displayCategoryName,
        value: item.displayCategoryId
      }
    })
  }

  const {
    values,
    setFieldValue,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    listChecked,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    getIsCheckBox,
    handleCheckBoxChange,
    handleResetForm
  } = useBaseFormFilterTable<DeliveryTicketProductOrderStatusProductModel, DeliveryTicketProductOrderStatusProductFormModel>({
    initialValuesForm,
    fetchDataCallback,
    listActionCheckBox
  })

  const onDownload = () => {
    if (!items.value) return
    exportExcel(items.value, deliveryTicketProductOrderStatusProductXlsxSheetName, deliveryTicketProductOrderStatusProductHeaders)
  }

  onMounted(async () => {
    const data = await onGetCategory()
    categoryDepth1.value = data
  })

  watch(
    () => values.categoryDepthId1,
    async () => {
      const data = await onGetCategory(DeliveryProductCategoryDepthRank.DEPTH_2, { upperDisplayCategoryId: values.categoryDepthId1 })
      categoryDepth2.value = data
      setFieldValue('categoryDepthId2', '')
      setFieldValue('categoryDepthId3', '')
    }
  )

  watch(
    () => values.categoryDepthId2,
    async () => {
      const data = await onGetCategory(DeliveryProductCategoryDepthRank.DEPTH_3, { upperDisplayCategoryId: values.categoryDepthId2 })
      categoryDepth3.value = data
      setFieldValue('categoryDepthId3', '')
    }
  )

  return {
    values,
    setFieldValue,
    onPageChange,
    listChecked,
    onRowSelected,
    onSelectAllChange,
    items,
    isLoading,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    onDownload,
    getIsCheckBox,
    handleCheckBoxChange,
    categoryDepth1,
    categoryDepth2,
    categoryDepth3,
    handleResetForm
  }
}
