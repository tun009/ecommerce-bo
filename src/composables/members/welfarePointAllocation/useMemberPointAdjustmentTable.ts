import { MemberPointAdjustmentTableFormModel, MemberPointAdjustmentTableListFormModel, memberPointAdjustmentTableModelConfig } from '@/models/views'
import { useFormFilterTable } from '@/composables/widgets'
import { memberPointAdjustmentApi } from '@/services'

export const useMemberPointAdjustmentTable = () => {
  const initialData: MemberPointAdjustmentTableFormModel = {
    typeSearch: memberPointAdjustmentTableModelConfig.selectRow1.optionsNormal[0],
    filterType: memberPointAdjustmentTableModelConfig.selectRow2.optionsNormal[0],
    querySearch: ''
  }
  const fetchDataCallback = (page: number, size: number) => {
    return memberPointAdjustmentApi.getMemberPointAdjustmentList({
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
    totalItems,
    refTable,
    onRowSelected,
    onSelectAllChange
  } = useFormFilterTable<MemberPointAdjustmentTableListFormModel, any>({
    initialValuesForm: initialData,
    fetchDataCallback
  })

  return {
    values,
    onRowSelected,
    onSelectAllChange,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    ...memberPointAdjustmentTableModelConfig,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable
  }
}
