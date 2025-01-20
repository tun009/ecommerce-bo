import { DEFAULT_DATE_FORMAT, exportExcel, exportFileName } from '@/common'
import { useDataTablePagination } from '@/composables/widgets'
import { MemberCouponDetailModel, defaultPageState, memberExportCouponDetailHeaderName } from '@/models'
import { memberListCouponDetailApi } from '@/services'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'

export const useMemberListCouponDetail = () => {
  // const memberKey = ref<any>(props?.data?.memberKey)
  const couponFileName = exportFileName('CouponDetail', DEFAULT_DATE_FORMAT)
  const tableRef = ref()
  const page = ref<PageState>(defaultPageState)
  const getData = (page: number, size: number) => {
    return memberListCouponDetailApi.getMemberListCouponDetail({ pageNum: page, rowSize: size })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<MemberCouponDetailModel>(getData)

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tableRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  const onDownLoad = () => {
    const exportData =
      items.value?.map<MemberCouponDetailModel>((it) => {
        return {
          id: it.id,
          couponCode: it.couponCode,
          couponName: it.couponName,
          couponType: it.couponType,
          discountAmount: it.discountAmount,
          usage: it.usage,
          date: it.date,
          available: it.available,
          orderNumber: it.orderNumber,
          registrant: it.registrant,
          registrationDateTime: it.registrationDateTime
        }
      }) ?? []
    exportExcel<MemberCouponDetailModel>(exportData, couponFileName, memberExportCouponDetailHeaderName)
  }

  return {
    items,
    totalItems,
    isLoading,
    onPageChange,
    tableRef,
    onDownLoad
  }
}
