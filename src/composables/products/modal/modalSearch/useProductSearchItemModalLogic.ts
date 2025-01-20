import { MockProductSearchItemData } from '@/assets/mockData'
import { DATA_TABLE_TOTAL_ITEMS } from '@/common'
import { useDataTablePagination, useModalConfirm } from '@/composables/widgets'
import { DataTablePaginationResponseModel, ProductSearchItemModalProps, defaultPageState } from '@/models'
import { PageState } from 'primevue/paginator'
import { computed, ref } from 'vue'

interface SearchProductQuery {
  classification: any
  md: string
  name: string
  code: string
  salesStatus: any
  approvalStatus: any
  period: any
  startDate: string
  endDate: string
  codeSearch: any
  codeQuery: string
}

export const useProductSearchItemModalLogic = (props: ProductSearchItemModalProps) => {
  const classificationOptions = [
    { label: '전체', value: '전체' },
    { label: '배송형 상품', va배송형lue: '' },
    { label: '티켓형 상품', va티켓형lue: '' }
  ]

  const salesStatusOptions = [
    { label: '전체', value: '전체' },
    { label: '판매중', value: '판매중' },
    { label: '판매일시중지', value: '판매일시중지' },
    { label: '일시품절', value: '일시품절' },
    { label: '품절', value: '품절' },
    { label: '판매종료', value: '판매종료' }
  ]

  const approvalStatusOptions = [
    { label: '전체', value: '전체' },
    { label: '상품등록중', value: '상품등록중' },
    { label: '승인대기', value: '승인대기' },
    { label: '승인철회', value: '승인철회' },
    { label: '승인반려', value: '승인반려' },
    { label: '승인완료', value: '승인완료' }
  ]

  const periodOptions = [
    { label: '등록일', value: '등록일' },
    { label: '수정일', value: '수정일' }
  ]

  const codeSearchOptions = [
    { label: '사용안함', value: '사용안함' },
    { label: '상품코드', value: '상품코드' }
  ]

  const defaultQuery: SearchProductQuery = {
    classification: classificationOptions[0],
    md: '',
    name: '',
    code: '',
    salesStatus: salesStatusOptions[0],
    approvalStatus: approvalStatusOptions[0],
    period: periodOptions[0],
    startDate: '',
    endDate: '',
    codeSearch: codeSearchOptions[0],
    codeQuery: ''
  }

  const { openModal, closeAllModal } = useModalConfirm()

  const query = ref<SearchProductQuery>(defaultQuery)
  const codeSearchEnabled = computed(() => query.value.codeSearch.value !== codeSearchOptions[0].value)

  const groupDateRef = ref()
  const tableRef = ref()

  const page = ref<PageState>(defaultPageState)

  const fetchData = (page: number, size: number) => {
    // mock api return data with delay time
    return new Promise<DataTablePaginationResponseModel<any>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = page * size + size
        for (let i = page * size; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockProductSearchItemData,
            id: index,
            code: MockProductSearchItemData.code + index
          })
        }
        resolve({
          totalItems: DATA_TABLE_TOTAL_ITEMS,
          data: items
        })
      })
    })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<any>(fetchData)
  const itemsCheckedList = ref<any[]>([])

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    handleSearch()
  }

  const handleSearch = () => {
    const isSearchInpValid = query.value.codeSearch.value != codeSearchOptions[0].value || query.value.md || query.value.name || query.value.code

    if (isSearchInpValid) {
      fetchDataWith({
        numberOfItems: page.value.rows,
        page: page.value.first
      }).catch(() => {})
    }
  }

  const handleReset = () => {
    query.value = defaultQuery
    groupDateRef?.value?.handleReset()
  }
  /* Call when click one row */

  const onRowCheckedChange = (item: any) => {
    if (item.isSelected) {
      itemsCheckedList.value = itemsCheckedList.value.concat(item)
    } else {
      itemsCheckedList.value = itemsCheckedList.value.filter((_) => _.id !== item.id)
    }
  }

  const onSelectAllChange = (checked: boolean) => {
    if (checked) {
      itemsCheckedList.value = items.value as any[]
    } else {
      itemsCheckedList.value = []
    }
  }

  const handleConfirm = () => {
    openModal({
      content: '선택한 상품을 등록 하시겠습니까?',
      onConfirm: () => {
        props?.onSelect(itemsCheckedList.value)
        closeAllModal?.()
      }
    })
  }

  return {
    groupDateRef,
    query,
    classificationOptions,
    salesStatusOptions,
    approvalStatusOptions,
    periodOptions,
    codeSearchOptions,
    codeSearchEnabled,
    itemsCheckedList,
    tableRef,
    items,
    isLoading,
    totalItems,
    onPageChange,
    onRowCheckedChange,
    onSelectAllChange,
    handleReset,
    handleSearch,
    handleConfirm
  }
}
