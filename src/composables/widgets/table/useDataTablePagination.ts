import { TABLE_LOADING_WAIT_TIME, DATA_TABLE_NUMBER_ITEMS_PAGE_50 } from '@/common'
import { useDebounce } from '@/composables/common'
import { DataTablePaginationResponseModel, DataTableRequestModel } from '@/models'
import { ref } from 'vue'

export function useDataTablePagination<T>(callback: DataTableRequestModel<T>) {
  const totalItems = ref()
  const isLoading = ref(false)
  const items = ref<T[]>()
  let currentPage = 0
  let numberOfItems = DATA_TABLE_NUMBER_ITEMS_PAGE_50
  const { debounce } = useDebounce()

  const fetchDataWith = (params: { page: number; numberOfItems: number }) => {
    isLoading.value = true
    numberOfItems = params.numberOfItems
    return new Promise((resolved, reject) => {
      debounce(() => {
        return callback(params.page, params.numberOfItems)
          .then((result) => {
            currentPage = params.page
            numberOfItems = params.numberOfItems
            handleSuccessResponse(result)
            resolved(result)
          })
          .catch(() => {
            handleFailResponse()
            reject(new Error('Cannot get data'))
          })
      }, TABLE_LOADING_WAIT_TIME)
    })
  }
  const refreshData = () => {
    return fetchDataWith({ page: currentPage, numberOfItems })
  }
  const handleSuccessResponse = (response: DataTablePaginationResponseModel<T>) => {
    items.value = response.data
    totalItems.value = response.totalItems
    isLoading.value = false
  }

  const setData = (data: T[]) => {
    items.value = data
  }

  const handleFailResponse = () => {
    // items.value = response.data
    // totalItems.value = response.totalItems
    isLoading.value = false
  }

  return {
    items,
    totalItems,
    isLoading,
    fetchDataWith,
    setData,
    refreshData
  }
}
