import { MemberPointAdjustmentFormModel, memberPointAdjustmentListModelConfig, MemberPointAllocationListFormModel } from '@/models/views'
import { useFormFilterTable, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { memberPointAllocationApi } from '@/services/'
import { ref } from 'vue'

export const useMemberPointAdjustmentRegistration = () => {
  const initialData: MemberPointAdjustmentFormModel = {
    pointAdjustmentCode: '1234',
    pointAdjustmentName: '',
    pointClassification: memberPointAdjustmentListModelConfig.listSelectRow2[0].optionsNormal[0].value,
    pointType: memberPointAdjustmentListModelConfig.listSelectRow2[1].optionsNormal[0],
    fromDate: '2023.12.31 23:59',
    toDate: '2023.12.31 23:59',
    pointAllocationName: '23년도 상반기 포인트',
    allottedPoint: '1,000',
    totalAllocatedPoints: '',
    administratorNotes: '',
    reasonAdjustment: '',
    pointAllocationTarget: memberPointAdjustmentListModelConfig.listSelectRow8.optionsNormal[0].value
  }
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const onSave = ref<boolean>(false)
  const fetchDataCallback = (page: number, size: number) => {
    return memberPointAllocationApi.getMemberPointAllocationList({
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
    refTable
  } = useFormFilterTable<MemberPointAllocationListFormModel, MemberPointAdjustmentFormModel>({
    initialValuesForm: initialData,
    fetchDataCallback,
    initialDate: -2
  })

  const handleSave = () => {
    onSave.value = true
  }

  const resetForm = () => {
    if (JSON.stringify(initialData) !== JSON.stringify(values)) {
      openConfirm({
        content: '입력 내용을 초기화하겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          handleResetFormFilter()
          openNotification({
            content: '초기화 되었습니다.'
          })
        }
      })
    }
  }

  const handleRegister = () => {
    if (values.pointAllocationName && values.allottedPoint && values.reasonAdjustment) {
      openNotification({
        content: '입력 후, 저장 알럿) 조정등록이 완료되었습니다'
      })
    } else {
      openNotification({
        content: '미입력 알럿) 필수입력 값을 입력하세요'
      })
    }
  }

  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    ...memberPointAdjustmentListModelConfig,
    handleResetFormFilter: resetForm,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onSave,
    handleSave,
    handleRegister
  }
}
