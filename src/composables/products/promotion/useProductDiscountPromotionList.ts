import { computed } from 'vue'
import {
  WelfareSelectOptionType,
  ProductSearchType,
  ProductSearchRecordModel,
  DataFormPromotionListConfig,
  PromotionProductListModal
} from '@/models'
import { useCheckbox } from '@/composables/common'
import { useProductBaseList } from '@/composables/products'
import { productPromotionApi } from '@/services'

interface ProductDiscountPromotionProductListForm {
  findSellerInput: ProductSearchRecordModel
  discountCategory: string
  productDateSelect: WelfareSelectOptionType
  fromDate: string
  toDate: string
  productType: string[]
  salesStatus: string[]
  exhibitionType: string[]
  exposureChannel: string[]
}

interface IListTypeForm {
  type?: ProductSearchType
  options?: WelfareSelectOptionType[]
  class?: string
  field: keyof ProductDiscountPromotionProductListForm
  placeholder: string
  [key: string]: any
}
const listRadio = DataFormPromotionListConfig.listRadios
const listInputFindProduct: IListTypeForm[] = DataFormPromotionListConfig.listInputFindProduct as IListTypeForm[]
const listCheckBoxTypes = DataFormPromotionListConfig.listCheckBoxTypes
const optionProductDate = DataFormPromotionListConfig.optionProductDate
const optionsProductListFilter = DataFormPromotionListConfig.optionsProductListFilter

export const useProductDiscountPromotionList = () => {
  const initialValues = {
    findSellerInput: undefined,
    discountCategory: 'mz',
    productDateSelect: optionProductDate[0],
    fromDate: '',
    toDate: '',
    productType: [],
    salesStatus: [],
    exhibitionType: [],
    exposureChannel: []
  }

  const fetchData = (page: number, size: number) => {
    // mock api return data with delay time
    return productPromotionApi.getDiscountPromotionList({
      pageNum: page,
      rowSize: size
    })
  }

  const listIdCheckBoxType = computed(() => {
    return listCheckBoxTypes[0].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })

  const listIdCheckBoxTypes = computed(() => {
    return listCheckBoxTypes[1].list.filter((item) => item.id !== 'all').map((item) => item.id)
  })

  const productTypeCheckBox = useCheckbox(listIdCheckBoxType)
  const salesStatusCheckBox = useCheckbox(listIdCheckBoxTypes)

  const listActionCheckBox = computed(() => {
    return {
      productTypeCheckBox,
      salesStatusCheckBox
    }
  })

  const {
    items,
    totalItems,
    isLoading,
    onPageChange,
    handleChangeCountDate,
    handleResetFilter,
    handleChangeFilterForm,
    handleCheckBoxChange,
    handleChangeValueSelect,
    getIsCheckBox,
    values,
    setFieldValue,
    refTable,
    componentSearch,
    currentFilterDate,
    formFilter,
    isDisabledFilter,
    handleResetForm
  } = useProductBaseList<PromotionProductListModal>({
    initialValuesForm: initialValues,
    defaultValueControlFilter: { ...optionsProductListFilter[0] },
    fetchDataCallback: fetchData,
    listActionCheckBox
  })

  return {
    values,
    handleChangeValueSelect,
    handleChangeFilterForm,
    handleResetForm,
    getIsCheckBox,
    handleCheckBoxChange,
    listCheckBoxTypes,
    optionProductDate,
    optionsProductListFilter,
    currentFilterDate,
    isDisabledFilter,
    formFilter,
    setFieldValue,
    handleResetFilter,
    handleChangeCountDate,
    componentSearch,
    listInputFindProduct,
    listRadio,
    items,
    totalItems,
    isLoading,
    refTable,
    onPageChange
  }
}
