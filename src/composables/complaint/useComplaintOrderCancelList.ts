import {
  ComplaintOrderCancelFormModel,
  complaintOrderCancelListModelConfig,
  MemberPointAllocationListFormModel,
  memberPointAllocationListModelConfig,
  MemberPointAllocationListType
} from '@/models/views'
import { useFormFilterTable, useModalNotification } from '@/composables/widgets'
import { MemberPointAllocationApi } from '@/services/'
import { ref } from 'vue'
import { DataTableRowSelectEvent } from 'primevue/datatable'
import router from '@/router'
import { MEMBER_POINT_ADJUSTMENT_REGISTRATION, MEMBER_POINT_REGISTRATION_BULK, MEMBER_POINTS_DEDUCTION } from '@/common'

export const useComplaintOrderCancelList = (typePointAllocation: MemberPointAllocationListType) => {
  const initialData: ComplaintOrderCancelFormModel = {
    claimCode: '',
    claimStatus: complaintOrderCancelListModelConfig.selectRow1.options[0],
    member: '',
    customer: '',
    orderCode: '',
    orderName: '',
    recipientName: '',
    recipientPhoneNumber: '',
    seller: '전체',
    subCompany: complaintOrderCancelListModelConfig.selectRow4.options[0],
    MD: '',
    product: '',
    dateSelect: complaintOrderCancelListModelConfig.listSelectDate.options[0],
    fromDate: '',
    toDate: '',
    searchWord: ''
  }
  const selectedMember = ref()
  const { openModal } = useModalNotification()
  const getMemberPointAllocationList = (page: number, size: number) => {
    return MemberPointAllocationApi.getMemberPointAllocationList({
      page,
      numberOfItems: size
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
  } = useFormFilterTable<MemberPointAllocationListFormModel, ComplaintOrderCancelFormModel>({
    initialValuesForm: initialData,
    fetchDataCallback: getMemberPointAllocationList
  })

  const onSubmitForm = () => {
    // if (!values.claimCode) {
    //   openModal?.({
    //     buttonLabel: '확인',
    //     content: '필수입력 항목을 입력하세요.'
    //   })
    // }
  }
  const onRowSelect = (select: DataTableRowSelectEvent) => {
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
    ...complaintOrderCancelListModelConfig,
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
