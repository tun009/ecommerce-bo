import { useFormFilterTable } from '@/composables/widgets'
import { MemberOutgoingNumberDataTableModel, MemberOutgoingNumberListFormModel, memberOutgoingNumberListButtonDateConfig } from '@/models'
import { memberOutgoingNumberListApi } from '@/services/api'

export const useMemberOutgoingNumberList = () => {
  const emptyForm: MemberOutgoingNumberListFormModel = {
    callingNumber: '',
    fromDate: '',
    toDate: ''
  }

  const fetchDataCallback = (page: number, size: number) => {
    return memberOutgoingNumberListApi.getOutgoingNumbers({ pageNum: page, rowSize: size })
  }

  const { values, setFieldValue, handleResetFormFilter, items, isLoading, onPageChange, onRowSelected, onSelectAllChange, totalItems, refTable } =
    useFormFilterTable<MemberOutgoingNumberDataTableModel, MemberOutgoingNumberListFormModel>({
      initialValuesForm: emptyForm,
      fetchDataCallback
    })

  return {
    values,
    setFieldValue,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable,
    memberOutgoingNumberListButtonDateConfig
  }
}
