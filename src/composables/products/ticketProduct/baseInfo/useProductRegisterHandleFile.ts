import { ProductRepresentativeProps } from '@/models'
import { reactive, ref } from 'vue'

export const useProductRegisterHandleFile = (props: ProductRepresentativeProps) => {
  const indexChange = ref<number>(0)
  const dataTable = reactive(props.dataTable)
  const getFile = (value: any) => {
    dataTable.splice(indexChange.value, 1, {
      name: value?.file?.name,
      url: value?.url
    })
  }
  const deleteFile = () => {
    dataTable.splice(indexChange.value, 1, {
      name: '',
      url: ''
    })
  }
  return { getFile, deleteFile, indexChange }
}
