import {
  MemberPointAdjustmentListFormModel,
  MemberPointAllocationFormModel,
  MemberPointAllocationListFormModel,
  memberPointAllocationListModelConfig,
  MemberPointAllocationListType
} from '@/models/views'
import { useFormFilterTable, useModalNotification } from '@/composables/widgets'
import { memberPointAllocationApi } from '@/services'
import { ref } from 'vue'
import { DataTableRowClickEvent } from 'primevue/datatable'
import router from '@/router'
import { MEMBER_POINT_ADJUSTMENT_REGISTRATION, MEMBER_POINT_REGISTRATION_BULK, MEMBER_POINTS_DEDUCTION } from '@/common'

export const useMemberWelfarePointAllocationList = (typePointAllocation: MemberPointAllocationListType) => {
  const initialData: MemberPointAllocationFormModel = {
    codeCustomer: '',
    pointAllocationName: '',
    pointAllocationCode: '',
    pointClassification: memberPointAllocationListModelConfig.listRadioLevelMember.options[0].value,
    pointType: memberPointAllocationListModelConfig.listSelectRow2[0].optionsNormal[0],
    registrationStatus: memberPointAllocationListModelConfig.listSelectRow2[1].optionsNormal[0],
    dateSelect: memberPointAllocationListModelConfig.listSelectDate.options[0],
    fromDate: '',
    toDate: ''
  }
  const typePointAllocationValue = typePointAllocation === MemberPointAllocationListType.deduction
  const selectedMember = ref()
  const { openModal } = useModalNotification()

  const getMemberPointDeductionList = (page: number, size: number) => {
    return memberPointAllocationApi.getMemberPointDeductionList({
      pageNum: page,
      rowSize: size
    })
  }

  const getMemberPointAllocationList = (page: number, size: number) => {
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
  } = typePointAllocationValue
    ? useFormFilterTable<MemberPointAdjustmentListFormModel, MemberPointAllocationFormModel>({
        initialValuesForm: initialData,
        fetchDataCallback: getMemberPointDeductionList
      })
    : useFormFilterTable<MemberPointAllocationListFormModel, MemberPointAllocationFormModel>({
        initialValuesForm: initialData,
        fetchDataCallback: getMemberPointAllocationList
      })

  const onSubmitForm = () => {
    if (!values.codeCustomer) {
      openModal?.({
        buttonLabel: '확인',
        content: '필수입력 항목을 입력하세요.'
      })
    }
  }
  const onRowSelect = (select: DataTableRowClickEvent) => {
    selectedMember.value = select
  }

  const submitRegistration = () => {
    if (selectedMember.value) {
      router.push(MEMBER_POINT_ADJUSTMENT_REGISTRATION)
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '필수입력 항목을 입력하세요.'
      })
    }
  }

  const goToEditPage = () => {
    if (items.value && items.value.length > 0) {
      router.push(typePointAllocation ? MEMBER_POINTS_DEDUCTION : MEMBER_POINT_REGISTRATION_BULK)
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '고객사를 조회 해주세요.'
      })
    }
  }

  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    ...memberPointAllocationListModelConfig,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onSubmitForm,
    onRowSelect,
    selectedMember,
    submitRegistration,
    goToEditPage
  }
}
