import { computed } from 'vue'
import { useModal } from '@/composables/common'
import { useFormFilterTable } from '@/composables/widgets'
import { memberListApi } from '@/services/api'
import {MemberWelfarePointUsageDetailsModal} from '@/views/members'
import {
  exportExcel
} from '@/common'
import {allSuccessDataMember} from '@/models/services'
import { memberFormModelConfig, MemberListDataTableModel, MemberListFormModel,MemberListRequestConvertor, memberTableHeaders, memberXlsxSheetName } from '@/models'

export const useMemberList = () => {
  const { showModal, closeModalByPop } = useModal()
  const initialData: MemberListFormModel = {
    codeCustomer: '',
    nameMember: '',
    codeMember: '',
    email: '',
    employeePhone: '',
    phone: '',
    employmentStatus: memberFormModelConfig.listSelectRow2[0].options[0],
    accountStatus: memberFormModelConfig.listSelectRow2[1].options[0],
    membershipLevel: '1',
    dateSelect: memberFormModelConfig.listSelectDate.options[0],
    fromDate: '',
    toDate: ''
  }
  const fetchDataCallback = (page: number, size: number) => {
    return memberListApi.getMemberListList(MemberListRequestConvertor.from(values, page, size))
  }
  const handleSubmitFormFilter = () => {
    refreshData()
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
    listChecked,
    refTable,
    refreshData
  } = useFormFilterTable<MemberListDataTableModel, MemberListFormModel>({
    initialValuesForm: initialData,
    fetchDataCallback
  })

  const isListCheckedEmpty = computed(() => {
    return !listChecked.value.length
  })
  const onShowMemberWelfarePointUsageDetailsModal = () => {
    showModal?.({
      component: MemberWelfarePointUsageDetailsModal,
      events: {
        onClose: () => {
          closeModalByPop?.()
        }
      }
    })
  }
  const onDownload = () => {
    exportExcel<MemberListDataTableModel>(allSuccessDataMember.value, memberXlsxSheetName, memberTableHeaders)
  }
  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    ...memberFormModelConfig,
    handleResetFormFilter,
    handleSubmitFormFilter,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    isListCheckedEmpty,
    refTable,
    onDownload,
    onShowMemberWelfarePointUsageDetailsModal
  }
}
