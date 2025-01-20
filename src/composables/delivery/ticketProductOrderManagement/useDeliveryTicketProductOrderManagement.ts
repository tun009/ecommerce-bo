import { convertDateLocalDateTime, exportExcel } from '@/common'
import { useBaseFormFilterTable } from '@/composables'
import {
  DeliveryKeywordSearchModel,
  DeliveryOrderChannelModel,
  DeliveryPaymentMethodModel,
  DeliveryTicketProductListOrderStatusFormModel,
  DeliveryTicketProductListOrderStatusModel,
  deliveryTicketProductListOrderStatusHeaders,
  deliveryTicketProductListOrderStatusXlsxSheetName
} from '@/models'
import { deliveryListOrderStatusApi } from '@/services'
import { ref } from 'vue'

export const useDeliveryTicketProductOrderManagement = () => {
  const searchCustomerKeyRef = ref()
  const searchOrderMemberKeyRef = ref()
  const initialValuesForm: DeliveryTicketProductListOrderStatusFormModel = {
    orderKey: '',
    customerKey: '',
    orderMemberKey: '',
    ordererName: '',
    receiverName: '',
    receiverPhone: undefined,
    paymentMethod: DeliveryPaymentMethodModel.ALL,
    orderChannel: DeliveryOrderChannelModel.ALL,
    periodSearchType: '',
    fromDate: '',
    toDate: '',
    keywordSearchType: DeliveryKeywordSearchModel.ALL,
    keyword: ''
  }

  const fetchDataCallback = async (pageNum: number, rowSize: number) => {
    const { keyword, keywordSearchType, fromDate = '', toDate = '' } = values
    const params = keywordSearchType
      ? {
          keywordSearchType,
          keyword
        }
      : {
          ...values,
          fromDate: convertDateLocalDateTime(fromDate),
          toDate: convertDateLocalDateTime(toDate)
        }
    const data = await deliveryListOrderStatusApi.getList({
      ...params,
      pageNum,
      rowSize
    })
    return data
  }

  const {
    values,
    setFieldValue,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    listChecked,
    resetForm,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit
  } = useBaseFormFilterTable<DeliveryTicketProductListOrderStatusModel, DeliveryTicketProductListOrderStatusFormModel>({
    initialValuesForm,
    fetchDataCallback,
    onResetForm: () => {
      searchCustomerKeyRef.value.handleReset()
      searchOrderMemberKeyRef.value.handleReset()
    }
  })

  const onDownload = () => {
    if (!items.value) return
    exportExcel(items.value, deliveryTicketProductListOrderStatusXlsxSheetName, deliveryTicketProductListOrderStatusHeaders)
  }

  const handleOpenPopupSearchMember = () => {
    searchOrderMemberKeyRef.value.handlePopupSearch()
  }

  return {
    values,
    setFieldValue,
    resetForm,
    onPageChange,
    listChecked,
    onRowSelected,
    onSelectAllChange,
    items,
    isLoading,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    onDownload,
    searchCustomerKeyRef,
    searchOrderMemberKeyRef,
    handleOpenPopupSearchMember
  }
}
