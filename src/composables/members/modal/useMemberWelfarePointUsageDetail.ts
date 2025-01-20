import { useDataTablePagination } from '@/composables/widgets'
import { memberPointUsageListApi } from '@/services/api'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'
import { useModal } from '@/composables'
import { MemberWelfarePointUsageDetailsModal } from '@/views/members'
import { MemberPointUsageDetailsDataTableModel, memberPointUsageDetailsHeaderTableConfig } from '@/models'
import { exportExcel, exportFileName } from '@/common'

export const useMemberWelfarePointUsageDetail = () => {
  const refTable = ref()
  const modal = useModal()

  const fetchData = (page: number, size: number) => {
    return memberPointUsageListApi.getPointUsageDetailTable({ pageNum: page, rowSize: size })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<MemberPointUsageDetailsDataTableModel>(fetchData)

  const onPageChange = (pageState: PageState) => {
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        refTable.value?.scrollToTop()
      })
      .catch(() => {})
  }

  const openModal = () => {
    modal.showModal?.({
      component: MemberWelfarePointUsageDetailsModal,
      props: {
        onClose: modal.closeModalByPop
      }
    })
  }

  const onDownLoad = () => {
    const exportData: MemberPointUsageDetailsDataTableModel[] = items.value ?? []
    const memberWelfarePointUsageDetailTableHeader = memberPointUsageDetailsHeaderTableConfig.map((it) => {
      return it.header
    })
    exportExcel<MemberPointUsageDetailsDataTableModel>(exportData, exportFileName('point_usage_detail'), memberWelfarePointUsageDetailTableHeader)
  }

  return {
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    openModal,
    onDownLoad
  }
}
