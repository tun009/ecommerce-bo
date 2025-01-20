import {
  MemberAdminsMdsModel,
  productModalSearchBrandMeta,
  productModalSearchMDMeta,
  ProductSearchModalProps,
  ProductSearchRecordModel,
  ProductSearchType
} from '@/models'
import { onMounted, ref } from 'vue'
import { memberAdminsMdsApi } from '@/services'

export const useProductModalSearchLogic = (props: ProductSearchModalProps) => {
  const res: ProductSearchRecordModel = {
    code: NaN,
    name: ''
  }
  const getSearchMetaInfo = () => {
    return props.searchType === ProductSearchType.BRAND ? productModalSearchBrandMeta : productModalSearchMDMeta
  }

  const modalSearchMetaInfo = getSearchMetaInfo()

  const searchInp = ref(props.searchInput ?? '')

  const selectValue = ref<ProductSearchRecordModel>(props.searchResData ?? res)

  const searchResults = ref<ProductSearchRecordModel[]>()

  const handlePopupSearch = async (params: string): Promise<ProductSearchRecordModel[]> => {
    const { data } = await memberAdminsMdsApi.search(params)
    return Promise.resolve(
      data.map((it: MemberAdminsMdsModel): ProductSearchRecordModel => {
        return {
          code: it.managerKey,
          name: it.managerName
        }
      })
    )
  }

  onMounted(() => {
    if (props.searchResData) {
      handleSearch(props.searchResData.name)
    } else if (props.searchInput) {
      handleSearch(props.searchInput)
    }
  })

  const handleSearch = async (searchInp: string) => {
    try {
      searchResults.value = await handlePopupSearch(searchInp)
    } catch (error) {
      // handle error
    }
  }

  const handleSelectRow = (res: ProductSearchRecordModel) => {
    selectValue.value = res
  }

  const handleSelectValue = () => {
    if (selectValue.value) {
      props.onSelect(selectValue.value)
    } else {
      props.onCancel?.()
    }
  }

  return {
    searchInp,
    searchResults,
    selectValue,
    handleSearch,
    handleSelectRow,
    handleSelectValue,
    modalSearchMetaInfo
  }
}
