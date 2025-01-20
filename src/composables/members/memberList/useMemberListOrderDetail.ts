import { memberListOrderDetailApi } from '@/services'
import { ref } from 'vue'
import { FORMAT_DATE_YYYY_MM_DD, handleGetTimeLines } from '@/common'
import { useDataTablePagination } from '@/composables/widgets'
import {
  MemberListOrderDetailModel,
  MemberSearchMemberListOrderDetailQuery,
  memberSearchMemberOrderStatusSearch,
  defaultPageState,
  memberSearchMemberOrderPeriodOptions,
  memberSearchMemberOrderCodeSearchOptions
} from '@/models'
import { PageState } from 'primevue/paginator'

export const useMemberListOrderDetail = () => {
  const tableRef = ref()
  const page = ref<PageState>(defaultPageState)
  const { currentDateString, lastCustomDayString } = handleGetTimeLines(6, FORMAT_DATE_YYYY_MM_DD)
  const defaultQuery: MemberSearchMemberListOrderDetailQuery = {
    orderStatus: memberSearchMemberOrderStatusSearch[0],
    invoiceNumber: '',
    period: memberSearchMemberOrderPeriodOptions[0],
    startDate: lastCustomDayString,
    endDate: currentDateString,
    codeSearch: memberSearchMemberOrderCodeSearchOptions[0],
    codeQuery: ''
  }
  const query = ref<MemberSearchMemberListOrderDetailQuery>({ ...defaultQuery })
  const groupDateRef = ref()

  const fetchData = (page: number, size: number) => {
    return memberListOrderDetailApi.getMemberListOrderDetail({
      pageNum: page,
      rowSize: size
    })
  }
  const { items, isLoading, totalItems, fetchDataWith } = useDataTablePagination<MemberListOrderDetailModel>(fetchData)
  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    submitForm()
  }

  const handleReset = () => {
    query.value = { ...defaultQuery }
    groupDateRef?.value?.handleReset()
  }

  const resetForm = () => {
    handleReset()
  }

  const submitForm = () => {
    const isSearchInputValid = query.value.codeSearch.value != memberSearchMemberOrderCodeSearchOptions[0].value
    if (isSearchInputValid) {
      fetchDataWith({
        numberOfItems: page.value.rows,
        page: page.value.first
      }).catch(() => {})
    }
  }

  return {
    query,
    memberSearchMemberOrderPeriodOptions,
    memberSearchMemberOrderCodeSearchOptions,
    memberSearchMemberOrderStatusSearch,
    groupDateRef,
    resetForm,
    submitForm,
    items,
    isLoading,
    onPageChange,
    totalItems,
    tableRef
  }
}
