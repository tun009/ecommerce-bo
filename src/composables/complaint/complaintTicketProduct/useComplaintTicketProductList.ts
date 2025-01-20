import { computed } from 'vue'
import {
  ComplaintTicketProductListDataTableModel,
  ComplaintTicketProductListFormModel,
  ProductDataFieldFormDeliveryProductListModel,
  ProductSearchType,
  WelfareSelectOptionType,
  complaintCheckBoxClaimConfig,
  complaintFindProductConfig,
  complaintKeyWorkSearchOptionsConfig,
  complaintSelectDateOptionsConfig
} from '@/models'
import { useCheckbox, useBaseFormFilterTable } from '@/composables'
import { complaintTicketProductApi } from '@/services/api/complaint'
import { ID_CHECKBOX_ALL } from '@/common'

interface ComplaintListTypeForm {
  type?: ProductSearchType
  options?: WelfareSelectOptionType[]
  class?: string
  field: keyof ComplaintTicketProductListFormModel 
  placeholder: string
  [key: string]: any
}

const listInputFindProduct: ComplaintListTypeForm[] = complaintFindProductConfig.listInputFindProduct as ComplaintListTypeForm[]

export const useComplaintTicketProductList = () => {
  const claimType = complaintCheckBoxClaimConfig
  const listButtonDate = ProductDataFieldFormDeliveryProductListModel.listButtonDateFilter
  const emptyForm: ComplaintTicketProductListFormModel = {
    claimType: '',
    claimKey: '',
    orderMemberKey: '',
    customerKey: '',
    orderKey: '',
    orderer: '',
    sellerKey: '',
    companyChild: complaintFindProductConfig.listCompanyChild[0],
    periodSearchType: complaintSelectDateOptionsConfig[0],
    fromDate: '',
    toDate: '',
  }

  const listClaimCheckBoxType = computed(() => {
    return claimType.list.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const claimTypeCheckBox = useCheckbox(listClaimCheckBoxType)
  const listActionCheckBox = computed(() => {
    return {
      claimTypeCheckBox
    }
  })

  const fetchData = (page: number, size: number) => {
    return complaintTicketProductApi.getComplainTicketProductList({
      pageNum: page,
      rowSize: size
    })
  }
  
  const {
    items,
    refTable,
    totalItems,
    isLoading,
    onPageChange,
    setFieldValue,
    handleCheckBoxChange,
    getIsCheckBox,
    isDisabledFilter, 
    values,
    currentFilterDate,
    handleChangeCountDate,
    handleChangeValueSelect,
    handleChangeFilterForm,
    formFilter,
    handleResetFilter
  } = useBaseFormFilterTable<ComplaintTicketProductListDataTableModel, ComplaintTicketProductListFormModel>({
    initialValuesForm: emptyForm,
    defaultValueControlFilter: { ...complaintKeyWorkSearchOptionsConfig[0] },
    fetchDataCallback: fetchData,
    listActionCheckBox
  })

  return {
    values,
    refTable,
    claimType,
    items,
    totalItems,
    isLoading,
    onPageChange,
    setFieldValue,
    getIsCheckBox,
    handleCheckBoxChange,
    isDisabledFilter,
    currentFilterDate,
    handleChangeCountDate,
    handleChangeValueSelect,
    handleChangeFilterForm,
    formFilter,
    handleResetFilter,
    listInputFindProduct,
    listCompanyChild: complaintFindProductConfig.listCompanyChild,
    listButtonDate
  }
}
