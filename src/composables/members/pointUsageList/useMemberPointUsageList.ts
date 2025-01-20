import { DEFAULT_DATE_FORMAT, exportExcel, exportFileName } from '@/common'
import { useModal } from '@/composables/common'
import { useFormFilterTable, useModalNotification } from '@/composables/widgets'
import {
  MemberPointUsageCustomerDataTableModel,
  MemberPointUsageListDataTableModel,
  MemberPointUsageListFormModel,
  memberListButtonDateFilter,
  memberListSelectDateOptions,
  memberListSelectWelfarePointOptions,
  memberPointUsageCustomerHeaderName
} from '@/models'
import { memberPointUsageListApi } from '@/services/api'
import { MemberWelfarePointUsageDetailsModal } from '@/views/members'
import { onMounted, ref } from 'vue'

export const useMemberPointUsageList = () => {
  const searchCompanyCoderRef = ref()
  const searchMemberNameRef = ref()
  const customerFileName = exportFileName('CustomerInfo', DEFAULT_DATE_FORMAT)
  const customerInformationData = ref<MemberPointUsageCustomerDataTableModel[]>([])
  const { showModal, closeModalByPop } = useModal()
  const { openModal } = useModalNotification()

  const emptyForm: MemberPointUsageListFormModel = {
    companyCode: '',
    memberName: '',
    pointSelect: memberListSelectWelfarePointOptions[0],
    dateSelect: memberListSelectDateOptions[0],
    fromDate: '',
    toDate: '',
    minPoint: null,
    maxPoint: null
  }

  const fetchDataCallback = (page: number, size: number) => {
    return memberPointUsageListApi.getPointUsageList({ pageNum: page, rowSize: size })
  }

  const getCustomerInformation = () => {
    memberPointUsageListApi.getCustomerInformation().then((res) => {
      customerInformationData.value = res.data
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
  } = useFormFilterTable<MemberPointUsageListDataTableModel, MemberPointUsageListFormModel>({
    initialValuesForm: emptyForm,
    fetchDataCallback,
    onResetForm: () => {
      searchCompanyCoderRef.value.handleReset()
      searchMemberNameRef.value.handleReset()
    }
  })

  const handlesSubmitForm = () => {
    if (!values.companyCode) {
      openModal?.({
        content: '고객사를 선택해주세요.'
      })
    } else if (!values.minPoint || !values.maxPoint) {
      openModal?.({
        content: '포인트 최소~최대 입력 구간을 재설정 하세요.'
      })
    } else if (values.maxPoint < values.minPoint) {
      openModal?.({
        content: '포인트 최소~최대 입력 구간을 재설정 하세요.'
      })
    }
  }

  const handleOpenPopupSearchMember = () => {
    if (!values.companyCode) {
      openModal?.({
        content: '고객사를 선택해주세요.'
      })
    } else {
      searchMemberNameRef.value.handlePopupSearch()
    }
  }

  const onShowMemberWelfarePointUsageDetailsModal = () => {
    showModal?.({
      component: MemberWelfarePointUsageDetailsModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        }
      }
    })
  }

  const onDownLoadExcel = () => {
    const exportData = (customerInformationData.value ?? []).map<MemberPointUsageCustomerDataTableModel>((it) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = it
      return rest
    })
    exportExcel<MemberPointUsageCustomerDataTableModel>(exportData, customerFileName, memberPointUsageCustomerHeaderName)
  }

  onMounted(() => {
    getCustomerInformation()
  })
  return {
    values,
    setFieldValue,
    handleResetFormFilter,
    currentFilterDate,
    handleChangeCountDate,
    memberListSelectDateOptions,
    memberListSelectWelfarePointOptions,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable,
    onShowMemberWelfarePointUsageDetailsModal,
    memberListButtonDateFilter,
    handlesSubmitForm,
    searchCompanyCoderRef,
    searchMemberNameRef,
    customerInformationData,
    onDownLoadExcel,
    handleOpenPopupSearchMember
  }
}
