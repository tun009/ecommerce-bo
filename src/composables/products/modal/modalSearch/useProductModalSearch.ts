import { ProductSearchModal } from '@/components/products'
import { useModal } from '@/composables'
import { ProductSearchModalProps, ProductSearchRecordModel, ProductSearchType } from '@/models'

import { ref } from 'vue'

export const useProductModalSearch = () => {
  const modal = useModal<ProductSearchModalProps>()

  const searchResData = ref<ProductSearchRecordModel>()

  const searchText = ref('')

  const openModal = (type: ProductSearchType) => {
    modal.showModal?.({
      component: ProductSearchModal,
      props: {
        onCancel: modal.closeModalByPop,
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
    modal.closeModalByPop?.()
  }

  return { ...modal, openModal, searchText, searchResData }
}
