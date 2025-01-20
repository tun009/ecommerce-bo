import { ProductSearchModalWithTable } from '@/components/products'
import { useModal } from '@/composables'
import { ProductSearchModalProps, ProductSearchRecordModel, ProductSearchType } from '@/models'

import { ref } from 'vue'

export const useProductModalSearchWithTable = () => {
  const modalTable = useModal<ProductSearchModalProps>()

  const searchResData = ref<ProductSearchRecordModel>()

  const searchText = ref('')

  const openModal = (type: ProductSearchType) => {
    modalTable.showModal?.({
      component: ProductSearchModalWithTable,
      props: {
        onCancel: modalTable.closeModalByPop,
        onSelect: onSelect,
        searchInput: searchText.value,
        searchResData: searchResData.value,
        searchType: type
      }
    })
  }
  const onSelect = (value: ProductSearchRecordModel) => {
    searchText.value = value.code ? `${value.code} (${value.name})` : ''
    searchResData.value = value
    modalTable.closeModalByPop?.()
  }

  return { ...modalTable, openModal, searchText, searchResData }
}
