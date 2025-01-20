import { DEFAULT_DATE_FORMAT, exportExcel, exportFileName } from '@/common'
import { ref } from 'vue'
import {
  MemberPointPaymentDetailModel,
  MemberPointUsageDetailModel,
  defaultPageState,
  memberExportPointPaymentHeaderName,
  memberExportPointUsageHeaderName
} from '@/models'
import { PageState } from 'primevue/paginator'
import { useDataTablePagination } from '@/composables/widgets'
import { memberListPointDetailApi } from '@/services'

export const useMemberListPointDetail = () => {
  // const memberKey = ref<any>(props?.data?.memberKey)
  const tablePaymentRef = ref()
  const tableUsageRef = ref()
  const pagePayment = ref<PageState>(defaultPageState)
  const pageUsage = ref<PageState>(defaultPageState)
  const pointPaymentFileName = exportFileName('PointPayment', DEFAULT_DATE_FORMAT)
  const pointUsageFileName = exportFileName('PointUsage', DEFAULT_DATE_FORMAT)
  const getDataPayment = (page: number, size: number) => {
    return memberListPointDetailApi.getMemberListPointPaymentDetail({ pageNum: page, rowSize: size })
  }

  const {
    items: itemsPayment,
    totalItems: totalItemsPayment,
    isLoading: isLoadingPayment,
    fetchDataWith: fetchDataWithPayment
  } = useDataTablePagination<MemberPointPaymentDetailModel>(getDataPayment)

  const onPageChangePayment = (pageState: PageState) => {
    pagePayment.value = pageState
    fetchDataWithPayment({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tablePaymentRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  const getDataUsage = (page: number, size: number) => {
    return memberListPointDetailApi.getMemberListPointUsageDetail({ pageNum: page, rowSize: size })
  }

  const {
    items: itemsUsage,
    totalItems: totalItemsUsage,
    isLoading: isLoadingUsage,
    fetchDataWith: fetchDataWithUsage
  } = useDataTablePagination<MemberPointUsageDetailModel>(getDataUsage)

  const onPageChangeUsage = (pageState: PageState) => {
    pageUsage.value = pageState
    fetchDataWithUsage({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tableUsageRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  const onDownLoadPayment = () => {
    const exportDataPayment =
      itemsPayment.value?.map<MemberPointPaymentDetailModel>((it) => {
        return {
          id: it.id,
          bend: it.bend,
          pointCode: it.pointCode,
          point: it.point,
          welfarePoints: it.welfarePoints,
          expirationPeriod: it.expirationPeriod,
          registrant: it.registrant,
          registrationDateTime: it.registrationDateTime
        }
      }) ?? []
    exportExcel<MemberPointPaymentDetailModel>(exportDataPayment, pointPaymentFileName, memberExportPointPaymentHeaderName)
  }

  const onDownLoadUsage = () => {
    const exportDataUsage =
      itemsUsage.value?.map<MemberPointUsageDetailModel>((it) => {
        return {
          id: it.id,
          division: it.division,
          pointCode: it.pointCode,
          point: it.point,
          welfarePoints: it.welfarePoints,
          orderCode: it.orderCode,
          registrant: it.registrant,
          registrationDateTime: it.registrationDateTime
        }
      }) ?? []
    exportExcel<MemberPointUsageDetailModel>(exportDataUsage, pointUsageFileName, memberExportPointUsageHeaderName)
  }

  return {
    itemsPayment,
    totalItemsPayment,
    isLoadingPayment,
    onPageChangePayment,
    tablePaymentRef,
    itemsUsage,
    totalItemsUsage,
    isLoadingUsage,
    onPageChangeUsage,
    tableUsageRef,
    onDownLoadPayment,
    onDownLoadUsage
  }
}
