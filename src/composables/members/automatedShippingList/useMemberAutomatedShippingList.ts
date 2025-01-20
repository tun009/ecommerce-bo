import { useFormFilterTable } from '@/composables/widgets'
import { MemberAutomatedShippingDataTableModel, MemberAutomatedShippingListFormModel, memberListSelectDateOptionsConfig } from '@/models'
import { memberAutomatedShippingListApi } from '@/services/api/members'

export const useMemberAutomatedShippingList = () => {
  const emptyForm: MemberAutomatedShippingListFormModel = {
    shippingCategory: 1,
    isUse: 1,
    dateSelect: memberListSelectDateOptionsConfig[0],
    fromDate: '',
    toDate: '',
    keyword: ''
  }

  const fetchDataCallback = (page: number, size: number) => {
    return memberAutomatedShippingListApi.getAutomatedShippings({
      pageNum: page,
      rowSize: size
    })
  }

  const {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable
  } = useFormFilterTable<MemberAutomatedShippingDataTableModel, MemberAutomatedShippingListFormModel>({
    initialValuesForm: emptyForm,
    fetchDataCallback
  })

  return {
    values,
    setFieldValue,
    handleResetFormFilter,
    currentFilterDate,
    handleChangeCountDate,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable
  }
}
