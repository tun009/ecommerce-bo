import { DEFAULT_DATE_FORMAT, formatTime, handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { DAYS_PER_MONTH } from '@/common/constant'
import { useDataTablePagination } from '@/composables'
import {
  DataTablePaginationResponseModel,
  defaultPageState,
  listButtonDate,
  MemberCustomerSearchRequest,
  ProductSearchModalModel,
  ProductSearchModalProps,
  ProductSearchRecordModel,
  productSearchRecordRes,
  ProductSearchType
} from '@/models'
import {
  productModalSearchCustomerMeta,
  productModalSearchSellerMeta,
  ProductSearchCustomerTableHeaderConfig,
  ProductSearchSellerTableHeaderConfig
} from '@/models/views'
import { DataTableRowSelectEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { object, string } from 'yup'
import { memberCustomerSearchApi } from '@/services/api/members/MemberCustomerSearchApi'
import { MockProductSearchTableData } from '@/assets'

export const useProductModalSearchWithTableLogic = (props: ProductSearchModalProps) => {
  const getModalSearchMetaInfo = () => {
    return props.searchType === ProductSearchType.SELLER ? productModalSearchSellerMeta : productModalSearchCustomerMeta
  }
  const getTableColsConfig = () => {
    return props.searchType === ProductSearchType.SELLER ? ProductSearchSellerTableHeaderConfig : ProductSearchCustomerTableHeaderConfig
  }
  const modalSearchMetaInfo = getModalSearchMetaInfo()
  const tableCols = getTableColsConfig()
  const currentFilterDate = ref()
  const selectedProduct = ref()
  const page = ref<PageState>(defaultPageState)
  const selectValue = ref<ProductSearchRecordModel>(props.searchResData ?? productSearchRecordRes)

  onMounted(() => {
    handleChangeCountDate(0)
  })

  const productSearchSchema = {
    searchCode: string(),
    searchName: string(),
    searchRegisterCode: string(),
    searchBusinessRegistrationNumber: string(),
    status: string(),
    contractStatus: string(),
    searchStartDate: string(),
    searchEndDate: string()
  }

  const { setFieldValue, errors, values, resetForm } = useForm({
    validationSchema: object().shape(productSearchSchema),
    initialValues: {
      status: { label: '전체', value: 'All' },
      contractStatus: { label: '전체', value: 'All' },
      searchCode: '',
      searchName: '',
      searchRegisterCode: '',
      searchBusinessRegistrationNumber: '',
      searchStartDate: '',
      searchEndDate: ''
    }
  })

  // set data

  const getData = async (page: number, size: number) => {
    if (props.searchType === ProductSearchType.CUSTOMER) {
      let params: MemberCustomerSearchRequest = {
        pageNum: page + 1,
        rowSize: size,
        customerKey: Number(values.searchCode),
        customerName: values.searchName,
        contractStatus: String(values.status.value),
        startDate: formatTime(values.searchStartDate, DEFAULT_DATE_FORMAT),
        endDate: formatTime(values.searchEndDate, DEFAULT_DATE_FORMAT),
        corpRegNum: values.searchRegisterCode,
        bizRegNum: values.searchBusinessRegistrationNumber
      }
      if (values.contractStatus.value !== 'All') {
        params = { customerStatus: String(values.contractStatus.value), ...params }
      }
      const resData = await memberCustomerSearchApi.search(params)

      return Promise.resolve({
        totalItems: resData.totalItems,
        data: resData.data
      })
    } else {
      const totalItems = values.searchCode.length > 5 && values.searchCode.length <= 10 ? 5 : 1234

      return new Promise<DataTablePaginationResponseModel<ProductSearchModalModel>>((resolve) => {
        setTimeout(() => {
          const items: any[] = []
          const maxItemInPage = page * size + size
          for (let i = page * size; i < maxItemInPage; i++) {
            items.push({
              ...MockProductSearchTableData,
              id: MockProductSearchTableData.id + i + 1,
              code: MockProductSearchTableData.code + i + ''
            })
          }
          resolve({
            totalItems: totalItems,
            data: items
          })
        })
      })
    }
  }

  const {
    items: searchResults,
    totalItems: totalSearchItems,
    isLoading,
    fetchDataWith,
    setData
  } = useDataTablePagination<ProductSearchModalModel>(getData)

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    handleSearch().catch(() => {})
  }

  const handleSearch = async () => {
    const isSearchInpValid =
      !errors.value || values.searchCode || values.searchName || values.searchRegisterCode || values.searchBusinessRegistrationNumber

    if (isSearchInpValid) {
      if (props.searchType === ProductSearchType.CUSTOMER) {
        await fetchDataWith({
          numberOfItems: page.value.rows,
          page: page.value.page
        })
      }
    } else {
      setData([])
    }
  }

  //end mock data

  const handleSelectRow = (res: ProductSearchRecordModel) => {
    selectValue.value = res
  }

  const handleSelectValue = () => {
    if (selectValue.value) {
      props.onSelect(selectValue.value)
    } else {
      props.onCancel?.()
    }
  }

  const onRowSelect = (select: DataTableRowSelectEvent) => {
    selectedProduct.value = select.data
    const res = {
      code: select.data.code,
      name: select.data.name
    }
    handleSelectRow(res)
  }

  const handleResetForm = () => {
    resetForm()
    handleChangeCountDate(DAYS_PER_MONTH)
  }

  const handleChangeCountDate = (number: number) => {
    currentFilterDate.value = number
    handleSetDateFormCustom(number)
  }

  const handleSelectCustomDate = (field: keyof typeof productSearchSchema, value: string) => {
    setFieldValue(field, value)
    // handle custom select date btn
  }

  const handleSetDateFormCustom = (number: number) => {
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)

    setFieldValue('searchStartDate', lastCustomDayString)
    setFieldValue('searchEndDate', currentDateString)
  }

  //
  return {
    searchResults,
    handleSearch,
    handleSelectValue,
    modalSearchMetaInfo,
    onRowSelect,
    handleResetForm,
    values,
    setFieldValue,
    onPageChange,
    currentFilterDate,
    handleChangeCountDate,
    isLoading,
    totalSearchItems,
    selectedProduct,
    handleSelectCustomDate,
    tableCols,
    listButtonDate
  }
}
